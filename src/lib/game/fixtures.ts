import { DOMAINS, type Domain } from "@/lib/domains";
import { UNITS, type Unit } from "@/lib/units";

import { createRng, pick, type Rng } from "./random";
import type { GameObject, Trait } from "./types";

export const UNIT_AVAILABILITY: Record<Unit, number> = {
  money: 5,
  length: 5,
  time: 4,
  people: 3,
  weight: 3,
  area: 2,
  speed: 1,
};

export function makeTrait(unit: Unit, value: number): Trait {
  return {
    label: { en: `${unit} trait`, pl: `cecha ${unit}` },
    unit,
    value,
    source: { url: "https://example.org/fixture", retrievedAt: "2026-01-01" },
    volatility: "static",
  };
}

export function makeObject(
  id: string,
  domain: Domain,
  traits: ReadonlyArray<{ unit: Unit; value: number }>,
): GameObject {
  return {
    id,
    name: { en: id, pl: id },
    domain,
    traits: traits.map(({ unit, value }) => makeTrait(unit, value)),
  };
}

function weightedUnit(rng: Rng, exclude: ReadonlySet<Unit>): Unit | null {
  const available = UNITS.filter((unit) => !exclude.has(unit));
  if (available.length === 0) return null;

  const total = available.reduce(
    (sum, unit) => sum + UNIT_AVAILABILITY[unit],
    0,
  );
  let roll = rng() * total;

  for (const unit of available) {
    roll -= UNIT_AVAILABILITY[unit];
    if (roll <= 0) return unit;
  }

  return available[available.length - 1];
}

export function makeSyntheticDatabase(options: {
  objectCount: number;
  traitsPerObject: number;
  seed: number;
}): GameObject[] {
  const rng = createRng(options.seed);

  return Array.from({ length: options.objectCount }, (_, index) => {
    const units = new Set<Unit>();

    while (units.size < options.traitsPerObject) {
      const unit = weightedUnit(rng, units);
      if (!unit) break;
      units.add(unit);
    }

    return makeObject(
      `obj-${index}`,
      pick(DOMAINS, rng),
      [...units].map((unit) => ({
        unit,
        value: 10 ** (rng() * 9 + 1),
      })),
    );
  });
}
