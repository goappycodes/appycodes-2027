import type { Metadata } from "next";
import Link from "next/link";
import { siteMeta, SEO_BASE } from "@/lib/seo";
import { Faq } from "@/components/sections";
import { JsonLd } from "@/components/jsonld";
import { breadcrumbSchema } from "@/lib/schema";
import Estimator from "@/components/estimator/estimator";

const PATH = "/software-project-estimator/";
const CANONICAL = `${SEO_BASE}${PATH}`;

export const metadata: Metadata = siteMeta({
  title: "Software project cost estimator — web & mobile builds",
  description:
    "Estimate your software project in 2 minutes — web app, mobile app, or combined. Get effort, timeline, a recommended tech stack, and a realistic cost range. Free, no signup.",
  path: PATH,
});

/* Ported from the previous site's estimator page — same questions and answers,
   re-shaped to the {question, answer} keys the site's Faq component uses (it
   also emits the FAQPage structured data that matches this rendered list). */
const FAQS = [
  {
    question: "How much does it cost to build a SaaS web app?",
    answer:
      "For a typical SaaS MVP with auth, admin dashboard, payments, and subscriptions, expect roughly 6–10 man-months of work. At our blended rate, that's a starting range — the calculator gives you a personalised number based on the features you actually need.",
  },
  {
    question: "How long does it take to build a mobile app?",
    answer:
      "A focused MVP with 5–8 core features usually ships in 3–5 calendar months. Cross-platform (React Native, Flutter) takes about 30% less time than building separate iOS and Android apps. The calculator factors in your selected platforms and feature scope.",
  },
  {
    question: "How much does it cost to build a web and mobile app together?",
    answer:
      "Combined builds are roughly 1.5× the cost of a web-only project — not 2× — because the backend, design system, and product team are shared. If you go cross-platform on mobile (one codebase for iOS and Android) the multiplier is the same. Native iOS and Android each adds more.",
  },
  {
    question: "What's the difference between native and cross-platform mobile development?",
    answer:
      "Native (Swift / Kotlin) gives you the best performance and full access to platform features, but you're building twice. Cross-platform (React Native, Flutter) ships one codebase to both stores, with ~95% of native quality for most apps. We default to recommending cross-platform unless you need heavy graphics, AR, or deep OS integration.",
  },
  {
    question: "Why is the estimate shown as a range, not a fixed number?",
    answer:
      "No agency can give you a fixed number from 8 questions — and the ones that do are either inflating to be safe or under-quoting to win the deal. We show a tight ±20% range so you have a credible starting point. The number sharpens after a 30-minute scoping conversation.",
  },
  {
    question: "What do external services and hosting typically cost?",
    answer:
      "For a typical small-scale SaaS at MVP stage, expect ₹5,000–15,000 per month in combined hosting and run costs. This grows with users — payments, AI API usage, email volume, and database load all scale. The calculator shows three tiers (MVP / Growth / Scale) so you can plan ahead.",
  },
  {
    question: "Do you build marketplaces, AI products, and SaaS apps?",
    answer:
      "Yes — these are our most common project types. We've shipped marketplaces with payments and escrow, AI products built on LLMs and retrieval pipelines, and multi-tenant SaaS with subscriptions and admin dashboards, in production across the UK, Europe and beyond.",
  },
  {
    question: "What's not included in this estimate?",
    answer:
      "The estimate covers product design, engineering, QA, project management, and DevOps to launch. It does not include content writing, legal review, marketing, paid acquisition, or post-launch retainers. We can scope those separately if you need them.",
  },
];

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Software Project Cost Estimator",
  url: CANONICAL,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "GBP" },
  description:
    "Free calculator that estimates effort, timeline, tech stack, and cost range for web, mobile, or combined software projects.",
  publisher: { "@type": "Organization", name: "Appycodes" },
};

export default function SoftwareProjectEstimatorPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Software Project Estimator", path: PATH },
          ]),
          webApplicationSchema,
        ]}
      />

      {/* Hero — centered, short intro. The calculator is the hero, so the copy
          above it stays deliberately compact. */}
      <section className="wrap sec">
        <div style={{ maxWidth: "58ch", marginInline: "auto", textAlign: "center" }}>
          <nav
            aria-label="Breadcrumb"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: ".5rem",
              fontWeight: 600,
              fontSize: "11px",
              letterSpacing: ".13em",
              textTransform: "uppercase",
              color: "var(--ink-3)",
            }}
          >
            <Link href="/" style={{ color: "var(--accent-text)" }}>
              home
            </Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">estimator</span>
          </nav>
          <p className="eyebrow" style={{ justifyContent: "center", marginTop: "1.4rem" }}>
            software project estimator
          </p>
          <h1 className="h-l" style={{ marginTop: "1.4rem" }}>
            how much will your software project cost?
          </h1>
          <p className="lede" style={{ marginTop: "1.35rem", marginInline: "auto" }}>
            Answer 8 quick questions and get effort, timeline, a recommended tech stack, and a
            realistic cost range — for web, mobile, or combined projects. No email required.
          </p>
        </div>
      </section>

      {/* The interactive estimator (client component) */}
      <section className="wrap" style={{ paddingBottom: "clamp(3rem, 7vw, 6rem)" }}>
        <div style={{ maxWidth: "56rem", marginInline: "auto" }}>
          <Estimator />
        </div>
      </section>

      {/* About this estimator — the indexable SEO copy, kept below the tool so
          the calculator is immediately usable. */}
      <section className="slab dotted">
        <div className="wrap sec slab__in" style={{ maxWidth: "76ch", marginInline: "auto" }}>
          <div className="sec__head" style={{ maxWidth: "none" }}>
            <p className="eyebrow eyebrow--slab">about this estimator</p>
            <h2 className="h-l" style={{ color: "#fff", marginTop: "1.4rem" }}>
              the same model we use to scope real projects.
            </h2>
          </div>
          <div
            className="body"
            style={{ color: "var(--on-slab-2)", marginTop: "1.6rem", display: "grid", gap: "1rem", fontSize: "15.5px" }}
          >
            <p>
              Whether you&apos;re scoping a SaaS product, a mobile app, a marketplace, an AI tool, or
              a combined web + mobile build, this calculator gives you a credible starting estimate
              based on the same model we use internally to scope projects at Appycodes. We&apos;ve
              shipped software in production since 2015 across the UK, Europe, India, and the Middle
              East.
            </p>
            <p style={{ color: "var(--on-slab)", fontWeight: 600 }}>The calculator covers:</p>
            <ul style={{ display: "grid", gap: ".55rem", paddingLeft: "1.2rem", margin: 0 }}>
              <li>
                <strong style={{ color: "var(--on-slab)" }}>Effort</strong> — total man-months,
                broken down by role (engineering, design, QA, PM, DevOps).
              </li>
              <li>
                <strong style={{ color: "var(--on-slab)" }}>Timeline</strong> — calendar months from
                kickoff to launch, factoring in parallel work streams.
              </li>
              <li>
                <strong style={{ color: "var(--on-slab)" }}>Tech stack</strong> — a primary
                recommendation plus alternatives, tailored to what you&apos;re building and the
                platforms you need.
              </li>
              <li>
                <strong style={{ color: "var(--on-slab)" }}>External costs</strong> — monthly run
                costs for payments, AI APIs, email, SMS, video, and maps.
              </li>
              <li>
                <strong style={{ color: "var(--on-slab)" }}>Hosting</strong> — three tiers (MVP /
                Growth / Scale) with realistic monthly ranges.
              </li>
              <li>
                <strong style={{ color: "var(--on-slab)" }}>Development cost range</strong> — minimum
                and maximum, with a clear note on what moves the number.
              </li>
            </ul>
            <p>
              Combined projects (web + mobile) share a single backend, design system, and product
              team — so they&apos;re more efficient than building each separately, and the calculator
              factors that in. Estimates are shown in your local currency (auto-detected from your
              location). The range is intentionally tight — ±20% — because vague quotes help no one.
            </p>
          </div>
        </div>
      </section>

      <Faq items={FAQS} title="frequently asked questions" />

      {/* Closing CTA */}
      <section className="cta">
        <svg className="art cta-art" viewBox="0 0 400 400" fill="none" aria-hidden="true">
          <path d="M40 120 h220 l100 100 v220 h-320 z" stroke="currentColor" strokeWidth="2.5" />
          <path d="M110 190 h150 l60 60 v150 h-210 z" stroke="currentColor" strokeWidth="2" opacity=".6" />
        </svg>
        <div className="wrap cta__in">
          <div className="cta__t">
            <h2 className="h-l">rather just talk it through?</h2>
            <p>A thirty-minute scoping call with the engineer who would run the build.</p>
          </div>
          <Link className="cta__btn notch" href="/contact/">
            book a call
          </Link>
        </div>
      </section>
    </>
  );
}
