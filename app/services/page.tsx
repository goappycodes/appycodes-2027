import type { Metadata } from "next";
import { siteMeta } from "@/lib/seo";
import Link from "next/link";
import { SERVICES_DATA, LEGACY_SERVICE_LABELS, LEGACY_SERVICE_REDIRECTS } from "@/lib/services-data";
import { ServiceTitle } from "@/components/service-title";
import { ChevronRight, ArrowUpRight } from "@/components/icons";
import { PageHero } from "@/components/page-hero";
import { AwardsStrip, FeaturedWork, LogoWall, Testimonials, WritingCards, Faq } from "@/components/sections";
import { serviceMedia } from "@/lib/media";

export const metadata: Metadata = siteMeta({
  title: "Services — what we do well",
  description:
    "Six practices we ship repeatedly: product platforms, native mobile, AI systems, rescue and hardening, commerce and content, and performance and search.",
  path: "/services/",
  image: "/images/service-saas-web.jpg",
});

/* eslint-disable @next/next/no-img-element */

const HOW = [
  {
    n: "01",
    h: "scope & cost",
    body: "A fixed written scope with the risky parts named up front. If we think the budget is wrong for the outcome, we say so before you commit.",
  },
  {
    n: "02",
    h: "architecture",
    body: "Data model, integrations and failure modes decided on paper first. This is where most projects are quietly lost.",
  },
  {
    n: "03",
    h: "build in the open",
    body: "Your repo, your infrastructure, weekly demos on a real environment. No black box, no big reveal at the end.",
  },
  {
    n: "04",
    h: "handover or stay",
    body: "Documented handover to your team, or we keep running it. Both are real options — the first is not a punishment.",
  },
];

const FAQS = [
  {
    question: "Can I hire you for just one of these?",
    answer:
      "Yes. Most engagements start inside one practice — a platform build, a rescue, a performance programme — and only widen if there is a reason. We do not bundle.",
  },
  {
    question: "What if my problem spans several of them?",
    answer:
      "That is the common case. A product platform usually needs a mobile client, billing and search work behind it. One team runs the whole estate rather than handing you between vendors.",
  },
  {
    question: "Do you take on work outside these practices?",
    answer:
      "Rarely, and we will tell you on the first call. These are the areas we have shipped repeatedly for a decade; anything else is a worse deal for you than a good referral.",
  },
  {
    question: "Who writes the code?",
    answer:
      "Senior engineers only. No juniors billed at senior rates, and no offshore layer you never meet. The people who scope your project are the people who build it.",
  },
  {
    question: "Who owns the code and infrastructure?",
    answer:
      "You do, from day one — your repository, your cloud accounts, your keys. There is no lock-in in the contract and none in the architecture either.",
  },
];

