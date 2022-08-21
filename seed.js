'use strict';

const mongoose = require('mongoose');
require('dotenv').config();
const Book = require('./models/book.js');

mongoose.connect(process.env.MONGO_CONNECTION);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected for seeding!');
});

async function seed() {
  const book1 = {
    title: 'Les Miserables',
    description: 'Beginning in 1815 and culminating in the 1832 June Rebellion in Paris, the novel follows the lives and interactions of several characters, particularly the struggles of ex-convict Jean Valjean and his experience of redemption.',
    status: 'A book I read'
  };

  const book2 = {
    title: 'Dune',
    description: 'Paul Atreides and his family take over the planet Arrakis, aka the desert planet.',
    status: 'A fantastic book'
  };

  const book3 = {
    title: 'The Tell-Tale Heart',
    description: 'Follows an unreliable narrator\'s descent into madness after he commits a murder',
    status: 'Hexx likes this story'
  };

  Book.insertMany([book1, book2, book3])
    .then(function () {
      console.log('Books added');
    })
    .catch(function (error) {
      console.log('Error: ', error);
    });

  console.log('Done!');
  mongoose.disconnect();
}

seed();
