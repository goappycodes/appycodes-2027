// Estimator config — versioned source of truth for the calculation engine.
// All numbers are starting estimates; calibrate against last 10 projects before
// raising any of them. Numbers in INR (base) unless noted.
//
// Ported verbatim from the previous site's data/estimatorConfig.ts — the
// calculation model is intentionally kept identical. Framework-agnostic: no
// React, DOM or third-party imports.

// ---------------------------------------------------------------------------
// RATES
// ---------------------------------------------------------------------------

export const RATES = {
  base_currency: "INR" as const,
  blended_day_rate: 5000,
  working_days_per_month: 22,
  by_role: {
    tech_lead: 8000,
    senior_engineer: 7000,
    mid_engineer: 5000,
    junior_engineer: 3000,
    mobile_engineer: 5500,
    designer: 5000,
    qa: 3500,
    pm: 6500,
    devops: 6000,
  },
};

// ---------------------------------------------------------------------------
// CURRENCIES
// ---------------------------------------------------------------------------

export type CurrencyCode = "INR" | "GBP" | "USD" | "EUR" | "AED";

export const CURRENCIES: {
  supported: CurrencyCode[];
  geo_map: Record<string, CurrencyCode | "default">;
  fx_from_inr: Record<CurrencyCode, number>;
  format: Record<
    CurrencyCode,
    { symbol: string; lakh_crore: boolean; decimals: number }
  >;
  fx_last_updated: string;
  fx_refresh_cadence_days: number;
} = {
  supported: ["INR", "GBP", "USD", "EUR", "AED"],
  geo_map: {
    IN: "INR",
    GB: "GBP",
    US: "USD",
    CA: "USD",
    AE: "AED",
    SA: "AED",
    DE: "EUR",
    FR: "EUR",
    NL: "EUR",
    ES: "EUR",
    IT: "EUR",
    IE: "EUR",
    default: "GBP",
  },
  fx_from_inr: {
    INR: 1.0,
    GBP: 0.0095,
    USD: 0.012,
    EUR: 0.011,
    AED: 0.044,
  },
  format: {
    INR: { symbol: "₹", lakh_crore: true, decimals: 0 },
    GBP: { symbol: "£", lakh_crore: false, decimals: 0 },
    USD: { symbol: "$", lakh_crore: false, decimals: 0 },
    EUR: { symbol: "€", lakh_crore: false, decimals: 0 },
    AED: { symbol: "د.إ", lakh_crore: false, decimals: 0 },
  },
  fx_last_updated: "2026-05-01",
  fx_refresh_cadence_days: 90,
};

// ---------------------------------------------------------------------------
// MULTIPLIERS
// ---------------------------------------------------------------------------

export type DesignChoice =
  | "template"
  | "custom_simple"
  | "custom_premium"
  | "designs_provided";
export type ScaleChoice = "under_1k" | "1k_10k" | "10k_100k" | "over_100k";
export type LaunchChoice =
  | "under_2_months"
  | "2_4_months"
  | "4_6_months"
  | "6_plus_months";
export type ComplianceChoice = "none" | "gdpr_only" | "soc2_or_hipaa";

export type PlatformKey =
  | "web_only"
  | "mobile_only_cross_platform"
  | "mobile_only_native_one"
  | "mobile_only_native_both"
  | "web_plus_mobile_cross_platform"
  | "web_plus_mobile_native_one"
  | "web_plus_mobile_native_both";

