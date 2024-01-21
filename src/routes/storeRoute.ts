import express from "express";
import bcrypt from "bcrypt";
import { StoreModel } from "../model/StoreModel";
import {
  validateStore,
  validateAuthToken,
  validateStoreAccess,
} from "../middleware";
import { UserModel } from "../model/UserModel";
import { RoleModel } from "../model/RoleModel";
import { UserRolesModel } from "../model/UserRolesModel";
import { Op } from "sequelize";

const app = express.Router();

app.post("/create", validateAuthToken, async (req, res) => {
  try {
    const { user } = res.locals;
    const { store_name } = req.body;
    const owner = await UserModel.findByPk(user.user_id);
    if (!owner) throw new Error("Please register to create store");
    const store = await StoreModel.create({
      store_name,
      createdBy: owner.user_id,
    });
    const role = await RoleModel.findByRole("STORE_OWNER");
    await UserRolesModel.create({
      user_id: user.user_id,
      role_id: role.role_id,
      store_id: store.store_id,
    });
    res.status(201).json(store);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/:id", validateAuthToken, async (req, res) => {
  const { user } = res.locals;
  let store_id = req.params.id;

  let is_owner = await validateStoreAccess(store_id, user.user_id);
  if (!is_owner)
    return res
      .status(401)
      .send("you are not authorized to perform this action");

  const store = await StoreModel.findByPk(req.params.id);
  if (!store) {
    res.status(404).json({ error: "Store not found" });
    return;
  }
  return res.json(store);
});

app.put("/:id", validateAuthToken, async (req, res) => {
  const { user } = res.locals;
  let store_id = req.params.id;

  let is_owner = await validateStoreAccess(store_id, user.user_id);
  if (!is_owner)
    return res
      .status(401)
      .send("you are not authorized to perform this action");

  const store = await StoreModel.findByPk(req.params.id);
  if (!store) return res.status(404).json({ error: "Store not found" });

  const { store_name } = req.body;
  await store.update({ store_name });

  return res.json(store);
});

app.delete("/stores/:id", async (req, res) => {
  const { user } = res.locals;
  let store_id = req.params.id;

  let is_owner = await validateStoreAccess(store_id, user.user_id);
  if (!is_owner)
    return res
      .status(401)
      .send("you are not authorized to perform this action");

  const store = await StoreModel.findByPk(req.params.id);
  if (!store) {
    res.status(404).json({ error: "Store not found" });
    return;
  }

  await store.destroy();
  return res.status(204).json({
    status: "success",
  });
});

app.get("/", validateAuthToken, async (req, res) => {
  const user = res.locals.user;
  const existingUser = await UserModel.findByPk(user.user_id);
  if (!existingUser) return res.status(404).json({ error: "User Not Found!" });
  const owner_role = await RoleModel.findByRole("STORE_OWNER");
  const userRoles = await UserRolesModel.findAll({
    where: {
      user_id: existingUser.user_id,
      role_id: owner_role.role_id,
    },
  });
  const storeIds = userRoles.map((userRole) => userRole.store_id);
  const stores = await StoreModel.findAll({
    where: {
      store_id: {
        [Op.in]: storeIds,
      },
    },
  });
  res.json(stores);
});
export default app;
