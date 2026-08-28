import type { Metadata } from "next";
import { siteMeta } from "@/lib/seo";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { AwardsStrip, CASE_STUDIES, LogoWall, Testimonials, Faq } from "@/components/sections";
import { ChevronRight } from "@/components/icons";
import { SHORT_CASES } from "@/lib/short-cases";

export const metadata: Metadata = siteMeta({
  title: "Case studies — companies we've helped ship",
  description:
    "Selected engagements: Creoate's eight-year B2B marketplace, Easyship's global shipping site and CMS, Decofetch's custom furniture store, the BA Engine Room AI ops platform, Bloc's self-serve ad manager, Ontick's ticketing, Bloc's four-year build, Zonely's real-time companionship app, DeepSpatial's geospatial-AI site, Yippee Malta and Professional Energy's ERP.",
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
  Decofetch: {
    sector: "Luxury furniture e-commerce",
    span: "Ground-up build",
    scope: ["Next.js storefront", "Custom Laravel API", "Bespoke admin", "AWS ECS infra", "SEO & product feeds"],
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
    sector: "Event ticketing",
    span: "Platform + two native apps",
    scope: ["Multi-organizer platform", "Stripe instalments", "iOS & Android apps", "Scanning at the door"],
  },
  Bloc: {
    sector: "Social events",
    span: "Four-year partnership",
    scope: ["React Native app", "Backend & APIs", "Ads manager", "Algorand marketplace", "Web front"],
  },
  Zonely: {
    sector: "Social · real-time marketplace",
    span: "Two apps + admin, live",
    scope: ["React Native consumer app", "Buddy app", "Real-time metered billing", "Trust & safety / moderation", "Wallet & coins economy"],
  },
  DeepSpatial: {
    sector: "Geospatial AI (public co.)",
    span: "Since 2024, ongoing",
    scope: ["Corporate site", "Investor-relations pages", "Xploor talent platform", "Global & India editions", "AWS Amplify"],
  },
  "Yippee Malta": {
    sector: "Travel & tours",
    span: "Rebuild + custom checkout",
    scope: ["Mobile-first design system", "Custom checkout", "Proprietary booking API", "Core Web Vitals"],
  },
  "Professional Energy": {
    sector: "Energy brokerage",
    span: "Tailor-made ERP",
    scope: ["Supplier tenders", "Contract lifecycle", "Brokerage accounting", "Client management"],
  },
};

const FAQS = [
  {
    question: "Why are only eleven written up in full?",
    answer:
      "Because those are the ones we can show properly, with the client's agreement and real numbers attached. The twelve below them are described by sector rather than named — much of that work was delivered under a partner's name, so the engineering is ours to publish and the identity is not.",
  },
  {
    question: "Is that everything you have done?",
    answer:
      "No — the full register is 298 projects for 226 clients across 13 countries, and it is published on the atlas page with the counting method attached. These twenty-three are the ones worth reading.",
  },
  {
    question: "Can I talk to any of these clients?",
    answer:
      "Yes. On a serious engagement we will put you in touch with a reference whose project looked like yours. That is a better signal than anything on this page.",
  },
  {
    question: "Do you still run these platforms?",
    answer:
      "Several of them, years after launch. Handover to your own team is always an option, but we are optimised to still be running your platform in year four rather than to win the pitch.",
  },
];

export default function CaseStudiesIndex() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "home", href: "/" }, { label: "work" }]}
        eyebrow="selected work"
        title={
          <>
            we measure the work by what happened <span className="g-disp">next</span>.
          </>
        }
        lede="Not a menu of services — a short list of companies, what we built with them, and the change it made. Every number below comes from a live production system."
        actions={[
          { label: "start a project", href: "/contact/" },
          { label: "see the services", href: "/services/", variant: "out" },
        ]}
        stats={[
          { n: "£2M+", label: "processed via Ontick" },
          { n: "8+ yrs", label: "longest engagement" },
          { n: "90+", label: "core web vitals" },
          { n: "5", label: "codebases, one team" },
        ]}
      />

      <LogoWall label="Teams that trusted us with the thing that matters" />

      {/* THE SIX — full-width alternating rows */}
      <section className="wrap sec">
        <div className="sec__head">
          <p className="eyebrow">the engagements</p>
          <h2 className="h-l">eleven companies, eleven systems still in production.</h2>
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
                    read the case study <ChevronRight aria-hidden />
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
            <p className="eyebrow eyebrow--slab">twelve more, in short</p>
            <h2 className="h-l" style={{ color: "#fff" }}>
              picked for the hard problem, not the logo.
            </h2>
            <p className="lede" style={{ color: "var(--on-slab-2)" }}>
              Described by sector rather than named — a large share of this was delivered under a
              partner&rsquo;s name. The engineering is ours to publish. On a live engagement we will
              introduce you to a reference directly.
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
                  {c.problem ? (
                    <Link className="short__link" href={`/problems/${c.problem}/`}>
                      read the fix <ChevronRight aria-hidden />
                    </Link>
                  ) : c.sector ? (
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
        title="the people who signed off this work"
        lede="Founders and operators who lived with the result long after launch."
      />

      <AwardsStrip />

      <Faq items={FAQS} title="about this page" />

      <section className="cta">
        <svg className="art cta-art" viewBox="0 0 400 400" fill="none" aria-hidden="true">
          <path d="M40 120 h220 l100 100 v220 h-320 z" stroke="currentColor" strokeWidth="2.5" />
          <path d="M110 190 h150 l60 60 v150 h-210 z" stroke="currentColor" strokeWidth="2" opacity=".6" />
        </svg>
        <div className="wrap cta__in">
          <div className="cta__t">
            <h2 className="h-l">what would your entry on this page say?</h2>
            <p>A thirty-minute call with the engineer who would run it — not a salesperson.</p>
          </div>
          <Link className="cta__btn notch" href="/contact/">
            book a call
          </Link>
        </div>
      </section>
    </>
  );
}
