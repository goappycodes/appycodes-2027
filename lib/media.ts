// Imagery for the six pillar services. Kept beside the data rather than inside
// it so the copy stays portable and the art direction lives in one place.
export const SERVICE_MEDIA: Record<string, { img: string; alt: string }> = {
  "product-platforms": {
    img: "/images/service-product-platforms-featured.png",
    alt: "A modular multi-tenant platform connected to a resilient central core",
  },
  "native-mobile": {
    img: "/images/service-native-mobile-featured.png",
    alt: "Two native mobile apps maintaining a synchronized data path",
  },
  "ai-systems": {
    img: "/images/service-ai-systems-featured.png",
    alt: "A grounded AI retrieval pipeline selecting and verifying source material",
  },
  "rescue-hardening": {
    img: "/images/service-rescue-security-featured.png",
    alt: "A damaged software system contained, rebuilt and reinforced",
  },
  "commerce-content": {
    img: "/images/service-commerce-content-featured.png",
    alt: "Content, catalogue, checkout and API modules joined into an owned storefront",
  },
  "performance-search": {
    img: "/images/service-performance-search-featured.png",
    alt: "Fast page layers passing measurement gates into an ordered search index",
  },
  "security-incident-response": {
    img: "/images/service-maintenance.jpg",
    alt: "An engineer working through a compromised production system",
  },
};

export const SERVICE_FALLBACK = {
  img: "/images/service-consulting.jpg",
  alt: "Senior engineers working through an architecture problem",
};

export function serviceMedia(slug: string) {
  return SERVICE_MEDIA[slug] ?? SERVICE_FALLBACK;
}

/**
 * The proof band on each pillar page. Where we have real screenshots of that
 * kind of work we show them in a browser frame; where we do not, the pillar
 * falls back to a single illustrative image rather than borrowing a client's.
 */
export type PillarProof =
  | {
      kind: "frame";
      frame: string;
      frameAlt: string;
      phone?: string;
      phoneAlt?: string;
      caption: string;
      client: string;
      href: string;
      facts: { k: string; v: string }[];
    }
  | { kind: "image"; img: string; alt: string; caption: string };

export const PILLAR_PROOF: Record<string, PillarProof> = {
  "product-platforms": {
    kind: "frame",
    frame: "/images/cs-ontick-platform.jpg",
    frameAlt: "The Ontick organiser platform",
    phone: "/images/cs-ontick-customer-app.jpg",
    phoneAlt: "The Ontick customer app",
    caption: "Ontick — a multi-organizer ticketing platform with Stripe instalments and two native apps.",
    client: "Ontick",
    href: "/case-studies/ontick/",
    facts: [
      { k: "processed", v: "£2M+" },
      { k: "surfaces", v: "web + iOS + Android" },
      { k: "stack", v: "Laravel · React Native" },
    ],
  },
  "native-mobile": {
    kind: "frame",
    frame: "/images/bloc-6.png",
    frameAlt: "The Bloc social events app",
    phone: "/images/bloc-app-map.jpg",
    phoneAlt: "The Bloc map view",
    caption: "Bloc — a React Native app with real-time sync, maps and check-in, shipped and re-shipped for four years.",
    client: "Bloc",
    href: "/case-studies/bloc/",
    facts: [
      { k: "partnership", v: "4+ yrs" },
      { k: "codebases", v: "5, one team" },
      { k: "stack", v: "React Native · Node" },
    ],
  },
  "ai-systems": {
    kind: "image",
    img: "/images/service-ai-systems-featured.png",
    alt: "A grounded AI retrieval pipeline selecting and verifying source material",
    caption:
      "Retrieval pipelines, support deflection and internal copilots — costed per token before a line is written.",
  },
  "rescue-hardening": {
    kind: "image",
    img: "/images/service-rescue-security-featured.png",
    alt: "A damaged software system contained, rebuilt and reinforced",
    caption:
      "Audit first, stabilise second, then finish properly — the order that stops a rescue becoming a second rewrite.",
  },
  "commerce-content": {
    kind: "frame",
    frame: "/images/cs-yippee-malta-homepage.jpg",
    frameAlt: "The Yippee Malta storefront",
    phone: "/images/cs-ontick-customer-app.jpg",
    phoneAlt: "A mobile checkout flow",
    caption: "Yippee Malta — a mobile-first storefront with a custom checkout against a proprietary booking API.",
    client: "Yippee Malta",
    href: "/case-studies/yippee-malta/",
    facts: [
      { k: "core web vitals", v: "90+" },
      { k: "checkout", v: "custom, owned" },
      { k: "market", v: "Malta · EU" },
    ],
  },
  "security-incident-response": {
    kind: "image",
    img: "/images/service-maintenance.jpg",
    alt: "Working through a compromised production system",
    caption:
      "Contain, find the way in, clean, harden — run on live stores where the transaction still completed and nothing in the client's own reporting looked wrong.",
  },
  "performance-search": {
    kind: "frame",
    frame: "/images/cs-yippee-malta-tour-detail.jpg",
    frameAlt: "A Yippee Malta tour page",
    caption: "Yippee Malta — 90+ Core Web Vitals on mobile and desktop after the rebuild, with indexing to match.",
    client: "Yippee Malta",
    href: "/case-studies/yippee-malta/",
    facts: [
      { k: "core web vitals", v: "90+" },
      { k: "both", v: "mobile + desktop" },
      { k: "measured", v: "in production" },
    ],
  },
};

