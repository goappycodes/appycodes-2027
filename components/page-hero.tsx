import Link from "next/link";
import type { ReactNode } from "react";

/* eslint-disable @next/next/no-img-element */

export type Crumb = { label: string; href?: string };
export type HeroStat = { n: string; label: string };
export type HeroAction = { label: string; href: string; variant?: "grad" | "out" };

/**
 * The inner-page hero. Every page below the homepage uses this so they share
 * one masthead: dark slab, breadcrumb, display heading, lede, actions, and two
 * optional slots — a media panel on the right and a stat rail along the bottom.
 */
export function PageHero({
  crumbs,
  eyebrow,
  title,
  lede,
  actions,
  stats,
  media,
  aside,
}: {
  crumbs?: Crumb[];
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  actions?: HeroAction[];
  stats?: HeroStat[];
  media?: { src: string; alt: string; caption?: string };
  aside?: ReactNode;
}) {
  const hasSide = Boolean(media || aside);
  return (
    <section className="phero">
      <div className="phero__glow" aria-hidden="true" />
      <div className={`wrap phero__in${hasSide ? " phero__in--split" : ""}`}>
        <div className="phero__copy">
          {crumbs && crumbs.length > 0 ? (
            <nav className="crumbs" aria-label="Breadcrumb">
              {crumbs.map((c, i) => (
                <span key={`${c.label}-${i}`}>
                  {c.href ? <Link href={c.href}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}
                  {i < crumbs.length - 1 ? <i aria-hidden="true">/</i> : null}
                </span>
              ))}
            </nav>
          ) : null}

          {eyebrow ? <p className="phero__eyebrow">{eyebrow}</p> : null}
          <h1 className="phero__t">{title}</h1>
          {lede ? <p className="phero__lede">{lede}</p> : null}

          {actions && actions.length > 0 ? (
            <div className="phero__btns">
              {actions.map((a) => (
                <Link
                  key={a.href + a.label}
                  className={`btn notch ${a.variant === "out" ? "btn--out" : "btn--grad"}`}
                  href={a.href}
                >
                  {a.label}
                </Link>
              ))}
            </div>
          ) : null}
        </div>

        {hasSide ? (
          <div className="phero__side">
            {media ? (
              <figure className="phero__media notch notch-lg">
                <img src={media.src} alt={media.alt} loading="eager" />
                {media.caption ? <figcaption>{media.caption}</figcaption> : null}
              </figure>
            ) : null}
            {aside}
          </div>
        ) : null}
      </div>

      {stats && stats.length > 0 ? (
        <div className="wrap">
          <dl className="phero__stats">
            {stats.map((s) => (
              <div key={s.label} className="phero__stat">
                <dd className="tnum g-dark">{s.n}</dd>
                <dt>{s.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      ) : null}
    </section>
  );
}
