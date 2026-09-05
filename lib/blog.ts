export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  image: string;
  date: string;
  readTime: string;
  tags: string[];
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "postcodes-io-vs-ideal-postcodes-uk-address-lookup",
    title: "Postcodes.io vs Ideal Postcodes: Which UK Address Lookup Should You Use?",
    description:
      "Choose postcode geography or complete delivery-point addresses with a practical scoring model, a real UK cover-funnel boundary and a resilient Next.js integration pattern.",
    image: "/images/blog-postcodes-io-vs-ideal-postcodes-uk-address-lookup.png",
    date: "2026-09-05",
    readTime: "15 min read",
    tags: ["UK Business", "Address Data", "Postcodes", "API Integration"],
  },
  {
    slug: "companies-house-api-uk-onboarding-kyc",
    title: "Using the Companies House API for UK Customer Onboarding and KYC",
    description:
      "A practical UK guide to matching the right company, understanding the KYC boundary and safely synchronising Companies House data.",
    image: "/images/blog-companies-house-onboarding-system.png",
    date: "2026-09-01",
    readTime: "11 min read",
    tags: ["UK Business", "Companies House", "KYC", "API Integration"],
  },
  {
    slug: "tally-integration-tdl-guide-2026",
    title:
      "Integrating with Tally: Getting Data In and Out with TDL and the XML Gateway",
    description:
      "Tally has no REST API. The mental model for real Tally integrations: the XML/HTTP gateway (port 9000) and TDL, how to read vouchers and ledgers out, import vouchers in, the version gotchas that break TDLs, and which surface to use per use case, Zoho, dashboards, Excel, e-commerce, CRM.",
    image: "/images/blog-tally-integration-tdl-2026.jpg",
    date: "2026-07-26",
    readTime: "18 min read",
    tags: ["Tally", "TDL", "Integration", "ERP", "XML"],
  },
  {
    slug: "fix-lovable-app-jio-internet-supabase-dns",
    title:
      "Jio Supabase Issue: Why Apps Break on Jio and How to Fix It Properly",
    description:
      "Supabase apps work on Airtel and office WiFi but fail on JioFiber and Jio mobile data: Failed to Fetch, WebSocket timeouts, broken auth. Diagnosed as ISP-level DNS / routing filtering, with four production-grade fixes.",
    image: "/images/blog-fix-supabase.png",
    date: "2025-09-12",
    readTime: "8 min read",
    tags: ["Supabase", "Lovable", "DNS", "India"],
  },
  {
    slug: "wordpress-performance-data-study-2026",
    title:
      "WordPress Performance Optimization: What Actually Works (Data-Backed Study)",
    description:
      "We analysed 100 WordPress websites: 78% failed Core Web Vitals. A data-backed study of what actually slows WordPress down (page builders, plugins, hosting) and which fixes deliver real ROI.",
    image: "/images/blog-wordpress-performance-data-study-2026.jpg",
    date: "2026-05-03",
    readTime: "18 min read",
    tags: ["WordPress", "Performance", "Core Web Vitals", "Research"],
  },
  {
    slug: "tech-stacks-developers-vs-clients-2026",
    title:
      "Tech stacks clients pay for vs what developers actually want, 2026 data report",
    description:
      "12 web stacks compared across usage, developer preference, admiration, client demand, and freelance rate, with four original metrics (DPGI, SMS, HRR, Legacy Lock-in) computed from Stack Overflow, State of JS, W3Techs and salary data.",
    image: "/images/blog-tech-stacks-developers-vs-clients-2026.jpg",
    date: "2026-05-02",
    readTime: "22 min read",
    tags: ["Research", "Stack Analysis", "2026"],
  },
  {
    slug: "ai-prototype-codebase-audit-2026",
    title: "We Audited 31 Lovable / Bolt / v0 / Cursor Codebases. Here's What Survives Production.",
    description: "A code-level teardown of 31 AI-generated SaaS prototypes: three proprietary metrics (PSR, TDR, RCM) and a 10-mode failure taxonomy.",
    image: "/images/blog-ai-prototype-codebase-audit-2026.jpg",
    date: "2026-03-10",
    readTime: "20 min read",
    tags: ["AI", "Vibe Coding", "Production", "Research"],
  },
  {
    slug: "series-a-codebase-audit-2026",
    title: "Series A Code Audit: Inside 23 Funded SaaS Codebases",
    description: "Patterns from 23 SaaS codebase audits: opens with one anonymised takeover, then aggregates the rubric findings. TDS, KPC, MTS.",
    image: "/images/blog-series-a-codebase-audit-2026.jpg",
    date: "2026-03-14",
    readTime: "20 min read",
    tags: ["Engineering", "Tech Debt", "SaaS", "Research"],
  },
  {
    slug: "wordpress-plugin-vulnerability-study-2026",
    title: "WordPress Plugin Vulnerability Risk: A 217-Plugin Security Audit",
    description: "Open with the incident response that started this report. 217 plugins audited across 14 categories with PVR / MFI / RAI scoring.",
    image: "/images/blog-wordpress-plugin-vulnerability-study-2026.jpg",
    date: "2026-03-19",
    readTime: "20 min read",
    tags: ["WordPress", "Security", "Research"],
  },
  {
    slug: "javascript-seo-funded-saas-study-2026",
    title: "JavaScript SEO Reality Check: We Crawled 103 Funded SaaS Marketing Sites",
    description: "41% of funded SaaS marketing sites are not reliably indexable. Original metrics RDI, CBE, JSC quantify the gap, and how to close it.",
    image: "/images/blog-javascript-seo-funded-saas-study-2026.jpg",
    date: "2026-03-24",
    readTime: "20 min read",
    tags: ["SEO", "JavaScript", "SaaS", "Research"],
  },
  {
    slug: "indexing-decay-google-study-2026",
    title: "Indexing Decay: A 217-Page, 12-Month Panel on When Google Drops Stale Content",
    description: "We tracked 217 pages across four content types for a year. Decay curves, half-lives, and the refresh cadence that recovers traffic.",
    image: "/images/blog-indexing-decay-google-study-2026.jpg",
    date: "2026-03-29",
    readTime: "18 min read",
    tags: ["SEO", "Content", "Research"],
  },
  {
    slug: "lovable-to-production-cost-2026",
    title: "Lovable / Bolt to Production: The Real Cost & Timeline (20 Engagements, 1 Anatomy)",
    description: "Opens with a deep teardown of one specific AI-prototype-to-production engagement, then aggregates cost and timeline across 20 projects.",
    image: "/images/blog-lovable-to-production-cost-2026.jpg",
    date: "2026-04-02",
    readTime: "19 min read",
    tags: ["AI", "Vibe Coding", "Engagement Data", "Research"],
  },
  {
    slug: "multi-tenant-architecture-cost-study-2026",
    title: "The Multi-Tenant SaaS Architecture Decision: Cost & Engineering Hours Across 4 Patterns",
    description: "Per-pattern cost, isolation, and onboarding eng-hours for the four common multi-tenancy approaches. TIC, AOC, BCM metrics.",
    image: "/images/blog-multi-tenant-architecture-cost-study-2026.jpg",
    date: "2026-04-08",
    readTime: "19 min read",
    tags: ["SaaS", "Architecture", "Multi-tenant", "Research"],
  },
  {
    slug: "schema-saas-rankings-study-2026",
    title: "Schema.org for SaaS: Which JSON-LD Types Actually Move Rankings (57-page A/B Study)",
    description: "90 days, 57 SaaS pages, 10 schema types. FAQ delivered 22% CTR lift; Article delivered noise. Schema-by-schema breakdowns.",
    image: "/images/blog-schema-saas-rankings-study-2026.jpg",
    date: "2026-04-13",
    readTime: "17 min read",
    tags: ["SEO", "Schema", "A/B Test", "Research"],
  },
  {
    slug: "ai-feature-token-economics-2026",
    title: "Per-Token Economics: What an AI Feature Actually Costs in Production (47 SaaS Sample)",
    description: "Real per-MAU token cost data across 47 production AI SaaS products. CPMU by feature class, model-tier routing, and the unit-economic decision.",
    image: "/images/blog-ai-feature-token-economics-2026.jpg",
    date: "2026-04-17",
    readTime: "21 min read",
    tags: ["AI", "Unit Economics", "SaaS", "Research"],
  },
  {
    slug: "shopify-plus-vs-advanced-cost-study-2026",
    title: "Shopify Plus vs Advanced: A Cost-Per-Order Analysis at 7 Revenue Tiers",
    description: "Real CPO math for Shopify Plus vs Advanced across $500k to $50M GMV, and the GMV at which the upgrade pays back. 24 audited merchants.",
    image: "/images/blog-shopify-plus-vs-advanced-cost-study-2026.jpg",
    date: "2026-04-22",
    readTime: "18 min read",
    tags: ["Shopify", "E-commerce", "Cost Analysis", "Research"],
  },
  {
    slug: "shopify-replatform-cost-study-2026",
    title: "Replatforming to Shopify: Anatomy of One Magento Migration + 23 Engagements of Data",
    description: "Opens with one specific Magento 2 to Shopify Plus migration end-to-end, then aggregates cost and timeline across 23 replatforms.",
    image: "/images/blog-shopify-replatform-cost-study-2026.jpg",
    date: "2026-04-27",
    readTime: "19 min read",
    tags: ["Shopify", "Migration", "E-commerce", "Research"],
  },
  {
    slug: "react-native-app-store-rejection-data-2026",
    title: "41 React Native App Submissions, Three Rejection War Stories",
    description: "Three specific rejection narratives from the App Store and Google Play, plus the aggregate rejection-reason data behind 41 RN submissions.",
    image: "/images/blog-react-native-app-store-rejection-data-2026.jpg",
    date: "2026-04-30",
    readTime: "18 min read",
    tags: ["React Native", "App Store", "Mobile", "Research"],
  },
  {
    slug: "ota-updates-eas-codepush-2026",
    title: "OTA Updates in Production: EAS vs CodePush vs Manual, 47 App Cost & Latency Study",
    description: "OTA cost, adoption-after-release curves, and rollback cost across EAS, CodePush, and manual update strategies on 47 production RN apps.",
    image: "/images/blog-ota-updates-eas-codepush-2026.jpg",
    date: "2026-05-04",
    readTime: "17 min read",
    tags: ["React Native", "OTA", "Mobile", "Research"],
  },
  {
    slug: "mvp-cost-funded-startups-2026",
    title: "What an MVP Actually Costs in 2026: Three Founder Stories + 31 Engagements of Data",
    description: "Three founder stories of 2026 MVP builds, fintech, AI SaaS, marketplace, followed by aggregate cost and bandwidth data across 31 engagements.",
    image: "/images/blog-mvp-cost-funded-startups-2026.jpg",
    date: "2026-05-08",
    readTime: "20 min read",
    tags: ["MVP", "Startup", "Cost", "Research"],
  },
  {
    slug: "zero-downtime-digitalocean-app-platform-2026",
    title: "Zero-Downtime Push-to-Deploy on DigitalOcean App Platform vs Vercel, Render and Fly",
    description: "Anatomy of one deploy, side by side, on four PaaS platforms: timings, traffic-shift mechanics, rollback paths, and the real cost of zero-downtime at 100 RPS.",
    image: "/images/blog-digitalocean-zero-downtime-2026.jpg",
    date: "2026-05-12",
    readTime: "21 min read",
    tags: ["DevOps", "DigitalOcean", "Vercel", "Render", "Fly"],
  },
  {
    slug: "shopify-functions-custom-pricing-2026",
    title: "Shopify Functions for Custom Pricing: B2B Tiers, Volume Discounts, Member Rates",
    description: "Three production patterns for custom pricing built on Shopify Functions: Rust source, metafield design, checkout integration, and the gotchas Scripts users hit.",
    image: "/images/blog-shopify-functions-pricing-2026.jpg",
    date: "2026-05-13",
    readTime: "19 min read",
    tags: ["Shopify", "Functions", "B2B", "Pricing"],
  },
  {
    slug: "production-rag-pipeline-2026",
    title: "Building a Production RAG Pipeline: Chunking, Embeddings, Retrieval, Caching",
    description: "Stage-by-stage architecture for a RAG pipeline running in production: chunk size choices, embedding model tradeoffs, retrieval, reranking, semantic cache, and the cost per 1M queries.",
    image: "/images/blog-production-rag-2026.jpg",
    date: "2026-05-14",
    readTime: "23 min read",
    tags: ["RAG", "AI", "Vector Search", "Architecture"],
  },
  {
    slug: "push-notifications-expo-fcm-apns-2026",
    title: "Push Notifications on Expo + FCM + APNs: The Setup That Actually Delivers",
    description: "End-to-end push setup for React Native apps on Expo, FCM and APNs: token registration, delivery measurement, and the 12 failure modes we see most often when delivery rates drop.",
    image: "/images/blog-push-notifications-2026.jpg",
    date: "2026-05-15",
    readTime: "22 min read",
    tags: ["React Native", "Expo", "Push Notifications", "FCM", "APNs"],
  },
  {
    slug: "stripe-webhooks-end-to-end-2026",
    title: "Stripe Webhooks End-to-End: Signature Verification, Idempotency, Replay, Dead-Letter",
    description: "The five guarantees a production Stripe webhook handler has to give you: verification, idempotency, ordering, replay, observability, with TypeScript code and the SQL schema we ship.",
    image: "/images/blog-stripe-webhooks-2026.jpg",
    date: "2026-05-16",
    readTime: "20 min read",
    tags: ["Stripe", "Webhooks", "Payments", "Reliability"],
  },
  {
    slug: "nextjs-app-router-ssr-seo-2026",
    title: "SSR on Next.js App Router for SEO: What to Render Where, with Measurements",
    description: "Server Components, Client Components, Streaming SSR, and SSG: what each one does for indexability, TTFB and LCP, with measurements across six pages we migrated.",
    image: "/images/blog-nextjs-app-router-2026.jpg",
    date: "2026-05-17",
    readTime: "21 min read",
    tags: ["Next.js", "App Router", "SSR", "SEO"],
  },
  {
    slug: "cloudflare-r2-wordpress-media-2026",
    title: "Cloudflare R2 as the WordPress Media Library: SDK-Free SigV4 in Pure PHP",
    description: "Replacing the local wp-content/uploads with Cloudflare R2 from a 200-line PHP MU-plugin, no AWS SDK, no Composer, with a custom SigV4 signer and the WP hooks that make it transparent.",
    image: "/images/blog-cloudflare-r2-wordpress-2026.jpg",
    date: "2026-05-18",
    readTime: "20 min read",
    tags: ["WordPress", "Cloudflare R2", "PHP", "Object Storage"],
  },
  {
    slug: "vibe-coded-to-native-mobile-2026",
    title: "Vibe-Coded to Native: Converting a Lovable Web App into iOS + Android Apps (One Engagement, 14 Weeks)",
    description: "How we converted GravityOne, a Lovable-built web app with a working Supabase backend, into native iOS and Android apps in 14 weeks. Code-sharing matrix, App Store rejection patterns, OTA strategy, and the per-phase engineering hours from one full engagement.",
    image: "/images/service-ai-to-native-app.jpg",
    date: "2026-05-22",
    readTime: "22 min read",
    tags: ["React Native", "Lovable", "Mobile", "Vibe Coding", "Engagement Data"],
  },
  {
    slug: "wordpress-to-headless-nextjs-2026",
    title:
      "WordPress to Headless Next.js: Faster, Fully Cached, and Immune to Downtime & Brute Force",
    description:
      "Convert a WordPress news or blog site into a headless Next.js front end: read the content WordPress already exposes over the REST API / WPGraphQL, ship static + ISR pages cached at the edge, and lock the WordPress origin away from brute-force attacks and downtime.",
    image: "/images/blog-wordpress-headless-nextjs-2026.jpg",
    date: "2026-06-02",
    readTime: "18 min read",
    tags: ["WordPress", "Next.js", "Headless", "Performance", "Security"],
  },
  {
    slug: "programmatic-seo-march-2026-update",
    title:
      "We Tracked Programmatic Pages Through the March 2026 Core Update: What Survived",
    description:
      "We tracked 1,842 programmatic pages across 14 SaaS sites through the March 2026 core update. Survival curves by data uniqueness, with USR, DUS and AICR metrics.",
    image: "/images/blog-programmatic-seo-march-2026-update.jpg",
    date: "2026-09-15",
    readTime: "19 min read",
    tags: ["SEO", "Programmatic SEO", "AI Overviews", "Research"],
  },
  {
    slug: "retool-vs-custom-admin-tco-2026",
    title:
      "Retool at 5, 25, and 100 Users vs a Custom Admin Panel: The 3-Year TCO Model",
    description:
      "A 3-year TCO model for Retool, Appsmith and a custom Next.js + Supabase admin panel at 5, 25 and 100 users. The 2026 repricing moved the break-even to 22 seats.",
    image: "/images/blog-retool-vs-custom-admin-tco-2026.jpg",
    date: "2026-08-11",
    readTime: "20 min read",
    tags: ["Internal Tools", "Retool", "Build vs Buy", "Research"],
  },
  {
    slug: "membership-churn-economics-2026",
    title:
      "The 90-Day Cliff: Subscription Churn Math That Decides Build vs Rent for Your Membership Platform",
    description:
      "Opens with the INSPIRELLE store-credit incident, then models platform fee drag vs custom-build cost across subscriber counts. PFD, D90S, DRR included.",
    image: "/images/blog-membership-churn-economics-2026.jpg",
    date: "2026-09-01",
    readTime: "20 min read",
    tags: ["Memberships", "Subscriptions", "Stripe", "Churn", "Research"],
  },
  {
    slug: "custom-ticketing-breakeven-2026",
    title:
      "The Break-Even Ticket Volume: When Building Your Own Ticketing Beats Eventbrite's Fees",
    description:
      "One Ontick replatform anatomised, fee maths across 8 ticketing platforms, and the annual ticket volume where a custom Stripe build beats Eventbrite. EFR, BETV, IRR.",
    image: "/images/blog-custom-ticketing-breakeven-2026.jpg",
    date: "2026-08-18",
    readTime: "20 min read",
    tags: ["Ticketing", "Stripe", "Events", "Cost Analysis", "Research"],
  },
  {
    slug: "laravel-cloud-vs-forge-vps-2026",
    title:
      "Laravel Cloud vs Forge + Hetzner vs a Bare VPS: 60 Days of Real Bills",
    description:
      "One production Laravel app run in parallel on Laravel Cloud, Forge + Hetzner, and a bare VPS for 60 days: the real bills, ops hours, and EMB, SZS, OHM metrics.",
    image: "/images/blog-laravel-cloud-vs-forge-vps-2026.jpg",
    date: "2026-09-22",
    readTime: "20 min read",
    tags: ["Laravel", "Hosting", "DevOps", "Cost Analysis", "Research"],
  },
  {
    slug: "support-bot-deflection-study-2026",
    title:
      "Vendor Says 76%, Reality Says 41%: Support Bot Deflection Rates We Actually Measured",
    description:
      "We measured deflection on 14 production support bots: median 41.2% against an advertised 76%. Query-class rates, per-resolution cost maths, escalation design.",
    image: "/images/blog-support-bot-deflection-study-2026.jpg",
    date: "2026-07-28",
    readTime: "19 min read",
    tags: ["AI", "RAG", "Support", "Research"],
  },
  {
    slug: "b2b-marketplace-mvp-cost-2026",
    title:
      "Anatomy of a B2B Marketplace MVP: The 9 Features That Eat 80% of the Budget",
    description:
      "Opens with one quarter of net-terms decisions at CREOATE scale, then breaks a B2B marketplace MVP into per-feature engineering hours. FCS, NRE, TTFT included.",
    image: "/images/blog-b2b-marketplace-mvp-cost-2026.jpg",
    date: "2026-08-25",
    readTime: "19 min read",
    tags: ["Marketplace", "B2B", "MVP", "Cost Analysis", "Research"],
  },
  {
    slug: "ai-generated-supabase-audit-2026",
    title:
      "We Audited 25 AI-Generated Supabase Databases: RLS Holes, Missing Indexes, Billing Bombs",
    description:
      "We audited 25 Supabase databases generated by Lovable, Bolt, Cursor and v0. Only 5 had correct RLS. The holes, the index debt, and the billing bombs.",
    image: "/images/blog-ai-generated-supabase-audit-2026.jpg",
    date: "2026-07-21",
    readTime: "20 min read",
    tags: ["Supabase", "AI", "Vibe Coding", "Security", "Research"],
  },
  {
    slug: "lms-build-vs-buy-2026",
    title:
      "Build vs Buy LMS: The Seat-Count Break-Even Model From a Decade Running One",
    description:
      "Year one vs year ten of the same Moodle LMS, then the seat-count model: where TalentLMS and Docebo pricing crosses a custom build. SBEC, PLCC, UMH inside.",
    image: "/images/blog-lms-build-vs-buy-2026.jpg",
    date: "2026-09-08",
    readTime: "19 min read",
    tags: ["LMS", "EdTech", "Moodle", "Build vs Buy", "Research"],
  },
  {
    slug: "workflow-automation-cost-benchmark-2026",
    title:
      "The Real Cost of 10,000 Workflow Runs: Zapier vs Make vs n8n vs Custom Code",
    description:
      "Opens with one ops team's $540 Zapier month, then bills three real workflows on Zapier, Make, self-hosted n8n and custom Node at 1K to 100K runs. EC10K, MTV, FRO.",
    image: "/images/blog-workflow-automation-cost-benchmark-2026.jpg",
    date: "2026-08-04",
    readTime: "19 min read",
    tags: ["Automation", "n8n", "Zapier", "Cost Analysis", "Research"],
  },
];
