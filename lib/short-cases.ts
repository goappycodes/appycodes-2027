/**
 * Tier-two case studies: one screen each, chosen for the hard problem rather
 * than the logo.
 *
 * Clients are described by sector and geography rather than named. A large
 * share of this work was delivered under a partner's name, and publishing an
 * end client we do not hold the relationship with is not ours to do. The ten
 * written-up studies are the ones with agreement attached; on a live engagement
 * we introduce a reference directly.
 */

export type ShortCase = {
  slug: string;
  /** How the client is described. Sector plus geography, never a name. */
  who: string;
  /** What the engagement was. */
  what: string;
  /** The genuinely difficult part — the reason this one is on the page. */
  hard: string;
  /** Stack tags for the chip row. */
  tags: string[];
  /** The outcome, short enough to read as a figure. */
  outcome: string;
  /** Related problems-library entry, where one exists. */
  problem?: string;
  /** Related sector page. */
  sector?: string;
};

export const SHORT_CASES: ShortCase[] = [
  {
    slug: "live-schema-migration",
    who: "A UK caravan servicing business",
    what: "A WordPress marketing site alongside a Laravel back office and customer portal, with a five-role permission model and published service reports.",
    hard: "The shipped schema modelled exactly one vehicle per customer, with the vehicle fields on the customer table. The new design needed many — and roughly fifty files read those columns, a good portion at SQL level where an ORM accessor cannot intercept. Migrated additive-first with an observer-synced mirror, so no file had to change on day one and there was no freeze.",
    tags: ["Laravel", "MySQL", "WordPress"],
    outcome: "Restructured live, no downtime",
    problem: "schema-change-without-a-freeze",
    sector: "professional-services",
  },
  {
    slug: "app-store-payments-exemption",
    who: "An Indian two-sided marketplace",
    what: "Consumer and expert apps on a shared backend — wallet, coins, paid chat and real voice calls, on both stores.",
    hard: "Apple blocked an update demanding wallet top-up move to in-app purchase, which would have taken the margin with it. Rather than concede, we researched the person-to-person services exemption, benchmarked comparable apps operating under it, and built the appeal on that basis — while scoping a calls-only fallback in parallel in case it failed.",
    tags: ["React Native", "Razorpay", "PSTN"],
    outcome: "Margin kept, app live on both stores",
    sector: "fintech-payments",
  },
  {
    slug: "partial-capacity-booking",
    who: "An Indian outdoor media operator",
    what: "An operations platform for physical advertising inventory — properties, availability and bookings across a city.",
    hard: "Kiosk properties carry a fixed pole capacity, so availability is not free-or-taken. Multiple advertisers can book the same kiosk simultaneously provided enough poles remain free across the overlapping date range, and the system must refuse anything that would exceed capacity in that window. Closer to airline seat inventory than to a calendar.",
    tags: ["Web platform", "Scheduling"],
    outcome: "Fractionally consumable inventory, modelled properly",
    sector: "professional-services",
  },
  {
    slug: "hindi-ivr-at-scale",
    who: "A Tata-linked Indian B2B commerce group",
    what: "A telecalling and delivery-confirmation platform with automated outbound IVR, recipient import, telecaller dashboard and filtering.",
    hard: "Edge functions with two invocation paths — triggered manually by a telecaller with per-recipient data, and run one-by-one from a scheduled job for batch processing — so the calling logic lives in one place rather than being duplicated. Hindi text-to-speech, with the supported language set checked against the provider's documentation before it was committed to.",
    tags: ["Edge functions", "IVR", "Webhooks"],
    outcome: "Automated outbound confirmation, in Hindi",
    sector: "distribution-supply-chain",
  },
  {
    slug: "backups-into-git",
    who: "An Indian tea network business",
    what: "A mobile application on a managed database, on a plan that includes no backups at all.",
    hard: "Rather than making the upgrade a condition, a scheduled job now dumps roles, schema and data nightly and commits the snapshot to a dedicated branch. Every commit is a restorable point-in-time snapshot with restore instructions in that branch's README — and the client took one manual backup first, before trusting the automation.",
    tags: ["CI", "Postgres", "Supabase"],
    outcome: "Compliance risk converted into a git history",
    problem: "free-tier-database-with-no-backups",
    sector: "distribution-supply-chain",
  },
  {
    slug: "distributor-feed-integrity",
    who: "A UK barcode and auto-ID retailer",
    what: "An OpenCart storefront whose commercial core is an automated product feed from a distributor, staged and synced by a scheduled job.",
    hard: "Titles and descriptions were not pulling through per SKU — the parent product name was being applied to every variant beneath it, so materially different part numbers appeared identical to customers and to search. Fixed at the mapping layer, with a reconciliation check that flags any variant matching its parent.",
    tags: ["OpenCart", "Feed sync", "SEO"],
    outcome: "Variant-level data restored across the catalogue",
    problem: "variant-data-collapsing-across-skus",
    sector: "distribution-supply-chain",
  },
  {
    slug: "content-out-of-the-codebase",
    who: "An Irish group of certification businesses",
    what: "A headless rebuild — WordPress as the content backend, Next.js in front, with content modelled in ACF and served through a custom REST namespace.",
    hard: "Roughly nine thousand lines of static country-guide content — the largest file in the repository — retired into editable CMS records. Every guide became a queryable record with typed fields, which is what made the AI content workstream that followed viable at all.",
    tags: ["Next.js", "WordPress", "ACF"],
    outcome: "Marketing ships without a developer or a deploy",
    sector: "education-training",
  },
  {
    slug: "two-sided-player-platform",
    who: "A UK grassroots and academy football platform",
    what: "Players build verifiable profiles with video; coaches are listed, filtered and discovered. Subscription tiers tied to upload limits, plus a React Native companion app.",
    hard: "Three things testing caught that a feature list would not: age-filtered search silently fell back to random results when nothing matched, a coach could be registered as six years old when real qualifications start at fourteen, and document verification accepted the wrong country's ID entirely. All three were trust problems rather than bugs.",
    tags: ["Next.js", "React Native", "Mux", "Stripe"],
    outcome: "Video costs modelled before tiers were priced",
    sector: "sport",
  },
  {
    slug: "multi-organisation-ordering",
    who: "A Siliguri food wholesaler",
    what: "A B2B ordering app across two legal entities, with items, pricing, price lists and customers all sourced live from the accounting ledger.",
    hard: "A single customer can be scoped to one company, the other, or both — with exclusivity enforced on phone number so an exclusive customer cannot be registered against the other entity. GST-inclusive pricing throughout, plus a price-change warning at checkout because an unauthenticated shopper's prices change once their price list is applied.",
    tags: ["Zoho Books", "Mobile", "GST"],
    outcome: "One app, two entities, one source of truth",
    sector: "tally-zoho-india",
  },
  {
    slug: "subscription-cutover",
    who: "A Paris membership publication",
    what: "A live WooCommerce Subscriptions migration on a revenue-generating base, with two parallel plan types, store credit and custom lifecycle emails.",
    hard: "A fixed cutover date with no rollback. Delivered as must-use plugins so billing-critical code cannot be deactivated by an admin, with Action Scheduler reconciled explicitly — that background runner is where renewals actually execute, and where subscription migrations break silently.",
    tags: ["WooCommerce", "Subscriptions", "PHP"],
    outcome: "Migrated on the date, no billing incidents",
    problem: "live-subscription-migration-without-billing-errors",
    sector: "fintech-payments",
  },
  {
    slug: "field-force-attendance",
    who: "An Indian biologicals and pharma company",
    what: "A field sales app for medical representatives, published to both stores with assets produced in-house.",
    hard: "Punch-in and punch-out each capture an odometer photograph plus a manual reading, with in and out kilometres recorded and travel allowance calculated automatically. The scope discipline mattered as much: the client's document specified leave management at the depth of a dedicated HR platform, and we said no and triaged it into a later phase.",
    tags: ["React Native", "Expo", "Zoho"],
    outcome: "Travel allowance calculated, not claimed",
    problem: "notifications-leaking-between-users-after-logout",
    sector: "health-care",
  },
  {
    slug: "prototype-before-the-bid",
    who: "A UK registered charity",
    what: "A scoping engagement — technical specification, a vendor evaluation tool and a CRM recommendation — ahead of an invitation to tender.",
    hard: "Rather than bid on a paper design, we built a working prototype of the CRM-to-website integration first. It proved the flow end to end, and it surfaced three blockers that would have wrecked a fixed-price bid: no API keys on trial accounts, payments routed through a connected-account model that cannot be tested without live credentials, and a sandbox available only on the top plan.",
    tags: ["WordPress", "CRM", "Integration"],
    outcome: "Three bid-breaking blockers found before quoting",
    sector: "professional-services",
  },
];
