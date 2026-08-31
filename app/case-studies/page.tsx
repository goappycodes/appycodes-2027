import type { Metadata } from "next";
import { ClientLogo } from "@/components/client-logo";
import { siteMeta } from "@/lib/seo";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { AwardsStrip, CASE_STUDIES, LogoWall, Testimonials, Faq } from "@/components/sections";
import { ChevronRight } from "@/components/icons";
import { SHORT_CASES } from "@/lib/short-cases";

export const metadata: Metadata = siteMeta({
  title: "Case studies — our client projects",
  description:
    "Websites, mobile apps and software built by Appycodes. Explore client projects, the work we delivered and the results.",
  path: "/case-studies/",
  image: "/images/ontick-6.png",
});

/* eslint-disable @next/next/no-img-element */

const DETAIL: Record<string, { sector: string; span: string; scope: string[] }> = {
  Creoate: {
    sector: "B2B wholesale marketplace",
    span: "Eight-year partnership",
    scope: ["Next.js storefront", "Python ingestion pipelines", "DynamoDB data layer", "AWS media & infra", "B2B payments"],
  },
  Easyship: {
    sector: "Global shipping & logistics",
    span: "Embedded team, since 2025",
    scope: ["Nuxt/Vue SSR site", "Shipping & tax/duty calculators", "MongoDB CMS + CSV pipeline", "Technical SEO at scale", "Reliability & security on GCP"],
  },
  "TEFL.ie": {
    sector: "Education & training · course commerce + LMS",
    span: "Engineer & run, since 2017",
    scope: ["WordPress + WooCommerce storefront", "Moodle LMS, integrated & extended", "WooCommerce → Moodle enrolment", "Stripe deposits & instalments", "Zoho CRM + Zapier automation"],
  },
  "All White Laser": {
    sector: "Medical aesthetics · B2B equipment & finance",
    span: "Build & run, since 2017",
    scope: ["AW3 business platform", "GoCardless Direct Debit billing", "Purchase, rental & maintenance", "Provider certification & map", "React Native app (iOS & Android)"],
  },
  Decofetch: {
    sector: "Luxury furniture e-commerce",
    span: "Ground-up build",
    scope: ["Next.js storefront", "Custom Laravel API", "Bespoke admin", "AWS ECS infra", "SEO & product feeds"],
  },
  "Léonia": {
    sector: "Clean-beauty e-commerce",
    span: "Partnership since 2021",
    scope: ["Bespoke Shopify theme", "Custom account dashboard", "Loyalty & referral", "Gift-with-purchase", "Performance pass"],
  },
  PlusHeat: {
    sector: "Home services · subscription cover",
    span: "Web partner since 2021",
    scope: ["Cover-plan configurator", "Lead capture + address lookup", "CRM sync & attribution", "Landing-page system", "Design-system rebuild"],
  },
  "Shutters 365": {
    sector: "Home improvement · e-commerce",
    span: "Build & run, since 2026",
    scope: ["Made-to-measure configurator", "Live per-window pricing", "Free-samples flow", "Measure & fit guides", "Order & supplier ops"],
  },
  "BA Engine Room": {
    sector: "AI ops platform",
    span: "Ground-up build",
    scope: ["Lead-to-invoice pipeline", "AI discovery briefs (Claude)", "E-signed MSA contracts", "Stripe milestone payments", "Client portal & support"],
  },
  "Bloc Ads Manager": {
    sector: "Ad-tech · self-serve advertising",
    span: "Built from scratch, live 2026",
    scope: ["Meta-style campaign builder", "PostGIS audience estimation", "Python interest targeting", "In-app ad serving", "Billing, VAT & credits"],
  },
  Ontick: {
    sector: "Event ticketing & festivals",
    span: "Built & run since 2021",
    scope: ["Multi-organizer Laravel platform", "Stripe instalments & payouts", "Customer + check-in apps", "Live door analytics", "Guest checkout & Apple Pay"],
  },
  Bloc: {
    sector: "Social events & rewards",
    span: "Four-year partnership",
    scope: ["React Native app + BLOC Replay", "Backend & APIs (DynamoDB)", "Bloc Command ops tool", "Ads manager", "Algorand marketplace"],
  },
  Zonely: {
    sector: "Social · real-time marketplace",
    span: "Two apps + admin, live",
    scope: ["React Native consumer app", "Buddy app", "Real-time metered billing", "Trust & safety / moderation", "Wallet & coins economy"],
  },
  "Player Profile Hub": {
    sector: "Sports · grassroots football",
    span: "Built ground-up, launching 2026",
    scope: ["Verified player profiles", "Highlight feed", "Document verification & safeguarding", "Profile tiers & progression", "Web + React Native apps"],
  },
  DeepSpatial: {
    sector: "Geospatial AI (public co.)",
    span: "Since 2024, ongoing",
    scope: ["Corporate site", "Investor-relations pages", "Xploor talent platform", "Global & India editions", "AWS Amplify"],
  },
  "Yippee Malta": {
    sector: "Travel & tours, Malta",
    span: "Rebuild + custom booking engine",
    scope: ["Custom booking engine", "Deposit payments (JWT)", "Coupons & affiliate tracking", "Six languages (Polylang)", "90+ Core Web Vitals"],
  },
  "Professional Energy": {
    sector: "Energy brokerage",
    span: "Custom ERP, since 2023",
    scope: ["Supplier tender engine", "Contract lifecycle & accounting", "Invoice extraction & validation", "Half-hourly data & tranches", "Client CRM + S3 vault"],
  },
};

