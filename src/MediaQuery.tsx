import React, { useMemo } from "react";
import {
  Media,
  MediaOrientationValue,
  MediaQueryString,
  MediaResolution,
  MediaResolutionValue,
  MediaValue,
  ValueOf
} from "./types";
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
};
type MediaQueryPropsValue = ValueOf<{
  [K in keyof Omit<MediaQueryProps, 'children'>]: MediaQueryProps[K]
}>

export function MediaQuery(props: MediaQueryProps) {
  const query = useMemo<MediaQueryString>(() => {
    const mediaKeys: Record<keyof Omit<MediaQueryProps, "children">, Media | MediaResolution | "orientation"> = {
      minResolution: "min-resolution",
      maxResolution: "max-resolution",
      minWidth: "min-width",
      maxWidth: "max-width",
      minHeight: "min-height",
      maxHeight: "max-height",
      orientation: "orientation",
    };

    const queries: string[] = [];

    for (let mediaName in mediaKeys) {
      if (mediaName in props) {
        const typedMediaName = mediaName as keyof typeof mediaKeys;
        const mediaValue = props[typedMediaName] as MediaQueryPropsValue;

        if (mediaValue) {
          const mediaQueryKey = mediaKeys[typedMediaName];
          const unit = mediaQueryKey?.includes("resolution") ? "dppx" : "px" || '';
          const mediaQueryValue = typeof mediaValue === "number" ? `${mediaValue}${unit}` : mediaValue;

          queries.push(`${mediaQueryKey}: ${mediaQueryValue}`)
        }
      }
    }

    const finalQuery = queries.join(" and ") as MediaQueryString || "(min-width: 0px)";
    return finalQuery;

  }, [props]);

  const matches = useMediaQuery({ query: query });

  if (typeof props.children === "function") {
    return props.children(matches);
  }

  return matches ? <>{props.children}</> : null;
}
