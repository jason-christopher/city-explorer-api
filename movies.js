const axios = require('axios');

let cache = {};

async function getMovies(req, res, next) {
  try{
    let searchedCity = req.query.queriedCity;
    let key = `${searchedCity}`;
    let timeRightNow = Date.now();
    // let acceptableTimeToCache = 1000 * 60 * 60 * 24 * 7; // 1 week
    let timeToTestCache = 1000 * 10; // 10 seconds

    if(cache[key] && ((timeRightNow - cache[key].timeStamp) < timeToTestCache)) {
      console.log('The data is in cache.');
      res.status(200).send(cache[key].data);
    } else {
      let movieResults = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${searchedCity}`);
      let movies = movieResults.data.results.map( obj => new Movie(obj));
      let topSixMovies = movies.slice(0,6);
      let filteredMovies = topSixMovies.map(movie => {
        movie.releaseDate = movie.releaseDate.slice(0,4);
        return movie;
      });
      console.log('The data is not in cache.');
      cache[key] = {
        data: filteredMovies,
        timeStamp: Date.now(),
      };
      res.send(filteredMovies);
    }
  } catch (error) {
    Promise.resolve().then(() => {
      throw new Error(error.message);
    }).catch(next);
  }
}

class Movie{
  constructor(obj) {
    this.releaseDate = obj.release_date;
    this.title = obj.title;
    this.overview = obj.overview;
    this.posterImg = 'https://image.tmdb.org/t/p/w500' + obj.poster_path;
  }
}

module.exports = getMovies;
