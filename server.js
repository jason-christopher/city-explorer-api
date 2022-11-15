'use strict'

console.log('hi');

// REQUIRE
const express = require('express');

// `npm i dotenv`
require('dotenv').config();

// USE
const app = express();

// define the PORT and validate that our .env is working. If not, uses port 3002
const PORT = process.env.PORT || 3002;

// ROUTES

// ERRORS

// LISTEN

// `listen` is an express method. Takes in port value and callback function.
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
