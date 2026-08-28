import type { Metadata } from "next";
import Link from "next/link";
import { siteMeta } from "@/lib/seo";
import { PageHero } from "@/components/page-hero";
import { WorkAtlas } from "@/components/work-atlas";
import { ComplexityBars, StackBands, WorkHeatmap } from "@/components/work-charts";
import { AwardsStrip, FeaturedWork, LogoWall } from "@/components/sections";
import { COMPLEXITY, DOMAINS, HEAT, MARKERS, TOTALS, YEARS } from "@/lib/portfolio-data";

export const metadata: Metadata = siteMeta({
  title: "The atlas — 298 projects, 13 countries, twelve years",
  description:
    "Every engagement in our register, plotted. 298 projects for 226 clients across 13 countries since 2015 — mapped by country, by category and by how hard the work actually was.",
  path: "/atlas/",
  image: "/images/ontick-6.png",
});

/* Figures the copy leans on, derived rather than typed so they cannot drift
   from the register when it is regenerated. */
const named = DOMAINS.filter((d) => d !== "Other").length;
const sum = (a: number[]) => a.reduce((x, y) => x + y, 0);

/** Sectors with at least a fifth of their work in the top two complexity bands. */
const hardest = DOMAINS.map((d, i) => ({
  d,
  share: (COMPLEXITY[i][3] + COMPLEXITY[i][4]) / sum(COMPLEXITY[i]),
  n: sum(COMPLEXITY[i]),
}))
  .filter((x) => x.n >= 10 && x.d !== "Other")
  .sort((a, b) => b.share - a.share);

/** How the last four years split against everything before them. */
const recent = sum(YEARS.map((y, c) => (y >= 2023 ? sum(HEAT.map((r) => r[c])) : 0)));

