import { useState, useEffect } from "react";

const API_KEY = "496d4eef";
const API_URL = `http://www.omdbapi.com/?apikey=${API_KEY}`;

export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(
    function () {
      const controller = new AbortController();
      async function fetchMovies() {
        try {
          setError("");
          setIsLoading(true);

          const res = await fetch(`${API_URL}&s=${query}`, {
            signal: controller.signal,
          });

          if (!res.ok) throw Error("Failed to fetch");

          const data = await res.json();

          if (data.Response === "False") throw Error("Movie is not found");
          setMovies(data.Search);
          setIsLoading(false);
        } catch (err) {
          if (err.name === "AbortError") {
            setError("");
            return;
          }
          console.error(err.message);
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }
      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }
      fetchMovies();
      return function () {
        controller.abort();
      };
    },
    [query]
  );
  return { movies, isLoading, error };
}
