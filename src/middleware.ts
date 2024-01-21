import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { secretKey } from "./helpers/authHelper";
import { StoreModel } from "./model/StoreModel";
import { CustomerModel } from "./model/CustomerModel";
import { RoleModel, Roles } from "./model/RoleModel";
import { UserRolesModel } from "./model/UserRolesModel";
import { Op, where } from "sequelize";

dotenv.config({ path: __dirname + "/../.env.local" });
dotenv.config({ path: __dirname + "/../.env" });

// Middleware to validate JWT token
export const validateAuthToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return res.status(401).send("Access denied,Please login");

  jwt.verify(token, secretKey, (err: any, user: any) => {
    if (err) return res.status(403).send("Invalid token");
    // console.log("user-midelle",user)
    res.locals.user = user;
    next();
  });
};

export async function validateStoreAccess(
  store_id,
  user_id,
  roles = ["STORE_OWNER"]
) {
  const store = await StoreModel.findByPk(Number(store_id));
  if (!store) throw new Error("Store not found!");

  let role_ids = [];
  
  for (let role_name of roles) {
    const roleDb = await RoleModel.findByRole((role_name as Roles));
    role_ids.push(roleDb.role_id);
  }

  const user_role_for_store = await UserRolesModel.findOne({
    where: {
      user_id: user_id,
      role_id: {
        [Op.in]: role_ids,
      },
      store_id: store.store_id,
    },
  });

  if (user_role_for_store) return true;

  return false;
}

export const validateStore = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = res.locals.user;
  if (!user) return res.status(401).send("You have not logged-in");

  const store_id = req.headers.store_id;

  if (!store_id) return res.status(403).send("Include store_id in the header!");

  let user_role_for_store = await validateStoreAccess(store_id, user.user_id, [
    "STORE_OWNER",
    "ADMIN",
  ]);
  if (!user_role_for_store)
    return res.status(403).send("You are not owner of this store");

  const store = await StoreModel.findByPk(Number(store_id));
  res.locals.store = store;
  next();
};

export const validateCustomer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return res.status(401).send("Access denied,Please login");

  const store_id = req.headers.store_id;

  if (!store_id) return res.status(403).send("Store not found!");

  const store = await StoreModel.findByPk(Number(store_id));
  if (!store) throw new Error("Store not found!");

  jwt.verify(token, secretKey, async (err: any, customer: any) => {
    if (err) return res.status(403).send("Invalid token");
    const loggedInCustomer = await CustomerModel.findOne({
      where: {
        customer_id: customer.customer_id,
        store_id,
      },
    });
    if (!loggedInCustomer)
      return res
        .status(401)
        .send(
          "Access denied! You don't have permission to perform this action"
        );
    res.locals.customer = loggedInCustomer;
    res.locals.store = store;
    next();
  });
};
