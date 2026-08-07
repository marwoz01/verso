import { describe, expect, it } from "vitest";
import { UNITS } from "@/lib/units";

describe("UNITS", () => {
  it("zawiera siedem jednostek z zakresu v1", () => {
    expect(UNITS).toHaveLength(7);
  });

  it("nie ma duplikatow", () => {
    expect(new Set(UNITS).size).toBe(UNITS.length);
  });
});
