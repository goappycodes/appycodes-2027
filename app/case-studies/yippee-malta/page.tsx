import type { Metadata } from "next";
import { siteMeta } from "@/lib/seo";
import { CaseStudy, type CaseStudyData } from "@/components/case-study";

export const metadata: Metadata = siteMeta({
  title: "Yippee Malta — custom WordPress + booking engine for Malta's #1 tour operator",
  description:
    "How Appycodes rebuilt Yippee Malta: a mobile-first WordPress design system with a fully custom checkout against a proprietary booking API. 90+ Core Web Vitals.",
  path: "/case-studies/yippee-malta/",
  image: "/images/yippee-6.png",
});

const data: CaseStudyData = {
  crumb: "Yippee Malta",
  title: (
    <>
      the mobile-first rebuild that won <span className="name">Yippee Malta</span> their own checkout.
    </>
  ),
  lede:
    "A legacy travel site rebuilt into a mobile-first WordPress system, with a custom checkout wired straight into their proprietary booking API.",
  facts: [
    { label: "Client", value: "Yippee Malta, Gozo Tours" },
    { label: "Sector", value: "Travel & tours, Malta" },
    { label: "Engagement", value: "Rebuild + ongoing" },
    { label: "Result", value: "90+ Core Web Vitals" },
  ],
  links: [{ label: "yippeemalta.com", href: "https://yippeemalta.com/" }],
  stats: [
    { n: "90+", label: "core web vitals, both sides" },
    { n: "4", label: "tour categories" },
    { n: "100%", label: "custom checkout, no WooCommerce" },
    { n: "Redis", label: "object + fragment cache" },
  ],
  blocks: [
    {
      t: "figure",
      src: "/images/cs-yippee-malta-homepage.jpg",
      alt: "Yippee Malta rebuilt homepage on custom WordPress",
      caption: "A mobile-first design system the editorial team runs themselves — no plugin chain.",
    },
    {
      t: "cards",
      title: "a checkout that models the real rules.",
      lead: "Off-the-shelf plugins can't express a real tour operation — so we built it, with the rules held as data.",
      items: [
        { title: "per-vehicle rider rules", body: "Driver-only or driver-plus-passengers, price tier shifting to match, validated inline." },
        { title: "age-tier validation", body: "Adult, child and infant counts cross-checked against each tour's rules." },
        { title: "real-time availability", body: "Re-checked at payment time, so a booking confirms cleanly or fails friendly." },
        { title: "multi-currency + language", body: "The checkout mirrors the site for the operator's European mix." },
      ],
    },
    {
      t: "figure",
      src: "/images/cs-yippee-malta-tour-detail.jpg",
      alt: "Yippee Malta tour detail with booking widget",
      caption: "The page-scoped booking widget fetches live availability through a WordPress proxy.",
    },
  ],
  stack: [
    { layer: "CMS", value: "Custom WordPress, repeatable modules (ACF)" },
    { layer: "Frontend", value: "Hand-audited HTML/CSS/JS, WebP imagery" },
    { layer: "Checkout", value: "100% custom, proprietary availability API proxied via WP" },
    { layer: "Cache", value: "Redis object cache + event-invalidated transients" },
  ],
  outcomes: [
    "90+ Core Web Vitals on desktop and mobile, held through spikes.",
    "A framework the editorial team runs without engineering for routine work.",
    "Booking live across 4 tour categories on the proprietary API.",
    "SEO-rich schema across every template; in-house abandoned-cart recovery.",
  ],
  cta: "a booking flow your platform can't express?",
};

export default function YippeeMaltaCaseStudy() {
  return <CaseStudy data={data} />;
}
