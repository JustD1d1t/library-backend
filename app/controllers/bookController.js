import { Book } from "../db/models/book.js";

class BookControllerClass {
  async getBooks(req, res) {
    let borrowed;
    let person;
    if (req.body.person) {
      person = req.body.person;
    }
    switch (req.body.books) {
      case "all":
        break;
      case "available":
        borrowed = false;
        break;
      case "borrowed":
        borrowed = true;
        break;
      default:
        break;
    }
    let where = {};
    if (typeof borrowed !== "undefined") {
      where = { borrowed: borrowed };
    }
    if (borrowed && person) {
      where.borrowedBy = person;
    }
    console.log(where);
    const books = await Book.find(where);
    res.json(books);
  }
  async addBook(req, res) {
    const { title, author, description } = req.body;
    console.log(req.body);
    const book = new Book({
      title,
      author,
      description,
      borrowed: false,
      borrowedBy: null,
    });
    try {
      await book.save();
      res.status(201).json(book);
    } catch (e) {
      res.status(422).json({ errors: e.errors });
    }
  }
  async borrowBook(req, res) {
    let book;
    try {
      book = await Book.findOneAndUpdate(
        { title: req.body.title },
        {
          borrowedBy: req.body.person,
          borrowed: true,
        }
      );
    } catch (error) {
      res.json({ error: error });
    }
  }
  async returnBook(req, res) {
    let book;
    try {
      book = await Book.findOneAndUpdate(
        { title: req.body.title },
        {
          borrowedBy: undefined,
          borrowed: false,
        }
      );
    } catch (error) {
      res.json({ error: error });
    }
  }
}
export const BookController = new BookControllerClass();
