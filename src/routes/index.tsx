import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { BarChart3, BadgeCheck, Cpu, LogOut, ShieldCheck, UserCheck, Users } from "lucide-react";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AuthModal } from "@/components/AuthModal";
import { EvaluatorTab } from "@/components/EvaluatorTab";
import { PassportTab } from "@/components/PassportTab";
import { DirectoryTab } from "@/components/DirectoryTab";
import { ImpactTab } from "@/components/ImpactTab";
import { loadActiveSession, saveActiveSession, type AuthUser } from "@/lib/ujuzi-auth";
import {
  INITIAL_PASSPORTS,
  loadStoredOffers,
  loadStoredPassports,
  saveStoredOffers,
  saveStoredPassports,
  type InterviewOffer,
  type SkillPassport,
} from "@/lib/ujuzi-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "UjuziPass — AI Skill Passport & Credential Mapper" },
      {
        name: "description",
        content:
          "Ending refugee brain waste by proving real skills without paper records. Built for PLP Africa & ILO PROSPECTS.",
      },
      { property: "og:title", content: "UjuziPass — AI Skill Passport & Credential Mapper" },
      {
        property: "og:description",
        content:
          "Validate competencies, map foreign credentials to KNQA standards, and connect displaced professionals with hiring partners.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: UjuziPassApp,
});

function UjuziPassApp() {
  const [activeTab, setActiveTab] = useState("evaluator");
  const [passports, setPassports] = useState<SkillPassport[]>(INITIAL_PASSPORTS);
  const [selectedPassportId, setSelectedPassportId] = useState<string>(INITIAL_PASSPORTS[0]!.id);
  const [offers, setOffers] = useState<InterviewOffer[]>([]);
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<"signin" | "signup">("signin");

  useEffect(() => {
    const stored = loadStoredPassports();
    setPassports(stored);
    const params = new URLSearchParams(window.location.search);
    const linkedId = params.get("passport");
    if (linkedId && stored.some((p) => p.id === linkedId)) {
      setSelectedPassportId(linkedId);
      setActiveTab("passport");
    } else if (stored[0]) {
      setSelectedPassportId(stored[0].id);
    }
    setOffers(loadStoredOffers());
    setCurrentUser(loadActiveSession());
  }, []);

  const openAuthModal = (tab: "signin" | "signup") => {
    setAuthModalTab(tab);
    setAuthModalOpen(true);
  };

  const handleSignOut = () => {
    saveActiveSession(null);
    setCurrentUser(null);
    toast.info("Signed out of UjuziPass.");
  };

  const handlePassportCreated = (newPassport: SkillPassport) => {
    setPassports((prev) => {
      const next = [newPassport, ...prev];
      saveStoredPassports(next);
      return next;
    });
    setSelectedPassportId(newPassport.id);
  };

  const handleOpenPassport = (passportId: string) => {
    setSelectedPassportId(passportId);
    setActiveTab("passport");
  };

  const handleSendOffer = (offer: InterviewOffer) => {
    setOffers((prev) => {
      const next = [offer, ...prev];
      saveStoredOffers(next);
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="no-print sticky top-0 z-30 border-b border-border/80 bg-card/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5 sm:px-6">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <span className="font-display text-lg font-bold tracking-tight text-foreground">
                UjuziPass
              </span>
              <span className="hidden text-xs text-muted-foreground sm:ml-2 sm:inline">
                AI Skill Passport &amp; Credential Mapper
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="hidden border-primary/30 bg-primary-soft text-primary lg:inline-flex">
              PLP Africa · ILO PROSPECTS
            </Badge>
            {currentUser ? (
              <div className="flex items-center gap-2 rounded-full border border-border bg-secondary/70 py-1 pl-3 pr-1.5">
                <UserCheck className="hidden h-3.5 w-3.5 text-primary sm:block" />
                <span className="max-w-[110px] truncate text-xs font-semibold text-foreground sm:max-w-[150px]">
                  {currentUser.fullName}
                </span>
                <Badge
                  className={
                    currentUser.role === "candidate"
                      ? "hidden bg-primary text-primary-foreground hover:bg-primary sm:inline-flex"
                      : "hidden bg-verified text-verified-foreground hover:bg-verified sm:inline-flex"
                  }
                >
                  {currentUser.role === "candidate" ? "Skilled Candidate" : "Hiring Partner"}
                </Badge>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleSignOut}
                  className="h-7 gap-1 rounded-full px-2.5 text-xs text-muted-foreground hover:text-foreground"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Sign Out</span>
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Button type="button" variant="outline" size="sm" onClick={() => openAuthModal("signin")}>
                  Sign In
                </Button>
                <Button type="button" size="sm" onClick={() => openAuthModal("signup")}>
                  Get Started
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
        <section className="no-print mb-7 rounded-2xl border border-border/80 bg-card px-5 py-6 shadow-sm sm:px-8 sm:py-7">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">
            Turkana &amp; Garissa County Governments · Microsoft · ILO PROSPECTS
          </p>
          <h1 className="mt-2 max-w-3xl text-2xl font-bold tracking-tight text-foreground sm:text-4xl">
            Ending Refugee Brain Waste: Proving Real Skills Without Paper Records
          </h1>
          <p className="mt-2.5 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Verify practical competency in minutes, map unrecognized foreign degrees to KNQA
            standards, and connect displaced professionals directly with hiring partners.
          </p>
        </section>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="no-print grid h-auto w-full grid-cols-2 gap-1.5 rounded-xl bg-secondary p-1.5 lg:grid-cols-4">
            <TabsTrigger value="evaluator" className="gap-1.5 py-2.5 text-xs sm:text-sm">
              <Cpu className="h-4 w-4 shrink-0" />
              <span className="truncate">Skill Evaluator</span>
            </TabsTrigger>
            <TabsTrigger value="passport" className="gap-1.5 py-2.5 text-xs sm:text-sm">
              <BadgeCheck className="h-4 w-4 shrink-0" />
              <span className="truncate">Verified Passport</span>
            </TabsTrigger>
            <TabsTrigger value="directory" className="gap-1.5 py-2.5 text-xs sm:text-sm">
              <Users className="h-4 w-4 shrink-0" />
              <span className="truncate">Talent Directory</span>
            </TabsTrigger>
            <TabsTrigger value="impact" className="gap-1.5 py-2.5 text-xs sm:text-sm">
              <BarChart3 className="h-4 w-4 shrink-0" />
              <span className="truncate">Impact &amp; SDGs</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="evaluator" className="mt-0">
            <EvaluatorTab
              currentUser={currentUser}
              onPassportCreated={handlePassportCreated}
              onOpenPassport={handleOpenPassport}
            />
          </TabsContent>

          <TabsContent value="passport" className="mt-0">
            <PassportTab
              passports={passports}
              selectedPassportId={selectedPassportId}
              onSelectPassport={setSelectedPassportId}
            />
          </TabsContent>

          <TabsContent value="directory" className="mt-0">
            <DirectoryTab
              currentUser={currentUser}
              passports={passports}
              offers={offers}
              onSendOffer={handleSendOffer}
              onInspectPassport={handleOpenPassport}
            />
          </TabsContent>

          <TabsContent value="impact" className="mt-0">
            <ImpactTab passports={passports} offers={offers} />
          </TabsContent>
        </Tabs>
      </main>

      <AuthModal
        open={authModalOpen}
        initialTab={authModalTab}
        onOpenChange={setAuthModalOpen}
        onAuthSuccess={setCurrentUser}
      />
    </div>
  );
}
