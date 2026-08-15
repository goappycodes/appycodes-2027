// Shared data + JSON-LD builders for blog post pages.
// Ported from the old site's authors.ts / blogSchema.ts, trimmed to what the
// Next.js posts actually use. Keep author wording in sync with the About page.

import { SEO_BASE } from "@/lib/seo";
import { ORG_ID, PERSON_ID, WEBSITE_ID } from "@/lib/schema";

export type Author = {
  shortName: string;
  fullName: string;
  jobTitle: string;
  imageUrl?: string;
  linkedin?: string;
  alumniOf: string[];
  url: string;
};

export const RITESH: Author = {
  shortName: "Ritesh",
  fullName: "Ritesh Agarwal",
  jobTitle: "Founding Partner",
  imageUrl: `${SEO_BASE}/images/ritesh.jpg`,
  linkedin: "https://www.linkedin.com/in/agrites/",
  alumniOf: ["IIM Bangalore", "IIT Bombay"],
  url: `${SEO_BASE}/about/`,
};

/** Person JSON-LD node, optionally without @context for inlining. */
export function personSchema(a: Author, inline = false) {
  const node: Record<string, unknown> = {
    ...(inline ? {} : { "@context": "https://schema.org" }),
    "@type": "Person",
    name: a.fullName,
    jobTitle: a.jobTitle,
    url: a.url,
    worksFor: { "@id": ORG_ID },
  };
  if (a.imageUrl) node.image = a.imageUrl;
  if (a.alumniOf.length > 0) {
    node.alumniOf = a.alumniOf.map((school) => ({
      "@type": "EducationalOrganization",
      name: school,
    }));
  }
  if (a.linkedin) node.sameAs = [a.linkedin];
  return node;
}

/** Rough word count from "8 min read" at ~225 wpm, for BlogPosting wordCount. */
export function wordCountFromReadTime(readTime: string): number {
  const mins = parseInt(readTime, 10);
  return Number.isFinite(mins) ? mins * 225 : 0;
}

export type FaqPair = { q: string; a: string };

/**
 * Build the full JSON-LD array for a blog post:
 * BlogPosting + BreadcrumbList + Person + Organization (+ FAQPage when given).
 */
export function buildPostSchemas(opts: {
  title: string;
  description: string;
  path: string; // e.g. "/blog/slug/"
  image: string; // absolute or root-relative
  publishedISO: string;
  modifiedISO?: string;
  readTime: string;
  breadcrumbLabel: string;
  keywords?: string;
  author?: Author;
  faqs?: FaqPair[];
}) {
  const author = opts.author ?? RITESH;
  const isGlobalAuthor = author === RITESH;
  const canonical = `${SEO_BASE}${opts.path}`;
  const image = opts.image.startsWith("http") ? opts.image : `${SEO_BASE}${opts.image}`;
  // First keyword doubles as the article section when present.
  const articleSection = opts.keywords?.split(",")[0]?.trim();

  const blogPosting: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: opts.title,
    description: opts.description,
    image,
    inLanguage: "en-GB",
    datePublished: opts.publishedISO,
    dateModified: opts.modifiedISO ?? opts.publishedISO,
    wordCount: wordCountFromReadTime(opts.readTime),
    // Reference the canonical entities by @id (defined site-wide in the root
    // layout) so the post resolves to the same author and publisher everywhere.
    author: isGlobalAuthor ? { "@id": PERSON_ID } : personSchema(author, true),
    publisher: { "@id": ORG_ID },
    isPartOf: { "@id": WEBSITE_ID },
    mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
  };
  if (articleSection) blogPosting.articleSection = articleSection;
  if (opts.keywords) blogPosting.keywords = opts.keywords;

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SEO_BASE}/` },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SEO_BASE}/blog/` },
      { "@type": "ListItem", position: 3, name: opts.breadcrumbLabel, item: canonical },
    ],
  };

  // Organization, founder and WebSite come from the site-wide graph; only emit a
  // standalone author node here when the post uses a non-default author.
  const schemas: Record<string, unknown>[] = [blogPosting, breadcrumb];
  if (!isGlobalAuthor) schemas.push(personSchema(author));

  if (opts.faqs && opts.faqs.length > 0) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: opts.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
  }

  return schemas;
}
