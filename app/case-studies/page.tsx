import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { AwardsStrip, CASE_STUDIES, LogoWall, Testimonials, Faq } from "@/components/sections";
import { ChevronRight } from "@/components/icons";

export const metadata: Metadata = {
  title: "Case studies — companies we've helped ship",
  description:
    "Selected engagements: Ontick's custom ticketing platform, Bloc's four-year build, Yippee Malta's booking engine and Professional Energy's brokerage ERP.",
};

/* eslint-disable @next/next/no-img-element */

const DETAIL: Record<string, { sector: string; span: string; scope: string[] }> = {
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
    question: "Why are there only four case studies?",
    answer:
      "Because these are the ones we can show properly, with the client's agreement and real numbers attached. We would rather publish four honest engagements than twenty logos with a sentence each.",
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
          { n: "4+ yrs", label: "longest engagement" },
          { n: "90+", label: "core web vitals" },
          { n: "5", label: "codebases, one team" },
        ]}
      />

      <LogoWall label="Teams that trusted us with the thing that matters" />

      {/* THE FOUR — full-width alternating rows */}
      <section className="wrap sec">
        <div className="sec__head">
          <p className="eyebrow">the engagements</p>
          <h2 className="h-l">four companies, four systems still in production.</h2>
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
