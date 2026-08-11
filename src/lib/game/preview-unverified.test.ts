import { describe, expect, it } from "vitest";

import { playChain } from "@/lib/game/chain";
import { formatValue } from "@/lib/game/format";
import { PREVIEW_OBJECTS } from "@/lib/game/preview-unverified";
import { validateDatabase } from "@/lib/game/validate";
import { UNITS } from "@/lib/units";

const TIME_LABELS = {
  second: "s",
  minute: "min",
  hour: "h",
  day: "dni",
  year: "lat",
};

describe("dane podgladowe", () => {
  it("przechodza walidacje bazy", () => {
    expect(validateDatabase(PREVIEW_OBJECTS)).toEqual([]);
  });

  it("kazda jednostka ma co najmniej trzy obiekty", () => {
    for (const unit of UNITS) {
      const owners = PREVIEW_OBJECTS.filter((object) =>
        object.traits.some((trait) => trait.unit === unit),
      );

      expect(owners.length, unit).toBeGreaterThanOrEqual(3);
    }
  });

  it("kazda wartosc formatuje sie na niepusty tekst", () => {
    for (const object of PREVIEW_OBJECTS) {
      for (const trait of object.traits) {
        const formatted = formatValue(trait.value, trait.unit, "pl", TIME_LABELS);
        expect(formatted.amount, `${object.id} ${trait.unit}`).not.toBe("");
      }
    }
  });

  it("daje grywalny lancuch mimo dziesieciu obiektow", () => {
    const rounds = playChain(PREVIEW_OBJECTS, 1, 60);

    expect(rounds.length).toBeGreaterThanOrEqual(5);

    for (const round of rounds) {
      expect(round.reference.object.id).not.toBe(round.hidden.object.id);
    }
  });
});
