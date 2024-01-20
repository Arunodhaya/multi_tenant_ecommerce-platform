import { UserModel } from "../model/UserModel";
import jwt from "jsonwebtoken";
import * as dotenv from 'dotenv'


dotenv.config({ path: __dirname + "/../.env.local" });
dotenv.config({ path: __dirname + "/../.env" });

// Secret key for JWT
export const secretKey = process.env.JWT_TOKEN;

export const generateToken = (user:UserModel)=>{
    return jwt.sign(
        { user_id: user.user_id, email: user.email },
        secretKey,
        { expiresIn: "1h" }
      );
}