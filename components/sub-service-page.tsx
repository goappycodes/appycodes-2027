import Link from "next/link";
import { pillarFor, type SubServiceData } from "@/lib/sub-services-data";
import { ServiceTitle } from "@/components/service-title";
import { ChevronRight } from "@/components/icons";

export function SubServicePage({ s }: { s: SubServiceData }) {
  const pillar = pillarFor(s.slug);
  return (
    <>
      {/* HERO */}
      <section className="wrap hero hero--dark">
        <p className="cs-crumb">
          <Link href="/">home</Link> &nbsp;/&nbsp; <Link href="/services/">services</Link>
          {pillar ? (
            <>
              {" "}&nbsp;/&nbsp;{" "}
              <Link href={`/services/${pillar.slug}/`}>
                <ServiceTitle label={pillar.title} />
              </Link>
            </>
          ) : null}
          {" "}&nbsp;/&nbsp; <ServiceTitle label={s.title} />
        </p>
        <h1 className="h-l" style={{ maxWidth: "18ch" }}>
          <ServiceTitle label={s.title} />.
        </h1>
        <p className="lede">
          <ServiceTitle label={s.headline} />
        </p>
        <div className="hero__btns">
          <Link className="btn btn--grad notch" href="/contact/">start a project</Link>
          {pillar ? (
            <Link className="btn btn--out notch" href={`/services/${pillar.slug}/`}>
              <ServiceTitle label={pillar.title} /> overview
            </Link>
          ) : (
            <Link className="btn btn--out notch" href="/services/">all services</Link>
          )}
        </div>
      </section>

      {/* INTRO */}
      <section className="wrap sec">
        <div className="prose">
          {s.intro.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </section>

      {/* WHAT'S INCLUDED */}
      <section className="wrap sec">
        <div className="sec__head">
          <h2 className="h-l">what&apos;s included.</h2>
        </div>
        <div className="svc">
          {s.points.map((pt) => (
            <div key={pt.title} className="svc__i notch">
              <h3 className="h-m"><ServiceTitle label={pt.title} /></h3>
              <p className="body">{pt.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="wrap sec">
        <div className="sec__head">
          <h2 className="h-l">questions, answered.</h2>
        </div>
        <dl className="faq">
          {s.faqs.map((f) => (
            <div key={f.question} className="faq__row">
              <dt>{f.question}</dt>
              <dd>{f.answer}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* PILLAR LINK */}
      {pillar ? (
        <section className="wrap sec">
          <Link href={`/services/${pillar.slug}/`} className="svc-sub__i" style={{ maxWidth: "34rem" }}>
            <span>
              Part of our <ServiceTitle label={pillar.title} /> practice
            </span>
            <ChevronRight className="svc-sub__chev" aria-hidden />
          </Link>
        </section>
      ) : null}

      {/* CTA */}
      <section className="cta">
        <svg className="art cta-art" viewBox="0 0 400 400" fill="none" aria-hidden="true">
          <path d="M40 120 h220 l100 100 v220 h-320 z" stroke="currentColor" strokeWidth="2.5" />
          <path d="M110 190 h150 l60 60 v150 h-210 z" stroke="currentColor" strokeWidth="2" opacity=".6" />
        </svg>
        <div className="wrap cta__in">
          <div className="cta__t">
            <h2 className="h-l">tell us what you are trying to build.</h2>
            <p>A thirty-minute call with the engineer who would run it — not a salesperson.</p>
          </div>
          <Link className="cta__btn notch" href="/contact/">book a call</Link>
        </div>
      </section>
    </>
  );
}
