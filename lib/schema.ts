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
        "@type": ["Organization", "ProfessionalService"],
        "@id": ORG_ID,
        name: "Appycodes",
        alternateName: "Appycodes Software Engineering",
        url: `${BASE}/`,
        email: opts.email,
        foundingDate: String(opts.founded),
        slogan: "Custom software for growing businesses.",
        logo: { "@type": "ImageObject", url: `${BASE}/favicon.png` },
        description:
          "Senior product engineering studio for UK and European businesses that have outgrown off-the-shelf — enterprise-grade web platforms, mobile apps and AI systems, in production since 2015.",
        areaServed: ["GB", "IE", "EU", "US", "IN"],
        knowsAbout: [
          "Custom software development",
          "Product engineering",
          "Multi-tenant SaaS platforms",
          "B2B marketplaces",
          "E-commerce and custom checkouts",
          "Event ticketing platforms",
          "AI systems and retrieval pipelines",
          "Next.js",
          "React and React Native",
          "Node.js",
          "Laravel",
          "Python",
          "AWS",
          "DynamoDB",
          "PostgreSQL",
          "Legacy rescue and hardening",
        ],
        award: [
          "ISO 9001 & ISO 27001 certified",
          "Clutch-reviewed development firm",
          "Recognised by Google, AWS and Startup India",
        ],
        contactPoint: {
          "@type": "ContactPoint",
          email: opts.email,
          contactType: "sales",
          areaServed: ["GB", "EU", "US"],
          availableLanguage: "en",
        },
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

/**
 * AggregateRating + individual Review nodes on the Organization, for the
 * testimonials page. Every review is a real, Clutch-verified client review; the
 * `url` on each points at the original on Clutch.
 */
export function reviewsSchema(
  reviews: {
    quote: string;
    name: string;
    role: string;
    iso: string;
    url: string;
  }[],
  rating: string,
) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: "Appycodes",
    url: `${BASE}/`,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: rating,
      reviewCount: reviews.length,
      bestRating: "5",
      worstRating: "1",
    },
    review: reviews.map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.name },
      datePublished: r.iso,
      reviewBody: r.quote,
      url: r.url,
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
        bestRating: "5",
        worstRating: "1",
      },
      itemReviewed: { "@id": ORG_ID },
      publisher: { "@type": "Organization", name: "Clutch" },
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
