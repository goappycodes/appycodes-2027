import type { Metadata } from "next";
import { siteMeta } from "@/lib/seo";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import {
  AwardsStrip,
  FeaturedWork,
  FoundersBand,
  LogoWall,
  Testimonials,
  WritingCards,
  Faq,
} from "@/components/sections";
import { SITE } from "@/lib/site";

export const metadata: Metadata = siteMeta({
  title: "About — the engineering studio behind the work",
  description:
    "Founder-led since 2015. What began with one engineer and a laptop is now a senior team shipping web platforms, mobile apps and AI systems across the UK, EU and US.",
  path: "/about/",
  image: "/images/team-discussion.jpg",
});

/* eslint-disable @next/next/no-img-element */

const PRINCIPLES = [
  {
    n: "01",
    h: "senior engineers only",
    body: "No juniors billed at senior rates, and no offshore layer you never meet. The people who scope your project are the people who write the code.",
  },
  {
    n: "02",
    h: "you own everything",
    body: "Your repository, your cloud accounts, your keys, from day one. There is no lock-in in the contract and none in the architecture either.",
  },
  {
    n: "03",
    h: "built for year four",
    body: "We are optimised to still be running your platform in year four, not to win the pitch. That changes what we build and what we refuse to build.",
  },
  {
    n: "04",
    h: "we say no",
    body: "If the work sits outside what we do well, we say so on the first call and point you somewhere better. A good referral beats a bad engagement.",
  },
  {
    n: "05",
    h: "the numbers, not the opinions",
    body: "We publish cost studies and benchmarks from real engagements, including the ones where the answer was 'do not build this'.",
  },
  {
    n: "06",
    h: "no discovery theatre",
    body: "A fixed written scope with the risky parts named up front. If we think your budget is wrong for the outcome, you hear it before you commit.",
  },
];

const FAQS = [
  {
    question: "How big is the team?",
    answer:
      "Deliberately small and senior. Engagements are run by the founders with a core team of engineers who have worked together for years — which is why a four-year partnership across five codebases is possible at all.",
  },
  {
    question: "Where are you based, and who do you work with?",
    answer:
      "We are based in India and most of our work is for companies in the UK, EU and US. Weekly demos on a real environment do more for a remote engagement than any amount of status reporting.",
  },
  {
    question: "What happens if we want to take the code in-house?",
    answer:
      "You take it. Documented handover to your team is a normal, planned ending — not a punishment. You already own the repository and the infrastructure, so there is nothing to hand over but knowledge.",
  },
  {
    question: "Do you do fixed price or time and materials?",
    answer:
      "Scoped phases with a fixed written scope and a number attached. Long-running platform work usually settles into a monthly arrangement once the shape of the system is known.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "home", href: "/" }, { label: "about" }]}
        eyebrow="the studio"
        title={
          <>
            we make building tech <span className="g-disp">simpler</span>.
          </>
        }
        lede={`What began in ${SITE.founded} with one engineer and a laptop is now a senior team supporting companies across India, the UK and the US — and we still own the codebases we shipped in year one.`}
        actions={[
          { label: "book a discovery call", href: "/contact/" },
          { label: "see the work", href: "/case-studies/", variant: "out" },
        ]}
        media={{
          src: "/images/team-discussion.jpg",
          alt: "The Appycodes team working through an architecture problem",
        }}
        stats={[
          { n: String(SITE.founded), label: "building since" },
          { n: "UK · EU · US", label: "markets served" },
          { n: "4+ yrs", label: "longest engagement" },
          { n: "senior", label: "only, no juniors" },
        ]}
      />

      <AwardsStrip />

      {/* STORY */}
      <section className="wrap sec">
        <div className="story">
          <div className="story__copy">
            <p className="eyebrow">how it started</p>
            <h2 className="h-l">every product has a beginning. ours was a frustration.</h2>
            <div className="prose">
              <p>
                Building tech was far more complicated than it needed to be — too many vendors, too
                many handoffs, and too many teams whose incentive ended at launch. So in {SITE.founded}{" "}
                we set out to fix that, with one engineer, a laptop, and a commitment to make it
                simpler.
              </p>
              <p>
                That has grown into a team supporting companies across India, the UK and the US —
                building SaaS web platforms, React Native mobile apps, AI systems, custom WordPress
                estates, and the technical search work that makes them found. The engagements did not
                end at launch either: several of the platforms we shipped in the early years are still
                ours to run.
              </p>
              <p>
                We are optimised to still be running your platform in year four. That single decision
                explains most of what follows — why we only staff seniors, why you own the repository
                from day one, and why we turn work down.
              </p>
            </div>
            <blockquote className="pullquote">
              A good referral beats a bad engagement. If it is not something we do well, you hear that
              on the first call.
            </blockquote>
          </div>

          <div className="story__side">
            <figure className="story__fig notch notch-lg">
              <img src="/images/ritesh-prince.jpg" alt="The founders at work" loading="lazy" />
              <figcaption>Founder-led since {SITE.founded} — the same people, engagement after engagement.</figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* PRINCIPLES */}
      <section className="slab dotted">
        <div className="wrap slab__in">
          <div className="sec__head">
            <p className="eyebrow eyebrow--slab">what drives us</p>
            <h2 className="h-l" style={{ color: "#fff", maxWidth: "20ch" }}>
              six decisions we made early and never walked back
            </h2>
          </div>
          <div className="proc proc--6">
            {PRINCIPLES.map((p) => (
              <div key={p.n} className="proc__i notch">
                <span className="proc__n g-dark">{p.n}</span>
                <h3 className="h-s">{p.h}</h3>
                <p>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <LogoWall label="Teams that trusted us with the thing that matters" />

      <FeaturedWork
        title="a decade of it, in four engagements"
        lede="Each one still running in production, with the numbers attached."
      />

      <FoundersBand
        title={
          <>
            the strategist and the builder behind the <span className="name">magic</span>
          </>
        }
        body="You work with the founders. Ritesh and Swati have run every engagement on this site — the people who scope your project are the people who build it."
      />

      <Testimonials limit={4} />

      <WritingCards
        title="what we have published"
        lede="Cost studies and benchmarks from real engagements — including the ones where the honest answer was 'do not build this'."
      />

      <Faq items={FAQS} title="the practical questions" />

      <section className="cta">
        <svg className="art cta-art" viewBox="0 0 400 400" fill="none" aria-hidden="true">
          <path d="M40 120 h220 l100 100 v220 h-320 z" stroke="currentColor" strokeWidth="2.5" />
          <path d="M110 190 h150 l60 60 v150 h-210 z" stroke="currentColor" strokeWidth="2" opacity=".6" />
        </svg>
        <div className="wrap cta__in">
          <div className="cta__t">
            <h2 className="h-l">tell us what you are trying to build.</h2>
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
