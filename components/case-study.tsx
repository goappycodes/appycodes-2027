import Link from "next/link";
import type { ReactNode } from "react";
import { Rail } from "@/components/rail";
import { CASE_STUDIES, LogoWall, Testimonials } from "@/components/sections";
import { TechStack } from "@/components/tech-logos";
import { JsonLd } from "@/components/jsonld";
import { breadcrumbSchema } from "@/lib/schema";

export type CaseBlock =
  | { t: "section"; title: string; lead?: string }
  | { t: "cards"; title: string; lead?: string; cols3?: boolean; items: { title: string; body: string }[] }
  | { t: "figure"; src: string; alt: string; caption?: string; phone?: boolean }
  | { t: "gallery"; title: string; shots: { src: string; alt: string }[] };

export type CaseStudyData = {
  /** Client name, used for the breadcrumb label and to filter the "more work" rail. */
  crumb: string;
  /** Path of this study, e.g. "/case-studies/bloc/" — used for breadcrumb schema. */
  path?: string;
  title: ReactNode;
  lede: string;
  facts: { label: string; value: string }[];
  links?: { label: string; href: string }[];
  stats: { n: string; label: string }[];
  blocks: CaseBlock[];
  stack: { layer: string; value: string }[];
  /** Tech-stack logo keys (see components/tech-logos.tsx), shown as a "built with" strip. */
  tech?: string[];
  outcomes: string[];
  cta: string;
};

/* eslint-disable @next/next/no-img-element */

