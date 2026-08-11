import { describe, expect, it } from "vitest";

import { makeSyntheticDatabase } from "@/lib/game/fixtures";
import { measureDatabase } from "@/lib/game/simulate";

const RUNS = 400;
const TARGET_ROUNDS = 20;

function report(objectCount: number, traitsPerObject: number) {
  return measureDatabase(
    makeSyntheticDatabase({ objectCount, traitsPerObject, seed: 99 }),
    { runs: RUNS, maxRounds: TARGET_ROUNDS },
  );
}

describe("zdrowie bazy", () => {
  it("40 obiektow po 3 cechy przechodzi 20 rund bez rozluznien", () => {
    const result = report(40, 3);

    expect(result.fullRunShare).toBe(1);
    expect(result.cleanRunShare).toBeGreaterThanOrEqual(0.95);
  });

  it("40 obiektow po 3 cechy daje rozne jednostki w biegu", () => {
    const result = report(40, 3);

    expect(result.medianDistinctUnits).toBeGreaterThanOrEqual(5);
    expect(result.medianDominance).toBeLessThanOrEqual(0.35);
    expect(result.starvedUnits).toEqual([]);
  });
});

describe("cechy waza wiecej niz obiekty", () => {
  it("25 obiektow po 3 cechy bije 40 obiektow po 2 cechy", () => {
    const deep = report(25, 3);
    const wide = report(40, 2);

    expect(deep.fullRunShare).toBeGreaterThanOrEqual(wide.fullRunShare);
    expect(deep.cleanRunShare).toBeGreaterThan(0.85);
  });

  it("dwie cechy na obiekt lamia lancuch przy malej bazie", () => {
    expect(report(25, 2).fullRunShare).toBeLessThan(0.9);
  });
});

describe("raport skali", () => {
  it("wypisuje zdrowie bazy dla roznych konfiguracji", () => {
    const rows: string[] = [];

    for (const traits of [2, 3, 4]) {
      for (const count of [25, 40, 60, 100, 150]) {
        const result = report(count, traits);

        rows.push(
          [
            `cech=${traits}`,
            `obiektow=${String(count).padStart(3)}`,
            `wartosci=${String(count * traits).padStart(3)}`,
            `pelnych=${(result.fullRunShare * 100).toFixed(0).padStart(3)}%`,
            `czystych=${(result.cleanRunShare * 100).toFixed(0).padStart(3)}%`,
            `jednostek=${result.medianDistinctUnits}`,
            `dominacja=${(result.medianDominance * 100).toFixed(0)}%`,
          ].join("  "),
        );
      }
    }

    console.log(`\n${rows.join("\n")}\n`);
    expect(rows).toHaveLength(15);
  });
});
