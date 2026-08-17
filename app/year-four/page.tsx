import type { Metadata } from "next";
import Link from "next/link";
import { siteMeta } from "@/lib/seo";
import { PageHero } from "@/components/page-hero";
import { AwardsStrip, Faq, FeaturedWork, LogoWall, Testimonials } from "@/components/sections";
import { TOTALS } from "@/lib/portfolio-data";

export const metadata: Metadata = siteMeta({
  title: "The year-four test — what happens after launch",
  description:
    "Eight years, one client, four systems. Nine years with a French client. A decade inside one estate. The retention record behind 'built for year four'.",
  path: "/year-four/",
  image: "/images/team-discussion.jpg",
});

/* Every entry is a relationship still producing work, described by sector
   rather than named. The point is the duration, not the logo. */
const RELATIONSHIPS = [
  {
    span: "10 yrs",
    since: "since 2015",
    who: "A global members' network",
    what: "The longest relationship in the business. A platform on a custom framework, a Laravel API layer, a published PHP SDK, an exchange match engine, a wallet, an identity layer and an AI assistant line — plus a three-day performance push that dropped a 3.8MB icon webfont nobody's browser was using and migrated the web server underneath it.",
  },
  {
    span: "9 yrs",
    since: "since 2017",
    who: "A French language and cultural business",
    what: "Maintenance and search work on the same web presence for eight years, then a formal two-project proposal in 2026 covering a full rebuild plus a second institute site. The clearest evidence of retention outside the UK market.",
  },
  {
    span: "8 yrs",
    since: "since 2017",
    who: "A UK aesthetic laser business",
    what: "Four distinct systems for one client: a WooCommerce store behind a CDN, a patient portal handling treatment consent, an internal payroll application with role-based access, and a treatment guidance app. Still generating support tickets weekly.",
  },
  {
    span: "8 yrs",
    since: "since 2018",
    who: "A regional Indian news publisher",
    what: "From a legacy stack to a Next.js rebuild, with a mobile app published in 2026. A complete modernisation story where the client stayed for the whole of it.",
  },
  {
    span: "5 yrs",
    since: "since 2021",
    who: "A UK delivery and logistics operator",
    what: "Delivered through an agency partner, with the front end in their organisation and the backend in ours. Five years on the same platform, and when new engineers are onboarded they are pointed at the backend first — which tells you where the domain logic actually lives.",
  },
  {
    span: "5 yrs",
    since: "since 2021",
    who: "A UK boiler cover and home emergency provider",
    what: "Conversion work scoped in hours against specific pages, infrastructure diagnosis, security incident response, and a full rebuild scoped five years in. The clearest example of how these relationships actually compound.",
  },
];

const FAQS = [
  {
    question: "Is a long engagement just lock-in?",
    answer:
      "It would be, if we held the keys. You own the repository, the cloud accounts and the credentials from day one, and documented handover to your own team is a normal, planned ending. On one mobile build we ran a handover session covering store setup, tester invitations and production deployment, then transferred the repository. Most agencies keep the keys because the keys are the retention mechanism.",
  },
  {
    question: "What actually keeps a client for eight years?",
    answer:
      "Being useful in the unglamorous moments. Diagnosing process exhaustion at 9pm, finding a certificate that failed to renew on a subdomain nobody watches, cancelling a paid tool two days before renewal because the migration no longer needs it. None of that is on a proposal, and all of it is why the rebuild comes to us four years later.",
  },
  {
    question: "Do you turn work down?",
    answer:
      "Yes, and it is part of the same thing. We declined to quote an SEO programme that could not be delivered on the platform the client was then running, and said why. The work came back later on a platform where it could be done properly.",
  },
  {
    question: "What if we want to leave?",
    answer:
      "You take it. There is no lock-in in the contract and none in the architecture either — that is a deliberate design constraint, not a courtesy.",
  },
];

