import type { Metadata } from "next";
import { siteMeta } from "@/lib/seo";
import { CaseStudy, type CaseStudyData } from "@/components/case-study";

export const metadata: Metadata = siteMeta({
  title: "Professional Energy — a custom ERP for a UK energy broker (Laravel)",
  description:
    "How Appycodes built Professional Energy Services a tailor-made ERP/CRM — supplier tenders, the contract lifecycle, brokerage accounting, per-supplier invoice extraction and validation, half-hourly data and flex-procurement tranches — on Laravel 10, MySQL and AWS S3.",
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
    "A tailor-made ERP for one of the UK's longest-standing energy consultancies — supplier tenders, the contract lifecycle, brokerage accounting, per-supplier invoice extraction, half-hourly data and flex-procurement tranches, all on one platform instead of spreadsheets and inboxes.",
  facts: [
    { label: "Client", value: "Professional Energy Services Ltd, UK" },
    { label: "Sector", value: "B2B energy brokerage & consultancy" },
    { label: "Engagement", value: "Custom ERP / CRM, since 2023" },
    { label: "Surfaces", value: "Web platform, S3 document vault, data importers" },
  ],
  stats: [
    { n: "100+", label: "suppliers tendered per site" },
    { n: "1", label: "platform for the whole operation" },
    { n: "per-supplier", label: "invoice extraction & validation" },
    { n: "2023", label: "built & run since" },
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
      t: "section",
      title: "one platform, off spreadsheets and email.",
      lead:
        "A brokerage this established runs on relationships, deadlines and numbers — and all three were living in spreadsheets and inboxes. We built the operating system for the business: tenders out to the market, contracts tracked to their expiry, the client relationship in one record, and the brokerage accounting captured where the deal lives. Then we kept going, into the harder half — the supplier invoices and the half-hourly data that decide whether a deal was actually good.",
    },
    {
      t: "cards",
      title: "the operating system for a brokerage.",
      items: [
        {
          title: "A supplier tender engine",
          body: "Send a site's consumption out to 100+ suppliers, pull the quotes back in, and compare unit rate, standing charge, pass-through, net cost and CO₂ side by side — bespoke tenders included.",
        },
        {
          title: "The full contract lifecycle",
          body: "Agreements, billing periods and brokerage fees tracked per account, with an upcoming-expiry board that turns renewals into a worklist instead of a missed deadline.",
        },
        {
          title: "Client + account CRM",
          body: "Clients, their accounts and meter points (MPAN), contacts, addresses, notes and postings — the whole relationship in one record, not a shared inbox.",
        },
        {
          title: "A document vault on S3",
          body: "PES agreement, supplier contract, metering contract, VAT & CCL, LOA and risk policy filed per client through a proper file manager, stored on AWS S3.",
        },
        {
          title: "Brokerage accounting",
          body: "Direct fees, commission and billing periods captured where the contract lives, so the numbers behind each deal reconcile rather than living in a separate sheet.",
        },
        {
          title: "Role-based access",
          body: "Spatie-backed roles for admins, operations representatives and partner brokers — everyone sees exactly their slice of the operation.",
        },
      ],
    },
    {
      t: "section",
      title: "then we taught it to read the invoices.",
      lead:
        "Verifying that a supplier billed what the contract said used to be a person with a PDF and a calculator. We built the data layer that does it: per-supplier invoice extraction and validation, half-hourly consumption importers, and the flex-procurement tranches — with a flags screen that surfaces exactly what does not add up.",
    },
    {
      t: "cards",
      title: "the data layer.",
      items: [
        {
          title: "Invoice extraction & validation",
          body: "Data pulled out of supplier invoices and validated against the contract — built per supplier because a Yu Energy bill looks nothing like the next one — with a flags screen for anything that does not reconcile.",
        },
        {
          title: "Fixed & flex contracts",
          body: "Two procurement models with different rules: fixed-price contract validation, and flex validation against a standardized trade book — each handled on its own terms.",
        },
        {
          title: "Half-hourly data importer",
          body: "Half-hourly consumption imported per account and charted, so a site's actual usage profile is visible next to what it was billed.",
        },
        {
          title: "Tranches & Trade Book",
          body: "For flex procurement, a tranche importer standardized onto one sheet and a client-filtered Trade Book — with the £/MWh-to-p/kWh conversions handled so everything reads in one unit.",
        },
        {
          title: "Non-commodity costs",
          body: "Importers for the non-commodity charges that make up a real energy bill, standardized so they can be compared and validated like everything else.",
        },
        {
          title: "Reference-data editors",
          body: "Region and distributor editors (distributor ID from the MPAN), so the team maintains the lookup data the validation depends on without a developer.",
        },
      ],
    },
  ],
  tech: ["laravel", "php", "mysql", "aws", "bootstrap", "vite"],
  stack: [
    { layer: "Framework", value: "Laravel 10, PHP 8.1, on Laravel Forge" },
    { layer: "Database", value: "MySQL 8 — clients, accounts, tenders, contracts, HH data" },
    { layer: "Front-end", value: "Blade, Bootstrap 5, jQuery, Vite" },
    { layer: "Auth & roles", value: "Laravel Sanctum + Spatie Permission" },
    { layer: "Documents", value: "AWS S3 via Laravel File Manager + Flysystem" },
    { layer: "Data & invoices", value: "Per-supplier invoice extraction & validation; half-hourly + tranche importers" },
    { layer: "Exports", value: "Laravel Excel + DomPDF — tenders, contracts, quotes" },
  ],
  outcomes: [
    "Tenders, contracts, brokerage accounting and CRM consolidated onto one platform, off spreadsheets and email.",
    "Every site's consumption tendered across 100+ suppliers and compared on net cost and CO₂ in a single view.",
    "Per-supplier invoice extraction and validation against the contract, with a flags screen surfacing anything that does not reconcile.",
    "Half-hourly consumption imported and charted, and flex-procurement tranches standardized into one Trade Book.",
    "Client documents — LOA, supplier contracts, VAT & CCL — filed per account on S3, not scattered across inboxes.",
    "Role-based access for admins, operations reps and partner brokers, on a codebase built and run since 2023.",
  ],
  cta: "got an operation running on spreadsheets and email?",
};

export default function ProfessionalEnergyCaseStudy() {
  return <CaseStudy data={data} />;
}
