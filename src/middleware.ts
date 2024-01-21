import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import * as dotenv from 'dotenv'
import { secretKey } from "./helpers/authHelper";
import { StoreModel } from "./model/StoreModel";
import { CustomerModel } from "./model/CustomerModel";


dotenv.config({ path: __dirname + "/../.env.local" });
dotenv.config({ path: __dirname + "/../.env" });

// Middleware to validate JWT token
export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return res.status(401).send("Access denied,Please login");

  jwt.verify(token, secretKey, (err: any, user: any) => {
    if (err) return res.status(403).send("Invalid token");
    req.body.user = user;
    next();
  });
};

export const validateCustomer = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) return res.status(401).send("Access denied,Please login");

    const store_id = req.headers.store_id

    if(!store_id ) return res.status(403).send("Store not found!");

    const store = await StoreModel.findByPk(Number(store_id));
    if (!store) throw new Error("Store not found!");

    jwt.verify(token, secretKey, async (err: any, customer: any) => {
      if (err) return res.status(403).send("Invalid token");
      const loggedInCustomer = await CustomerModel.findOne({
        where:{
          customer_id:customer.customer_id,
          store_id
        }
      })
      if(!loggedInCustomer) return res.status(401).send("Access denied! You don't have permission to perform this action");
      req.body.customer = loggedInCustomer;
      next();
    });
  };