export default function YearFourPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "home", href: "/" }, { label: "year four" }]}
        eyebrow="the retention record"
        title={
          <>
            anyone can win the pitch. the test is <span className="g-disp">year four</span>.
          </>
        }
        lede={`We are optimised to still be running your platform in year four rather than to win the pitch, and that single decision explains most of how we work. This page is the evidence rather than the principle — relationships from the register that are still producing work today.`}
        actions={[
          { label: "book a discovery call", href: "/contact/" },
          { label: "see the register", href: "/atlas/", variant: "out" },
        ]}
        media={{ src: "/images/team-discussion.jpg", alt: "The Appycodes team working through a problem" }}
        stats={[
          { n: "10 yrs", label: "longest relationship" },
          { n: "6", label: "past the four-year mark" },
          { n: String(TOTALS.clients), label: "clients in the register" },
          { n: String(TOTALS.firstYear), label: "building since" },
        ]}
      />

      <AwardsStrip />

      <section className="wrap sec">
        <div className="sec__head">
          <p className="eyebrow">the relationships</p>
          <h2 className="h-l">six that outlasted the project that started them.</h2>
          <p className="lede">
            Described by sector rather than named, for the same reason as everywhere else on this
            site. What matters here is the duration and what accumulated inside it.
          </p>
        </div>
        <ol className="yfour">
          {RELATIONSHIPS.map((r) => (
            <li key={r.who} className="yfour__i">
              <div className="yfour__span">
                <span className="tnum g-disp">{r.span}</span>
                <span className="yfour__since">{r.since}</span>
              </div>
              <div className="yfour__b">
                <h3 className="h-m">{r.who}</h3>
                <p>{r.what}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="slab dotted">
        <div className="wrap slab__in">
          <div className="sec__head">
            <p className="eyebrow eyebrow--slab">what it changes</p>
            <h2 className="h-l" style={{ color: "#fff", maxWidth: "24ch" }}>
              optimising for year four changes what we refuse to build.
            </h2>
            <p className="lede" style={{ color: "var(--on-slab-2)" }}>
              It is not a slogan — it is a constraint that shows up in specific decisions, most of
              which cost us something in the short term.
            </p>
          </div>
          <div className="proc proc--6">
            <div className="proc__i notch">
              <h3 className="h-s">boring stacks on purpose</h3>
              <p>
                Asked to bring a new stack onto a platform handling live payments, the direction was
                explicit: use something the team will not struggle to support later.
              </p>
            </div>
            <div className="proc__i notch">
              <h3 className="h-s">scope creep gets a quote, not a fight</h3>
              <p>
                On a fixed-design build, the change requests were separated from what was already in
                scope, re-quoted, and the relationship held. Absorbing them silently is how year two
                gets resentful.
              </p>
            </div>
            <div className="proc__i notch">
              <h3 className="h-s">estimates defended, not discounted</h3>
              <p>
                Challenged on a timeline, the answer was specific: two developers in parallel, five
                weeks covers development only, testing and revisions sit on top. No padding, no
                defensiveness.
              </p>
            </div>
            <div className="proc__i notch">
              <h3 className="h-s">saying no to the wrong scope</h3>
              <p>
                A client specified leave management at the depth of a dedicated HR platform inside a
                field-sales app. We declined and triaged it into a later phase.
              </p>
            </div>
            <div className="proc__i notch">
              <h3 className="h-s">cancelling things you pay for</h3>
              <p>
                A paid migration tool flagged for cancellation two days before renewal once the bulk
                work no longer needed it, and the client told. Costs nothing, worth a great deal.
              </p>
            </div>
            <div className="proc__i notch">
              <h3 className="h-s">handover as a planned ending</h3>
              <p>
                Store setup, tester invitations and production deployment taught to the client, then
                the repository transferred. Keeping the keys is the easier commercial choice.
              </p>
            </div>
          </div>
        </div>
      </section>

      <LogoWall label="Teams that trusted us with the thing that matters" />

      <FeaturedWork
        title="the work behind the relationships"
        lede="Four written up in full, with the numbers attached."
      />

      <Testimonials
        title="the people who stayed"
        lede="Founders and operators who lived with the result long after launch."
      />

      <Faq items={FAQS} title="the honest questions" />

      <section className="cta">
        <svg className="art cta-art" viewBox="0 0 400 400" fill="none" aria-hidden="true">
          <path d="M40 120 h220 l100 100 v220 h-320 z" stroke="currentColor" strokeWidth="2.5" />
          <path d="M110 190 h150 l60 60 v150 h-210 z" stroke="currentColor" strokeWidth="2" opacity=".6" />
        </svg>
        <div className="wrap cta__in">
          <div className="cta__t">
            <h2 className="h-l">where would you want us in year four?</h2>
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
