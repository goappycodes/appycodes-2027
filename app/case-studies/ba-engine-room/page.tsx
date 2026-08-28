import type { Metadata } from "next";
import { siteMeta } from "@/lib/seo";
import { CaseStudy, type CaseStudyData } from "@/components/case-study";

export const metadata: Metadata = siteMeta({
  title: "BA Engine Room — an AI operating system for a consultancy",
  description:
    "A custom, AI-native platform that runs a consultancy end to end — lead capture, AI discovery briefs from call transcripts, quote-to-proposal, e-signed contracts and Stripe deposits, milestone delivery and a client portal. Built on Next.js, Supabase and the Claude API.",
  path: "/case-studies/ba-engine-room/",
  image: "/images/engineroom-featured.png",
});

const data: CaseStudyData = {
  crumb: "BA Engine Room",
  path: "/case-studies/ba-engine-room/",
  title: (
    <>
      <span className="name">BA Engine Room</span> — an <span className="caps">AI</span> operating system
      for a consultancy.
    </>
  ),
  lede:
    "A custom, AI-native platform that runs an agency end to end — lead capture, AI discovery briefs from call transcripts, quote-to-proposal, e-signed contracts and Stripe deposits, milestone delivery and a client portal — built on Next.js, Supabase and the Claude API.",
  facts: [
    { label: "Client", value: "Business Architects, growth consultancy" },
    { label: "Sector", value: "Professional services · internal platform" },
    { label: "Engagement", value: "Built 2026, in rollout" },
    { label: "Owned", value: "The whole platform, front to back" },
  ],
  stats: [
    { n: "0→1", label: "built from the ground up" },
    { n: "5", label: "roles in one platform" },
    { n: "AI", label: "discovery briefs from call transcripts" },
    { n: "e-sign", label: "contracts + Stripe deposits, automated" },
  ],
  blocks: [
    {
      t: "gallery",
      title: "one system, from first lead to final invoice.",
      shots: [
        { src: "/images/engineroom-pipeline.jpg", alt: "BA Engine Room sales pipeline with automatic stage changes" },
        { src: "/images/engineroom-calendar.jpg", alt: "BA Engine Room calendar of calls, automations and deadlines" },
        { src: "/images/engineroom-delivery.jpg", alt: "BA Engine Room delivery view with milestone payouts" },
      ],
    },
    {
      t: "section",
      title: "ai where it saves hours, manual where it must be right.",
      lead:
        "The Claude API does the heavy lifting — turning a discovery-call transcript into a structured delivery brief, drafting reactivation messages, generating milestone reports. But nothing important is left to a model alone: unknowns are marked “to be confirmed” rather than invented, and every AI step has a manual fallback, so a stuck or wrong model never blocks the business.",
    },
    {
      t: "cards",
      title: "the systems we built.",
      lead:
        "Not a CRM bolted to a project tool — one platform that carries a deal from the first web-form enquiry through a signed contract to a paid, delivered project, with each role seeing only what it should.",
      items: [
        {
          title: "Pipeline & CRM",
          body: "Lead capture from web forms, adverts, outreach and referrals, on a kanban pipeline where every stage change is automatic — plus a reactivation workflow for lost leads.",
        },
        {
          title: "AI discovery briefs",
          body: "Submit a call transcript and the Claude API turns it into a structured delivery brief — services, technical needs, scope — with unknowns flagged “to be confirmed” rather than fabricated.",
        },
        {
          title: "Quote to signed contract",
          body: "A branded proposal document, then an e-signed Master Service Agreement (UK and US editions) generated as a PDF with the client's signature and a Schedule A filled from the real deal — before Stripe takes the deposit.",
        },
        {
          title: "Milestone delivery",
          body: "Projects broken into milestones with completion reports and client comments, and delivery partners paid per approved milestone — with client prices and margins hidden from the delivery view.",
        },
        {
          title: "Client portal & support",
          body: "A self-service portal for deliverables, milestones, payments and thread-based support, so clients can see progress without booking a status call.",
        },
        {
          title: "Automation & ops",
          body: "Auto-booked kickoff calls, SLA chases, reminders, time tracking and an automation log — the back office that keeps running without someone nudging it.",
        },
      ],
    },
    {
      t: "gallery",
      title: "role-aware to the last number.",
      shots: [
        { src: "/images/engineroom-project.jpg", alt: "BA Engine Room project view with milestones and role-aware financials" },
        { src: "/images/engineroom-timetracking.jpg", alt: "BA Engine Room time tracking clock-in screen" },
      ],
    },
  ],
  tech: ["nextjs", "supabase", "claude", "stripe", "vercel"],
  stack: [
    { layer: "Frontend", value: "Next.js (App Router), deployed on Vercel" },
    { layer: "Backend & data", value: "Supabase — Postgres, auth, storage, row-level access" },
    { layer: "AI", value: "Anthropic Claude API — briefs, summaries, drafting" },
    { layer: "Payments", value: "Stripe — deposits and milestone payments" },
    { layer: "Scheduling", value: "Google Calendar API, meeting transcription" },
    { layer: "Documents", value: "Branded proposal & MSA PDFs with embedded e-signatures" },
  ],
  outcomes: [
    "A consultancy's entire operation — lead to invoice — running in one custom platform instead of a stack of disconnected tools.",
    "AI discovery briefs generated from real call transcripts, with unknowns flagged “to be confirmed” rather than fabricated.",
    "Proposals that become e-signed MSAs (UK and US editions) with a Stripe deposit, generated as branded PDFs against the real deal.",
    "Milestone-based delivery with partner payouts, and client prices kept out of the delivery view by design.",
    "Role-aware throughout — owner, sales, consultant, delivery and dev-support each see only what they should.",
    "Manual fallbacks wherever AI can fail, so a stuck model never blocks the business.",
  ],
  cta: "want your whole operation in one system you actually own?",
};

export default function BaEngineRoomCaseStudy() {
  return <CaseStudy data={data} />;
}