export const MULTIPLIERS = {
  design: {
    template: 1.0,
    custom_simple: 1.15,
    custom_premium: 1.4,
    designs_provided: 0.95,
  } as Record<DesignChoice, number>,
  scale: {
    under_1k: 1.0,
    "1k_10k": 1.05,
    "10k_100k": 1.15,
    over_100k: 1.3,
  } as Record<ScaleChoice, number>,
  rush: {
    under_2_months: { cost: 1.2, timeline: 0.75 },
    "2_4_months": { cost: 1.05, timeline: 0.9 },
    "4_6_months": { cost: 1.0, timeline: 1.0 },
    "6_plus_months": { cost: 0.95, timeline: 1.1 },
  } as Record<LaunchChoice, { cost: number; timeline: number }>,
  compliance: {
    none: 1.0,
    gdpr_only: 1.05,
    soc2_or_hipaa: 1.2,
  } as Record<ComplianceChoice, number>,
  platform: {
    web_only: 1.0,
    mobile_only_cross_platform: 1.0,
    mobile_only_native_one: 1.0,
    mobile_only_native_both: 1.7,
    web_plus_mobile_cross_platform: 1.5,
    web_plus_mobile_native_one: 1.5,
    web_plus_mobile_native_both: 2.1,
  } as Record<PlatformKey, number>,
  fixed_overhead_pct: 0.25,
  parallelism_factor: 0.65,
  cost_range: { min: 0.85, max: 1.2 },
};

// ---------------------------------------------------------------------------
// FEATURES
// ---------------------------------------------------------------------------

export type FeatureKey =
  | "auth_basic"
  | "auth_sso"
  | "admin_dashboard"
  | "payments"
  | "subscriptions"
  | "multi_tenant"
  | "marketplace_core"
  | "search_filters"
  | "chat_realtime"
  | "notifications"
  | "ai_llm"
  | "ai_agents"
  | "video_streaming"
  | "maps_geo"
  | "offline_support"
  | "iap"
  | "biometric"
  | "ar_features"
  | "compliance_gdpr"
  | "compliance_soc2";

export type Feature = {
  key: FeatureKey;
  label: string;
  category: "core" | "advanced" | "compliance";
  base_md: number;
  applies_to: ("web" | "mobile")[];
};

export const FEATURES: Record<FeatureKey, Feature> = {
  auth_basic: { key: "auth_basic", label: "Auth & user accounts", category: "core", base_md: 0.5, applies_to: ["web", "mobile"] },
  auth_sso: { key: "auth_sso", label: "SSO / SAML", category: "advanced", base_md: 1.0, applies_to: ["web"] },
  admin_dashboard: { key: "admin_dashboard", label: "Admin dashboard", category: "core", base_md: 1.5, applies_to: ["web"] },
  payments: { key: "payments", label: "Payments", category: "core", base_md: 1.0, applies_to: ["web", "mobile"] },
  subscriptions: { key: "subscriptions", label: "Subscriptions & billing", category: "core", base_md: 1.0, applies_to: ["web"] },
  multi_tenant: { key: "multi_tenant", label: "Multi-tenant / workspaces", category: "advanced", base_md: 2.0, applies_to: ["web"] },
  marketplace_core: { key: "marketplace_core", label: "Marketplace + escrow", category: "advanced", base_md: 3.5, applies_to: ["web"] },
  search_filters: { key: "search_filters", label: "Search & filters", category: "core", base_md: 0.75, applies_to: ["web", "mobile"] },
  chat_realtime: { key: "chat_realtime", label: "Real-time chat", category: "advanced", base_md: 1.5, applies_to: ["web", "mobile"] },
  notifications: { key: "notifications", label: "Push + email notifications", category: "core", base_md: 0.75, applies_to: ["web", "mobile"] },
  ai_llm: { key: "ai_llm", label: "AI features (LLM)", category: "advanced", base_md: 1.5, applies_to: ["web", "mobile"] },
  ai_agents: { key: "ai_agents", label: "AI agents / RAG", category: "advanced", base_md: 3.0, applies_to: ["web"] },
  video_streaming: { key: "video_streaming", label: "Video streaming", category: "advanced", base_md: 2.0, applies_to: ["web", "mobile"] },
  maps_geo: { key: "maps_geo", label: "Maps / geolocation", category: "core", base_md: 0.75, applies_to: ["web", "mobile"] },
  offline_support: { key: "offline_support", label: "Offline support", category: "advanced", base_md: 1.5, applies_to: ["mobile"] },
  iap: { key: "iap", label: "In-app purchases", category: "core", base_md: 0.75, applies_to: ["mobile"] },
  biometric: { key: "biometric", label: "Biometric auth", category: "core", base_md: 0.25, applies_to: ["mobile"] },
  ar_features: { key: "ar_features", label: "AR features", category: "advanced", base_md: 3.0, applies_to: ["mobile"] },
  compliance_gdpr: { key: "compliance_gdpr", label: "GDPR compliance", category: "compliance", base_md: 0.5, applies_to: ["web", "mobile"] },
  compliance_soc2: { key: "compliance_soc2", label: "SOC 2 readiness", category: "compliance", base_md: 2.5, applies_to: ["web"] },
};

