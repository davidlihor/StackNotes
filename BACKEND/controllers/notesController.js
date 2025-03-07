const Note = require("../models/Note");
const asyncHandler = require("express-async-handler");

// @desc Get all notes
// @route GET /notes
// @access Private

const getAllNotes = asyncHandler(async (req, res) => {
  // Get all notes from MongoDB
  const notes = await Note.find().lean();

  // If no notes
  if (!notes?.length) {
    return res.status(400).json({ message: "No notes found" });
  }
  res.json(notes);
});

// @desc Create new note
// @route POST /notes
// @access Private

const createNewNote = asyncHandler(async (req, res) => {
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

const updateNote = asyncHandler(async (req, res) => {
  const { id, user, title, text, completed } = req.body;

  // Confirm data
  if (!id || !user || !title || !text || typeof completed !== "boolean") {
    return res.status(400).json({ message: "All fields are required" });
  }

  const note = await Note.findById(id).exec();

  if (!note) {
    return res.status(400).json({ message: "Note not found" });
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

const deleteNote = asyncHandler(async (req, res) => {
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

module.exports = { getAllNotes, createNewNote, updateNote, deleteNote };
