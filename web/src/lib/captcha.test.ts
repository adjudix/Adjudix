// @vitest-environment node
import { describe, expect, it, vi } from "vitest";
import { createCaptcha, verifyCaptcha } from "./captcha";

// Reads the code back out of the drawn SVG (one <text> per character).
function answerOf(svg: string) {
  return [...svg.matchAll(/>([A-Z0-9])<\/text>/g)].map((m) => m[1]).join("");
}

describe("captcha", () => {
  it("accepts the right answer, in any case", () => {
    const { svg, token } = createCaptcha();
    const answer = answerOf(svg);
    expect(answer).toHaveLength(5);
    expect(verifyCaptcha(token, answer)).toBe(true);
    expect(verifyCaptcha(token, answer.toLowerCase())).toBe(true);
  });

  it("rejects a wrong answer or a tampered token", () => {
    const { svg, token } = createCaptcha();
    expect(verifyCaptcha(token, "XXXXX")).toBe(false);
    expect(verifyCaptcha(`${Date.now() + 1e9}.${token.split(".").slice(1).join(".")}`, answerOf(svg))).toBe(false);
    expect(verifyCaptcha("garbage", "ABCDE")).toBe(false);
  });

  it("expires", () => {
    const { svg, token } = createCaptcha();
    vi.useFakeTimers();
    vi.setSystemTime(Date.now() + 11 * 60 * 1000);
    expect(verifyCaptcha(token, answerOf(svg))).toBe(false);
    vi.useRealTimers();
  });
});
