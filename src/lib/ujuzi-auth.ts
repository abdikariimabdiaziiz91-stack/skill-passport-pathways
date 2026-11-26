import type { LocationOption, SkillField } from "@/lib/ujuzi-data";

export type UserRole = "candidate" | "employer";

export interface AuthUser {
  id: string;
  role: UserRole;
  fullName: string;
  email: string;
  location?: LocationOption;
  field?: SkillField;
  organization?: string;
  isDemo?: boolean;
}

interface StoredAccount extends AuthUser {
  password: string;
}

export interface SignUpPayload {
  role: UserRole;
  fullName: string;
  email: string;
  password: string;
  location?: LocationOption;
  field?: SkillField;
  organization?: string;
}

const ACCOUNTS_KEY = "ujuzipass_accounts_v1";
const SESSION_KEY = "ujuzipass_session_v1";

export const DEMO_ACCOUNTS: Record<UserRole, StoredAccount> = {
  candidate: {
    id: "demo-candidate-01",
    role: "candidate",
    fullName: "Abdirahman Yusuf Ali",
    email: "candidate.demo@ujuzipass.org",
    password: "DemoUser2026!",
    location: "Kakuma / Kalobeyei - Turkana County",
    field: "Software Development",
    isDemo: true,
  },
  employer: {
    id: "demo-employer-01",
    role: "employer",
    fullName: "Grace Wanjiku",
    email: "partner.demo@ujuzipass.org",
    password: "DemoUser2026!",
    organization: "ILO PROSPECTS & Microsoft Africa",
    isDemo: true,
  },
};

function toPublicUser(account: StoredAccount): AuthUser {
  const { password: _password, ...user } = account;
  return user;
}

function loadStoredAccounts(): StoredAccount[] {
  if (typeof window === "undefined") return Object.values(DEMO_ACCOUNTS);
  try {
    const raw = window.localStorage.getItem(ACCOUNTS_KEY);
    if (!raw) return Object.values(DEMO_ACCOUNTS);
    const parsed = JSON.parse(raw) as StoredAccount[];
    if (!Array.isArray(parsed)) return Object.values(DEMO_ACCOUNTS);
    const emails = new Set(parsed.map((a) => a.email.toLowerCase()));
    const merged = [...parsed];
    for (const demo of Object.values(DEMO_ACCOUNTS)) {
      if (!emails.has(demo.email.toLowerCase())) merged.push(demo);
    }
    return merged;
  } catch {
    return Object.values(DEMO_ACCOUNTS);
  }
}

function saveStoredAccounts(accounts: StoredAccount[]): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
  } catch {
    // ignore quota errors
  }
}

export function loadActiveSession(): AuthUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as AuthUser;
    return parsed && typeof parsed.email === "string" ? parsed : null;
  } catch {
    return null;
  }
}

export function saveActiveSession(user: AuthUser | null): void {
  if (typeof window === "undefined") return;
  try {
    if (!user) {
      window.localStorage.removeItem(SESSION_KEY);
    } else {
      window.localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    }
  } catch {
    // ignore quota errors
  }
}

export function registerAccount(
  payload: SignUpPayload,
): { ok: true; user: AuthUser } | { ok: false; error: string } {
  const normalizedEmail = payload.email.trim().toLowerCase();
  const accounts = loadStoredAccounts();
  if (accounts.some((a) => a.email.toLowerCase() === normalizedEmail)) {
    return { ok: false, error: "An account with this email already exists. Try signing in." };
  }

  const newAccount: StoredAccount = {
    id: `usr-${Date.now()}`,
    role: payload.role,
    fullName: payload.fullName.trim(),
    email: normalizedEmail,
    password: payload.password,
    ...(payload.role === "candidate" && payload.location ? { location: payload.location } : {}),
    ...(payload.role === "candidate" && payload.field ? { field: payload.field } : {}),
    ...(payload.role === "employer" && payload.organization
      ? { organization: payload.organization.trim() }
      : {}),
  };

  saveStoredAccounts([newAccount, ...accounts]);
  const publicUser = toPublicUser(newAccount);
  saveActiveSession(publicUser);
  return { ok: true, user: publicUser };
}

export function authenticateAccount(
  email: string,
  password: string,
): { ok: true; user: AuthUser } | { ok: false; error: string } {
  const normalizedEmail = email.trim().toLowerCase();
  const accounts = loadStoredAccounts();
  const match = accounts.find(
    (a) => a.email.toLowerCase() === normalizedEmail && a.password === password,
  );
  if (!match) {
    return { ok: false, error: "Invalid email or password. Check your credentials or use Demo Quick Login." };
  }
  const publicUser = toPublicUser(match);
  saveActiveSession(publicUser);
  return { ok: true, user: publicUser };
}

export function signInDemoAccount(role: UserRole): AuthUser {
  const publicUser = toPublicUser(DEMO_ACCOUNTS[role]);
  saveActiveSession(publicUser);
  return publicUser;
}