export type ServiceData = {
  slug: string;
  /** lowercase display title, e.g. "product platforms" (abbreviations kept
   *  uppercase at render time by <ServiceTitle>). */
  title: string;
  /** one-line summary — homepage card, nav mega-menu, services index. */
  summary: string;
  headline: string;
  description: string;
  whyTitle: string;
  whyDescription: string;
  whyPoints: string[];
  whyQuote: string;
  processTitle: string;
  processSteps: { title: string; description: string }[];
  benefitsTitle: string;
  benefits: { title: string; description: string }[];
  benefitsQuote?: string;
  whoTitle: string;
  whoPoints: string[];
  faqs: { question: string; answer: string }[];
  finalTitle: string;
  finalDescription: string;
  /**
   * Three delivered examples, drawn from the project register. Clients are named
   * only where they are already public on this site; everything else is by
   * sector and geography, because a large share of the work is white-label.
   */
  proofPoints?: { where: string; what: string }[];
};

export const SERVICES_DATA: ServiceData[] = [
  {
    slug: "product-platforms",
    title: "product platforms",
    summary:
      "Multi-tenant SaaS, marketplaces, ticketing and booking engines — the systems your business actually runs on, built to survive their own success.",
    headline: "the multi-tenant systems your business runs on, built to survive their own success.",
    description:
      "Multi-tenant SaaS, marketplaces, ticketing and booking engines — the operational core your business runs on, engineered to scale.",
    whyTitle: "software that is the business, not a brochure for it",
    whyDescription:
      "A product platform is the system your revenue passes through — accounts, roles, billing and the operator tools your team lives in all day. When it is slow, insecure or impossible to change, growth is what breaks it. We build the core so that success is not the thing that takes it down.",
    whyPoints: [
      "Multi-tenant SaaS with real isolation",
      "Marketplaces with a trust and payments layer",
      "Ticketing and booking engines",
      "Operator dashboards and internal tooling",
      "Role-based access and audit trails",
      "Usage-based and subscription billing",
    ],
    whyQuote: "The platform is the product. Everything else is a page about it.",
    processTitle: "how we build a platform",
    processSteps: [
      { title: "Data model first", description: "The tenants, roles, money and edge cases decided on paper before code. This is where platforms are quietly won or lost." },
      { title: "Core and access", description: "Auth, permissions, billing and the operator surface — the parts every future feature will lean on for years." },
      { title: "Build in the open", description: "Your repo, your infrastructure, weekly demos on a real environment. No black box, no big reveal at the end." },
      { title: "Scale and harden", description: "Load paths, indexes, backups and monitoring set before the traffic arrives, not after it hurts." },
    ],
    benefitsTitle: "what you get",
    benefits: [
      { title: "Multi-tenant architecture", description: "Isolated, secure tenants with sane defaults and no noisy-neighbour surprises." },
      { title: "Billing that reconciles", description: "Plans, tiers, usage metering and Stripe orchestration wired to your ledger, so the numbers always agree." },
      { title: "Operator tooling", description: "The admin surface your team runs the business from, treated as a first-class product." },
      { title: "Roles and audit", description: "Granular permissions and an audit trail you can hand to a security review." },
      { title: "An API others can build on", description: "REST or GraphQL, documented and versioned, so integrations do not become emergencies." },
      { title: "Room to grow", description: "Indexing, caching and queue design that hold up at the volume you are aiming for." },
    ],
    benefitsQuote: "Built so the day you succeed is not the day it falls over.",
    whoTitle: "when this is the right call",
    whoPoints: [
      "You are outgrowing spreadsheets, Airtable or a no-code tool",
      "Off-the-shelf SaaS cannot model how you actually work",
      "You run a marketplace, ticketing or booking business",
      "You need multi-tenant isolation and real roles",
      "Your current platform cannot keep up with growth",
    ],
    faqs: [
      { question: "Do you build on our existing stack or start fresh?", answer: "Both. We extend what works and rebuild only the parts holding you back — decided in the architecture phase, not assumed." },
      { question: "Can you do multi-tenant with strict data isolation?", answer: "Yes. Row-level or schema-level isolation depending on your compliance needs, designed in from the first commit." },
      { question: "What do you build with?", answer: "Typically Next.js or Laravel with PostgreSQL, on infrastructure you own. We choose for maintainability, not novelty." },
      { question: "How do you handle billing?", answer: "Stripe-orchestrated subscriptions, usage metering and instalments, reconciled against your own records so the figures match." },
      { question: "How long does a platform build take?", answer: "A focused MVP in 8 to 12 weeks; a full platform typically 12 to 20, depending on scope." },
    ],
    finalTitle: "build the system your business runs on",
    finalDescription:
      "The core platform is the one thing worth getting right. Let's scope it properly, name the risky parts up front, and build something that holds up as you grow.",
    proofPoints: [
      { where: "Ontick — UK event ticketing", what: "A multi-organiser platform with per-tier inventory, instalment billing and two native apps, processing over two million pounds since launch." },
      { where: "A UK commercial energy broker", what: "A full brokerage ERP — supplier tendering, contract lifecycle and brokerage accounting — with eleven per-supplier invoice extraction pipelines behind it." },
      { where: "A UK property consultancy", what: "A due-diligence report platform still generating work four years on, extended in increments as small as a single quoted function." },
    ]
  },
  {
    slug: "native-mobile",
    title: "native mobile",
    summary:
      "React Native apps that ship past App Store review and stay shipped — offline-first paths, push, real-time sync and over-the-air updates.",
    headline: "react native apps that ship past app store review, and stay shipped.",
    description:
      "Production React Native apps for iOS and Android — offline-first, push, real-time sync and over-the-air updates, built to pass review and survive real use.",
    whyTitle: "a real app, not a website in a wrapper",
    whyDescription:
      "Users can tell the difference between a native app and a web page inside a shell — and so can App Store review. Real mobile work means the offline path, the push pipeline, the sync conflicts and the device integrations, all handled properly. We build apps that get approved the first time and keep working when the network does not.",
    whyPoints: [
      "Consumer and social apps",
      "SaaS companion apps",
      "Marketplace and booking apps",
      "Internal and field-team apps",
      "Real-time and location-aware apps",
      "AI-powered mobile tools",
    ],
    whyQuote: "Your app should feel native, because it is.",
    processTitle: "how we ship a mobile app",
    processSteps: [
      { title: "Architecture for mobile", description: "Navigation, state, offline storage and the sync model decided before the first screen is built." },
      { title: "Build and integrate", description: "Clean React Native, native modules where they earn their place, and your backend wired in properly." },
      { title: "Review-ready", description: "Permissions, privacy, entitlements and the store listing prepared so approval is not a gamble." },
      { title: "Ship and iterate", description: "Over-the-air updates, crash reporting and analytics, so you fix and improve without a two-week review each time." },
    ],
    benefitsTitle: "what we deliver",
    benefits: [
      { title: "iOS and Android from one codebase", description: "React Native done properly, with native modules where the experience genuinely demands it." },
      { title: "Offline-first", description: "The app works on a train, in a lift, on hotel wifi — and reconciles cleanly when it reconnects." },
      { title: "Push that arrives", description: "APNs and FCM wired end to end, segmented and reliable, not fire-and-forget." },
      { title: "Real-time sync", description: "Live data, chat and tracking that stay consistent across devices." },
      { title: "Over-the-air updates", description: "Ship fixes and features in hours with EAS or CodePush, not another review cycle." },
      { title: "App Store launch", description: "Signing, entitlements, listing and the review process handled — including rejections, if they come." },
    ],
    benefitsQuote: "Approved the first time, and still working after the launch spike.",
    whoTitle: "when this is the right call",
    whoPoints: [
      "You need a real iOS and Android app, not a wrapped site",
      "Your web app needs a proper mobile companion",
      "You have been rejected from the App Store and need it fixed",
      "You need offline, push or real-time to actually work",
      "You want to ship updates without waiting on review",
    ],
    faqs: [
      { question: "React Native or fully native?", answer: "React Native for most products — one codebase, native modules where it matters. We will tell you when a fully native build is genuinely the better call." },
      { question: "Can you rescue an app stuck in App Store rejection?", answer: "Yes. We diagnose the rejection reason, fix the underlying issue and manage resubmission." },
      { question: "Do you handle the backend too?", answer: "Yes — we connect to your existing API or build the backend, sync layer and push infrastructure." },
      { question: "Can you do over-the-air updates?", answer: "Yes, via EAS Update or CodePush, within the platforms' rules, so most changes ship without a new review." },
      { question: "How long does a native build take?", answer: "Typically 6 to 14 weeks depending on offline, real-time and integration complexity." },
    ],
    finalTitle: "ship an app that gets approved and stays shipped",
    finalDescription:
      "Mobile is where your users already are. Let's build an app that passes review, works offline, and keeps improving without a fight.",
    proofPoints: [
      { where: "A Telangana dental network", what: "Patient and clinic apps on a shared API, with over-the-air updates and app version tracked via a request header written to the customer record by middleware." },
      { where: "An Indian pharma field force", what: "Punch-in and punch-out capturing an odometer photograph plus a manual reading, with travel allowance calculated automatically for the day." },
      { where: "Store rejections, resolved", what: "A person-to-person payments exemption argued rather than conceded, a missing camera permission description on a scanner, and an over-declared background-audio capability on a learning app." },
    ]
  },
  {
    slug: "ai-systems",
    title: "AI systems",
    summary:
      "Retrieval pipelines, support deflection and internal copilots — costed per token before a line is written, so the unit economics work at volume.",
    headline: "ai features costed per token before a line is written, so the unit economics survive scale.",
    description:
      "Retrieval pipelines, support deflection and internal copilots — designed for accuracy and costed per token up front, so the economics still work at volume.",
    whyTitle: "ai that works at volume, not just in the demo",
    whyDescription:
      "An AI feature that dazzles in a demo can quietly lose money on every request once real users arrive. We design retrieval, prompts and model routing for accuracy and cost together — and we put a number on the unit economics before you commit engineering to it.",
    whyPoints: [
      "Retrieval-augmented generation over your own data",
      "Support deflection and AI help desks",
      "Internal copilots and assistants",
      "Document and workflow automation",
      "Semantic search and recommendations",
      "Evaluation and guardrail pipelines",
    ],
    whyQuote: "We put the cost per request on the table before the first line is written.",
    processTitle: "how we build an ai feature",
    processSteps: [
      { title: "Model the economics", description: "Token cost, latency and accuracy targets estimated per request before we build, so the feature is viable by design." },
      { title: "Retrieval and grounding", description: "Your data chunked, embedded and retrieved so answers are grounded and traceable, not confidently wrong." },
      { title: "Evaluate and guard", description: "An eval set, guardrails and fallbacks, so quality is measured rather than hoped for." },
      { title: "Ship and watch", description: "Deployed with cost, latency and quality monitoring, and a routing layer to tune spend as you scale." },
    ],
    benefitsTitle: "what we deliver",
    benefits: [
      { title: "Retrieval pipelines", description: "Grounded RAG over your documents, with citations and a retrieval layer you can trust." },
      { title: "Support deflection", description: "An assistant that resolves the repetitive tickets and hands the rest to a human cleanly." },
      { title: "Internal copilots", description: "Assistants wired to your systems that save your team the search-and-copy busywork." },
      { title: "Token economics up front", description: "A costed estimate per request, and model routing to keep it there at volume." },
      { title: "Evals and guardrails", description: "A measurable quality bar, so “it feels better” becomes a number you can defend." },
      { title: "Production monitoring", description: "Cost, latency, drift and quality tracked in production, not discovered on the bill." },
    ],
    benefitsQuote: "The demo is easy. We build the version that is still profitable at ten thousand requests a day.",
    whoTitle: "when this is the right call",
    whoPoints: [
      "You want an AI feature that holds up under real traffic",
      "Support volume is outgrowing your team",
      "Your team wastes hours searching internal knowledge",
      "You need answers grounded in your own data",
      "You have been burned by AI costs that ran away at scale",
    ],
    faqs: [
      { question: "Which models do you use?", answer: "Whatever fits the job and the budget — we route between frontier and smaller models rather than paying frontier prices for every request, defaulting to the latest Claude models where accuracy matters most." },
      { question: "How do you stop it making things up?", answer: "Retrieval grounding, citations, guardrails and an eval set that catches regressions before your users do." },
      { question: "Can you put a real number on the running cost?", answer: "Yes. Estimating cost per request up front is the first thing we do — before any build commitment." },
      { question: "Do you work with our existing data and tools?", answer: "Yes — we build retrieval over your documents and wire copilots into the systems your team already uses." },
      { question: "How long to ship an AI feature?", answer: "A grounded pilot in 3 to 6 weeks; a production, monitored system typically 8 to 12." },
    ],
    finalTitle: "ship ai that still makes sense at scale",
    finalDescription:
      "AI features are easy to prototype and easy to lose money on. Let's design one that is accurate, grounded and costed before it ships to everyone.",
    proofPoints: [
      { where: "A UK consultancy", what: "An AI-assisted sales and delivery platform — transcript to delivery brief to quote to client portal — with every hardcoded fallback template removed so a failed generation leaves a blank field rather than fabricated analysis." },
      { where: "A UK agency", what: "An SEO and GEO content operations platform with a quality-check gate that caught a real issue during its own test run, and three data providers coded in parallel so the client choice never blocked the build." },
      { where: "An education consultancy", what: "A counselling intelligence design with tiered model routing from the start — cheap models for transcript cleanup, expensive ones only for the recommendation — and admin edits fed back as training signal." },
    ]
  },
  {
    slug: "rescue-hardening",
    title: "rescue & security",
    summary:
      "AI-generated prototypes and stalled builds taken to production, and compromised live systems recovered — audited first, stabilised second, then finished and hardened properly.",
    headline: "stalled builds finished, compromised systems recovered — both taken to production and made safe.",
    description:
      "AI-generated prototypes and stalled builds finished for production, and live systems recovered from compromise — audited first, stabilised second, then hardened so it holds and does not happen twice.",
    whyTitle: "finish what stalled, recover what broke, harden both",
    whyDescription:
      "AI builders like Lovable, v0, Replit and Base44 get you a working prototype fast; turning that into something you can put real users and real money through is a different job — security, data integrity, the edge cases and the architecture the generator skipped. A live system under attack is the same instinct in reverse: a card skimmer that leaves every order completing normally, a webshell that survives a surface clean. Same team, either way — audit what is really there, close the risks first, then finish or harden it properly.",
    whyPoints: [
      "AI-generated apps from Lovable, v0, Replit, Base44, Bolt, Cursor",
      "Stalled builds from a previous team",
      "Prototypes that need to become products",
      "Compromise recovery, malware and webshell removal",
      "Card-skimming and checkout integrity",
      "Security and data-integrity risks, closed",
      "A pre-raise or pre-acquisition audit",
    ],
    whyQuote: "Audit first, stabilise second, finish it properly. In that order, every time.",
    processTitle: "how a rescue or an incident runs",
    processSteps: [
      { title: "Audit / triage", description: "A clear-eyed read of the code, the data model and — if it is live — what is actually running on it. You get the findings whether or not you continue with us." },
      { title: "Contain & stabilise", description: "The security holes, data-integrity bugs and worst fragility closed first. If something is actively wrong, the bleeding is stopped before anything else." },
      { title: "Finish & clean", description: "The missing features and real error handling built in; every injected file, database row and scheduled task removed, with evidence of what was found." },
      { title: "Harden", description: "Tests, monitoring, backups, access and WAF set so neither the fragility nor the same class of attack can land again." },
    ],
    benefitsTitle: "what we deliver",
    benefits: [
      { title: "An audit you can act on", description: "What is safe, what is not, and what it would take to fix — in plain language." },
      { title: "Security and data integrity first", description: "The vulnerabilities and silent data bugs that AI generators and tired estates routinely miss, closed." },
      { title: "The way in, closed", description: "Not just the visible payload or the missing feature — the entry point and the architecture behind it, so it does not recur next month." },
      { title: "The missing twenty percent", description: "Auth edge cases, error states and the flows the prototype only pretended to handle." },
      { title: "Evidence, in writing", description: "What was found, where it came from, what changed — the document your processor, insurer or board needs." },
      { title: "Production infrastructure", description: "CI/CD, monitoring, and backups you have actually restored — not a deploy that needs a prayer." },
    ],
    benefitsQuote: "Audit, contain, finish, harden — in that order. Skip the audit and you are booking the next incident.",
    whoTitle: "when this is the right call",
    whoPoints: [
      "You built a prototype with an AI tool and need it production-ready",
      "A previous team left you a stalled or fragile build",
      "Your host, processor or a customer says you are compromised",
      "You inherited an estate and have no idea what state it is in",
      "You need an honest audit before a raise, sale or enterprise deal",
    ],
    faqs: [
      { question: "Which AI-built codebases do you work with?", answer: "Lovable, v0, Replit, Base44, Bolt, Cursor-generated projects and hand-rolled prototypes alike." },
      { question: "Do I have to commit before the audit?", answer: "No. The audit stands on its own — you get the findings and a plan whether or not you continue." },
      { question: "Can you fix an app or site that is already live?", answer: "Yes. We stabilise, and if it is compromised we contain live systems carefully — closing the worst risks first without taking you offline." },
      { question: "Will you find how they got in, or just clean it?", answer: "Both, and the second matters more. Cleaning a site without closing the entry point buys you a few weeks, not a fix." },
      { question: "How long does it take?", answer: "An audit in days; stabilisation, finishing or full remediation typically 4 to 12 weeks depending on the state of things." },
    ],
    finalTitle: "get it shipped, or get it safe — properly",
    finalDescription:
      "Whether it is a prototype that needs finishing or a live system that needs recovering, the first step is an honest audit. Let's find the real state, close the risks, and build something you can put users and money through.",
    proofPoints: [
      { where: "A European WooCommerce store", what: "A payment-card skimmer found and removed. The transaction still completed and the customer still got their order, which is exactly why nothing in the store's own reporting looked wrong." },
      { where: "A UK caravan servicing business", what: "A live schema migration from one-vehicle-per-customer to many, across roughly fifty files, using an observer-synced mirror so nothing broke and no freeze was needed." },
      { where: "Two live UK sites", what: "Webshells discovered and remediated — the persistence layer, not just the visible payload, so the way back in was closed too." },
    ]
  },
  {
    slug: "commerce-content",
    title: "commerce & content",
    summary:
      "Headless WordPress, Shopify and custom checkouts wired to whatever proprietary API the business already depends on.",
    headline: "headless storefronts and custom checkouts, wired to the api your business already runs on.",
    description:
      "Headless WordPress and Shopify, custom checkouts and content platforms — wired to the proprietary systems and APIs your business already depends on.",
    whyTitle: "own the checkout, own the content, own the api it runs on",
    whyDescription:
      "Commerce and content stop being simple the moment your business has its own pricing rules, its own booking API or a catalogue that will not fit a template. We build headless storefronts and custom checkouts on top of whatever proprietary system you already depend on — fast, editable, and yours.",
    whyPoints: [
      "Headless WordPress and Sanity front-ends",
      "Shopify and Shopify Plus builds",
      "Custom checkouts against a proprietary API",
      "Subscriptions, memberships and instalments",
      "Content platforms and publishing workflows",
      "Migrations and re-platforming",
    ],
    whyQuote: "The template ends where your business rules begin. That is where we start.",
    processTitle: "how we build commerce",
    processSteps: [
      { title: "Map the commerce logic", description: "Pricing, tax, inventory and the booking or fulfilment API modelled before anything is built." },
      { title: "Headless front-end", description: "A fast, editable storefront on Next.js, decoupled from the CMS or commerce backend." },
      { title: "Checkout that converts", description: "A custom checkout wired to your payment and business logic, measured on completion, not clicks." },
      { title: "Launch and measure", description: "Migrated cleanly, indexed properly, and instrumented so you can see what actually sells." },
    ],
    benefitsTitle: "what we deliver",
    benefits: [
      { title: "Headless storefronts", description: "WordPress or Shopify as the backend, a fast Next.js front-end your editors still control." },
      { title: "Custom checkouts", description: "Checkouts wired to your own pricing, booking or fulfilment API — not a plugin's idea of it." },
      { title: "Subscriptions and memberships", description: "Recurring billing, instalments and gated content that reconcile against your records." },
      { title: "Content editors own", description: "Publishing workflows your marketing team can run without a developer in the loop." },
      { title: "Clean migrations", description: "Re-platforming and content migration with redirects and rankings preserved." },
      { title: "Built to be found", description: "Server-rendered, fast and structured so the catalogue actually indexes." },
    ],
    benefitsQuote: "Headless where it helps, boring where it should be, custom exactly where your business is.",
    whoTitle: "when this is the right call",
    whoPoints: [
      "Your pricing or booking logic will not fit a template",
      "You need a headless front-end on WordPress or Shopify",
      "Your checkout has to talk to a proprietary API",
      "You sell subscriptions, memberships or instalments",
      "You are re-platforming and cannot afford to lose rankings",
    ],
    faqs: [
      { question: "Headless WordPress, Shopify, or something custom?", answer: "Whichever fits. WordPress or Sanity for content-heavy sites, Shopify for standard commerce, custom when your logic genuinely needs it — decided on the facts, not a preference." },
      { question: "Can the checkout talk to our own booking or pricing API?", answer: "Yes — custom checkouts wired to proprietary APIs are a core part of what we do." },
      { question: "Will my marketing team still be able to edit the site?", answer: "Yes. Headless does not mean developer-only; editors keep a proper CMS behind the fast front-end." },
      { question: "Can you migrate us without losing SEO?", answer: "Yes — migrations include redirect mapping and rank preservation as a first-class concern, not an afterthought." },
      { question: "How long does a commerce build take?", answer: "A headless storefront in 5 to 10 weeks; a custom checkout and re-platform typically 8 to 16." },
    ],
    finalTitle: "own the storefront and the checkout",
    finalDescription:
      "Templates are fine until your business is not a template. Let's build commerce and content on top of the systems you already run.",
    proofPoints: [
      { where: "Yippee Malta — tour operator", what: "A multilingual rebuild with a custom checkout against a proprietary booking API, and every existing affiliate URL preserved through the migration because that is where the bookings come from." },
      { where: "A Paris membership publication", what: "A live WooCommerce Subscriptions migration with two parallel plan types, store credit and a fixed cutover date, shipped as must-use plugins so billing code cannot be deactivated by an admin." },
      { where: "A UK watersports retailer", what: "Magento to Shopify with redirects designed to preserve search equity, plus shortcodes that let editors drop live products into blog posts without touching either admin." },
    ]
  },
  {
    slug: "performance-search",
    title: "performance & search",
    summary:
      "Core Web Vitals, JavaScript SEO and indexing work for teams whose growth is gated on being found.",
    headline: "core web vitals, javascript seo and indexing work for teams whose growth is gated on being found.",
    description:
      "Core Web Vitals, JavaScript SEO and technical indexing work for teams whose growth depends on being found — measured, not guessed.",
    whyTitle: "when growth is gated on being found, and fast",
    whyDescription:
      "For a lot of businesses, the ceiling on growth is not the product — it is that the pages are slow, or that Google cannot see the content behind the JavaScript. We do the technical work that moves Core Web Vitals and gets pages indexed, measured against real numbers rather than opinions.",
    whyPoints: [
      "Core Web Vitals remediation",
      "JavaScript SEO and rendering fixes",
      "Indexing and crawl-budget work",
      "Programmatic and template-scale SEO",
      "Schema and structured data",
      "Migration SEO and rank preservation",
    ],
    whyQuote: "We publish the numbers, not the opinions. Your rankings deserve the same.",
    processTitle: "how we fix performance and search",
    processSteps: [
      { title: "Measure honestly", description: "Field data, lab data and crawl logs — the actual state, before anyone promises an improvement." },
      { title: "Fix the rendering", description: "SSR, hydration and the JavaScript SEO issues that keep content out of the index." },
      { title: "Fix the vitals", description: "LCP, CLS and INP taken to green with changes tied to numbers, not guesses." },
      { title: "Index and hold", description: "Structured data, crawl-budget and monitoring so the gains stick after we leave." },
    ],
    benefitsTitle: "what we deliver",
    benefits: [
      { title: "Core Web Vitals to green", description: "LCP, INP and CLS fixed at the source, verified in field data — not a lab-only score." },
      { title: "JavaScript SEO", description: "Rendering and hydration fixed so Google sees the content, not an empty shell." },
      { title: "Indexing that sticks", description: "Crawl-budget, sitemaps and the technical reasons pages fall out of the index, addressed." },
      { title: "Programmatic SEO", description: "Template-scale pages that are fast, unique enough to index, and built to last." },
      { title: "Structured data", description: "Schema that earns rich results without tripping a manual action." },
      { title: "Migration without loss", description: "Re-platforms and redesigns shipped with rankings intact." },
    ],
    benefitsQuote: "Measured against real numbers, because that is the only kind that pays rent.",
    whoTitle: "when this is the right call",
    whoPoints: [
      "Your growth is capped by slow pages or poor indexing",
      "Google cannot see content rendered by JavaScript",
      "Core Web Vitals are red and nobody has owned the fix",
      "You are scaling content and need it to actually index",
      "You are migrating and cannot afford to lose rankings",
    ],
    faqs: [
      { question: "Is this SEO content writing?", answer: "No — this is the technical side: performance, rendering, indexing and structured data. We make the site fast and crawlable; the words are yours." },
      { question: "Can you fix Core Web Vitals on a framework we already use?", answer: "Yes — Next.js, WordPress, Shopify or custom. We fix the vitals at the source rather than papering over them." },
      { question: "Why are my JavaScript pages not ranking?", answer: "Usually a rendering problem — Google receives an empty shell. We diagnose it and move you to SSR or proper rendering." },
      { question: "Do you do programmatic SEO?", answer: "Yes — template-scale pages engineered to be fast, distinct enough to index, and maintainable." },
      { question: "How do you prove it worked?", answer: "Field-data Core Web Vitals, indexing coverage and rankings, tracked before and after. Numbers, not adjectives." },
    ],
    finalTitle: "make the site fast enough and visible enough to grow",
    finalDescription:
      "If being found is the constraint on growth, the fix is technical. Let's measure the real state, fix the vitals and the indexing, and prove it in the numbers.",
    proofPoints: [
      { where: "A group of TEFL businesses", what: "Roughly nine thousand lines of static country-guide content retired into editable CMS records behind a custom REST namespace — the marketing team now ships without a deploy." },
      { where: "A UK therapy practice", what: "LocalBusiness and ProfessionalService schema across location pages, validated against the live page source. The client caught a rollout we had missed on two of three pages, and evidence-with-every-fix became standing process." },
      { where: "A UK ticketing platform", what: "A one-line change taking page load from twenty seconds to three. Worth showing precisely because the value was in the diagnosis, not the diff." },
    ]
  },
];

