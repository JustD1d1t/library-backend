import mongoose from "mongoose";
import bcrypt from "bcrypt";

const personSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  borrowedBooks: [
    { type: mongoose.Types.ObjectId, required: true, ref: "Book" },
  ],
});

personSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return next();
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(user.password, salt);
  user.password = hash;
  next();
});

personSchema.post("save", function (error, doc, next) {
  if (error.code === 11000) {
    error = { user: "This user is already registered" };
  }
  next(error);
});

personSchema.methods = {
  comparePassword(password) {
    return bcrypt.compareSync(password, this.password);
  },
};

export const Person = mongoose.model("Person", personSchema);
