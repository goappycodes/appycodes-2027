import type { Metadata } from "next";
import { siteMeta } from "@/lib/seo";
import { CaseStudy, type CaseStudyData } from "@/components/case-study";

export const metadata: Metadata = siteMeta({
  title: "Ontick — a custom Laravel ticketing platform, Stripe instalments + two native apps",
  description:
    "Ontick moved off Eventbrite onto a ticketing stack they own — a multi-organizer Laravel platform, Stripe instalments, a payments engine hardened on real incidents, and two React Native apps: a customer app live on the App Store and an offline-first check-in app with live door analytics. £2M+ processed, and a partnership since 2021.",
  path: "/case-studies/ontick/",
  image: "/images/ontick-6.png",
});

const data: CaseStudyData = {
  crumb: "Ontick",
  path: "/case-studies/ontick/",
  title: (
    <>
      <span className="name">Ontick</span> moved off Eventbrite onto ticketing they own.
    </>
  ),
  lede:
    "Off Eventbrite, onto a ticketing stack they own — a multi-organizer Laravel platform, Stripe instalments, and two native apps live on the stores. Built for real festivals: thousands of attendees, multi-day camping tickets, offline check-in at the gate, and a payments engine hardened against the edge cases that only surface on a sold-out night. £2M+ processed, and a partnership now in its fifth year.",
  facts: [
    { label: "Client", value: "Ontick — UK event ticketing" },
    { label: "Sector", value: "Live events & festivals" },
    { label: "Engagement", value: "Built & run, since 2021" },
    { label: "Surfaces", value: "Web platform, organizer admin, check-in app, customer app" },
    { label: "Live", value: "Customer app on the App Store; Android in review" },
  ],
  links: [
    { label: "Ontick.co.uk", href: "https://ontick.co.uk/" },
    { label: "Ontick on the App Store", href: "https://apps.apple.com/us/app/ontick/id6782900037" },
  ],
  stats: [
    { n: "£2M+", label: "processed since launch" },
    { n: "20s→3s", label: "a key page, in one commit" },
    { n: "0%", label: "third-party commission" },
    { n: "5 yrs", label: "built & run since 2021" },
  ],
  blocks: [
    {
      t: "figure",
      src: "/images/cs-ontick-platform.jpg",
      alt: "Ontick web platform built on Laravel",
      caption: "The owned Laravel platform — public booking, a multi-organizer control room, and the instalment engine.",
    },
    {
      t: "section",
      title: "stop paying a marketplace to own your customers.",
      lead:
        "Eventbrite takes a cut of every ticket and keeps the customer relationship. Ontick wanted neither. We built them a ticketing platform they own outright — multi-organizer from the first commit, no per-ticket commission, and a back office their team runs the whole operation from. Five years on we still build and run it: the web platform, two native apps, and the payments engineering that keeps a sold-out festival from becoming a support queue.",
    },
    {
      t: "cards",
      title: "the platform, and the control room behind it.",
      lead:
        "A ticketing site is the easy 20%. The rest is the organizer back office and a payments engine that behaves when thousands of people check out in the same ten minutes.",
      items: [
        {
          title: "An owned Laravel platform",
          body: "Multi-organizer by default, per-tier inventory and sale windows, and a super-admin over the top — with zero per-ticket commission going to anyone else.",
        },
        {
          title: "The organizer control room",
          body: "A rich admin: event customization, an upsell builder, post-purchase promotions, attendee announcements and broadcasts, in-app banners, video embeds and offline/complimentary bookings.",
        },
        {
          title: "Stripe instalments, done right",
          body: "“Spread payment” schedules with the ticket held back until full settlement, idempotency-keyed charges, and webhook reconciliation so the ledger and Stripe always agree.",
        },
        {
          title: "Payments hardened on real incidents",
          body: "Killed a redirect-vs-webhook race with database row locks on order completion; bypassed Stripe's £0 rejection so complimentary and carer tickets check out; isolated webhooks by metadata.",
        },
        {
          title: "Multi-day & festival ticketing",
          body: "Usable-date validation for multi-day and camping events, day/weekend/carer ticket types, urgent-booking flags, and payouts that can route to a different Stripe account per event.",
        },
        {
          title: "The 20-seconds-to-3 fix",
          body: "A single well-placed commit took a key page from a twenty-second load to three — the kind of win that only comes from knowing the codebase five years deep.",
        },
      ],
    },
    {
      t: "figure",
      src: "/images/cs-ontick-checkout.jpg",
      alt: "Ontick custom checkout with instalment schedule",
      caption: "The checkout: instalment schedules composed, the first payment captured, the QR released only once it is settled in full.",
    },
    {
      t: "cards",
      title: "two apps, for the two moments that matter.",
      lead:
        "The pocket and the gate. Both are React Native, both ship over-the-air, and both are built for the reality of a live event rather than a demo.",
      items: [
        {
          title: "Customer app — live on the App Store",
          body: "Book, pay and carry tickets on the phone, with push for reminders and recovery. Live on iOS, with Android in review.",
        },
        {
          title: "Guest checkout & Apple Pay",
          body: "Buy a ticket without an account, and pay with Apple Pay through Stripe — including the multi-merchant setup so different events settle to their own accounts.",
        },
        {
          title: "Offline-first check-in",
          body: "A dedicated scanning app on a serverless check-in API — open camera, scan, green tick, next — that keeps working when the gate has no signal.",
        },
        {
          title: "Tuned for the gate, not the demo",
          body: "When the feedback was “a thousand people, low light, crowded,” we redesigned the ticket for reliable scanning rather than arguing the numbers — the honest fix.",
        },
        {
          title: "Live door analytics",
          body: "Scans in the last 15, 30 and 60 minutes, an entry graph across the day, and a ticket-type breakdown of who's in versus sold — so organizers read the gate in real time.",
        },
        {
          title: "Multi-day validation",
          body: "Tickets scan only on their valid dates — camping, day and weekend passes each behave correctly across a multi-day festival, verified against every scenario.",
        },
      ],
    },
    {
      t: "figure",
      phone: true,
      src: "/images/cs-ontick-customer-app.jpg",
      alt: "Ontick React Native customer app",
      caption: "The customer app on iOS and Android — book, pay, and carry the ticket to the gate.",
    },
  ],
  tech: ["laravel", "mysql", "stripe", "reactnative", "expo", "digitalocean"],
  stack: [
    { layer: "Web platform", value: "Laravel (Blade) — booking, organizer + super-admin, REST API" },
    { layer: "Database", value: "MySQL on DigitalOcean managed DB — multi-organizer schema, instalment ledger" },
    { layer: "Payments", value: "Stripe — instalments, idempotent charges, webhook reconciliation, Apple Pay, multi-account payouts" },
    { layer: "Concurrency", value: "Row locks (lockForUpdate) + metadata-isolated webhooks" },
    { layer: "Mobile", value: "React Native (Expo, EAS, over-the-air updates) — customer + check-in apps" },
    { layer: "Check-in", value: "Serverless scan API, offline-first, multi-day date validation" },
    { layer: "Analytics", value: "Live door stats — rolling windows, entry graph, ticket breakdown" },
  ],
  outcomes: [
    "£2M+ processed, with the platform commission that drove the brief now at zero.",
    "Multi-organizer architecture live — new organizers and events onboarded without engineering.",
    "A payments engine hardened on real incidents: database locks killed a webhook/redirect race, £0 and complimentary tickets check out cleanly, and events pay out to their own Stripe accounts.",
    "Two apps in production — the customer app live on the App Store, and an offline-first check-in app scanning at the gate.",
    "Live check-in analytics on the door — scans per 15/30/60 minutes, an entry graph and a ticket-type breakdown, in real time.",
    "Guest checkout and Apple Pay, so buying a ticket takes seconds — and a one-line change that took a key page from twenty seconds to three.",
  ],
  cta: "got an eventbrite-style margin problem?",
};

export default function OntickCaseStudy() {
  return <CaseStudy data={data} />;
}
