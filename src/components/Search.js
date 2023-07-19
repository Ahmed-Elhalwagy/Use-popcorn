import { useEffect, useRef } from "react";
import { useKey } from "../useKey";

export default function Search({ qurey, setQurey }) {
  const inputElement = useRef(null);

  useKey("enter", function () {
    if (document.activeElement === inputElement.current) return;
    inputElement.current.focus();
    setQurey("");
  });

  useEffect(function () {
    inputElement.current.focus();
  }, []);

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={qurey}
      onChange={(e) => setQurey(e.target.value)}
      ref={inputElement}
    />
  );
}
