import mongoose, { model, Schema } from 'mongoose';
import mongooseSequence from 'mongoose-sequence';
import { INote } from '../types/types';

const noteSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// @ts-ignore
noteSchema.plugin(mongooseSequence(mongoose), {
  inc_field: "ticket",
  id: "ticketNums",
  start_seq: 500,
});

const Note = model<INote>("Note", noteSchema);
export default Note;
