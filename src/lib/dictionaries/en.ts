import type { Dictionary } from "@/lib/i18n";

export const en: Dictionary = {
  meta: {
    title: "Verso - Guessing Game",
    description:
      "A game of higher or lower across unrelated things. Two objects, one unit, one guess.",
  },
  hero: {
    tagline: "Compare the incomparable",
    question: { before: "Which one is", highlight: "bigger", after: "?" },
    lead: "Two things from different worlds, measured in the same unit.",
  },
  modes: {
    daily: "Daily",
    endless: "Endless",
  },
  howItWorks: {
    title: "How it works",
    body: {
      before:
        "Pick the bigger value. The revealed object stays, but next round it is measured by ",
      highlight: "something else",
      after: ".",
    },
  },
};
