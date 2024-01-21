import express from "express";
import bcrypt from "bcrypt";
import { UserModel } from "../model/UserModel";
import { validateAuthToken, validateStore } from "../middleware";
import { RoleModel } from "../model/RoleModel";
import { UserRolesModel } from "../model/UserRolesModel";

const app = express.Router();

app.post(
  "/create/adminUser",
  validateAuthToken,
  validateStore,
  async (req, res) => {
    try {
      const { name, phone, email, password } = req.body;
      const { store_id } = res.locals.store;
      const { user } = res.locals.user;


      if (!name || !email || !password) {
        return res
          .status(400)
          .json({ error: "Name, email, and password are required" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);

      const existingUser = await UserModel.findOne({ where: { email } });
      const role = await RoleModel.findByRole("ADMIN");
      if (existingUser) {
        const existingUserRole = await UserRolesModel.findOne({
          where: {
            user_id: existingUser.user_id,
            store_id
          },
        });

        if (existingUserRole) {
          return res
            .status(400)
            .json({ error: "User already exists" });
        }
      }
      const newUser = await UserModel.create({
        name,
        phone,
        email,
        password: hashedPassword,
      });

      await UserRolesModel.create({
        user_id: newUser.user_id,
        role_id: role.role_id,
        store_id,
      });

      res.status(201).json({ newUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

export default app;
