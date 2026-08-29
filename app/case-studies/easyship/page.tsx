import type { Metadata } from "next";
import { siteMeta } from "@/lib/seo";
import { CaseStudy, type CaseStudyData } from "@/components/case-study";

export const metadata: Metadata = siteMeta({
  title: "Easyship — the embedded engineering team behind a global shipping platform's site",
  description:
    "We are the embedded engineering team behind Easyship's public site and CMS — a server-rendered Nuxt/Vue application on Google Cloud: the shipping-rate and tax & duty calculators, thousands of programmatic courier pages, a MongoDB CMS, and the reliability and security work behind a high-traffic marketing site.",
  path: "/case-studies/easyship/",
  image: "/images/easyship-featured.png",
});

const data: CaseStudyData = {
  crumb: "Easyship",
  path: "/case-studies/easyship/",
  title: (
    <>
      the embedded team behind <span className="name">Easyship</span>&rsquo;s site and{" "}
      <span className="caps">CMS</span>.
    </>
  ),
  lede:
    "Easyship helps merchants compare 550+ couriers and ship to 220+ countries. We are the senior engineering team behind its public site and content platform — a server-rendered Nuxt/Vue application on Google Cloud — shipping features, technical SEO, reliability and security straight into the client's own repositories, alongside their team across Hong Kong, the US and India.",
  facts: [
    { label: "Client", value: "Easyship — global shipping & logistics" },
    { label: "Sector", value: "Logistics SaaS · marketing site & CMS" },
    { label: "Engagement", value: "Embedded team, ongoing since 2025" },
    { label: "Team", value: "Cross-geographic — India ↔ Hong Kong & US" },
    { label: "Owned", value: "Calculators, courier pages, CMS, SEO, reliability" },
  ],
  links: [{ label: "Easyship.com", href: "https://www.easyship.com/" }],
  stats: [
    { n: "550+", label: "couriers on the rate calculator" },
    { n: "220+", label: "destinations quoted" },
    { n: "SSR", label: "Nuxt/Vue, built to index" },
    { n: "2025", label: "embedded in the team since" },
  ],
  blocks: [
    {
      t: "figure",
      src: "/images/easyship-featured.png",
      alt: "Easyship shipping rate calculator across desktop, tablet and mobile",
      caption:
        "The shipping-rate calculator and courier comparison — one of the highest-traffic surfaces on easyship.com, and one we build and keep running.",
    },
    {
      t: "section",
      title: "a senior pair of hands inside a global team.",
      lead:
        "Easyship already had an engineering organisation across three continents. What they needed was not a vendor to hand a spec to, but engineers who could work the way their own team does — inside their repositories, through their review and deploy pipeline, on the parts of the product that decide whether a shipper ever signs up. We took ownership of the public site and its CMS: a server-rendered Nuxt/Vue application, a MongoDB content layer, and the calculators and courier pages that pull people in from search. Every change ships as a reviewed pull request into Easyship's own GitHub, promoted develop → staging → production.",
    },
    {
      t: "cards",
      title: "what we build and keep running.",
      lead:
        "A marketing site at this scale is a real application — calculators wired to live rate APIs, thousands of pages rendered for search, and a content layer the team can update without a developer.",
      items: [
        {
          title: "Shipping rate calculator",
          body: "The calculator that compares 550+ couriers by price, speed and rating across 220+ destinations — rebuilt and stabilised on desktop and mobile, wired to Easyship's live rate APIs.",
        },
        {
          title: "Tax & duty calculator",
          body: "Landed-cost estimates for cross-border shipments — the duties-and-taxes API integrated and the country-by-country pages behind it debugged and made reliable.",
        },
        {
          title: "Programmatic courier pages",
          body: "Thousands of courier, comparison and country pages rendered server-side so Google sees real content, not an empty Vue shell — the traffic engine of the whole site.",
        },
        {
          title: "MongoDB CMS + import pipeline",
          body: "A repeatable CSV → MongoDB pipeline so the team refreshes courier data, translations and content themselves — no developer in the loop for a routine update.",
        },
        {
          title: "Technical SEO at scale",
          body: "SSR rendering, sitemaps, hreflang, canonical URLs and a redirection strategy — the difference between pages that index and pages that quietly 404 or 500.",
        },
        {
          title: "Reliability & security",
          body: "Production incidents closed — crash loops, 5xx spikes, Redis and Cloudflare issues — and security findings cleared: dependency vulnerabilities, cookie hardening and WAF rules.",
        },
      ],
    },
    {
      t: "gallery",
      title: "the pages that do the work, in production.",
      shots: [
        { src: "/images/easyship-calculator.jpg", alt: "Easyship shipping cost calculator with UPS, USPS and FedEx rate comparison" },
        { src: "/images/easyship-boxes.jpg", alt: "Easyship box-size and packaging guide page for US shipments" },
      ],
    },
    {
      t: "figure",
      src: "/images/easyship-mobile.jpg",
      alt: "Easyship shipping cost calculator on mobile",
      caption: "The calculator is rebuilt to work as well on a phone as on the desktop.",
      phone: true,
    },
  ],
  tech: ["nuxt", "node", "mongodb", "gcp", "cloudflare", "redis"],
  stack: [
    { layer: "Frontend", value: "Nuxt (Vue 3) — server-rendered, Pinia state" },
    { layer: "Backend", value: "Node — APIs and content services" },
    { layer: "Data / CMS", value: "MongoDB, updated via CSV import scripts" },
    { layer: "Cloud", value: "Google Cloud — Kubernetes, Cloud Storage, Redis" },
    { layer: "Edge", value: "Cloudflare — CDN, caching and WAF" },
    { layer: "Pipeline", value: "PR-reviewed, develop → staging → production" },
    { layer: "SEO", value: "SSR, sitemaps, hreflang and canonical URLs" },
  ],
  outcomes: [
    "Embedded in a global engineering team since 2025 — shipping into the client's own repositories through their review-and-deploy pipeline.",
    "The shipping-rate and tax & duty calculators rebuilt and stabilised across desktop and mobile.",
    "Thousands of programmatic courier and country pages rendered server-side so they index cleanly — 404s that used to 500, sitemaps, hreflang and canonicals all fixed.",
    "A repeatable CSV → MongoDB pipeline so the team refreshes courier data and translations without a developer.",
    "Production incidents closed on a Kubernetes-and-Cloudflare stack — crash loops, 5xx spikes, Redis and CDN issues.",
    "Security findings cleared — dependency vulnerabilities, cookie hardening and WAF rules — on a high-traffic public site.",
  ],
  cta: "need senior engineers who slot into your own team?",
};

export default function EasyshipCaseStudy() {
  return <CaseStudy data={data} />;
}
