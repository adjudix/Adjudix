import { describe, expect, it } from "vitest";
import { estimateFees } from "@/lib/fee-schedule";

describe("fast track fees", () => {
  it("cost the whole regular fee plus 15%", () => {
    for (const claim of [300_000, 1_000_000, 50_000_000]) {
      const regular = estimateFees(claim, 1, false);
      const fast = estimateFees(claim, 1, true);
      expect(fast.fastTrack).toBe(true);
      expect(Math.abs(fast.total - regular.total * 1.15)).toBeLessThan(5);
    }
  });

  it("don't stack with emergency arbitration", () => {
    const emergency = estimateFees(1_000_000, 1, false, undefined, true);
    const both = estimateFees(1_000_000, 1, true, undefined, true);
    expect(both.total).toBe(emergency.total);
    expect(both.fastTrack).toBe(false);
  });
});

describe("emergency arbitration fees", () => {
  it("cost the whole regular fee plus 15%", () => {
    for (const claim of [300_000, 1_000_000, 50_000_000]) {
      const regular = estimateFees(claim, 1, false);
      const emergency = estimateFees(claim, 1, false, undefined, true);
      expect(emergency.emergency).toBe(true);
      // Each part is rounded to the rupee, so the total is within a few rupees of 115%.
      expect(Math.abs(emergency.total - regular.total * 1.15)).toBeLessThan(5);
      expect(emergency.tribunal).toBe(Math.round(regular.tribunal * 1.15));
    }
  });

  it("leave the regular fee unchanged", () => {
    expect(estimateFees(1_000_000, 1, false).emergency).toBe(false);
  });
});
