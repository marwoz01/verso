export const UNITS = [
  "people",
  "money",
  "length",
  "weight",
  "time",
  "speed",
  "area",
] as const;

export type Unit = (typeof UNITS)[number];
