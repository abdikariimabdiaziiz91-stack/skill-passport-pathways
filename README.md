# Skill Passport Pathways

Build a complete, interactive, production-grade web application called "UjuziPass — AI Skill Passport & Credential Mapper" designed for the Power Learn Project (PLP) Africa & ILO PROSPECTS "Unlocking Displaced Talent" Hackathon (Track 1: Credential & Skills Validation, aligned with SDGs 4 & 8, in partnership with Turkana & Garissa County Governments and Microsoft).



1. DESIGN & AESTHETIC (INTERNATIONAL ENTERPRISE UI):

- Use a clean, trustworthy, modern SaaS aesthetic inspired by Stripe, Linear, and LinkedIn Talent Solutions.

- Color Palette: Deep Teal (#0F766E) primary, Crisp Slate/White (#F8FAFC / #FFFFFF) backgrounds, Warm Amber (#D97706) for verification badges, and Dark Slate (#0F172A) typography.

- Fully responsive layout with a clean top navigation bar, clear hero section explaining the mission ("Ending Refugee Brain Waste: Proving Real Skills Without Paper Records"), and an interactive multi-tab workspace.

- Include subtle micro-interactions, smooth transitions, clean Lucide icons, and high-contrast accessible typography.



2. CORE FUNCTIONAL WORKFLOWS (MUST BE FULLY INTERACTIVE WITH REAL CLIENT-SIDE LOGIC & PRE-LOADED REALISTIC DATA):



Tab 1: "Skill & Credential Evaluator" (Candidate Flow)

- Interactive form where a skilled refugee/displaced professional enters:

  - Full Name, Current Location (e.g., Kakuma / Kalobeyei - Turkana County, Dadaab - Garissa County, Nairobi), Primary Field (Software Development, Data & SQL, Healthcare/Nursing, Civil Engineering, Accounting/Finance, Digital Marketing).

  - Unrecognized / Missing Foreign Qualification (e.g., "BSc Computer Science - Mogadishu University (Missing Physical Transcript)" or "Diploma in Nursing - Khartoum").

  - Proof of Real Competency: Paste a GitHub repo link / portfolio summary OR complete a built-in 3-question interactive technical/competency micro-assessment right inside the app!

- Clicking "Run AI Verification & Mapping" runs a realistic step-by-step verification animation (Checking Competency -> Mapping to KNQA/East African Standards -> Generating Cryptographic Hash ID) and dynamically computes:

  - Verified Skill Score (0–100%)

  - Local & Global Credential Equivalency (e.g., Mapped to Kenya National Qualifications Framework Level 6/7)

  - Recommended Bridging Stipend / Micro-certification waiver (e.g., Microsoft Azure / PLP Certification Waiver)

  - Automatically generates and unlocks their official "Verified Skill Passport" in Tab 2.



Tab 2: "Verified Skill Passport" (Shareable Credential & Print/Export)

- Displays a sleek, official digital credential card with:

  - Candidate Name, Location, Unique Verification ID (e.g., UJUZI-2026-8841), Issue Date, and Verified Status Badge.

  - Visual skill breakdown bars (e.g., Python & SQL: 92%, System Design: 88%, Problem Solving: 95%).

  - Mapped Equivalency Statement & Work-Readiness / Compliance Status (aligned with Kenya Refugee Act 2021 / ILO PROSPECTS guidelines).

  - Interactive "Share Verification Link" button (copies link with toast notification) and "Download / Print Official Passport" button (triggers clean print stylesheet).



Tab 3: "Employer & Partner Talent Directory" (Market Fit & Scalability)

- Pre-populated with 6 realistic, diverse displaced talent profiles from Turkana, Garissa, and Nairobi with verified skill scores, mapped degrees, and availability (Remote, Hybrid, Fellowship/Returnship).

- Real-time search bar and filters by Track/Skill Category, Location, and Minimum Skill Score.

- Clicking "Request Interview / Fellowship" opens a clean modal allowing hiring partners (NGOs, tech companies, county partners) to send a direct fellowship or job trial offer with instant confirmation feedback.



Tab 4: "Impact & Hackathon Alignment" (Judges' View)

- Clean executive dashboard showing live cohort metrics: Verified Talents, Credentials Mapped, Bridging Stipends Unlocked, Employer Matches, and explicit alignment cards for SDGs 4, 8, 10, 16, and 17.



3. TECHNICAL REQUIREMENTS:

- Store newly created passports in localStorage so any profile the user creates during a live demo persists across page reloads and immediately appears in both the Passport view and the Employer Talent Directory!

- Include a "Load Sample Candidate Data" button on the Evaluator form so anyone testing the app can auto-fill and test the full workflow in one click.

- Ensure zero broken links, zero placeholder "TODO" screens, and clean mobile + desktop responsiveness.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://skill-passport-pathways.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/ca8d00c4-a6f3-4a2f-9d99-bfd55b7f706f).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
