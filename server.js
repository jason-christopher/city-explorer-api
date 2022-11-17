'use strict';

// REQUIRE
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const getWeather = require('./weather');
const getMovies= require('./movies');

// USE
const app = express();
app.use(cors());
const PORT = process.env.PORT || 3002;

// ROUTES
app.get('/', (req, res) => {
  res.status(200).send('Base Page');
});
app.get('/weather', getWeather);
app.get('/movies', getMovies);
app.get('*', (req, res) => {
  res.status(404).send('That route does not exist');
});

// ERRORS
app.use((error, req, res, next) => {
  res.status(500).send(error.message);
});

// CLASSES

// LISTEN
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
