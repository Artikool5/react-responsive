import React, { useMemo } from "react";
import { MediaOrientationValue, MediaQueryString, MediaResolutionValue, MediaValue } from "./types";
import { useMediaQuery } from "./useMediaQuery";

interface MediaQueryProps {
  orientation?: MediaOrientationValue;
  minResolution?: MediaResolutionValue | number;
  maxResolution?: MediaResolutionValue | number;
  minWidth?: MediaValue | number;
  maxWidth?: MediaValue | number;
  minHeight?: MediaValue | number;
  maxHeight?: MediaValue | number;
  children: React.ReactNode | ((matches: boolean) => React.ReactNode);
}

export function MediaQuery(props: MediaQueryProps) {
  const { orientation, minResolution, maxResolution, minWidth, maxWidth, minHeight, maxHeight } = props;

  const query = useMemo<MediaQueryString>(() => {
    if (orientation) return `(orientation: ${orientation})`;
    if (minResolution) {
      const queryValue: MediaResolutionValue = typeof minResolution === "number"
        ? `${minResolution}dppx`
        : minResolution;
      return `(min-resolution: ${queryValue})`;
    }
    if (maxResolution) {
      const queryValue: MediaResolutionValue = typeof maxResolution === "number"
        ? `${maxResolution}dppx`
        : maxResolution;
      return `(max-resolution: ${queryValue})`;
    }
    if (minWidth) {
      const queryValue: MediaValue = typeof minWidth === "number"
        ? `${minWidth}px`
        : minWidth;
      return `(min-width: ${queryValue})`;
    }
    if (maxWidth) {
      const queryValue: MediaValue = typeof maxWidth === "number"
        ? `${maxWidth}px`
        : maxWidth;
      return `(max-width: ${queryValue})`;
    }
    if (minHeight) {
      const queryValue: MediaValue = typeof minHeight === "number"
        ? `${minHeight}px`
        : minHeight;
      return `(min-height: ${queryValue})`;
    }
    if (maxHeight) {
      const queryValue: MediaValue = typeof maxHeight === "number"
        ? `${maxHeight}px`
        : maxHeight;
      return `(max-height: ${queryValue})`;
    }

    return `(min-width: 0px)`;
  }, [orientation, minResolution, maxResolution, minWidth, maxWidth, minHeight, maxHeight]);

  const matches = useMediaQuery({ query: query })

  if (typeof props.children === "function") {
    return props.children(matches);
  }

  return matches ? <>{props.children}</> : null;
}
