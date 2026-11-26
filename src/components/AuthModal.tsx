import { useEffect, useState } from "react";
import {
  Briefcase,
  Eye,
  EyeOff,
  GraduationCap,
  Loader2,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LOCATIONS, SKILL_FIELDS, type LocationOption, type SkillField } from "@/lib/ujuzi-data";
import {
  authenticateAccount,
  registerAccount,
  signInDemoAccount,
  type AuthUser,
  type UserRole,
} from "@/lib/ujuzi-auth";

interface AuthModalProps {
  open: boolean;
  initialTab: "signin" | "signup";
  onOpenChange: (open: boolean) => void;
  onAuthSuccess: (user: AuthUser) => void;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function AuthModal({ open, initialTab, onOpenChange, onAuthSuccess }: AuthModalProps) {
  const [tab, setTab] = useState<"signin" | "signup">(initialTab);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Sign In state
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  // Sign Up state
  const [role, setRole] = useState<UserRole>("candidate");
  const [fullName, setFullName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [location, setLocation] = useState<LocationOption>(LOCATIONS[0]!);
  const [field, setField] = useState<SkillField>(SKILL_FIELDS[0]!);
  const [organization, setOrganization] = useState("");

  useEffect(() => {
    if (open) {
      setTab(initialTab);
      setShowPassword(false);
    }
  }, [open, initialTab]);

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!EMAIL_REGEX.test(signInEmail.trim())) {
      toast.error("Please enter a valid email address.");
      return;
    }
    if (signInPassword.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    setIsSubmitting(true);
    window.setTimeout(() => {
      const result = authenticateAccount(signInEmail, signInPassword);
      setIsSubmitting(false);
      if (!result.ok) {
        toast.error(result.error);
        return;
      }
      toast.success(`Welcome back, ${result.user.fullName}.`);
      onAuthSuccess(result.user);
      onOpenChange(false);
      setSignInPassword("");
    }, 450);
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (fullName.trim().length < 2) {
      toast.error("Please enter your full name.");
      return;
    }
    if (role === "employer" && organization.trim().length < 2) {
      toast.error("Please enter your organization or NGO name.");
      return;
    }
    if (!EMAIL_REGEX.test(signUpEmail.trim())) {
      toast.error("Please enter a valid email address.");
      return;
    }
    if (signUpPassword.length < 6) {
      toast.error("Please choose a password of at least 6 characters.");
      return;
    }

    setIsSubmitting(true);
    window.setTimeout(() => {
      const result = registerAccount({
        role,
        fullName,
        email: signUpEmail,
        password: signUpPassword,
        ...(role === "candidate" ? { location, field } : { organization }),
      });
      setIsSubmitting(false);
      if (!result.ok) {
        toast.error(result.error);
        return;
      }
      toast.success(
        role === "candidate"
          ? `Account created! Your evaluator profile is now pre-filled.`
          : `Partner account created for ${result.user.organization}.`,
      );
      onAuthSuccess(result.user);
      onOpenChange(false);
      setSignUpPassword("");
    }, 500);
  };

  const handleDemoLogin = (demoRole: UserRole) => {
    setIsSubmitting(true);
    window.setTimeout(() => {
      const user = signInDemoAccount(demoRole);
      setIsSubmitting(false);
      toast.success(
        demoRole === "candidate"
          ? `Signed in as Demo Candidate (${user.fullName}).`
          : `Signed in as Demo Hiring Partner (${user.organization}).`,
      );
      onAuthSuccess(user);
      onOpenChange(false);
    }, 300);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <DialogTitle className="text-xl">UjuziPass Account Access</DialogTitle>
          </div>
          <DialogDescription>
            Sign in to sync your verified Skill Passports and partner fellowship invitations.
          </DialogDescription>
        </DialogHeader>

        <Tabs value={tab} onValueChange={(v) => setTab(v as "signin" | "signup")} className="mt-2">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Create Account</TabsTrigger>
          </TabsList>

          <TabsContent value="signin" className="mt-4 space-y-5">
            <div className="rounded-xl border border-verified/40 bg-verified-soft/70 p-3.5">
              <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-foreground">
                <Sparkles className="h-3.5 w-3.5 text-verified" />
                Demo Judge / Guest Quick Login
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                Test both authenticated PLP &amp; ILO workflows in one click — no signup required.
              </p>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={isSubmitting}
                  onClick={() => handleDemoLogin("candidate")}
                  className="gap-1.5 bg-background"
                >
                  <GraduationCap className="h-3.5 w-3.5 text-primary" />
                  Demo Candidate
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={isSubmitting}
                  onClick={() => handleDemoLogin("employer")}
                  className="gap-1.5 bg-background"
                >
                  <Briefcase className="h-3.5 w-3.5 text-verified" />
                  Demo Hiring Partner
                </Button>
              </div>
            </div>

            <form onSubmit={handleSignIn} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signin-email">Email Address</Label>
                <Input
                  id="signin-email"
                  type="email"
                  autoComplete="email"
                  placeholder="name@organization.org"
                  value={signInEmail}
                  onChange={(e) => setSignInEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signin-password">Password</Label>
                <div className="relative">
                  <Input
                    id="signin-password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    value={signInPassword}
                    onChange={(e) => setSignInPassword(e.target.value)}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <Button type="submit" disabled={isSubmitting} className="w-full gap-2">
                {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
                Sign In to UjuziPass
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="signup" className="mt-4 space-y-4">
            <div className="space-y-2">
              <Label>Select Account Type</Label>
              <div className="grid gap-2.5 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => setRole("candidate")}
                  className={`rounded-lg border p-3 text-left transition-colors ${
                    role === "candidate"
                      ? "border-primary bg-primary-soft/70 text-foreground"
                      : "border-border bg-background text-muted-foreground hover:border-primary/40"
                  }`}
                >
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
                    <GraduationCap className="h-4 w-4 text-primary" />
                    Skilled Refugee / Candidate
                  </div>
                  <p className="mt-1 text-[11px] text-muted-foreground">
                    Verify skills &amp; unlock your KNQA Skill Passport
                  </p>
                </button>
                <button
                  type="button"
                  onClick={() => setRole("employer")}
                  className={`rounded-lg border p-3 text-left transition-colors ${
                    role === "employer"
                      ? "border-primary bg-primary-soft/70 text-foreground"
                      : "border-border bg-background text-muted-foreground hover:border-primary/40"
                  }`}
                >
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
                    <Briefcase className="h-4 w-4 text-verified" />
                    Hiring Partner / Employer / NGO
                  </div>
                  <p className="mt-1 text-[11px] text-muted-foreground">
                    Discover verified talent &amp; send fellowship offers
                  </p>
                </button>
              </div>
            </div>

            <form onSubmit={handleSignUp} className="space-y-3.5">
              <div className="space-y-1.5">
                <Label htmlFor="signup-name">Full Name</Label>
                <Input
                  id="signup-name"
                  placeholder={role === "candidate" ? "e.g., Amina Hassan Farah" : "e.g., Grace Wanjiku"}
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>

              {role === "employer" && (
                <div className="space-y-1.5">
                  <Label htmlFor="signup-org">Organization Name</Label>
                  <Input
                    id="signup-org"
                    placeholder="e.g., Microsoft Africa, UNHCR Partner, Turkana County"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                  />
                </div>
              )}

              <div className="space-y-1.5">
                <Label htmlFor="signup-email">
                  {role === "employer" ? "Work Email" : "Email Address"}
                </Label>
                <Input
                  id="signup-email"
                  type="email"
                  autoComplete="email"
                  placeholder={role === "employer" ? "grace@partner.org" : "amina@example.com"}
                  value={signUpEmail}
                  onChange={(e) => setSignUpEmail(e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="signup-password">Password</Label>
                <div className="relative">
                  <Input
                    id="signup-password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="Minimum 6 characters"
                    value={signUpPassword}
                    onChange={(e) => setSignUpPassword(e.target.value)}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {role === "candidate" && (
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="signup-location">Location</Label>
                    <select
                      id="signup-location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value as LocationOption)}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      {LOCATIONS.map((loc) => (
                        <option key={loc} value={loc}>
                          {loc}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="signup-field">Primary Field</Label>
                    <select
                      id="signup-field"
                      value={field}
                      onChange={(e) => setField(e.target.value as SkillField)}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      {SKILL_FIELDS.map((f) => (
                        <option key={f} value={f}>
                          {f}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              <Button type="submit" disabled={isSubmitting} className="w-full gap-2">
                {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
                Create {role === "candidate" ? "Candidate" : "Hiring Partner"} Account
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}