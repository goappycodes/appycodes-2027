import type { Metadata } from "next";
import { siteMeta } from "@/lib/seo";
import { CaseStudy, type CaseStudyData } from "@/components/case-study";

export const metadata: Metadata = siteMeta({
  title: "TEFL.ie — the WordPress, Moodle, Stripe, Zoho and Zapier platform behind an accredited TEFL course business",
  description:
    "We have engineered, integrated and run the TEFL.ie platform since 2017 — a WordPress and WooCommerce storefront, a Moodle LMS for course delivery, Stripe payments with bespoke deposit and instalment plans, Zoho CRM, and Zapier automation tying it all together, now moving headless onto Next.js.",
  path: "/case-studies/tefl/",
  image: "/images/tefl-featured.png",
});

const data: CaseStudyData = {
  crumb: "TEFL.ie",
  path: "/case-studies/tefl/",
  title: (
    <>
      the commerce-and-learning platform behind <span className="name">TEFL.ie</span>.
    </>
  ),
  lede:
    "TEFL.ie — The TEFL Institute of Ireland — sells accredited Teaching-English-as-a-Foreign-Language courses, paid internships abroad and scholarships to students worldwide. We have engineered, integrated and run its platform since 2017: a tailor-made stack with several moving parts — a WordPress and WooCommerce storefront, a Moodle LMS for the actual course delivery, Stripe payments with bespoke deposit and instalment plans, Zoho CRM, and Zapier automation stitching orders and enquiries across all of it. A student buys a course on one side and is enrolled, taught and certified on the other, with the CRM and reporting kept in sync automatically.",
  facts: [
    { label: "Client", value: "The TEFL Institute of Ireland — TEFL.ie" },
    { label: "Sector", value: "Education & training · course commerce + LMS" },
    { label: "Engagement", value: "Engineer & run, since 2017" },
    { label: "Owned", value: "Storefront, LMS, payments, CRM & automation" },
    { label: "Proof", value: "Eight years, one engineering team" },
  ],
  links: [{ label: "TEFL.ie", href: "https://www.tefl.ie/" }],
  tech: ["wordpress", "woocommerce", "stripe", "zoho crm", "nextjs", "redis"],
  stats: [
    { n: "8 yrs", label: "engineer & run, since 2017" },
    { n: "5", label: "systems as one: WordPress, Moodle, Stripe, Zoho, Zapier" },
    { n: "22", label: "accredited courses on the LMS" },
    { n: "92%", label: "Redis cache hit rate after tuning" },
  ],
  blocks: [
    {
      t: "figure",
      src: "/images/tefl-featured.png",
      alt: "The TEFL.ie platform across desktop and mobile — the course storefront, the checkout and the Moodle learning experience",
      caption:
        "One journey across five systems: a student buys a course in WooCommerce, pays a deposit through Stripe, is enrolled into Moodle automatically, and lands in Zoho and the sales sheet by way of Zapier.",
    },
    {
      t: "section",
      title: "a storefront and a classroom, wired into one system.",
      lead:
        "A course business is really two products bolted together — the shop that sells the course, and the platform that teaches it — and the hard part is the seam between them. TEFL.ie sells on WordPress and WooCommerce; it teaches on Moodle; it takes money through Stripe; it tracks people in Zoho; and Zapier keeps all of it in step. Our job for eight years has been to build and hold that seam: to make a purchase turn into an enrolment, a payment into a linked student account, and an order into a CRM record and a row on the sales sheet — without anyone touching a spreadsheet.",
    },
    {
      t: "cards",
      title: "the five systems, and the glue between them.",
      lead:
        "Everything from a first enquiry to a certified, enrolled and reported-on student — tailor-made across the tools the business already runs on.",
      items: [
        {
          title: "WordPress + WooCommerce storefront",
          body: "Courses, internships and scholarships as WooCommerce products with live geo-pricing and coupons — plus the bespoke commerce: deposit and Pay-in-2 / Pay-in-3 instalment plans, gift cards, a “buy for someone else” gift flow, upsells and a charity donation system.",
        },
        {
          title: "Moodle LMS, integrated & extended",
          body: "The classroom itself — video lessons, quizzes, grading and certificates — deeply customised: a bespoke quizgrader plugin, essay auto-grading, grade-recalculation fixes and server-side course backup and restore.",
        },
        {
          title: "WordPress → Moodle enrolment bridge",
          body: "A completed WooCommerce order creates and links the student's Moodle account and auto-enrols them — including products that map to several Moodle courses, and diplomas where the buyer chooses which 60-hour modules to take.",
        },
        {
          title: "Stripe payments & bespoke deposits",
          body: "Card checkout with Klarna, Apple Pay and Google Pay, a cron that auto-captures the second deposit instalment, instalment-only payment links, and guards so a failed or fraudulent payment never grants free course access.",
        },
        {
          title: "Zoho CRM + Zapier automation",
          body: "Order-complete and enquiry-form webhooks fan out through Zapier to Zoho CRM (leads and contacts, tagged by brand), a Notion board and a Google sales sheet, with Zoho SalesIQ live chat and email tools wired in alongside.",
        },
        {
          title: "Reliability, performance & headless",
          body: "Redis object caching (~92% hit rate), New Relic APM and a faster search engine — cutting course-page render from 3.6s to 0.17s warm — and a 2026 move to a headless Next.js front end on Vercel with WordPress as a custom REST/ACF API.",
        },
      ],
    },
    {
      t: "figure",
      src: "/images/tefl-featured.png",
      alt: "The TEFL.ie course catalogue and learning platform in production",
      caption:
        "Across three hosting generations — Blacknight, then WP Engine, now Laravel Forge on DigitalOcean — the platform has grown to ~830 pages, 460+ articles and 22 accredited courses.",
    },
  ],
  stack: [
    { layer: "Storefront", value: "WordPress + WooCommerce — custom theme, plugin & ACF templates" },
    { layer: "LMS", value: "Moodle — integrated & extended (custom quizgrader, grading, certificates)" },
    { layer: "Bridge", value: "Edwiser Bridge + SSO — WooCommerce → Moodle enrolment" },
    { layer: "Payments", value: "Stripe (+ Klarna, Apple Pay, Google Pay) — deposits & instalments" },
    { layer: "CRM", value: "Zoho CRM + SalesIQ — brand-tagged leads & contacts" },
    { layer: "Automation", value: "Zapier → Zoho, Notion, Google Sheets, MailerLite" },
    { layer: "Frontend (2026)", value: "Next.js on Vercel — WordPress as a custom REST/ACF API" },
    { layer: "Infrastructure", value: "Laravel Forge on DigitalOcean, Redis, New Relic" },
  ],
  outcomes: [
    "An eight-year engagement — the engineering team that has run and extended the TEFL.ie platform since 2017, across three hosting generations.",
    "Five systems wired into one commerce-and-learning platform: a WordPress/WooCommerce storefront, a Moodle LMS, Stripe payments, Zoho CRM and Zapier automation.",
    "A WooCommerce → Moodle enrolment bridge so a purchase creates a linked student account and auto-enrols them — including diplomas where the buyer chooses their own 60-hour modules.",
    "Bespoke deposit and Pay-in-2 / Pay-in-3 instalment plans on Stripe, with auto-captured balances and guards so a failed payment never grants free course access.",
    "Order and enquiry data fanned out through Zapier to Zoho CRM, Notion and a Google sales sheet, tagged by brand across the family of TEFL sites.",
    "A reliability and performance program — Redis object caching (~92% hit rate), New Relic APM and search tuning that cut course-page render from 3.6s to 0.17s warm — and a 2026 headless rebuild on Next.js.",
  ],
  cta: "running a course business on WordPress, Moodle and Stripe?",
};

export default function TeflCaseStudy() {
  return <CaseStudy data={data} />;
}
