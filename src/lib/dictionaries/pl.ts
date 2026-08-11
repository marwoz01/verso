import type { Dictionary } from "@/lib/i18n";

export const pl: Dictionary = {
  meta: {
    title: "Verso - Gra w zgadywanie",
    description:
      "Gra higher/lower na rzeczach, które nie mają ze sobą nic wspólnego. Dwa obiekty, jedna jednostka, jedna decyzja.",
  },
  hero: {
    tagline: "Porównaj nieporównywalne",
    question: { before: "Co jest", highlight: "większe", after: "?" },
    lead: "Dwie rzeczy z różnych światów, zmierzone tą samą jednostką.",
  },
  modes: {
    daily: "Daily",
    endless: "Endless",
  },
  howItWorks: {
    title: "Jak to działa",
    body: {
      before:
        "Wybierz większą wartość. Odsłonięty obiekt zostaje, ale w następnej rundzie mierzymy go ",
      highlight: "inną cechą",
      after: ".",
    },
  },
};
