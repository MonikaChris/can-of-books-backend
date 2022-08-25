'use strict';

const Book = require('../models/book');

const Handler = {};


Handler.getBooks = async (request, response, next) => {
  try {
    const books = await Book.find({});
    response.status(200).send(books);
  } catch (error) {
    console.error(error);
    next(error);
  }
}

Handler.createBooks = async (request, response, next) => {
  console.log('createBooks', request.body )
  try {
    const book = await Book.create(request.body);
    response.status(201).send(book);
    
    // ERROR HANDLING TESTING
    // response.send(dataDoesNotExist);

  } catch(e){
    console.log('failed');
    e.customMessage = 'Book creation failed';
    console.error(e.customMessage + e);
    response.status(500).send(e)
    next(e);
  }
}

Handler.deleteBook = async (request, response, next) => {
  console.log('deleteBook', request.params);
  try {
    await Book.findByIdAndDelete(request.params.id);
    response.status(200).send('your book has been deleted');
  } catch(e) {
    console.log(e);
    next(e);
  }
}

module.exports = Handler;
