export type SkillField =
  | "Software Development"
  | "Data & SQL"
  | "Healthcare/Nursing"
  | "Civil Engineering"
  | "Accounting/Finance"
  | "Digital Marketing";

export type LocationOption =
  | "Kakuma / Kalobeyei - Turkana County"
  | "Dadaab - Garissa County"
  | "Nairobi";

export type AvailabilityOption = "Remote" | "Hybrid" | "Fellowship/Returnship";

export interface SkillMetric {
  label: string;
  score: number;
}

export interface SkillPassport {
  id: string;
  hashId: string;
  fullName: string;
  location: LocationOption;
  field: SkillField;
  foreignQualification: string;
  evidenceSummary: string;
  verifiedScore: number;
  knqaEquivalency: string;
  stipendRecommendation: string;
  issueDate: string;
  availability: AvailabilityOption;
  complianceStatus: string;
  skills: SkillMetric[];
  isUserCreated?: boolean;
}

export interface InterviewOffer {
  id: string;
  passportId: string;
  candidateName: string;
  organization: string;
  offerType: "Fellowship" | "Job Trial" | "Technical Interview";
  message: string;
  createdAt: string;
}

export interface AssessmentQuestion {
  id: string;
  prompt: string;
  options: string[];
  correctIndex: number;
}

export const SKILL_FIELDS: SkillField[] = [
  "Software Development",
  "Data & SQL",
  "Healthcare/Nursing",
  "Civil Engineering",
  "Accounting/Finance",
  "Digital Marketing",
];

export const LOCATIONS: LocationOption[] = [
  "Kakuma / Kalobeyei - Turkana County",
  "Dadaab - Garissa County",
  "Nairobi",
];

