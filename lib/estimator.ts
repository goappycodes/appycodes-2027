// Pure deterministic estimator engine.
// Input: answers from the wizard. Output: the full estimate object the result
// page renders. No AI in the calc core.
//
// Ported from the previous site's lib/estimator.ts. The calculation model is
// intentionally kept identical; only the config import path changed
// (@/data/estimatorConfig -> @/lib/estimator-config). Framework-agnostic: no
// React, DOM or third-party imports. detectCurrencyFromGeo touches `fetch`,
// so it is only ever called client-side and is fully wrapped in try/catch,
// defaulting to "GBP" on any failure.

import {
  RATES,
  CURRENCIES,
  CurrencyCode,
  MULTIPLIERS,
  FEATURES,
  FeatureKey,
  PlatformKey,
  STACKS,
  StackTemplate,
  EXTERNALS,
  HOSTING_TIERS,
  ARCHETYPES,
  ArchetypeKey,
  DesignChoice,
  ScaleChoice,
  LaunchChoice,
  Range,
} from "@/lib/estimator-config";

// ---------------------------------------------------------------------------
// ANSWER TYPES
// ---------------------------------------------------------------------------

export type Platform = "web" | "ios" | "android";
export type MobileApproach = "cross_platform" | "native" | "recommend_for_me";
export type StageChoice =
  | "idea"
  | "mvp_scaling"
  | "rebuild"
  | "funded";

export interface Answers {
  archetype?: ArchetypeKey;
  platforms: Platform[];
  stage?: StageChoice;
  launch?: LaunchChoice;
  design?: DesignChoice;
  features: FeatureKey[];
  capabilities: FeatureKey[]; // q7 special caps share the FEATURES table
  scale?: ScaleChoice;
  mobile_approach?: MobileApproach;
}

export const EMPTY_ANSWERS: Answers = {
  platforms: [],
  features: [],
  capabilities: [],
};

// ---------------------------------------------------------------------------
// PLATFORM KEY DERIVATION
// ---------------------------------------------------------------------------

export function platformKey(a: Answers): PlatformKey {
  const hasWeb = a.platforms.includes("web");
  const mobiles = a.platforms.filter((p) => p === "ios" || p === "android");
  const native =
    a.mobile_approach === "native" ||
    (a.mobile_approach === "recommend_for_me" && false);
  if (mobiles.length === 0) return "web_only";
  if (!hasWeb) {
    if (!native) return "mobile_only_cross_platform";
    return mobiles.length === 1
      ? "mobile_only_native_one"
      : "mobile_only_native_both";
  }
  if (!native) return "web_plus_mobile_cross_platform";
  return mobiles.length === 1
    ? "web_plus_mobile_native_one"
    : "web_plus_mobile_native_both";
}

// ---------------------------------------------------------------------------
// FEATURE EFFORT
// ---------------------------------------------------------------------------

function selectedFeatures(a: Answers): FeatureKey[] {
  return Array.from(new Set([...a.features, ...a.capabilities]));
}

function complianceLevelFromCaps(caps: FeatureKey[]): keyof typeof MULTIPLIERS.compliance {
  if (caps.includes("compliance_soc2")) return "soc2_or_hipaa";
  if (caps.includes("compliance_gdpr")) return "gdpr_only";
  return "none";
}

// ---------------------------------------------------------------------------
// ROLE BREAKDOWN
// Distribute total man-months across roles using a simple weighting.
// ---------------------------------------------------------------------------

const ROLE_WEIGHTS: Record<string, number> = {
  tech_lead: 0.1,
  senior_engineer: 0.18,
  mid_engineer: 0.22,
  mobile_engineer: 0.15, // populated only when mobile selected
  designer: 0.1,
  qa: 0.12,
  pm: 0.08,
  devops: 0.05,
};

function roleBreakdown(totalMD: number, includesMobile: boolean) {
  const weights = { ...ROLE_WEIGHTS };
  if (!includesMobile) {
    // redistribute mobile_engineer weight to senior_engineer
    weights.senior_engineer += weights.mobile_engineer;
    weights.mobile_engineer = 0;
  }
  const sum = Object.values(weights).reduce((a, b) => a + b, 0);
  return Object.entries(weights)
    .map(([role, w]) => ({
      role,
      label: roleLabel(role),
      months: +(totalMD * (w / sum)).toFixed(2),
    }))
    .filter((r) => r.months > 0);
}

