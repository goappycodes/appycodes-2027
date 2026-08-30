import Link from "next/link";
import { ClientLogo } from "@/components/client-logo";
import { TechnologyList } from "@/components/technology-list";
import type { ReactNode } from "react";
import { CASE_STUDIES } from "@/components/sections";
import { JsonLd } from "@/components/jsonld";
import { InstitutionalWorkRail } from "@/components/institutional-work-rail";
import { WORK_CARDS } from "@/lib/work-cards";
import { TestimonialSlider } from "@/components/testimonial-slider";
import { breadcrumbSchema } from "@/lib/schema";
import styles from "./institutional-creoate-case-study.module.css";

export type CaseBlock =
  | { t: "section"; title: string; lead?: string }
  | { t: "cards"; title: string; lead?: string; cols3?: boolean; items: { title: string; body: string }[] }
  | { t: "figure"; src: string; alt: string; caption?: string; phone?: boolean }
  | { t: "gallery"; title: string; shots: { src: string; alt: string }[] };

export type CaseStudyData = {
  crumb: string;
  path?: string;
  title: ReactNode;
  lede: string;
  facts: { label: string; value: string }[];
  links?: { label: string; href: string }[];
  stats: { n: string; label: string }[];
  blocks: CaseBlock[];
  stack: { layer: string; value: string }[];
  tech?: string[];
  outcomes: string[];
  cta: string;
};

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
  return <span className={styles.systemIcon}><svg viewBox="0 0 28 28" aria-hidden="true">{paths[index % paths.length]}</svg></span>;
}

function CaseBlockView({ block }: { block: CaseBlock }) {
  if (block.t === "cards") {
    return <section className={styles.section}><div className={styles.inner}>
      <header className={styles.sectionHead}><div><span className={styles.kicker}>The system</span><h2>{block.title}</h2></div></header>
      <div className={styles.systemGrid}>{block.items.map((item, index) => <article key={item.title}><SystemIcon index={index} /><span>{String(index + 1).padStart(2, "0")}</span><h3>{item.title}</h3><p>{item.body}</p></article>)}</div>
    </div></section>;
  }

  if (block.t === "gallery") {
    return <section className={styles.gallery}><div className={styles.inner}>
      <header className={styles.sectionHead}><div><span className={styles.kicker}>Product experience</span><h2>{block.title}</h2></div></header>
      <div className={styles.galleryGrid}>{block.shots.map((shot, index) => <figure className={index === 0 ? styles.galleryLead : undefined} key={shot.src}><img src={shot.src} alt={shot.alt} loading="lazy" /></figure>)}</div>
    </div></section>;
  }

  if (block.t === "figure") {
    return <section className={styles.gallery}><div className={styles.inner}>
      <header className={styles.sectionHead}><div><span className={styles.kicker}>In production</span><h2>The live product.</h2></div></header>
      <figure className={`${styles.singleFigure} ${block.phone ? styles.singleFigurePhone : ""}`}><img src={block.src} alt={block.alt} loading="lazy" />{block.caption ? <figcaption>{block.caption}</figcaption> : null}</figure>
    </div></section>;
  }

  return <section className={styles.overview}><div className={`${styles.inner} ${styles.overviewGrid}`}>
    <div><span className={styles.kicker}>The brief</span><h2>{block.title}</h2></div>
    <div>{block.lead ? <p>{block.lead}</p> : null}</div>
  </div></section>;
}

