import { useState } from "react";

import NavBar from "./components/NavBar";
import Search from "./components/Search";
import NumResults from "./components/NumResults";
import Main from "./components/Main";
import Box from "./components/Box";
import Loader from "./components/Loader";
import MoviesList from "./components/MoviesList";
import MovieDetails from "./components/MovieDetails";
import WatchedSummary from "./components/WatchedSummary";
import WatchedMoviesList from "./components/WatchedMoviesList";
import ErrorMessage from "./components/ErrorMessage";

import { useMovies } from "./useMovies";
import { useLocalStorage } from "./useLocalStorage";

export default function App() {
  // const [watched, setWatched] = useState(function () {
  //   return JSON.parse(localStorage.getItem("watched"));
  // });
  const [query, setQuery] = useState("");
  const [isOpen1, setIsOpen1] = useState(true);
  const [isOpen2, setIsOpen2] = useState(true);
  const [selectedId, setSelectedId] = useState(null);
  const { movies, isLoading, error } = useMovies(query);
  const [watched, setWatched] = useLocalStorage([], "watched");

  function handelSelectMovie(id) {
    setSelectedId(selectedId === id ? null : id);
  }

  function handelCloseMovie() {
    setSelectedId(null);
  }

  function handelAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handelDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbId !== id));
  }

  return (
    <>
      <NavBar>
        <Search qurey={query} setQurey={setQuery} />
        <NumResults movies={movies} />
      </NavBar>
      <Main>
        <Box isOpen={isOpen1} setIsOpen={setIsOpen1}>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MoviesList movies={movies} onSelectMovie={handelSelectMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box isOpen={isOpen2} setIsOpen={setIsOpen2} movies={watched}>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handelCloseMovie}
              onAddWatched={handelAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              {isOpen2 && (
                <WatchedMoviesList
                  watched={watched}
                  onDeleteWatched={handelDeleteWatched}
                />
              )}
              )
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
