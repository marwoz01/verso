export const DOMAINS = [
  "architecture",
  "geography",
  "nature",
  "space",
  "history",
  "music",
  "film",
  "sport",
  "technology",
  "transport",
  "economy",
  "human",
] as const;

export type Domain = (typeof DOMAINS)[number];
