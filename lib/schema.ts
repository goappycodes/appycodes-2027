import { SITE } from "@/lib/site";

// Canonical entity @ids used by JSON-LD across the site.
export const BASE = SITE.url;
export const ORG_ID = `${BASE}/#organization`;
export const PERSON_ID = `${BASE}/#ritesh-agarwal`;
export const WEBSITE_ID = `${BASE}/#website`;

/** BreadcrumbList from an ordered list of {name, path} — path relative to BASE. */
export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${BASE}${it.path}`,
    })),
  };
}

/** FAQPage for the question/answer blocks on service pages. */
export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

/** Service node for a pillar or specialism page. */
export function serviceSchema(opts: {
  name: string;
  description: string;
  path: string;
  image?: string;
  serviceType?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    description: opts.description,
    url: `${BASE}${opts.path}`,
    ...(opts.image ? { image: `${BASE}${opts.image}` } : {}),
    ...(opts.serviceType ? { serviceType: opts.serviceType } : {}),
    provider: { "@id": ORG_ID },
    areaServed: ["GB", "US", "EU", "IN"],
  };
}
