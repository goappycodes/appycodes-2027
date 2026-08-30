import Link from "next/link";
import { TestimonialSlider } from "@/components/testimonial-slider";
import { InstitutionalWorkRail, type InstitutionalWorkItem } from "@/components/institutional-work-rail";
import { CASE_STUDIES } from "@/components/sections";
import { JsonLd } from "@/components/jsonld";
import { pillarFor, siblingsFor, type SubServiceData } from "@/lib/sub-services-data";
import { PILLAR_CASES, subServiceMedia } from "@/lib/media";
import { breadcrumbSchema, serviceSchema } from "@/lib/schema";
import styles from "./institutional-service-page.module.css";

const PROCESS = [
  { n: "01", title: "Scope & cost", body: "We agree the outcome, users, integrations, budget and main technical risks before the work starts." },
  { n: "02", title: "Architecture", body: "We plan the data, interfaces and failure modes around the way the system needs to operate." },
  { n: "03", title: "Build & review", body: "You receive source access, a working environment and regular demonstrations throughout delivery." },
  { n: "04", title: "Launch & support", body: "We launch, document and monitor the work, then hand it over or continue as your engineering team." },
];

function Arrow() {
  return <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h11M10.5 5.5 15 10l-4.5 4.5" /></svg>;
}

function CapabilityIcon({ index }: { index: number }) {
  const paths = [
    <><rect x="4" y="5" width="20" height="18" rx="1" /><path d="M10 5v18M10 11h14" /></>,
    <><circle cx="8" cy="9" r="3" /><circle cx="20" cy="19" r="3" /><path d="m10.5 10.5 7 7M5 21c2.5-5 6-6 9-5" /></>,
    <><rect x="4" y="7" width="20" height="16" rx="1" /><path d="M4 12h20M9 4v6M19 4v6" /></>,
    <><path d="M4 7h20v16H4zM8 11h5M8 15h12M8 19h8" /></>,
    <><rect x="5" y="4" width="18" height="20" rx="2" /><path d="M9 10h10M9 15h7M9 20h4" /></>,
    <><circle cx="7" cy="14" r="3" /><circle cx="21" cy="7" r="3" /><circle cx="21" cy="21" r="3" /><path d="m9.5 12.5 9-4M9.5 15.5l9 4" /></>,
  ];
  return <span className={styles.scopeIcon}><svg viewBox="0 0 28 28" aria-hidden="true">{paths[index % paths.length]}</svg></span>;
}

