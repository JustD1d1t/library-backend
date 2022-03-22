import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  borrowed: {
    type: Boolean,
    required: true,
  },
  borrowedBy: { type: mongoose.Types.ObjectId, ref: "Person" },
});

export const Book = mongoose.model("Book", bookSchema);