import { describe, expect, it } from "vitest";

import { makeObject } from "@/lib/game/fixtures";
import { validateDatabase, validateObject } from "@/lib/game/validate";

const valid = makeObject("burj", "architecture", [
  { unit: "length", value: 828 },
  { unit: "money", value: 1_500_000_000 },
  { unit: "time", value: 189_216_000 },
]);

describe("validateObject", () => {
  it("przepuszcza obiekt z trzema cechami w trzech jednostkach", () => {
    expect(validateObject(valid)).toEqual([]);
  });

  it("odrzuca obiekt z dwiema cechami", () => {
    const object = makeObject("dwie", "music", [
      { unit: "people", value: 1000 },
      { unit: "money", value: 5000 },
    ]);

    expect(validateObject(object)).toEqual([
      "dwie: ma 2 cech, wymagane 3",
      "dwie: ma cechy w 2 jednostkach, wymagane 3",
    ]);
  });

  it("odrzuca trzy cechy w dwoch jednostkach", () => {
    const object = makeObject("powtorka", "sport", [
      { unit: "length", value: 10 },
      { unit: "length", value: 20 },
      { unit: "money", value: 30 },
    ]);

    expect(validateObject(object)).toContain(
      "powtorka: ma cechy w 2 jednostkach, wymagane 3",
    );
  });

  it("wymaga zrodla i daty pomiaru przy kazdej wartosci", () => {
    const object = structuredClone(valid);
    object.traits[1].source = { url: "", retrievedAt: "kiedys" };

    expect(validateObject(object)).toEqual([
      "burj#1: brak zrodla",
      "burj#1: data pomiaru musi byc w formacie RRRR-MM-DD",
    ]);
  });

  it("odrzuca wartosc niedodatnia", () => {
    const object = structuredClone(valid);
    object.traits[0].value = 0;

    expect(validateObject(object)).toContain("burj#0: wartosc musi byc dodatnia");
  });

  it("wymaga nazwy w obu jezykach", () => {
    const object = structuredClone(valid);
    object.name.pl = "";

    expect(validateObject(object)).toContain("burj: brak nazwy w jezyku pl");
  });
});

describe("validateDatabase", () => {
  it("wykrywa zduplikowane id", () => {
    expect(validateDatabase([valid, valid])).toEqual(["zduplikowane id burj"]);
  });
});
