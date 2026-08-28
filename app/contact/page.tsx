import type { Metadata } from "next";
import { siteMeta } from "@/lib/seo";
import Link from "next/link";
import { SITE } from "@/lib/site";
import { PageHero } from "@/components/page-hero";
import { AwardsStrip, FeaturedWork, LogoWall, Testimonials, Faq } from "@/components/sections";
import { Mail, ArrowUpRight, Check } from "@/components/icons";

export const metadata: Metadata = siteMeta({
  title: "Contact — book a discovery call",
  description:
    "Book a thirty-minute discovery call with the engineer who would run your project. Founder-led, senior-only, building since 2015.",
  path: "/contact/",
  image: "/images/ritesh.jpg",
});

/* eslint-disable @next/next/no-img-element */

const STEPS = [
  {
    n: "01",
    h: "you send a few lines",
    body: "What you are trying to build, roughly when, and roughly what it is worth to you. Three sentences is plenty — no brief template, no discovery form.",
  },
  {
    n: "02",
    h: "we reply within one working day",
    body: "From the engineer who would run it, not an account manager. If it is not something we do well, we say so in that first reply and point you somewhere better.",
  },
  {
    n: "03",
    h: "thirty minutes, on a call",
    body: "We go through the data model, the integrations and the parts that usually go wrong. You leave with a clearer picture whether or not you work with us.",
  },
  {
    n: "04",
    h: "a written scope and a number",
    body: "A fixed scope with the risky parts named up front. If we think your budget is wrong for the outcome, we tell you before you commit, not after.",
  },
];

const BRING = [
  "What the software has to do on day one — not the full five-year roadmap",
  "Anything it must talk to: payment providers, ERPs, booking APIs, internal systems",
  "Where you are today: a spreadsheet, a no-code tool, an AI prototype, or nothing yet",
  "Your real deadline, and what happens to the business if it slips",
  "Roughly what the outcome is worth — it changes the architecture, not the price",
];

const FAQS = [
  {
    question: "Do I need a full specification before we talk?",
    answer:
      "No. Most engagements start from a few paragraphs and a conversation. Writing the specification is part of the work — and doing it before you understand the data model usually means writing it twice.",
  },
  {
    question: "Who is actually on the call?",
    answer:
      "The founders. Ritesh has run the architecture on every engagement on this site. You will not be handed to a delivery manager after signing.",
  },
  {
    question: "What does a project typically cost?",
    answer:
      "It depends entirely on scope, but we publish real numbers rather than ranges pulled from the air — our cost studies break down MVPs, replatforms and rescue work from actual engagements.",
  },
  {
    question: "Do you work with clients outside India?",
    answer:
      "Most of our work is for companies in the UK, EU and US. We have run multi-year engagements across those time zones since 2015, with weekly demos on a real environment rather than status reports.",
  },
  {
    question: "What if you are not the right fit?",
    answer:
      "We say so on the first call and, where we can, point you to someone better suited. A good referral is worth more to us than a bad engagement.",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "home", href: "/" }, { label: "contact" }]}
        eyebrow="start a project"
        title={
          <>
            tell us what you are trying to <span className="g-disp">build</span>.
          </>
        }
        lede={
          <>
            A thirty-minute call with the engineer who would run it — not a salesperson, and not a form
            that goes nowhere. Founder-led and senior-only since {SITE.founded}.
          </>
        }
        actions={[{ label: `email ${SITE.email}`, href: `mailto:${SITE.email}` }]}
        stats={[
          { n: "< 1 day", label: "typical reply time" },
          { n: "30 min", label: "discovery call" },
          { n: "UK · EU · US", label: "markets served" },
          { n: String(SITE.founded), label: "building since" },
        ]}
      />

      {/* WAYS IN + WHAT HAPPENS NEXT */}
      <section className="wrap sec">
        <div className="contact-grid">
          <div>
            <p className="eyebrow">how to reach us</p>
            <h2 className="h-l">three sentences is enough to start.</h2>
            <p className="lede">
              There is no intake form, no qualification call and no CRM sequence. Email lands with the
              founders and gets a real answer.
            </p>

            <div className="ways">
              <a className="way notch" href={`mailto:${SITE.email}`}>
                <span className="way__ico"><Mail aria-hidden /></span>
                <span className="way__b">
                  <span className="way__t">email us directly</span>
                  <span className="way__d">{SITE.email}</span>
                </span>
                <ArrowUpRight className="way__arrow" aria-hidden />
              </a>
              <a
                className="way notch"
                href={`mailto:${SITE.email}?subject=Discovery%20call&body=What%20we%20are%20building%3A%0A%0ARough%20timeline%3A%0A%0AWhat%20it%20has%20to%20talk%20to%3A%0A`}
              >
                <span className="way__ico">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                    <rect x="3" y="4.5" width="18" height="16" rx="2" />
                    <path d="M3 9.5h18M8 2.5v4M16 2.5v4" strokeLinecap="round" />
                  </svg>
                </span>
                <span className="way__b">
                  <span className="way__t">book a discovery call</span>
                  <span className="way__d">Thirty minutes, with the engineer who would run it</span>
                </span>
                <ArrowUpRight className="way__arrow" aria-hidden />
              </a>
              <Link className="way notch" href="/case-studies/">
                <span className="way__ico">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                    <path d="M4 19V9m5 10V5m5 14v-7m5 7V8" strokeLinecap="round" />
                  </svg>
                </span>
                <span className="way__b">
                  <span className="way__t">see the work first</span>
                  <span className="way__d">Fifteen engagements, with the numbers attached</span>
                </span>
                <ArrowUpRight className="way__arrow" aria-hidden />
              </Link>
            </div>

            <div className="bring notch">
              <p className="bring__lbl">worth including</p>
              <ul>
                {BRING.map((b) => (
                  <li key={b}>
                    <Check className="bring__ico" aria-hidden />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <aside className="contact-side">
            <figure className="contact-photo notch notch-lg">
              <img src="/images/ritesh.jpg" alt="Ritesh, founder and lead architect" loading="lazy" />
              <figcaption>
                <strong>Ritesh</strong>
                <span>Founder &amp; lead architect — the person who answers your email</span>
              </figcaption>
            </figure>

            <div className="steps">
              <p className="eyebrow">what happens next</p>
              {STEPS.map((s) => (
                <div key={s.n} className="step">
                  <span className="step__n tnum">{s.n}</span>
                  <div className="step__b">
                    <h3 className="step__t">{s.h}</h3>
                    <p>{s.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <LogoWall />

      <FeaturedWork
        title="what a first call has turned into before"
        lede="Every engagement below started with a short email and a thirty-minute conversation."
      />

      <Testimonials limit={4} />

      <Faq items={FAQS} title="before you write in" />

      <AwardsStrip />

      <section className="cta">
        <svg className="art cta-art" viewBox="0 0 400 400" fill="none" aria-hidden="true">
          <path d="M40 120 h220 l100 100 v220 h-320 z" stroke="currentColor" strokeWidth="2.5" />
          <path d="M110 190 h150 l60 60 v150 h-210 z" stroke="currentColor" strokeWidth="2" opacity=".6" />
        </svg>
        <div className="wrap cta__in">
          <div className="cta__t">
            <h2 className="h-l">still reading? just send the three sentences.</h2>
            <p>We reply within one working day, from the engineer who would run your project.</p>
          </div>
          <a className="cta__btn notch" href={`mailto:${SITE.email}`}>
            email {SITE.email}
          </a>
        </div>
      </section>
    </>
  );
}
