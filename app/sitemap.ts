import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { SERVICES_DATA } from "@/lib/services-data";
import { SUB_SERVICES_DATA } from "@/lib/sub-services-data";
import { SECTORS_DATA } from "@/lib/sectors-data";
import { BLOG_POSTS } from "@/lib/blog";

const CASE_STUDIES = ["creoate", "easyship", "decofetch", "leonia", "plusheat", "shutters365", "ba-engine-room", "bloc-ads-manager", "ontick", "bloc", "zonely", "player-profile-hub", "deepspatial", "yippee-malta", "professional-energy"];

const STATIC_PAGES: { path: string; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number }[] = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/services/", changeFrequency: "monthly", priority: 0.9 },
  { path: "/case-studies/", changeFrequency: "monthly", priority: 0.8 },
  { path: "/sectors/", changeFrequency: "monthly", priority: 0.9 },
  { path: "/atlas/", changeFrequency: "monthly", priority: 0.7 },
  { path: "/blog/", changeFrequency: "weekly", priority: 0.8 },
  { path: "/reviews/", changeFrequency: "monthly", priority: 0.6 },
  { path: "/year-four/", changeFrequency: "monthly", priority: 0.7 },
  { path: "/about/", changeFrequency: "yearly", priority: 0.6 },
  { path: "/contact/", changeFrequency: "yearly", priority: 0.7 },
  { path: "/privacy/", changeFrequency: "yearly", priority: 0.3 },
  { path: "/terms/", changeFrequency: "yearly", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url;
  const now = new Date();
  const url = (path: string) => `${base}${path}`;

  return [
    ...STATIC_PAGES.map((p) => ({
      url: url(p.path),
      lastModified: now,
      changeFrequency: p.changeFrequency,
      priority: p.priority,
    })),
    // Pillar service pages
    ...SERVICES_DATA.map((s) => ({
      url: url(`/services/${s.slug}/`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    // Original service pages, carried over at their existing URLs
    ...SUB_SERVICES_DATA.map((s) => ({
      url: url(`/services/${s.slug}/`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    // Sector pages
    ...SECTORS_DATA.map((s) => ({
      url: url(`/sectors/${s.slug}/`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    // Case studies
    ...CASE_STUDIES.map((slug) => ({
      url: url(`/case-studies/${slug}/`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    // Blog posts, dated from their published date
    ...BLOG_POSTS.map((p) => ({
      url: url(`/blog/${p.slug}/`),
      lastModified: new Date(p.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
