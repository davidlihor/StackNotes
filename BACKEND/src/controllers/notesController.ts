import Note from "../models/Note.js";
import ROLES_LIST from "../config/roles_list.js";
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";

// @desc Get all notes
// @route GET /notes
// @access Private

const getAllNotes = asyncHandler(async (req: Request, res: Response): Promise<any> => {

  const allowedRoles = [ROLES_LIST.Admin, ROLES_LIST.Manager];
  const userHasAllowedRole = req.roles.some(role => allowedRoles.includes(role));
  let notes = null;

  if (userHasAllowedRole) {
    notes = await Note.find().populate("user", "username").lean();
  } else {
    notes = await Note.find({ "user": req.id }).populate("user", "username").lean();
  }

  // If no notes
  if (!notes?.length) {
    return res.status(400).json({ message: "No notes found" });
  }
  res.json(notes);
});

// @desc Create new note
// @route POST /notes
// @access Private

const createNote = asyncHandler(async (req: Request, res: Response): Promise<any> => {
  const { user, title, text } = req.body;

  // Confirm data
  if (!user || !title || !text) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Create and store new note
  const note = await Note.create({ user, title, text });

  if (note) {
    // created
    res.status(201).json({ message: `New note ${title} created` });
  } else {
    res.status(400).json({ message: "Invalid note data received" });
  }
});

// @desc Update a note
// @route PATCH /notes
// @access Private

const updateNote = asyncHandler(async (req: Request, res: Response): Promise<any> => {
  const { id, user, title, text, completed } = req.body;

  // Confirm data
  if (!id || !user || !title || !text || typeof completed !== "boolean") {
    return res.status(400).json({ message: "All fields are required" });
  }

  const note = await Note.findById(id).exec();

  if (!note) {
    return res.status(400).json({ message: "Note not found" });
  }

  const allowedRoles = [ROLES_LIST.Admin, ROLES_LIST.Manager];
  const userHasAllowedRole = req.roles.some(role => allowedRoles.includes(role));

  if (!userHasAllowedRole && note.user._id.toString() != req.id) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  note.user = user;
  note.title = title;
  note.text = text;
  note.completed = completed;

  const updatedNote = await note.save();

  res.json({ message: `${updatedNote.title} updated` });
});

// @desc Delete a note
// @route DELETE /notes
// @access Private

const deleteNote = asyncHandler(async (req: Request, res: Response): Promise<any> => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: "Note ID Required" });
  }

  const note = await Note.findById(id).exec();

  if (!note) {
    return res.status(400).json({ message: "Note not found" });
  }

  const result = await note.deleteOne();

  const replay = `Note ${result.title} with ID ${result._id} deleted`;

  res.json(replay);
});

export default { getAllNotes, createNote, updateNote, deleteNote };
