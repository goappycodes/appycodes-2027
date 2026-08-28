import type { Metadata } from "next";
import { siteMeta } from "@/lib/seo";
import { CaseStudy, type CaseStudyData } from "@/components/case-study";

export const metadata: Metadata = siteMeta({
  title: "PlusHeat — the cover-plan configurator and lead engine behind a UK boiler-cover brand",
  description:
    "We build and run the site that sells PlusHeat's boiler and home-emergency cover — a custom plan configurator that prices homeowner and landlord cover by call-out fee and billing period, a lead-capture flow with postcode address lookup and CRM sync, and the landing pages behind their campaigns. A partnership since 2021.",
  path: "/case-studies/plusheat/",
  image: "/images/plusheat-featured.png",
});

const data: CaseStudyData = {
  crumb: "PlusHeat",
  path: "/case-studies/plusheat/",
  title: (
    <>
      the cover-plan engine behind <span className="name">PlusHeat</span>.
    </>
  ),
  lede:
    "PlusHeat sells boiler and home-emergency cover across the UK. We build and run the site that sells it — a custom plan configurator that prices homeowner and landlord cover by call-out fee and billing period, a lead-capture flow with postcode address lookup and CRM sync, and the landing pages behind their campaigns. A conversion-focused build, and a partnership since 2021.",
  facts: [
    { label: "Client", value: "PlusHeat — UK boiler & home-emergency cover" },
    { label: "Sector", value: "Home services · subscription cover" },
    { label: "Engagement", value: "Build & run, since 2021" },
    { label: "Owned", value: "Plan configurator, lead flow, landing pages, CRM sync" },
    { label: "Proof", value: "Trustpilot — rated Excellent" },
  ],
  links: [{ label: "plusheat.co.uk", href: "https://www.plusheat.co.uk/" }],
  stats: [
    { n: "5 yrs", label: "web partner since 2021" },
    { n: "3-axis", label: "plan configurator, live pricing" },
    { n: "postcode", label: "address-lookup lead capture" },
    { n: "Excellent", label: "Trustpilot-rated brand" },
  ],
  blocks: [
    {
      t: "figure",
      src: "/images/plusheat-featured.png",
      alt: "PlusHeat boiler-cover site across desktop and mobile — hero, plan configurator and lead form",
      caption:
        "For a cover brand, the website is the sales team — the plan configurator and the lead form are where the revenue is decided.",
    },
    {
      t: "section",
      title: "the site is the sales team.",
      lead:
        "PlusHeat does not sell a product you add to a cart; it sells a monthly cover plan, and the whole decision happens on the website. So the work is conversion engineering: a configurator that shows the right price for exactly this customer, and a lead form that captures a qualified enquiry without friction — then hands it cleanly to the team that closes it. We have built and run that funnel since 2021.",
    },
    {
      t: "cards",
      title: "the funnel, built to convert.",
      lead:
        "Everything between “interested” and “qualified lead” — the configurator, the journeys, the form and the plumbing behind them.",
      items: [
        {
          title: "The plan configurator",
          body: "Three axes — customer type, call-out fee (£0/£59/£99) and monthly or annual billing — drive live pricing across four cover tiers, with the discounts and “3 months free” logic built in.",
        },
        {
          title: "Homeowner & landlord journeys",
          body: "Different plans, pricing and messaging for homeowners and landlords, from a shared configurator — a landlord lands on landlord cover, not a generic page.",
        },
        {
          title: "Lead capture that qualifies",
          body: "A form that turns a browse into a lead: postcode address lookup, a live plan summary, agreement start date and marketing preferences — the details the sales team actually needs.",
        },
        {
          title: "CRM sync & lead-source attribution",
          body: "Leads flow into their CRM with the source attached, so marketing can see which campaign and landing page a lead came from — not just that one arrived.",
        },
        {
          title: "Landing-page system",
          body: "Campaign landing pages and cover subpages built to a pattern, so a new paid campaign gets a fast, on-brand page without a rebuild.",
        },
        {
          title: "A design-system rebuild",
          body: "The site rebuilt to a fresh design system from Figma — matched across desktop and mobile, tightened for speed and conversion.",
        },
      ],
    },
    {
      t: "gallery",
      title: "the configurator and the cover, in production.",
      shots: [
        { src: "/images/plusheat-configurator.jpg", alt: "PlusHeat plan configurator — customer type, call-out fee and billing driving four cover tiers" },
        { src: "/images/plusheat-landlord.jpg", alt: "PlusHeat landlord boiler cover landing page" },
      ],
    },
    {
      t: "gallery",
      title: "on the phone, where most of the leads come in.",
      shots: [
        { src: "/images/plusheat-mobile-hero.jpg", alt: "PlusHeat landlord cover on mobile with Trustpilot rating" },
        { src: "/images/plusheat-form.jpg", alt: "PlusHeat lead form on mobile with postcode address lookup and plan summary" },
      ],
    },
  ],
  tech: ["wordpress", "php"],
  stack: [
    { layer: "Platform", value: "WordPress — custom theme" },
    { layer: "Configurator", value: "Custom pricing engine — customer type × call-out fee × billing" },
    { layer: "Lead capture", value: "Multi-step form, postcode → address lookup, plan summary" },
    { layer: "CRM", value: "Lead-source attribution + CRM sync" },
    { layer: "Campaigns", value: "Landing-page system for paid subpages" },
    { layer: "Design", value: "From-Figma design system, responsive" },
  ],
  outcomes: [
    "A configurator that prices every combination — homeowner or landlord, £0/£59/£99 call-out, monthly or annual — with the discounts and “3 months free” logic built in.",
    "A lead-capture flow that turns a browse into a qualified lead: postcode address lookup, live plan summary, agreement start date and marketing preferences.",
    "Leads synced to their CRM with lead-source attribution, so marketing can see which campaign and landing page each one came from.",
    "A landing-page system that gets a new paid campaign an on-brand page without a rebuild.",
    "A from-Figma design-system rebuild, matched across desktop and mobile.",
    "Five years as their web partner — the site that sells the cover, kept converting.",
  ],
  cta: "is your website your best salesperson?",
};

export default function PlusHeatCaseStudy() {
  return <CaseStudy data={data} />;
}
