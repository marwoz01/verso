import {
  RELAXATION_LEVELS,
  UNIT_RECENCY_WINDOW,
  chooseCandidate,
  findCandidates,
  freshness,
} from "./candidates";
import { createRng, pick, type Rng } from "./random";
import {
  traitKey,
  type ChainState,
  type GameObject,
  type Round,
  type TraitRef,
} from "./types";

export type Step = {
  round: Round;
  state: ChainState;
};

function advance(
  state: ChainState,
  reference: TraitRef,
  hidden: TraitRef,
  unit: Round["unit"],
): ChainState {
  return {
    carried: hidden,
    usedObjectIds: [
      ...new Set([
        ...state.usedObjectIds,
        reference.object.id,
        hidden.object.id,
      ]),
    ],
    usedTraitKeys: [
      ...state.usedTraitKeys,
      traitKey(reference.object.id, reference.traitIndex),
      traitKey(hidden.object.id, hidden.traitIndex),
    ],
    recentUnits: [...state.recentUnits, unit].slice(-UNIT_RECENCY_WINDOW),
  };
}

export function startChain(
  objects: readonly GameObject[],
  rng: Rng,
): Step | null {
  const starts: TraitRef[] = objects.flatMap((object) =>
    object.traits.map((_, traitIndex) => ({ object, traitIndex })),
  );

  if (starts.length === 0) return null;

  for (let attempt = 0; attempt < starts.length; attempt += 1) {
    const reference = pick(starts, rng);
    const trait = reference.object.traits[reference.traitIndex];
    const state: ChainState = {
      carried: reference,
      usedObjectIds: [],
      usedTraitKeys: [],
      recentUnits: [],
    };

    for (let level = 0; level < RELAXATION_LEVELS.length; level += 1) {
      const candidates = findCandidates(
        objects,
        trait.unit,
        trait.value,
        state,
        level,
      );
      const hidden = chooseCandidate(candidates, reference.object.domain, rng);
      if (!hidden) continue;

      return {
        round: { reference, hidden, unit: trait.unit, relaxation: level },
        state: advance(state, reference, hidden, trait.unit),
      };
    }
  }

  return null;
}

export function nextRound(
  objects: readonly GameObject[],
  state: ChainState,
  rng: Rng,
): Step | null {
  const carried = state.carried.object;
  const usedUnit = carried.traits[state.carried.traitIndex].unit;

  for (let level = 0; level < RELAXATION_LEVELS.length; level += 1) {
    const options = carried.traits
      .map((trait, traitIndex) => ({ trait, traitIndex }))
      .filter(
        ({ trait, traitIndex }) =>
          trait.unit !== usedUnit &&
          !state.usedTraitKeys.includes(traitKey(carried.id, traitIndex)),
      )
      .map(({ trait, traitIndex }) => {
        const candidates = findCandidates(
          objects,
          trait.unit,
          trait.value,
          state,
          level,
        );

        return {
          traitIndex,
          unit: trait.unit,
          candidates,
          score: candidates.length * freshness(trait.unit, state.recentUnits),
        };
      })
      .filter((option) => option.candidates.length > 0);

    if (options.length === 0) continue;

    const bestScore = Math.max(...options.map((option) => option.score));
    const chosen = pick(
      options.filter((option) => option.score === bestScore),
      rng,
    );
    const hidden = chooseCandidate(chosen.candidates, carried.domain, rng);
    if (!hidden) continue;

    const reference: TraitRef = {
      object: carried,
      traitIndex: chosen.traitIndex,
    };

    return {
      round: { reference, hidden, unit: chosen.unit, relaxation: level },
      state: advance(state, reference, hidden, chosen.unit),
    };
  }

  return null;
}

export function playChain(
  objects: readonly GameObject[],
  seed: number,
  maxRounds: number,
): Round[] {
  const rng = createRng(seed);
  const first = startChain(objects, rng);
  if (!first) return [];

  const rounds: Round[] = [first.round];
  let state = first.state;

  while (rounds.length < maxRounds) {
    const step = nextRound(objects, state, rng);
    if (!step) break;

    rounds.push(step.round);
    state = step.state;
  }

  return rounds;
}
