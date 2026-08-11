import type { Domain } from "@/lib/domains";
import type { Unit } from "@/lib/units";

import { pick, type Rng } from "./random";
import { traitKey, type ChainState, type GameObject, type TraitRef } from "./types";

export const MIN_RATIO = 1.25;
export const MAX_RATIO = 10_000;
export const MIN_RATIO_RELAXED = 1.05;
export const UNIT_RECENCY_WINDOW = 4;

export const RELAXATION_LEVELS = [
  { allowRepeat: false, minRatio: MIN_RATIO, maxRatio: MAX_RATIO },
  {
    allowRepeat: false,
    minRatio: MIN_RATIO_RELAXED,
    maxRatio: Number.POSITIVE_INFINITY,
  },
  { allowRepeat: true, minRatio: MIN_RATIO, maxRatio: MAX_RATIO },
  {
    allowRepeat: true,
    minRatio: MIN_RATIO_RELAXED,
    maxRatio: Number.POSITIVE_INFINITY,
  },
] as const;

export function ratio(a: number, b: number): number {
  return a > b ? a / b : b / a;
}

export function freshness(unit: Unit, recentUnits: readonly Unit[]): number {
  const index = recentUnits.lastIndexOf(unit);
  if (index === -1) return 1;

  return (recentUnits.length - index) / (UNIT_RECENCY_WINDOW + 1);
}

export function findCandidates(
  objects: readonly GameObject[],
  unit: Unit,
  referenceValue: number,
  state: ChainState,
  level: number,
): TraitRef[] {
  const rules = RELAXATION_LEVELS[level];
  if (!rules) return [];

  const found: TraitRef[] = [];

  for (const object of objects) {
    if (object.id === state.carried.object.id) continue;
    if (!rules.allowRepeat && state.usedObjectIds.includes(object.id)) continue;

    object.traits.forEach((trait, traitIndex) => {
      if (trait.unit !== unit) return;
      if (state.usedTraitKeys.includes(traitKey(object.id, traitIndex))) return;

      const gap = ratio(referenceValue, trait.value);
      if (gap < rules.minRatio || gap > rules.maxRatio) return;

      found.push({ object, traitIndex });
    });
  }

  return found;
}

export function chooseCandidate(
  candidates: readonly TraitRef[],
  referenceDomain: Domain,
  rng: Rng,
): TraitRef | null {
  if (candidates.length === 0) return null;

  const distant = candidates.filter(
    (candidate) => candidate.object.domain !== referenceDomain,
  );

  return pick(distant.length > 0 ? distant : candidates, rng);
}