// ---------------------------------------------------------------------------
// STACKS — recommendations shown to prospect
// ---------------------------------------------------------------------------

export type StackTemplate = {
  key: string;
  match_any?: FeatureKey[];
  platform_match?: PlatformKey[];
  primary: Record<string, string>;
  alternatives?: { [k: string]: string }[];
};

export const STACKS: StackTemplate[] = [
  {
    key: "web_plus_mobile",
    platform_match: [
      "web_plus_mobile_cross_platform",
      "web_plus_mobile_native_one",
      "web_plus_mobile_native_both",
    ],
    primary: {
      Web: "Next.js 15",
      Mobile: "React Native + Expo",
      Backend: "Shared Node API + Postgres / Supabase",
      why: "TypeScript end-to-end, shared types and validation between web and mobile, single backend, cleanest path to feature parity.",
    },
    alternatives: [
      {
        Web: "Next.js",
        Mobile: "Flutter",
        Backend: "Node + Postgres",
        why: "Pick if mobile UX needs to be best-in-class and you're OK with two languages.",
      },
    ],
  },
  {
    key: "mobile_cross_platform",
    platform_match: [
      "mobile_only_cross_platform",
      "mobile_only_native_one",
      "mobile_only_native_both",
    ],
    primary: {
      Framework: "React Native + Expo",
      Backend: "Supabase",
      Push: "Expo Notifications",
      why: "One codebase, OTA updates, native modules where needed.",
    },
    alternatives: [
      {
        Framework: "Flutter",
        why: "Better animation perf, single language. Pick if you have Flutter team.",
      },
    ],
  },
  {
    key: "marketplace",
    match_any: ["marketplace_core"],
    primary: {
      Frontend: "Next.js",
      Backend: "Postgres + Elasticsearch",
      Payments: "Stripe Connect",
      why: "Stripe Connect is the only sane way to do escrow + KYC at scale.",
    },
  },
  {
    key: "ai_product",
    match_any: ["ai_llm", "ai_agents"],
    primary: {
      Frontend: "Next.js 15",
      Backend: "Node + Postgres + pgvector",
      AI: "Anthropic / OpenAI + LangGraph",
      Hosting: "Vercel + Cloudflare Workers AI",
      why: "Streaming-first, cheap embeddings, low cold-start.",
    },
  },
  {
    key: "saas_standard",
    match_any: ["subscriptions", "multi_tenant", "admin_dashboard"],
    primary: {
      Frontend: "Next.js 15",
      Backend: "Supabase / Postgres",
      Auth: "Supabase Auth / Clerk",
      Payments: "Stripe",
      Hosting: "Vercel + Cloudflare",
      why: "Fastest to MVP, scales to 100k users without re-platforming.",
    },
    alternatives: [
      {
        Frontend: "Next.js",
        Backend: "Node + PostgreSQL on Railway",
        why: "Full control if you outgrow Supabase RLS.",
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// EXTERNAL SERVICES — monthly run costs (INR)
// ---------------------------------------------------------------------------

// All numeric ranges below are in INR per month, converted to user's
// display currency at render time via formatCurrency.
export type Range = { min: number; max: number; openEnded?: boolean };

type ExternalEntry = {
  label: string;
  // Either a transactional descriptor (passed through verbatim) or three
  // INR tiers selected by the user's expected scale.
  transactional?: string;
  tiers?: { low: Range; med: Range; high: Range };
  applies_when: (selected: Set<FeatureKey>) => boolean;
};

export const EXTERNALS: Record<string, ExternalEntry> = {
  stripe: {
    label: "Payments (Stripe)",
    transactional: "1.5% + ₹15 domestic / 2.9% + ₹30 intl",
    applies_when: (s) => s.has("payments") || s.has("subscriptions") || s.has("marketplace_core"),
  },
  openai: {
    label: "OpenAI API",
    tiers: {
      low: { min: 4000, max: 12000 },
      med: { min: 12000, max: 40000 },
      high: { min: 40000, max: 160000, openEnded: true },
    },
    applies_when: (s) => s.has("ai_llm") || s.has("ai_agents"),
  },
  anthropic: {
    label: "Anthropic API",
    tiers: {
      low: { min: 4000, max: 16000 },
      med: { min: 16000, max: 55000 },
      high: { min: 55000, max: 200000, openEnded: true },
    },
    applies_when: (s) => s.has("ai_llm") || s.has("ai_agents"),
  },
  email: {
    label: "Transactional email",
    tiers: {
      low: { min: 0, max: 1500 },
      med: { min: 1500, max: 6000 },
      high: { min: 6000, max: 25000 },
    },
    applies_when: (s) => s.has("notifications") || s.has("auth_basic"),
  },
  sms: {
    label: "SMS",
    tiers: {
      low: { min: 1500, max: 6000 },
      med: { min: 6000, max: 25000 },
      high: { min: 25000, max: 25000, openEnded: true },
    },
    applies_when: (s) => s.has("notifications"),
  },
  video: {
    label: "Video streaming",
    tiers: {
      low: { min: 4000, max: 16000 },
      med: { min: 16000, max: 65000 },
      high: { min: 65000, max: 65000, openEnded: true },
    },
    applies_when: (s) => s.has("video_streaming"),
  },
  maps: {
    label: "Maps",
    tiers: {
      low: { min: 0, max: 4000 },
      med: { min: 4000, max: 20000 },
      high: { min: 20000, max: 20000, openEnded: true },
    },
    applies_when: (s) => s.has("maps_geo"),
  },
  push: {
    label: "Push notifications",
    tiers: {
      low: { min: 0, max: 0 },
      med: { min: 0, max: 2000 },
      high: { min: 2000, max: 10000 },
    },
    applies_when: (s) => s.has("notifications"),
  },
};

// ---------------------------------------------------------------------------
// HOSTING TIERS
// ---------------------------------------------------------------------------

export const HOSTING_TIERS: {
  key: string;
  label: string;
  monthly: Range;
}[] = [
  { key: "mvp", label: "MVP (0–1k users)", monthly: { min: 1500, max: 6000 } },
  { key: "growth", label: "Growth (1k–50k)", monthly: { min: 12000, max: 25000 } },
  { key: "scale", label: "Scale (50k+)", monthly: { min: 50000, max: 140000, openEnded: true } },
];

// ---------------------------------------------------------------------------
// ARCHETYPES — pre-fill defaults per project type
// ---------------------------------------------------------------------------

export type ArchetypeKey =
  | "saas"
  | "marketplace"
  | "ecommerce"
  | "ai_product"
  | "internal"
  | "marketing"
  | "not_sure";

export const ARCHETYPES: Record<ArchetypeKey, { label: string; default_features: FeatureKey[] }> = {
  saas: {
    label: "SaaS / Web app",
    default_features: ["auth_basic", "admin_dashboard", "subscriptions", "notifications"],
  },
  marketplace: {
    label: "Marketplace",
    default_features: ["auth_basic", "marketplace_core", "search_filters", "payments", "chat_realtime"],
  },
  ecommerce: {
    label: "E-commerce",
    default_features: ["auth_basic", "admin_dashboard", "payments", "search_filters", "notifications"],
  },
  ai_product: {
    label: "AI product",
    default_features: ["auth_basic", "ai_llm", "admin_dashboard"],
  },
  internal: {
    label: "Internal tool",
    default_features: ["auth_sso", "admin_dashboard", "search_filters"],
  },
  marketing: { label: "Marketing site", default_features: [] },
  not_sure: { label: "Not sure", default_features: [] },
};
