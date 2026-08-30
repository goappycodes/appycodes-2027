/**
 * Sector pages.
 *
 * The service pages describe what we build; these describe who we have built it
 * for and what we learned about their domain. They exist because "energy broker
 * software" and "custom LMS" are what a buyer actually searches, and because the
 * proof is far more convincing when it is sector-specific.
 *
 * Rule applied throughout: clients are named only where they are already public
 * on this site (the fifteen written case studies and the logo wall). Everything
 * else is described by sector and geography — a large share of the register is
 * white-label work delivered under a partner's name, and a compromised store is
 * never named at all.
 */

export type SectorData = {
  slug: string;
  /** Short label — nav, index card, breadcrumb. */
  name: string;
  /** Display headline fragment; rendered lowercase like the rest of the site. */
  headline: string;
  metaTitle: string;
  metaDescription: string;
  /** One-liner for the index grid and the nav. */
  summary: string;
  /** Hero stat rail. */
  stats: { n: string; label: string }[];
  /** The problem this sector has, in its own vocabulary. */
  problem: { lede: string; points: string[] };
  /** What we have built in it. Three or four, specific. */
  built: { title: string; body: string }[];
  /** The hard part, in detail — this is the reason the page is credible. */
  hard: { title: string; lede: string; detail: string[] };
  stack: { layer: string; value: string }[];
  /** What an engagement in this sector actually looks like. */
  engagement: { title: string; body: string }[];
  faqs: { question: string; answer: string }[];
  /** Pillar service slugs this sector leans on most. */
  services: string[];
  cta: string;
};