export default function AtlasPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "home", href: "/" }, { label: "atlas" }]}
        eyebrow="the register, plotted"
        titleSize="md"
        title={
          <>
            {TOTALS.projects} projects. {TOTALS.countries} countries.{" "}
            <span className="g-disp">twelve years.</span>
          </>
        }
        lede={`Most agencies show you six logos. This is the whole register — every engagement we can account for since ${TOTALS.firstYear}, plotted by where it was delivered, what kind of work it was, and how hard it actually was.`}
        actions={[
          { label: "start a project", href: "/contact/" },
          { label: "read the case studies", href: "/case-studies/", variant: "out" },
        ]}
        stats={[
          { n: String(TOTALS.projects), label: "projects recorded" },
          { n: String(TOTALS.clients), label: "distinct clients" },
          { n: String(TOTALS.countries), label: "countries delivered in" },
          { n: `${TOTALS.firstYear}–${TOTALS.lastYear}`, label: "years covered" },
        ]}
      />

      {/* ------------------------------------------------------------ MAP -- */}
      <section className="slab dotted atlas-sec">
        <div className="wrap">
          <div className="sec__head">
            <p className="eyebrow eyebrow--slab">where the work went</p>
            <h2 className="h-l" style={{ color: "#fff" }}>
              one mark for every country we have shipped into.
            </h2>
            <p className="lede" style={{ color: "var(--on-slab-2)" }}>
              Pin area is project count. The {MARKERS[0].count} in the{" "}
              <span className="caps">UK</span> and {MARKERS[1].count} in India are the two poles of
              the business. Seven countries sit on top of each other in Europe — open it and the map
              zooms in place.
            </p>
          </div>
        </div>
        {/* full-bleed: the map is the widest thing on the site */}
        <div className="atlas-bleed">
          <WorkAtlas />
        </div>
      </section>

      {/* ------------------------------------------------------- HEATMAP -- */}
      <section className="wrap sec">
        <div className="sec__head">
          <p className="eyebrow">the shape of it</p>
          <h2 className="h-l">what we were hired for, year by year.</h2>
          <p className="lede">
            Cut by sector rather than by deliverable — &ldquo;website&rdquo; and &ldquo;platform&rdquo;
            describe what we shipped, not what we understand. {named} sectors, none of them a
            one-off, and {recent} of the {TOTALS.projects} landed in the last four years.
          </p>
        </div>
        <WorkHeatmap />
      </section>

      {/* ---------------------------------------------------- COMPLEXITY -- */}
      <section className="slab dotted">
        <div className="wrap slab__in">
          <div className="sec__head">
            <p className="eyebrow eyebrow--slab">the nature of the work</p>
            <h2 className="h-l" style={{ color: "#fff" }}>
              which sectors are actually hard.
            </h2>
            <p className="lede" style={{ color: "var(--on-slab-2)" }}>
              Every project carries a complexity band, set from what the build involved rather than
              what it billed. {hardest[0]?.d} runs hardest at{" "}
              {Math.round((hardest[0]?.share ?? 0) * 100)}% medium-high or above, with{" "}
              {hardest[1]?.d} and {hardest[2]?.d} behind it — that is where the engineering is, and
              it is not where the volume is.
            </p>
          </div>
          <ComplexityBars />
        </div>
      </section>

      {/* --------------------------------------------------------- STACK -- */}
      <section className="wrap sec">
        <div className="atlas__two">
          <div className="sec__head">
            <p className="eyebrow">what it is built on</p>
            <h2 className="h-l">the stack, in three bands.</h2>
            <p className="lede">
              How many of our {TOTALS.caseStudies} written case studies name each technology, grouped
              by what it is for. New builds start in the first band. The second is where revenue
              actually changes hands, and it is the one clients most often arrive with already in
              place.
            </p>
            <p className="body" style={{ marginTop: "1.4rem" }}>
              A flat frequency count would put WordPress on top — accurate for a decade of content
              sites, and a poor description of what a new build starts from today. The register also
              leaves the stack column blank on 195 of {TOTALS.projects} rows, so these count the
              written case studies rather than guessing across the whole set.
            </p>
          </div>
          <StackBands />
        </div>
      </section>

      {/* --------------------------------------------------- HOW WE COUNT -- */}
      <section className="wrap sec">
        <div className="atlas__note notch">
          <h2 className="h-m">how this page is counted</h2>
          <div className="atlas__note-grid">
            <p>
              <b>The register</b> is a single list of {TOTALS.projects} engagements for{" "}
              {TOTALS.clients} clients, rebuilt from our workspace, our mail and our accounting
              ledger. One row is one engagement, not one invoice and not one release.
            </p>
            <p>
              <b>{TOTALS.unlocated} rows carry no country.</b> Those clients predate the ledger that
              records it, so they are counted in every total on this page and plotted on none of the
              map. We would rather show the gap than fill it in.
            </p>
            <p>
              <b>Client names are not published here.</b> A large share of this work is white-label,
              delivered under a partner&rsquo;s name. Counts are ours to publish; the names are not.
              On a live engagement we will introduce you to a reference directly.
            </p>
            <p>
              <b>Nothing on this page is rounded up.</b> Where the record is thin we say so rather
              than estimating — which is also why the case studies number{" "}
              {TOTALS.caseStudies} and not {TOTALS.projects}.
            </p>
          </div>
        </div>
      </section>

      <LogoWall label="Teams that trusted us with the thing that matters" />

      <FeaturedWork
        title="eight of them, written up properly"
        lede="The map is the shape of the business. These are the engagements with the detail attached."
      />

      <AwardsStrip />

      <section className="cta">
        <svg className="art cta-art" viewBox="0 0 400 400" fill="none" aria-hidden="true">
          <path d="M40 120 h220 l100 100 v220 h-320 z" stroke="currentColor" strokeWidth="2.5" />
          <path d="M110 190 h150 l60 60 v150 h-210 z" stroke="currentColor" strokeWidth="2" opacity=".6" />
        </svg>
        <div className="wrap cta__in">
          <div className="cta__t">
            <h2 className="h-l">which mark on that map would be yours?</h2>
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
