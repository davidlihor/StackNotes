import User from "../models/User";
import Note from "../models/Note";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import { Request, Response } from "express";

// @desc Get all users
// @route GET /users
// @access Private

const getAllUsers = asyncHandler(async (req: Request, res: Response): Promise<any> => {
  const users = await User.find().select("-password").lean();
  if (!users?.length) {
    return res.status(400).json({ message: "No users found" });
  }
  res.json(users);
});

// @desc Create new user
// @route POST /users
// @access Private

const createNewUser = asyncHandler(async (req: Request, res: Response): Promise<any> => {
  const { username, password, roles } = req.body;

  // Confirm data
  if (!username || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check for duplicate username
  const duplicate = await User.findOne({ username })
    .collation({ locale: "en", strength: 2 })
    .lean()
    .exec();

  if (duplicate) {
    return res.status(409).json({ message: "Duplicate username" });
  }

  // Hash password
  const hashedPwd = await bcrypt.hash(password, 10); // salt rounds

  const userObject =
    !Array.isArray(roles) || !roles.length
      ? { username, password: hashedPwd }
      : { username, password: hashedPwd, roles };

  // Create and store new user
  const user = await User.create(userObject);

  if (user) {
    // created
    res.status(201).json({ message: `New user ${username} created` });
  } else {
    res.status(400).json({ message: "Invalid user data received" });
  }
});

// @desc Update a user
// @route PATCH /users
// @access Private

const updateUser = asyncHandler(async (req: Request, res: Response): Promise<any> => {
  const { id, username, roles, active, password } = req.body;

  // Confirm data
  if (
    !id ||
    !username ||
    !Array.isArray(roles) ||
    !roles.length ||
    typeof active !== "boolean"
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const user = await User.findById(id).exec();

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  // Check for duplicate
  const duplicate = await User.findOne({ username })
    .collation({ locale: "en", strength: 2 })
    .lean()
    .exec();
  // Allow updates to the original user
  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(409).json({ message: "Duplicate username" });
  }

  if (user?.roles.includes("Admin") && user.active) {
    const activeAdmins = await User.countDocuments({ roles: "Admin", active: true }).exec();
    
    if (activeAdmins === 1 && (!roles.includes("Admin") || !active))
      return res.status(400).json({ message: "At least one admin must remain" })
    }

  user.username = username;
  user.roles = roles;
  user.active = active;

  if (password) {
    // Hash password
    user.password = await bcrypt.hash(password, 10); // salt rounds
  }

  const updatedUser = await user.save();

  res.json({ message: `${updatedUser.username} updated` });
});

// @desc Delete a user
// @route DELETE /users
// @access Private

const deleteUser = asyncHandler(async (req: Request, res: Response): Promise<any> => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: "User ID Required" });
  }

  const note = await Note.findOne({ user: id }).lean().exec();
  if (note) {
    return res.status(400).json({ message: "User has assigned notes" });
  }

  const user = await User.findById(id).exec();

  if (user?.roles.includes("Admin") && user.active) {
    const activeAdmins = await User.countDocuments({ roles: "Admin", active: true }).exec();
    if (activeAdmins === 1) return res.status(400).json({ message: "Cannot delete the last active admin" })
  }

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  const result = await user.deleteOne();

  const replay = `Username ${result.username} with ID ${result._id} deleted`;

  res.json(replay);
});

export default { getAllUsers, createNewUser, updateUser, deleteUser };
