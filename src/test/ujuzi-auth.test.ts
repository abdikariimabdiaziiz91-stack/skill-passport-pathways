import { beforeEach, describe, expect, it } from "vitest";
import {
  authenticateAccount,
  loadActiveSession,
  registerAccount,
  saveActiveSession,
  signInDemoAccount,
} from "@/lib/ujuzi-auth";

describe("UjuziPass client-side authentication", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("registers a candidate, persists session, and rejects duplicate emails", () => {
    const created = registerAccount({
      role: "candidate",
      fullName: "Nadia Osman",
      email: "nadia@example.com",
      password: "Password123",
      location: "Dadaab - Garissa County",
      field: "Data & SQL",
    });

    expect(created.ok).toBe(true);
    if (created.ok) {
      expect(created.user.fullName).toBe("Nadia Osman");
      expect(created.user.location).toBe("Dadaab - Garissa County");
      expect(loadActiveSession()?.email).toBe("nadia@example.com");
    }

    const duplicate = registerAccount({
      role: "candidate",
      fullName: "Nadia Duplicate",
      email: "NADIA@example.com",
      password: "Password123",
    });
    expect(duplicate.ok).toBe(false);
  });

  it("authenticates registered users and rejects wrong passwords", () => {
    registerAccount({
      role: "employer",
      fullName: "David Ochieng",
      organization: "Turkana County Tech",
      email: "david@turkana.go.ke",
      password: "PartnerPass99",
    });
    saveActiveSession(null);
    expect(loadActiveSession()).toBeNull();

    const badLogin = authenticateAccount("david@turkana.go.ke", "wrong");
    expect(badLogin.ok).toBe(false);

    const goodLogin = authenticateAccount("david@turkana.go.ke", "PartnerPass99");
    expect(goodLogin.ok).toBe(true);
    if (goodLogin.ok) {
      expect(goodLogin.user.organization).toBe("Turkana County Tech");
    }
  });

  it("supports 1-click demo judge quick login for candidate and employer", () => {
    const candidate = signInDemoAccount("candidate");
    expect(candidate.role).toBe("candidate");
    expect(loadActiveSession()?.id).toBe(candidate.id);

    const employer = signInDemoAccount("employer");
    expect(employer.role).toBe("employer");
    expect(employer.organization).toBeTruthy();
  });
});