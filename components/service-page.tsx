import Link from "next/link";
import { subServicesFor, type ServiceData } from "@/lib/services-data";
import { ServiceTitle } from "@/components/service-title";
import { ChevronRight } from "@/components/icons";

/* eslint-disable @next/next/no-img-element */

export function ServicePage({ s }: { s: ServiceData }) {
  const subs = subServicesFor(s.slug);
  return (
    <>
      {/* HERO */}
      <section className="wrap hero hero--dark">
        <p className="cs-crumb">
          <Link href="/">home</Link> &nbsp;/&nbsp; <Link href="/services/">services</Link> &nbsp;/&nbsp;{" "}
          <ServiceTitle label={s.title} />
        </p>
        <h1 className="h-l" style={{ maxWidth: "16ch" }}>
          <ServiceTitle label={s.title} />.
        </h1>
        <p className="lede">
          <ServiceTitle label={s.headline} />
        </p>
        <div className="hero__btns">
          <Link className="btn btn--grad notch" href="/contact/">start a project</Link>
          <Link className="btn btn--out notch" href="/services/">all services</Link>
        </div>
      </section>

      {/* WHY */}
      <section className="wrap sec">
        <div className="sec__head">
          <h2 className="h-l"><ServiceTitle label={s.whyTitle} />.</h2>
          <p className="lede">{s.whyDescription}</p>
        </div>
        <ul className="cs-outcomes">
          {s.whyPoints.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
        {s.whyQuote ? <p className="callout notch">{s.whyQuote}</p> : null}
      </section>

      {/* PROCESS */}
      <section className="wrap sec">
        <div className="sec__head">
          <h2 className="h-l"><ServiceTitle label={s.processTitle} />.</h2>
        </div>
        <div className="svc">
          {s.processSteps.map((step, i) => (
            <div key={step.title} className="svc__i notch">
              <span className="svc__n">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="h-m"><ServiceTitle label={step.title} /></h3>
              <p className="body">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* BENEFITS (dark slab) */}
      <section className="slab dotted">
        <div className="wrap slab__in">
          <div className="sec__head">
            <h2 className="h-l" style={{ color: "#fff" }}><ServiceTitle label={s.benefitsTitle} />.</h2>
          </div>
          <div className="proc">
            {s.benefits.map((b) => (
              <div key={b.title} className="proc__i notch">
                <h3 className="h-s"><ServiceTitle label={b.title} lower /></h3>
                <p>{b.description}</p>
              </div>
            ))}
          </div>
          {s.benefitsQuote ? (
            <p className="lede" style={{ color: "rgba(255,255,255,.8)", marginTop: "2.5rem", maxWidth: "40ch" }}>
              {s.benefitsQuote}
            </p>
          ) : null}
        </div>
      </section>

      {/* WHO */}
      <section className="wrap sec">
        <div className="sec__head">
          <h2 className="h-l"><ServiceTitle label={s.whoTitle} /></h2>
        </div>
        <ul className="cs-outcomes">
          {s.whoPoints.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      </section>

      {/* SUB-SERVICES — the original service pages that sit under this pillar */}
      {subs.length > 0 ? (
        <section className="wrap sec">
          <div className="sec__head">
            <h2 className="h-l">everything we build in this practice.</h2>
            <p className="lede">
              The specific services under <ServiceTitle label={s.title} />, each with its own page.
            </p>
          </div>
          <div className="svc-sub">
            {subs.map((sub) => (
              <Link key={sub.slug} href={`/services/${sub.slug}/`} className="svc-sub__i">
                <span>{sub.label}</span>
                <ChevronRight className="svc-sub__chev" aria-hidden />
              </Link>
            ))}
          </div>
        </section>
      ) : null}

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

      {/* CTA */}
      <section className="cta">
        <svg className="art cta-art" viewBox="0 0 400 400" fill="none" aria-hidden="true">
          <path d="M40 120 h220 l100 100 v220 h-320 z" stroke="currentColor" strokeWidth="2.5" />
          <path d="M110 190 h150 l60 60 v150 h-210 z" stroke="currentColor" strokeWidth="2" opacity=".6" />
        </svg>
        <div className="wrap cta__in">
          <div className="cta__t">
            <h2 className="h-l"><ServiceTitle label={s.finalTitle} /></h2>
            <p>{s.finalDescription}</p>
          </div>
          <Link className="cta__btn notch" href="/contact/">book a call</Link>
        </div>
      </section>
    </>
  );
}
