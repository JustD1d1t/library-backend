import express from "express";
import mongoose from "mongoose";
import { config } from "./config.js";
import { booksRouter } from "./routes/book.js";
import { personRouter } from "./routes/person.js";

export const app = express();

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(express.json());

app.use("/books", booksRouter);
app.use("/person", personRouter);

mongoose.connect(config.database);
