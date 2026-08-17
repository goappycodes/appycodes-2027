import Link from "next/link";
import { SERVICES_DATA } from "@/lib/services-data";
import { SECTORS_DATA, type SectorData } from "@/lib/sectors-data";
import { ServiceTitle } from "@/components/service-title";
import { Check, ChevronRight } from "@/components/icons";
import { PageHero } from "@/components/page-hero";
import { AwardsStrip, FeaturedWork, LogoWall, Testimonials, Faq } from "@/components/sections";
import { JsonLd } from "@/components/jsonld";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/schema";

/**
 * A sector page. Same furniture as the service pages, different argument: a
 * service page says what we build, this says we have already built it in your
 * industry and here is the part that was hard.
 */
export function SectorPage({ s }: { s: SectorData }) {
  const services = s.services
    .map((slug) => SERVICES_DATA.find((x) => x.slug === slug))
    .filter((x): x is (typeof SERVICES_DATA)[number] => Boolean(x));
  const others = SECTORS_DATA.filter((x) => x.slug !== s.slug);

  return (
    <>
      <JsonLd
        data={[
          serviceSchema({
            name: `${s.name} software development`,
            description: s.metaDescription,
            path: `/sectors/${s.slug}/`,
            serviceType: s.name,
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Sectors", path: "/sectors/" },
            { name: s.name, path: `/sectors/${s.slug}/` },
          ]),
          faqSchema(s.faqs),
        ]}
      />

      <PageHero
        crumbs={[
          { label: "home", href: "/" },
          { label: "sectors", href: "/sectors/" },
          { label: s.name },
        ]}
        eyebrow="sector"
        titleSize="md"
        title={<ServiceTitle label={s.headline} />}
        lede={s.summary}
        actions={[
          { label: "start a project", href: "/contact/" },
          { label: "see the register", href: "/atlas/", variant: "out" },
        ]}
        stats={s.stats}
      />

      <AwardsStrip />

      {/* THE PROBLEM — their words, not ours */}
      <section className="wrap sec">
        <div className="split">
          <div className="split__copy">
            <p className="eyebrow">the problem</p>
            <h2 className="h-l">what this sector actually deals with.</h2>
            <p className="lede">{s.problem.lede}</p>
          </div>
          <div className="split__side">
            <div className="checklist notch">
              <p className="checklist__lbl">sound familiar?</p>
              <ul>
                {s.problem.points.map((p) => (
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

      {/* WHAT WE BUILT */}
      <section className="wrap sec">
        <div className="sec__head">
          <p className="eyebrow">what we have built here</p>
          <h2 className="h-l">not a capability list. delivered systems.</h2>
        </div>
        <div className="svc">
          {s.built.map((b, i) => (
            <div key={b.title} className="svc__i notch">
              <span className="svc__n">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="h-m">{b.title}</h3>
              <p className="body">{b.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* THE HARD PART — the reason to believe */}
      <section className="slab dotted">
        <div className="wrap slab__in">
          <div className="sec__head">
            <p className="eyebrow eyebrow--slab">the hard part</p>
            <h2 className="h-l" style={{ color: "#fff" }}>
              <ServiceTitle label={s.hard.title} />.
            </h2>
            <p className="lede" style={{ color: "var(--on-slab-2)" }}>
              {s.hard.lede}
            </p>
          </div>
          <ol className="hardlist">
            {s.hard.detail.map((d, i) => (
              <li key={i}>
                <span className="hardlist__n tnum g-dark">{String(i + 1).padStart(2, "0")}</span>
                <p>{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* STACK + ENGAGEMENT */}
      <section className="wrap sec">
        <div className="cs-grid2">
          <div className="sec__head">
            <p className="eyebrow">what it runs on</p>
            <h2 className="h-l">the stack we reach for here.</h2>
            <p className="lede">
              Chosen for what this sector needs and what a team can still maintain in year four —
              not for novelty.
            </p>
          </div>
          <dl className="cs-stack notch">
            {s.stack.map((row) => (
              <div key={row.layer} className="cs-stack__row">
                <dt>{row.layer}</dt>
                <dd>{row.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="wrap sec">
        <div className="sec__head">
          <p className="eyebrow">how an engagement runs</p>
          <h2 className="h-l">what the first weeks look like.</h2>
        </div>
        <div className="steps steps--row">
          {s.engagement.map((e, i) => (
            <div key={e.title} className="step">
              <span className="step__n tnum">{String(i + 1).padStart(2, "0")}</span>
              <div className="step__b">
                <h3 className="step__t">{e.title}</h3>
                <p>{e.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <FeaturedWork
        title="written up in full"
        lede="The engagements with the detail attached — and the numbers."
      />

      <LogoWall />

      {/* SERVICES THIS SECTOR LEANS ON */}
      <section className="wrap sec">
        <div className="sec__head">
          <p className="eyebrow">the practices behind it</p>
          <h2 className="h-l">what this work is made of.</h2>
        </div>
        <div className="svc">
          {services.map((sv) => (
            <Link key={sv.slug} href={`/services/${sv.slug}/`} className="svc__i notch">
              <h3 className="h-m">
                <ServiceTitle label={sv.title} />
              </h3>
              <p className="body">{sv.summary}</p>
              <ChevronRight className="svc__chev" aria-hidden />
            </Link>
          ))}
        </div>
      </section>

      <Testimonials limit={4} />

      <Faq items={s.faqs} title="questions from this sector" />

      {/* OTHER SECTORS — never dead-end */}
      <section className="wrap sec">
        <div className="sec__head">
          <p className="eyebrow">keep reading</p>
          <h2 className="h-l">the other sectors we work in.</h2>
        </div>
        <div className="svc-sub">
          {others.map((o) => (
            <Link key={o.slug} href={`/sectors/${o.slug}/`} className="svc-sub__i">
              <span>{o.name}</span>
              <ChevronRight className="svc-sub__chev" aria-hidden />
            </Link>
          ))}
        </div>
      </section>

      <section className="cta">
        <svg className="art cta-art" viewBox="0 0 400 400" fill="none" aria-hidden="true">
          <path d="M40 120 h220 l100 100 v220 h-320 z" stroke="currentColor" strokeWidth="2.5" />
          <path d="M110 190 h150 l60 60 v150 h-210 z" stroke="currentColor" strokeWidth="2" opacity=".6" />
        </svg>
        <div className="wrap cta__in">
          <div className="cta__t">
            <h2 className="h-l">{s.cta}</h2>
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
