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
};

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}
