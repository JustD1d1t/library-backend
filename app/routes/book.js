import express from "express";
import { BookController } from "../controllers/bookController.js";

export const booksRouter = new express.Router();

booksRouter.post("/", BookController.getBooks);
booksRouter.post("/add", BookController.addBook);
booksRouter.post("/borrow", BookController.borrowBook);
booksRouter.post("/return", BookController.returnBook);
