const axios = require('axios');

let cache = require('./modules/cache.js');

async function getWeather(req, res, next) {
  try{
    let searchedLat = req.query.queriedLat;
    let searchedLon = req.query.queriedLon;
    let key = `${searchedLat}${searchedLon}`;
    let timeRightNow = Date.now();
    // let acceptableTimeToCache = 1000 * 60 * 60 * 6; //6 hours
    let timeToTestCache = 1000 * 10; // 10 seconds

    if(cache[key] && ((timeRightNow - cache[key].timeStamp) < timeToTestCache)) {
      console.log('Cache hit');
      res.status(200).send(cache[key].data);
    } else {
      let weatherResults = await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${searchedLat}&lon=${searchedLon}&key=${process.env.WEATHER_API_KEY}&units=I&days=3`);
      let forecast = weatherResults.data.data.map( obj => new Forecast(obj));
      console.log('Cache miss');
      cache[key] = {
        data: forecast,
        timeStamp: Date.now(),
      };
      res.status(200).send(forecast);
    }
  } catch (error) {
    Promise.resolve().then(() => {
      throw new Error(error.message);
    }).catch(next);
  }
}

class Forecast{
  constructor(obj) {
    this.date = obj.datetime.split('').splice(5,5);
    this.high = obj.high_temp.toString().split('.')[0];
    this.low = obj.low_temp.toString().split('.')[0];
    this.icon = obj.weather.icon;
    this.wind = `${obj.wind_cdir} ${obj.wind_spd.toString().split('.')[0]} mph`;
    this.description = obj.weather.description;
  }
}

module.exports = getWeather;
