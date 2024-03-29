import express from "express";
import { CustomerModel } from "../model/CustomerModel";
import { StoreModel } from "../model/StoreModel";
import bcrypt from "bcrypt";
import { generateCustomerToken } from "../helpers/authHelper";
import { validateCustomer } from "../middleware";

const app = express.Router();

app.post("/register", async (req, res) => {
  try {
    const store_id = req.headers?.store_id;
    if (!store_id)
      return res.status(401).json({ error: "Store id is required" });
    const { name, phone, email, password } = req.body;
    const existingUser = await CustomerModel.findOne({
      where: {
        email,
        store_id,
      },
    });
    if (existingUser)
      return res
        .status(404)
        .json({ error: "You're already customer of the store" });

    const store = await StoreModel.findByPk(Number(store_id));
    if (!store) throw new Error("Store not found!");

    const hashedPassword = await bcrypt.hash(password, 10);

    const customer = await CustomerModel.create({
      name,
      phone,
      email,
      password: hashedPassword,
      store_id: store.store_id
    });
    res.status(201).json({ customer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const store_id = req.headers.store_id;

    const store = await StoreModel.findByPk(Number(store_id));
    if (!store) throw new Error("Store not found!");
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }
    const customer = await CustomerModel.findOne({ where: { email } });

    if (!customer) {
      return res.status(401).json({ message: "Invalid Email." });
    }

    const validPassword = await bcrypt.compare(password, customer.password);

    if (!validPassword) {
      return res.status(401).json({ message: "Invalid password." });
    }

    const token = generateCustomerToken(customer);

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.put("/:customerId",validateCustomer,async (req,res)=>{
  const customer_id = req.params.customerId;
  const { store_id } = res.locals.store;

  const { name, phone, email, password } = req.body;

  const customer = await CustomerModel.findOne({where:{
    customer_id,store_id
  }});

  if (!customer) {
    return res.status(404).json({ error: 'Customer not found' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  customer.name = name;
  customer.phone = phone;
  customer.email = email;
  customer.store_id = store_id;
  customer.password = hashedPassword;

  await customer.save();

  return res.status(200).json({ message: 'Customer updated successfully', customer });
})
export default app;