export const FIELD_ASSESSMENTS: Record<SkillField, AssessmentQuestion[]> = {
  "Software Development": [
    {
      id: "sw-1",
      prompt: "Which HTTP status code best indicates a newly created resource after a POST request?",
      options: ["200 OK", "201 Created", "204 No Content", "301 Moved Permanently"],
      correctIndex: 1,
    },
    {
      id: "sw-2",
      prompt: "What is the primary benefit of using database indexes on frequently queried foreign keys?",
      options: [
        "Eliminates the need for primary keys",
        "Compresses binary file uploads",
        "Speeds up lookup and join operations",
        "Prevents SQL syntax errors at compile time",
      ],
      correctIndex: 2,
    },
    {
      id: "sw-3",
      prompt: "In React, why should state updates that depend on previous state use a functional updater?",
      options: [
        "To avoid stale closures during batched updates",
        "To bypass virtual DOM reconciliation",
        "To persist state automatically to localStorage",
        "To allow mutating props directly",
      ],
      correctIndex: 0,
    },
  ],
  "Data & SQL": [
    {
      id: "ds-1",
      prompt: "Which SQL clause filters aggregated groups after a GROUP BY operation?",
      options: ["WHERE", "HAVING", "ORDER BY", "DISTINCT"],
      correctIndex: 1,
    },
    {
      id: "ds-2",
      prompt: "What does a LEFT JOIN return when there is no matching row in the right table?",
      options: [
        "Drops the left row completely",
        "Throws a referential integrity error",
        "Returns the left row with NULL values for right columns",
        "Duplicates the previous matched row",
      ],
      correctIndex: 2,
    },
    {
      id: "ds-3",
      prompt: "Which metric is most robust to extreme outliers when summarizing household income?",
      options: ["Arithmetic Mean", "Median", "Range", "Variance"],
      correctIndex: 1,
    },
  ],
  "Healthcare/Nursing": [
    {
      id: "hc-1",
      prompt: "In emergency triage, which patient condition requires immediate red-category intervention?",
      options: [
        "Closed wrist fracture with stable vitals",
        "Airway obstruction with severe respiratory distress",
        "Mild dehydration with normal mental status",
        "Routine immunization follow-up",
      ],
      correctIndex: 1,
    },
    {
      id: "hc-2",
      prompt: "What is the primary purpose of standard infection prevention precautions in clinic wards?",
      options: [
        "Reduce medication inventory costs",
        "Protect both patients and health workers from cross-transmission",
        "Replace patient charting requirements",
        "Eliminate the need for sterile gloves",
      ],
      correctIndex: 1,
    },
    {
      id: "hc-3",
      prompt: "Before administering an unfamiliar dosage, what is the safest clinical verification step?",
      options: [
        "Estimate based on adult average weight",
        "Double-check the prescriber order, patient ID, and dosage protocol",
        "Skip the dose until next shift without noting it",
        "Ask the patient to confirm the milligram strength",
      ],
      correctIndex: 1,
    },
  ],
  "Civil Engineering": [
    {
      id: "ce-1",
      prompt: "Why is proper water-cement ratio control critical when mixing structural concrete?",
      options: [
        "Excess water weakens compressive strength and durability",
        "More water always increases load-bearing capacity",
        "It only affects surface color",
        "It removes the need for steel reinforcement",
      ],
      correctIndex: 0,
    },
    {
      id: "ce-2",
      prompt: "What is the primary role of a geotechnical soil investigation before foundation design?",
      options: [
        "Measure ambient wind speed",
        "Determine bearing capacity and settlement characteristics",
        "Calculate electrical load requirements",
        "Estimate interior painting costs",
      ],
      correctIndex: 1,
    },
    {
      id: "ce-3",
      prompt: "In rural road drainage design, what do culverts primarily prevent?",
      options: [
        "Solar heating of asphalt",
        "Waterlogging and washout of the road embankment",
        "Excessive traffic signage",
        "Concrete curing shrinkage",
      ],
      correctIndex: 1,
    },
  ],
  "Accounting/Finance": [
    {
      id: "af-1",
      prompt: "Which financial statement reports a company's assets, liabilities, and equity at a point in time?",
      options: ["Income Statement", "Statement of Cash Flows", "Balance Sheet", "Trial Journal"],
      correctIndex: 2,
    },
    {
      id: "af-2",
      prompt: "Under accrual accounting, when should service revenue be recognized?",
      options: [
        "When the service is earned and delivered",
        "Only when cash is deposited in the bank",
        "At the end of the fiscal year regardless of delivery",
        "When a marketing quote is emailed",
      ],
      correctIndex: 0,
    },
    {
      id: "af-3",
      prompt: "What is the main purpose of monthly bank reconciliation?",
      options: [
        "Inflate reported net profit",
        "Identify timing differences, bank fees, or recording errors",
        "Replace statutory tax filing",
        "Approve employee leave balances",
      ],
      correctIndex: 1,
    },
  ],
  "Digital Marketing": [
    {
      id: "dm-1",
      prompt: "Which metric best measures the percentage of ad viewers who click through to a landing page?",
      options: ["CPM", "CTR (Click-Through Rate)", "Bounce Rate", "Churn Rate"],
      correctIndex: 1,
    },
    {
      id: "dm-2",
      prompt: "What is the primary goal of A/B testing two landing page headlines?",
      options: [
        "Increase page load latency",
        "Measure which variant drives higher conversion with real user data",
        "Duplicate SEO meta tags",
        "Disable mobile responsiveness",
      ],
      correctIndex: 1,
    },
    {
      id: "dm-3",
      prompt: "Why are UTM parameters added to campaign URLs?",
      options: [
        "To encrypt user passwords",
        "To track traffic source, medium, and campaign performance accurately",
        "To compress hero images",
        "To bypass search engine indexing",
      ],
      correctIndex: 1,
    },
  ],
};

