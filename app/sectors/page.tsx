import type { Metadata } from "next";
import Link from "next/link";
import { siteMeta } from "@/lib/seo";
import { PageHero } from "@/components/page-hero";
import { AwardsStrip, Faq, LogoWall, Testimonials } from "@/components/sections";
import { ChevronRight } from "@/components/icons";
import { ServiceTitle } from "@/components/service-title";
import { SECTORS_DATA } from "@/lib/sectors-data";
import { TOTALS } from "@/lib/portfolio-data";

export const metadata: Metadata = siteMeta({
  title: "Sectors — the industries we have already built in",
  description:
    "Energy, education, fintech, distribution, events, health, professional services, sport and Tally/Zoho integration — what we have built in each, and the part that was hard.",
  path: "/sectors/",
});

const FAQS = [
  {
    question: "What if our sector is not listed?",
    answer:
      "The register covers fifteen sectors and these are the ones where the proof is deep enough to write up properly. Ask on the call — there is a reasonable chance we have done something adjacent, and if we have not, we will say so.",
  },
  {
    question: "Does sector experience actually matter?",
    answer:
      "For the domain rules, yes, enormously. A coach cannot be six years old, damage is always an outward stock movement, and a subscription query must exclude pending. None of those are engineering problems, and all of them corrupt a system quietly if nobody knows to ask.",
  },
  {
    question: "Will you work with our competitors?",
    answer:
      "We will tell you if there is a direct conflict rather than let you find out. Sector depth and exclusivity pull against each other, so the honest answer is that it depends on how close the overlap is.",
  },
];

export default function SectorsIndex() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Sectors" }]}
        eyebrow="where we have done it before"
        title={
          <>
            we have already built in your <span className="g-disp">industry</span>.
          </>
        }
        lede={`${TOTALS.projects} projects for ${TOTALS.clients} clients since ${TOTALS.firstYear} cluster into a handful of sectors we know properly — including the domain rules that only surface when somebody who knows the field reads the data model.`}
        actions={[
          { label: "Start a project", href: "/contact/" },
          { label: "See the whole register", href: "/atlas/", variant: "out" },
        ]}
        stats={[
          { n: String(SECTORS_DATA.length), label: "sectors written up" },
          { n: String(TOTALS.projects), label: "projects in the register" },
          { n: String(TOTALS.countries), label: "countries delivered in" },
          { n: `${TOTALS.firstYear}–${TOTALS.lastYear}`, label: "years covered" },
        ]}
      />

      <AwardsStrip />

      <section className="wrap sec">
        <div className="sec__head">
          <p className="eyebrow">the sectors</p>
          <h2 className="h-l">each one with the hard part written down.</h2>
          <p className="lede">
            Every page below covers the same ground: what this sector actually deals with, what we
            have built in it, the part that was genuinely difficult, and what an engagement looks
            like. The hard part is the section worth reading.
          </p>
        </div>
        <div className="svc">
          {SECTORS_DATA.map((s, i) => (
            <Link key={s.slug} href={`/sectors/${s.slug}/`} className="svc__i notch">
              <span className="svc__n">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="h-m">
                <ServiceTitle label={s.name} />
              </h3>
              <p className="body">{s.summary}</p>
              <ChevronRight className="svc__chev" aria-hidden />
            </Link>
          ))}
        </div>
      </section>

      <LogoWall />

      <Testimonials limit={4} />

      <Faq items={FAQS} title="about this page" />

      <section className="cta">
        <svg className="art cta-art" viewBox="0 0 400 400" fill="none" aria-hidden="true">
          <path d="M40 120 h220 l100 100 v220 h-320 z" stroke="currentColor" strokeWidth="2.5" />
          <path d="M110 190 h150 l60 60 v150 h-210 z" stroke="currentColor" strokeWidth="2" opacity=".6" />
        </svg>
        <div className="wrap cta__in">
          <div className="cta__t">
            <h2 className="h-l">which of these is you?</h2>
            <p>A thirty-minute call with the engineer who would run it — not a salesperson.</p>
          </div>
          <Link className="cta__btn notch" href="/contact/">
            Book a call
          </Link>
        </div>
      </section>
    </>
  );
}
