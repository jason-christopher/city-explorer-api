'use strict'

console.log('hi');

// REQUIRE
const express = require('express');
let data = require('./data/pets.json');

// `npm i dotenv`
require('dotenv').config();

// we must include CORS if we want to share resources over the web
const cors = require('cors');
const { nextTick } = require('process');

// USE
const app = express();

app.use(cors());

// define the PORT and validate that our .env is working. If not, uses port 3002
const PORT = process.env.PORT || 3002;

// ROUTES
// this is where we will write handlers for our endpoints

// create a basic default route
// app.get() correlates to axios.get()
// app.get() takes in a parameter or a URL in quotes, and a callback function
app.get('/', (request, response) => {
  response.send('Hello');
});

// works for http://localhost:3001/sayHello?name=Jason&lastName=Christopher
app.get('/sayHello', (req, res) => {
  let lastName = req.query.lastName;
  res.send(`Hi ${req.query.name} ${lastName}`);
});

app.get('/pet', (req, res, next) => {
  try{
    let species = req.query.species;

    let selectedPet = data.find(pet => pet.species === species);
    let petCleanedUp = new Pet(selectedPet);
    res.send(petCleanedUp);
  } catch (error) {
    // create a new instance of the Error object that lives in Express
    next(error);
  }
});

// '*' is a wild card and must go last
app.get('*', (req, res) => {
  res.send('That route does not exist');
});

// ERRORS

// handle any errors
app.use((error, req, res, next) => {
  res.status(500).send(error.message);
});

// CLASSES
class Pet {
  constructor(petObject) {
    this.name = petObject.name;
    this.breed = petObject.breed;
  }
}

// LISTEN

// `listen` is an express method. Takes in port value and callback function.
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
