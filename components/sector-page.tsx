import Link from "next/link";
import { SERVICES_DATA } from "@/lib/services-data";
import { SECTORS_DATA, type SectorData } from "@/lib/sectors-data";
import { serviceMedia } from "@/lib/media";
import { DELIVERY_SUMMARY } from "@/lib/site";
import { getWorkCards } from "@/lib/work-cards";
import { ServiceTitle } from "@/components/service-title";
import { ServiceDeliverables } from "@/components/service-deliverables";
import { TechnologyList } from "@/components/technology-list";
import { InstitutionalWorkRail } from "@/components/institutional-work-rail";
import { JsonLd } from "@/components/jsonld";
import { breadcrumbSchema, serviceSchema } from "@/lib/schema";
import base from "./institutional-service-page.module.css";
import styles from "./sector-page.module.css";

function Arrow() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6" /></svg>;
}

function SectorIcon({ index }: { index: number }) {
  const shapes = [
    <path key="energy" d="m13 2-8 12h6l-1 8 9-12h-6z" />,
    <><path d="m2 8 10-5 10 5-10 5zM6 10v7c3 3 9 3 12 0v-7M22 8v8" /></>,
    <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 10h18M7 15h4" /></>,
    <><path d="m3 7 9-4 9 4v10l-9 4-9-4zM3 7l9 4 9-4M12 11v10M7 5l10 4" /></>,
    <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M7 2v6M17 2v6M3 10h18M8 15h8" /></>,
    <><path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6z" /></>,
    <><path d="M5 21V7l7-4 7 4v14M3 21h18M9 9h6M9 13h6M10 21v-4h4v4" /></>,
    <><circle cx="12" cy="12" r="9" /><path d="m12 7 5 4-2 6H9l-2-6zM12 3v4M3 10l4 1m10 0 4-1M7 20l2-3m6 0 2 3" /></>,
    <><circle cx="5" cy="12" r="3" /><circle cx="19" cy="5" r="3" /><circle cx="19" cy="19" r="3" /><path d="m8 11 8-5M8 13l8 5" /></>,
  ];
  return <span className={styles.icon}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{shapes[index % shapes.length]}</svg></span>;
}

function SectorHero({ sector }: { sector?: SectorData }) {
  const media = serviceMedia(sector?.media ?? "product-engineering");
  return <section className={styles.hero}>
    <div className={base.crumbBar}>
      <nav className={`${base.inner} ${base.crumbs}`} aria-label="Breadcrumb">
        <Link href="/">Home</Link><span>/</span>
        {sector ? <><Link href="/sectors/">Sectors</Link><span>/</span><span>{sector.name}</span></> : <span>Sectors</span>}
      </nav>
    </div>
    <div className={`${base.inner} ${styles.heroGrid}`}>
      <div className={styles.heroCopy}>
        <span className={base.kicker}>{sector?.name ?? "Industry experience"}</span>
        <h1>{sector?.headline ?? "Software built for your industry."}</h1>
        <p>{sector?.summary ?? DELIVERY_SUMMARY + " We build websites, apps and business systems around the way your team works."}</p>
        <div className={base.actions}>
          <Link className={base.primary} href="/contact/">Discuss your project <Arrow /></Link>
          <a className={base.secondary} href={sector ? "#sector-services" : "#sectors"}>{sector ? "Explore services" : "Explore sectors"}</a>
        </div>
      </div>
      <figure className={styles.visual}>
        <div className={styles.visualHead}><span>{sector ? "Software & delivery" : "Built by Appycodes"}</span><span>Since 2015</span></div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={media.img} alt={media.alt} fetchPriority="high" />
        <figcaption>{sector ? "From planning and development to launch and support." : "Web platforms · Mobile apps · AI systems"}</figcaption>
      </figure>
    </div>
  </section>;
}

function SectorClosing() {
  return <section className={styles.closing}>
    <div className={base.inner}>
      <div><span className={base.kicker}>Start a project</span><h2>Tell us what you need.</h2><p>Talk through your plans with the team that will build it.</p></div>
      <Link href="/contact/" className={base.primary}>Book a call <Arrow /></Link>
    </div>
  </section>;
}

export function SectorIndex() {
  return <main className={`${base.page} ${styles.page}`}>
    <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Sectors", path: "/sectors/" }])} />
    <SectorHero />
    <section className={styles.section} id="sectors">
      <div className={base.inner}>
        <header className={styles.heading}><span className={base.kicker}>Sectors</span><h2>Where we work.</h2></header>
        <div className={styles.sectorGrid}>
          {SECTORS_DATA.map((sector, index) => <Link href={`/sectors/${sector.slug}/`} key={sector.slug} className={styles.sectorCard}>
            <SectorIcon index={index} />
            <div><h3>{sector.name}</h3><p>{sector.summary}</p></div>
            <Arrow />
          </Link>)}
        </div>
      </div>
    </section>
    <SectorClosing />
  </main>;
}

/** All sector detail routes use the same concise institutional layout. */
export function SectorPage({ s }: { s: SectorData }) {
  const services = s.services.map((slug) => SERVICES_DATA.find((service) => service.slug === slug)).filter((service) => service !== undefined);
  const work = getWorkCards(s.cases);
  return <main className={`${base.page} ${styles.page}`}>
    <JsonLd data={[
      serviceSchema({ name: `${s.name} software development`, description: s.metaDescription, path: `/sectors/${s.slug}/`, serviceType: s.name }),
      breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Sectors", path: "/sectors/" }, { name: s.name, path: `/sectors/${s.slug}/` }]),
    ]} />
    <SectorHero sector={s} />
    <ServiceDeliverables items={s.built} title="What we build" kicker="Our experience" description="" />
    <section className={styles.tools} aria-label="Technologies">
      <div className={base.inner}><h2>Tools we work with</h2><TechnologyList items={s.stack} /></div>
    </section>
    {work.length > 0 && <section className={styles.section} aria-label="Selected work">
      <div className={base.inner}>
        <header className={styles.heading}><span className={base.kicker}>Selected work</span><h2>Client projects.</h2></header>
        <InstitutionalWorkRail items={work} label={`${s.name} case studies`} />
        <Link className={styles.allLink} href="/case-studies/">All case studies <Arrow /></Link>
      </div>
    </section>}
    <section className={`${styles.section} ${styles.services}`} id="sector-services">
      <div className={base.inner}>
        <header className={styles.heading}><span className={base.kicker}>How we can help</span><h2>Related services.</h2></header>
        <nav className={styles.serviceLinks} aria-label="Related services">
          {services.map((service) => <Link key={service.slug} href={`/services/${service.slug}/`}><ServiceTitle label={service.title} /><Arrow /></Link>)}
        </nav>
        <Link className={styles.allLink} href="/sectors/">Explore all sectors <Arrow /></Link>
      </div>
    </section>
    <SectorClosing />
  </main>;
}
