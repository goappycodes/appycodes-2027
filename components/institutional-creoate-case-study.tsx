import Link from "next/link";
import { ClientLogo } from "@/components/client-logo";
import { InstitutionalWorkRail } from "@/components/institutional-work-rail";
import { getWorkCards } from "@/lib/work-cards";
import { TestimonialSlider } from "@/components/testimonial-slider";
import styles from "./institutional-creoate-case-study.module.css";

const SYSTEMS = [
  { title: "Next.js storefront", body: "Server-rendered catalogue, collection, account and checkout experiences across more than 200,000 products." },
  { title: "Python ingestion", body: "Services that normalise, de-duplicate and enrich supplier feeds across currencies, countries and channels." },
  { title: "DynamoDB data layer", body: "Fast catalogue, account and ordering paths designed for a marketplace operating at significant scale." },
  { title: "AWS media pipeline", body: "Lambda, S3 and CloudFront optimisation for hundreds of thousands of product images." },
  { title: "B2B payments", body: "Multi-currency checkout, Stripe, Hokodo net terms and reconciliation for wholesale orders." },
  { title: "Operations & insight", body: "CI, scheduled jobs, secure access and live product and infrastructure monitoring." },
];

const STACK = [
  ["Storefront", "Next.js · App Router · SSR / ISR"],
  ["Data", "DynamoDB · MySQL"],
  ["Services", "Python · PHP · Node"],
  ["Media", "AWS Lambda · S3 · CloudFront"],
  ["Payments", "Stripe · Hokodo · multi-currency"],
  ["Infrastructure", "AWS · GitLab CI · Cloudflare · Teleport"],
  ["Observability", "Atatus · Grafana · PostHog"],
];

const RELATED = getWorkCards(["Ontick", "Easyship", "Decofetch"]);

function Arrow() {
  return <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h11M10.5 5.5 15 10l-4.5 4.5" /></svg>;
}

function SystemIcon({ index }: { index: number }) {
  const paths = [
    <><path d="M4 7h20v16H4zM4 12h20" /><path d="M8 9h.1M11 9h.1" /></>,
    <><path d="M6 7h7v6H6zM15 15h7v6h-7zM13 10h4v6" /></>,
    <><ellipse cx="14" cy="7" rx="9" ry="3" /><path d="M5 7v7c0 1.7 4 3 9 3s9-1.3 9-3V7M5 14v7c0 1.7 4 3 9 3s9-1.3 9-3v-7" /></>,
    <><path d="M7 20a5 5 0 0 1 1-9.9A7 7 0 0 1 21.5 12 4 4 0 0 1 21 20Z" /><path d="m11 16 3-3 3 3M14 13v10" /></>,
    <><rect x="5" y="6" width="18" height="16" rx="2" /><path d="M5 11h18M9 17h5" /></>,
    <><path d="M4 22V11l5-5 5 5 5-7 5 7v11" /><path d="M8 22v-5h4v5M18 14h2" /></>,
  ];
  return <span className={styles.systemIcon}><svg viewBox="0 0 28 28" aria-hidden="true">{paths[index]}</svg></span>;
}

