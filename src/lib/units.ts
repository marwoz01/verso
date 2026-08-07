/**
 * Jednostki, w których porownujemy obiekty.
 *
 * W obrebie jednej rundy jednostka jest zawsze wspolna dla obu kart;
 * zmienia sie miedzy rundami. Patrz context/project-overview.md.
 */
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
