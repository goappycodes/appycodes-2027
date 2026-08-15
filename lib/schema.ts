import { SITE } from "@/lib/site";

// Canonical entity @ids used by JSON-LD across the site.
export const BASE = SITE.url;
export const ORG_ID = `${BASE}/#organization`;
export const PERSON_ID = `${BASE}/#ritesh-agarwal`;
export const WEBSITE_ID = `${BASE}/#website`;

/**
 * The site-wide entity graph, rendered once in the root layout. Every page's
 * JSON-LD refers to these by @id — blog posts for author and publisher, service
 * pages for provider — so they have to exist on the page for the reference to
 * resolve.
 */
export function siteGraph(opts: { email: string; founded: number }) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": ORG_ID,
        name: "Appycodes",
        url: `${BASE}/`,
        email: opts.email,
        foundingDate: String(opts.founded),
        logo: { "@type": "ImageObject", url: `${BASE}/favicon.png` },
        description:
          "Senior product engineering for companies that have outgrown off-the-shelf. Web platforms, mobile apps and AI systems, shipping in production since 2015.",
        areaServed: ["GB", "US", "EU", "IN"],
        founder: { "@id": PERSON_ID },
      },
      {
        "@type": "Person",
        "@id": PERSON_ID,
        name: "Ritesh Agarwal",
        jobTitle: "Founding Partner",
        url: `${BASE}/about/`,
        image: `${BASE}/images/ritesh.jpg`,
        worksFor: { "@id": ORG_ID },
        sameAs: ["https://www.linkedin.com/in/agrites/"],
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        name: "Appycodes",
        url: `${BASE}/`,
        inLanguage: "en-GB",
        publisher: { "@id": ORG_ID },
      },
    ],
  };
}

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
