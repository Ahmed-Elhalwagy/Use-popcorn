import { useState, useEffect } from "react";
import Loader from "./Loader";
import StarRating from "./StarRating";
import { useKey } from "../useKey";

export default function MovieDetails({
  selectedId,
  onCloseMovie,
  onAddWatched,
  watched,
}) {
  const [selectedMovie, setSelectedMoive] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const isWatched = watched.map((movie) => movie.imdbId).includes(selectedId);

  function handelAdd() {
    const newMovie = {
      imdbId: selectedMovie.imdbID,
      Title: selectedMovie.Title,
      Year: selectedMovie.Year,
      imdbRating: Number(selectedMovie.imdbRating),
      Poster: selectedMovie.Poster,
      // userRating,
      runtime: Number(selectedMovie.Runtime.split(" ").at(0)),
    };
    onAddWatched(newMovie);
    onCloseMovie();
  }

  useEffect(
    function () {
      if (!selectedMovie) return;
      document.title = `Movie| ${selectedMovie.Title}`;

      return function () {
        document.title = "Usepopcorn";
      };
    },
    [selectedMovie]
  );

  useEffect(
    function () {
      async function getMovieDetails(id) {
        setIsLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=496d4eef&i=${id}`
        );
        const data = await res.json();
        setSelectedMoive(data);
        setIsLoading(false);
      }
      getMovieDetails(selectedId);
    },
    [selectedId]
  );

  useKey("escape", onCloseMovie);

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={selectedMovie.Poster} alt={selectedMovie.Title} />
            <div className="details-overview">
              <h2>{selectedMovie.Title}</h2>
              <p>
                {selectedMovie.Released} &bull; {selectedMovie.Runtime}
              </p>
              <p>{selectedMovie.Genre}</p>
              <p>
                <span>⭐</span>
                {selectedMovie.imdbRating} IMDb rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {isWatched ? (
                <p>You have added this movie to your watched list</p>
              ) : (
                <>
                  <StarRating size={24} maxRating={10} />
                  <button className="btn-add" onClick={handelAdd}>
                    Add to Watched List
                  </button>
                </>
              )}
            </div>

            <p>
              &bull; <em>{selectedMovie.Plot}</em>
            </p>
            <p>&bull; Starring {selectedMovie.Actors}</p>
            <p>&bull; Directed by {selectedMovie.Director}</p>
          </section>
        </>
      )}
    </div>
  );
}
