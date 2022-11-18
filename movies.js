const axios = require('axios');

async function getMovies(req, res, next) {
  try{
    let searchedCity = req.query.queriedCity;
    let movieResults = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${searchedCity}`);
    let movies = movieResults.data.results.map( obj => new Movie(obj));
    let topSixMovies = movies.slice(0,6);
    let filteredMovies = topSixMovies.map(movie => {
      movie.releaseDate = movie.releaseDate.slice(0,4);
      return movie;
    });
    res.send(filteredMovies);
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
