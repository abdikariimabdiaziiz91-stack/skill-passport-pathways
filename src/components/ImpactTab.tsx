import { Award, Building2, Globe2, Handshake, Scale, ShieldCheck, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { InterviewOffer, SkillPassport } from "@/lib/ujuzi-data";

interface ImpactTabProps {
  passports: SkillPassport[];
  offers: InterviewOffer[];
}

const SDG_CARDS = [
  {
    sdg: "SDG 4",
    title: "Quality Education & Recognition",
    detail:
      "Validates prior learning and maps missing foreign university transcripts to Kenya National Qualifications Authority (KNQA) levels.",
    icon: Award,
  },
  {
    sdg: "SDG 8",
    title: "Decent Work & Economic Growth",
    detail:
      "Unlocks formal remote jobs, county fellowships, and paid returnships for displaced engineers, nurses, and analysts.",
    icon: Building2,
  },
  {
    sdg: "SDG 10",
    title: "Reduced Inequalities",
    detail:
      "Replaces paper-only credential barriers with objective competency micro-assessments accessible from Kakuma, Kalobeyei, and Dadaab.",
    icon: Scale,
  },
  {
    sdg: "SDG 16",
    title: "Strong Institutions & Compliance",
    detail:
      "Aligns digital skill passports with Kenya Refugee Act 2021 and ILO PROSPECTS verification standards using tamper-evident hashes.",
    icon: ShieldCheck,
  },
  {
    sdg: "SDG 17",
    title: "Partnerships for the Goals",
    detail:
      "Connects PLP Africa, ILO PROSPECTS, Microsoft certification waivers, and Turkana & Garissa County Governments in one shared pipeline.",
    icon: Handshake,
  },
];

export function ImpactTab({ passports, offers }: ImpactTabProps) {
  const userCreatedCount = passports.filter((p) => p.isUserCreated).length;
  const verifiedTalents = 142 + userCreatedCount;
  const credentialsMapped = 138 + userCreatedCount;
  const stipendsUnlocked = 94 + userCreatedCount;
  const employerMatches = 47 + offers.length;

  const metrics = [
    {
      label: "Verified Talents",
      value: verifiedTalents,
      sub: `${passports.length} live profiles in directory`,
      icon: Users,
    },
    {
      label: "Credentials Mapped",
      value: credentialsMapped,
      sub: "Aligned to KNQA Levels 6 & 7",
      icon: ShieldCheck,
    },
    {
      label: "Bridging Stipends Unlocked",
      value: stipendsUnlocked,
      sub: "Microsoft & PLP certification waivers",
      icon: Award,
    },
    {
      label: "Employer Matches",
      value: employerMatches,
      sub: `${offers.length} new offer${offers.length === 1 ? "" : "s"} this session`,
      icon: Globe2,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((m) => {
          const Icon = m.icon;
          return (
            <Card key={m.label} className="border-border/80 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardDescription className="text-xs font-semibold uppercase tracking-wider">
                  {m.label}
                </CardDescription>
                <Icon className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <p className="font-display text-3xl font-bold text-foreground">{m.value}</p>
                <p className="mt-1 text-xs text-muted-foreground">{m.sub}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="border-border/80 shadow-sm">
        <CardHeader className="border-b border-border/60 pb-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <CardTitle className="text-lg">
                UN Sustainable Development Goals &amp; Hackathon Track Alignment
              </CardTitle>
              <CardDescription className="mt-1">
                PLP Africa &amp; ILO PROSPECTS Track 1: Credential &amp; Skills Validation · Turkana
                &amp; Garissa Counties
              </CardDescription>
            </div>
            <Badge className="bg-verified text-verified-foreground hover:bg-verified">
              Track 1 · Judges&apos; View
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="grid gap-4 pt-6 md:grid-cols-2 lg:grid-cols-3">
          {SDG_CARDS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.sdg}
                className="rounded-xl border border-border/80 bg-secondary/30 p-4 transition-colors hover:border-primary/40"
              >
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="border-primary/30 bg-primary-soft text-primary">
                    {item.sdg}
                  </Badge>
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <h3 className="mt-3 text-sm font-semibold text-foreground">{item.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{item.detail}</p>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}