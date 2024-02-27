import express from "express";
import { Book } from "../models/booksModel.js";

const router = express.Router();

//create
router.post("/", async (request, response) => {
  try {
    if (!request.body.title || !request.body.author || !request.body.publishYear) {
      return response.status(400).send({
        message: "Seand all required feilds : author , title , publishYear",
      });
    } else {
      const newBook = {
        title: request.body.title,
        author: request.body.author,
        publishYear: request.body.publishYear,
      };
      const book = await Book.create(newBook);

      return response.status(201).send(book);
    }
  } catch (error) {
    console.log(error.message);
    return response.status(500).send({ message: error.message });
  }
});

//read
router.get("/", async (request, response) => {
  try {
    const books = await Book.find({});
    return response.status(200).send({
      books: books,
    });
  } catch (error) {
    console.log(error.message);
    return response.status(500).send({ message: error.message });
  }
});

//read_particular_book
router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const particularBook = await Book.findById(id);

    return response.status(200).send(particularBook);
  } catch (error) {
    console.log(error.message);
    return response.status(500).send({ message: error.message });
  }
});

//update
router.put("/:id", async (request, response) => {
  try {
    if (!request.body.title || !request.body.author || !request.body.publishYear) {
      return response.status(400).send({ message: "Send all required fields : title, author, publishYear" });
    }

    const { id } = request.params;

    const updatedBook = await Book.findByIdAndUpdate(id, request.body);

    if (!updatedBook) {
      return request.status(400).send({ message: "Book not found " });
    } else {
      return response.status(200).json({
        statusMessage: " 200: Done ",
        message: "Book updated",
        updatedBook: updatedBook,
      });
    }
  } catch (error) {
    console.log(error.message);
    return response.status(500).send({ message: error.message });
  }
});

//delete
router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const bookDeleted = await Book.findByIdAndDelete(id);
    if (!bookDeleted) {
      return response.status(400).send({ message: "Book not Found" });
    }
    return response.status(200).json({
      statusMessage: "Book deleted Successfully",
      bookDeleted: bookDeleted,
    });
  } catch (error) {
    console.log(error.message);
    return response.status(500).send({ message: error.message });
  }
});

export default router;