/** Case studies worth showing on each pillar page. */
export const PILLAR_CASES: Record<string, string[]> = {
  "product-platforms": ["Ontick", "Professional Energy", "Bloc"],
  "native-mobile": ["Player Profile Hub", "Bloc", "Ontick"],
  "ai-systems": ["Bloc", "Professional Energy", "Ontick"],
  "rescue-hardening": ["Bloc", "Yippee Malta", "Professional Energy"],
  "commerce-content": ["Léonia", "Shutters 365", "PlusHeat", "Yippee Malta", "Ontick"],
  "performance-search": ["Easyship", "Yippee Malta", "Bloc"],
  "security-incident-response": ["Bloc", "Yippee Malta", "Ontick"],
};

/** Articles that back up each pillar with real numbers. */
export const PILLAR_POSTS: Record<string, string[]> = {
  "product-platforms": [
    "mvp-cost-funded-startups-2026",
    "multi-tenant-architecture-cost-study-2026",
    "b2b-marketplace-mvp-cost-2026",
    "custom-ticketing-breakeven-2026",
  ],
  "native-mobile": [
    "react-native-app-store-rejection-data-2026",
    "ota-updates-eas-codepush-2026",
    "push-notifications-expo-fcm-apns-2026",
    "vibe-coded-to-native-mobile-2026",
  ],
  "ai-systems": [
    "production-rag-pipeline-2026",
    "ai-feature-token-economics-2026",
    "support-bot-deflection-study-2026",
    "workflow-automation-cost-benchmark-2026",
  ],
  "rescue-hardening": [
    "ai-prototype-codebase-audit-2026",
    "series-a-codebase-audit-2026",
    "ai-generated-supabase-audit-2026",
    "lovable-to-production-cost-2026",
  ],
  "commerce-content": [
    "shopify-replatform-cost-study-2026",
    "shopify-plus-vs-advanced-cost-study-2026",
    "membership-churn-economics-2026",
    "wordpress-to-headless-nextjs-2026",
  ],
  "performance-search": [
    "indexing-decay-google-study-2026",
    "javascript-seo-funded-saas-study-2026",
    "wordpress-performance-data-study-2026",
    "schema-saas-rankings-study-2026",
  ],
  "security-incident-response": [
    "wordpress-plugin-vulnerability-study-2026",
    "series-a-codebase-audit-2026",
    "ai-generated-supabase-audit-2026",
    "wordpress-performance-data-study-2026",
  ],
};

/** Imagery for the 35 legacy service pages, matched on what the page is about. */
const SUB_SERVICE_MEDIA: Record<string, string> = {
  "saas-web-app-development": "/images/service-saas-web.jpg",
  "react-native-app-development": "/images/service-mobile-app.jpg",
  "app-store-launch": "/images/service-mobile.jpg",
  "web-app-to-native-mobile-app": "/images/service-ai-to-native-app.jpg",
  "ai-prototype-to-native-app": "/images/service-ai-prototype-apps.jpg",
  "ai-saas-product-development": "/images/service-ai.jpg",
  "workflow-automation-development": "/images/service-ai.jpg",
  "ai-chatbot-rag-development": "/images/service-ai.jpg",
  "ai-app-completion": "/images/service-ai-prototype-apps.jpg",
  "maintenance-support": "/images/service-maintenance.jpg",
  "tech-stack-migration": "/images/service-consulting.jpg",
  "wordpress-security-malware-removal": "/images/service-wordpress.jpg",
  "website-compromise-recovery": "/images/service-maintenance.jpg",
  "wordpress-woocommerce-hardening": "/images/service-wordpress.jpg",
  "pre-investment-security-audit": "/images/service-consulting.jpg",
  "custom-wordpress-development-for-business": "/images/service-wordpress.jpg",
  "woocommerce-development": "/images/service-wordpress.jpg",
  "python-django-api-development": "/images/service-saas-web.jpg",
  "headless-wordpress-development": "/images/service-wordpress.jpg",
  "wordpress-plugin-development": "/images/service-wordpress.jpg",
  "wordpress-performance-optimisation": "/images/service-seo.jpg",
  "technical-seo-for-saas": "/images/service-seo.jpg",
  "programmatic-seo-engineering": "/images/service-seo.jpg",
  "cloudflare-edge-engineering": "/images/service-seo.jpg",
};

export function subServiceMedia(slug: string, pillarSlug?: string) {
  return (
    SUB_SERVICE_MEDIA[slug] ??
    (pillarSlug ? serviceMedia(pillarSlug).img : SERVICE_FALLBACK.img)
  );
}
