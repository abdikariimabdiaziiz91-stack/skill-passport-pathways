import { useState } from "react";
import {
  ArrowRight,
  Award,
  CheckCircle2,
  Cpu,
  FileCheck2,
  Loader2,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  FIELD_ASSESSMENTS,
  LOCATIONS,
  SAMPLE_CANDIDATE,
  SKILL_FIELDS,
  evaluateCandidate,
  type LocationOption,
  type SkillField,
  type SkillPassport,
} from "@/lib/ujuzi-data";

interface EvaluatorTabProps {
  onPassportCreated: (passport: SkillPassport) => void;
  onOpenPassport: (passportId: string) => void;
}

const VERIFICATION_STEPS = [
  "Checking Competency & Evidence Signals",
  "Mapping to KNQA & East African Standards",
  "Generating Cryptographic Hash ID",
];

export function EvaluatorTab({ onPassportCreated, onOpenPassport }: EvaluatorTabProps) {
  const [fullName, setFullName] = useState("");
  const [location, setLocation] = useState<LocationOption>(LOCATIONS[0]!);
  const [field, setField] = useState<SkillField>(SKILL_FIELDS[0]!);
  const [foreignQualification, setForeignQualification] = useState("");
  const [evidenceMode, setEvidenceMode] = useState<"assessment" | "portfolio">("assessment");
  const [portfolioLink, setPortfolioLink] = useState("");
  const [assessmentAnswers, setAssessmentAnswers] = useState<Record<string, number>>({});
  const [isRunning, setIsRunning] = useState(false);
  const [activeStep, setActiveStep] = useState(-1);
  const [latestResult, setLatestResult] = useState<SkillPassport | null>(null);

  const questions = FIELD_ASSESSMENTS[field];
  const answeredCount = questions.filter((q) => assessmentAnswers[q.id] !== undefined).length;

  const handleLoadSample = () => {
    setFullName(SAMPLE_CANDIDATE.fullName);
    setLocation(SAMPLE_CANDIDATE.location);
    setField(SAMPLE_CANDIDATE.field);
    setForeignQualification(SAMPLE_CANDIDATE.foreignQualification);
    setEvidenceMode(SAMPLE_CANDIDATE.evidenceMode);
    setPortfolioLink(SAMPLE_CANDIDATE.portfolioLink);
    setAssessmentAnswers(SAMPLE_CANDIDATE.assessmentAnswers);
    setLatestResult(null);
    toast.info("Sample candidate loaded — ready to run AI verification.");
  };

  const handleRunVerification = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      toast.error("Please enter the candidate's full name.");
      return;
    }
    if (!foreignQualification.trim()) {
      toast.error("Please enter the unrecognized or missing foreign qualification.");
      return;
    }
    if (evidenceMode === "portfolio" && portfolioLink.trim().length < 6) {
      toast.error("Please paste a GitHub repo link or brief portfolio summary.");
      return;
    }
    if (evidenceMode === "assessment" && answeredCount < questions.length) {
      toast.error(`Please answer all ${questions.length} competency questions to continue.`);
      return;
    }

    setIsRunning(true);
    setActiveStep(0);
    setLatestResult(null);

    window.setTimeout(() => setActiveStep(1), 650);
    window.setTimeout(() => setActiveStep(2), 1300);
    window.setTimeout(() => {
      const passport = evaluateCandidate({
        fullName,
        location,
        field,
        foreignQualification,
        evidenceMode,
        portfolioLink,
        assessmentAnswers,
      });
      setIsRunning(false);
      setActiveStep(3);
      setLatestResult(passport);
      onPassportCreated(passport);
      toast.success(`Verified Skill Passport ${passport.id} generated and unlocked!`);
    }, 2000);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-12">
      <Card className="border-border/80 shadow-sm lg:col-span-7">
        <CardHeader className="flex flex-col gap-3 border-b border-border/60 pb-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="text-xl">Candidate Skill &amp; Credential Evaluator</CardTitle>
            <CardDescription className="mt-1">
              Validate real competency and map missing foreign credentials to KNQA standards.
            </CardDescription>
          </div>
          <Button type="button" variant="outline" size="sm" onClick={handleLoadSample} className="shrink-0 gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-verified" />
            Load Sample Candidate Data
          </Button>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleRunVerification} className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  placeholder="e.g., Abdirahman Yusuf Ali"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Current Location</Label>
                <select
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value as LocationOption)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {LOCATIONS.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="field">Primary Field</Label>
                <select
                  id="field"
                  value={field}
                  onChange={(e) => {
                    setField(e.target.value as SkillField);
                    setAssessmentAnswers({});
                  }}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {SKILL_FIELDS.map((f) => (
                    <option key={f} value={f}>
                      {f}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="qualification">Unrecognized / Missing Foreign Qualification</Label>
                <Input
                  id="qualification"
                  placeholder="e.g., BSc Computer Science - Mogadishu Univ."
                  value={foreignQualification}
                  onChange={(e) => setForeignQualification(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-3 rounded-lg border border-border bg-secondary/40 p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <Label className="text-sm font-semibold">Proof of Real Competency</Label>
                <div className="inline-flex rounded-md border border-border bg-background p-0.5 text-xs">
                  <button
                    type="button"
                    onClick={() => setEvidenceMode("assessment")}
                    className={`rounded px-2.5 py-1 font-medium transition-colors ${
                      evidenceMode === "assessment"
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    3-Question Micro-Assessment
                  </button>
                  <button
                    type="button"
                    onClick={() => setEvidenceMode("portfolio")}
                    className={`rounded px-2.5 py-1 font-medium transition-colors ${
                      evidenceMode === "portfolio"
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    GitHub / Portfolio Link
                  </button>
                </div>
              </div>

              {evidenceMode === "portfolio" ? (
                <div className="space-y-2">
                  <Textarea
                    rows={3}
                    placeholder="Paste a GitHub repository URL, live project link, or concise summary of verified work..."
                    value={portfolioLink}
                    onChange={(e) => setPortfolioLink(e.target.value)}
                    className="bg-background"
                  />
                </div>
              ) : (
                <div className="space-y-4">
                  {questions.map((q, idx) => (
                    <div key={q.id} className="rounded-md border border-border/70 bg-background p-3">
                      <p className="text-sm font-medium text-foreground">
                        {idx + 1}. {q.prompt}
                      </p>
                      <div className="mt-2.5 grid gap-2 sm:grid-cols-2">
                        {q.options.map((opt, optIdx) => {
                          const selected = assessmentAnswers[q.id] === optIdx;
                          return (
                            <button
                              key={opt}
                              type="button"
                              onClick={() =>
                                setAssessmentAnswers((prev) => ({ ...prev, [q.id]: optIdx }))
                              }
                              className={`rounded-md border px-3 py-2 text-left text-xs transition-colors ${
                                selected
                                  ? "border-primary bg-primary-soft font-medium text-primary"
                                  : "border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground"
                              }`}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Button type="submit" disabled={isRunning} className="w-full gap-2" size="lg">
              {isRunning ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Running AI Verification &amp; KNQA Mapping...
                </>
              ) : (
                <>
                  <Cpu className="h-4 w-4" />
                  Run AI Verification &amp; Mapping
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-6 lg:col-span-5">
        <Card className="border-border/80 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <ShieldCheck className="h-4 w-4 text-primary" />
              Verification Engine Pipeline
            </CardTitle>
            <CardDescription>Real-time competency scoring and KNQA equivalency mapping.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {VERIFICATION_STEPS.map((stepLabel, idx) => {
              const done = activeStep > idx;
              const active = isRunning && activeStep === idx;
              return (
                <div
                  key={stepLabel}
                  className={`flex items-center gap-3 rounded-lg border px-3.5 py-3 text-sm transition-colors ${
                    done
                      ? "border-primary/30 bg-primary-soft/60 text-foreground"
                      : active
                        ? "border-verified/50 bg-verified-soft text-foreground"
                        : "border-border/70 bg-secondary/30 text-muted-foreground"
                  }`}
                >
                  {done ? (
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                  ) : active ? (
                    <Loader2 className="h-4 w-4 shrink-0 animate-spin text-verified" />
                  ) : (
                    <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-current text-[10px] font-semibold">
                      {idx + 1}
                    </span>
                  )}
                  <span className="font-medium">{stepLabel}</span>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {latestResult ? (
          <Card className="border-primary/40 bg-card shadow-sm">
            <CardHeader className="border-b border-border/60 pb-4">
              <div className="flex items-center justify-between gap-2">
                <Badge className="bg-verified text-verified-foreground hover:bg-verified">
                  Verified · {latestResult.id}
                </Badge>
                <span className="font-mono text-xs text-muted-foreground">{latestResult.hashId}</span>
              </div>
              <CardTitle className="mt-2 text-lg">{latestResult.fullName}</CardTitle>
              <CardDescription>{latestResult.location}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              <div className="flex items-baseline justify-between rounded-lg bg-primary-soft/70 px-4 py-3">
                <span className="text-sm font-medium text-foreground">Verified Skill Score</span>
                <span className="font-display text-3xl font-bold text-primary">
                  {latestResult.verifiedScore}%
                </span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <FileCheck2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Mapped Equivalency
                    </p>
                    <p className="font-medium text-foreground">{latestResult.knqaEquivalency}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Award className="mt-0.5 h-4 w-4 shrink-0 text-verified" />
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Bridging Stipend / Waiver
                    </p>
                    <p className="font-medium text-foreground">{latestResult.stipendRecommendation}</p>
                  </div>
                </div>
              </div>
              <Button
                type="button"
                onClick={() => onOpenPassport(latestResult.id)}
                className="w-full gap-2"
              >
                Open Official Skill Passport
                <ArrowRight className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card className="border-dashed border-border bg-secondary/20">
            <CardContent className="py-8 text-center">
              <p className="text-sm font-medium text-foreground">No verification run yet</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Complete the form or click &ldquo;Load Sample Candidate Data&rdquo; to generate a
                cryptographically stamped Skill Passport.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}