export function InstitutionalCreoateCaseStudy() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.crumbBar}>
          <nav className={`${styles.inner} ${styles.crumbs}`} aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/case-studies/">Case studies</Link><span>/</span><span>Creoate</span></nav>
        </div>
        <div className={`${styles.inner} ${styles.heroGrid}`}>
          <div className={styles.heroCopy}>
            <ClientLogo href="/case-studies/creoate/" name="Creoate" hero />
            <span className={styles.kicker}>B2B wholesale marketplace / UK, Europe &amp; US</span>
            <h1>Eight years engineering Creoate’s wholesale marketplace.</h1>
            <p>We run the Next.js storefront, Python ingestion pipelines, DynamoDB data layer and AWS infrastructure behind a marketplace of 5,000+ brands and 200,000+ products.</p>
            <div className={styles.actions}><a href="https://www.creoate.com/" target="_blank" rel="noreferrer" className={styles.primary}>Visit Creoate <Arrow /></a><a href="#platform" className={styles.secondary}>Explore the platform</a></div>
          </div>
          <aside className={styles.heroPanel}>
            <div className={styles.panelHead}><span>Engagement record</span><span>2018—present</span></div>
            <figure>{/* eslint-disable-next-line @next/next/no-img-element */}<img src="/images/creoate-featured.png" alt="Creoate wholesale marketplace shown across desktop and mobile" /></figure>
            <dl>
              <div><dt>Relationship</dt><dd>8+ years, ongoing</dd></div>
              <div><dt>Product estate</dt><dd>Storefront, commerce, data and infrastructure</dd></div>
              <div><dt>Operating reach</dt><dd>UK, Europe and United States</dd></div>
            </dl>
            <div className={styles.panelFoot}><i /> One team / continuous delivery</div>
          </aside>
        </div>
      </section>

      <section className={styles.metrics} aria-label="Creoate engagement results"><div className={`${styles.inner} ${styles.metricGrid}`}><div><strong>8+ yrs</strong><span>One team, still shipping</span></div><div><strong>200K+</strong><span>Products in the live catalogue</span></div><div><strong>5,000+</strong><span>Independent brands onboarded</span></div><div><strong>10</strong><span>Countries on one platform</span></div></div></section>

      <section className={styles.gallery} id="platform">
        <div className={styles.inner}>
          <header className={styles.sectionHead}><div><span className={styles.kicker}>The buyer experience</span><h2>A storefront built for wholesale discovery.</h2></div></header>
          <div className={styles.galleryGrid}>
            <figure className={styles.galleryLead}>{/* eslint-disable-next-line @next/next/no-img-element */}<img src="/images/creoate-marketplace.jpg" alt="Creoate wholesale product grid" /></figure>
            <figure>{/* eslint-disable-next-line @next/next/no-img-element */}<img src="/images/creoate-catalog.jpg" alt="Creoate catalogue navigation" /></figure>
            <figure>{/* eslint-disable-next-line @next/next/no-img-element */}<img src="/images/creoate-collection.jpg" alt="Creoate curated collection" /></figure>
          </div>
        </div>
      </section>

      <section className={styles.migration}>
        <div className={`${styles.inner} ${styles.migrationGrid}`}>
          <div><span className={styles.kicker}>Platform evolution</span><h2>From WooCommerce to Next.js.</h2></div>
          <div><p>We migrated catalogue, accounts and checkout route by route, keeping the marketplace trading throughout the transition.</p></div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.inner}>
          <header className={styles.sectionHead}><div><span className={styles.kicker}>Systems we operate</span><h2>The engineering behind the marketplace.</h2></div></header>
          <div className={styles.systemGrid}>{SYSTEMS.map((item, index) => <article key={item.title}><SystemIcon index={index} /><span>{String(index + 1).padStart(2, "0")}</span><h3>{item.title}</h3><p>{item.body}</p></article>)}</div>
        </div>
      </section>

      <section className={styles.mobileShowcase}>
        <div className={`${styles.inner} ${styles.mobileGrid}`}>
          <div><span className={styles.kicker}>Mobile-first commerce</span><h2>Wholesale buying wherever retailers work.</h2><p>The catalogue, collections and account journeys are designed for the devices buyers use throughout their working day.</p></div>
          <div className={styles.phoneShots}><figure>{/* eslint-disable-next-line @next/next/no-img-element */}<img src="/images/creoate-mobile-collection.jpg" alt="Creoate collection on mobile" /></figure><figure>{/* eslint-disable-next-line @next/next/no-img-element */}<img src="/images/creoate-mobile-home.jpg" alt="Creoate mobile homepage" /></figure><figure>{/* eslint-disable-next-line @next/next/no-img-element */}<img src="/images/creoate-login.jpg" alt="Creoate account sign in" /></figure></div>
        </div>
      </section>

      <section className={styles.architecture}>
        <div className={`${styles.inner} ${styles.architectureGrid}`}>
          <div><span className={styles.kicker}>Architecture</span><h2>A production stack built for continuous delivery.</h2></div>
          <dl>{STACK.map(([layer, value]) => <div key={layer}><dt>{layer}</dt><dd>{value}</dd></div>)}</dl>
        </div>
      </section>

      <section className={styles.testimonial}><div className={styles.inner}><TestimonialSlider /></div></section>

      <section className={styles.related}>
        <div className={styles.inner}><header className={styles.sectionHead}><div><span className={styles.kicker}>More product engineering</span><h2>Other systems in production.</h2></div><p>Connected platforms supporting commerce, operations and customer journeys.</p></header><InstitutionalWorkRail items={RELATED} label="Related case studies" /><Link href="/case-studies/" className={styles.textLink}>Explore all case studies <Arrow /></Link></div>
      </section>

      <section className={styles.closing}><div className={styles.inner}><span className={styles.kicker}>Start a project</span><h2>Build the platform your growth depends on.</h2><p>Book a 30-minute call with the team that will scope and lead your project.</p><div className={styles.actions}><Link href="/contact/" className={styles.primary}>Discuss your project <Arrow /></Link><Link href="/software-project-estimator/" className={styles.secondary}>Get a 2-minute estimate</Link></div></div></section>
    </main>
  );
}
