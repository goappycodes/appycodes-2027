import Link from "next/link";
import { AWARDS } from "@/lib/site";
import { TestimonialSlider } from "@/components/testimonial-slider";
import { InstitutionalMap } from "@/components/institutional-map";
import { InstitutionalWorkRail } from "@/components/institutional-work-rail";
import { ClientMarquee } from "@/components/client-marquee";
import styles from "./home-concepts.module.css";

export type HomeConcept = "institutional" | "editorial" | "technical";

const WORK = [
  {
    href: "/case-studies/creoate/",
    image: "/images/creoate-featured.png",
    client: "Creoate",
    logo: "/images/logo-creoate.png",
    brand: "Creoate",
    sector: "B2B commerce",
    title: "The engineering partnership behind a cross-border wholesale marketplace.",
    detail: "Next.js storefront, Python ingestion pipelines, DynamoDB data layer and AWS infrastructure.",
    metric: "8+ years",
    metricLabel: "one team, still shipping",
  },
  {
    href: "/case-studies/ontick/",
    image: "/images/ontick-6.png",
    client: "Ontick",
    brand: "Ontick",
    sector: "Event technology",
    title: "A commission-free ticketing platform built for ownership and scale.",
    detail: "Multi-organiser commerce, Stripe instalments and two native apps in one connected platform.",
    metric: "£2M+",
    metricLabel: "processed since launch",
  },
  {
    href: "/case-studies/easyship/",
    image: "/images/easyship-featured.png",
    client: "Easyship",
    logo: "/images/logo-easyship.png",
    brand: "Easyship",
    sector: "Global logistics",
    title: "Embedded product engineering for a global shipping platform.",
    detail: "Rate, tax and duty calculators, server-rendered courier pages and a custom MongoDB CMS.",
    metric: "550+",
    metricLabel: "couriers on the calculator",
  },
  {
    href: "/case-studies/decofetch/",
    image: "/images/decofetch-featured.png",
    client: "Decofetch",
    brand: "Decofetch",
    sector: "Luxury commerce",
    title: "A custom furniture marketplace engineered from storefront to infrastructure.",
    detail: "Server-rendered Next.js commerce over a Laravel API, bespoke operations tooling and re-architected AWS infrastructure.",
    metric: "0→live",
    metricLabel: "custom, front to back",
  },
  {
    href: "/case-studies/ba-engine-room/",
    image: "/images/engineroom-featured.png",
    client: "BA Engine Room",
    brand: "EngineRoom",
    sector: "AI operations",
    title: "An AI-native operating system that runs a consultancy lead to invoice.",
    detail: "Discovery briefs, e-signed contracts, Stripe deposits, delivery milestones and time tracking in one operational system.",
    metric: "0→1",
    metricLabel: "built from the ground up",
  },
  {
    href: "/case-studies/plusheat/",
    image: "/images/plusheat-featured.png",
    client: "PlusHeat",
    brand: "PlusHeat",
    sector: "Home services",
    title: "A conversion platform for a growing UK boiler-cover provider.",
    detail: "Custom plan configuration, postcode-qualified lead journeys, CRM synchronisation and campaign landing pages.",
    metric: "5 yrs",
    metricLabel: "web partner since 2021",
  },
];

const CAPABILITIES = [
  { n: "01", title: "Product engineering", body: "Customer-facing software and internal systems designed around the way your business actually operates." },
  { n: "02", title: "Web & commerce", body: "High-performance websites, marketplaces and conversion systems with complex integrations behind them." },
  { n: "03", title: "Native mobile", body: "Reliable iOS and Android products, from store approval through ongoing releases and operations." },
  { n: "04", title: "AI systems", body: "Production AI workflows, RAG pipelines and agentic features with cost, quality and governance designed in." },
  { n: "05", title: "Performance & search", body: "Core Web Vitals, JavaScript SEO and indexing work for teams whose growth is gated on being found." },
];

const METRICS = [
  { value: "2015", label: "Building production software since" },
  { value: "11 years", label: "of experience" },
  { value: "300+", label: "products delivered" },
  { value: "5.0", label: "Average across 18 Clutch reviews" },
];

const APPROACH = [
  { n: "01", title: "Scope & cost", body: "We agree the scope, budget and main technical risks before the project starts." },
  { n: "02", title: "Architecture", body: "We plan the data, integrations and infrastructure before we start building." },
  { n: "03", title: "Build & review", body: "You get access to the code and regular demonstrations throughout the build." },
  { n: "04", title: "Launch & support", body: "We launch the product, document it and either hand it over or continue supporting it." },
];

