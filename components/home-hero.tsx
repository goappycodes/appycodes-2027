import Image from "next/image";
import Link from "next/link";
import { getWorkCards } from "@/lib/work-cards";
import styles from "./home-hero.module.css";

const PROJECTS = getWorkCards(["Creoate", "Ontick"]);

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d={diagonal ? "M6 18 18 6M6 6h12v12" : "M4 12h15m-6-6 6 6-6 6"}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function HomeHero() {
  return (
    <section className={styles.hero} aria-labelledby="home-hero-title">
      <div className={styles.inner}>
        <div className={styles.main}>
          <div className={styles.copy}>
            <p className={styles.eyebrow}><span /> Your product engineering partner</p>
            <h1 id="home-hero-title" className={styles.title}>
              <span>Software for</span>{" "}
              <span>your next</span>{" "}
              <span className={styles.accent}>big leap.</span>
            </h1>
            <p className={styles.description}>
              Custom web platforms, mobile apps and AI systems.
              Built by a senior team, from your first idea to your next stage of growth.
            </p>
            <div className={styles.actions}>
              <Link href="/contact/" className={styles.primary}>
                Let’s build what’s next <Arrow />
              </Link>
              <a href="#selected-work" className={styles.secondary}>
                Explore our work <Arrow diagonal />
              </a>
            </div>
            <Link href="/testimonials/" className={styles.reviews}>
              <span className={styles.stars} aria-hidden="true">★★★★★</span>
              <span><strong>5.0 on Clutch</strong><span className={styles.reviewDivider}>/</span>18 client reviews</span>
            </Link>
          </div>

          <div className={styles.showcase} aria-label="A selection of products we have built">
            <div className={styles.showcaseGrid} aria-hidden="true" />
            <p className={styles.showcaseLabel}><span /> Real products. Out in the world.</p>
            {PROJECTS.map((project, index) => (
              <Link
                key={project.client}
                href={project.href}
                className={`${styles.project} ${index === 0 ? styles.commerce : styles.mobile}`}
                aria-label={`Explore ${project.client}: ${project.sector} case study`}
              >
                <div className={styles.projectHead}>
                  <strong>{project.client}</strong>
                  <span>{index === 0 ? "Web platform" : "Platform + mobile"}<Arrow diagonal /></span>
                </div>
                <div className={styles.projectImage}>
                  <Image
                    src={project.image}
                    alt={`${project.client} ${index === 0 ? "wholesale marketplace on desktop and mobile" : "event discovery and ticket booking platform"}`}
                    fill
                    sizes={index === 0 ? "(max-width: 600px) 80vw, (max-width: 1000px) 65vw, 560px" : "(max-width: 600px) 60vw, (max-width: 1000px) 48vw, 380px"}
                    preload={index === 0}
                  />
                </div>
                <div className={styles.projectFoot}>
                  <span>{project.sector}</span>
                  <span>{project.metric} {index === 0 ? "together" : "processed"}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className={styles.footer}>
          <p><span className={styles.footerDot} /> Independent team. Building since 2015.</p>
          <p>Made in India.<span className={styles.footerAccent}> Built for the world.</span></p>
        </div>
      </div>
    </section>
  );
}
