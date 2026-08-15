import type { Metadata } from "next";
import { siteMeta } from "@/lib/seo";
import { CaseStudy, type CaseStudyData } from "@/components/case-study";

export const metadata: Metadata = siteMeta({
  title: "Professional Energy — a custom ERP for a UK energy broker (Laravel)",
  description:
    "How Appycodes built Professional Energy Services a tailor-made ERP/CRM — supplier tenders, contract lifecycle, brokerage accounting and client management on Laravel 10, MySQL and AWS S3.",
  path: "/case-studies/professional-energy/",
  image: "/images/pes-6.png",
});

const data: CaseStudyData = {
  crumb: "Professional Energy",
  path: "/case-studies/professional-energy/",
  title: (
    <>
      one platform for <span className="name">Professional Energy</span>’s tenders, contracts and accounts.
    </>
  ),
  lede:
    "A tailor-made ERP for one of the UK's longest-standing energy consultancies — supplier tenders, the contract lifecycle, brokerage accounting and client relationships, all on one platform instead of spreadsheets and inboxes.",
  facts: [
    { label: "Client", value: "Professional Energy Services Ltd, UK" },
    { label: "Sector", value: "B2B energy brokerage & consultancy" },
    { label: "Engagement", value: "Custom ERP / CRM build + ongoing" },
    { label: "Surfaces", value: "Web platform, S3 document vault" },
  ],
  stats: [
    { n: "100+", label: "suppliers in the tender panel" },
    { n: "1", label: "platform for tenders, contracts + accounts" },
    { n: "8", label: "document types per client vault" },
    { n: "Laravel", label: "10 · php 8.1 · mysql 8" },
  ],
  blocks: [
    {
      t: "figure",
      src: "/images/pes-6.png",
      alt: "The Professional Energy ERP — dashboard, client agreements, supplier tender panel and price comparison",
      caption:
        "The PES platform — dashboard, client agreements, the supplier tender panel and side-by-side price comparison, in one place.",
    },
    {
      t: "cards",
      cols3: true,
      title: "what we built.",
      items: [
        {
          title: "a supplier tender engine",
          body: "Send a site's consumption out to 100+ suppliers, pull the quotes back in, and compare unit rate, standing charge, pass-through, net cost and CO₂ side by side — bespoke tenders included.",
        },
        {
          title: "the full contract lifecycle",
          body: "Agreements, billing periods and brokerage fees tracked per account, with an upcoming-expiry board that turns renewals into a worklist instead of a missed deadline.",
        },
        {
          title: "client + account CRM",
          body: "Clients, their accounts and meter points, contacts, addresses, notes and postings — the whole relationship in one record, not a shared inbox.",
        },
        {
          title: "a document vault on S3",
          body: "PES agreement, supplier contract, metering contract, VAT & CCL, LOA and risk policy filed per client through a proper file manager, stored on AWS S3.",
        },
        {
          title: "brokerage accounting",
          body: "Direct fees, commission and billing periods captured where the contract lives, so the numbers behind each deal reconcile rather than living in a separate sheet.",
        },
        {
          title: "role-based access",
          body: "Spatie-backed roles for admins, operations representatives and partner brokers — everyone sees exactly their slice of the operation.",
        },
      ],
    },
  ],
  stack: [
    { layer: "Framework", value: "Laravel 10, PHP 8.1" },
    { layer: "Database", value: "MySQL 8 — clients, accounts, tenders, contracts" },
    { layer: "Front-end", value: "Blade, Bootstrap 5, jQuery, Vite" },
    { layer: "Auth & roles", value: "Laravel Sanctum + Spatie Permission" },
    { layer: "Documents", value: "AWS S3 via Laravel File Manager + Flysystem" },
    { layer: "Exports", value: "Laravel Excel + DomPDF — tenders, contracts, quotes" },
  ],
  outcomes: [
    "Tenders, contracts, brokerage accounting and CRM consolidated onto one platform, off spreadsheets and email.",
    "Every site's consumption tendered across 100+ suppliers and compared on net cost and CO₂ in a single view.",
    "Contract expiry tracked centrally, so renewals became a worklist rather than a missed date.",
    "Client documents — LOA, supplier contracts, VAT & CCL — filed per account on S3, not scattered across inboxes.",
    "Role-based access for admins, operations reps and partner brokers, on a codebase still under active development.",
  ],
  cta: "got an operation running on spreadsheets and email?",
};

export default function ProfessionalEnergyCaseStudy() {
  return <CaseStudy data={data} />;
}