const FAQS = [
  {
    question: "Why are some clients unnamed?",
    answer:
      "We name clients with their permission. Some projects were delivered through partners, so we describe the work without naming the client.",
  },
  {
    question: "Does this page show all your work?",
    answer:
      "This page shows selected projects. Our atlas lists more work by country, client and project type.",
  },
  {
    question: "Can I talk to any of these clients?",
    answer:
      "Yes. When discussing your project, we can arrange a reference call with a client whose project is similar to yours.",
  },
  {
    question: "Do you provide support after launch?",
    answer:
      "Yes. We maintain and develop several of these platforms. We can also hand the software and documentation over to your team.",
  },
];

export default function CaseStudiesIndex() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Work" }]}
        eyebrow="selected work"
        title={
          <>
            websites, apps and software <span className="g-disp">we have built</span>.
          </>
        }
        lede="See what we built for our clients, how it works and the results."
        actions={[
          { label: "Start a project", href: "/contact/" },
          { label: "See the services", href: "/services/", variant: "out" },
        ]}
        stats={[
          { n: "£2M+", label: "processed via Ontick" },
          { n: "8+ yrs", label: "longest engagement" },
          { n: "90+", label: "core web vitals" },
          { n: "5", label: "codebases, one team" },
        ]}
      />

      <LogoWall label="Some of our clients" />

      {/* Client projects — full-width alternating rows */}
      <section className="wrap sec">
        <div className="sec__head">
          <p className="eyebrow">case studies</p>
          <h2 className="h-l">client projects.</h2>
        </div>

        <div className="cases">
          {CASE_STUDIES.map((c, i) => {
            const d = DETAIL[c.name];
            return (
              <article key={c.href} className="crow notch notch-lg">
                <Link className="crow__shot" href={c.href} aria-label={c.meta}>
                  <img src={c.img} alt={c.meta} loading="lazy" />
                  <span className="crow__n tnum">{String(i + 1).padStart(2, "0")}</span>
                </Link>
                <div className="crow__in">
                  <ClientLogo href={c.href} name={c.name} />
                  <p className="crow__sector">{d?.sector}</p>
                  <h3 className="h-l crow__t">
                    <Link href={c.href}>{c.head}</Link>
                  </h3>
                  <p className="lede crow__body">{c.body}</p>

                  <dl className="crow__facts">
                    <div>
                      <dt>outcome</dt>
                      <dd className="tnum g-disp crow__fig">{c.fig}</dd>
                      <p>{c.figlabel}</p>
                    </div>
                    <div>
                      <dt>engagement</dt>
                      <dd className="crow__span">{d?.span}</dd>
                      <p>{c.tags.join(" · ")}</p>
                    </div>
                  </dl>

                  {d ? (
                    <ul className="crow__scope">
                      {d.scope.map((s) => (
                        <li key={s}>{s}</li>
                      ))}
                    </ul>
                  ) : null}

                  <Link className="btn btn--out notch crow__cta" href={c.href}>
                    Read the case study <ChevronRight aria-hidden />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* TIER TWO — one screen each, picked for the hard problem */}
      <section className="slab dotted">
        <div className="wrap slab__in">
          <div className="sec__head">
            <p className="eyebrow eyebrow--slab">project summaries</p>
            <h2 className="h-l" style={{ color: "#fff" }}>
              more of our work.
            </h2>
            <p className="lede" style={{ color: "var(--on-slab-2)" }}>
              These projects include work delivered through partners. Client names are kept private;
              references are available when we discuss your project.
            </p>
          </div>
          <div className="shorts">
            {SHORT_CASES.map((c) => (
              <article key={c.slug} className="short notch">
                <p className="short__who">{c.who}</p>
                <p className="short__what">{c.what}</p>
                <p className="short__hard">{c.hard}</p>
                <ul className="short__tags">
                  {c.tags.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
                <div className="short__foot">
                  <span className="short__out">{c.outcome}</span>
                  {c.sector ? (
                    <Link className="short__link" href={`/sectors/${c.sector}/`}>
                      more in this sector <ChevronRight aria-hidden />
                    </Link>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Testimonials
        title="what our clients say"
        lede="Feedback from the people we work with."
      />

      <AwardsStrip />

      <Faq items={FAQS} title="common questions" />

      <section className="cta">
        <svg className="art cta-art" viewBox="0 0 400 400" fill="none" aria-hidden="true">
          <path d="M40 120 h220 l100 100 v220 h-320 z" stroke="currentColor" strokeWidth="2.5" />
          <path d="M110 190 h150 l60 60 v150 h-210 z" stroke="currentColor" strokeWidth="2" opacity=".6" />
        </svg>
        <div className="wrap cta__in">
          <div className="cta__t">
            <h2 className="h-l">tell us about your project.</h2>
            <p>Book a 30-minute call to discuss what you need to build.</p>
          </div>
          <Link className="cta__btn notch" href="/contact/">
            Book a call
          </Link>
        </div>
      </section>
    </>
  );
}