function Arrow() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M4 10h11M10.5 5.5 15 10l-4.5 4.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CapabilityIcon({ index }: { index: number }) {
  const paths = [
    <><rect x="5" y="5" width="18" height="18" rx="1" /><path d="M11 5v18M11 11h12" /></>,
    <><path d="M4 8h20v14H4zM4 12h20" /><path d="M8 5v6M12 5v6" /></>,
    <><rect x="8" y="3" width="12" height="22" rx="2" /><path d="M12 7h4M13 21h2" /></>,
    <><circle cx="14" cy="14" r="9" /><circle cx="14" cy="14" r="3" /><path d="M14 2v3M14 23v3M2 14h3M23 14h3" /></>,
    <><circle cx="12" cy="12" r="7" /><path d="m17 17 6 6M4 23h4l3-5 3 3 4-7 3 3" /></>,
  ];
  return <span className={styles.capabilityIcon}><svg viewBox="0 0 28 28" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round">{paths[index]}</svg></span>;
}

function ClientStrip() {
  return <ClientMarquee />;
}

function Metrics() {
  return (
    <section className={styles.metrics} aria-label="Delivery record">
      <div className={`${styles.inner} ${styles.metricGrid}`}>
        {METRICS.map((metric) => (
          <div className={styles.metric} key={metric.value}>
            <strong>{metric.value}</strong>
            <span>{metric.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function SystemVisual() {
  return (
    <section className={styles.systemVisual} aria-label="Appycodes connected systems illustration">
      <div className={styles.inner}>
        <figure>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/appycodes-systems-landscape.png" alt="An abstract connected system of precise glass and metal modules" loading="eager" />
          <figcaption>
            <span>Our visual system / connected delivery</span>
            <strong>One accountable path from business problem to production system.</strong>
          </figcaption>
          <div className={styles.visualLegend} aria-hidden="true">
            <span><i /> Discover</span><b />
            <span><i /> Design</span><b />
            <span><i /> Engineer</span><b />
            <span><i /> Operate</span>
          </div>
        </figure>
      </div>
    </section>
  );
}

function WorkSection() {
  return (
    <section className={`${styles.section} ${styles.workSection}`} id="selected-work">
      <div className={styles.inner}>
        <div className={styles.sectionHead}>
          <div>
            <span className={styles.kicker}>Selected client work</span>
            <h2>Software we have built for our clients.</h2>
          </div>
          <p>From marketplaces and mobile apps to internal platforms and AI products.</p>
        </div>
        <InstitutionalWorkRail items={WORK} />
        <Link href="/case-studies/" className={styles.textLink}>Explore all case studies <Arrow /></Link>
      </div>
    </section>
  );
}

function Capabilities() {
  return (
    <section className={`${styles.section} ${styles.capabilities}`}>
      <div className={styles.inner}>
        <div className={styles.sectionHead}>
          <div>
            <span className={styles.kicker}>Five areas of practical experience</span>
            <h2>What we do.</h2>
          </div>
          <p>We design, build and support the software that growing businesses rely on.</p>
        </div>
        <div className={styles.capabilityGrid}>
          {CAPABILITIES.map((item) => (
            <Link href="/services/" className={styles.capability} key={item.n}>
              <span>{item.n}</span>
              <CapabilityIcon index={Number(item.n) - 1} />
              <h3>{item.title}</h3>
              <p>{item.body}</p>
              <Arrow />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function Approach() {
  return (
    <section className={`${styles.section} ${styles.approach}`}>
      <div className={styles.inner}>
        <div className={styles.approachIntro}>
          <span className={styles.kicker}>A clear delivery process</span>
          <h2>How we take a project from idea to launch.</h2>
          <p>We make the scope, architecture, progress and decisions visible from the first call through production.</p>
          <Link href="/about/" className={styles.textLink}>How we work <Arrow /></Link>
        </div>
        <ol className={styles.approachList}>
          {APPROACH.map((item) => (
            <li key={item.n}>
              <span>{item.n}</span>
              <div><h3>{item.title}</h3><p>{item.body}</p></div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Testimonial() {
  return (
    <section className={styles.testimonial}>
      <div className={styles.inner}><TestimonialSlider /></div>
    </section>
  );
}

function Recognition() {
  return (
    <section className={styles.recognition}>
      <div className={styles.inner}>
        <p>Credentials &amp; recognition</p>
        <div>
          {AWARDS.slice(0, 7).map((award) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={award.by} src={award.img} alt={award.by} loading="lazy" />
          ))}
        </div>
      </div>
    </section>
  );
}

function Closing() {
  return (
    <section className={styles.closing}>
      <div className={styles.inner}>
        <span className={styles.kicker}>Start a project</span>
        <h2>Tell us what you are trying to build.</h2>
        <p>Book a 30-minute call with the team that will scope and lead your project.</p>
        <div className={styles.actions}>
          <Link href="/contact/" className={styles.primaryButton}>Discuss your project <Arrow /></Link>
          <Link href="/software-project-estimator/" className={styles.secondaryButton}>Get a 2-minute estimate</Link>
        </div>
      </div>
    </section>
  );
}

function InstitutionalHero() {
  return (
    <section className={`${styles.hero} ${styles.institutionalHero}`}>
      <div className={`${styles.inner} ${styles.heroGrid}`}>
        <div className={styles.heroCopy}>
          <h1>Custom software for growing businesses.</h1>
          <figure className={styles.heroInlineVisual}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/appycodes-hero-delivery-system.png" alt="Connected software modules forming a production system" fetchPriority="high" />
          </figure>
          <p>We build web platforms, mobile apps and AI systems for businesses across the UK, Europe and worldwide.</p>
          <div className={styles.actions}>
            <Link href="/contact/" className={styles.primaryButton}>Discuss your project <Arrow /></Link>
            <a href="#selected-work" className={styles.secondaryButton}>Review our work</a>
          </div>
        </div>
        <aside className={styles.assuranceCard}>
          <div className={styles.assuranceHead}><span>Delivery assurance</span><span>AC / 2026</span></div>
          <div className={styles.assuranceVisual}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/appycodes-hero-delivery-system.png" alt="A sequence of connected system modules progressing toward a production node" />
            <strong>Built for production.<br />Designed for ownership.</strong>
          </div>
          <ul>
            <li><span>01</span> Senior team on every engagement</li>
            <li><span>02</span> Architecture and risk agreed upfront</li>
            <li><span>03</span> Source access and visible delivery</li>
            <li><span>04</span> Launch, documentation and support</li>
          </ul>
          <div className={styles.assuranceFoot}><span className={styles.pulse} /> Senior-led / transparent / accountable</div>
        </aside>
      </div>
    </section>
  );
}

function EditorialHero() {
  return (
    <section className={styles.hero}>
      <div className={styles.inner}>
        <div className={styles.editorialTop}><span>Appycodes / Product engineering practice</span><span>Established 2015</span></div>
        <h1>Good software is a business advantage. <em>Great delivery protects it.</em></h1>
        <div className={styles.editorialBottom}>
          <p>We partner with ambitious companies to turn complex product ideas into dependable platforms, mobile apps and AI systems—without losing commercial clarity along the way.</p>
          <div className={styles.actions}>
            <Link href="/contact/" className={styles.primaryButton}>Start a conversation <Arrow /></Link>
            <a href="#selected-work" className={styles.secondaryButton}>See the evidence</a>
          </div>
        </div>
      </div>
    </section>
  );
}

function TechnicalHero() {
  return (
    <section className={styles.hero}>
      <div className={`${styles.inner} ${styles.heroGrid}`}>
        <div className={styles.heroCopy}>
          <span className={styles.status}><i /> Senior delivery team / available</span>
          <h1>From complex brief to reliable production software.</h1>
          <p>We build the platforms, applications and AI systems behind growing businesses—combining senior engineering with direct commercial accountability.</p>
          <div className={styles.actions}>
            <Link href="/contact/" className={styles.primaryButton}>Plan your build <Arrow /></Link>
            <a href="#selected-work" className={styles.secondaryButton}>Inspect our work</a>
          </div>
          <div className={styles.techTags}><span>Web platforms</span><span>Native mobile</span><span>AI systems</span><span>Cloud infrastructure</span></div>
        </div>
        <aside className={styles.deliveryPanel}>
          <div className={styles.panelTop}><span>DELIVERY_RECORD</span><span>LIVE</span></div>
          <dl>
            <div><dt>Production since</dt><dd>2015</dd></div>
            <div><dt>Longest engagement</dt><dd>8+ years</dd></div>
            <div><dt>Verified reviews</dt><dd>18 × 5.0</dd></div>
            <div><dt>Operating regions</dt><dd>UK / EU / IN</dd></div>
          </dl>
          <div className={styles.panelFoot}><span>Strategy</span><i /><span>Build</span><i /><span>Operate</span></div>
        </aside>
      </div>
    </section>
  );
}

export function HomeConceptPage({ concept }: { concept: HomeConcept }) {
  const hero = concept === "institutional" ? <InstitutionalHero /> : concept === "editorial" ? <EditorialHero /> : <TechnicalHero />;
  return (
    <div className={`${styles.page} ${styles[concept]}`}>
      {hero}
      <ClientStrip />
      <Metrics />
      <SystemVisual />
      <WorkSection />
      {concept === "institutional" ? <InstitutionalMap /> : null}
      <Capabilities />
      <Approach />
      <Testimonial />
      <Recognition />
      <Closing />
    </div>
  );
}
