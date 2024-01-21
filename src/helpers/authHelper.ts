import { UserModel } from "../model/UserModel";
import jwt from "jsonwebtoken";
import * as dotenv from 'dotenv'
import { CustomerModel } from "../model/CustomerModel";


dotenv.config({ path: __dirname + "/../.env.local" });
dotenv.config({ path: __dirname + "/../.env" });

// Secret key for JWT
export const secretKey = process.env.JWT_TOKEN;

export const generateAdminToken = (user:UserModel)=>{
    return jwt.sign(
        { user_id: user.user_id, email: user.email },
        secretKey,
        { expiresIn: "1d" }
      );
}

export const generateCustomerToken = (customer:CustomerModel)=>{
  return jwt.sign(
      { customer_id: customer.customer_id, email: customer.email },
      secretKey,
      { expiresIn: "1d" }
    );
}