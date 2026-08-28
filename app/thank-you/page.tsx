import type { Metadata } from "next";
import Link from "next/link";
import { siteMeta } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { PageHero } from "@/components/page-hero";
import { FeaturedWork, LogoWall, WritingCards } from "@/components/sections";

export const metadata: Metadata = siteMeta({
  title: "Thanks",
  description: "Thanks — we'll be in touch, usually within one working day.",
  path: "/thank-you/",
  noindex: true,
});

const NEXT = [
  {
    n: "01",
    h: "we read it properly",
    body: "Your message goes to the founders, not a shared inbox. If it is not something we do well, you will hear that first — with a pointer to someone better.",
  },
  {
    n: "02",
    h: "a reply within one working day",
    body: "From the engineer who would run your project, with the questions that actually change the architecture.",
  },
  {
    n: "03",
    h: "thirty minutes, on a call",
    body: "Data model, integrations, and the parts that usually go wrong. You leave with a clearer picture whether or not you work with us.",
  },
];

export default function ThankYouPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "home", href: "/" }, { label: "thanks" }]}
        eyebrow="message received"
        title={
          <>
            thanks — we&apos;ll be in <span className="g-disp">touch</span>.
          </>
        }
        lede="Usually within one working day, from the engineer who would run your project. In the meantime, here is what we have shipped for other people."
        actions={[
          { label: "see the work", href: "/case-studies/" },
          { label: "back home", href: "/", variant: "out" },
        ]}
        aside={
          <div className="next-card notch notch-lg">
            <p className="eyebrow eyebrow--slab">what happens next</p>
            <ol>
              {NEXT.map((s) => (
                <li key={s.n}>
                  <span className="tnum">{s.n}</span>
                  <span>
                    <b>{s.h}</b>
                    <em>{s.body}</em>
                  </span>
                </li>
              ))}
            </ol>
            <p className="next-card__mail">
              Something urgent? <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            </p>
          </div>
        }
      />

      <LogoWall label="Teams that trusted us with the thing that matters" />

      <FeaturedWork
        title="while you wait — the work"
        lede="Ten engagements, each one still running in production with the numbers attached."
      />

      <WritingCards
        title="or the numbers behind them"
        lede="Cost studies and benchmarks from the same engagements."
      />

      <section className="cta">
        <div className="wrap cta__in">
          <div className="cta__t">
            <h2 className="h-l">forgot to mention something?</h2>
            <p>Reply to the thread, or write to us directly — it reaches the same people.</p>
          </div>
          <a className="cta__btn notch" href={`mailto:${SITE.email}`}>
            email {SITE.email}
          </a>
        </div>
      </section>

      <div className="wrap" style={{ paddingBottom: "3rem" }}>
        <Link className="arrow-link" href="/">
          &larr; back to the homepage
        </Link>
      </div>
    </>
  );
}