/**
 * Legacy service slugs referenced across the blog and older pages, mapped to
 * the six canonical services. Consumed by app/services/[slug]/page.tsx so those
 * inbound links resolve with a permanent redirect instead of 404ing.
 */
export const LEGACY_SERVICE_REDIRECTS: Record<string, string> = {
  // → product platforms
  "saas-web-app-development": "product-platforms",
  "api-and-integration": "product-platforms",
  "supabase-development": "product-platforms",
  "laravel-development": "product-platforms",
  "internal-tools-admin-dashboards": "product-platforms",
  "startup-launch-support": "product-platforms",
  "white-label-development": "product-platforms",
  "lms-development": "product-platforms",
  "b2b-marketplace-development": "product-platforms",
  "vue-nuxt-development": "product-platforms",
  "event-ticketing-platform-development": "product-platforms",
  "python-django-api-development": "product-platforms",
  // → native mobile
  "react-native-app-development": "native-mobile",
  "app-store-launch": "native-mobile",
  "web-app-to-native-mobile-app": "native-mobile",
  "ai-prototype-to-native-app": "native-mobile",
  // → AI systems
  "ai-saas-product-development": "ai-systems",
  "workflow-automation-development": "ai-systems",
  "ai-chatbot-rag-development": "ai-systems",
  // → rescue & security
  "maintenance-support": "rescue-hardening",
  "tech-stack-migration": "rescue-hardening",
  "ai-app-completion": "rescue-hardening",
  // Security & incident response folded back into rescue & security. The old
  // pillar URL and every security specialism redirect there, so the SEO carries.
  "security-incident-response": "rescue-hardening",
  "wordpress-security-malware-removal": "rescue-hardening",
  "website-compromise-recovery": "rescue-hardening",
  "wordpress-woocommerce-hardening": "rescue-hardening",
  "pre-investment-security-audit": "rescue-hardening",
  // → commerce & content
  "custom-wordpress-development-for-business": "commerce-content",
  "stripe-billing-integration": "commerce-content",
  "shopify-development": "commerce-content",
  "shopify-migration": "commerce-content",
  "sanity-cms-development": "commerce-content",
  "membership-subscriptions-development": "commerce-content",
  "headless-wordpress-development": "commerce-content",
  "wordpress-plugin-development": "commerce-content",
  "knowledge-base-community-development": "commerce-content",
  "woocommerce-development": "commerce-content",
  // → performance & search
  "technical-seo-for-saas": "performance-search",
  "cloudflare-edge-engineering": "performance-search",
  "programmatic-seo-engineering": "performance-search",
  "wordpress-performance-optimisation": "performance-search",
};

