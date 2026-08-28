import {
  LEGACY_SERVICE_LABELS,
  LEGACY_SERVICE_REDIRECTS,
  SERVICES_DATA,
  type ServiceData,
} from "@/lib/services-data";
import subServices from "@/lib/sub-services.json";

// The original ("legacy") service pages, rebuilt at their existing URLs to
// retain SEO. Each sits under one of the six pillar services; its parent is
// derived from LEGACY_SERVICE_REDIRECTS so there is a single source of truth.
export type SubServiceData = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  headline: string;
  intro: string[];
  points: { title: string; body: string }[];
  faqs: { question: string; answer: string }[];
};

// Content carried over from the original appycodes.dev service pages, rebuilt
// at their existing URLs so the SEO on each one is retained.
export const SUB_SERVICES_DATA: SubServiceData[] = subServices as SubServiceData[];

export function subServiceBySlug(slug: string): SubServiceData | null {
  return SUB_SERVICES_DATA.find((x) => x.slug === slug) ?? null;
}

/** The pillar service a given sub-service belongs to. */
export function pillarFor(slug: string): ServiceData | null {
  const parent = LEGACY_SERVICE_REDIRECTS[slug];
  if (!parent) return null;
  return SERVICES_DATA.find((s) => s.slug === parent) ?? null;
}

/** The other sub-services under the same pillar, for cross-linking. */
export function siblingsFor(slug: string): { slug: string; label: string }[] {
  const parent = LEGACY_SERVICE_REDIRECTS[slug];
  if (!parent) return [];
  return Object.entries(LEGACY_SERVICE_REDIRECTS)
    .filter(([s, p]) => p === parent && s !== slug && LEGACY_SERVICE_LABELS[s])
    .map(([s]) => ({ slug: s, label: LEGACY_SERVICE_LABELS[s] }));
}
