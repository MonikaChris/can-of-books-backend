'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Handler = require('./modules/handlers');
const verifyUser = require('./auth.js');

mongoose.connect(process.env.MONGO_CONNECTION);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Mongoose is connected to Atlas!');
});

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

app.get('/test', (request, response) => {

  response.send('test request received');

});

// This will run the "verify" code on every route automatically
// If the user is valid, we'll have them in request.user in every route!
// If not, it'll throw an error for us
app.use(verifyUser);

app.get('/books', Handler.getBooks);
app.post('/books', Handler.createBook);
app.delete('/book/:id', Handler.deleteBook);
app.put('/books/:id', Handler.updateBook);
app.get('/user', Handler.handleGetUser); // lab 15

app.use((error, request, response, next) => {
  response.status(500).send(error);
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
