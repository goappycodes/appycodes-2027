import type { Metadata } from "next";
import { CaseStudy, type CaseStudyData } from "@/components/case-study";

export const metadata: Metadata = {
  title: "Yippee Malta — custom WordPress + booking engine for Malta's #1 tour operator",
  description:
    "How Appycodes rebuilt Yippee Malta: a mobile-first WordPress design system, a fully custom checkout against the client's proprietary booking API, transient + Redis caching, and a 90+ Core Web Vitals score on mobile and desktop.",
};

const data: CaseStudyData = {
  crumb: "Yippee Malta",
  sector: "Case study · Malta · Travel & tours",
  title: (
    <>
      a custom <span className="name">WordPress</span> and booking engine for{" "}
      <span className="name">Yippee Malta</span>.
    </>
  ),
  lede:
    "A full revamp of a legacy travel website into a mobile-first design system on custom WordPress, with a fully custom checkout wired into the client's proprietary booking-availability API, transient and Redis caching, and a 90+ Core Web Vitals score on both desktop and mobile.",
  facts: [
    { label: "Client", value: "Yippee Malta, Gozo Tours & Adventure" },
    { label: "Sector", value: "Travel & tours, Malta and Gozo" },
    { label: "Engagement", value: "Full rebuild, ongoing support" },
    { label: "Result", value: "90+ Core Web Vitals, custom checkout" },
  ],
  links: [{ label: "yippeemalta.com", href: "https://yippeemalta.com/" }],
  stats: [
    { n: "90+", label: "Core Web Vitals on mobile and desktop" },
    { n: "4", label: "Tour categories: quad, buggy, tuk-tuk, boat" },
    { n: "100%", label: "Custom checkout, no WooCommerce" },
    { n: "Redis", label: "Object cache plus transient page fragments" },
  ],
  blocks: [
    {
      t: "figure",
      src: "/images/cs-yippee-malta-homepage.jpg",
      alt: "Yippee Malta rebuilt homepage: mobile-first WordPress design system for Malta's #1 tour operator",
      caption:
        "The rebuilt Yippee Malta site: a mobile-first design system on custom WordPress, editorial team-operated, with the booking flow wired into a proprietary availability API.",
    },
    {
      t: "section",
      eyebrow: "The brief",
      title: "a legacy travel site that could not keep up with the business.",
      two: [
        "Yippee Malta is the leading tour operator in Malta and Gozo, running quad, buggy, tuk-tuk and boat experiences. The legacy website was slow, hard to edit, and could not express the range of the operation — and the booking journey did not reflect the real availability rules behind each tour.",
        "We rebuilt it as a mobile-first design system on custom WordPress: repeatable modules the editorial team drive themselves, hand-audited render cost, no plugin chain — and a fully custom checkout wired directly into the client's proprietary booking-availability API.",
      ],
    },
    {
      t: "cards",
      eyebrow: "The checkout",
      title: "a booking engine that models the real rules, not a plugin's idea of them.",
      lead:
        "Off-the-shelf commerce plugins cannot express the constraints of a real tour operation. We built the checkout from scratch so the rules live as data, validated before money moves:",
      items: [
        { title: "Per-vehicle rider and passenger rules", body: "A buggy can be one driver alone, or a driver plus a configurable number of passengers, with the price tier changing accordingly; a quad is solo only. The engine validates before the user proceeds, with inline errors rather than checkout-page surprises." },
        { title: "Age tier validation", body: "Adult, child and infant counts cross-check against per-tour rules — minimum child ages, allowed ratios, tours that permit no infants — all held as data, not hard-coded conditionals." },
        { title: "Real-time availability re-checks", body: "A user can sit on the cart for ten minutes; by pay time the availability may have moved. We re-validate against the API at payment-intent creation, so a booking confirms cleanly or fails into a friendly sold-out state before money moves." },
        { title: "Multi-currency and multi-language", body: "The checkout mirrors the rest of the site, serving the operator's European tourist mix in their own currency and language." },
      ],
    },
    {
      t: "figure",
      src: "/images/cs-yippee-malta-tour-detail.jpg",
      alt: "Yippee Malta tour detail and booking widget on custom WordPress",
      caption:
        "A tour detail page: the page-scoped booking widget fetches live availability through a WordPress proxy over the client's proprietary API.",
    },
    {
      t: "section",
      eyebrow: "Performance",
      title: "90+ core web vitals, held through traffic spikes.",
      two: [
        "Speed was a first-class requirement, not a cleanup pass. Hand-audited HTML, CSS and vanilla JS, WebP imagery, a Redis object cache and event-invalidated WordPress transients for page fragments keep the site fast under load.",
        "SEO-rich schema is deployed across every template — TourismAttraction, TravelAgency, Tour, FAQ, Review, Breadcrumb — making the site eligible for the rich results that matter on travel queries, with abandoned-cart recovery running inside WordPress rather than a third-party SaaS layer.",
      ],
    },
  ],
  stack: [
    { layer: "CMS framework", value: "Custom WordPress, repeatable modules via custom fields (ACF)" },
    { layer: "Frontend", value: "Hand-audited HTML / CSS / vanilla JS, WebP imagery" },
    { layer: "Booking widget", value: "Lightweight JS component, page-scoped, fetches via WP REST" },
    { layer: "Availability layer", value: "Client's proprietary booking API, proxied via WordPress" },
    { layer: "Checkout", value: "100% custom, no WooCommerce, no plugin chain" },
    { layer: "Object cache", value: "Redis" },
    { layer: "Page-fragment cache", value: "WordPress transients, event-invalidated" },
    { layer: "Observability", value: "Custom request logging, uptime monitoring, abandoned-cart recovery" },
  ],
  outcomes: [
    "90+ Core Web Vitals on both desktop and mobile, sustained through traffic spikes.",
    "A custom WordPress framework the editorial team operates day-to-day without engineering for routine updates.",
    "Booking live across 4 tour categories with the proprietary availability API integrated end to end.",
    "Multi-language and multi-currency checkout serving the operator's European tourist mix.",
    "SEO-rich schema across every template, eligible for the rich results that matter on travel queries.",
    "Abandoned-cart recovery running inside WordPress — no third-party SaaS layered on top. Ongoing engagement.",
  ],
  cta: "a booking flow your platform can't express?",
};

export default function YippeeMaltaCaseStudy() {
  return <CaseStudy data={data} />;
}
