// const express = require('express')
import express, { request, response } from "express";
import { mongoose } from "mongoose";
import cors from 'cors'
import { PORT, mongoDBURL } from "./config.js";
import booksRoute from "./routes/booksRoute.js";
const app = express();

app.use(express.json());
app.use(cors());

//cors use
//option-01
//option-02
// app.use(cors({
  //   origin : 'http://localhost:5555',
  //   methods : ['GET','POST','PUT','DELETE'],
  //   allowHeaders : ['Content-Type','application/json']
  // }))
  
app.use("/books", booksRoute);

app.get("/", (request, resposnse) => {
  console.log(request);
  return resposnse.status(234).send("Welsss");
});

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App Connected to Database");
    app.listen(PORT, () => {
      console.log(`App is listening to http://localhost:${PORT}/`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
