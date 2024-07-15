export type Media = "min-width" | "max-width" | "min-height" | "max-height";
export type MediaResolution = "min-resolution" | "max-resolution";
export type MediaOrientationValue = "portrait" | "landscape";
export type MediaResolutionUnits = "dpi" | "dppx" | "x" | "dpcm";
export type MediaUnits = "px" | "rem" | "em";
export type MediaResolutionValue = `${number}${MediaResolutionUnits}`;
export type MediaValue = `${number}${MediaUnits}`;
export type MediaQueryString =
  | `(${Media}: ${MediaValue})`
  | `(${MediaResolution}: ${MediaResolutionValue})`
  | `(orientation: ${MediaOrientationValue})`;

export type ValueOf<T> = T[keyof T];
