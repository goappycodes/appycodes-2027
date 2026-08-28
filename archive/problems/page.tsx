import type { Metadata } from "next";
import Link from "next/link";
import { siteMeta } from "@/lib/seo";
import { PageHero } from "@/components/page-hero";
import { AwardsStrip, Faq, Testimonials } from "@/components/sections";
import { ChevronRight } from "@/components/icons";
import { PROBLEMS, PROBLEM_AREAS } from "./problems-data";

export const metadata: Metadata = siteMeta({
  title: "Problems we have solved — symptom, diagnosis, fix",
  description:
    "Real production failures we diagnosed and fixed: payment race conditions, card skimmers, store rejections, schema migrations, crawler traps and AI features that fabricate.",
  path: "/problems/",
});

const FAQS = [
  {
    question: "Why publish these?",
    answer:
      "Because it is what an engineer actually searches for at eleven at night, and because a list of fixed problems is a better description of a team than a list of technologies. Every entry is a real incident.",
  },
  {
    question: "Why is nobody named?",
    answer:
      "A page about somebody's compromised checkout or their payment race condition is not a page they agreed to be on. The engineering is ours to publish; the identity is not.",
  },
  {
    question: "One of these is happening to us. Can you help?",
    answer:
      "Yes, and say on the call that it is live so we treat it that way. For a compromise we can usually start the same day.",
  },
];

export default function ProblemsIndex() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "home", href: "/" }, { label: "problems" }]}
        eyebrow="symptom, diagnosis, fix"
        title={
          <>
            {PROBLEMS.length} problems we have already <span className="g-disp">solved</span>.
          </>
        }
        lede="Real production failures, written up the way you would search for them. What was observed, what it actually turned out to be, what we changed, and what to check on your own system before it happens to you."
        actions={[
          { label: "this is happening to us", href: "/contact/" },
          { label: "see the work", href: "/case-studies/", variant: "out" },
        ]}
        stats={[
          { n: String(PROBLEMS.length), label: "written up" },
          { n: String(PROBLEM_AREAS.length), label: "areas covered" },
          { n: "all", label: "from real incidents" },
          { n: "0", label: "clients named" },
        ]}
      />

      <AwardsStrip />

      {PROBLEM_AREAS.map((area) => {
        const items = PROBLEMS.filter((p) => p.area === area);
        if (items.length === 0) return null;
        return (
          <section key={area} className="wrap sec" id={area.replace(/\W+/g, "-")}>
            <div className="sec__head">
              <p className="eyebrow">{area}</p>
              <h2 className="h-l">
                {items.length} {items.length === 1 ? "problem" : "problems"}.
              </h2>
            </div>
            <div className="svc">
              {items.map((p) => (
                <Link key={p.slug} href={`/problems/${p.slug}/`} className="svc__i notch">
                  <h3 className="h-m">{p.title}</h3>
                  <p className="body">{p.symptom}</p>
                  <ChevronRight className="svc__chev" aria-hidden />
                </Link>
              ))}
            </div>
          </section>
        );
      })}

      <Testimonials limit={4} />

      <Faq items={FAQS} title="about this page" />

      <section className="cta">
        <svg className="art cta-art" viewBox="0 0 400 400" fill="none" aria-hidden="true">
          <path d="M40 120 h220 l100 100 v220 h-320 z" stroke="currentColor" strokeWidth="2.5" />
          <path d="M110 190 h150 l60 60 v150 h-210 z" stroke="currentColor" strokeWidth="2" opacity=".6" />
        </svg>
        <div className="wrap cta__in">
          <div className="cta__t">
            <h2 className="h-l">yours is not on the list?</h2>
            <p>Describe it on a thirty-minute call with the engineer who would fix it.</p>
          </div>
          <Link className="cta__btn notch" href="/contact/">
            book a call
          </Link>
        </div>
      </section>
    </>
  );
}
