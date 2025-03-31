import { model, Schema } from "mongoose";
import { IUser } from "../types";

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  roles: {
    type: [String],
    default: ["Employee"],
  },

  active: {
    type: Boolean,
    default: true,
  },
});

const User = model<IUser>("User", userSchema);
export default User;
