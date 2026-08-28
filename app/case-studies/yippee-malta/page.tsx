import type { Metadata } from "next";
import { siteMeta } from "@/lib/seo";
import { CaseStudy, type CaseStudyData } from "@/components/case-study";

export const metadata: Metadata = siteMeta({
  title: "Yippee Malta — a custom booking engine and six-language rebuild for Malta's tour operator",
  description:
    "How Appycodes rebuilt Yippee Malta: a mobile-first WordPress system with a fully custom booking engine — live availability, deposit payments over JWT, coupons and affiliate attribution against their proprietary API — in six European languages, at 90+ Core Web Vitals.",
  path: "/case-studies/yippee-malta/",
  image: "/images/yippee-6.png",
});

const data: CaseStudyData = {
  crumb: "Yippee Malta",
  path: "/case-studies/yippee-malta/",
  title: (
    <>
      the mobile-first rebuild that won <span className="name">Yippee Malta</span> their own checkout.
    </>
  ),
  lede:
    "Malta's tour operator, rebuilt into a mobile-first WordPress system with a fully custom booking engine — availability, deposits, coupons and affiliate tracking wired straight into their proprietary API — in six European languages, at 90+ Core Web Vitals.",
  facts: [
    { label: "Client", value: "Yippee Malta — Gozo & Malta tours" },
    { label: "Sector", value: "Travel & tours, Malta" },
    { label: "Engagement", value: "Rebuild + ongoing" },
    { label: "Languages", value: "English + French, Italian, Spanish, Polish, German" },
    { label: "Result", value: "90+ Core Web Vitals" },
  ],
  links: [{ label: "yippeemalta.com", href: "https://yippeemalta.com/" }],
  stats: [
    { n: "90+", label: "Core Web Vitals, both sides" },
    { n: "6", label: "languages, 254 strings" },
    { n: "100%", label: "custom checkout, no WooCommerce" },
    { n: "deposit", label: "deposit + coupon + affiliate flow" },
  ],
  blocks: [
    {
      t: "figure",
      src: "/images/cs-yippee-malta-homepage.jpg",
      alt: "Yippee Malta rebuilt homepage on custom WordPress",
      caption: "A mobile-first design system the editorial team runs themselves — no plugin chain.",
    },
    {
      t: "section",
      title: "a booking engine, not a booking plugin.",
      lead:
        "A real tour operation does not fit WooCommerce: deposits rather than full payment, live availability from a proprietary API, coupons, affiliate credit, per-vehicle rules for the self-drive tours, and age tiers per tour. So we built the checkout ourselves — the rules held as data, the money handled properly, and the availability re-checked at the moment of payment so a booking confirms cleanly or fails friendly.",
    },
    {
      t: "cards",
      title: "the checkout that models the real operation.",
      lead:
        "Everything an off-the-shelf plugin can't express — wired into their proprietary availability API through a WordPress proxy.",
      items: [
        {
          title: "Live availability, re-checked at pay",
          body: "The proprietary calendar API is queried at payment time (with a short safety cache) so a slot can't be double-sold between browse and book.",
        },
        {
          title: "Deposit payments over JWT",
          body: "Customers pay a deposit to reserve, with the payment session signed and verified — the reservation only completes once the payment and availability both clear.",
        },
        {
          title: "Coupons & affiliate attribution",
          body: "A coupon engine on the total, and affiliate credit carried through the booking — every existing affiliate URL preserved through the migration, because that is where the bookings come from.",
        },
        {
          title: "Self-drive vehicle rules",
          body: "For quad and buggy tours, the checkout validates vehicles against drivers and passengers, shifting the price tier to match — driver-only or driver-plus.",
        },
        {
          title: "Age-tier validation",
          body: "Adult, child and infant counts cross-checked against each tour's rules, validated inline before payment is ever attempted.",
        },
        {
          title: "A tour-finder quiz",
          body: "A guided quiz — when you'd like to start, preferred time of day — that routes visitors to the right tour instead of a category wall.",
        },
      ],
    },
    {
      t: "figure",
      src: "/images/cs-yippee-malta-tour-detail.jpg",
      alt: "Yippee Malta tour detail with booking widget",
      caption: "The page-scoped booking widget fetches live availability through a WordPress proxy.",
    },
    {
      t: "section",
      title: "one site, six european languages.",
      lead:
        "Yippee's customers arrive from across Europe, so the whole thing is multilingual on Polylang — English plus French, Italian, Spanish, Polish and German. Not just the marketing pages: 254 translated strings covering every tour page and its sunset version, the boat trips, the group and private tours, the quiz and the entire checkout, so a German visitor books in German end to end.",
    },
  ],
  stack: [
    { layer: "CMS", value: "Custom WordPress theme (ACF modules) on Laravel Forge" },
    { layer: "Frontend", value: "Hand-audited HTML/CSS/JS, WebP imagery — 90+ CWV" },
    { layer: "Checkout", value: "100% custom — proprietary availability API, JWT deposit payments, coupons, affiliates" },
    { layer: "i18n", value: "Polylang — EN + French, Italian, Spanish, Polish, German (254 strings)" },
    { layer: "Cache", value: "Redis object cache + short-lived availability safety cache" },
    { layer: "Extras", value: "Tour-finder quiz, abandoned-cart recovery, SEO schema" },
  ],
  outcomes: [
    "90+ Core Web Vitals on desktop and mobile, held through spikes.",
    "A fully custom booking engine on their proprietary API — live availability re-checked at payment, deposit payments over JWT, coupons and affiliate attribution.",
    "Self-drive vehicle-vs-driver rules and adult/child/infant age tiers validated inline, so a booking confirms cleanly or fails friendly.",
    "The whole site and checkout in six languages — English plus French, Italian, Spanish, Polish and German, 254 translated strings.",
    "Every existing affiliate URL preserved through the migration, because that is where the bookings come from.",
    "A framework the editorial team runs themselves, with schema and abandoned-cart recovery built in.",
  ],
  cta: "a booking flow your platform can't express?",
};

export default function YippeeMaltaCaseStudy() {
  return <CaseStudy data={data} />;
}
