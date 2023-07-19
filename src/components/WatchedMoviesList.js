import WatchedMovie from "./WatchedMovie";

export default function WatchedMoviesList({ watched, onDeleteWatched }) {
  return (
    <ul className="list list-movies">
      {watched?.map((movie) => (
        <WatchedMovie
          movie={movie}
          key={movie.imdbID}
          onDeleteWatched={onDeleteWatched}
        />
      ))}
    </ul>
  );
}
