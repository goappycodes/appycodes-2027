import Link from "next/link";
import { pillarFor, siblingsFor, type SubServiceData } from "@/lib/sub-services-data";
import { ServiceTitle } from "@/components/service-title";
import { ChevronRight, Check, ArrowUpRight } from "@/components/icons";
import { PageHero } from "@/components/page-hero";
import { FeaturedWork, LogoWall, Testimonials, WritingCards, Faq } from "@/components/sections";
import { subServiceMedia, PILLAR_CASES, PILLAR_POSTS } from "@/lib/media";
import { JsonLd } from "@/components/jsonld";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/schema";

/* eslint-disable @next/next/no-img-element */

const HOW = [
  { n: "01", h: "scope & cost", body: "A fixed written scope with the risky parts named up front, before you commit." },
  { n: "02", h: "architecture", body: "Data model, integrations and failure modes decided on paper first." },
  { n: "03", h: "build in the open", body: "Your repo, your infrastructure, weekly demos on a real environment." },
  { n: "04", h: "handover or stay", body: "Documented handover to your team, or we keep running it. Both are real options." },
];

export function SubServicePage({ s }: { s: SubServiceData }) {
  const pillar = pillarFor(s.slug);
  const siblings = siblingsFor(s.slug);
  const img = subServiceMedia(s.slug, pillar?.slug);
  const [firstPara, ...restIntro] = s.intro;

  return (
    <>
      <JsonLd
        data={[
          serviceSchema({
            name: s.title,
            description: s.metaDescription,
            path: `/services/${s.slug}/`,
            image: img,
            serviceType: pillar?.title ?? s.title,
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services/" },
            ...(pillar ? [{ name: pillar.title, path: `/services/${pillar.slug}/` }] : []),
            { name: s.title, path: `/services/${s.slug}/` },
          ]),
          faqSchema(s.faqs),
        ]}
      />
      <PageHero
        crumbs={[
          { label: "home", href: "/" },
          { label: "services", href: "/services/" },
          ...(pillar ? [{ label: pillar.title, href: `/services/${pillar.slug}/` }] : []),
          { label: s.title },
        ]}
        eyebrow={pillar ? pillar.title : "service"}
        title={
          <>
            <ServiceTitle label={s.title} />.
          </>
        }
        lede={<ServiceTitle label={s.headline} />}
        actions={[
          { label: "start a project", href: "/contact/" },
          pillar
            ? { label: `${pillar.title} overview`, href: `/services/${pillar.slug}/`, variant: "out" as const }
            : { label: "all services", href: "/services/", variant: "out" as const },
        ]}
        media={{ src: img, alt: s.title }}
        stats={[
          { n: "senior", label: "engineers only" },
          { n: "day one", label: "you own the code" },
          { n: "fixed", label: "written scope" },
          { n: "2015", label: "shipping since" },
        ]}
      />

      {/* INTRO — lead paragraph carried at size, the rest beside a proof panel */}
      <section className="wrap sec">
        <div className="split">
          <div className="split__copy">
            <p className="eyebrow">the short version</p>
            {firstPara ? <p className="lede lede--lead">{firstPara}</p> : null}
            {restIntro.length > 0 ? (
              <div className="prose">
                {restIntro.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            ) : null}
          </div>
          <div className="split__side">
            <div className="checklist checklist--alt notch">
              <p className="checklist__lbl">how we work, on every engagement</p>
              <ul>
                <li>
                  <Check className="checklist__ico" aria-hidden />
                  <span>Senior engineers only — no juniors billed at senior rates</span>
                </li>
                <li>
                  <Check className="checklist__ico" aria-hidden />
                  <span>Your repository, your cloud accounts, your keys, from day one</span>
                </li>
                <li>
                  <Check className="checklist__ico" aria-hidden />
                  <span>A fixed written scope with the risky parts named up front</span>
                </li>
                <li>
                  <Check className="checklist__ico" aria-hidden />
                  <span>Weekly demos on a real environment — no big reveal at the end</span>
                </li>
                <li>
                  <Check className="checklist__ico" aria-hidden />
                  <span>Documented handover whenever you want it, not as a punishment</span>
                </li>
              </ul>
            </div>
            {pillar ? (
              <Link className="pillar-link notch" href={`/services/${pillar.slug}/`}>
                <span className="pillar-link__k">part of</span>
                <span className="pillar-link__t">
                  <ServiceTitle label={pillar.title} />
                </span>
                <span className="pillar-link__d">{pillar.summary}</span>
                <ArrowUpRight className="pillar-link__arrow" aria-hidden />
              </Link>
            ) : null}
          </div>
        </div>
      </section>

      {/* WHAT'S INCLUDED */}
      <section className="wrap sec">
        <div className="sec__head">
          <p className="eyebrow">scope</p>
          <h2 className="h-l">what&apos;s included.</h2>
        </div>
        <div className="svc">
          {s.points.map((pt, i) => (
            <div key={pt.title} className="svc__i notch">
              <span className="svc__n">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="h-m">
                <ServiceTitle label={pt.title} />
              </h3>
              <p className="body">{pt.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT RUNS — dark slab */}
      <section className="slab dotted">
        <div className="wrap slab__in">
          <div className="sec__head">
            <p className="eyebrow eyebrow--slab">how it runs</p>
            <h2 className="h-l" style={{ color: "#fff", maxWidth: "21ch" }}>
              no discovery theatre. four steps, and you own everything at each one
            </h2>
          </div>
          <div className="proc">
            {HOW.map((p) => (
              <div key={p.n} className="proc__i notch">
                <span className="proc__n g-dark">{p.n}</span>
                <h3 className="h-s">{p.h}</h3>
                <p>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FeaturedWork
        title="what this has shipped before"
        lede="Production systems from the same practice, with the numbers attached."
        only={pillar ? PILLAR_CASES[pillar.slug] : undefined}
      />

      <LogoWall />

      <Testimonials limit={4} />

      {/* SIBLINGS — the rest of the practice */}
      {siblings.length > 0 && pillar ? (
        <section className="wrap sec">
          <div className="sec__head">
            <p className="eyebrow">also in this practice</p>
            <h2 className="h-l">
              the rest of <ServiceTitle label={pillar.title} />.
            </h2>
            <p className="lede">
              Most engagements touch more than one of these. One team runs the whole estate rather than
              handing you between vendors.
            </p>
          </div>
          <div className="svc-sub">
            {siblings.map((sib) => (
              <Link key={sib.slug} href={`/services/${sib.slug}/`} className="svc-sub__i">
                <span>{sib.label}</span>
                <ChevronRight className="svc-sub__chev" aria-hidden />
              </Link>
            ))}
          </div>
          <div className="sec__more">
            <Link className="btn btn--out notch" href={`/services/${pillar.slug}/`}>
              <ServiceTitle label={pillar.title} /> overview
            </Link>
          </div>
        </section>
      ) : null}

      {pillar ? (
        <WritingCards
          slugs={PILLAR_POSTS[pillar.slug]}
          title="the numbers behind this work"
          lede="Studies and benchmarks from engagements exactly like this one."
        />
      ) : (
        <WritingCards />
      )}

      <Faq items={s.faqs} title="questions, answered" />

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
          <Link className="cta__btn notch" href="/contact/">
            book a call
          </Link>
        </div>
      </section>
    </>
  );
}
