'use strict';

const Book = require('../models/book');

const Handler = {};


Handler.getBooks = async (request, response, next) => {
  try {
    const books = await Book.find({});
    console.log('getBooks function, books:', books);
    response.status(200).send(books);
  } catch (error) {
    console.error(error);
    next(error);
  }
}

Handler.createBooks = async (request, response, next) => {
  try {
    const book = await Book.create(request.body);
    response.status(201).send(book);
  } catch(e){
    e.customMessage = 'Book creation failed';
    console.error(e.customMessage + e);
    next(e);
  }
}

module.exports = Handler;