function roleLabel(role: string): string {
  const map: Record<string, string> = {
    tech_lead: "Tech Lead",
    senior_engineer: "Senior Engineer",
    mid_engineer: "Mid Engineer",
    mobile_engineer: "Mobile Engineer",
    designer: "Designer",
    qa: "QA",
    pm: "Project Manager",
    devops: "DevOps",
  };
  return map[role] ?? role;
}

// ---------------------------------------------------------------------------
// STACK MATCHER
// ---------------------------------------------------------------------------

export function pickStack(a: Answers): StackTemplate {
  const pk = platformKey(a);
  const selected = new Set(selectedFeatures(a));
  // Try platform-specific first, then feature-specific, then SaaS default
  const ordered = [
    STACKS.find((s) => s.platform_match?.includes(pk) && pk.startsWith("web_plus_mobile")),
    STACKS.find((s) => s.platform_match?.includes(pk) && pk.startsWith("mobile_only")),
    STACKS.find((s) => s.match_any?.some((k) => selected.has(k))),
    STACKS.find((s) => s.key === "saas_standard"),
  ].filter(Boolean) as StackTemplate[];
  return ordered[0] ?? STACKS[STACKS.length - 1];
}

// ---------------------------------------------------------------------------
// MAIN COMPUTE
// ---------------------------------------------------------------------------

export interface Estimate {
  totalMD: number;
  breakdown: { role: string; label: string; months: number }[];
  calendarMonths: number;
  teamSize: number;
  pk: PlatformKey;
  costINR: { min: number; max: number };
  costDisplay: { min: number; max: number; currency: CurrencyCode };
  stack: StackTemplate;
  externals: { key: string; label: string; cost: string }[];
  hosting: { key: string; label: string; cost: string }[];
  selectedFeatures: { key: FeatureKey; label: string; base_md: number }[];
  summarySentence: string;
  rangeExplainer: string;
}

