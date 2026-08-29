import type { Metadata } from "next";
import { siteMeta } from "@/lib/seo";
import { CaseStudy, type CaseStudyData } from "@/components/case-study";

export const metadata: Metadata = siteMeta({
  title: "Shutters 365 — a made-to-measure shutter configurator with live per-window pricing",
  description:
    "We build the site that sells Shutters 365's factory-direct made-to-measure window shutters: a seven-step online configurator with a live preview and a live per-window price, a free-samples flow, measuring and fitting guides, Stripe checkout, and the back-office order and supplier tooling behind the factory.",
  path: "/case-studies/shutters365/",
  image: "/images/shutters-featured.png",
});

const data: CaseStudyData = {
  crumb: "Shutters 365",
  path: "/case-studies/shutters365/",
  title: (
    <>
      the made-to-measure configurator behind <span className="name">Shutters&nbsp;365</span>.
    </>
  ),
  lede:
    "Shutters 365 sells premium made-to-measure window shutters factory-direct — at up to 40% less than the high street. We build the site that sells them: a seven-step online shutter configurator with a live preview and a live per-window price, a free-samples flow, step-by-step measuring and fitting guides, and the back-office order and supplier tooling behind the factory.",
  facts: [
    { label: "Client", value: "Shutters 365 — UK made-to-measure shutters" },
    { label: "Sector", value: "Home improvement · e-commerce" },
    { label: "Engagement", value: "Build & run, since 2026" },
    { label: "Owned", value: "Configurator, samples flow, guides, order ops" },
    { label: "Proof", value: "Factory-direct · 5-year guarantee" },
  ],
  links: [{ label: "Shutters365.co.uk", href: "https://shutters365.co.uk/" }],
  tech: ["wordpress", "php", "stripe"],
  stats: [
    { n: "7-step", label: "configurator, live per-window price" },
    { n: "40%", label: "less than the high street" },
    { n: "6", label: "free samples, no obligation" },
    { n: "Stripe", label: "secure made-to-measure checkout" },
  ],
  blocks: [
    {
      t: "figure",
      src: "/images/shutters-featured.png",
      alt: "Shutters 365 across desktop and mobile — the hero, the configurator and the free-samples flow",
      caption:
        "Selling a made-to-measure product without a showroom — the configurator prices your exact window, and the sample box lets you feel the finish first.",
    },
    {
      t: "section",
      title: "sell made-to-measure, without a showroom.",
      lead:
        "Made-to-measure is a hard thing to sell online: every window is a different price, and the customer has to measure and fit it themselves. So the whole site is built to remove that friction — a configurator that prices your exact window as you build it, free samples so you can feel the finish before you commit, and guides that walk you through measuring and fitting. Behind it sits the order and supplier tooling that turns a web order into something the factory can make.",
    },
    {
      t: "cards",
      title: "the configurator, and the operation behind it.",
      lead:
        "Everything from “I'm considering shutters” to a manufacturing order the factory can act on.",
      items: [
        {
          title: "A seven-step configurator",
          body: "Style, material, colour, measurements, louvre and options, then review — with a live preview that updates instantly and a running per-window estimate as you go.",
        },
        {
          title: "Live per-window pricing",
          body: "A pricing engine that quotes the exact window by size, style, material and louvre, with a transparent price breakdown — so the customer sees what their window costs before they buy.",
        },
        {
          title: "Styles, materials & colours",
          body: "Full Height, Café Style and Tier-on-Tier, in PVC (waterproof faux wood) or natural hardwood, across full colour ranges, louvre sizes and frame options.",
        },
        {
          title: "A free-samples box",
          body: "Order up to six material and colour samples — free same-day dispatch, no payment and no obligation — the low-friction first step for a considered purchase.",
        },
        {
          title: "Measure & fit guides",
          body: "Step-by-step measuring videos for bay, recessed and non-recessed windows, plus fitting guides, so customers self-measure and self-fit with confidence.",
        },
        {
          title: "Order & supplier operations",
          body: "An order pipeline from design to manufacturing, order-source tracking with a sales-by-source report, and supplier emails that carry the manufacturing detail.",
        },
      ],
    },
    {
      t: "gallery",
      title: "the storefront and the configurator, in production.",
      shots: [
        { src: "/images/shutters-configurator.jpg", alt: "Shutters 365 configurator — choose your shutter style, with live preview and per-window price" },
        { src: "/images/shutters-hero.jpg", alt: "Shutters 365 homepage — premium made-to-measure shutters, direct from the makers" },
        { src: "/images/shutters-samples.jpg", alt: "Shutters 365 free-samples flow — pick a material and up to six colour samples" },
      ],
    },
    {
      t: "gallery",
      title: "on the phone, where the design happens.",
      shots: [
        { src: "/images/shutters-configurator-mobile.jpg", alt: "Shutters 365 configurator on mobile with a sticky price summary" },
        { src: "/images/shutters-samples-mobile.jpg", alt: "Shutters 365 free-samples flow on mobile with the hardwood colour range" },
      ],
    },
  ],
  stack: [
    { layer: "Platform", value: "WordPress + WooCommerce — custom theme" },
    { layer: "Configurator", value: "Custom 7-step made-to-measure builder — live preview + pricing" },
    { layer: "Pricing", value: "Per-window engine (size × style × material × louvre) with breakdown" },
    { layer: "Payments", value: "Stripe — secure checkout" },
    { layer: "Samples", value: "Free-sample box flow (up to six, no obligation)" },
    { layer: "Guides", value: "Measuring videos + fitting guides" },
    { layer: "Operations", value: "Order pipeline, source tracking & sales-by-source reporting, supplier emails" },
  ],
  outcomes: [
    "A seven-step configurator that turns made-to-measure into a few minutes online — style, material, colour, measurements, louvre and options, with a live preview and a live per-window price.",
    "A per-window pricing engine with a transparent breakdown, so a customer sees exactly what their window costs before they commit.",
    "A free-samples flow — up to six samples, free same-day dispatch, no payment or obligation — the low-friction first step for a considered purchase.",
    "Step-by-step measuring videos (bay, recessed, non-recessed) and fitting guides, so customers self-measure and self-fit with confidence.",
    "Back-office operations — an order pipeline from design to manufacturing, order-source tracking with a sales-by-source report, and supplier emails carrying the manufacturing detail.",
    "Secure Stripe checkout, a 5-year guarantee and free UK delivery — factory-direct, at up to 40% less than the high street.",
  ],
  cta: "selling a made-to-measure product online?",
};

export default function Shutters365CaseStudy() {
  return <CaseStudy data={data} />;
}
