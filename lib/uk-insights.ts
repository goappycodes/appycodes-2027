export type UkInsightGuide = {
  title: string;
  description: string;
  href: string;
  tag: string;
};

export type UkInsightCluster = {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  lede: string;
  image: string;
  decisions: { title: string; body: string }[];
  principles: string[];
  guides: UkInsightGuide[];
};

export const UK_INSIGHT_CLUSTERS: UkInsightCluster[] = [
  {
    slug: "company-data-identity",
    title: "UK company data and identity",
    shortTitle: "Company data & identity",
    description:
      "Practical guidance for UK company, charity, postcode and identity data: what each source proves, what it does not, and how to integrate it safely.",
    lede:
      "A registry result, postcode match or identity signal is evidence—not the whole decision. These guides show UK product teams how to resolve the right record, preserve provenance and keep human confirmation where the source cannot answer the business question.",
    image: "/images/blog-postcodes-io-vs-ideal-postcodes-uk-address-lookup.png",
    decisions: [
      { title: "What entity are you resolving?", body: "A postcode, premises, legal company, charity, person or authority to act each needs a different source and identifier." },
      { title: "What can the source prove?", body: "Separate existence and public-record facts from identity, ownership, eligibility, deliverability and risk decisions." },
      { title: "What becomes your stable key?", body: "Prefer durable identifiers such as a company number or UPRN where available; keep display text and user-confirmed data separate." },
      { title: "How does change arrive?", body: "Define refresh, conflict, retention and review rules before a scheduled sync is allowed to overwrite a business record." },
    ],
    principles: [
      "Resolve candidates before treating any result as confirmed.",
      "Store source, retrieval time and user confirmation separately.",
      "Design an explicit unavailable, ambiguous and manual-review path.",
      "Collect only the fields the product decision actually needs.",
    ],
    guides: [
      {
        title: "Postcodes.io vs Ideal Postcodes for UK address lookup",
        description: "Choose postcode geography or complete delivery-point addresses with a practical scoring model and Next.js integration pattern.",
        href: "/blog/postcodes-io-vs-ideal-postcodes-uk-address-lookup/",
        tag: "Address data",
      },
      {
        title: "Using the Companies House API for UK onboarding and KYC",
        description: "Resolve the legal entity, understand the KYC boundary and synchronise registry data without damaging customer-confirmed records.",
        href: "/blog/companies-house-api-uk-onboarding-kyc/",
        tag: "Company data",
      },
    ],
  },
  {
    slug: "payments-ecommerce",
    title: "UK payments and ecommerce",
    shortTitle: "Payments & ecommerce",
    description:
      "Architecture and operations for UK payments, ecommerce, tax, shipping and cross-border sales, grounded in production implementation choices.",
    lede:
      "Checkout is a chain of money, tax, fulfilment and evidence—not a payment button. This cluster helps UK retailers, marketplaces and subscription businesses decide where platform defaults end and custom operational logic begins.",
    image: "/images/blog-stripe-webhooks-2026.jpg",
    decisions: [
      { title: "Who is the merchant?", body: "Ownership of funds, refunds, disputes and invoices determines whether you need direct payments, subscriptions or marketplace architecture." },
      { title: "What must reconcile?", body: "Model the order, payment, tax, refund and fulfilment states as separate records joined by durable provider identifiers." },
      { title: "Where can fulfilment fail?", body: "A paid order is not a shipped order. Carriers, stock, address quality and asynchronous webhooks need observable recovery paths." },
      { title: "Which border is crossed?", body: "UK-only, Northern Ireland, EU and worldwide sales have different tax, customs, payment and customer-experience requirements." },
    ],
    principles: [
      "Make every money-moving webhook idempotent.",
      "Reconcile provider events against an internal ledger.",
      "Keep address, tax and fulfilment failures recoverable after payment.",
      "Confirm regulatory and tax positions with qualified advisers.",
    ],
    guides: [
      {
        title: "Stripe webhooks end to end",
        description: "A production pattern for signatures, idempotency, retries, event ordering and reconciliation.",
        href: "/blog/stripe-webhooks-end-to-end-2026/",
        tag: "Payments",
      },
      {
        title: "When custom ticketing beats platform fees",
        description: "The ownership, payment and operational trade-offs behind a UK event platform build.",
        href: "/blog/custom-ticketing-breakeven-2026/",
        tag: "Ticketing",
      },
      {
        title: "Anatomy of a B2B marketplace MVP",
        description: "The features and operational decisions that dominate a wholesale marketplace budget.",
        href: "/blog/b2b-marketplace-mvp-cost-2026/",
        tag: "Marketplace",
      },
    ],
  },
  {
    slug: "product-engineering-compliance",
    title: "UK product engineering and compliance",
    shortTitle: "Engineering & compliance",
    description:
      "UK-focused guidance on hosting, GDPR, accessibility, performance, migrations, operational resilience and agency delivery.",
    lede:
      "Architecture becomes a business constraint when a system must stay fast, supportable and defensible after launch. These guides connect technical design to the UK operating context: data location, supplier responsibilities, accessibility, search visibility and handover risk.",
    image: "/images/blog-digitalocean-zero-downtime-2026.jpg",
    decisions: [
      { title: "What is the failure budget?", body: "Availability, recovery time, data-loss tolerance and traffic shape should drive hosting—not a favourite cloud logo." },
      { title: "Who controls the data?", body: "Map controller, processor and sub-processor roles, locations and access before choosing infrastructure or an offshore delivery model." },
      { title: "What must survive a handover?", body: "Repository, deployment, secrets, backups, observability and decision records are part of the product, not optional documentation." },
      { title: "How will users and crawlers experience it?", body: "Rendering, accessibility and Core Web Vitals belong in acceptance criteria and release checks." },
    ],
    principles: [
      "Choose architecture from risk, traffic and team constraints.",
      "Keep production access least-privileged and auditable.",
      "Test restoration and rollback, not just deployment.",
      "Measure real-user performance after release.",
    ],
    guides: [
      {
        title: "WordPress to headless Next.js",
        description: "When decoupling improves performance and resilience—and when the extra moving parts are not worth it.",
        href: "/blog/wordpress-to-headless-nextjs-2026/",
        tag: "Architecture",
      },
      {
        title: "Zero-downtime DigitalOcean App Platform deployments",
        description: "Release sequencing, health checks, migrations and rollback for production web applications.",
        href: "/blog/zero-downtime-digitalocean-app-platform-2026/",
        tag: "Hosting",
      },
      {
        title: "Next.js App Router SSR and SEO",
        description: "A practical rendering model for content that must load quickly and remain indexable.",
        href: "/blog/nextjs-app-router-ssr-seo-2026/",
        tag: "Performance",
      },
    ],
  },
];

export function ukInsightCluster(slug: string) {
  return UK_INSIGHT_CLUSTERS.find((cluster) => cluster.slug === slug);
}