export function computeEstimate(a: Answers, currency: CurrencyCode): Estimate {
  const pk = platformKey(a);
  const platMult = MULTIPLIERS.platform[pk];
  const designMult = MULTIPLIERS.design[a.design ?? "custom_simple"];
  const scaleMult = MULTIPLIERS.scale[a.scale ?? "1k_10k"];
  const launch = a.launch ?? "4_6_months";
  const rush = MULTIPLIERS.rush[launch];

  const sel = selectedFeatures(a);
  const compMult = MULTIPLIERS.compliance[complianceLevelFromCaps(sel)];

  const baseMD = sel
    .map((k) => FEATURES[k]?.base_md ?? 0)
    .reduce((a, b) => a + b, 0);

  const adjusted = baseMD * designMult * scaleMult * compMult * platMult;
  const withOverhead = adjusted * (1 + MULTIPLIERS.fixed_overhead_pct);
  const rawMD = withOverhead * rush.cost; // used for cost calc only

  // EFFORT_CALIBRATION (0.65) reduces displayed man-months and timeline so
  // they match how we actually plan projects (parallel streams, not raw hours).
  // COST_CALIBRATION (0.6) tunes the cost output to match real scoping
  // quotes. The cost calc still uses rawMD, so reducing effort does NOT
  // reduce cost — effective rate per displayed man-month goes up
  // proportionally, which is the desired behaviour.
  const EFFORT_CALIBRATION = 0.65;
  const COST_CALIBRATION = 0.6;
  const totalMD = +(rawMD * EFFORT_CALIBRATION).toFixed(2);

  // Timeline uses displayed man-months
  const teamSize = pickTeamSize(totalMD, a.platforms);
  const parallelisable = totalMD * MULTIPLIERS.parallelism_factor;
  let calendarMonths = parallelisable / teamSize;
  calendarMonths = +(calendarMonths * rush.timeline).toFixed(1);
  if (calendarMonths < 1) calendarMonths = 1;

  // Cost uses rawMD so absolute cost is unaffected by EFFORT_CALIBRATION
  const labourINR =
    rawMD *
    RATES.blended_day_rate *
    RATES.working_days_per_month *
    COST_CALIBRATION;
  const costINR = {
    min: Math.round(labourINR * MULTIPLIERS.cost_range.min),
    max: Math.round(labourINR * MULTIPLIERS.cost_range.max),
  };

  // Cost in display currency
  const fx = CURRENCIES.fx_from_inr[currency];
  const costDisplay = {
    min: Math.round(costINR.min * fx),
    max: Math.round(costINR.max * fx),
    currency,
  };

  const includesMobile = a.platforms.some((p) => p === "ios" || p === "android");
  const breakdown = roleBreakdown(totalMD, includesMobile);

  const stack = pickStack(a);

  // Externals — convert INR ranges into the user's display currency
  const selSet = new Set(sel);
  const externals: Estimate["externals"] = [];
  for (const [key, ext] of Object.entries(EXTERNALS)) {
    if (!ext.applies_when(selSet)) continue;
    let cost: string;
    if (ext.transactional) {
      // Transactional descriptors stay verbatim — they express percentages,
      // not absolute amounts.
      cost = ext.transactional;
    } else if (ext.tiers && a.scale) {
      const tier =
        a.scale === "under_1k" || a.scale === "1k_10k"
          ? ext.tiers.low
          : a.scale === "10k_100k"
            ? ext.tiers.med
            : ext.tiers.high;
      cost = formatRange(tier, currency);
    } else if (ext.tiers) {
      cost = formatRange(ext.tiers.low, currency);
    } else {
      cost = "";
    }
    externals.push({ key, label: ext.label, cost });
  }

  // Hosting tiers — same conversion
  const hosting = HOSTING_TIERS.map((h) => ({
    key: h.key,
    label: h.label,
    cost: formatRange(h.monthly, currency),
  }));

  // Selected features metadata
  const selectedFeatureMeta = sel
    .map((k) => FEATURES[k])
    .filter(Boolean)
    .map((f) => ({ key: f.key, label: f.label, base_md: f.base_md }));

  // Summary sentence
  const summary = summarise({
    a,
    totalMD,
    calendarMonths,
    cost: costDisplay,
    archetypeLabel: ARCHETYPES[a.archetype ?? "not_sure"]?.label ?? "Software product",
  });

  const rangeExplainer =
    "The lower end assumes lean MVP scope, fewer revisions, and disciplined feature freeze. The upper end factors in scope creep on the modules you've selected, more design iterations, and additional QA rounds. We sharpen the number to a fixed quote after a 30-minute scoping call.";

  return {
    totalMD,
    breakdown,
    calendarMonths,
    teamSize,
    pk,
    costINR,
    costDisplay,
    stack,
    externals,
    hosting,
    selectedFeatures: selectedFeatureMeta,
    summarySentence: summary,
    rangeExplainer,
  };
}

function pickTeamSize(totalMD: number, platforms: Platform[]): number {
  // Reasonable team sizes given man-month range
  const includesMobile = platforms.some((p) => p === "ios" || p === "android");
  const includesWeb = platforms.includes("web");
  let base = 3;
  if (totalMD > 8) base = 4;
  if (totalMD > 16) base = 5;
  if (totalMD > 28) base = 6;
  if (includesMobile && includesWeb) base += 1;
  return base;
}

