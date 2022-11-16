'use strict';

// REQUIRE
// required from npm
require('dotenv').config();
const express = require('express');
// we must include CORS if we want to share resources over the web
const cors = require('cors');
const axios = require('axios');

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
app.get('/', (req, res) => {
  res.status(200).send('Base Page');
});

app.get('/weather', async (req, res, next) => {
  try{
    let searchedLat = req.query.queriedLat;
    let searchedLon = req.query.queriedLon;
    let results = await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${searchedLat}&lon=${searchedLon}&key=${process.env.WEATHER_API_KEY}&units=I&days=3`);
    let forecast = results.data.data.map( obj => new Forecast(obj));
    res.send(forecast);
  } catch (error) {
    // create a new instance of the Error object that lives in Express
    next(error);
  }
});

// '*' is a wild card and must go last
app.get('*', (req, res) => {
  res.status(404).send('That route does not exist');
});

// ERRORS

// handle any errors
app.use((error, req, res, next) => {
  res.status(500).send(error.message);
});

// CLASSES
class Forecast{
  constructor(obj) {
    this.date = obj.datetime;
    this.description = obj.weather.description;
  }
}

// LISTEN

// `listen` is an express method. Takes in port value and callback function.
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