export const INITIAL_PASSPORTS: SkillPassport[] = [
  {
    id: "UJUZI-2026-8841",
    hashId: "0x9f4a...7c2e81b4",
    fullName: "Amina Hassan Farah",
    location: "Kakuma / Kalobeyei - Turkana County",
    field: "Software Development",
    foreignQualification: "BSc Computer Science — Mogadishu University (Missing Physical Transcript)",
    evidenceSummary: "github.com/amina-farah/kalobeyei-water-tracker · 3/3 Competency Assessment",
    verifiedScore: 93,
    knqaEquivalency: "KNQA Level 7 (Bachelor's Degree Equivalent · Software Engineering)",
    stipendRecommendation: "Microsoft Azure Developer & PLP Africa Full-Stack Certification Waiver",
    issueDate: "2026-11-18",
    availability: "Remote",
    complianceStatus: "Kenya Refugee Act 2021 · ILO PROSPECTS Verified",
    skills: [
      { label: "Python & TypeScript", score: 95 },
      { label: "API & System Design", score: 91 },
      { label: "Problem Solving", score: 94 },
    ],
  },
  {
    id: "UJUZI-2026-8792",
    hashId: "0x4c1d...a83f09e2",
    fullName: "Samuel Deng Garang",
    location: "Kakuma / Kalobeyei - Turkana County",
    field: "Data & SQL",
    foreignQualification: "BSc Statistics — University of Juba (Unverified Foreign Copy)",
    evidenceSummary: "PostgreSQL Humanitarian Aid Dashboard · 3/3 Competency Assessment",
    verifiedScore: 91,
    knqaEquivalency: "KNQA Level 7 (Bachelor's Equivalent · Applied Data Analytics)",
    stipendRecommendation: "Microsoft Power BI PL-300 Voucher & ILO Data Stipend",
    issueDate: "2026-11-15",
    availability: "Fellowship/Returnship",
    complianceStatus: "Kenya Refugee Act 2021 · ILO PROSPECTS Verified",
    skills: [
      { label: "SQL & Data Modeling", score: 94 },
      { label: "Statistical Analysis", score: 90 },
      { label: "BI Visualization", score: 89 },
    ],
  },
  {
    id: "UJUZI-2026-8740",
    hashId: "0x7b82...e15d44a0",
    fullName: "Halima Ibrahim Osman",
    location: "Dadaab - Garissa County",
    field: "Healthcare/Nursing",
    foreignQualification: "Diploma in Clinical Nursing — Khartoum College of Medical Sciences",
    evidenceSummary: "4 yrs Maternal & Triage Care · 3/3 Clinical Competency Assessment",
    verifiedScore: 89,
    knqaEquivalency: "KNQA Level 6 (Higher Diploma Equivalent · Community Nursing)",
    stipendRecommendation: "Kenya Nursing Council Bridging Module & Garissa County Clinical Stipend",
    issueDate: "2026-11-12",
    availability: "Hybrid",
    complianceStatus: "Kenya Refugee Act 2021 · ILO PROSPECTS Verified",
    skills: [
      { label: "Emergency Triage", score: 92 },
      { label: "Infection Prevention", score: 90 },
      { label: "Clinical Documentation", score: 85 },
    ],
  },
  {
    id: "UJUZI-2026-8695",
    hashId: "0x2e6f...c91b77d3",
    fullName: "Jean-Paul Mugisha",
    location: "Nairobi",
    field: "Civil Engineering",
    foreignQualification: "BEng Civil & Structural Engineering — University of Goma",
    evidenceSummary: "AutoCAD Rural Culvert Portfolio · 3/3 Engineering Assessment",
    verifiedScore: 88,
    knqaEquivalency: "KNQA Level 7 (Bachelor's Equivalent · Civil Infrastructure)",
    stipendRecommendation: "EBK Graduate Alignment & County Infrastructure Fellowship",
    issueDate: "2026-11-10",
    availability: "Hybrid",
    complianceStatus: "Kenya Refugee Act 2021 · ILO PROSPECTS Verified",
    skills: [
      { label: "Structural Concrete", score: 90 },
      { label: "Geotechnical Basics", score: 86 },
      { label: "Drainage & CAD", score: 88 },
    ],
  },
  {
    id: "UJUZI-2026-8631",
    hashId: "0x5a0c...f42e66b9",
    fullName: "Fatuma Abdi Mohamed",
    location: "Dadaab - Garissa County",
    field: "Accounting/Finance",
    foreignQualification: "BBA Accounting — SIMAD University (Physical Transcript Lost)",
    evidenceSummary: "NGO Grant Reconciliation Ledger · 3/3 Accounting Assessment",
    verifiedScore: 90,
    knqaEquivalency: "KNQA Level 7 (Bachelor's Equivalent · Financial Accounting)",
    stipendRecommendation: "KASNEB CPA Exemption Review & ILO SME Finance Fellowship",
    issueDate: "2026-11-08",
    availability: "Remote",
    complianceStatus: "Kenya Refugee Act 2021 · ILO PROSPECTS Verified",
    skills: [
      { label: "IFRS & Accrual Ledgers", score: 92 },
      { label: "Bank Reconciliation", score: 91 },
      { label: "Donor Compliance", score: 87 },
    ],
  },
  {
    id: "UJUZI-2026-8584",
    hashId: "0x8d3a...b19c52f1",
    fullName: "Dawit Tesfaye Bekele",
    location: "Nairobi",
    field: "Digital Marketing",
    foreignQualification: "BA Marketing Management — Addis Ababa University",
    evidenceSummary: "East Africa E-Commerce Growth Case Study · 2/3 Assessment",
    verifiedScore: 84,
    knqaEquivalency: "KNQA Level 6/7 (Digital Growth & Performance Marketing)",
    stipendRecommendation: "Microsoft Advertising & PLP Digital Commerce Waiver",
    issueDate: "2026-11-04",
    availability: "Remote",
    complianceStatus: "Kenya Refugee Act 2021 · ILO PROSPECTS Verified",
    skills: [
      { label: "Campaign Analytics", score: 86 },
      { label: "Conversion Testing", score: 84 },
      { label: "Content Strategy", score: 82 },
    ],
  },
];

