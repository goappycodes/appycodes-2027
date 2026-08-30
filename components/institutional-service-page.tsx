import Link from "next/link";
import { TestimonialSlider } from "@/components/testimonial-slider";
import { InstitutionalWorkRail, type InstitutionalWorkItem } from "@/components/institutional-work-rail";
import { CASE_STUDIES } from "@/components/sections";
import { subServicesFor, type ServiceData } from "@/lib/services-data";
import { PILLAR_CASES, serviceMedia } from "@/lib/media";
import styles from "./institutional-service-page.module.css";

const PRODUCT_SCOPE = [
  { title: "Multi-tenant SaaS", body: "Secure tenant isolation, accounts, permissions and operator controls designed into the core." },
  { title: "Marketplaces", body: "Supply, demand, trust, payments and the operational workflows that keep both sides moving." },
  { title: "Ticketing & booking", body: "Inventory, availability, checkout and fulfilment connected in one reliable platform." },
  { title: "Internal systems", body: "Purpose-built dashboards and workflows that replace fragmented spreadsheets and manual handoffs." },
  { title: "Billing & subscriptions", body: "Plans, usage, instalments and reconciled payment flows built around your commercial model." },
  { title: "APIs & integrations", body: "Documented interfaces that connect your product to the systems your teams and partners already use." },
];

const PRODUCT_PROCESS = [
  { n: "01", title: "Scope & cost", body: "We agree the users, workflows, integrations, budget and main technical risks before the project starts." },
  { n: "02", title: "Architecture", body: "We plan the data model, permissions, billing and infrastructure around how the business operates." },
  { n: "03", title: "Build & review", body: "You receive access to the code, a working environment and regular demonstrations throughout delivery." },
  { n: "04", title: "Launch & support", body: "We launch, document and monitor the platform, then hand it over or continue as your product team." },
];

const PRODUCT_DELIVERABLES = [
  { title: "A platform your team owns", body: "Your repository, cloud accounts, documentation and production access from the start." },
  { title: "A dependable operating core", body: "The admin tools, roles and audit history needed to run the business every day." },
  { title: "Billing that reconciles", body: "Subscriptions, usage or instalments connected cleanly to your own records." },
  { title: "An API built for change", body: "Versioned, documented interfaces that make future products and integrations easier." },
  { title: "Production visibility", body: "Monitoring, backups and operational alerts configured before launch." },
  { title: "Room to grow", body: "Indexes, queues and caching designed around the volumes the business is targeting." },
];

function Arrow() {
  return <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h11M10.5 5.5 15 10l-4.5 4.5" /></svg>;
}

