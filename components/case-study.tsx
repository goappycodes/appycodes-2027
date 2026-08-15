import Link from "next/link";
import type { ReactNode } from "react";

export type CaseBlock =
  | { t: "section"; title: string; lead?: string }
  | { t: "cards"; title: string; lead?: string; cols3?: boolean; items: { title: string; body: string }[] }
  | { t: "figure"; src: string; alt: string; caption?: string; phone?: boolean }
  | { t: "gallery"; title: string; shots: { src: string; alt: string }[] };

export type CaseStudyData = {
  crumb: string;
  title: ReactNode;
  lede: string;
  facts: { label: string; value: string }[];
  links?: { label: string; href: string }[];
  stats: { n: string; label: string }[];
  blocks: CaseBlock[];
  stack: { layer: string; value: string }[];
  outcomes: string[];
  cta: string;
};

/* eslint-disable @next/next/no-img-element */

function Block({ b, wash }: { b: CaseBlock; wash: boolean }) {
  const secClass = `cs-sec${wash ? " cs-sec--wash" : ""}`;
  if (b.t === "figure") {
    return (
      <section className={secClass}>
        <div className="wrap">
          <figure className={`cs-fig${b.phone ? " cs-fig--phone" : ""}`}>
            <img src={b.src} alt={b.alt} loading="lazy" className={b.phone ? "" : "notch notch-lg"} />
            {b.caption ? <figcaption>{b.caption}</figcaption> : null}
          </figure>
        </div>
      </section>
    );
  }
  if (b.t === "gallery") {
    return (
      <section className={secClass}>
        <div className="wrap">
          <h2 className="cs-h2">{b.title}</h2>
          <div className="cs-gallery">
            {b.shots.map((s) => (
              <img key={s.src} src={s.src} alt={s.alt} loading="lazy" className="notch" />
            ))}
          </div>
        </div>
      </section>
    );
  }
  if (b.t === "cards") {
    return (
      <section className={secClass}>
        <div className="wrap">
          <h2 className="cs-h2">{b.title}</h2>
          {b.lead ? <p className="cs-lead">{b.lead}</p> : null}
          <div className={`cs-cards${b.cols3 ? " cs-cards--3" : ""}`}>
            {b.items.map((c, i) => (
              <div key={c.title} className="cs-card notch">
                <span className="cs-card__n">{String(i + 1).padStart(2, "0")}</span>
                <h3>{c.title}</h3>
                <p>{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  // section — just a lowercase headline and one short line
  return (
    <section className={secClass}>
      <div className="wrap">
        <h2 className="cs-h2">{b.title}</h2>
        {b.lead ? <p className="cs-lead">{b.lead}</p> : null}
      </div>
    </section>
  );
}

export function CaseStudy({ data }: { data: CaseStudyData }) {
  return (
    <>
      {/* HERO (dark) */}
      <section className="hero--dark dotted">
        <div className="wrap cs-hero">
          <p className="cs-crumb">
            <Link href="/">home</Link> &nbsp;/&nbsp; <Link href="/case-studies/">work</Link>{" "}
            &nbsp;/&nbsp; {data.crumb}
          </p>
          <div className="cs-hero__in">
            <div>
              <h1>{data.title}</h1>
              <p className="cs-lede">{data.lede}</p>
              <div className="cs-hero__btns">
                <Link className="btn btn--grad notch" href="/contact/">start a project like this</Link>
                <Link className="btn btn--out notch" href="/case-studies/">all work</Link>
              </div>
            </div>
            <div className="cs-facts notch notch-lg">
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
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="slab dotted">
        <div className="wrap slab__in">
          <dl className="stats">
            {data.stats.map((s) => (
              <div key={s.label} className="stat stat--cs">
                <dd className="tnum g-dark">{s.n}</dd>
                <p>{s.label}</p>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* BLOCKS */}
      {data.blocks.map((b, i) => (
        <Block key={i} b={b} wash={i % 2 === 1} />
      ))}

      {/* STACK */}
      <section className="cs-sec cs-sec--wash">
        <div className="wrap cs-grid2">
          <h2 className="cs-h2">what it is built on.</h2>
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
      <section className="cs-sec">
        <div className="wrap">
          <h2 className="cs-h2">what happened next.</h2>
          <ul className="cs-outcomes">
            {data.outcomes.map((o) => (
              <li key={o}>{o}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
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
          <Link className="cta__btn notch" href="/contact/">book a call</Link>
        </div>
      </section>
    </>
  );
}
