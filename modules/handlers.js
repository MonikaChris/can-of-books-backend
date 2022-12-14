'use strict';

const Book = require('../models/book');

const Handler = {};


Handler.getBooks = async (request, response, next) => {
  try {
    // console.log('Request: ', request.user);
    const books = await Book.find({email: request.user.email});
    response.status(200).send(books);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

Handler.createBook = async (request, response, next) => {
  // console.log('createBooks', request.body );
  try {
    const book = await Book.create({ ...request.body, email: request.user.email });
    response.status(201).send(book);
    
    // ERROR HANDLING TESTING
    // response.send(dataDoesNotExist);

  } catch(e){
    console.log('failed');
    e.customMessage = 'Book creation failed';
    console.error(e.customMessage + e);
    //response.status(500).send(e)
    next(e);
  }
};

Handler.deleteBook = async (request, response, next) => {
  console.log('deleteBook', request.params);
  try {
    await Book.findByIdAndDelete({_id: request.params.id, email: request.user.email});
    response.status(200).send('your book has been deleted');
  } catch(e) {
    console.log(e);
    next(e);
  }
};

Handler.updateBook = async (request, response, next) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(request.params.id, request.body, { new: true });
    response.status(200).send(updatedBook);
  } catch(e) {
    next(e);
  }
};

Handler.handleGetUser = (request, response) => {
  console.log('Getting the user');
  response.send(request.user);
};


module.exports = Handler;
