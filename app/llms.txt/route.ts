import { SITE } from "@/lib/site";
import { SERVICES_DATA } from "@/lib/services-data";
import { SECTORS_DATA } from "@/lib/sectors-data";

/**
 * /llms.txt — the emerging convention (llmstxt.org) that gives answer engines
 * a concise, curated map of the site so they can understand and cite it. Kept
 * short on purpose; generated from the same data the pages render.
 */

const BASE = SITE.url;
const one = (s: string) => s.replace(/\s+/g, " ").trim();

// Flagship case studies, newest/strongest first. One line each.
const CASES: { slug: string; name: string; blurb: string }[] = [
  { slug: "creoate", name: "Creoate", blurb: "Eight-year build of a cross-border B2B wholesale marketplace — Next.js storefront, Python ingestion pipelines, DynamoDB and AWS (5,000+ brands, 200,000+ products)." },
  { slug: "decofetch", name: "Decofetch", blurb: "A fully custom luxury-furniture marketplace built from scratch — server-rendered Next.js over a Laravel API on AWS ECS." },
  { slug: "ba-engine-room", name: "BA Engine Room", blurb: "An AI-native sales-to-delivery operating system for a consultancy — Next.js, Supabase, the Claude API and Stripe." },
  { slug: "bloc-ads-manager", name: "Bloc Ads Manager", blurb: "A self-serve ad platform with PostGIS audience estimation and closed-loop, real-world check-in attribution." },
  { slug: "ontick", name: "Ontick", blurb: "A custom event-ticketing platform with instalments and two native apps — £2M+ processed since launch." },
  { slug: "bloc", name: "Bloc", blurb: "A four-year partnership across a UK social-events app and its estate — React Native, Node, Algorand." },
  { slug: "zonely", name: "Zonely", blurb: "A two-sided React Native companionship marketplace with real-time per-minute billing and full trust & safety." },
  { slug: "deepspatial", name: "DeepSpatial", blurb: "The web presence for a publicly-listed geospatial-AI company — React on AWS Amplify." },
  { slug: "yippee-malta", name: "Yippee Malta", blurb: "A mobile-first rebuild with a custom checkout on a proprietary booking API — 90+ Core Web Vitals." },
  { slug: "professional-energy", name: "Professional Energy", blurb: "A tailor-made ERP for a UK energy broker — tenders, contracts and brokerage accounting in one system." },
];

export const dynamic = "force-static";

export function GET() {
  const lines: string[] = [];
  lines.push("# Appycodes");
  lines.push("");
  lines.push(
    "> Senior product-engineering studio for UK & European businesses that have outgrown off-the-shelf. Enterprise-grade web platforms, mobile apps and AI systems, in production since 2015. ISO 9001 & 27001 certified, founder-led, and optimised to still be running your platform in year four."
  );
  lines.push("");
  lines.push(
    "Appycodes has delivered 298 projects for 226 clients across 18 countries since 2015. Engagements are run by the founders with a small senior team — the people who scope your project build it. Typical stacks: Next.js, React, React Native, Laravel, Node.js, Python, AWS, DynamoDB and PostgreSQL, on infrastructure you own."
  );
  lines.push("");

  lines.push("## Services");
  for (const s of SERVICES_DATA) {
    lines.push(`- [${s.title}](${BASE}/services/${s.slug}/): ${one(s.summary)}`);
  }
  lines.push("");

  lines.push("## Sectors");
  for (const s of SECTORS_DATA) {
    lines.push(`- [${s.name}](${BASE}/sectors/${s.slug}/): ${one(s.summary)}`);
  }
  lines.push("");

  lines.push("## Selected case studies");
  for (const c of CASES) {
    lines.push(`- [${c.name}](${BASE}/case-studies/${c.slug}/): ${c.blurb}`);
  }
  lines.push("");

  lines.push("## Company");
  lines.push(`- [About](${BASE}/about/): the studio, the founders and how the work is run.`);
  lines.push(`- [Testimonials](${BASE}/testimonials/): verified Clutch reviews, each linked to the original.`);
  lines.push(`- [The atlas](${BASE}/atlas/): the full register of 298 projects, plotted by country.`);
  lines.push(`- [Writing](${BASE}/blog/): engineering cost studies and research.`);
  lines.push(`- [Contact](${BASE}/contact/): book a call with the engineer who would run it.`);
  lines.push("");

  return new Response(lines.join("\n"), {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