function sentence(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function InstitutionalSubServicePage({ service }: { service: SubServiceData }) {
  const pillar = pillarFor(service.slug);
  const siblings = siblingsFor(service.slug);
  const image = subServiceMedia(service.slug, pillar?.slug);
  const work: InstitutionalWorkItem[] = CASE_STUDIES
    .filter((item) => pillar && PILLAR_CASES[pillar.slug]?.includes(item.name))
    .map((item) => ({
      href: item.href,
      image: item.img,
      client: item.name,
      logo: item.logo?.startsWith("/images/logo-") ? item.logo : undefined,
      brand: item.name.replace(/[^A-Za-z0-9]/g, ""),
      sector: item.meta.split("·")[1]?.trim() ?? pillar?.title ?? service.title,
      title: item.meta,
      detail: item.body,
      metric: item.fig,
      metricLabel: item.figlabel,
    }));

  return (
    <main className={styles.page}>
      <JsonLd data={[
        serviceSchema({ name: service.title, description: service.metaDescription, path: `/services/${service.slug}/`, image, serviceType: pillar?.title ?? service.title }),
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services/" },
          ...(pillar ? [{ name: pillar.title, path: `/services/${pillar.slug}/` }] : []),
          { name: service.title, path: `/services/${service.slug}/` },
        ]),
      ]} />

      <section className={styles.hero}>
        <div className={styles.crumbBar}>
          <nav className={`${styles.inner} ${styles.crumbs}`} aria-label="Breadcrumb">
            <Link href="/">Home</Link><span>/</span><Link href="/services/">Services</Link><span>/</span>
            {pillar ? <><Link href={`/services/${pillar.slug}/`}>{pillar.title}</Link><span>/</span></> : null}
            <span>{service.title}</span>
          </nav>
        </div>
        <div className={styles.inner}>
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <span className={styles.kicker}>{pillar?.title ?? "Engineering service"} / specialist delivery</span>
              <h1>{sentence(service.headline)}</h1>
              <p>{service.metaDescription}</p>
              <div className={styles.actions}>
                <Link href="/contact/" className={styles.primary}>Discuss your project <Arrow /></Link>
                <a href="#scope" className={styles.secondary}>Review the scope</a>
              </div>
            </div>
            <aside className={styles.heroPanel}>
              <div className={styles.panelHead}><span>{service.title}</span><span>AC / 2026</span></div>
              <figure><img src={image} alt="" /></figure>
              <ul>{service.points.slice(0, 3).map((item, index) => <li key={item.title}><span>{String(index + 1).padStart(2, "0")}</span> {item.title}</li>)}</ul>
              <div className={styles.panelFoot}><i /> Senior-led / transparent / accountable</div>
            </aside>
          </div>
        </div>
      </section>

      <section className={styles.record} aria-label="Delivery record">
        <div className={`${styles.inner} ${styles.recordGrid}`}>
          <div><strong>2015</strong><span>Building production software since</span></div>
          <div><strong>8+ yrs</strong><span>Longest active partnership</span></div>
          <div><strong>100%</strong><span>Source and production visibility</span></div>
          <div><strong>5.0</strong><span>Across 18 verified Clutch reviews</span></div>
        </div>
      </section>

      <section className={styles.section} id="scope">
        <div className={styles.inner}>
          <header className={styles.sectionHead}>
            <div><span className={styles.kicker}>Scope</span><h2>What this service covers.</h2></div>
            <p>{service.intro[0] ?? service.metaDescription}</p>
          </header>
          <div className={styles.scopeGrid}>
            {service.points.map((item, index) => <article className={styles.scopeCard} key={item.title}>
              <CapabilityIcon index={index} /><span>{String(index + 1).padStart(2, "0")}</span><h3>{item.title}</h3><p>{item.body}</p>
            </article>)}
          </div>
        </div>
      </section>

      {work.length ? <section className={styles.work} id="work">
        <div className={styles.inner}>
          <header className={styles.sectionHead}>
            <div><span className={styles.kicker}>In production</span><h2>Work from the same practice.</h2></div>
            <p>Related delivery with the client context and measurable outcomes attached.</p>
          </header>
          <InstitutionalWorkRail items={work} label={`${service.title} case studies`} />
          <Link href="/case-studies/" className={styles.textLink}>Explore all case studies <Arrow /></Link>
        </div>
      </section> : null}

      <section className={styles.process}>
        <div className={`${styles.inner} ${styles.processGrid}`}>
          <div className={styles.processIntro}><span className={styles.kicker}>A clear delivery process</span><h2>From first decision to production.</h2><p>The same senior team stays close to scope, architecture, build, launch and what comes next.</p></div>
          <ol>{PROCESS.map((item) => <li key={item.n}><span>{item.n}</span><div><h3>{item.title}</h3><p>{item.body}</p></div></li>)}</ol>
        </div>
      </section>

      {siblings.length && pillar ? <section className={styles.specialisms}>
        <div className={`${styles.inner} ${styles.specialismGrid}`}>
          <div><span className={styles.kicker}>Also in this practice</span><h2>One team across the whole system.</h2><p>Related {pillar.title} capabilities can be commissioned individually or as one connected programme.</p></div>
          <nav aria-label={`${pillar.title} services`}>{siblings.map((item, index) => <Link href={`/services/${item.slug}/`} key={item.slug}><CapabilityIcon index={index} /><span>{String(index + 1).padStart(2, "0")}</span><strong>{item.label}</strong><Arrow /></Link>)}</nav>
        </div>
      </section> : null}

      <section className={styles.testimonial}><div className={styles.inner}><TestimonialSlider /></div></section>

      <section className={styles.faq}>
        <div className={`${styles.inner} ${styles.faqGrid}`}>
          <div><span className={styles.kicker}>Common questions</span><h2>Planning the work.</h2></div>
          <div className={styles.faqList}>{service.faqs.map((item, index) => <details key={item.question}><summary><span>{String(index + 1).padStart(2, "0")}</span><strong>{item.question}</strong><i aria-hidden="true">+</i></summary><p>{item.answer}</p></details>)}</div>
        </div>
      </section>

      <section className={styles.closing}>
        <div className={styles.inner}><span className={styles.kicker}>Start a project</span><h2>Bring us the exact problem.</h2><p>Book a 30-minute call with the senior team that will scope and lead the work.</p><div className={styles.actions}><Link href="/contact/" className={styles.primary}>Book a discovery call <Arrow /></Link><Link href="/software-project-estimator/" className={styles.secondary}>Get a 2-minute estimate</Link></div></div>
      </section>
    </main>
  );
}
