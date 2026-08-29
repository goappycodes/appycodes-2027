// Content + config for the UK-targeted PPC landing pages
// (/uk/web-development/ and /uk/mobile-development/).
//
// These are paid-traffic landing pages, shipped noindex and kept out of the
// sitemap. Copy is deliberately terse — proof and outcomes over paragraphs.
// Ported from the previous Vite site; lucide icon fields have been dropped
// (lucide is not installed) and only real, in-repo imagery is referenced.

// ---------------------------------------------------------------------------
// Headline stats — outcomes, tied to real proof
// ---------------------------------------------------------------------------

export interface LandingStat {
  value: string;
  label: string;
}

export const LANDING_STATS: LandingStat[] = [
  { value: "12+ yrs", label: "Building for UK & global businesses" },
  { value: "500+", label: "Products shipped" },
  { value: "£2M+", label: "Client sales through one platform we built" },
  { value: "Top 0.1%", label: "Rated developers on PeoplePerHour" },
];

// ---------------------------------------------------------------------------
// Trusting an offshore team — concern → one-line answer
// ---------------------------------------------------------------------------

export interface TrustPoint {
  concern: string;
  answer: string;
}

export const INDIA_TRUST: TrustPoint[] = [
  {
    concern: "Will communication be a problem?",
    answer: "No — fluent British-business English, one named contact, daily updates.",
  },
  {
    concern: "Won't the timezone slow things down?",
    answer: "We work your hours — online through your UK day, calls in your time.",
  },
  {
    concern: "Is the engineering actually good?",
    answer: "12 years, Clutch Top Company, top-0.1% on PeoplePerHour. Reviewed and tested.",
  },
  {
    concern: "Who owns the code and IP?",
    answer: "You do — 100%, in your own repo from commit one.",
  },
  {
    concern: "Is my data safe?",
    answer: "GDPR-aligned, NDA + DPA signed first, least-privilege access.",
  },
  {
    concern: "Do I pay a fortune upfront?",
    answer: "No — milestone payments. Pay as work lands, pause anytime.",
  },
];

// ---------------------------------------------------------------------------
// Commercial guarantees
// ---------------------------------------------------------------------------

export interface Guarantee {
  title: string;
  body: string;
}

export const GUARANTEES: Guarantee[] = [
  { title: "You own everything", body: "Full IP, your repo, from day one." },
  { title: "NDA before specifics", body: "Mutual NDA + DPA before any access." },
  { title: "GDPR & UK-data aware", body: "Least-privilege; data stays on your infra." },
  { title: "Pay by milestone", body: "Pay as work lands. Pause anytime." },
  { title: "No lock-in", body: "Standard stacks, your accounts. Leave whenever." },
  { title: "30-day stability watch", body: "Full cover for the first month after launch." },
];

// ---------------------------------------------------------------------------
// How we work — compact steps
// ---------------------------------------------------------------------------

export interface ProcessStep {
  step: string;
  title: string;
  body: string;
}

export const PROCESS: ProcessStep[] = [
  { step: "01", title: "Free scoping call", body: "20–30 min in your timezone. Honest yes or no." },
  { step: "02", title: "Proposal & NDA", body: "Scope, milestones and price in days." },
  { step: "03", title: "Kickoff in your tools", body: "Your Slack, your repo, the real engineers." },
  { step: "04", title: "Build in sprints", body: "Demoable progress every two weeks." },
  { step: "05", title: "Launch & stay", body: "We ship, watch it 30 days, then retainer if you want." },
];

// ---------------------------------------------------------------------------
// Honest comparison
// ---------------------------------------------------------------------------

export const COMPARISON_COLUMNS = [
  "Typical offshore shop",
  "UK agency",
  "Freelancer",
  "Appycodes",
] as const;

export interface ComparisonRow {
  criterion: string;
  values: [string, string, string, string];
}

export const COMPARISON_ROWS: ComparisonRow[] = [
  { criterion: "Fluent, UK-hours communication", values: ["Patchy", "Yes", "Varies", "Yes — daily"] },
  { criterion: "Senior engineers, not juniors", values: ["Often juniors", "Mixed", "Maybe", "Yes"] },
  { criterion: "You own the code & IP", values: ["Sometimes", "Yes", "Mixed", "Yes — 100%"] },
  { criterion: "NDA + GDPR / UK-data aware", values: ["Varies", "Yes", "Rare", "Yes"] },
  { criterion: "Milestone payments, no lock-in", values: ["Big upfront", "Project fee", "Hourly", "Yes"] },
  { criterion: "Cost vs UK day-rates", values: ["Low", "High", "Low–mid", "Low — UK quality"] },
  { criterion: "12-yr track record with UK clients", values: ["Varies", "Maybe", "No", "Yes"] },
];

// ---------------------------------------------------------------------------
// Per-vertical page config
// ---------------------------------------------------------------------------

export interface BuildItem {
  title: string;
  body: string;
}

