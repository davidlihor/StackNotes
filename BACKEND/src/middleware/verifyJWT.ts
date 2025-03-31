import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AccessTokenPayload } from "../types";

const verifyJWT = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization || req.headers.Authorization as string | undefined;

  if (!authHeader?.startsWith("Bearer ")) {
    res.status(401).json({ message: "Unauthorized" });
    return
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, {}, (error, decoded) => {
    if (error) return res.status(403).json({ message: "Forbidden" });
    const decodedToken = decoded as AccessTokenPayload;

    if (decodedToken && decodedToken.UserInfo) {
      req.username = decodedToken.UserInfo.username;
      req.id = decodedToken.UserInfo.id;
      req.roles = decodedToken.UserInfo.roles;
    }

    next();
  });
};

export default verifyJWT;
