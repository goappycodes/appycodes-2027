import type { CSSProperties } from "react";
import { CLIENT_LOGOS } from "@/lib/site";
import styles from "./home-concepts.module.css";

/* eslint-disable @next/next/no-img-element */

/**
 * The single client-logo marquee used everywhere on the site — the homepage
 * client strip and the `LogoWall` slot on every inner page render this, so the
 * carousel looks and moves identically wherever it appears.
 *
 * It reuses the homepage module styles; the three `--concept-*` tokens the
 * strip reads are scoped to the homepage `.page` wrapper, so we set them on the
 * section itself and the component works on any background.
 */
export function ClientMarquee({
  label = "Trusted to build and evolve critical digital products",
  sublabel = "UK · Europe · Worldwide",
}: {
  label?: string;
  sublabel?: string | null;
}) {
  const logos = [...CLIENT_LOGOS, ...CLIENT_LOGOS];
  return (
    <section
      className={styles.clientStrip}
      aria-label="Selected clients"
      style={
        {
          "--concept-card": "#ffffff",
          "--concept-line": "#dce1e5",
          "--concept-muted": "#536170",
        } as CSSProperties
      }
    >
      <div className={styles.clientStripHead}>
        <p>{label}</p>
        {sublabel ? <span>{sublabel}</span> : null}
      </div>
      <div className={styles.clientMarquee}>
        <div className={styles.clientLogos}>
          {logos.map((client, index) => (
            <span
              className={styles.clientLogo}
              key={`${client.name}-${index}`}
              aria-hidden={index >= CLIENT_LOGOS.length || undefined}
            >
              <img
                src={client.src}
                alt={index < CLIENT_LOGOS.length ? client.name : ""}
                loading="lazy"
              />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
