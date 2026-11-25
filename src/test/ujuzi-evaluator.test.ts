import { describe, expect, it } from "vitest";
import { evaluateCandidate, SAMPLE_CANDIDATE } from "@/lib/ujuzi-data";

describe("UjuziPass credential evaluator", () => {
  it("computes high verified score and KNQA Level 7 for 3/3 assessment answers", () => {
    const passport = evaluateCandidate(SAMPLE_CANDIDATE);
    expect(passport.verifiedScore).toBeGreaterThanOrEqual(90);
    expect(passport.knqaEquivalency).toContain("KNQA Level 7");
    expect(passport.id).toMatch(/^UJUZI-2026-\d{4}$/);
    expect(passport.skills).toHaveLength(3);
  });

  it("maps lower assessment score to KNQA Level 6", () => {
    const passport = evaluateCandidate({
      ...SAMPLE_CANDIDATE,
      assessmentAnswers: { "sw-1": 0, "sw-2": 0, "sw-3": 1 },
    });
    expect(passport.verifiedScore).toBeLessThan(82);
    expect(passport.knqaEquivalency).toContain("KNQA Level 6");
  });
});