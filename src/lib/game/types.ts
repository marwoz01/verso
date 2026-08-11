import type { Domain } from "@/lib/domains";
import type { Locale } from "@/lib/i18n";
import type { Unit } from "@/lib/units";

export const VOLATILITIES = ["static", "slow", "fast"] as const;

export type Volatility = (typeof VOLATILITIES)[number];

export type Source = {
  url: string;
  retrievedAt: string;
};

export type Trait = {
  label: Record<Locale, string>;
  unit: Unit;
  value: number;
  source: Source;
  volatility: Volatility;
};

export type Photo = {
  url: string;
  author: string;
};

export type GameObject = {
  id: string;
  name: Record<Locale, string>;
  domain: Domain;
  photo?: Photo;
  traits: Trait[];
};

export type TraitRef = {
  object: GameObject;
  traitIndex: number;
};

export type Round = {
  reference: TraitRef;
  hidden: TraitRef;
  unit: Unit;
  relaxation: number;
};

export type ChainState = {
  carried: TraitRef;
  usedObjectIds: readonly string[];
  usedTraitKeys: readonly string[];
  recentUnits: readonly Unit[];
};

export function traitKey(objectId: string, traitIndex: number): string {
  return `${objectId}:${traitIndex}`;
}