const FIELD_CONFIG: Record<
  SkillField,
  {
    skills: [string, string, string];
    knqaHigh: string;
    knqaMid: string;
    stipend: string;
    defaultAvailability: AvailabilityOption;
  }
> = {
  "Software Development": {
    skills: ["Python & Web Systems", "System Architecture", "Problem Solving"],
    knqaHigh: "KNQA Level 7 (Bachelor's Degree Equivalent · Software Engineering)",
    knqaMid: "KNQA Level 6 (Higher Diploma Equivalent · Applied Software Dev)",
    stipend: "Microsoft Azure Fundamentals & PLP Africa Certification Waiver",
    defaultAvailability: "Remote",
  },
  "Data & SQL": {
    skills: ["SQL & Data Modeling", "Analytical Reasoning", "BI Reporting"],
    knqaHigh: "KNQA Level 7 (Bachelor's Equivalent · Applied Data Analytics)",
    knqaMid: "KNQA Level 6 (Higher Diploma Equivalent · Data Operations)",
    stipend: "Microsoft Power BI PL-300 Voucher & ILO Data Bridging Stipend",
    defaultAvailability: "Remote",
  },
  "Healthcare/Nursing": {
    skills: ["Clinical Triage", "Infection Control", "Patient Safety"],
    knqaHigh: "KNQA Level 6/7 (Clinical Nursing Equivalency Track)",
    knqaMid: "KNQA Level 6 (Community Health & Nursing Assistant Track)",
    stipend: "Nursing Council Bridging Assessment & County Clinic Stipend",
    defaultAvailability: "Hybrid",
  },
  "Civil Engineering": {
    skills: ["Structural Design", "Site & Soil Analysis", "Infrastructure Planning"],
    knqaHigh: "KNQA Level 7 (Bachelor's Equivalent · Civil Infrastructure)",
    knqaMid: "KNQA Level 6 (Higher Diploma Equivalent · Construction Tech)",
    stipend: "Turkana/Garissa County Works Fellowship & CAD License Waiver",
    defaultAvailability: "Hybrid",
  },
  "Accounting/Finance": {
    skills: ["Financial Reporting", "Reconciliation & Audit", "Compliance"],
    knqaHigh: "KNQA Level 7 (Bachelor's Equivalent · Financial Accounting)",
    knqaMid: "KNQA Level 6 (Higher Diploma Equivalent · Accounting Technician)",
    stipend: "KASNEB Bridging Review & ILO SME Finance Fellowship",
    defaultAvailability: "Fellowship/Returnship",
  },
  "Digital Marketing": {
    skills: ["Performance Analytics", "Growth Experimentation", "Campaign Strategy"],
    knqaHigh: "KNQA Level 7 (Bachelor's Equivalent · Digital Commerce)",
    knqaMid: "KNQA Level 6 (Higher Diploma Equivalent · Digital Marketing)",
    stipend: "Microsoft Advertising & PLP Digital Skills Certification Waiver",
    defaultAvailability: "Remote",
  },
};

export interface EvaluationInput {
  fullName: string;
  location: LocationOption;
  field: SkillField;
  foreignQualification: string;
  evidenceMode: "portfolio" | "assessment";
  portfolioLink: string;
  assessmentAnswers: Record<string, number>;
}

function stableHash(input: string): string {
  let hash = 2166136261;
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(16).padStart(8, "0");
}