export const SECTORS_DATA: SectorData[] = [
  /* ------------------------------------------------------------- energy -- */
  {
    slug: "energy-utilities",
    name: "energy & utilities",
    headline: "software for energy brokers, suppliers and the people who reconcile their invoices",
    metaTitle: "energy broker software development — ERP, tendering and invoice extraction",
    metaDescription:
      "Custom software for UK energy brokers and utilities: supplier tendering, contract lifecycle, brokerage accounting, and invoice extraction built supplier by supplier.",
    summary:
      "Broker ERPs, supplier tendering and invoice extraction pipelines built one supplier format at a time.",
    stats: [
      { n: "11", label: "supplier formats extracted" },
      { n: "100+", label: "suppliers in one tender" },
      { n: "ERP", label: "not a spreadsheet" },
      { n: "live", label: "under active support" },
    ],
    problem: {
      lede:
        "Energy broking runs on documents nobody designed to be read by a machine. Every supplier issues invoices in its own format, contract data lives across a CRM, a spreadsheet and an inbox, and the margin on a deal depends on arithmetic that has to be right every single time.",
      points: [
        "Supplier invoices arrive as PDFs, each in a different layout",
        "Tender comparison happens in spreadsheets that only one person understands",
        "Management fee and uplift calculations are done by hand",
        "Contract renewal dates are the business, and they live in someone's calendar",
        "A misread figure is not a bug, it is an invoice you cannot defend",
      ],
    },
    built: [
      {
        title: "A full brokerage ERP",
        body: "Supplier tendering, contract lifecycle, brokerage accounting and client relationships in one system rather than four — built for a UK commercial energy broker and still under active support.",
      },
      {
        title: "Eleven invoice extraction pipelines",
        body: "One per supplier, because each supplier's layout is genuinely different. Scottish Power, SSE, Shell Energy, npower, Utilita, Yorkshire Gas & Power, United Gas & Power, Yu Energy, Regent Gas, TEM and Total — each with its own quirks.",
      },
      {
        title: "Reconciliation, not trust",
        body: "Extracted values are checked against the system's own records and updated on mismatch. That is the difference between a demo-grade parser and something you can bill from.",
      },
      {
        title: "Tender and quotation documents",
        body: "Management fee calculation on both the tender edit screen and the client summary, with generated analysis reports and tender quotes carrying per-document headers.",
      },
    ],
    hard: {
      title: "eleven suppliers, eleven layouts, one number that has to be right",
      lede:
        "Document extraction demos beautifully and fails commercially. A generic parser gets 90% of a clean invoice and silently mangles the tenth — which is the one with the credit adjustment on it.",
      detail: [
        "The approach that works is unglamorous: build extraction supplier by supplier, tuned to that supplier's actual layout, rather than one clever generic parser that is wrong in eleven different ways.",
        "Every extracted value is then reconciled against the system's own bill records rather than trusted. Where they disagree, the system updates and flags rather than quietly accepting the document.",
        "The API surface is segmented by supplier and client entity, so adding a twelfth supplier is a contained piece of work rather than a regression risk across the other eleven.",
        "This is the pattern any business drowning in unstructured supplier documents needs — utilities, insurance, logistics and finance all have the same problem wearing different clothes.",
      ],
    },
    stack: [
      { layer: "Application", value: "Laravel — tendering, contracts, brokerage accounting" },
      { layer: "Extraction", value: "Per-supplier PDF pipelines with reconciliation against system bills" },
      { layer: "Documents", value: "Generated analysis reports and tender quotes, per-document headers" },
      { layer: "Operations", value: "Dedicated development and error-log channels; production under active support" },
    ],
    engagement: [
      { title: "Start with the documents", body: "We take your real invoices — the messy ones, not the samples — and prove extraction on them before anything else is scoped." },
      { title: "Model the money", body: "Uplift, management fee, commission and reconciliation rules agreed on paper. This is where a brokerage system is won or lost." },
      { title: "Build supplier by supplier", body: "Each format is its own piece of work with its own acceptance test, so progress is visible and additions are safe." },
      { title: "Run it with you", body: "Production error logs go to a channel we watch. An ERP is not a delivery, it is a system somebody has to keep alive." },
    ],
    faqs: [
      { question: "Can you handle a supplier format we have not seen you do?", answer: "Yes — that is the normal case. Each new format is scoped as its own contained piece of work, which is exactly why the architecture separates them." },
      { question: "Is this AI document extraction?", answer: "Where a model genuinely helps, yes. But the reliability comes from reconciling against your own records, not from the extraction method. We will tell you which parts need a model and which do not." },
      { question: "We already have a CRM. Do we throw it away?", answer: "Usually not. We extend what works and rebuild the parts holding you back — decided during architecture, not assumed at the pitch." },
      { question: "How long does a brokerage ERP take?", answer: "A focused first phase in 12 to 16 weeks. The extraction pipelines then extend supplier by supplier as you need them." },
    ],
    services: ["product-engineering", "ai-systems", "rescue-hardening"],
    cta: "got invoices nobody can face reading?",
  },

  /* ---------------------------------------------------------- education -- */
  {
    slug: "education-training",
    name: "education & training",
    headline: "course platforms, learning systems and the content architecture underneath them",
    metaTitle: "education technology development — LMS, course platforms and fee collection",
    metaDescription:
      "LMS and course platform development for training providers and schools: headless content architecture, fee collection, dual-channel reminders and store publishing.",
    summary:
      "Eight education engagements across four countries — course platforms, learning systems, fee collection and the AI tooling that only works once content is structured.",
    stats: [
      { n: "8", label: "education engagements" },
      { n: "4", label: "countries" },
      { n: "9,000", label: "lines of content freed" },
      { n: "2", label: "app stores published to" },
    ],
    problem: {
      lede:
        "Education businesses sell content, and almost all of them store it in the worst possible place — hardcoded into a template, trapped in a plugin, or spread across a thousand pages nobody can edit without a developer. Everything downstream suffers: the marketing team cannot ship, translation is impossible, and AI tooling has nothing structured to work with.",
      points: [
        "Course and destination content locked in code, not in a CMS",
        "Marketing cannot publish without a developer and a deploy",
        "The same content cannot be reused across sites or languages",
        "Fee collection runs on bank transfers and chasing",
        "An app was promised and the store rejected it",
      ],
    },
    built: [
      {
        title: "Headless course platforms",
        body: "WordPress as the content backend with a Next.js front end for a group of TEFL certification businesses — content modelled in ACF and served through a custom REST namespace.",
      },
      {
        title: "Learning management systems",
        body: "LMS builds for a business school and a Belgian client, including a cross-platform app published to both Google Play and the App Store.",
      },
      {
        title: "Fee collection that chases for you",
        body: "Online payment through an Indian gateway with generated receipts, plus early-bird reminders over both WhatsApp and email — the combination that actually reaches Indian parents.",
      },
      {
        title: "Teacher and tutor platforms",
        body: "Portals, marketplaces and research publishing across the UK, Ireland and India — including an academic articles portal built as decoupled backend and front end so cited URLs never break.",
      },
    ],
    hard: {
      title: "structure the content first, then the AI is worth having",
      lede:
        "The most valuable thing we did on a course platform was delete 9,000 lines of static country-guide content from a codebase and turn it into editable records.",
      detail: [
        "Destination guides — hero, overview, teaching-job accordion, living costs, key facts — were the single largest static file in the repository. Marketing could not touch them without a developer and a deploy.",
        "Modelled as ACF fields on a custom post type and exposed through a dedicated REST namespace, every guide became a queryable record with typed fields. The marketing team now edits them directly.",
        "That sequencing is the whole point. You cannot usefully generate, translate, summarise or quality-check a 9,000-line static file. You can once every guide is a record — which is why the AI content workstream came second and worked.",
        "The counter-example is in the register too: a quiz feature that stored each language as its own database column, so adding a language meant a schema migration and a code change. We flagged it as unscalable before the client asked for language five, not after.",
      ],
    },
    stack: [
      { layer: "Content", value: "WordPress or Sanity as the editable backend, ACF-modelled" },
      { layer: "Front end", value: "Next.js, server-rendered, on a custom REST namespace" },
      { layer: "Payments", value: "Regional gateways with generated receipts and reconciliation" },
      { layer: "Notifications", value: "WhatsApp and email, dual-channel for parent and student audiences" },
      { layer: "Mobile", value: "React Native or Cordova, published to both stores" },
    ],
    engagement: [
      { title: "Audit the content", body: "Where it lives, who can edit it, and what it would take to make it structured. This decides everything after it." },
      { title: "Model it properly", body: "Typed fields, a real content type, and an API the front end and any future tooling can both read." },
      { title: "Build the surfaces", body: "Site, portal, app — whichever the business actually needs. We will argue against the ones it does not." },
      { title: "Then automate", body: "Generation, translation and quality checks, once there is structured content for them to work on." },
    ],
    faqs: [
      { question: "Should we build an LMS or buy one?", answer: "Buy, unless your teaching model genuinely does not fit one — which is rarer than founders think. We have published a cost study on exactly this decision and we will point you at it before we quote." },
      { question: "Can our marketing team edit courses without us?", answer: "That is the point of the architecture. Headless does not mean developer-only; editors keep a proper CMS behind a fast front end." },
      { question: "Can you get our course app into the stores?", answer: "Yes, including the rejections. We have resolved toolchain incompatibilities, provisioning and an over-declared background-audio capability that Apple rejects on sight for a learning app." },
      { question: "Do you do the AI content tooling too?", answer: "Yes, and we will tell you if your content is not structured enough for it to be worth doing yet." },
    ],
    services: ["product-engineering", "commerce-content", "ai-systems", "native-mobile"],
    cta: "content trapped in a template?",
  },

  /* ------------------------------------------------------------ fintech -- */
  {
    slug: "fintech-payments",
    name: "fintech & payments",
    headline: "exchanges, wallets, remittance and subscription billing that has to reconcile",
    metaTitle: "fintech software development — exchange engines, wallets and subscription billing",
    metaDescription:
      "Fintech engineering: an exchange match engine, wallets and payouts, outward remittance scoping, and live subscription migrations with a fixed cutover date.",
    summary:
      "An exchange match engine, wallets and payouts, a remittance platform scoped against a formal RFP, and subscription migrations run on live revenue.",
    stats: [
      { n: "9", label: "fintech engagements" },
      { n: "6.4K", label: "lines in the match engine" },
      { n: "10 yrs", label: "in one financial estate" },
      { n: "0", label: "acceptable billing errors" },
    ],
    problem: {
      lede:
        "Financial software has a property almost nothing else has: being nearly right is worse than being obviously broken. A checkout that fails is an annoyance. A subscription migration that double-charges half your base, or a wallet that credits twice under load, is an incident with a regulator attached.",
      points: [
        "Two code paths can complete the same payment, and sometimes both do",
        "Subscription migrations have a cutover date and no rollback",
        "Wallet balances have to survive concurrency, not just work in testing",
        "Regulated features — KYC, screening, reporting — are not negotiable, and everything else is",
        "The store platforms have opinions about how you are allowed to take money",
      ],
    },
    built: [
      {
        title: "An exchange match engine",
        body: "Roughly 6,400 lines of PHP covering the match engine, buy and sell orders, wallet handling, issuance strategies and currency rates — modernised onto current Doctrine and a real test suite.",
      },
      {
        title: "Wallets, payouts and coins",
        body: "A two-sided marketplace wallet with one gateway for top-up and another for UPI withdrawals, running against real per-minute paid services.",
      },
      {
        title: "Outward remittance, scoped honestly",
        body: "A white-labelled online remittance platform proposed against a formal RFP — with the deferrable items marked in red, so the client had to decide what compliance they were actually willing to postpone.",
      },
      {
        title: "Live subscription migrations",
        body: "A WooCommerce Subscriptions migration on a revenue-generating membership base, with two parallel plan types, store credit and a hard cutover date.",
      },
    ],
    hard: {
      title: "two paths completed the same order, and three real customers paid for it",
      lede:
        "On a live ticketing platform, upfront web orders were being processed concurrently by two routes — the payment provider's success redirect and its webhook — with nothing coordinating them.",
      detail: [
        "At a live festival, three real orders ended in an inconsistent state: payment taken, order not completed, tickets not sent. Not a load-test scenario. Named orders, real people, at the gate.",
        "The fix was two-part: isolate the webhook so it only handles the payment types it should, using provider metadata to tell them apart, and apply row-level database locks to the order-completion path so it cannot run twice.",
        "Then repair the damage — the affected orders corrected in the database, statuses fixed and tickets reissued — and give the client a written explanation of both the cause and the fix rather than a quiet patch.",
        "The general lesson is the one worth hiring for: if two code paths can complete the same financial transaction, eventually both will, and the day it happens will be your busiest.",
      ],
    },
    stack: [
      { layer: "Ledgers", value: "Row-locked completion paths, idempotency keys, reconciled against provider records" },
      { layer: "Gateways", value: "Stripe, Razorpay, Cashfree, PayPlug, EasyPay — chosen per market, not per preference" },
      { layer: "Subscriptions", value: "WooCommerce Subscriptions and custom billing, delivered as must-use plugins so they cannot be deactivated" },
      { layer: "Exchange", value: "PHP match engine on Doctrine, with a test suite" },
      { layer: "Compliance", value: "KYC and document verification flows, tested against mismatched documents on purpose" },
    ],
    engagement: [
      { title: "Model the money first", body: "States, transitions, failure modes and who is allowed to move a balance. On paper, before code, every time." },
      { title: "Decide what is deferrable", body: "On a regulated product, the useful conversation is which compliance elements are genuinely phase two. We will make you answer it." },
      { title: "Build the reconciliation with the feature", body: "Not after. A payment feature without a reconciliation path is half a feature." },
      { title: "Migrate with a rehearsal", body: "Live billing migrations get a dry run against a copy of production before the cutover date, not a hopeful weekend." },
    ],
    faqs: [
      { question: "Have you migrated a live subscription base before?", answer: "Yes, with two parallel plan types, store credit and a fixed cutover date. The operational detail that matters: subscription queries run against active and on-hold statuses only, never pending. That is the kind of thing you learn by doing it, not by reading the docs." },
      { question: "Can you deal with App Store rules on payments?", answer: "We have argued a person-to-person services exemption successfully rather than surrendering margin to in-app purchase, and scoped the fallback design in parallel in case the appeal failed." },
      { question: "Do you handle KYC?", answer: "Yes, including the unglamorous part — testing verification against deliberately mismatched documents, which is how we found a flow that accepted the wrong country's ID." },
      { question: "Who owns the code?", answer: "You do, from day one. On financial systems that matters more than anywhere else." },
    ],
    services: ["product-engineering", "commerce-content", "rescue-hardening"],
    cta: "money moving through code you did not write?",
  },

  /* --------------------------------------------------------- supply chain -- */
  {
    slug: "distribution-supply-chain",
    name: "distribution & supply chain",
    headline: "ordering, inventory and last-mile systems for distributors who run on Tally and Zoho",
    metaTitle: "distribution and supply chain software — B2B ordering, IMS and last-mile",
    metaDescription:
      "B2B ordering apps, inventory management, CFA systems and last-mile delivery for Indian distribution — built against the accounting system you already run on.",
    summary:
      "B2B ordering on a live accounting catalogue, inventory and CFA systems, branch stock and last-mile delivery — four clients, one coherent capability.",
    stats: [
      { n: "13", label: "supply chain projects" },
      { n: "2", label: "legal entities, one app" },
      { n: "GST", label: "inclusive, end to end" },
      { n: "Zoho", label: "as the source of truth" },
    ],
    problem: {
      lede:
        "Indian distribution does not run on a greenfield database. It runs on Tally or Zoho, a WhatsApp group, a price list with fourteen exceptions, and a salesperson who knows which customer belongs to which company. Any software that ignores that gets replaced by the WhatsApp group within a month.",
      points: [
        "Customers, items and pricing already live in the accounting system",
        "One business, two legal entities, and customers who belong to one or both",
        "Prices are GST-inclusive on the shelf and exclusive in the ledger",
        "Case, bulk and single-unit ordering all coexist",
        "Branch staff need scoped access, not the whole system",
      ],
    },
    built: [
      {
        title: "B2B ordering on a live catalogue",
        body: "A wholesale ordering app for a distributor with two legal entities, sourcing items, pricing, price lists and customer records directly from Zoho Books rather than duplicating them.",
      },
      {
        title: "Inventory and CFA systems",
        body: "An inventory management system and a separate carrying-and-forwarding agent application — the distribution intermediary model that runs Indian FMCG and pharma supply.",
      },
      {
        title: "Branch stock and last-mile",
        body: "A last-mile delivery application including integration with a microfinance counterparty, plus a branch inventory module with scoped branch logins and per-order stock inward.",
      },
      {
        title: "Stock movement semantics, agreed",
        body: "Stock correction can be IN or OUT; damage and waste are always OUT. A small rule, and the kind that quietly corrupts inventory numbers for years if it is guessed rather than agreed with the client.",
      },
    ],
    hard: {
      title: "one customer, two companies, and a phone number that decides which",
      lede:
        "A distributor operating two legal entities needed a single app where a customer could be scoped to one company, the other, or both — and where exclusivity actually held.",
      detail: [
        "Exclusivity is enforced on phone number: a customer exclusive to one entity must not have their number registered against the other. An admin checklist controls which organisations a customer belongs to and can order from.",
        "Category and subcategory hierarchy is driven by a custom field in the accounting system rather than a second taxonomy in the app, so merchandising stays in one place.",
        "Pricing is GST-inclusive in the app and on the final bill, sourced from the ledger — with a price-change warning at checkout, because an unauthenticated shopper's prices can change once their price list is applied at login.",
        "Worth saying plainly: the delivery that failed on this project failed on communication, not engineering. A round was rejected because the client could not see or test what had changed. The fix was a snapshot against every point, and it is now how we report.",
      ],
    },
    stack: [
      { layer: "Source of truth", value: "Zoho Books — items, pricing, price lists, customers" },
      { layer: "Ordering", value: "Mobile app with case, bulk and single-unit ordering, favourites and debounced search" },
      { layer: "Admin", value: "Merchandising control — homepage, new arrivals, hidden and inactive items" },
      { layer: "Integrations", value: "Microfinance and agent-portal counterparties, TDL extensions into Tally" },
      { layer: "Performance", value: "Lazy-loaded catalogue and category listings" },
    ],
    engagement: [
      { title: "Start from the ledger", body: "Whatever is already the source of truth stays the source of truth. We build the ordering surface on top of it rather than a second version of your catalogue." },
      { title: "Write the rules down", body: "Requirements arriving over WhatsApp get pulled back into a written, reviewed list before work continues. That is not bureaucracy, it is how the inventory stays correct." },
      { title: "Show the change", body: "Every reported item comes with a snapshot you can check. Learned the hard way, applied since." },
      { title: "Scope access properly", body: "Branch logins, salesperson records and admin control designed for who actually uses the system, not for a demo." },
    ],
    faqs: [
      { question: "Do we have to move off Tally or Zoho?", answer: "No, and you should not. We build against them — including TDL extension work inside Tally, which most development shops will not touch." },
      { question: "Can one app serve two of our companies?", answer: "Yes. We have built exactly that, including exclusivity rules enforced at the customer level." },
      { question: "Is pricing GST-inclusive?", answer: "It can be, throughout — app display and final bill both — sourced from your accounting system rather than recalculated." },
      { question: "What about the salespeople who take orders by phone?", answer: "They get salesperson records and an ordering path too. A B2B ordering app that ignores the field team gets ignored by the field team." },
    ],
    services: ["product-engineering", "native-mobile", "rescue-hardening"],
    cta: "still taking orders on whatsapp?",
  },

  /* ------------------------------------------------------------- events -- */
  {
    slug: "events-ticketing",
    name: "events & ticketing",
    headline: "ticketing platforms you own, and the door app that has to work with a queue forming",
    metaTitle: "event ticketing platform development — own the platform, keep the commission",
    metaDescription:
      "Custom event ticketing platforms, organiser panels, check-in apps and instalment payments — built for operators who want their commission back.",
    summary:
      "An owned ticketing platform with instalments and two native apps, a door-scanning app, and a social events estate spanning five codebases.",
    stats: [
      { n: "£2M+", label: "processed on one platform" },
      { n: "nil", label: "third-party commission" },
      { n: "4+ yrs", label: "on the longest estate" },
      { n: "3", label: "surfaces: web, door, customer" },
    ],
    problem: {
      lede:
        "Ticketing marketplaces take a cut of every ticket and own the relationship with your attendee. That trade is fine until volume makes it the largest line in your cost base — at which point you discover you cannot leave, because the platform holds the customer list, the payment history and the scanning app.",
      points: [
        "Per-ticket commission scales exactly with your success",
        "The marketplace owns your attendee data, not you",
        "Instalment plans and free tickets do not fit the standard flow",
        "Door staff need something that works on bad venue wifi",
        "Nobody notices the payment race condition until a live event",
      ],
    },
    built: [
      {
        title: "An owned ticketing platform",
        body: "Multi-organiser by default, with per-tier inventory, sale windows and no per-ticket commission — plus organiser tooling for upsells, post-purchase promotions, broadcast messaging and complimentary orders.",
      },
      {
        title: "Instalments done properly",
        body: "Instalment schedules with the ticket QR held back until full settlement, idempotency-keyed charges and automated failed-payment recovery.",
      },
      {
        title: "A door app that assumes bad wifi",
        body: "Offline-first React Native scanning: open camera, scan, green tick, next. Published to both stores with the internal team on the tester list before an event, not during one.",
      },
      {
        title: "A social events estate",
        body: "Four years across an app, its backend, a self-serve ads platform, a marketplace and the web front — including remote control over tab visibility so sections can be turned on without shipping a release.",
      },
    ],
    hard: {
      title: "a check-in app has the most unforgiving failure profile in software",
      lede:
        "It is used by non-technical staff, at a venue door, under time pressure, on poor connectivity, with a queue forming behind the person it is failing for.",
      detail: [
        "That is why the app is offline-first rather than merely offline-tolerant, and why the scan loop is one gesture with one unambiguous confirmation.",
        "It is also why the boring preparation is not process theatre: getting the internal team onto the tester list, and extending event date ranges on test accounts so QA works against realistic data, are the only ways to find problems before a queue does.",
        "One store rejection worth naming, because it would block a launch: the build was refused for a missing camera permission description. On a ticket scanner the camera is the product, so a generic or absent usage string is a hard stop rather than a nuisance.",
        "And on the platform side, the payment race condition — two paths completing the same order at a live festival — is written up in full on our fintech page. It is the same lesson from the other end of the same product.",
      ],
    },
    stack: [
      { layer: "Platform", value: "Laravel — public booking, organiser and super-admin, REST API" },
      { layer: "Database", value: "MySQL, multi-organiser schema, instalment ledger" },
      { layer: "Payments", value: "Stripe — idempotency-keyed charges, webhook reconciliation, row-locked completion" },
      { layer: "Mobile", value: "React Native — offline-first check-in app and a customer app with push" },
    ],
    engagement: [
      { title: "Do the break-even first", body: "Owning the platform is not automatically cheaper. We will model your commission against a build before you commit, and tell you if the answer is no." },
      { title: "Model inventory and money", body: "Tiers, sale windows, instalments, comps and refunds decided up front — every one of them touches the ledger." },
      { title: "Ship the door app early", body: "It needs a real event to be trusted, so it gets built and tested well ahead of the one that matters." },
      { title: "Stay for the first season", body: "Live events surface things staging never will. We expect to be there for it." },
    ],
    faqs: [
      { question: "Is building cheaper than paying commission?", answer: "It depends entirely on your volume and ticket price, and we publish a break-even study on it. If the numbers say stay on the marketplace, that is what we will tell you." },
      { question: "Can it handle instalments?", answer: "Yes — with the ticket withheld until full settlement, which is the part most implementations get wrong." },
      { question: "What about free tickets?", answer: "Zero-value orders need the payment path overridden entirely rather than charged for zero. Sounds obvious; is a common source of broken checkouts." },
      { question: "Can multiple organisers use one platform?", answer: "Yes, that is the default architecture — new organisers onboard without engineering work." },
    ],
    services: ["product-engineering", "native-mobile", "commerce-content"],
    cta: "paying commission on every ticket you sell?",
  },

  /* ------------------------------------------------------------- health -- */
  {
    slug: "health-care",
    name: "health & care",
    headline: "patient apps, clinic systems and field-force tools where the data is somebody's health",
    metaTitle: "healthcare software development — patient apps, clinic systems and portals",
    metaDescription:
      "Healthcare and care software: subscription patient apps, clinic-scoped systems, consent portals and pharma field-force tools, built for privacy and real device conditions.",
    summary:
      "Subscription patient care across a clinic network, consent portals, and a pharma field-force app with odometer-based travel allowance.",
    stats: [
      { n: "18", label: "health engagements" },
      { n: "2", label: "apps, patient and clinic" },
      { n: "8 yrs", label: "on one clinical estate" },
      { n: "SIGSEGV", label: "diagnosed from native frames" },
    ],
    problem: {
      lede:
        "Health software fails in ways other software gets away with. A shared device that shows the previous user's notifications is not a UX bug, it is a privacy incident. A crash you cannot reproduce is not an annoyance when the app holds someone's appointment. And the person reviewing your data model needs to know the domain, not just the schema.",
      points: [
        "Devices get shared between staff and between shifts",
        "Consent and treatment records cross system boundaries",
        "Accessibility is a requirement, not a nice-to-have",
        "Crash reports point into the framework, not your code",
        "Clinic-scoped access has to be real, not implied by the UI",
      ],
    },
    built: [
      {
        title: "Subscription patient care",
        body: "A patient app and a separate clinic app on a shared API for a dental network — plans, family members, appointment booking and visit history for patients; appointment handling and history scoped to the clinic for staff.",
      },
      {
        title: "Consent and patient portals",
        body: "A patient portal handling treatment consent forms alongside a commerce site, plus a treatment guidance app — part of an eight-year, four-system estate for one clinical business.",
      },
      {
        title: "Pharma field force",
        body: "A medical representative app with punch-in and punch-out capturing an odometer photograph plus a manual reading, in and out kilometres recorded, and travel allowance calculated automatically for the day.",
      },
      {
        title: "Release discipline",
        body: "Crash reporting wired to a dedicated project, an over-the-air update channel so patches ship without a store round trip, and app version tracked via a header written to the customer record by middleware.",
      },
    ],
    hard: {
      title: "notifications that followed the device instead of the user",
      lede:
        "On a field-force app, notifications were read from device storage rather than from the server. A second user signing in on the same handset could see the previous user's notifications.",
      detail: [
        "On a field application where one device passes between staff, that is a data-privacy failure rather than a UX bug, and it was fixed by moving the read path to the server where identity is actually known.",
        "The other hard one was a fatal native crash — a SIGSEGV deep inside React Native's Fabric rendering pipeline during a shadow-tree commit, reproduced on a specific Android version and handset. Every frame in the report was native; none were application code.",
        "Diagnosing that meant reading the crash chain through the framework's own binding and commit layers and correctly concluding it was a framework or OS-level race, not an app bug — which changes the response from a rewrite to a mitigation and an upgrade path.",
        "Domain review matters as much as either. On a sports platform in the same portfolio, the system happily accepted a coach aged six; real coaching qualifications start at fourteen. That rule only surfaces when somebody who knows the field looks at the data.",
      ],
    },
    stack: [
      { layer: "Mobile", value: "React Native, with over-the-air updates and dedicated crash reporting" },
      { layer: "API", value: "Node.js, clinic-scoped access enforced server-side" },
      { layer: "Portals", value: "Patient-facing consent and records, separated from commerce surfaces" },
      { layer: "Operations", value: "Version tracking via request header, written to the record by middleware" },
    ],
    engagement: [
      { title: "Scope against real user stories", body: "Negotiated line by line with your clinical team, not inferred from a wireframe." },
      { title: "Decide what is not in the MVP", body: "On one build we deliberately excluded the public website to control cost, while designing the API to support it later. Saying no early is what keeps the budget honest." },
      { title: "Test on real devices", body: "Shared handsets, older Android versions, and the accessibility settings your users actually have switched on." },
      { title: "Ship patches without the store", body: "An over-the-air channel, configured before you need it rather than during an incident." },
    ],
    faqs: [
      { question: "Do you handle both patient and staff apps?", answer: "Yes, usually on a shared API — which is what keeps clinic-scoped access consistent between them." },
      { question: "What about accessibility?", answer: "It gets tested. Client testing on one build found text not responding to system text-size settings and dead-end empty states; both are the kind of thing that only shows up if somebody actually checks." },
      { question: "Can you work with our existing clinical systems?", answer: "Yes. Integration into existing records and scheduling is normal; we will be honest about which integrations are hard before you budget for them." },
      { question: "Is our data safe with an offshore team?", answer: "You own the repository, the cloud accounts and the keys from day one, and we scope access per engagement. Ask us for the security page — that is a practice here, not a checkbox." },
    ],
    services: ["native-mobile", "product-engineering", "rescue-hardening"],
    cta: "building something with patients on the other end?",
  },

  /* ----------------------------------------------- professional services -- */
  {
    slug: "professional-services",
    name: "property, legal & professional",
    headline: "lead engines and delivery platforms for firms that sell expertise",
    metaTitle: "software for law firms, property consultancies and professional services",
    metaDescription:
      "Due-diligence platforms, conversion-structured service sites and AI-assisted sales and delivery systems for law firms, property consultancies and consultancies.",
    summary:
      "A due-diligence report platform, wills and probate builds structured for conversion, and an AI-assisted platform running an entire commercial lifecycle.",
    stats: [
      { n: "18", label: "professional services projects" },
      { n: "4 yrs", label: "on one property platform" },
      { n: "£50", label: "smallest change we shipped" },
      { n: "AI", label: "with the fabrication removed" },
    ],
    problem: {
      lede:
        "Professional firms sell judgement, and their software usually gets in the way of demonstrating it. Reports are assembled by hand in Word. The website is a brochure that converts nothing. And the enquiry that arrives at 11pm goes into an inbox until Monday.",
      points: [
        "Reports assembled manually, inconsistently, and slowly",
        "Service pages that describe the firm rather than the client's problem",
        "High-consideration purchases with no structured journey",
        "Case assessment happening on the phone or not at all",
        "AI pilots that generate confident, generic, unusable output",
      ],
    },
    built: [
      {
        title: "A due-diligence report platform",
        body: "A Next.js application generating structured due-diligence reports for property developments, including a planning-applications module with multi-image upload — running and generating work four years on.",
      },
      {
        title: "Conversion-structured legal sites",
        body: "Wills, trusts and probate service pages built from Figma, each with banner, overview, why-it-matters, why-us, a journey timeline and FAQ — a conversion structure for a high-consideration legal purchase, not decoration.",
      },
      {
        title: "A separate claims lead engine",
        body: "A lead-generation microsite with a case-assessment form, a we-help-when section, how-it-works, benefits and a clear-costs split — deliberately distinct from the brand site.",
      },
      {
        title: "An AI sales and delivery platform",
        body: "The whole commercial lifecycle for a consultancy: public lead form, qualification, discovery call, AI-generated delivery brief, quoting, proposal, client portal, milestones, payments and support.",
      },
    ],
    hard: {
      title: "what an AI feature should do when it fails",
      lede:
        "The delivery platform originally fell back to hardcoded templates whenever an AI operation failed. Users saw system-generated content that looked real and was not derived from their client at all.",
      detail: [
        "We removed every fallback template. The direction was explicit: do not block the flow, leave the field blank, and let the user type the analysis themselves. Silent fabrication is worse than an empty field, especially in a profession that sells judgement.",
        "QA found the related failure: for a courier client needing job intake, location-based assignment and customer tracking, the AI generated onboarding, e-sign and a client portal. The rule became that briefs derive from the actual transcript, and unknown items are marked to-be-confirmed rather than invented.",
        "A third finding was a policy question rather than a bug — the system let a salesperson enter a client price far below the internal range for that tier, and neither blocked nor flagged it. We raised it as a decision for the business to make rather than silently adding a validation rule.",
        "None of this is AI scepticism. It is what it takes for an AI feature to be usable by professionals whose name is on the output.",
      ],
    },
    stack: [
      { layer: "Application", value: "Next.js on Vercel, with dual branding across internal and client-facing surfaces" },
      { layer: "AI", value: "Transcript to structured brief, configurable prompts, no fabricated fallbacks" },
      { layer: "Sites", value: "Figma-built service pages with a documented conversion structure" },
      { layer: "Delivery", value: "Client portal with milestones, reports, payments, messages and support history" },
    ],
    engagement: [
      { title: "Estimate per line", body: "Several of these firms send a list of requirements and get hours estimated against each one. Small, frequent, defensible — and it has kept one relationship running four years." },
      { title: "Structure the journey", body: "For high-consideration services the page architecture is the product decision. We build it as one." },
      { title: "Keep the AI honest", body: "Blank beats invented, every time. We will design the failure state before the happy path." },
      { title: "Separate brand from lead capture", body: "The firm's site and the campaign asset have different jobs. Trying to make one page do both is why neither converts." },
    ],
    faqs: [
      { question: "Can you work in small increments?", answer: "Yes. On one property client we have delivered individual functions quoted at fifty pounds inside days for four years. The value there is cadence, not invoice size." },
      { question: "Will an AI brief embarrass us in front of a client?", answer: "Not if it is built to leave gaps rather than fill them. That is a design decision we make up front, and it is the single most important one in a professional-services AI product." },
      { question: "Do you build from our designers' Figma?", answer: "Yes, and we will flag what is missing from it — including the legal pages that exist on your old site and not in the new design." },
      { question: "How do you handle changes outside the agreed design?", answer: "With a change-request quote and a conversation, not silent absorption and not a fight. We have done exactly that and kept the relationship." },
    ],
    services: ["product-engineering", "ai-systems", "commerce-content"],
    cta: "selling expertise through a brochure site?",
  },

  /* -------------------------------------------------------------- sport -- */
  {
    slug: "sport",
    name: "sport",
    headline: "analytics, player platforms and live video for clubs, leagues and grassroots",
    metaTitle: "sports technology development — analytics platforms and player apps",
    metaDescription:
      "Sports software: cricket analytics for a top-tier T20 franchise, a two-sided player and coach platform with video, tournament platforms and live streaming.",
    summary:
      "Cricket analytics for a top-tier T20 franchise, a two-sided player and coach platform with tiered video, and live tournament streaming.",
    stats: [
      { n: "3", label: "environments, fully separated" },
      { n: "2", label: "sided: players and coaches" },
      { n: "2021", label: "live video, since" },
      { n: "14", label: "the age a coach can be" },
    ],
    problem: {
      lede:
        "Sport products have two properties that catch generic teams out: the video is the dominant unit cost, and the domain rules are invisible to anyone who does not know the game. Get either wrong and you ship something that either loses money per user or is obviously written by someone who has never been to a club.",
      points: [
        "Video transcoding and delivery cost more than everything else combined",
        "Two-sided platforms need trust on both sides before either shows up",
        "Age, qualification and eligibility rules are specific and unforgiving",
        "Analytics platforms carry real competitive value and real access control",
        "Live streaming is the hardest thing on the roadmap, always",
      ],
    },
    built: [
      {
        title: "Cricket analytics for a top-tier franchise",
        body: "An analytics platform with three fully separated environments — development, staging and production, each with its own configuration and super-admin credentials — built inside the client's own GitHub organisation with CI secrets configured to match.",
      },
      {
        title: "A two-sided player platform",
        body: "Players build verifiable profiles with video; coaches are listed, filtered and discovered. Subscription tiers tied to upload limits, a profile switcher for multiple identities, and document verification by country and type.",
      },
      {
        title: "Tournament platforms with live video",
        body: "A cricket tournament platform with live video integration in 2021, four years before the franchise engagement — plus a second tournament product in the same thread.",
      },
      {
        title: "Cost modelled before pricing",
        body: "Per-minute video transcoding cost was modelled before subscription tiers were set, because on a video product the unit economics decide the price list rather than the other way round.",
      },
    ],
    hard: {
      title: "the empty state that quietly lied to users",
      lede:
        "Age-filtered video search fell back to randomised results when nothing matched the requested band. No error, no message — just other people's videos presented as if they were the answer.",
      detail: [
        "Our own review flagged it as a trust problem rather than a bug. Showing a user content they did not ask for, with no signal, erodes confidence in every other result the product returns.",
        "The fix was an explicit \"no video in this range\" banner plus a separate, clearly labelled recommendations block — the honest version of the same helpful instinct.",
        "The domain rules needed the same treatment. The platform accepted a coach record with age six; real coaching qualifications start at fourteen for community modules and sixteen for grassroots courses. Validation went in at three layers: API on create, API on filter, and a matching front-end error state.",
        "And verification needed real adversarial testing. A document check for a German driving licence accepted an Aadhaar card, which is how country and document type stopped being free text and became validated inputs.",
      ],
    },
    stack: [
      { layer: "Web", value: "Next.js App Router, React Query for server state, shadcn/ui" },
      { layer: "Mobile", value: "React Native companion app on the same API" },
      { layer: "Video", value: "Mux for transcoding and delivery, tiered against upload limits" },
      { layer: "Live", value: "Real-time video integration for tournament streaming" },
      { layer: "Infrastructure", value: "AWS Amplify with SendGrid and SES; three separated environments" },
    ],
    engagement: [
      { title: "Model the video cost first", body: "Before tiers, before pricing, before design. On a video product everything else is downstream of it." },
      { title: "Get a domain review", body: "Someone who knows the sport reads the data model. That is how the age rules were caught rather than shipped." },
      { title: "Separate the environments", body: "Development, staging and production with their own configuration and credentials. On a club platform, that is table stakes." },
      { title: "Test verification adversarially", body: "Upload the wrong document on purpose. It is the only way to find out that the check passes it." },
    ],
    faqs: [
      { question: "Can you do live video?", answer: "Yes — we integrated live streaming on a cricket tournament product in 2021 and have carried it forward since." },
      { question: "How do you keep video costs under control?", answer: "By modelling cost per minute against your tier structure before the tiers are set, and by making upload limits a product decision rather than an afterthought." },
      { question: "Can you work inside our own GitHub org?", answer: "Yes, and we frequently do — including requesting the access needed to configure CI variables and secrets properly rather than working around them." },
      { question: "Do you handle player verification?", answer: "Yes, including KYC-style document checks by country and document type, tested against deliberately mismatched documents." },
    ],
    services: ["product-engineering", "native-mobile", "ai-systems"],
    cta: "building something for a club, league or grassroots?",
  },

  /* --------------------------------------------------- india mid-market -- */
  {
    slug: "tally-zoho-india",
    name: "Tally & Zoho integration",
    headline: "connecting modern software to the tally installation you actually run your business on",
    metaTitle: "Tally & Zoho integration — TDL development and cloud accounting sync",
    metaDescription:
      "Tally TDL extension development and Zoho Books, CRM and Inventory integration for Indian businesses — connect modern software to the system you already run on.",
    summary:
      "TDL extensions inside Tally, Zoho Books as a live catalogue, Zoho CRM sync — the integration work most development shops will not touch.",
    stats: [
      { n: "TDL", label: "extensions, written" },
      { n: "3", label: "Zoho products integrated" },
      { n: "GST", label: "handled properly" },
      { n: "scarce", label: "and we do it" },
    ],
    problem: {
      lede:
        "Tally runs the accounts of an enormous share of Indian businesses, and almost nobody building modern software will go near it. So the cloud tool gets bought, the data gets re-keyed by hand, and within six months the two systems disagree about what was invoiced.",
      points: [
        "Invoices raised in one system, re-keyed into another by hand",
        "Cloud accounting and the desktop ledger drifting apart",
        "Catalogue, pricing and GST maintained in two places",
        "Nobody will quote for TDL work",
        "CRM sync that breaks silently and is discovered on demo morning",
      ],
    },
    built: [
      {
        title: "TDL extensions inside Tally",
        body: "A Tally Definition Language extension adding a custom menu option and a fetch button, pulling cloud invoices for a chosen date range and creating the matching invoices inside Tally.",
      },
      {
        title: "Zoho Books as a live catalogue",
        body: "A B2B ordering app sourcing items, pricing, price lists and customer records directly from Zoho Books — with GST-inclusive pricing end to end and category hierarchy driven by a Zoho custom field.",
      },
      {
        title: "Zoho CRM sync on a schedule",
        body: "A Next.js dashboard with sync running through scheduled workflows, webhook subscription to Zoho notifications and an automated re-subscription endpoint so the hook renews itself.",
      },
      {
        title: "Zoho for internal operations",
        body: "Account statement integration inside a field-force app, and Zoho Books as the customer ledger behind the reporting the business actually runs on.",
      },
    ],
    hard: {
      title: "credentials do not belong in a file that gets emailed to your accountant",
      lede:
        "The original plan for the Tally integration embedded the cloud accounting credentials directly inside the TDL file. We flagged it and changed it.",
      detail: [
        "A TDL is a text-based extension file. It gets copied between machines, shared with accountants, restored from backups and passed to whoever sets up the next terminal. Embedding API credentials in one distributes them to everyone who ever touches that Tally installation.",
        "That judgement is the reason to hire someone who has done this before. The integration itself is not conceptually hard; the environment it runs in is unlike anything a web developer normally reasons about.",
        "The second recurring failure is token lifetime. A Zoho CRM sync broke with a scope mismatch because the refresh token had expired, and recovery was a seven-step manual procedure — new grant token, exchanged within minutes, refresh token extracted, updated in two separate secret stores, redeploy triggered, then three workflows run in order to verify.",
        "We wrote that procedure down and shared it. But the design lesson underneath is the real deliverable: the same secret living in two places with a manual refresh path is a scheduled outage, and it surfaced on the morning of a client demo.",
      ],
    },
    stack: [
      { layer: "Tally", value: "TDL extensions — custom menus, fetch actions, invoice creation" },
      { layer: "Zoho", value: "Books, CRM and Inventory via OAuth with a documented scope set" },
      { layer: "Sync", value: "Scheduled workflows, webhook subscription and automated renewal" },
      { layer: "Front end", value: "Next.js dashboards deployed on Vercel" },
    ],
    engagement: [
      { title: "Agree the direction of truth", body: "Which system wins when they disagree. Answer that first and most of the integration design follows from it." },
      { title: "Handle secrets once", body: "One store, one rotation path, documented. Not two copies and a memory of what to do." },
      { title: "Build the reconciliation view", body: "A sync you cannot inspect is a sync you will not trust. Somebody needs to be able to see what moved and what did not." },
      { title: "Write the runbook", body: "Token expiry, re-subscription, manual re-run. Written down before it is needed, not discovered during a demo." },
    ],
    faqs: [
      { question: "Do you actually write TDL?", answer: "Yes. It is a genuinely scarce skill and most modern development shops will not touch it, which is precisely why it is worth us doing." },
      { question: "Can you sync Zoho Books with our app?", answer: "Yes — items, pricing, price lists, customers and invoices, with GST handled properly rather than recalculated in a second place." },
      { question: "Our Zoho sync keeps breaking. Can you fix it?", answer: "Usually it is token lifetime and secrets stored in two places. That is a design fix, not a patch, and we have written the recovery procedure for it before." },
      { question: "Do we have to leave Tally?", answer: "No. The entire proposition here is that you should not have to." },
    ],
    services: ["product-engineering", "rescue-hardening", "ai-systems"],
    cta: "re-keying invoices by hand?",
  },
];

export function sectorBySlug(slug: string): SectorData | null {
  return SECTORS_DATA.find((s) => s.slug === slug) ?? null;
}
