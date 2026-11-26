import { useMemo, useState } from "react";
import {
  BadgeCheck,
  Briefcase,
  CheckCircle2,
  FileText,
  MapPin,
  Search,
  Send,
} from "lucide-react";
import { toast } from "sonner";
import type { AuthUser } from "@/lib/ujuzi-auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  LOCATIONS,
  SKILL_FIELDS,
  type InterviewOffer,
  type SkillPassport,
} from "@/lib/ujuzi-data";

interface DirectoryTabProps {
  currentUser: AuthUser | null;
  passports: SkillPassport[];
  offers: InterviewOffer[];
  onSendOffer: (offer: InterviewOffer) => void;
  onInspectPassport: (passportId: string) => void;
}

export function DirectoryTab({
  currentUser,
  passports,
  offers,
  onSendOffer,
  onInspectPassport,
}: DirectoryTabProps) {
  const [query, setQuery] = useState("");
  const [fieldFilter, setFieldFilter] = useState<string>("all");
  const [locationFilter, setLocationFilter] = useState<string>("all");
  const [minScore, setMinScore] = useState<number>(75);

  const [activeCandidate, setActiveCandidate] = useState<SkillPassport | null>(null);
  const [organization, setOrganization] = useState("");
  const [offerType, setOfferType] = useState<InterviewOffer["offerType"]>("Fellowship");
  const [message, setMessage] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return passports.filter((p) => {
      if (fieldFilter !== "all" && p.field !== fieldFilter) return false;
      if (locationFilter !== "all" && p.location !== locationFilter) return false;
      if (p.verifiedScore < minScore) return false;
      if (!q) return true;
      return (
        p.fullName.toLowerCase().includes(q) ||
        p.field.toLowerCase().includes(q) ||
        p.foreignQualification.toLowerCase().includes(q) ||
        p.knqaEquivalency.toLowerCase().includes(q) ||
        p.id.toLowerCase().includes(q)
      );
    });
  }, [passports, query, fieldFilter, locationFilter, minScore]);

  const handleSubmitOffer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeCandidate) return;
    if (!organization.trim()) {
      toast.error("Please enter your organization or hiring partner name.");
      return;
    }

    const newOffer: InterviewOffer = {
      id: `OFFER-${Date.now()}`,
      passportId: activeCandidate.id,
      candidateName: activeCandidate.fullName,
      organization: organization.trim(),
      offerType,
      message: message.trim() || `Direct ${offerType.toLowerCase()} invitation via UjuziPass.`,
      createdAt: new Date().toISOString().slice(0, 10),
      ...(currentUser ? { sentByEmail: currentUser.email } : {}),
    };
    onSendOffer(newOffer);
    toast.success(`${offerType} request sent to ${activeCandidate.fullName} from ${organization.trim()}.`);
    setActiveCandidate(null);
    setOrganization("");
    setMessage("");
  };

  return (
    <div className="space-y-6">
      <Card className="border-border/80 shadow-sm">
        <CardContent className="grid gap-4 pt-6 md:grid-cols-12">
          <div className="relative md:col-span-4">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              aria-label="Search talent directory"
              placeholder="Search name, skill, degree, or ID..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="md:col-span-3">
            <select
              aria-label="Filter by skill category"
              value={fieldFilter}
              onChange={(e) => setFieldFilter(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <option value="all">All Skill Categories</option>
              {SKILL_FIELDS.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>
          </div>
          <div className="md:col-span-3">
            <select
              aria-label="Filter by location"
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <option value="all">All Locations</option>
              {LOCATIONS.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col justify-center md:col-span-2">
            <div className="flex items-center justify-between text-xs font-medium text-muted-foreground">
              <span>Min Score</span>
              <span className="font-mono text-foreground">{minScore}%+</span>
            </div>
            <input
              type="range"
              min={60}
              max={95}
              step={5}
              value={minScore}
              onChange={(e) => setMinScore(Number(e.target.value))}
              className="mt-1.5 w-full accent-primary"
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>
          Showing <strong className="text-foreground">{filtered.length}</strong> of{" "}
          {passports.length} verified displaced professionals
        </span>
        {offers.length > 0 && (
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-primary">
            <CheckCircle2 className="h-3.5 w-3.5" />
            {offers.length} active partner offer{offers.length === 1 ? "" : "s"} sent
          </span>
        )}
      </div>

      {filtered.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="py-12 text-center">
            <p className="font-medium text-foreground">No matching verified talent found</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Try lowering the minimum score or clearing your search filters.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((talent) => {
            const hasOffer = offers.some((o) => o.passportId === talent.id);
            return (
              <Card key={talent.id} className="flex flex-col border-border/80 shadow-sm transition-shadow hover:shadow-md">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-semibold text-foreground">{talent.fullName}</h3>
                        <BadgeCheck className="h-4 w-4 shrink-0 text-verified" />
                      </div>
                      <p className="mt-0.5 text-xs font-medium text-primary">{talent.field}</p>
                    </div>
                    <div className="rounded-lg bg-primary-soft px-2.5 py-1 text-right">
                      <span className="font-mono text-sm font-bold text-primary">
                        {talent.verifiedScore}%
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 space-y-3 text-xs">
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5 shrink-0" />
                    <span>{talent.location}</span>
                  </div>
                  <div className="rounded-md bg-secondary/50 p-2.5">
                    <p className="font-medium text-foreground">{talent.knqaEquivalency}</p>
                    <p className="mt-1 text-muted-foreground">{talent.foreignQualification}</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-1.5">
                    <Badge variant="secondary" className="gap-1 font-normal">
                      <Briefcase className="h-3 w-3" />
                      {talent.availability}
                    </Badge>
                    <Badge variant="outline" className="font-mono text-[11px]">
                      {talent.id}
                    </Badge>
                    {talent.isUserCreated && (
                      <Badge className="bg-verified text-verified-foreground hover:bg-verified">
                        Live Demo
                      </Badge>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="gap-2 border-t border-border/60 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => onInspectPassport(talent.id)}
                    className="gap-1.5"
                  >
                    <FileText className="h-3.5 w-3.5" />
                    Passport
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => {
                      setActiveCandidate(talent);
                      if (currentUser?.organization && !organization) {
                        setOrganization(currentUser.organization);
                      }
                    }}
                    className="flex-1 gap-1.5"
                  >
                    <Send className="h-3.5 w-3.5" />
                    {hasOffer ? "Offer Sent" : "Request Interview / Fellowship"}
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      )}

      <Dialog open={activeCandidate !== null} onOpenChange={(open) => !open && setActiveCandidate(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Request Interview or Fellowship</DialogTitle>
            <DialogDescription>
              Send a direct hiring or fellowship invitation to{" "}
              <strong className="text-foreground">{activeCandidate?.fullName}</strong> (
              {activeCandidate?.id}).
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmitOffer} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="partnerOrg">Hiring Partner / Organization</Label>
              <Input
                id="partnerOrg"
                placeholder="e.g., Microsoft Africa, UNHCR Partner, Turkana County"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="offerType">Opportunity Type</Label>
              <select
                id="offerType"
                value={offerType}
                onChange={(e) => setOfferType(e.target.value as InterviewOffer["offerType"])}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="Fellowship">Paid Fellowship / Returnship</option>
                <option value="Job Trial">30-Day Skills Job Trial</option>
                <option value="Technical Interview">Direct Technical Interview</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="offerMsg">Message to Candidate</Label>
              <Textarea
                id="offerMsg"
                rows={3}
                placeholder="Share role details, remote/hybrid arrangement, or next interview steps..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setActiveCandidate(null)}>
                Cancel
              </Button>
              <Button type="submit" className="gap-1.5">
                <Send className="h-3.5 w-3.5" />
                Send Invitation
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}