import Link from "next/link";
import { TestimonialSlider } from "@/components/testimonial-slider";
import { InstitutionalWorkRail } from "@/components/institutional-work-rail";
import { subServicesFor } from "@/lib/services-data";
import styles from "./institutional-service-page.module.css";

const SCOPE = [
  { title: "Multi-tenant SaaS", body: "Secure tenant isolation, accounts, permissions and operator controls designed into the core." },
  { title: "Marketplaces", body: "Supply, demand, trust, payments and the operational workflows that keep both sides moving." },
  { title: "Ticketing & booking", body: "Inventory, availability, checkout and fulfilment connected in one reliable platform." },
  { title: "Internal systems", body: "Purpose-built dashboards and workflows that replace fragmented spreadsheets and manual handoffs." },
  { title: "Billing & subscriptions", body: "Plans, usage, instalments and reconciled payment flows built around your commercial model." },
  { title: "APIs & integrations", body: "Documented interfaces that connect your product to the systems your teams and partners already use." },
];

const PROCESS = [
  { n: "01", title: "Scope & cost", body: "We agree the users, workflows, integrations, budget and main technical risks before the project starts." },
  { n: "02", title: "Architecture", body: "We plan the data model, permissions, billing and infrastructure around how the business operates." },
  { n: "03", title: "Build & review", body: "You receive access to the code, a working environment and regular demonstrations throughout delivery." },
  { n: "04", title: "Launch & support", body: "We launch, document and monitor the platform, then hand it over or continue as your product team." },
];

const DELIVERABLES = [
  { title: "A platform your team owns", body: "Your repository, cloud accounts, documentation and production access from the start." },
  { title: "A dependable operating core", body: "The admin tools, roles and audit history needed to run the business every day." },
  { title: "Billing that reconciles", body: "Subscriptions, usage or instalments connected cleanly to your own records." },
  { title: "An API built for change", body: "Versioned, documented interfaces that make future products and integrations easier." },
  { title: "Production visibility", body: "Monitoring, backups and operational alerts configured before launch." },
  { title: "Room to grow", body: "Indexes, queues and caching designed around the volumes the business is targeting." },
];

const WORK = [
  {
    href: "/case-studies/ontick/",
    image: "/images/cs-ontick-platform.jpg",
    client: "Ontick",
    brand: "Ontick",
    sector: "Event technology",
    title: "A multi-organiser ticketing platform with web and two native apps.",
    detail: "Multi-organiser commerce, Stripe instalments and two native apps in one connected platform.",
    metric: "£2M+",
    metricLabel: "processed since launch",
  },
  {
    href: "/case-studies/professional-energy/",
    image: "/images/pes-6.png",
    client: "Professional Energy",
    brand: "ProfessionalEnergy",
    sector: "Energy brokerage",
    title: "One platform for tenders, contracts, supplier data and brokerage accounts.",
    detail: "Tendering, contract lifecycle, brokerage accounting and client relationships in one operational system.",
    metric: "100+",
    metricLabel: "suppliers in one tender",
  },
  {
    href: "/case-studies/bloc/",
    image: "/images/bloc-6.png",
    client: "Bloc",
    brand: "Bloc",
    sector: "Social events",
    title: "A connected product estate spanning apps, backend, advertising and web.",
    detail: "A four-year partnership across the mobile app, backend, advertising platform, marketplace and web front.",
    metric: "4+ yrs",
    metricLabel: "one team, five codebases",
  },
];

