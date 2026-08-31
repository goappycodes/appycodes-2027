import Image from "next/image";
import Link from "next/link";
import { ClientLogo } from "@/components/client-logo";
import { CLUTCH_STATS } from "@/lib/site";
import { getWorkCards, type InstitutionalWorkItem } from "@/lib/work-cards";
import styles from "./home-hero-alternatives.module.css";

const PROJECTS = getWorkCards(["Creoate", "Ontick", "Easyship"]);

function Arrow() {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

function DeliveryEyebrow() {
  return (
    <p className={styles.eyebrow}>
      <span>12 years of relentless <span className={styles.deliveryStars} role="img" aria-label="5-star">★★★★★</span> delivery</span>
    </p>
  );
}

function ClutchReviewLink({ detailed = false }: { detailed?: boolean }) {
  return (
    <Link href="/testimonials/" className={styles.reviewLink}>
      <span className={styles.reviewBrand}>
        <Image className={styles.clutchMark} src="/images/award-clutch.png" width={26} height={26} alt="" />
        <strong>{CLUTCH_STATS.rating} on Clutch</strong>
      </span>
      <span className={styles.reviewCount}>{CLUTCH_STATS.count} {detailed ? "independently published client reviews" : "client reviews"}</span>
      <Arrow />
    </Link>
  );
}

function Actions() {
  return (
    <div className={styles.actions}>
      <Link href="/contact/" className={styles.primary}>Discuss your project <Arrow /></Link>
      <a href="#selected-work" className={styles.secondary}>Explore our work <Arrow /></a>
    </div>
  );
}

function ProjectImage({ project, sizes, preload = false }: { project: InstitutionalWorkItem; sizes: string; preload?: boolean }) {
  return (
    <div className={styles.projectImage}>
      <Image src={project.image} alt={`${project.client} — ${project.sector} product interface`} fill sizes={sizes} preload={preload} />
    </div>
  );
}

export function StatementHomeHero() {
  return (
    <section className={`${styles.hero} ${styles.statement}`} aria-labelledby="statement-title">
      <div className={styles.inner}>
        <div className={styles.topline}>
          <DeliveryEyebrow />
          <span>Made in India. Trusted worldwide.</span>
        </div>
        <h1 id="statement-title" className={styles.statementTitle}>
          <span>Software that</span>{" "}<span>moves you forward.</span>
        </h1>
        <div className={styles.statementIntro}>
          <p>We design and build custom web platforms, mobile apps and AI systems for growing businesses, with a focus on the UK and EU. Senior engineering from India, from your first idea to long-term support.</p>
          <Actions />
        </div>
        <div className={styles.workHeading}>
          <span>A few things we’ve put into the world</span>
          <ClutchReviewLink />
        </div>
        <div className={styles.lightWorkGrid} role="region" aria-label="Selected client projects" tabIndex={0}>
          {PROJECTS.map((project, index) => (
            <Link href={project.href} key={project.client} className={styles.lightWork} aria-label={`Explore the ${project.client} case study`}>
              <ProjectImage project={project} sizes="(max-width: 600px) 80vw, 33vw" preload={index === 0} />
              <div className={styles.lightCaption}>
                <span>
                  <span className={styles.projectNumber}>0{index + 1}</span>
                  <span className={styles.clientBrand}><ClientLogo href={project.href} name={project.client} /></span>
                  <span className={styles.sector}>{project.sector}</span>
                </span>
                <Arrow />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ShowcaseHomeHero() {
  const [commerce, mobile, logistics] = PROJECTS;
  return (
    <section className={`${styles.hero} ${styles.showcase}`} aria-labelledby="showcase-title">
      <div className={styles.inner}>
        <div className={styles.showcaseIntro}>
          <DeliveryEyebrow />
          <h1 id="showcase-title" className={styles.showcaseTitle}>Ambition. <span>Engineered.</span></h1>
          <p className={styles.showcaseDescription}>Web platforms. Mobile apps. AI systems.<br />For UK and EU businesses, built by senior engineers who stay with you beyond launch.</p>
          <Actions />
        </div>
        <div className={styles.stage} aria-label="Selected Appycodes projects">
          <Link href={mobile.href} className={styles.sideProject} aria-label={`Explore the ${mobile.client} case study`}>
            <div className={styles.stageCaption}><span>01 / Mobile &amp; platforms</span><Arrow /></div>
            <ProjectImage project={mobile} sizes="(max-width: 600px) 44vw, 25vw" />
            <div className={styles.stageFoot}><strong>{mobile.client}</strong><span>{mobile.metric} processed</span></div>
          </Link>
          <Link href={commerce.href} className={styles.mainProject} aria-label={`Explore the ${commerce.client} case study`}>
            <div className={styles.stageCaption}><span>02 / Commerce at scale</span><Arrow /></div>
            <ProjectImage project={commerce} sizes="(max-width: 600px) 90vw, 50vw" preload />
            <div className={styles.stageFoot}><strong>{commerce.client}</strong><span>{commerce.metric} / one team, still shipping</span></div>
          </Link>
          <Link href={logistics.href} className={styles.sideProject} aria-label={`Explore the ${logistics.client} case study`}>
            <div className={styles.stageCaption}><span>03 / Global logistics</span><Arrow /></div>
            <ProjectImage project={logistics} sizes="(max-width: 600px) 44vw, 25vw" />
            <div className={styles.stageFoot}><strong>{logistics.client}</strong><span>{logistics.metric} couriers</span></div>
          </Link>
        </div>
        <div className={styles.showcaseFooter}>
          <p><span /> Building in production since 2015</p>
          <ClutchReviewLink detailed />
        </div>
      </div>
    </section>
  );
}
