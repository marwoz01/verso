import { describe, expect, it } from "vitest";

import { playChain } from "@/lib/game/chain";
import { makeSyntheticDatabase } from "@/lib/game/fixtures";
import { seedFromString } from "@/lib/game/random";
import type { Round } from "@/lib/game/types";

const objects = makeSyntheticDatabase({
  objectCount: 60,
  traitsPerObject: 3,
  seed: 1,
});

function ids(rounds: Round[]): string[] {
  return rounds.map(
    (round) => `${round.reference.object.id}>${round.hidden.object.id}`,
  );
}

describe("playChain", () => {
  it("to samo ziarno daje ten sam lancuch", () => {
    expect(ids(playChain(objects, 42, 20))).toEqual(
      ids(playChain(objects, 42, 20)),
    );
  });

  it("rozne ziarna daja rozne lancuchy", () => {
    expect(ids(playChain(objects, 1, 20))).not.toEqual(
      ids(playChain(objects, 2, 20)),
    );
  });

  it("ziarno z daty jest powtarzalne", () => {
    const seed = seedFromString("2026-08-11");
    expect(ids(playChain(objects, seed, 20))).toEqual(
      ids(playChain(objects, seedFromString("2026-08-11"), 20)),
    );
  });

  it("obie karty w rundzie mierzy ta sama jednostka", () => {
    for (const round of playChain(objects, 7, 20)) {
      const reference =
        round.reference.object.traits[round.reference.traitIndex];
      const hidden = round.hidden.object.traits[round.hidden.traitIndex];

      expect(reference.unit).toBe(round.unit);
      expect(hidden.unit).toBe(round.unit);
    }
  });

  it("odsloniety obiekt przechodzi na lewo w nastepnej rundzie", () => {
    const rounds = playChain(objects, 7, 20);

    for (let index = 1; index < rounds.length; index += 1) {
      expect(rounds[index].reference.object.id).toBe(
        rounds[index - 1].hidden.object.id,
      );
    }
  });

  it("sasiednie rundy nigdy nie maja tej samej jednostki", () => {
    const rounds = playChain(objects, 7, 20);

    for (let index = 1; index < rounds.length; index += 1) {
      expect(rounds[index].unit).not.toBe(rounds[index - 1].unit);
    }
  });

  it("obiekt przenoszony jest mierzony inna cecha niz w poprzedniej rundzie", () => {
    const rounds = playChain(objects, 7, 20);

    for (let index = 1; index < rounds.length; index += 1) {
      expect(rounds[index].reference.traitIndex).not.toBe(
        rounds[index - 1].hidden.traitIndex,
      );
    }
  });

  it("dopoki silnik nie dopuszcza powtorek, zaden obiekt sie nie powtarza", () => {
    const rounds = playChain(objects, 7, 20);
    const clean: Round[] = [];

    for (const round of rounds) {
      if (round.relaxation >= 2) break;
      clean.push(round);
    }

    expect(clean.length).toBeGreaterThan(0);

    const seen = [
      clean[0].reference.object.id,
      ...clean.map((round) => round.hidden.object.id),
    ];

    expect(new Set(seen).size).toBe(seen.length);
  });

  it("nie zwraca rundy, w ktorej obiekt gra sam ze soba", () => {
    for (const round of playChain(objects, 7, 20)) {
      expect(round.reference.object.id).not.toBe(round.hidden.object.id);
    }
  });
});
