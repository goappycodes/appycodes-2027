import type { Metadata } from "next";
import { siteMeta } from "@/lib/seo";
import { CaseStudy, type CaseStudyData } from "@/components/case-study";

export const metadata: Metadata = siteMeta({
  title: "All White Laser (AW3) — a bespoke equipment-finance platform with GoCardless Direct Debit billing and a practitioner app",
  description:
    "We are the engineering team behind All White Laser's AW3 business platform — a bespoke lead-to-billing system that finances aesthetic laser machines on recurring GoCardless Direct Debit, a provider certification and Find-a-Provider network, and a React Native app for the clinics and practitioners who own the machines. Build and run since 2017.",
  path: "/case-studies/all-white-laser/",
  image: "/images/allwhitelaser-featured.png",
});

const data: CaseStudyData = {
  crumb: "All White Laser",
  path: "/case-studies/all-white-laser/",
  title: (
    <>
      the <span className="caps">AW3</span> business platform behind{" "}
      <span className="name">All White Laser</span>.
    </>
  ),
  lede:
    "All White Laser (AW3®) sells, rents, finances and services professional aesthetic-laser machines — hair removal, IPL, tattoo removal, HIFU and more — for clinics and practitioners across the UK and Europe. We are the engineering team behind the AW3 business platform: a bespoke lead-to-billing system that turns a quote into a signed agreement and a recurring GoCardless Direct Debit, the certification and Find-a-Provider network behind the AW3 Verified badge, and the React Native app the machine owners run their onboarding, training and consumables through. Build and run since 2017.",
  facts: [
    { label: "Client", value: "All White Laser (AW3®) — aesthetic-laser machines" },
    { label: "Sector", value: "Medical aesthetics · B2B equipment, finance & training" },
    { label: "Engagement", value: "Build & run, since 2017" },
    { label: "Owned", value: "Business platform, Direct Debit billing, provider app" },
    { label: "Proof", value: "Nine years, one engineering team" },
  ],
  links: [{ label: "AllWhiteLaser.com", href: "https://www.allwhitelaser.com/" }],
  tech: ["nextjs", "wordpress", "woocommerce", "react native", "typescript", "cloudflare", "vercel"],
  stats: [
    { n: "9 yrs", label: "build & run, since 2017" },
    { n: "GoCardless", label: "recurring Direct Debit billing engine" },
    { n: "3 models", label: "purchase, rental & maintenance" },
    { n: "iOS + Android", label: "the AW3 Business Portal app" },
  ],
  blocks: [
    {
      t: "figure",
      src: "/images/allwhitelaser-featured.png",
      alt: "The All White Laser AW3 platform across desktop and mobile — the machine catalogue, the Direct Debit checkout and the provider app",
      caption:
        "One platform behind a physical product: a lead becomes a custom-priced agreement, a deposit and a Direct Debit mandate — then the machine, the training and the ongoing billing are all run from the same system.",
    },
    {
      t: "section",
      title: "financing a physical product, not just selling one.",
      lead:
        "Selling a machine that costs thousands is not a checkout — it is an agreement. All White Laser sells its aesthetic-laser machines three ways: outright, on a rental plan, or on a service-and-maintenance contract — and most of that money arrives monthly, by Direct Debit, over a period of years. So the platform we build is really a billing system with a website in front of it: a staff-built quote turns into an on-screen signed agreement, a deposit and a GoCardless mandate; the order stays inactive until the paperwork is verified and approved; and from then on the monthly payments, the invoices, the failed-payment chases and the renewals all run themselves.",
    },
    {
      t: "cards",
      title: "the system that runs the AW3 business.",
      lead:
        "From a first enquiry to a certified, billed and supported machine owner — the whole lifecycle in one platform.",
      items: [
        {
          title: "Lead → agreement → Direct Debit",
          body: "Staff turn a lead into a custom-priced quote and a signed, on-screen agreement that generates a checkout against the right business entity's GoCardless account — the customer pays a deposit and authorises a Direct Debit mandate in one flow.",
        },
        {
          title: "The Direct Debit billing engine",
          body: "GoCardless collects the monthly payments automatically, each producing a PDF invoice — with failed-payment retries and manual handling for the finance team, plan renewals, mandate rebuilds when a customer changes bank, and clean cancellation of future payments.",
        },
        {
          title: "Purchase, rental & maintenance",
          body: "Three commercial models — outright purchase, rental, and a service-and-maintenance plan — modelled in one system, with every order held inactive until the agreement and paperwork are verified and an admin approves it.",
        },
        {
          title: "The AW3 Business Portal app",
          body: "A React Native app for iOS and Android used by the clinics and practitioners who own a machine: onboarding and agreements, machine-specific training videos with tracked progress, serial-and-photo verification, and marketing-material downloads.",
        },
        {
          title: "Certification & the provider network",
          body: "A certification pipeline — training completed, serials verified by staff, certificate approved — that turns a machine owner into an AW3 Verified Provider on a public, country-filtered Find-a-Provider map, with enquiry forms wired to Salesforce, Mailchimp and email.",
        },
        {
          title: "Service, faults & consumables",
          body: "Machine service booking and fault logging with engineer reports, plus in-app consumables ordering paid through Opayo — the after-sale surface that keeps a maintenance customer active and buying.",
        },
      ],
    },
    {
      t: "figure",
      src: "/images/allwhitelaser-featured.png",
      alt: "The All White Laser AW3 platform and provider app in production",
      caption:
        "The public site is being rebuilt headless — a multilingual Next.js front end on Vercel over the WordPress/WooCommerce backend — while the Direct Debit billing engine keeps running the money underneath it.",
    },
  ],
  stack: [
    { layer: "Frontend", value: "Next.js on Vercel — headless, multilingual (EN / ES / DE)" },
    { layer: "CMS / commerce", value: "WordPress + WooCommerce backend, exposed over REST APIs" },
    { layer: "Billing", value: "GoCardless — recurring Direct Debit, deposits, PDF invoices, dunning" },
    { layer: "Payments", value: "Opayo (SagePay) — in-app consumables checkout" },
    { layer: "Mobile", value: "React Native (TypeScript) — iOS & Android, Firebase Crashlytics" },
    { layer: "Integrations", value: "Salesforce, Mailchimp, reCAPTCHA, Google Maps provider map" },
    { layer: "Infrastructure", value: "Laravel Forge, Cloudflare, Vercel" },
  ],
  outcomes: [
    "A nine-year build-and-run engagement — the single engineering team behind All White Laser's website, billing and apps since 2017.",
    "A bespoke lead-to-billing flow: a custom-priced agreement becomes an on-screen signature, a deposit and a GoCardless Direct Debit mandate, tied to the correct business entity's account.",
    "A production Direct Debit billing engine — automatic monthly collection, auto-generated PDF invoices, failed-payment retries and manual handling, plan renewals, mandate rebuilds on a bank change, and clean cancellations.",
    "Three commercial models — outright purchase, rental and service/maintenance — handled in one system, with orders held inactive until the paperwork is verified and approved.",
    "A React Native app (iOS & Android) for the clinics and practitioners who own a machine — onboarding and agreements, tracked training, serial-and-photo verification, staff-approved certificates and in-app consumables ordering.",
    "A certification pipeline and a public, country-filtered Find-a-Provider network, alongside a headless multilingual Next.js rebuild over the WordPress/WooCommerce backend.",
  ],
  cta: "billing a physical product on recurring Direct Debit?",
};

export default function AllWhiteLaserCaseStudy() {
  return <CaseStudy data={data} />;
}
