import { useEffect, useState } from "react";
import { MediaQueryString } from "./types";

interface queryObj {
  query: MediaQueryString;
}

export const useMediaQuery = (query: queryObj) => {
  const isBrowser = typeof document !== "undefined";

  const [matches, setMatches] = useState(false);

  function handleMediaChange(e: MediaQueryListEvent) {
    setMatches(e.matches);
  }

  useEffect(() => {
    if (!isBrowser) return;
    const mediaQueryList = window.matchMedia(query.query);
    setMatches(mediaQueryList.matches);

    mediaQueryList.addEventListener("change", handleMediaChange);

    return mediaQueryList.removeEventListener("change", handleMediaChange);
  }, [isBrowser, query.query]);

  return matches;
};
