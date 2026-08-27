import type { Metadata } from "next";
import { siteMeta } from "@/lib/seo";
import { CaseStudy, type CaseStudyData } from "@/components/case-study";

export const metadata: Metadata = siteMeta({
  title: "Decofetch — a fully custom luxury furniture marketplace",
  description:
    "How we designed and built Decofetch from scratch — a server-rendered Next.js storefront over a custom Laravel API, a bespoke admin and AWS infrastructure, for a six-figure catalogue of designer furniture.",
  path: "/case-studies/decofetch/",
  image: "/images/decofetch-featured.png",
});

const data: CaseStudyData = {
  crumb: "Decofetch",
  path: "/case-studies/decofetch/",
  title: (
    <>
      <span className="name">Decofetch</span> — a luxury furniture marketplace, built from scratch.
    </>
  ),
  lede:
    "A designer-furniture marketplace built from the ground up: a server-rendered Next.js storefront over a custom Laravel API, a bespoke admin, and AWS infrastructure — tuned for a six-figure catalogue and the search engines that have to index it.",
  facts: [
    { label: "Client", value: "Decofetch, luxury furniture & décor" },
    { label: "Sector", value: "High-end e-commerce, UK" },
    { label: "Engagement", value: "Ground-up build, ongoing" },
    { label: "Owned", value: "Storefront, API, admin, AWS infra" },
  ],
  links: [
    { label: "decofetch.com", href: "https://www.decofetch.com/" },
    { label: "trade programme", href: "https://www.decofetch.com/trade" },
  ],
  stats: [
    { n: "0→live", label: "designed and built from scratch" },
    { n: "6K+", label: "pieces in a single category" },
    { n: "3", label: "custom surfaces: web, API, admin" },
    { n: "−40%", label: "infra cost, re-architected" },
  ],
  blocks: [
    {
      t: "gallery",
      title: "a storefront that sells five-figure furniture.",
      shots: [
        { src: "/images/decofetch-category.jpg", alt: "Decofetch living-room category with luxury furniture" },
        { src: "/images/decofetch-armchairs.jpg", alt: "Decofetch armchairs listing with filters" },
        { src: "/images/decofetch-product.jpg", alt: "Decofetch product detail page for a designer armchair" },
      ],
    },
    {
      t: "section",
      title: "we took over a stalled build, then re-architected it.",
      lead:
        "Decofetch came to us mid-flight — a previous developer had left an over-provisioned, expensive AWS setup that was hard to reason about. We split it into clean, separate services on AWS ECS behind a load balancer, put real deployment pipelines around it, and cut the monthly infrastructure bill by roughly 40%. Then we built the product itself properly: fully custom, front to back, no Shopify and no template underneath it.",
    },
    {
      t: "cards",
      title: "the systems we built.",
      lead:
        "A luxury catalogue is deceptively hard — thousands of high-value pieces, designer brands, made-to-order customization and buyers who expect a concierge. Every surface here is bespoke.",
      items: [
        {
          title: "Storefront — Next.js",
          body: "A server-rendered Next.js storefront over a six-figure catalogue, built so every product and brand page renders for crawlers with JavaScript disabled. SEO is a first-class feature here, not an afterthought.",
        },
        {
          title: "Commerce API — Laravel",
          body: "A custom Laravel API at api.decofetch.com powering catalogue, search, brands and artisans, cart and orders — plus the customization, appointment and white-glove-delivery requests. No off-the-shelf store engine.",
        },
        {
          title: "Bespoke admin",
          body: "A custom admin for the catalogue — brands, artisans, materials, labels, dimensions and merchandising — so the client runs the marketplace day to day without coming back to us.",
        },
        {
          title: "Media — S3 + Cloudinary",
          body: "Product imagery served from Amazon S3 in London through Cloudinary transforms, tuned for quality and load time across thousands of high-resolution shots, with Vimeo for artisan films.",
        },
        {
          title: "AWS infrastructure",
          body: "Separate ECS services for web, API and admin behind a load balancer, with CI deployment pipelines — the re-architecture that cut infra cost by about 40% and made releases boring.",
        },
        {
          title: "Feeds & discovery",
          body: "Sitemaps, structured data and product feeds into Google Merchant Center, Pinterest and Meta — the plumbing that gets a luxury catalogue found, indexed and shopped.",
        },
      ],
    },
    {
      t: "gallery",
      title: "built for the phone, too.",
      shots: [
        { src: "/images/decofetch-mobile-category.jpg", alt: "Decofetch category browsing on mobile" },
        { src: "/images/decofetch-collections.jpg", alt: "Decofetch luxury furniture collections on mobile" },
      ],
    },
  ],
  stack: [
    { layer: "Frontend", value: "Next.js — server-rendered storefront, SEO-first" },
    { layer: "API", value: "Laravel REST API (api.decofetch.com), MySQL" },
    { layer: "Admin", value: "Custom catalogue & merchandising admin" },
    { layer: "Media", value: "Amazon S3 (London) + Cloudinary transforms, Vimeo" },
    { layer: "Infra & DevOps", value: "AWS ECS services, load balancer, CI pipelines" },
    { layer: "Email & feeds", value: "Brevo / SendGrid; Google Merchant, Pinterest, Meta" },
  ],
  outcomes: [
    "A luxury furniture marketplace designed and built from scratch — no Shopify, no template, custom front to back.",
    "A stalled, over-provisioned build inherited and re-architected into clean AWS ECS services — infra cost cut by ~40%.",
    "A server-rendered Next.js storefront that renders every product and brand page for crawlers, not just browsers.",
    "A custom Laravel API and admin the client runs day to day — brands, artisans, materials, customization and white-glove requests.",
    "A media pipeline from S3 to Cloudinary that keeps thousands of high-resolution pieces sharp and fast.",
    "The discovery plumbing done properly: sitemaps, structured data and Merchant, Pinterest and Meta feeds for a catalogue that has to be found.",
  ],
  cta: "want a store built to your catalogue, not a template?",
};

export default function DecofetchCaseStudy() {
  return <CaseStudy data={data} />;
}
