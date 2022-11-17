const axios = require('axios');

async function getWeather(req, res, next) {
  try{
    let searchedLat = req.query.queriedLat;
    let searchedLon = req.query.queriedLon;
    let weatherResults = await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${searchedLat}&lon=${searchedLon}&key=${process.env.WEATHER_API_KEY}&units=I&days=3`);
    let forecast = weatherResults.data.data.map( obj => new Forecast(obj));
    res.send(forecast);
  } catch (error) {
    Promise.resolve().then(() => {
      throw new Error(error.message);
    }).catch(next);
  }
}

class Forecast{
  constructor(obj) {
    this.date = obj.datetime;
    this.high = obj.high_temp;
    this.low = obj.low_temp;
    this.icon = obj.weather.icon;
    this.wind = `${obj.wind_cdir} ${obj.wind_spd} mph`;
    this.description = obj.weather.description;
  }
}

module.exports = getWeather;
