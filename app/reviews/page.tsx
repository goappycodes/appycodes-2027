import type { Metadata } from "next";
import Link from "next/link";
import { REVIEWS, AWARDS } from "@/lib/site";
import { PageHero } from "@/components/page-hero";
import { FeaturedWork, LogoWall, Faq } from "@/components/sections";
import { Star } from "@/components/icons";

export const metadata: Metadata = {
  title: "Reviews — what clients say",
  description:
    "Real reviews from founders, product teams and business owners across the UK, US and beyond — and the engagements they came from.",
};

/* eslint-disable @next/next/no-img-element */

/* Which engagement each review came out of, so a quote is never floating free. */
const CONTEXT: Record<string, { work: string; href?: string }> = {
  "Charles Montgomery": { work: "Web platform & technical consulting" },
  "Josh Wood": { work: "Bloc — app, backend, ads manager, marketplace", href: "/case-studies/bloc/" },
  "Simon Jones": { work: "Ongoing platform & delivery support" },
  "Gus McDougall": { work: "Development partnership for an agency team" },
};

const PLATFORMS = AWARDS.filter((a) =>
  ["Clutch", "PeoplePerHour", "Google", "Glassdoor"].includes(a.by)
);

const FAQS = [
  {
    question: "Are these reviews verified?",
    answer:
      "They come from named people at named companies, gathered on the platforms we work through — Clutch, PeoplePerHour and Google among them. Nothing on this page is anonymous.",
  },
  {
    question: "Can I speak to a reference directly?",
    answer:
      "Yes. On a serious engagement we will introduce you to a client whose project looked like yours. A twenty-minute call with them is worth more than any page of quotes.",
  },
  {
    question: "Why so few?",
    answer:
      "We publish the ones we can attribute properly. A short list of real names beats a wall of stars with no one behind them.",
  },
];

export default function ReviewsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "home", href: "/" }, { label: "reviews" }]}
        eyebrow="reviews"
        title={
          <>
            the people who signed off the <span className="g-disp">work</span>.
          </>
        }
        lede="Founders, product teams and business owners we have built for — with the engagement each review came out of, so you can see what was actually being judged."
        actions={[
          { label: "start a project", href: "/contact/" },
          { label: "see the work", href: "/case-studies/", variant: "out" },
        ]}
        media={{
          src: "/images/team-discussion.jpg",
          alt: "The Appycodes team working with a client",
        }}
        stats={[
          { n: "UK · EU · US", label: "clients across" },
          { n: "2015", label: "reviewed since" },
          { n: "4+ yrs", label: "longest engagement" },
          { n: "founder-led", label: "every engagement" },
        ]}
      />

      {/* PLATFORM BADGES */}
      <section className="wrap platforms">
        <span className="platforms__lbl">Reviewed on</span>
        <ul>
          {PLATFORMS.map((p) => (
            <li key={p.by}>
              <img src={p.img} alt={p.by} loading="lazy" />
              <span>{p.by}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* THE REVIEWS — full cards with context */}
      <section className="wrap sec">
        <div className="sec__head">
          <p className="eyebrow">in their words</p>
          <h2 className="h-l">nobody here was asked to be nice.</h2>
        </div>

        <div className="reviews">
          {REVIEWS.map((t) => {
            const ctx = CONTEXT[t.name];
            return (
              <figure key={t.name} className="review notch notch-lg">
                <div className="review__stars" aria-label="Five out of five">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} aria-hidden />
                  ))}
                </div>
                <blockquote className="review__t">&ldquo;{t.quote}&rdquo;</blockquote>
                <figcaption className="review__by">
                  <img src={t.avatar} alt={t.name} loading="lazy" />
                  <span className="review__who">
                    <span className="review__n">{t.name}</span>
                    <span className="review__r">{t.role}</span>
                  </span>
                </figcaption>
                {ctx ? (
                  <p className="review__ctx">
                    {ctx.href ? <Link href={ctx.href}>{ctx.work} &rarr;</Link> : ctx.work}
                  </p>
                ) : null}
              </figure>
            );
          })}
        </div>
      </section>

      <LogoWall label="Teams that trusted us with the thing that matters" />

      <FeaturedWork
        title="the engagements behind the quotes"
        lede="Every review above came out of one of these — or work very like it."
      />

      <Faq items={FAQS} title="about these reviews" />

      <section className="cta">
        <svg className="art cta-art" viewBox="0 0 400 400" fill="none" aria-hidden="true">
          <path d="M40 120 h220 l100 100 v220 h-320 z" stroke="currentColor" strokeWidth="2.5" />
          <path d="M110 190 h150 l60 60 v150 h-210 z" stroke="currentColor" strokeWidth="2" opacity=".6" />
        </svg>
        <div className="wrap cta__in">
          <div className="cta__t">
            <h2 className="h-l">want to be the next one?</h2>
            <p>A thirty-minute call with the engineer who would run it.</p>
          </div>
          <Link className="cta__btn notch" href="/contact/">
            book a call
          </Link>
        </div>
      </section>
    </>
  );
}
