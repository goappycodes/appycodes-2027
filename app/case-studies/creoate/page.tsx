import type { Metadata } from "next";
import { siteMeta } from "@/lib/seo";
import { CaseStudy, type CaseStudyData } from "@/components/case-study";

export const metadata: Metadata = siteMeta({
  title: "Creoate — eight years building a B2B wholesale marketplace",
  description:
    "How we design, build and run the Next.js storefront, Python ingestion pipelines, DynamoDB layer and AWS infrastructure behind Creoate — a cross-border B2B wholesale marketplace of 5,000+ brands and 200,000+ products.",
  path: "/case-studies/creoate/",
  image: "/images/creoate-featured.png",
});

const data: CaseStudyData = {
  crumb: "Creoate",
  path: "/case-studies/creoate/",
  title: (
    <>
      <span className="name">Creoate</span> — eight years on a <span className="caps">B2B</span> wholesale
      marketplace built to scale.
    </>
  ),
  lede:
    "One team, eight years. We run the Next.js storefront, the Python ingestion pipelines, the DynamoDB data layer and the AWS infrastructure behind a cross-border wholesale marketplace of 5,000+ brands and 200,000+ products.",
  facts: [
    { label: "Client", value: "Creoate, B2B wholesale marketplace" },
    { label: "Sector", value: "Wholesale commerce — UK, EU, US" },
    { label: "Engagement", value: "8+ years, ongoing" },
    { label: "Owned", value: "Storefront, commerce engine, data pipelines, infra" },
  ],
  links: [
    { label: "creoate.com", href: "https://www.creoate.com/" },
    { label: "about creoate", href: "https://www.creoate.com/about" },
  ],
  stats: [
    { n: "8+ yrs", label: "one team, still shipping" },
    { n: "200K+", label: "products in the live catalog" },
    { n: "5,000+", label: "independent brands onboarded" },
    { n: "10", label: "countries on one platform" },
  ],
  blocks: [
    {
      t: "gallery",
      title: "the buyer’s storefront.",
      shots: [
        { src: "/images/creoate-marketplace.jpg", alt: "Creoate wholesale product grid with trade pricing gated behind registration" },
        { src: "/images/creoate-catalog.jpg", alt: "Creoate category mega-navigation across the catalogue" },
        { src: "/images/creoate-collection.jpg", alt: "A curated Creoate collection landing page" },
      ],
    },
    {
      t: "section",
      title: "strangling the monolith, route by route.",
      lead:
        "Creoate began life on a WooCommerce monolith. Rather than gamble on a big-bang rewrite, we stood up a Next.js platform in front of it and moved the marketplace across one route at a time — catalogue, collections, account, checkout — until the new app owned the traffic and the old system quietly retired behind it. No dark weekend, no frozen roadmap.",
    },
    {
      t: "cards",
      title: "the systems we run.",
      lead:
        "Not a website — a working marketplace with buyers, sellers, money and stock moving through it every hour of the day. These are the surfaces we own end to end.",
      items: [
        {
          title: "The storefront — Next.js",
          body: "Server-rendered App Router pages over a 200K-product catalogue, built for crawlability and speed. The Next.js platform now fronts the marketplace and has progressively replaced the legacy monolith.",
        },
        {
          title: "Catalogue ingestion — Python",
          body: "Python services normalise, de-duplicate and enrich supplier feeds, then fan out through AWS Lambda so 5,000+ brands stay in sync across currencies, countries and channels.",
        },
        {
          title: "The data layer — DynamoDB",
          body: "Amazon DynamoDB backs the hot read paths — catalogue, accounts, ordering — so pages stay fast as the dataset grows into tens of millions of rows.",
        },
        {
          title: "Media at scale — AWS",
          body: "An AWS pipeline — Lambda, S3 and CloudFront — optimises every product image on the fly to WebP, keeping page weight down across hundreds of thousands of listings.",
        },
        {
          title: "B2B payments",
          body: "Wholesale is not retail: multi-currency checkout, order recalculation, Stripe and Hokodo net terms, and the reconciliation jobs that keep the ledger honest.",
        },
        {
          title: "Ops & observability",
          body: "GitLab CI, Cronicle-scheduled jobs, Teleport-gated access, and Atatus, Grafana and PostHog watching every path — so a marketplace running 24/7 across time zones stays up.",
        },
      ],
    },
    {
      t: "gallery",
      title: "mobile-first, where the buyers actually are.",
      shots: [
        { src: "/images/creoate-mobile-collection.jpg", alt: "Creoate curated collection on mobile" },
        { src: "/images/creoate-mobile-home.jpg", alt: "Creoate mobile home with trending searches and brands on repeat" },
        { src: "/images/creoate-login.jpg", alt: "Creoate account sign-in with magic-link login" },
      ],
    },
  ],
  tech: ["nextjs", "python", "dynamodb", "aws"],
  stack: [
    { layer: "Storefront", value: "Next.js (App Router, SSR/ISR) — the platform that fronts the marketplace" },
    { layer: "Data", value: "Amazon DynamoDB on the hot paths, MySQL for legacy commerce" },
    { layer: "Services", value: "Python ingestion & catalogue pipelines, PHP/Node microservices" },
    { layer: "Media", value: "AWS Lambda + S3 + CloudFront — on-the-fly WebP optimisation" },
    { layer: "Payments", value: "Stripe and Hokodo net terms, multi-currency, instalments" },
    { layer: "Infra & DevOps", value: "AWS, GitLab CI, Cronicle, Cloudflare, Teleport" },
    { layer: "Observability", value: "Atatus APM, Grafana, PostHog" },
  ],
  outcomes: [
    "Eight years in, still the team that designs, builds and runs the platform — not a rebuild-and-leave.",
    "The legacy monolith strangled route by route onto Next.js — no big-bang cutover, no frozen roadmap.",
    "A Python + Lambda ingestion pipeline keeping 200K+ products and 5,000+ brands in sync across the UK, EU and US.",
    "DynamoDB on the hot paths, so catalogue and account pages stay fast as the data grows past tens of millions of rows.",
    "An on-the-fly AWS media pipeline serving optimised WebP for every one of hundreds of thousands of product images.",
    "B2B payments hardened end to end — multi-currency, Stripe, Hokodo net terms, and the reconciliation that keeps the books right.",
  ],
  cta: "want the team that will still be running it in year eight?",
};

export default function CreoateCaseStudy() {
  return <CaseStudy data={data} />;
}
