'use strict';

const Book = require('../models/book');

async function getBooks(request, response, next) {
  try {
    const books = await Book.find({});
    console.log('getBooks function, books:', books);
    response.status(200).send(books);
  } catch(error) {
    console.error(error);
    next(error);
  }
}

module.exports = getBooks;
