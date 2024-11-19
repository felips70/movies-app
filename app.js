export const renderMovies = (movies) => movies.map((movie) => /* html */`
<div class="movie-card" key=${movie._id}>
  <img src="${movie.poster}" alt="img" />
  <div class="ph-3 pw-2 d-flex flex-direction-column gap-2">
    <p class="title">${movie.title}</p>
    <p class="genre">Genre: ${movie.genres.join(", ")}</p>
    <div class="d-flex align-center justify-space-between">
      <p class="rating d-flex align-center gap-1">
        <span class="material-symbols-outlined fs-1point2rem filled"
          >star</span
        ><span class="rating-number">${movie.imdb.rating}</span>
      </p>
      <p class="duration">${movie.runtime} mins</p>
    </div>
  </div>
</div>
`).join("");

export const renderGenres = (genres) => genres.map((genre) => /* html */`
  <option value="${genre === 'Genre' ? 'None' : genre}">${genre}</option>
`).join("");