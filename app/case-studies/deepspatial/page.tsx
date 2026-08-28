import type { Metadata } from "next";
import { siteMeta } from "@/lib/seo";
import { CaseStudy, type CaseStudyData } from "@/components/case-study";

export const metadata: Metadata = siteMeta({
  title: "DeepSpatial — the web presence for a listed geospatial-AI company",
  description:
    "The corporate site and Xploor talent platform for DeepSpatial, a publicly-traded geospatial AI company — a fast React front end on AWS Amplify with investor pages, global and India editions, and forms wired to real workflows.",
  path: "/case-studies/deepspatial/",
  image: "/images/deepspatial-featured.png",
});

const data: CaseStudyData = {
  crumb: "DeepSpatial",
  path: "/case-studies/deepspatial/",
  title: (
    <>
      the web presence behind <span className="name">DeepSpatial</span>, a listed geospatial{" "}
      <span className="caps">AI</span> company.
    </>
  ),
  lede:
    "The corporate site and the Xploor talent platform for a publicly-traded geospatial AI company — a fast, content-rich React front end on AWS, with investor pages, global and India editions, and forms wired to real workflows.",
  facts: [
    { label: "Client", value: "DeepSpatial (OTCQB: DSAIF · CSE: DSAI)" },
    { label: "Sector", value: "Geospatial AI · public company" },
    { label: "Engagement", value: "Since 2024, ongoing" },
    { label: "Owned", value: "Corporate site, Xploor platform, IR pages" },
  ],
  links: [
    { label: "deepspatial.ai", href: "https://www.deepspatial.ai/" },
    { label: "investors", href: "https://www.deepspatial.ai/investors" },
  ],
  stats: [
    { n: "2 yrs", label: "one team, ongoing" },
    { n: "7", label: "industries covered" },
    { n: "2", label: "editions: global & India" },
    { n: "AWS", label: "shipped on Amplify" },
  ],
  blocks: [
    {
      t: "figure",
      src: "/images/deepspatial-home.jpg",
      alt: "DeepSpatial homepage — a data-driven geospatial hero over the industries it serves",
      caption: "The corporate homepage — a geospatial-data hero over the industries DeepSpatial serves.",
    },
    {
      t: "section",
      title: "the public face of a listed company.",
      lead:
        "DeepSpatial trades on the OTCQB and the CSE, so the site is not just marketing — it is investor-facing, multi-region and always current. We run it as one continuously-shipped front end: the corporate story, the industries it sells into, its investor pages, and separate global and India editions that carry the right addresses, contacts and content for each audience.",
    },
    {
      t: "cards",
      title: "what we run.",
      lead:
        "A content-rich site for a company with a lot to say — across seven industries, an investor audience, and a flagship talent programme — all kept current by a small team.",
      items: [
        {
          title: "The corporate site",
          body: "A fast, content-rich marketing site across the industries DeepSpatial serves — education, agriculture, retail, healthcare, logistics, law enforcement and disaster management.",
        },
        {
          title: "Investor relations",
          body: "Investor pages and homepage sections for a company listed on the OTCQB and the CSE — kept current as the corporate story and the numbers evolve.",
        },
        {
          title: "The Xploor platform",
          body: "A dedicated talent programme built as its own experience inside the site — visionaries, mentors, a hall of fame, student cohorts, and an application flow with CV upload.",
        },
        {
          title: "Global & India editions",
          body: "Regional editions with the right addresses, contacts and content for each audience — one codebase, two front doors.",
        },
        {
          title: "Forms & content",
          body: "Application and contact forms wired to real email workflows via MSG91, plus reusable admin for the articles, authors and people the site publishes.",
        },
        {
          title: "Shipped on AWS",
          body: "Built in React and deployed continuously on AWS Amplify, so content and campaigns go live without a release becoming an event.",
        },
      ],
    },
    {
      t: "figure",
      src: "/images/deepspatial-mobile.jpg",
      alt: "DeepSpatial homepage on mobile",
      caption: "The same site, tuned for mobile.",
      phone: true,
    },
  ],
  stack: [
    { layer: "Frontend", value: "React (Next.js), continuously deployed on AWS Amplify" },
    { layer: "Content", value: "Dynamic sections — mentors, cohorts, news, newsletters — with reusable admin tables" },
    { layer: "Forms & email", value: "MSG91 (OTP + transactional email), CV uploads" },
    { layer: "Regional", value: "Global and India editions from one codebase" },
    { layer: "Infra", value: "AWS Amplify CI/CD" },
  ],
  outcomes: [
    "The web presence for a publicly-traded geospatial AI company, run by one continuous team.",
    "A flagship Xploor talent programme built as its own platform — mentors, cohorts and an application flow — inside the corporate site.",
    "Investor pages kept current for an OTCQB- and CSE-listed audience.",
    "Global and India editions from a single codebase, each with the right contacts and content.",
    "Forms wired to real email workflows, so an application or enquiry actually reaches someone.",
    "Continuous deployment on AWS Amplify — content and campaigns ship without ceremony.",
  ],
  cta: "need a web presence that keeps up with the company?",
};

export default function DeepSpatialCaseStudy() {
  return <CaseStudy data={data} />;
}