function summarise(args: {
  a: Answers;
  totalMD: number;
  calendarMonths: number;
  cost: { min: number; max: number; currency: CurrencyCode };
  archetypeLabel: string;
}): string {
  const platforms = args.a.platforms.length
    ? args.a.platforms
        .map((p) => (p === "ios" ? "iOS" : p === "android" ? "Android" : "web"))
        .join(" + ")
    : "web";
  const approach =
    args.a.mobile_approach === "native"
      ? " (native)"
      : args.a.mobile_approach === "cross_platform"
      ? " (cross-platform)"
      : "";
  const featureBits: string[] = [];
  if (args.a.features.includes("payments") || args.a.capabilities.includes("payments")) featureBits.push("payments");
  if (args.a.capabilities.includes("ai_llm") || args.a.capabilities.includes("ai_agents")) featureBits.push("AI features");
  if (args.a.features.includes("multi_tenant")) featureBits.push("multi-tenant");
  if (args.a.features.includes("marketplace_core")) featureBits.push("marketplace");
  const features = featureBits.length ? `, with ${featureBits.join(" and ")}` : "";

  const cost = `${formatCurrency(args.cost.min, args.cost.currency)}–${formatCurrency(args.cost.max, args.cost.currency)}`;
  return `${args.archetypeLabel} on ${platforms}${approach}${features}, ~${args.totalMD} man-months, ${args.calendarMonths.toFixed(1)}-month timeline, ${cost}.`;
}

// ---------------------------------------------------------------------------
// CURRENCY FORMATTING
// ---------------------------------------------------------------------------

export function formatCurrency(amount: number, currency: CurrencyCode): string {
  const cfg = CURRENCIES.format[currency];
  if (cfg.lakh_crore) {
    if (amount >= 10_000_000) {
      return `${cfg.symbol}${(amount / 10_000_000).toFixed(2)} Cr`;
    }
    if (amount >= 100_000) {
      return `${cfg.symbol}${(amount / 100_000).toFixed(1)}L`;
    }
    if (amount >= 1000) {
      return `${cfg.symbol}${(amount / 1000).toFixed(0)}k`;
    }
    return `${cfg.symbol}${Math.round(amount).toLocaleString("en-IN")}`;
  }
  if (amount >= 1_000_000) {
    return `${cfg.symbol}${(amount / 1_000_000).toFixed(1)}M`;
  }
  if (amount >= 10_000) {
    return `${cfg.symbol}${(amount / 1000).toFixed(0)}k`;
  }
  return `${cfg.symbol}${Math.round(amount).toLocaleString("en-US")}`;
}

// Format an INR range in the user's display currency.
// Returns "<min>–<max>" or "<min>+" if the range is open-ended at the high end.
export function formatRange(range: Range, currency: CurrencyCode): string {
  const fx = CURRENCIES.fx_from_inr[currency];
  const minDisplay = range.min * fx;
  const maxDisplay = range.max * fx;
  if (range.min === range.max && range.openEnded) {
    return `${formatCurrency(minDisplay, currency)}+`;
  }
  if (range.min === 0 && range.max === 0) {
    return formatCurrency(0, currency);
  }
  const lo = formatCurrency(minDisplay, currency);
  const hi = formatCurrency(maxDisplay, currency);
  return range.openEnded ? `${lo}–${hi}+` : `${lo}–${hi}`;
}

// ---------------------------------------------------------------------------
// CURRENCY GEO DETECTION
// ---------------------------------------------------------------------------

export async function detectCurrencyFromGeo(): Promise<CurrencyCode> {
  try {
    const res = await fetch("https://ipapi.co/json/", { cache: "force-cache" });
    if (!res.ok) throw new Error("ipapi failed");
    const data = await res.json();
    const code = (data?.country_code as string | undefined)?.toUpperCase();
    if (code && code in CURRENCIES.geo_map) {
      const c = CURRENCIES.geo_map[code];
      return c === "default" ? "GBP" : c;
    }
  } catch {
    // ignore — any failure (offline, blocked, rate-limited) falls through to GBP
  }
  return "GBP";
}

// ---------------------------------------------------------------------------
// LOCAL STORAGE — autosave wizard progress
// ---------------------------------------------------------------------------

const STORAGE_KEY = "appycodes.estimator.draft.v1";

export function saveDraft(data: { answers: Answers; step: number; currency: CurrencyCode }) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...data, savedAt: Date.now() }));
  } catch {
    // ignore
  }
}

export function loadDraft(): { answers: Answers; step: number; currency: CurrencyCode } | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || !parsed.answers) return null;
    return { answers: parsed.answers, step: parsed.step ?? 0, currency: parsed.currency ?? "GBP" };
  } catch {
    return null;
  }
}

export function clearDraft() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}
