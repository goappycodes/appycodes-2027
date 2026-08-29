import type { Metadata } from "next";
import Link from "next/link";
import { siteMeta } from "@/lib/seo";
import { PageHero } from "@/components/page-hero";
import { FeaturedWork, LogoWall, Faq } from "@/components/sections";
import { Monogram } from "@/components/monogram";
import { Star, ArrowUpRight, ArrowRight } from "@/components/icons";
import { JsonLd } from "@/components/jsonld";
import { reviewsSchema, breadcrumbSchema } from "@/lib/schema";
import { REVIEWS, CLUTCH_PROFILE, CLUTCH_STATS, reviewIdentity } from "@/lib/site";

export const metadata: Metadata = siteMeta({
  title: "Testimonials — verified client reviews on Clutch",
  description:
    `${CLUTCH_STATS.count} verified client reviews from our Clutch profile, every one rated ${CLUTCH_STATS.rating}/5.0 — founders and product teams across the UK, EU and US, each quote linking back to the original on Clutch.`,
  path: "/testimonials/",
  image: "/images/team-discussion.jpg",
});

/* eslint-disable @next/next/no-img-element */

/* Real commercial exchanges from the register. Clients unnamed, because the
   point is our conduct rather than their identity. */
const VIGNETTES = [
  {
    k: "the timeline was challenged",
    situation:
      "A client had been told three to four months by someone else, and we had quoted five weeks. They pushed back hard.",
    did: "We answered with specifics rather than a discount: bandwidth had increased so two developers would work in parallel, the five weeks covered development only, and testing, feedback and revisions sat on top of it. No padding and no defensiveness — just a clear separation between build time and project time.",
  },
  {
    k: "the scope quietly grew",
    situation:
      "On a fixed-design corporate build, change requests accumulated outside the agreed designs and sitemap — new sections, new page elements, new UI.",
    did: "Rather than absorb them or refuse, we issued a change-request quote. The client asked for the list again, we re-reviewed it and separated what was genuinely new from what was already in scope. The engagement continued and the relationship held.",
  },
  {
    k: "we were asked about a competitor",
    situation:
      "A client received an end-to-end marketing proposal from another agency and asked what we thought.",
    did: "We said it was templated, that outcomes depend far more on the individual doing the work than the logo on the deck, and that agencies charging on a recurring basis tend to be good mainly in the first few months — a category that includes agencies structured like ours. They agreed and deferred. They came back later with a website build.",
  },
  {
    k: "a paid tool stopped being needed",
    situation:
      "A migration required a paid data-import plan on the client's account. Once the bulk work was done, it had no further use.",
    did: "We flagged it for cancellation two days before renewal and told the client. Actively cancelling a subscription you no longer need — on someone else's card — costs nothing and is worth a great deal.",
  },
];

const FAQS = [
  {
    question: "Are these reviews real?",
    answer:
      "Every one is a verified client review published on our Clutch profile. Clutch runs its own identity and work-history check on each reviewer before it publishes, and marks the ones it verifies. Each quote on this page links straight to the original on Clutch so you can read it in full.",
  },
  {
    question: "Why are some reviewers anonymous?",
    answer:
      "That is the reviewer's choice on Clutch, not ours — some clients publish their name and company, others withhold it. Where a name is withheld we show the role, industry and location Clutch does publish, and the review is still verified.",
  },
  {
    question: "Can I speak to a reference directly?",
    answer:
      "Yes. On a serious engagement we will introduce you to a client whose project looked like yours. A twenty-minute call with them is worth more than any page of quotes.",
  },
];

