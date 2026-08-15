import type { Metadata } from "next";

export const SEO_BASE = "https://appycodes.dev";

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  keywords?: string;
  publishedTime?: string;
  modifiedTime?: string;
  // tolerate any extra fields the ported pages pass
  [key: string]: unknown;
};

/**
 * Metadata for the site's own pages (everything that is not a ported article):
 * canonical, Open Graph and Twitter card, with the layout's "| Appycodes"
 * title template left in place.
 */
export function siteMeta(o: {
  title: string;
  description: string;
  path: string;
  image?: string;
  noindex?: boolean;
}): Metadata {
  const url = `${SEO_BASE}${o.path}`;
  const images = o.image ? [{ url: o.image }] : undefined;
  return {
    title: o.title,
    description: o.description,
    alternates: { canonical: url },
    ...(o.noindex ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      title: `${o.title} | Appycodes`,
      description: o.description,
      url,
      type: "website",
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: `${o.title} | Appycodes`,
      description: o.description,
      images: o.image ? [o.image] : undefined,
    },
  };
}

export function pageMeta(o: PageMetaInput): Metadata {
  const url = `${SEO_BASE}${o.path}`;
  const article =
    o.type === "article"
      ? { publishedTime: o.publishedTime, modifiedTime: o.modifiedTime }
      : undefined;
  // Ported titles already include "… | Appycodes"; bypass the layout template.
  return {
    title: { absolute: o.title },
    description: o.description,
    keywords: o.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: o.title,
      description: o.description,
      url,
      type: o.type ?? "website",
      images: o.image ? [{ url: o.image }] : undefined,
      ...(article ?? {}),
    },
    twitter: {
      card: "summary_large_image",
      title: o.title,
      description: o.description,
      images: o.image ? [o.image] : undefined,
    },
  };
}