const FAQS = [
  { q: "Can you work with our existing platform?", a: "Yes. We assess the current code, architecture and delivery risks, then extend what is sound and replace only what restricts the product." },
  { q: "How do you approach multi-tenant data isolation?", a: "We choose row-level, schema-level or dedicated isolation based on the product’s risk and compliance needs, and validate the model before feature delivery begins." },
  { q: "Which technologies do you use?", a: "Most platforms use Next.js or Laravel with PostgreSQL and cloud infrastructure the client owns. The final stack follows the product, team and operating requirements." },
  { q: "How long does a platform build take?", a: "A focused first release commonly takes 8–12 weeks. Larger operational platforms typically run 12–20 weeks, depending on workflows, integrations and migration needs." },
  { q: "What happens after launch?", a: "We provide documentation, monitoring and a structured handover. We can also stay responsible for releases, support and product development." },
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
  return <span className={styles.scopeIcon}><svg viewBox="0 0 28 28" aria-hidden="true">{paths[index]}</svg></span>;
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

export function InstitutionalServicePage() {
  const specialisms = subServicesFor("product-platforms");

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.crumbBar}>
          <nav className={`${styles.inner} ${styles.crumbs}`} aria-label="Breadcrumb">
            <Link href="/">Home</Link><span>/</span><Link href="/services/">Services</Link><span>/</span><span>Product engineering</span>
          </nav>
        </div>
        <div className={styles.inner}>
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <span className={styles.kicker}>Product engineering / business-critical platforms</span>
              <h1>Software for the systems your business runs on.</h1>
              <p>We design, build and support multi-tenant SaaS, marketplaces, ticketing, booking and internal platforms for growing businesses.</p>
              <div className={styles.actions}>
                <Link href="/contact/" className={styles.primary}>Discuss your platform <Arrow /></Link>
                <a href="#work" className={styles.secondary}>Review our work</a>
              </div>
            </div>
            <aside className={styles.heroPanel}>
              <div className={styles.panelHead}><span>Platform delivery</span><span>AC / 2026</span></div>
              <figure>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/service-product-platforms-featured.png" alt="A modular product platform connected to a resilient central core" />
              </figure>
              <ul>
                <li><span>01</span> Data model and permissions agreed upfront</li>
                <li><span>02</span> Working software reviewed throughout</li>
                <li><span>03</span> Production, documentation and support included</li>
              </ul>
              <div className={styles.panelFoot}><i /> Senior-led / transparent / accountable</div>
            </aside>
          </div>
        </div>
      </section>

      <section className={styles.record} aria-label="Product engineering delivery record">
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
            <div><span className={styles.kicker}>What we build</span><h2>Product engineering, end to end.</h2></div>
            <p>We combine customer-facing product work with the operational systems, integrations and infrastructure behind it.</p>
          </header>
          <div className={styles.scopeGrid}>
            {SCOPE.map((item, index) => (
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
            <div><span className={styles.kicker}>In production</span><h2>Platforms already delivering results.</h2></div>
            <p>Real systems supporting payments, operations and customers across different industries.</p>
          </header>
          <InstitutionalWorkRail items={WORK} label="Product engineering case studies" />
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
            {PROCESS.map((item) => <li key={item.n}><span>{item.n}</span><div><h3>{item.title}</h3><p>{item.body}</p></div></li>)}
          </ol>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.inner}>
          <header className={styles.sectionHead}>
            <div><span className={styles.kicker}>What you receive</span><h2>A platform prepared for ownership and growth.</h2></div>
            <p>Technical foundations and operational clarity are delivered as part of the product.</p>
          </header>
          <div className={styles.deliverables}>
            {DELIVERABLES.map((item, index) => <article key={item.title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{item.title}</h3><p>{item.body}</p></article>)}
          </div>
        </div>
      </section>

      <section className={styles.specialisms}>
        <div className={`${styles.inner} ${styles.specialismGrid}`}>
          <div><span className={styles.kicker}>Specific capabilities</span><h2>Bring us the exact platform problem.</h2><p>These product-engineering services can be commissioned individually or as one connected programme.</p></div>
          <nav aria-label="Product engineering specialisms">
            {specialisms.map((item, index) => <Link href={`/services/${item.slug}/`} key={item.slug}><SpecialismIcon index={index} /><span>{String(index + 1).padStart(2, "0")}</span><strong>{item.label}</strong><Arrow /></Link>)}
          </nav>
        </div>
      </section>

      <section className={styles.testimonial}>
        <div className={styles.inner}><TestimonialSlider /></div>
      </section>

      <section className={styles.faq}>
        <div className={`${styles.inner} ${styles.faqGrid}`}>
          <div><span className={styles.kicker}>Common questions</span><h2>Planning a platform build.</h2></div>
          <div className={styles.faqList}>{FAQS.map((item, index) => <details key={item.q}><summary><span>{String(index + 1).padStart(2, "0")}</span><strong>{item.q}</strong><i aria-hidden="true">+</i></summary><p>{item.a}</p></details>)}</div>
        </div>
      </section>

      <section className={styles.closing}>
        <div className={styles.inner}>
          <span className={styles.kicker}>Start a platform project</span>
          <h2>Tell us what the system needs to do.</h2>
          <p>Book a 30-minute call with the team that will scope and lead your project.</p>
          <div className={styles.actions}><Link href="/contact/" className={styles.primary}>Book a discovery call <Arrow /></Link><Link href="/software-project-estimator/" className={styles.secondary}>Get a 2-minute estimate</Link></div>
        </div>
      </section>
    </main>
  );
}
