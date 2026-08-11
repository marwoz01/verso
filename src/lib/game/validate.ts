import { DOMAINS } from "@/lib/domains";
import { LOCALES } from "@/lib/i18n";
import { UNITS } from "@/lib/units";

import { VOLATILITIES, type GameObject } from "./types";

export const MIN_TRAITS = 3;
export const MIN_UNITS = 3;

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

function missingLocales(value: Record<string, string>): string[] {
  return LOCALES.filter((locale) => !value?.[locale]?.trim());
}

export function validateObject(object: GameObject): string[] {
  const problems: string[] = [];
  const at = (message: string) => `${object.id}: ${message}`;

  if (!object.id?.trim()) problems.push("obiekt bez id");

  for (const locale of missingLocales(object.name)) {
    problems.push(at(`brak nazwy w jezyku ${locale}`));
  }

  if (!DOMAINS.includes(object.domain)) {
    problems.push(at(`nieznana dziedzina ${object.domain}`));
  }

  if (object.traits.length < MIN_TRAITS) {
    problems.push(at(`ma ${object.traits.length} cech, wymagane ${MIN_TRAITS}`));
  }

  const units = new Set(object.traits.map((trait) => trait.unit));

  if (units.size < MIN_UNITS) {
    problems.push(at(`ma cechy w ${units.size} jednostkach, wymagane ${MIN_UNITS}`));
  }

  object.traits.forEach((trait, index) => {
    const label = `${object.id}#${index}`;

    for (const locale of missingLocales(trait.label)) {
      problems.push(`${label}: brak etykiety w jezyku ${locale}`);
    }

    if (!UNITS.includes(trait.unit)) {
      problems.push(`${label}: nieznana jednostka ${trait.unit}`);
    }

    if (!Number.isFinite(trait.value) || trait.value <= 0) {
      problems.push(`${label}: wartosc musi byc dodatnia`);
    }

    if (!trait.source?.url?.startsWith("http")) {
      problems.push(`${label}: brak zrodla`);
    }

    if (!ISO_DATE.test(trait.source?.retrievedAt ?? "")) {
      problems.push(`${label}: data pomiaru musi byc w formacie RRRR-MM-DD`);
    }

    if (!VOLATILITIES.includes(trait.volatility)) {
      problems.push(`${label}: nieznana zmiennosc ${trait.volatility}`);
    }
  });

  return problems;
}

export function validateDatabase(objects: readonly GameObject[]): string[] {
  const problems = objects.flatMap(validateObject);
  const seen = new Set<string>();

  for (const object of objects) {
    if (seen.has(object.id)) problems.push(`zduplikowane id ${object.id}`);
    seen.add(object.id);
  }

  return problems;
}
