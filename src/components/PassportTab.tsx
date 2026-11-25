import {
  Award,
  BadgeCheck,
  Calendar,
  CheckCircle2,
  Copy,
  Fingerprint,
  MapPin,
  Printer,
  ShieldCheck,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import type { SkillPassport } from "@/lib/ujuzi-data";

interface PassportTabProps {
  passports: SkillPassport[];
  selectedPassportId: string;
  onSelectPassport: (id: string) => void;
}

export function PassportTab({
  passports,
  selectedPassportId,
  onSelectPassport,
}: PassportTabProps) {
  const passport = passports.find((p) => p.id === selectedPassportId) ?? passports[0];
  if (!passport) return null;

  const handleShareLink = async () => {
    const url =
      typeof window !== "undefined"
        ? `${window.location.origin}/?passport=${encodeURIComponent(passport.id)}`
        : `https://ujuzipass.org/verify/${passport.id}`;
    try {
      await navigator.clipboard.writeText(url);
      toast.success(`Verification link copied for ${passport.id}`);
    } catch {
      toast.success(`Verification URL ready: ${url}`);
    }
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="space-y-6">
      <div className="no-print flex flex-col gap-3 rounded-xl border border-border bg-card p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm font-medium text-muted-foreground">Viewing Passport:</span>
          <select
            aria-label="Select verified skill passport"
            value={passport.id}
            onChange={(e) => onSelectPassport(e.target.value)}
            className="h-9 rounded-md border border-input bg-background px-3 text-sm font-medium text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {passports.map((p) => (
              <option key={p.id} value={p.id}>
                {p.fullName} — {p.id} {p.isUserCreated ? "(New)" : ""}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button type="button" variant="outline" size="sm" onClick={handleShareLink} className="gap-1.5">
            <Copy className="h-3.5 w-3.5" />
            Share Verification Link
          </Button>
          <Button type="button" size="sm" onClick={handlePrint} className="gap-1.5">
            <Printer className="h-3.5 w-3.5" />
            Download / Print Official Passport
          </Button>
        </div>
      </div>

      <Card className="print-passport overflow-hidden border-border shadow-md">
        <div className="border-b border-primary/20 bg-primary px-6 py-5 text-primary-foreground sm:px-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest opacity-85">
                UjuziPass · Official Digital Skill Credential
              </p>
              <h2 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
                {passport.fullName}
              </h2>
              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs opacity-90">
                <span className="inline-flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" />
                  {passport.location}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  Issued {passport.issueDate}
                </span>
              </div>
            </div>
            <div className="flex flex-col items-start gap-2 sm:items-end">
              <Badge className="gap-1.5 bg-verified px-3 py-1 text-xs font-semibold text-verified-foreground hover:bg-verified">
                <BadgeCheck className="h-3.5 w-3.5" />
                AI-Verified Skill Passport
              </Badge>
              <span className="font-mono text-xs opacity-90">ID: {passport.id}</span>
            </div>
          </div>
        </div>

        <CardContent className="grid gap-8 p-6 sm:p-8 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-7">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Verified Competency Breakdown ({passport.field})
              </h3>
              <div className="mt-4 space-y-4">
                {passport.skills.map((skill) => (
                  <div key={skill.label} className="space-y-1.5">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-foreground">{skill.label}</span>
                      <span className="font-mono font-semibold text-primary">{skill.score}%</span>
                    </div>
                    <Progress value={skill.score} className="h-2.5" />
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-border bg-secondary/40 p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Mapped Equivalency Statement
              </p>
              <p className="mt-1.5 text-sm font-semibold text-foreground">
                {passport.knqaEquivalency}
              </p>
              <p className="mt-2 text-xs text-muted-foreground">
                Source Qualification: {passport.foreignQualification}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Competency Proof: {passport.evidenceSummary}
              </p>
            </div>
          </div>

          <div className="space-y-4 lg:col-span-5">
            <div className="rounded-xl border border-primary/25 bg-primary-soft/60 p-5 text-center">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                Composite Verified Score
              </p>
              <p className="mt-1 font-display text-5xl font-bold text-primary">
                {passport.verifiedScore}%
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Availability: {passport.availability}
              </p>
            </div>

            <div className="space-y-3 rounded-xl border border-border bg-card p-4 text-xs">
              <div className="flex items-start gap-2.5">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <div>
                  <p className="font-semibold text-foreground">Work-Readiness &amp; Compliance</p>
                  <p className="mt-0.5 text-muted-foreground">{passport.complianceStatus}</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Award className="mt-0.5 h-4 w-4 shrink-0 text-verified" />
                <div>
                  <p className="font-semibold text-foreground">Unlocked Bridging Waiver</p>
                  <p className="mt-0.5 text-muted-foreground">{passport.stipendRecommendation}</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5 border-t border-border/70 pt-3">
                <Fingerprint className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                <div>
                  <p className="font-semibold text-foreground">Cryptographic Hash</p>
                  <p className="mt-0.5 font-mono text-muted-foreground">{passport.hashId}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 rounded-lg bg-verified-soft px-3.5 py-2.5 text-xs font-medium text-foreground">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-verified" />
              Endorsed for PLP Africa, ILO PROSPECTS &amp; County Hiring Partners
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}