function Block({ b }: { b: CaseBlock }) {
  if (b.t === "figure") {
    return (
      <section className="wrap sec">
        <figure className={`cs-fig${b.phone ? " cs-fig--phone" : ""}`}>
          <img src={b.src} alt={b.alt} loading="lazy" className={b.phone ? "" : "notch notch-lg"} />
          {b.caption ? <figcaption>{b.caption}</figcaption> : null}
        </figure>
      </section>
    );
  }
  if (b.t === "gallery") {
    return (
      <section className="wrap sec">
        <div className="sec__head">
          <h2 className="h-l">{b.title}</h2>
        </div>
        <div className="cs-gallery">
          {b.shots.map((s) => (
            <img key={s.src} src={s.src} alt={s.alt} loading="lazy" className="notch" />
          ))}
        </div>
      </section>
    );
  }
  if (b.t === "cards") {
    return (
      <section className="wrap sec">
        <div className="sec__head">
          <h2 className="h-l">{b.title}</h2>
          {b.lead ? <p className="lede">{b.lead}</p> : null}
        </div>
        <div className="svc">
          {b.items.map((c, i) => (
            <div key={c.title} className="svc__i notch">
              <span className="svc__n">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="h-m">{c.title}</h3>
              <p className="body">{c.body}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }
  return (
    <section className="wrap sec">
      <div className="sec__head">
        <h2 className="h-l">{b.title}</h2>
        {b.lead ? <p className="lede">{b.lead}</p> : null}
      </div>
    </section>
  );
}

export function CaseStudy({ data }: { data: CaseStudyData }) {
  // Everything except the study you are reading, so the page always offers a
  // next one rather than dead-ending at the CTA.
  const others = CASE_STUDIES.filter((c) => !data.crumb.toLowerCase().includes(c.name.toLowerCase()));

  return (
    <>
      {data.path ? (
        <JsonLd
          data={breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Case studies", path: "/case-studies/" },
            { name: data.crumb, path: data.path },
          ])}
        />
      ) : null}

      {/* HERO — same classes as the homepage hero */}
      <section className="wrap hero hero--dark">
        <p className="cs-crumb">
          <Link href="/">home</Link> &nbsp;/&nbsp; <Link href="/case-studies/">work</Link>{" "}
          &nbsp;/&nbsp; {data.crumb}
        </p>
        <div className="cs-hero__in">
          <div>
            <h1 className="h-l">{data.title}</h1>
            <p className="lede">{data.lede}</p>
            <div className="hero__btns">
              <Link className="btn btn--grad notch" href="/contact/">Start a project like this</Link>
              <Link className="btn btn--out notch" href="/case-studies/">All work</Link>
            </div>
            {data.tech ? <TechStack tech={data.tech} /> : null}
          </div>
          <aside className="cs-facts notch notch-lg">
            <dl>
              {data.facts.map((f) => (
                <div key={f.label} className="cs-facts__row">
                  <dt>{f.label}</dt>
                  <dd>{f.value}</dd>
                </div>
              ))}
            </dl>
            {data.links ? (
              <div className="cs-facts__links">
                {data.links.map((l) => (
                  <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer">
                    {l.label} ↗
                  </a>
                ))}
              </div>
            ) : null}
          </aside>
        </div>
      </section>

      {/* STATS — homepage proof slab */}
      <section className="slab dotted">
        <div className="wrap slab__in">
          <dl className="stats">
            {data.stats.map((s) => (
              <div key={s.label} className="stat">
                <dt>{s.label}</dt>
                <dd className="tnum g-dark">{s.n}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* BLOCKS */}
      {data.blocks.map((b, i) => (
        <Block key={i} b={b} />
      ))}

      {/* STACK */}
      <section className="wrap sec">
        <div className="cs-grid2">
          <div className="sec__head">
            <h2 className="h-l">what it is built on.</h2>
          </div>
          <dl className="cs-stack notch">
            {data.stack.map((row) => (
              <div key={row.layer} className="cs-stack__row">
                <dt>{row.layer}</dt>
                <dd>{row.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* OUTCOMES */}
      <section className="wrap sec">
        <div className="sec__head">
          <h2 className="h-l">what happened next.</h2>
        </div>
        <ul className="cs-outcomes">
          {data.outcomes.map((o) => (
            <li key={o}>{o}</li>
          ))}
        </ul>
      </section>

      <LogoWall label="Teams that trusted us with the thing that matters" />

      <Testimonials
        title="the people who signed off work like this"
        limit={4}
      />

      {/* MORE WORK — never dead-end on a case study */}
      {others.length > 0 ? (
        <section className="wrap sec">
          <div className="sec__head">
            <p className="eyebrow">keep reading</p>
            <h2 className="h-l">the other engagements.</h2>
          </div>
          <Rail label="More case studies" className="work-rail">
            {others.map((o) => (
              <Link key={o.href} href={o.href} className="case notch notch-lg">
                <div className="case__shot">
                  <img src={o.img} alt={o.meta} loading="lazy" />
                </div>
                <div className="case__bar" />
                <div className="case__in">
                  <h3 className="h-m">{o.head}</h3>
                  <p className="body">{o.body}</p>
                  <div className="case__metric">
                    <div className="case__metric-txt">
                      <span className="case__fig tnum g-disp">{o.fig}</span>
                      <span className="case__figlabel">{o.figlabel}</span>
                    </div>
                    <svg className="case__chev" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </Rail>
          <div className="sec__more">
            <Link className="btn btn--out notch" href="/case-studies/">
              All case studies
            </Link>
          </div>
        </section>
      ) : null}

      {/* CTA — same as homepage */}
      <section className="cta">
        <svg className="art cta-art" viewBox="0 0 400 400" fill="none" aria-hidden="true">
          <path d="M40 120 h220 l100 100 v220 h-320 z" stroke="currentColor" strokeWidth="2.5" />
          <path d="M110 190 h150 l60 60 v150 h-210 z" stroke="currentColor" strokeWidth="2" opacity=".6" />
          <circle cx="40" cy="120" r="6" fill="currentColor" />
          <circle cx="360" cy="440" r="6" fill="currentColor" />
        </svg>
        <div className="wrap cta__in">
          <div className="cta__t">
            <h2 className="h-l">{data.cta}</h2>
            <p>A thirty-minute call with the engineer who would run it.</p>
          </div>
          <Link className="cta__btn notch" href="/contact/">Book a call</Link>
        </div>
      </section>
    </>
  );
}
