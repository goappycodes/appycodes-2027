import type { Metadata } from "next";
import Link from "next/link";
import { siteMeta } from "@/lib/seo";
import { PageHero } from "@/components/page-hero";
import { LogoWall, FeaturedWork, Testimonials } from "@/components/sections";
import { ArrowRight, ArrowUpRight } from "@/components/icons";
import { JsonLd } from "@/components/jsonld";
import { breadcrumbSchema } from "@/lib/schema";
import { CLUTCH_STATS } from "@/lib/site";
import { TOTALS } from "@/lib/portfolio-data";

export const metadata: Metadata = siteMeta({
  title: "Clients — who we build for",
  description: `The teams behind the register: ${TOTALS.clients} clients and ${TOTALS.projects} projects across ${TOTALS.countries} countries since ${TOTALS.firstYear} — founders, product teams and operators, and what they say about the work.`,
  path: "/clients/",
  image: "/images/team-discussion.jpg",
});

/* eslint-disable @next/next/no-img-element */

export default function ClientsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Clients", path: "/clients/" },
        ])}
      />

      <PageHero
        crumbs={[{ label: "home", href: "/" }, { label: "clients" }]}
        eyebrow="clients"
        title={
          <>
            the teams behind the <span className="g-disp">register</span>.
          </>
        }
        lede={`Founders, product teams and operators who trusted us with the thing their business runs on — ${TOTALS.clients} of them since ${TOTALS.firstYear}, from first-time founders to companies you have heard of.`}
        actions={[
          { label: "start a project", href: "/contact/" },
          { label: "read what they say", href: "/testimonials/", variant: "out" },
        ]}
        media={{
          src: "/images/team-discussion.jpg",
          alt: "The Appycodes team working with a client",
        }}
        stats={[
          { n: String(TOTALS.clients), label: "distinct clients" },
          { n: String(TOTALS.projects), label: "projects delivered" },
          { n: String(TOTALS.countries), label: "countries" },
          { n: `since ${TOTALS.firstYear}`, label: "building" },
        ]}
      />

      <LogoWall label="A few of the teams we build for" />

      {/* THE FULL REGISTER — clients tie back to the atlas */}
      <section className="slab dotted">
        <div className="wrap slab__in">
          <div className="sec__head">
            <p className="eyebrow eyebrow--slab">not a curated shortlist</p>
            <h2 className="h-l" style={{ color: "#fff", maxWidth: "24ch" }}>
              {TOTALS.clients} clients. {TOTALS.projects} projects. {TOTALS.countries} countries.
            </h2>
            <p className="lede" style={{ color: "var(--on-slab-2)" }}>
              Most agencies show you six logos. We publish the whole register — every engagement we
              can account for since {TOTALS.firstYear}, plotted by where it was delivered, with the
              counting method attached. The logos above are a sample; the atlas is all of it.
            </p>
          </div>
          <div className="sec__more" style={{ marginTop: "2rem" }}>
            <Link className="btn btn--out notch" href="/atlas/">
              explore the atlas <ArrowRight aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      {/* WHAT THEY SAY — links through to the full testimonials wall */}
      <Testimonials
        limit={4}
        title="in their words"
        lede={`${CLUTCH_STATS.count} verified reviews on Clutch, every one rated ${CLUTCH_STATS.rating}/5.0. Here are four — the rest are one click away.`}
      />
      <section className="wrap" style={{ marginTop: "-1.5rem" }}>
        <div className="sec__more">
          <Link className="btn btn--grad notch" href="/testimonials/">
            read all {CLUTCH_STATS.count} testimonials <ArrowUpRight aria-hidden />
          </Link>
        </div>
      </section>

      <FeaturedWork
        title="the work behind the relationships"
        lede="Case studies from the register — the engagements these clients came out of, with the numbers attached."
      />

      <section className="cta">
        <svg className="art cta-art" viewBox="0 0 400 400" fill="none" aria-hidden="true">
          <path d="M40 120 h220 l100 100 v220 h-320 z" stroke="currentColor" strokeWidth="2.5" />
          <path d="M110 190 h150 l60 60 v150 h-210 z" stroke="currentColor" strokeWidth="2" opacity=".6" />
        </svg>
        <div className="wrap cta__in">
          <div className="cta__t">
            <h2 className="h-l">want to join them?</h2>
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
