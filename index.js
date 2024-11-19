import { renderMovies, renderGenres } from "./app.js";

const movieContainer = document.getElementById("movie-container");
const searchInput = document.querySelector(".search");
const ratingSelect = document.getElementById("rating-select");
const genreSelect = document.getElementById("genre-select");

let searchValue = "";
let rating = 0;
let genre = "None";
let filteredMoviesArray = [];

const ENDPOINT = "http://127.0.0.1:3000/api/movies";

const getGenres = (movies) => {
  const allGenres = movies.reduce((acc, curr) => [...acc, ...curr.genres], ['Genre']);
  const uniqueGenres = new Set(allGenres);
  return Array.from(uniqueGenres);
}

const getMovies = async (url) => {
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (err) {
    console.log(err);
  }
}

const movies = await getMovies(ENDPOINT);
const genres = getGenres(movies);
movieContainer.innerHTML = renderMovies(movies);
genreSelect.innerHTML = renderGenres(genres);

const getFilteredData = () => {
  filteredMoviesArray = searchValue.length > 0 ?
    movies.filter(movie =>
      movie.title.toLowerCase().includes(searchValue) ||
      movie.directors.join("").toLowerCase().includes(searchValue) ||
      movie.cast.join("").toLowerCase().includes(searchValue) ||
      movie.writers.join("").toLowerCase().includes(searchValue)
    ) : movies;

  filteredMoviesArray = rating > 0 ? filteredMoviesArray.filter(movie => movie.imdb.rating >= rating) : filteredMoviesArray;

  filteredMoviesArray = genre === 'None' ? filteredMoviesArray : filteredMoviesArray.filter(movie => movie.genres.includes(genre));

  return filteredMoviesArray;
}

const handleSearch = (e) => {
  searchValue = e.target.value.toLowerCase();
  filteredMoviesArray = getFilteredData();
  movieContainer.innerHTML = renderMovies(filteredMoviesArray);
}

const handleSelectRating = (e) => {
  rating = e.target.value;
  filteredMoviesArray = getFilteredData();
  movieContainer.innerHTML = renderMovies(filteredMoviesArray);
}

const handleSelectGenre = (e) => {
  genre = e.target.value;
  filteredMoviesArray = getFilteredData();
  movieContainer.innerHTML = renderMovies(filteredMoviesArray);
}

const debounce = (cb, delay) => {
  let timerId;

  return (...args) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => cb(...args), delay);
  }
}

const debouncedHandleSearch = debounce(handleSearch, 500);

searchInput.addEventListener("input", debouncedHandleSearch);

ratingSelect.addEventListener("change", handleSelectRating);

genreSelect.addEventListener("change", handleSelectGenre);