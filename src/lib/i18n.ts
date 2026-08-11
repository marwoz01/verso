export const LOCALES = ["en", "pl"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

export type Dictionary = {
  meta: {
    title: string;
    description: string;
  };
  hero: {
    tagline: string;
    question: { before: string; highlight: string; after: string };
    lead: string;
  };
  modes: {
    daily: string;
    endless: string;
  };
  howItWorks: {
    title: string;
    body: { before: string; highlight: string; after: string };
  };
  play: {
    streak: string;
    higher: string;
    lower: string;
    correct: string;
    wrong: string;
    exhausted: string;
    again: string;
    home: string;
    relaxed: string;
    time: {
      second: string;
      minute: string;
      hour: string;
      day: string;
      year: string;
    };
  };
};

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}
