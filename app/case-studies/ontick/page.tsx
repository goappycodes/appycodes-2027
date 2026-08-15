import type { Metadata } from "next";
import { CaseStudy, type CaseStudyData } from "@/components/case-study";

export const metadata: Metadata = {
  title: "Ontick — custom ticketing platform, Stripe instalments + two mobile apps",
  description:
    "How Appycodes moved Ontick off Eventbrite onto a custom Laravel ticketing platform: multi-organizer, Stripe-orchestrated instalments with QR-ticket release on full payment, plus React Native check-in and customer apps. £2M+ processed.",
};

const data: CaseStudyData = {
  crumb: "Ontick",
  sector: "Case study · UK · Event ticketing",
  title: (
    <>
      a custom ticketing platform, stripe instalments, and two mobile apps for{" "}
      <span className="name">Ontick</span>.
    </>
  ),
  lede:
    "Off Eventbrite, off platform commissions, onto a fully owned ticketing stack: multi-organizer, with Stripe-orchestrated instalment payments, QR tickets released only on full settlement, a venue-side check-in app, and a customer app. £2M+ in sales generated to date, ongoing.",
  facts: [
    { label: "Client", value: "Ontick, event ticketing" },
    { label: "Sector", value: "UK events & ticketing" },
    { label: "Engagement", value: "Build + ongoing, live" },
    { label: "Surfaces", value: "Web, check-in app, customer app" },
  ],
  stats: [
    { n: "£2M+", label: "Sales generated through the platform since launch" },
    { n: "3", label: "Surfaces shipped: web, check-in app, customer app" },
    { n: "nil", label: "Commission paid to a third-party platform" },
    { n: "Stripe", label: "Idempotent instalments with automated recovery" },
  ],
  blocks: [
    {
      t: "figure",
      src: "/images/cs-ontick-platform.jpg",
      alt: "Ontick web platform: public event page and booking flow built on Laravel",
      caption:
        "The Ontick web platform: public-facing event pages, multi-organizer back-end, and the booking flow that feeds the Stripe-orchestrated instalment engine.",
    },
    {
      t: "section",
      eyebrow: "How the engagement started",
      title: "an eventbrite margin problem worth solving in code.",
      two: [
        "Ontick came to us running their events on Eventbrite. The buyer experience was fine and the staff tooling was fine, but the commission Eventbrite took on every ticket was the largest fixed cost on the business. At the volume Ontick was already running, that percentage made a custom platform a clearly positive ROI decision rather than a vanity project.",
        "The brief was specific: a custom booking platform with a rich public front-end and a full back-end, on a stack the client could own end-to-end. One feature was non-negotiable from day one — tickets had to be purchasable in instalments, with the QR codes only released after the final payment landed. That single rule set the architectural agenda for everything that followed.",
      ],
    },
    {
      t: "tldr",
      items: [
        "Migrated off Eventbrite onto a fully owned Laravel platform, eliminating the per-ticket commission that was the original reason for the engagement.",
        "Multi-organizer architecture by default: a super admin creates organizers; each organizer runs events with multiple ticket types, per-tier inventory and sale windows.",
        "Stripe-orchestrated instalment payments with strict guarantees: QR tickets are not released until the full balance settles; every instalment is idempotent; failed payments recover automatically.",
        "Two React Native apps: a venue-side check-in app tuned for speed, and a customer app with push notifications for upsell, reminders and recovery.",
        "£2M+ in sales processed to date; the engagement is ongoing.",
      ],
    },
    {
      t: "section",
      eyebrow: "Stage 1 · Custom Laravel platform",
      title: "multi-organizer from day one, not retrofitted.",
      two: [
        "The platform is built end-to-end on Laravel: the public booking surface, the organizer back-end, the super-admin back-end, and the REST API the mobile apps later consumed. One framework, one team, one deploy.",
        "The multi-organizer model was the most consequential choice. A super admin creates any number of organizers; each manages their own events, inventory, sale windows and payouts, with multiple ticket tiers at independent pricing and capacity. The data model was designed for this from day one rather than retrofitted — which is usually where multi-tenant ticketing platforms run into compounding problems later.",
      ],
    },
    {
      t: "cards",
      cols3: true,
      eyebrow: "Stage 2 · Stripe-orchestrated instalments",
      title: "instalments look simple from the outside. they are not, in production.",
      lead:
        "Each charge is a network call that can fail, succeed slowly, succeed twice, or land in an ambiguous state. Each ticket can be in any of those states at any point in its lifecycle. The job is to keep the system in a known-good state at every step. The shape we shipped:",
      items: [
        { title: "Stripe handles the actual capture", body: "We store payment methods via Stripe's tokenised flow and orchestrate the schedule from our side, calling Stripe's API when each instalment is due." },
        { title: "QR tickets held back until full settlement", body: "A booking can be paid down over months; the customer gets confirmation and a schedule at booking, but the ticket QR is only minted and emailed once the final instalment posts. Enforced in code, not policy." },
        { title: "Idempotency on every payment touchpoint", body: "Every charge uses a Stripe idempotency key derived from the booking id and instalment index. The webhook handler insert-on-conflicts against an event-id table before doing work, so a duplicate Stripe event produces exactly one state change." },
        { title: "Automated failed-payment recovery", body: "A failed charge enters a retry schedule with backoff, customer notifications at sensible intervals, and a soft-delete path for bookings that never recover. Operations see it; they do not have to touch it." },
        { title: "Duplicate-charge protection", body: "Beyond idempotency keys: booking-level locks during a payment attempt, a guard that refuses to mark a booking paid past its total, and a daily reconciliation cron comparing our ledger to Stripe balance transactions." },
      ],
    },
    {
      t: "figure",
      src: "/images/cs-ontick-checkout.jpg",
      alt: "Ontick checkout: ticket selection, instalment schedule and Stripe payment in a custom Laravel flow",
      caption:
        "The checkout surface where instalment schedules are composed, the first payment is captured, and the rest of the schedule is set up against the stored payment method.",
    },
    {
      t: "cards",
      eyebrow: "Stage 3 · Check-in app for venue staff",
      title: "one design constraint: speed. each check-in lands in under a second.",
      lead:
        "Once the platform was generating real ticket volume, door staff were checking attendees in from a browser view not built for the queue tempo of a real event. We shipped a dedicated React Native check-in app on the same Laravel REST API. The decisions that earn that latency:",
      items: [
        { title: "Offline-first scan path", body: "The app caches the full attendee list on session start. Scanning resolves locally; the network round-trip marks the attendee server-side in the background. The operator never waits on the API." },
        { title: "One-tap operation", body: "Open camera, scan, green tick, scan the next. No dialogs, no navigation. Edge cases (already checked-in, wrong event, comp ticket) surface inline without breaking the flow." },
        { title: "Bluetooth-scanner support", body: "For staff who prefer dedicated hardware over the camera." },
        { title: "Role-scoped login", body: "A staff member can only check in attendees for events they are assigned to. Permissions live on the API side, not the app." },
      ],
    },
    {
      t: "cards",
      cols3: true,
      eyebrow: "Stage 4 · The customer app",
      title: "the booking experience in the buyer's pocket, with messaging as the unlock.",
      lead:
        "A customer-facing React Native app gives the buyer the whole booking experience: browse, book, schedule instalments, access tickets. The bigger commercial unlock is the messaging layer — push notifications power three flows that previously sat in email and underperformed:",
      items: [
        { title: "Upsell", body: "Targeted offers for upgrade tickets, add-ons or partner events, segmented by the customer's booking history." },
        { title: "Failed-payment recovery", body: "A push lands within minutes of an instalment declining, with a one-tap path back into the app to retry. Conversion is materially higher than the equivalent email sequence." },
        { title: "Payment-schedule reminders", body: "A heads-up before the next instalment is due, with the option to swap payment method without leaving the app." },
      ],
    },
    {
      t: "figure",
      phone: true,
      src: "/images/cs-ontick-customer-app.jpg",
      alt: "Ontick customer app: React Native booking experience with push notifications for upsell, recovery and instalment reminders",
      caption: "The customer-facing app: browse, book, manage instalment schedules and access tickets in one place.",
    },
  ],
  stack: [
    { layer: "Web platform", value: "Laravel (PHP): public booking, organizer back-end, super admin, REST API" },
    { layer: "Frontend (web)", value: "Blade plus Vue.js components, hand-audited bundle" },
    { layer: "Database", value: "MySQL, multi-organizer schema, booking + instalment ledger" },
    { layer: "Payments", value: "Stripe: tokenised methods, idempotency-keyed charges, webhook reconciliation" },
    { layer: "Scheduled jobs", value: "Laravel queues + scheduler: instalment runs, retries, daily Stripe reconciliation" },
    { layer: "Check-in app", value: "React Native (iOS + Android), offline-first scan cache, Bluetooth support" },
    { layer: "Customer app", value: "React Native (iOS + Android), Expo + FCM + APNs push, deep links" },
    { layer: "Observability", value: "Structured request logging, Stripe-event ledger, push-delivery instrumentation" },
  ],
  outcomes: [
    "£2M+ in sales processed through the Ontick platform since launch.",
    "Zero platform commissions: every pound of ticket revenue stays with the organizers, minus Stripe fees.",
    "Multi-organizer architecture in production; new organizers onboarded by the super-admin team without engineering.",
    "Instalment engine running cleanly — duplicate-protection, idempotency and automated recovery, no real-world incident to date.",
    "Two production mobile apps: the check-in app at every event, the customer app live on iOS and Android.",
    "Ongoing engagement: we run the platform day-to-day, ship features alongside the client's team, and own recovery and observability.",
  ],
  cta: "got an eventbrite-style margin problem?",
};

export default function OntickCaseStudy() {
  return <CaseStudy data={data} />;
}
