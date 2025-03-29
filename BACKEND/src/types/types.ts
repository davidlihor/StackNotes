import { JwtPayload } from "jsonwebtoken";
import mongoose, { Document } from "mongoose";

export interface accessToken extends JwtPayload {
  UserInfo: {
    id: string;
    username: string;
    roles: string[];
  },
}

export interface refreshToken extends JwtPayload {
  username: string;
}


export interface IUser extends Document {
  username: string;
  password: string;
  roles: string[];
  active: boolean;
}

export interface INote extends Document {
  user: mongoose.Types.ObjectId;
  title: string;
  text: string;
  completed: boolean;
  ticket: number;
  createdAt: Date;
  updatedAt: Date;
}