export function CaseStudy({ data }: { data: CaseStudyData }) {
  const entry = CASE_STUDIES.find((item) => item.href === data.path) ?? CASE_STUDIES.find((item) => data.crumb.toLowerCase().includes(item.name.toLowerCase()));
  const firstFigure = data.blocks.find((block): block is Extract<CaseBlock, { t: "figure" }> => block.t === "figure");
  const firstGallery = data.blocks.find((block): block is Extract<CaseBlock, { t: "gallery" }> => block.t === "gallery");
  const heroImage = entry?.img ?? firstFigure?.src ?? firstGallery?.shots[0]?.src;
  const related = WORK_CARDS.filter((item) => item.href !== entry?.href && item.href !== data.path).slice(0, 6);
  const primaryLink = data.links?.[0];
  // A concise feature summary plus product imagery replaces repeated narrative sections.
  const systemSummary = data.blocks.find((block) => block.t === "cards");
  const storyBlocks = data.blocks.filter((block) => block.t === "figure" || block.t === "gallery" || block === systemSummary);
  const descriptor = entry?.meta.split("·")[1]?.trim() ?? data.facts.find((fact) => fact.label.toLowerCase() === "sector")?.value ?? "Product engineering";

  return <main className={styles.page}>
    {data.path ? <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Case studies", path: "/case-studies/" }, { name: data.crumb, path: data.path }])} /> : null}

    <section className={styles.hero}>
      <div className={styles.crumbBar}><nav className={`${styles.inner} ${styles.crumbs}`} aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/case-studies/">Case studies</Link><span>/</span><span>{data.crumb}</span></nav></div>
      <div className={`${styles.inner} ${styles.heroGrid}`}>
        <div className={styles.heroCopy}>
          <ClientLogo href={data.path ?? entry?.href ?? ""} name={data.crumb} hero />
          <span className={styles.kicker}>{descriptor} / production case study</span>
          <h1>{data.title}</h1>
          <p>{entry?.body ?? data.lede}</p>
          <div className={styles.actions}>{primaryLink ? <a href={primaryLink.href} target="_blank" rel="noreferrer" className={styles.primary}>Visit {data.crumb} <Arrow /></a> : <Link href="/contact/" className={styles.primary}>Discuss your project <Arrow /></Link>}<a href="#story" className={styles.secondary}>Explore the work</a></div>
        </div>
        <aside className={styles.heroPanel}>
          <div className={styles.panelHead}><span>Engagement record</span><span>AC / 2026</span></div>
          {heroImage ? <figure><img src={heroImage} alt={`${data.crumb} product interface`} /></figure> : null}
          <dl>{data.facts.slice(0, 3).map((fact) => <div key={fact.label}><dt>{fact.label}</dt><dd>{fact.value}</dd></div>)}</dl>
          <div className={styles.panelFoot}><i /> One team / continuous delivery</div>
        </aside>
      </div>
    </section>

    <section className={styles.metrics} aria-label={`${data.crumb} engagement results`}><div className={`${styles.inner} ${styles.metricGrid}`}>{data.stats.slice(0, 4).map((stat) => <div key={stat.label}><strong>{stat.n}</strong><span>{stat.label}</span></div>)}</div></section>

    <div id="story">{storyBlocks.map((block, index) => <CaseBlockView block={block} key={`${block.t}-${index}`} />)}</div>

    <section className={styles.architecture}><div className={`${styles.inner} ${styles.architectureGrid}`}><div><span className={styles.kicker}>Architecture</span><h2>A production stack built for the work.</h2>{data.tech?.length ? <div className={styles.techTags}><TechnologyList items={data.tech} /></div> : null}</div><dl>{data.stack.map((row) => <div key={row.layer}><dt>{row.layer}</dt><dd>{row.value}</dd></div>)}</dl></div></section>

    <section className={styles.testimonial}><div className={styles.inner}><TestimonialSlider /></div></section>

    <section className={styles.related}><div className={styles.inner}><header className={styles.sectionHead}><div><span className={styles.kicker}>More client work</span><h2>Other systems in production.</h2></div><p>Long-term engineering partnerships across software, commerce, mobile and AI.</p></header><InstitutionalWorkRail items={related} label="Related case studies" /><Link href="/case-studies/" className={styles.textLink}>Explore all case studies <Arrow /></Link></div></section>

    <section className={styles.closing}><div className={styles.inner}><span className={styles.kicker}>Start a project</span><h2>{data.cta}</h2><p>Book a 30-minute call with the team that will scope and lead your project.</p><div className={styles.actions}><Link href="/contact/" className={styles.primary}>Discuss your project <Arrow /></Link><Link href="/software-project-estimator/" className={styles.secondary}>Get a 2-minute estimate</Link></div></div></section>
  </main>;
}
