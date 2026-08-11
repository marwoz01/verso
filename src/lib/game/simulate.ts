import { UNITS, type Unit } from "@/lib/units";

import { playChain } from "./chain";
import type { GameObject, Round } from "./types";

export type ChainReport = {
  length: number;
  firstRelaxation: number | null;
  units: Unit[];
};

export type DatabaseReport = {
  runs: number;
  medianLength: number;
  fullRunShare: number;
  cleanRunShare: number;
  medianDistinctUnits: number;
  medianDominance: number;
  worstDominance: number;
  starvedUnits: Unit[];
};

function median(values: number[]): number {
  if (values.length === 0) return 0;

  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);

  return sorted.length % 2 === 0
    ? (sorted[middle - 1] + sorted[middle]) / 2
    : sorted[middle];
}

export function measureChain(rounds: Round[]): ChainReport {
  const relaxed = rounds.findIndex((round) => round.relaxation > 0);

  return {
    length: rounds.length,
    firstRelaxation: relaxed === -1 ? null : relaxed + 1,
    units: rounds.map((round) => round.unit),
  };
}

export function measureDatabase(
  objects: readonly GameObject[],
  options: { runs: number; maxRounds: number },
): DatabaseReport {
  const reports = Array.from({ length: options.runs }, (_, seed) =>
    measureChain(playChain(objects, seed + 1, options.maxRounds)),
  );

  const full = reports.filter((report) => report.length >= options.maxRounds);
  const clean = full.filter((report) => report.firstRelaxation === null);

  const appearances = new Map<Unit, number>(UNITS.map((unit) => [unit, 0]));
  const dominances: number[] = [];

  for (const report of reports) {
    const counts = new Map<Unit, number>();

    for (const unit of report.units) {
      counts.set(unit, (counts.get(unit) ?? 0) + 1);
      appearances.set(unit, (appearances.get(unit) ?? 0) + 1);
    }

    dominances.push(
      Math.max(...[...counts.values()].map((count) => count / report.units.length)),
    );
  }

  return {
    runs: options.runs,
    medianLength: median(reports.map((report) => report.length)),
    fullRunShare: full.length / reports.length,
    cleanRunShare: clean.length / reports.length,
    medianDistinctUnits: median(
      reports.map((report) => new Set(report.units).size),
    ),
    medianDominance: median(dominances),
    worstDominance: Math.max(...dominances),
    starvedUnits: UNITS.filter((unit) => (appearances.get(unit) ?? 0) === 0),
  };
}
