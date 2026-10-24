import { describe, expect, it } from "vitest";
import { membershipCodes, type Member } from "@/lib/members";

const member = (name: string, tier: Member["tier"], code?: string): Member => ({ name, credentials: "", tier, profession: "lawyers", code });

describe("membershipCodes", () => {
  it("numbers each tier in list order", () => {
    const list = [member("A", "honorary"), member("B", "fellow"), member("C", "honorary")];
    const codes = membershipCodes(list);
    expect(list.map((m) => codes.get(m))).toEqual(["H-001/26", "F-001/26", "H-002/26"]);
  });

  it("uses a code set by hand, without renumbering anyone else", () => {
    const list = [member("A", "honorary"), member("B", "honorary", "H-100/24"), member("C", "honorary"), member("D", "student", "  ")];
    const codes = membershipCodes(list);
    expect(list.map((m) => codes.get(m))).toEqual(["H-001/26", "H-100/24", "H-003/26", "S-001/26"]);
  });
});

describe("duplicateCodes", () => {
  it("finds a typed number that clashes with another member's", async () => {
    const { duplicateCodes } = await import("@/lib/members");
    // B's typed number is the one A gets automatically.
    const list = [member("A", "honorary"), member("B", "fellow", "h-001/26")];
    expect(duplicateCodes(list)).toEqual([{ code: "H-001/26", names: ["A", "B"] }]);
    expect(duplicateCodes([member("A", "honorary"), member("B", "fellow")])).toEqual([]);
  });
});

describe("the register", () => {
  it("has the five Honorary members with the client's numbers, and no clashes", async () => {
    const { MEMBERS, duplicateCodes } = await import("@/lib/members");
    const codes = membershipCodes(MEMBERS);
    const honorary = MEMBERS.filter((m) => m.tier === "honorary").map((m) => [m.name, codes.get(m)]);
    expect(honorary).toEqual([
      ["Mr. Brijesh Tiwari", "H-001/26"],
      ["Mr. Sudeep Bhargava", "H-003/26"],
      ["Mr. Rajwardhan Gawde", "H-002/26"],
      ["Mr. Bhavesh Tiwari", "H-004/26"],
      ["Mr. Shantanu Sharma", "H-005/26"],
    ]);
    expect(duplicateCodes(MEMBERS)).toEqual([]);
  });
});