function ScopeIcon({ index }: { index: number }) {
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

function SpecialismIcon({ index }: { index: number }) {
  const paths = [
    <><rect x="4" y="6" width="20" height="16" rx="1" /><path d="M4 11h20M9 16h6" /></>,
    <><circle cx="8" cy="14" r="3" /><circle cx="20" cy="8" r="3" /><path d="m10.5 12.5 7-3" /><circle cx="20" cy="20" r="3" /><path d="m10.5 15.5 7 3" /></>,
    <><path d="M5 8h18v15H5zM9 5v6M19 5v6" /><path d="M9 16h10" /></>,
    <><path d="M6 23V6h16v17M3 23h22" /><path d="M10 10h8M10 14h8M10 18h5" /></>,
    <><rect x="4" y="6" width="20" height="17" rx="1" /><path d="M4 11h20M9 15h5M9 19h10" /></>,
    <><path d="M5 22 14 5l9 17M9 15h10" /><path d="M3 22h22" /></>,
    <><rect x="5" y="5" width="18" height="18" rx="1" /><path d="M9 9h10v10H9z" /></>,
    <><path d="M5 5h18v18H5zM5 11h18M11 11v12" /></>,
    <><path d="M4 8h20v15H4zM8 5v6M20 5v6" /><circle cx="10" cy="17" r="2" /></>,
    <><path d="M4 20 10 8l4 8 4-11 6 15" /><path d="M4 23h20" /></>,
    <><path d="M6 5h16v18H6zM10 9h8M10 13h8M10 17h5" /></>,
    <><path d="M5 7h18v16H5zM9 11h10M9 15h6" /><path d="M14 4v3" /></>,
  ];
  return <span className={styles.specialismIcon}><svg viewBox="0 0 28 28" aria-hidden="true">{paths[index % paths.length]}</svg></span>;
}

function sentence(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function InstitutionalServicePage({ service }: { service: ServiceData }) {
  const isProduct = service.slug === "product-platforms";
  const specialisms = subServicesFor(service.slug);
  const media = serviceMedia(service.slug);
  const scope = isProduct
    ? PRODUCT_SCOPE
    : service.whyPoints.map((title, index) => ({ title, body: service.benefits[index]?.description ?? service.summary }));
  const process = isProduct
    ? PRODUCT_PROCESS
    : service.processSteps.map((item, index) => ({ n: String(index + 1).padStart(2, "0"), title: item.title, body: item.description }));
  const deliverables = isProduct ? PRODUCT_DELIVERABLES : service.benefits.map((item) => ({ title: item.title, body: item.description }));
  const work: InstitutionalWorkItem[] = CASE_STUDIES
    .filter((item) => PILLAR_CASES[service.slug]?.includes(item.name))
    .map((item) => ({
      href: item.href,
      image: item.img,
      client: item.name,
      logo: item.logo?.startsWith("/images/logo-") ? item.logo : undefined,
      brand: item.name.replace(/[^A-Za-z0-9]/g, ""),
      sector: item.meta.split("·")[1]?.trim() ?? service.title,
      title: item.meta,
      detail: item.body,
      metric: item.fig,
      metricLabel: item.figlabel,
    }));

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.crumbBar}>
          <nav className={`${styles.inner} ${styles.crumbs}`} aria-label="Breadcrumb">
            <Link href="/">Home</Link><span>/</span><Link href="/services/">Services</Link><span>/</span><span>{sentence(service.title)}</span>
          </nav>
        </div>
        <div className={styles.inner}>
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <span className={styles.kicker}>{sentence(service.title)} / senior-led delivery</span>
              <h1>{isProduct ? "Software for the systems your business runs on." : sentence(service.headline)}</h1>
              <p>{service.description}</p>
              <div className={styles.actions}>
                <Link href="/contact/" className={styles.primary}>Discuss your project <Arrow /></Link>
                <a href="#work" className={styles.secondary}>Review our work</a>
              </div>
            </div>
            <aside className={styles.heroPanel}>
              <div className={styles.panelHead}><span>{sentence(service.title)}</span><span>AC / 2026</span></div>
              <figure>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={media.img} alt={media.alt} />
              </figure>
              <ul>
                {service.whyPoints.slice(0, 3).map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, "0")}</span> {item}</li>)}
              </ul>
              <div className={styles.panelFoot}><i /> Senior-led / transparent / accountable</div>
            </aside>
          </div>
        </div>
      </section>

      <section className={styles.record} aria-label={`${service.title} delivery record`}>
        <div className={`${styles.inner} ${styles.recordGrid}`}>
          <div><strong>2015</strong><span>Building production software since</span></div>
          <div><strong>8+ yrs</strong><span>Longest active partnership</span></div>
          <div><strong>£2M+</strong><span>Processed by one platform</span></div>
          <div><strong>5.0</strong><span>Across 18 verified Clutch reviews</span></div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.inner}>
          <header className={styles.sectionHead}>
            <div><span className={styles.kicker}>What we deliver</span><h2>{sentence(service.whyTitle)}.</h2></div>
            <p>{service.whyDescription}</p>
          </header>
          <div className={styles.scopeGrid}>
            {scope.map((item, index) => (
              <article className={styles.scopeCard} key={item.title}>
                <ScopeIcon index={index} />
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.work} id="work">
        <div className={styles.inner}>
          <header className={styles.sectionHead}>
            <div><span className={styles.kicker}>In production</span><h2>Real work in this practice.</h2></div>
            <p>Delivered systems with the client context and measurable outcomes attached.</p>
          </header>
          <InstitutionalWorkRail items={work} label={`${service.title} case studies`} />
          <Link href="/case-studies/" className={styles.textLink}>Explore all case studies <Arrow /></Link>
        </div>
      </section>

      <section className={styles.process}>
        <div className={`${styles.inner} ${styles.processGrid}`}>
          <div className={styles.processIntro}>
            <span className={styles.kicker}>A clear delivery process</span>
            <h2>From first decision to production.</h2>
            <p>The same senior team stays close to scope, architecture, build, launch and what comes next.</p>
          </div>
          <ol>
            {process.map((item) => <li key={item.n}><span>{item.n}</span><div><h3>{item.title}</h3><p>{item.body}</p></div></li>)}
          </ol>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.inner}>
          <header className={styles.sectionHead}>
            <div><span className={styles.kicker}>What you receive</span><h2>{sentence(service.benefitsTitle)}.</h2></div>
            <p>{service.benefitsQuote ?? "Technical foundations and operational clarity are delivered as part of the work."}</p>
          </header>
          <div className={styles.deliverables}>
            {deliverables.map((item, index) => <article key={item.title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{item.title}</h3><p>{item.body}</p></article>)}
          </div>
        </div>
      </section>

      <section className={styles.specialisms}>
        <div className={`${styles.inner} ${styles.specialismGrid}`}>
          <div><span className={styles.kicker}>Specific capabilities</span><h2>Bring us the exact problem.</h2><p>These {service.title} services can be commissioned individually or as one connected programme.</p></div>
          <nav aria-label={`${service.title} specialisms`}>
            {specialisms.map((item, index) => <Link href={`/services/${item.slug}/`} key={item.slug}><SpecialismIcon index={index} /><span>{String(index + 1).padStart(2, "0")}</span><strong>{item.label}</strong><Arrow /></Link>)}
          </nav>
        </div>
      </section>

      <section className={styles.testimonial}>
        <div className={styles.inner}><TestimonialSlider /></div>
      </section>

      <section className={styles.faq}>
        <div className={`${styles.inner} ${styles.faqGrid}`}>
          <div><span className={styles.kicker}>Common questions</span><h2>Planning the work.</h2></div>
          <div className={styles.faqList}>{service.faqs.map((item, index) => <details key={item.question}><summary><span>{String(index + 1).padStart(2, "0")}</span><strong>{item.question}</strong><i aria-hidden="true">+</i></summary><p>{item.answer}</p></details>)}</div>
        </div>
      </section>

      <section className={styles.closing}>
        <div className={styles.inner}>
          <span className={styles.kicker}>Start a project</span>
          <h2>{sentence(service.finalTitle)}.</h2>
          <p>{service.finalDescription}</p>
          <div className={styles.actions}><Link href="/contact/" className={styles.primary}>Book a discovery call <Arrow /></Link><Link href="/software-project-estimator/" className={styles.secondary}>Get a 2-minute estimate</Link></div>
        </div>
      </section>
    </main>
  );
}
