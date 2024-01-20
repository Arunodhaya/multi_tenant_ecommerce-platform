import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import * as dotenv from 'dotenv'
import { secretKey } from "./helpers/authHelper";


dotenv.config({ path: __dirname + "/../.env.local" });
dotenv.config({ path: __dirname + "/../.env" });

// Middleware to validate JWT token
export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return res.status(401).send("Access denied");

  jwt.verify(token, secretKey, (err: any, user: any) => {
    if (err) return res.status(403).send("Invalid token");
    req.body.user = user;
    next();
  });
};
