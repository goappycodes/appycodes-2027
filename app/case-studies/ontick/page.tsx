import type { Metadata } from "next";
import { siteMeta } from "@/lib/seo";
import { CaseStudy, type CaseStudyData } from "@/components/case-study";

export const metadata: Metadata = siteMeta({
  title: "Ontick — custom ticketing platform, Stripe instalments + two mobile apps",
  description:
    "How Appycodes moved Ontick off Eventbrite onto a custom Laravel ticketing platform with Stripe instalments and two React Native apps. £2M+ processed.",
  path: "/case-studies/ontick/",
  image: "/images/ontick-6.png",
});

const data: CaseStudyData = {
  crumb: "Ontick",
  title: (
    <>
      <span className="name">Ontick</span> moved off Eventbrite onto ticketing they own.
    </>
  ),
  lede:
    "Off Eventbrite, onto a ticketing stack they own — Stripe instalments, QR release on full payment, and two native apps.",
  facts: [
    { label: "Client", value: "Ontick, event ticketing" },
    { label: "Sector", value: "UK events" },
    { label: "Engagement", value: "Build + ongoing" },
    { label: "Surfaces", value: "Web, check-in app, customer app" },
  ],
  stats: [
    { n: "£2M+", label: "processed since launch" },
    { n: "3", label: "surfaces shipped" },
    { n: "nil", label: "third-party commission" },
    { n: "Stripe", label: "idempotent instalments" },
  ],
  blocks: [
    {
      t: "figure",
      src: "/images/cs-ontick-platform.jpg",
      alt: "Ontick web platform built on Laravel",
      caption: "The owned Laravel platform — public booking, multi-organizer back-end, and the instalment engine.",
    },
    {
      t: "cards",
      cols3: true,
      title: "what we built.",
      items: [
        { title: "an owned Laravel platform", body: "Multi-organizer by default, per-tier inventory and sale windows — no per-ticket commission." },
        { title: "Stripe instalments, done right", body: "QR held back until full settlement, idempotent charges, automated failed-payment recovery." },
        { title: "a sub-second check-in app", body: "Offline-first React Native scanning; open camera, scan, green tick, next." },
        { title: "a customer app with push", body: "Book, pay, access tickets — plus upsell and recovery pushes that beat email." },
      ],
    },
    {
      t: "figure",
      src: "/images/cs-ontick-checkout.jpg",
      alt: "Ontick custom checkout with instalment schedule",
      caption: "The checkout: instalment schedules composed, the first payment captured against a stored method.",
    },
    {
      t: "figure",
      phone: true,
      src: "/images/cs-ontick-customer-app.jpg",
      alt: "Ontick React Native customer app",
      caption: "The customer app on iOS and Android.",
    },
  ],
  stack: [
    { layer: "Web platform", value: "Laravel — booking, organizer + super admin, REST API" },
    { layer: "Database", value: "MySQL, multi-organizer schema, instalment ledger" },
    { layer: "Payments", value: "Stripe — idempotency-keyed charges, webhook reconciliation" },
    { layer: "Mobile", value: "React Native — check-in app + customer app (Expo, FCM/APNs)" },
  ],
  outcomes: [
    "£2M+ processed, with the platform commission that drove the brief now at zero.",
    "Multi-organizer architecture live; new organizers onboarded without engineering.",
    "Instalment engine running clean — no real-world incident to date.",
    "Two production apps: check-in at every door, customer app on both stores.",
  ],
  cta: "got an eventbrite-style margin problem?",
};

export default function OntickCaseStudy() {
  return <CaseStudy data={data} />;
}
