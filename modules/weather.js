'use strict';

const axios = require('axios');
let cache = require('./cache.js');

async function getWeather(latitude, longitude) {
  const key = 'weather-' + latitude + longitude;
  const url = `http://api.weatherbit.io/v2.0/forecast/daily/?key=${process.env.WEATHER_API_KEY}&units=I&lang=en&lat=${latitude}&lon=${longitude}&days=5`;

  if (cache[key] && (Date.now() - cache[key].timestamp < 10000)) {
    console.log('Cache hit');
    console.log(cache);
  } else {
    console.log('Cache miss');
    console.log(cache);
    cache[key] = {};
    cache[key].timestamp = Date.now();
    cache[key].data = await axios.get(url)
      .then(response => parseWeather(response.data));
  }
  return cache[key].data;
}

function parseWeather(weatherData) {
  try {
    const weatherSummaries = weatherData.data.map(day => {
      return new Weather(day);
    });
    return Promise.resolve(weatherSummaries);
  } catch (e) {
    return Promise.reject(e);
  }
}

class Weather {
  constructor(day) {
    this.date = day.datetime.split('').splice(5,5);
    this.high = day.high_temp.toString().split('.')[0];
    this.low = day.low_temp.toString().split('.')[0];
    this.icon = day.weather.icon;
    this.wind = `${day.wind_cdir} ${day.wind_spd.toString().split('.')[0]} mph`;
    this.description = day.weather.description;
  }
}

module.exports = getWeather;