export default function ServicesIndex() {
  const subsByPillar = SERVICES_DATA.map((s) => ({
    pillar: s,
    subs: Object.entries(LEGACY_SERVICE_REDIRECTS)
      .filter(([slug, parent]) => parent === s.slug && LEGACY_SERVICE_LABELS[slug])
      .map(([slug]) => ({ slug, label: LEGACY_SERVICE_LABELS[slug] })),
  }));
  const subCount = Object.keys(LEGACY_SERVICE_LABELS).length;

  return (
    <>
      <PageHero
        crumbs={[{ label: "home", href: "/" }, { label: "services" }]}
        eyebrow="what we do"
        title={
          <>
            the practices behind the <span className="g-disp">work</span>.
          </>
        }
        lede={`Not a menu to pick from — the ${SERVICES_DATA.length} areas we have shipped repeatedly for a decade. If your problem sits outside them, we will say so on the first call.`}
        actions={[
          { label: "start a project", href: "/contact/" },
          { label: "see the work", href: "/case-studies/", variant: "out" },
        ]}
        media={{ src: "/images/service-saas-web.jpg", alt: "A product platform under construction" }}
        stats={[
          { n: String(SERVICES_DATA.length), label: "practices" },
          { n: String(subCount), label: "specialisms" },
          { n: "10 yrs", label: "shipping them" },
          { n: "senior", label: "only, no juniors" },
        ]}
      />

      <AwardsStrip label="Recognised by" />

      {/* THE PILLARS — image-led cards */}
      <section className="wrap sec">
        <div className="sec__head">
          <p className="eyebrow">the practices</p>
          <h2 className="h-l">each one is a practice, not a package.</h2>
          <p className="lede">
            Every pillar below has engineers who have run it for years, a process we can show you, and
            case studies attached. Open one to see how it actually works.
          </p>
        </div>

        <div className="pillars">
          {SERVICES_DATA.map((s, i) => {
            const media = serviceMedia(s.slug);
            const subs = subsByPillar[i].subs;
            return (
              <Link key={s.slug} href={`/services/${s.slug}/`} className="pillar notch notch-lg">
                <div className="pillar__shot">
                  <img src={media.img} alt={media.alt} loading="lazy" />
                  <span className="pillar__n tnum">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <div className="pillar__in">
                  <h3 className="h-m">
                    <ServiceTitle label={s.title} />
                  </h3>
                  <p className="body">{s.summary}</p>
                  <div className="pillar__foot">
                    <span className="pillar__count">
                      {subs.length} {subs.length === 1 ? "specialism" : "specialisms"}
                    </span>
                    <ChevronRight className="pillar__chev" aria-hidden />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* HOW WE WORK — dark slab */}
      <section className="slab dotted">
        <div className="wrap slab__in">
          <div className="sec__head">
            <p className="eyebrow eyebrow--slab">how we work</p>
            <h2 className="h-l" style={{ color: "#fff", maxWidth: "21ch" }}>
              no discovery theatre. four steps, and you own everything at each one
            </h2>
          </div>
          <div className="proc">
            {HOW.map((p) => (
              <div key={p.n} className="proc__i notch">
                <span className="proc__n g-dark">{p.n}</span>
                <h3 className="h-s">{p.h}</h3>
                <p>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FeaturedWork
        title="what these practices have shipped"
        lede="Fourteen engagements, each one running in production with the numbers attached."
      />

      <LogoWall />

      {/* EVERY SPECIALISM — the full legacy index, grouped by pillar */}
      <section className="wrap sec">
        <div className="sec__head">
          <p className="eyebrow">the full index</p>
          <h2 className="h-l">every specialism, and the practice it sits in.</h2>
          <p className="lede">
            {subCount} specific services with a page each — the exact work, what is included, and what
            it costs you to get it wrong.
          </p>
        </div>

        <div className="index-cols">
          {subsByPillar.map(({ pillar, subs }) => (
            <div key={pillar.slug} className="index-col">
              <h3 className="index-col__h">
                <Link href={`/services/${pillar.slug}/`}>
                  <ServiceTitle label={pillar.title} />
                  <ArrowUpRight aria-hidden />
                </Link>
              </h3>
              <ul>
                {subs.map((sub) => (
                  <li key={sub.slug}>
                    <Link href={`/services/${sub.slug}/`}>{sub.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <Testimonials limit={4} />

      <WritingCards
        title="the numbers behind these decisions"
        lede="Cost studies and benchmarks from the same engagements — build versus buy, replatform costs, and where the break-even actually falls."
      />

      <Faq items={FAQS} title="questions, answered" />

      <section className="cta">
        <svg className="art cta-art" viewBox="0 0 400 400" fill="none" aria-hidden="true">
          <path d="M40 120 h220 l100 100 v220 h-320 z" stroke="currentColor" strokeWidth="2.5" />
          <path d="M110 190 h150 l60 60 v150 h-210 z" stroke="currentColor" strokeWidth="2" opacity=".6" />
        </svg>
        <div className="wrap cta__in">
          <div className="cta__t">
            <h2 className="h-l">not sure which one you need?</h2>
            <p>Describe the problem in three sentences. We will tell you which practice it is — or that it is not us.</p>
          </div>
          <Link className="cta__btn notch" href="/contact/">
            book a call
          </Link>
        </div>
      </section>
    </>
  );
}
