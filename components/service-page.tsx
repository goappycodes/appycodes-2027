import Link from "next/link";
import { ServiceDeliverables } from "@/components/service-deliverables";
import { subServicesFor, type ServiceData } from "@/lib/services-data";
import { ServiceTitle } from "@/components/service-title";
import { ChevronRight, Check } from "@/components/icons";
import { PageHero } from "@/components/page-hero";
import { AwardsStrip, LogoWall, WritingCards, Faq } from "@/components/sections";
import { serviceMedia, PILLAR_PROOF, PILLAR_CASES, PILLAR_POSTS } from "@/lib/media";
import { JsonLd } from "@/components/jsonld";
import { breadcrumbSchema, serviceSchema } from "@/lib/schema";
import { InstitutionalWorkRail } from "@/components/institutional-work-rail";
import { getWorkCards } from "@/lib/work-cards";
import { TestimonialSlider } from "@/components/testimonial-slider";

/* eslint-disable @next/next/no-img-element */

export function ServicePage({ s }: { s: ServiceData }) {
  const subs = subServicesFor(s.slug);
  const media = serviceMedia(s.slug);
  const proof = PILLAR_PROOF[s.slug];
  const related = getWorkCards(PILLAR_CASES[s.slug] ?? []);

  return (
    <>
      <JsonLd
        data={[
          serviceSchema({
            name: s.title,
            description: s.description,
            path: `/services/${s.slug}/`,
            image: media.img,
            serviceType: s.title,
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services/" },
            { name: s.title, path: `/services/${s.slug}/` },
          ]),
        ]}
      />
      <PageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services/" },
          { label: s.title },
        ]}
        eyebrow="practice"
        title={
          <>
            <ServiceTitle label={s.title} />.
          </>
        }
        lede={<ServiceTitle label={s.headline} />}
        actions={[
          { label: "Start a project", href: "/contact/" },
          { label: "All services", href: "/services/", variant: "out" },
        ]}
        media={{ src: media.img, alt: media.alt }}
        stats={[
          { n: String(subs.length), label: "specialisms in this practice" },
          { n: "senior", label: "engineers only" },
          { n: "day one", label: "you own the code" },
          { n: "2015", label: "shipping since" },
        ]}
      />

      <AwardsStrip />

      {/* WHY — copy on the left, the concrete list on the right */}
      <section className="wrap sec">
        <div className="split">
          <div className="split__copy">
            <p className="eyebrow">why it matters</p>
            <h2 className="h-l">
              <ServiceTitle label={s.whyTitle} />.
            </h2>
            <p className="lede">{s.whyDescription}</p>
          </div>
          <div className="split__side">
            <div className="checklist notch">
              <p className="checklist__lbl">what sits inside this practice</p>
              <ul>
                {s.whyPoints.map((p) => (
                  <li key={p}>
                    <Check className="checklist__ico" aria-hidden />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* PROOF BAND — real screenshots where we have them */}
      {proof ? (
        <section className="showcase">
          <div className="wrap showcase__in">
            <div className="showcase__copy">
              <p className="eyebrow eyebrow--slab">in production</p>
              <h2 className="h-l" style={{ color: "#fff" }}>
                {proof.kind === "frame" ? (
                  <>
                    What it looks like when it&apos;s <span className="g-dark">running</span>
                  </>
                ) : (
                  <>
                    What it looks like when it&apos;s <span className="g-dark">done properly</span>
                  </>
                )}
              </h2>
              <p>{proof.caption}</p>
              {proof.kind === "frame" ? (
                <>
                  <dl className="showcase__facts">
                    {proof.facts.map((f) => (
                      <div key={f.k} className="showcase__fact">
                        <dt>{f.k}</dt>
                        <dd className="tnum">{f.v}</dd>
                      </div>
                    ))}
                  </dl>
                  <Link className="btn btn--out notch showcase__cta" href={proof.href}>
                    Read the {proof.client} case study
                  </Link>
                </>
              ) : (
                <Link className="btn btn--out notch showcase__cta" href="/case-studies/">
                  See the work
                </Link>
              )}
            </div>

            <div className="showcase__stage">
              {proof.kind === "frame" ? (
                <>
                  <div className="frame notch showcase__browser">
                    <div className="frame__bar" aria-hidden="true">
                      <i />
                      <i />
                      <i />
                    </div>
                    <img src={proof.frame} alt={proof.frameAlt} loading="lazy" />
                  </div>
                  {proof.phone ? (
                    <div className="showcase__phone">
                      <img src={proof.phone} alt={proof.phoneAlt ?? ""} loading="lazy" />
                    </div>
                  ) : null}
                </>
              ) : (
                <figure className="showcase__plain notch notch-lg">
                  <img src={proof.img} alt={proof.alt} loading="lazy" />
                </figure>
              )}
            </div>
          </div>
        </section>
      ) : null}

      {/* WHERE WE HAVE DONE THIS — delivered examples, not claims. Named only
          where the client is already public on this site. */}
      {s.proofPoints?.length ? (
        <section className="wrap sec">
          <div className="sec__head">
            <p className="eyebrow">where we have done this</p>
            <h2 className="h-l">Three we have already shipped.</h2>
            <p className="lede">
              Drawn from the project register. Where a client is not named it is because the work was
              delivered under a partner&rsquo;s name — the detail is still ours, and we will walk you
              through any of it on a call.
            </p>
          </div>
          <ul className="proofpts">
            {s.proofPoints.map((p) => (
              <li key={p.where}>
                <p className="proofpts__w">{p.where}</p>
                <p className="proofpts__b">{p.what}</p>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {/* PROCESS — numbered timeline */}
      <section className="wrap sec">
        <div className="sec__head">
          <p className="eyebrow">how it runs</p>
          <h2 className="h-l">
            <ServiceTitle label={s.processTitle} />.
          </h2>
        </div>
        <div className="steps steps--row">
          {s.processSteps.map((step, i) => (
            <div key={step.title} className="step">
              <span className="step__n tnum">{String(i + 1).padStart(2, "0")}</span>
              <div className="step__b">
                <h3 className="step__t">
                  <ServiceTitle label={step.title} />
                </h3>
                <p>{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <ServiceDeliverables items={s.benefits.map((item) => ({ title: item.title, body: item.description }))} title={s.benefitsTitle} />

      {related.length ? (
        <section className="wrap sec institutional-related">
          <div className="sec__head"><p className="eyebrow">in production</p><h2 className="h-l">The same practice, delivered for other teams.</h2><p className="lede">Production systems with the numbers attached.</p></div>
          <InstitutionalWorkRail items={related} label={`${s.title} case studies`} />
        </section>
      ) : null}

      <LogoWall />

      {/* WHO IT IS FOR */}
      <section className="wrap sec">
        <div className="split">
          <div className="split__copy">
            <p className="eyebrow">is this you?</p>
            <h2 className="h-l">
              <ServiceTitle label={s.whoTitle} />
            </h2>
            <p className="lede">
              If several of these are true, this practice is probably the right starting point. If none
              of them are, say so on the call and we will point you at the one that fits — or at
              someone else entirely.
            </p>
            <Link className="btn btn--grad notch" href="/contact/" style={{ marginTop: "1.75rem" }}>
              Talk it through
            </Link>
          </div>
          <div className="split__side">
            <div className="checklist checklist--alt notch">
              <p className="checklist__lbl">when this is the right call</p>
              <ul>
                {s.whoPoints.map((p) => (
                  <li key={p}>
                    <Check className="checklist__ico" aria-hidden />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SUB-SERVICES */}
      {subs.length > 0 ? (
        <section className="wrap sec">
          <div className="sec__head">
            <p className="eyebrow">the specifics</p>
            <h2 className="h-l">Everything we build in this practice.</h2>
            <p className="lede">
              The {subs.length} services under <ServiceTitle label={s.title} />, each with its own page
              — the exact work, what is included, and what it costs you to get it wrong.
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

      <section className="institutional-testimonial"><div className="wrap"><TestimonialSlider /></div></section>

      <WritingCards
        slugs={PILLAR_POSTS[s.slug]}
        title="The numbers behind this practice"
        lede="Studies and benchmarks drawn from engagements exactly like this one."
      />

      <Faq items={s.faqs} title="Questions, answered" />

      <section className="cta">
        <svg className="art cta-art" viewBox="0 0 400 400" fill="none" aria-hidden="true">
          <path d="M40 120 h220 l100 100 v220 h-320 z" stroke="currentColor" strokeWidth="2.5" />
          <path d="M110 190 h150 l60 60 v150 h-210 z" stroke="currentColor" strokeWidth="2" opacity=".6" />
        </svg>
        <div className="wrap cta__in">
          <div className="cta__t">
            <h2 className="h-l">
              <ServiceTitle label={s.finalTitle} />
            </h2>
            <p>{s.finalDescription}</p>
          </div>
          <Link className="cta__btn notch" href="/contact/">
            Book a call
          </Link>
        </div>
      </section>
    </>
  );
}
