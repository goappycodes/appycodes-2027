import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

// AI answer-engine and search crawlers we explicitly welcome. Being explicit
// (rather than relying on the "*" default) makes the intent unambiguous and
// keeps these agents allowed even if a blanket disallow is ever added.
const AI_AND_SEARCH_BOTS = [
  "GPTBot", // OpenAI training/index
  "OAI-SearchBot", // ChatGPT search
  "ChatGPT-User", // ChatGPT live browsing
  "ClaudeBot", // Anthropic
  "Claude-Web",
  "anthropic-ai",
  "PerplexityBot", // Perplexity
  "Perplexity-User",
  "Google-Extended", // Gemini / AI Overviews training
  "Googlebot",
  "Applebot-Extended", // Apple Intelligence
  "Bingbot",
  "CCBot", // Common Crawl (feeds many LLMs)
  "cohere-ai",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      ...AI_AND_SEARCH_BOTS.map((userAgent) => ({ userAgent, allow: "/", disallow: "/admin/" })),
      // The internal indexing report lives under /admin/ — kept out of every index.
      { userAgent: "*", allow: "/", disallow: "/admin/" },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
