import { useEffect, useState } from "react";
import { MediaQueryString } from "./types";

interface queryObj {
  query: MediaQueryString;
}

export const useMediaQuery = (query: queryObj) => {
  const isBrowser = typeof document !== "undefined";

  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (!isBrowser) return;
    const mediaQueryList = window.matchMedia(query.query);
    setMatches(mediaQueryList.matches);

    mediaQueryList.addEventListener("change", (e) => {
      setMatches(e.matches);
    });

    return mediaQueryList.removeEventListener("change", (e) => {
      setMatches(e.matches);
    });
  }, [isBrowser, query.query]);

  return matches;
};