export function evaluateCandidate(input: EvaluationInput): SkillPassport {
  const config = FIELD_CONFIG[input.field];
  const questions = FIELD_ASSESSMENTS[input.field];

  let correctCount = 0;
  if (input.evidenceMode === "assessment") {
    for (const q of questions) {
      if (input.assessmentAnswers[q.id] === q.correctIndex) {
        correctCount += 1;
      }
    }
  }

  const trimmedPortfolio = input.portfolioLink.trim();
  const hasStrongPortfolio =
    trimmedPortfolio.length >= 18 ||
    trimmedPortfolio.includes("github.com") ||
    trimmedPortfolio.includes("gitlab.com") ||
    trimmedPortfolio.includes("http");

  let verifiedScore = 76;
  if (input.evidenceMode === "assessment") {
    verifiedScore = 64 + correctCount * 10 + (input.foreignQualification.trim().length > 12 ? 3 : 0);
  } else {
    verifiedScore = hasStrongPortfolio ? 89 : 79;
    if (trimmedPortfolio.length > 45) verifiedScore += 4;
  }
  verifiedScore = Math.max(58, Math.min(98, verifiedScore));

  const fingerprint = stableHash(
    `${input.fullName}|${input.field}|${input.location}|${Date.now()}`,
  );
  const numericId = (parseInt(fingerprint.slice(0, 4), 16) % 8999) + 1000;
  const issueDate = new Date().toISOString().slice(0, 10);

  const [s1, s2, s3] = config.skills;
  const skills: SkillMetric[] = [
    { label: s1, score: Math.min(99, verifiedScore + 2) },
    { label: s2, score: Math.max(55, verifiedScore - 3) },
    { label: s3, score: Math.min(98, verifiedScore + 1) },
  ];

  const evidenceSummary =
    input.evidenceMode === "assessment"
      ? `Built-in Competency Micro-Assessment (${correctCount}/${questions.length} Verified)`
      : trimmedPortfolio;

  return {
    id: `UJUZI-2026-${numericId}`,
    hashId: `0x${fingerprint.slice(0, 4)}...${fingerprint.slice(4)}${numericId.toString(16).slice(0, 4)}`,
    fullName: input.fullName.trim(),
    location: input.location,
    field: input.field,
    foreignQualification: input.foreignQualification.trim(),
    evidenceSummary,
    verifiedScore,
    knqaEquivalency: verifiedScore >= 82 ? config.knqaHigh : config.knqaMid,
    stipendRecommendation: config.stipend,
    issueDate,
    availability: config.defaultAvailability,
    complianceStatus: "Kenya Refugee Act 2021 · ILO PROSPECTS Verified",
    skills,
    isUserCreated: true,
  };
}

export const SAMPLE_CANDIDATE: EvaluationInput = {
  fullName: "Abdirahman Yusuf Ali",
  location: "Kakuma / Kalobeyei - Turkana County",
  field: "Software Development",
  foreignQualification: "BSc Computer Science — Mogadishu University (Missing Physical Transcript)",
  evidenceMode: "assessment",
  portfolioLink: "https://github.com/abdirahman-ali/turkana-clinic-queue-api",
  assessmentAnswers: {
    "sw-1": 1,
    "sw-2": 2,
    "sw-3": 0,
  },
};

const PASSPORTS_KEY = "ujuzipass_passports_v1";
const OFFERS_KEY = "ujuzipass_offers_v1";

export function loadStoredPassports(): SkillPassport[] {
  if (typeof window === "undefined") return INITIAL_PASSPORTS;
  try {
    const raw = window.localStorage.getItem(PASSPORTS_KEY);
    if (!raw) return INITIAL_PASSPORTS;
    const parsed = JSON.parse(raw) as SkillPassport[];
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_PASSPORTS;
  } catch {
    return INITIAL_PASSPORTS;
  }
}

export function saveStoredPassports(passports: SkillPassport[]): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(PASSPORTS_KEY, JSON.stringify(passports));
  } catch {
    // ignore quota errors
  }
}

export function loadStoredOffers(): InterviewOffer[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(OFFERS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as InterviewOffer[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveStoredOffers(offers: InterviewOffer[]): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(OFFERS_KEY, JSON.stringify(offers));
  } catch {
    // ignore quota errors
  }
}