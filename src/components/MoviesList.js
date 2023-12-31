import Movie from "./Movie";

export default function MoviesList({ movies, onSelectMovie, onDeleteWatched }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie
          movie={movie}
          key={movie.imdbID}
          onSelect={onSelectMovie}
          onDeleteWatched={onDeleteWatched}
        />
      ))}
    </ul>
  );
}