export default function TestimonialsPage() {
  return (
    <>
      <JsonLd data={reviewsSchema(REVIEWS, CLUTCH_STATS.rating)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Testimonials", path: "/testimonials/" },
        ])}
      />

      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Testimonials" }]}
        eyebrow="testimonials · verified on clutch"
        title={
          <>
            {CLUTCH_STATS.count} clients, one score: <span className="g-disp">{CLUTCH_STATS.rating}</span>.
          </>
        }
        lede="Every review below is a verified client review from our Clutch profile — reproduced word for word, each one linking back to the original. Founders and product teams across the UK, EU and US, on work that shipped and stayed in production."
        actions={[
          { label: "Start a project", href: "/contact/" },
          { label: "See the work", href: "/case-studies/", variant: "out" },
        ]}
        media={{
          src: "/images/team-discussion.jpg",
          alt: "The Appycodes team working with a client",
        }}
        stats={[
          { n: `${CLUTCH_STATS.rating}/5.0`, label: "average rating" },
          { n: String(CLUTCH_STATS.count), label: "verified reviews" },
          { n: "UK · EU · US", label: "clients across" },
          { n: "since 2015", label: "reviewed on Clutch" },
        ]}
      />

      {/* CLUTCH ATTRIBUTION */}
      <section className="wrap clutch-strip">
        <div className="clutch-strip__mark">
          <img src="/images/award-clutch.png" alt="" loading="lazy" />
          <span>Clutch</span>
        </div>
        <p className="clutch-strip__t">
          These are not marketing testimonials we wrote. They are{" "}
          <strong>{CLUTCH_STATS.count} verified reviews</strong> collected and identity-checked by
          Clutch, an independent B2B review platform. Every quote is verbatim, and every card links
          to the original.
        </p>
        <a
          className="clutch-strip__cta"
          href={`${CLUTCH_PROFILE}#reviews`}
          target="_blank"
          rel="noopener noreferrer"
        >
          View the Clutch profile <ArrowUpRight />
        </a>
      </section>

      {/* THE WALL — every verified review, each linked to Clutch */}
      <section className="wrap sec">
        <div className="sec__head">
          <p className="eyebrow">in their words</p>
          <h2 className="h-l">nobody here was asked to be nice.</h2>
        </div>

        <div className="reviews">
          {REVIEWS.map((t) => {
            const id = reviewIdentity(t);
            return (
              <figure key={t.url} className="review notch notch-lg">
                <div className="review__stars" aria-label={`${CLUTCH_STATS.rating} out of 5`}>
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} aria-hidden />
                  ))}
                </div>
                <blockquote className="review__t">&ldquo;{t.quote}&rdquo;</blockquote>
                <figcaption className="review__by">
                  {t.avatar ? (
                    <img src={t.avatar} alt="" loading="lazy" />
                  ) : (
                    <Monogram seed={id.seed} className="review__mono" />
                  )}
                  <span className="review__who">
                    <span className="review__n">{id.primary}</span>
                    <span className="review__r">{id.secondary}</span>
                  </span>
                </figcaption>
                <p className="review__meta">
                  {t.project} · {t.date}
                </p>
                <div className="review__foot">
                  <a
                    className="review__src"
                    href={t.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Read on Clutch <ArrowUpRight />
                  </a>
                  {t.caseHref ? (
                    <Link className="review__case" href={t.caseHref}>
                      See the work <ArrowRight />
                    </Link>
                  ) : null}
                </div>
              </figure>
            );
          })}
        </div>
      </section>

      {/* HOW WE HANDLE IT — the exchanges that earn quotes like these */}
      <section className="slab dotted">
        <div className="wrap slab__in">
          <div className="sec__head">
            <p className="eyebrow eyebrow--slab">what good looks like with money on the table</p>
            <h2 className="h-l" style={{ color: "#fff", maxWidth: "26ch" }}>
              testimonials say we are good. these show how we behave.
            </h2>
            <p className="lede" style={{ color: "var(--on-slab-2)" }}>
              Four real commercial moments from the register, each one where the easy option and the
              right one pointed in different directions.
            </p>
          </div>
          <div className="vign">
            {VIGNETTES.map((v) => (
              <article key={v.k} className="vign__i notch">
                <p className="vign__k">{v.k}</p>
                <p className="vign__s">{v.situation}</p>
                <p className="vign__d">{v.did}</p>
              </article>
            ))}
          </div>
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
            Book a call
          </Link>
        </div>
      </section>
    </>
  );
}