export interface LandingFaq {
  q: string;
  a: string;
}

export interface UkLandingConfig {
  variant: "web" | "mobile";
  path: string;
  metaTitle: string;
  metaDescription: string;
  adKeyword: string;
  h1: string;
  heroSub: string;
  heroBullets: string[];
  ogImage: string;
  buildHeading: string;
  build: BuildItem[];
  /** Names from the case-study set, in display order. */
  caseStudyNames: string[];
  faqs: LandingFaq[];
}

export const WEB_LANDING: UkLandingConfig = {
  variant: "web",
  path: "/uk/web-development/",
  metaTitle: "Outsource Web Development to a UK-Trusted Team",
  metaDescription:
    "UK businesses and agencies have outsourced web development to Appycodes for 12 years. SaaS, web apps, WordPress and ecommerce — senior engineers, your code and IP. Get a free quote.",
  adKeyword: "Outsourced web development for UK businesses",
  h1: "The web development team UK businesses have trusted for 12 years",
  heroSub:
    "Senior engineers shipping for UK companies and agencies. Your code, your IP — UK quality, without the UK day-rate.",
  heroBullets: [
    "Senior engineers · fluent, UK-hours comms",
    "SaaS, web apps, WordPress & ecommerce",
    "Your code, your repo, full IP",
    "Milestone payments · NDA · no lock-in",
  ],
  ogImage: "/images/service-saas-web.jpg",
  buildHeading: "What we build",
  build: [
    { title: "SaaS & web apps", body: "Multi-tenant SaaS, dashboards, portals — React, Next.js, Node, Laravel." },
    { title: "WordPress & WooCommerce", body: "Marketplaces, membership sites, headless, high-SKU stores." },
    { title: "Ecommerce & Shopify", body: "Storefronts, migrations, custom checkout." },
    { title: "APIs & integrations", body: "REST/GraphQL APIs, payments, CRM — the glue." },
    { title: "Rescue & takeover", body: "We audit, stabilise and finish stalled builds." },
    { title: "Maintenance", body: "Security, performance, steady improvement." },
  ],
  caseStudyNames: [
    "Creoate",
    "Easyship",
    "Yippee Malta",
    "Professional Energy",
    "PlusHeat",
    "Shutters 365",
    "Léonia",
    "Decofetch",
  ],
  faqs: [
    {
      q: "Why outsource to India instead of hiring in the UK?",
      a: "Senior engineers and faster delivery at a fraction of UK day-rates — and you own all the code and IP. We've done exactly this for UK clients for 12 years.",
    },
    {
      q: "How does communication work across the timezone?",
      a: "We work your UK hours, in your Slack or Teams, with one named contact and a daily written update.",
    },
    {
      q: "Will I own the code and IP?",
      a: "Yes — 100%, in your own repo, with milestone payments and no lock-in.",
    },
  ],
};

export const MOBILE_LANDING: UkLandingConfig = {
  variant: "mobile",
  path: "/uk/mobile-development/",
  metaTitle: "Outsource Mobile App Development to a UK-Trusted Team",
  metaDescription:
    "UK businesses and agencies outsource iOS and Android app development to Appycodes. React Native, one codebase, app-store launch handled, your code and IP. 12 years. Free quote.",
  adKeyword: "Outsourced mobile app development for UK businesses",
  h1: "The mobile app team UK businesses have trusted for 12 years",
  heroSub:
    "Senior engineers shipping iOS + Android for UK companies and agencies. Your code, your IP — UK quality, without the UK day-rate.",
  heroBullets: [
    "iOS + Android from one codebase",
    "App Store & Play launch handled",
    "Your code, your repo, full IP",
    "Senior engineers · fluent, UK-hours comms",
  ],
  ogImage: "/images/service-mobile-app.jpg",
  buildHeading: "What we build",
  build: [
    { title: "iOS + Android apps", body: "One React Native codebase, both stores." },
    { title: "App Store & Play launch", body: "Signing, listings and review — handled." },
    { title: "Push, offline & OTA", body: "Reliable push, offline-first, instant OTA fixes." },
    { title: "AI & native features", body: "On-device AI and native modules when needed." },
    { title: "Backend & APIs", body: "Node/Laravel APIs, auth, payments, data." },
    { title: "Takeover & maintenance", body: "Audit, stabilise, ship — then keep it healthy." },
  ],
  caseStudyNames: ["Bloc", "Ontick", "Zonely", "Player Profile Hub"],
  faqs: [
    {
      q: "React Native or native?",
      a: "One React Native codebase ships both stores and shares your backend — native modules when a feature needs them.",
    },
    {
      q: "Do you handle App Store and Play submission?",
      a: "Yes, end to end — signing, listings, privacy declarations and the review back-and-forth.",
    },
    {
      q: "Will I own the code and IP?",
      a: "Yes — 100%, in your own repo, with milestone payments and no lock-in.",
    },
  ],
};
