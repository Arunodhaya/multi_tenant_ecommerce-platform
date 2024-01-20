import express from "express";
import bcrypt from "bcrypt";
import { UserModel } from "../model/UserModel";
import { authenticateToken } from "../middleware";
import { generateToken } from "../helpers/authHelper";
import { UserRolesModel } from "../model/UserRolesModel";
import { RoleModel } from "../model/RoleModel";
import { StoreModel } from "../model/StoreModel";

const app = express.Router();

app.post("/register", async (req, res) => {
  try {
    const { name, phone, email, password, store_id } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ error: "Name, email, and password are required" });
    }

    const existingUser = await UserModel.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
      name,
      phone,
      email,
      password: hashedPassword,
    });

    if (store_id) {
        const store = await StoreModel.findByPk(store_id);
        if (!store) {
            return res.status(400).json({ error: 'Store not found.' });
          }
        const customerRole = await RoleModel.findOne({ where: { role_name: 'CUSTOMER' } });
        await UserRolesModel.create({
          user_id: user.user_id,
          role_id: customerRole.role_id,  
          store_id: store.store_id,
        });
      }
  

    res.status(201).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }
    const user = await UserModel.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: "Invalid Email." });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ message: "Invalid password." });
    }

    const token = generateToken(user)

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/user_info", authenticateToken, async (req, res) => {
  try {
    const userId = req.body.user.user_id;

    const user = await UserModel.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default app;