/**
 * Human-readable labels for the original (legacy) service pages, keyed by their
 * existing URL slug. Used to link each specific service from its parent pillar.
 * URLs are unchanged — these are the same slugs as LEGACY_SERVICE_REDIRECTS.
 */
export const LEGACY_SERVICE_LABELS: Record<string, string> = {
  "saas-web-app-development": "SaaS web app development",
  "api-and-integration": "API & integration",
  "supabase-development": "Supabase development",
  "laravel-development": "Laravel development",
  "internal-tools-admin-dashboards": "Internal tools & admin dashboards",
  "startup-launch-support": "Startup launch support",
  "white-label-development": "White-label development",
  "lms-development": "LMS development",
  "b2b-marketplace-development": "B2B marketplace development",
  "vue-nuxt-development": "Vue & Nuxt development",
  "event-ticketing-platform-development": "Event ticketing platform development",
  "python-django-api-development": "Python & Django API development",
  "react-native-app-development": "React Native app development",
  "app-store-launch": "App Store launch",
  "web-app-to-native-mobile-app": "Web app to native mobile app",
  "ai-prototype-to-native-app": "AI prototype to native app",
  "ai-saas-product-development": "AI SaaS product development",
  "workflow-automation-development": "Workflow automation development",
  "ai-chatbot-rag-development": "AI chatbot & RAG development",
  "maintenance-support": "Maintenance & support",
  "tech-stack-migration": "Tech-stack migration",
  "ai-app-completion": "AI app completion",
  "wordpress-security-malware-removal": "WordPress security & malware removal",
  "website-compromise-recovery": "Website compromise recovery",
  "wordpress-woocommerce-hardening": "WordPress & WooCommerce hardening",
  "pre-investment-security-audit": "Pre-investment security audit",
  "custom-wordpress-development-for-business": "Custom WordPress development",
  "stripe-billing-integration": "Stripe billing integration",
  "shopify-development": "Shopify development",
  "shopify-migration": "Shopify migration",
  "sanity-cms-development": "Sanity CMS development",
  "membership-subscriptions-development": "Membership & subscriptions development",
  "headless-wordpress-development": "Headless WordPress development",
  "wordpress-plugin-development": "WordPress plugin development",
  "knowledge-base-community-development": "Knowledge base & community development",
  "woocommerce-development": "WooCommerce development",
  "technical-seo-for-saas": "Technical SEO for SaaS",
  "cloudflare-edge-engineering": "Cloudflare edge engineering",
  "programmatic-seo-engineering": "Programmatic SEO engineering",
  "wordpress-performance-optimisation": "WordPress performance optimisation",
};

/** The original service pages that sit under a given pillar service. A redirect
 *  without a label (e.g. a former pillar folded into another) is not a
 *  specialism, so it is excluded from the list. */
export function subServicesFor(mainSlug: string): { slug: string; label: string }[] {
  return Object.entries(LEGACY_SERVICE_REDIRECTS)
    .filter(([slug, target]) => target === mainSlug && LEGACY_SERVICE_LABELS[slug])
    .map(([slug]) => ({ slug, label: LEGACY_SERVICE_LABELS[slug] }));
}
