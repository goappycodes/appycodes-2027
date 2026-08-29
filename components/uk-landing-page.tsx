import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { FeaturedWork, Testimonials, Faq } from "@/components/sections";
import { Check } from "@/components/icons";
import {
  LANDING_STATS,
  INDIA_TRUST,
  GUARANTEES,
  PROCESS,
  COMPARISON_COLUMNS,
  COMPARISON_ROWS,
  type UkLandingConfig,
} from "@/lib/uk-landing";
import styles from "@/components/uk-landing-page.module.css";

/**
 * The UK PPC landing page (web + mobile variants). Paid traffic only, so the
 * page is shipped noindex from the route files. Content comes entirely from the
 * passed config plus the shared arrays in lib/uk-landing.ts.
 */
export function UkLandingPage({ config }: { config: UkLandingConfig }) {
  const pageLabel = config.variant === "web" ? "web development" : "mobile development";

  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: pageLabel }]}
        eyebrow={config.adKeyword}
        title={config.h1}
        titleSize="md"
        lede={config.heroSub}
        actions={[
          { label: "Get a free quote", href: "/contact/" },
          { label: "See the work", href: "/case-studies/", variant: "out" },
        ]}
        stats={LANDING_STATS.map((s) => ({ n: s.value, label: s.label }))}
        media={{ src: config.ogImage, alt: config.h1 }}
      />

      {/* INTRO — the short version, with the ad's promises as a checklist */}
      <section className="std">
        <div className="wrap std__in">
          <div>
            <p className="eyebrow">the short version</p>
            <h2 className="h-l" style={{ marginTop: "1.5rem" }}>
              twelve years shipping for <span className="caps">UK</span> teams.
            </h2>
            <p className="lede" style={{ marginTop: "1.3rem" }}>
              We&apos;ve built for UK companies and agencies since 2015 — SaaS, storefronts,
              booking engines and apps that shipped and stayed in production. The same senior
              engineers scope your project and write the code.
            </p>
          </div>
          <div className="checklist checklist--alt notch">
            <p className="checklist__lbl">what you get, on every engagement</p>
            <ul>
              {config.heroBullets.map((b) => (
                <li key={b}>
                  <Check className="checklist__ico" aria-hidden />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* WHAT WE BUILD */}
      <section className="wrap sec">
        <div className="sec__head">
          <p className="eyebrow">scope</p>
          <h2 className="h-l">{config.buildHeading}.</h2>
        </div>
        <div className="svc">
          {config.build.map((b, i) => (
            <div key={b.title} className="svc__i notch">
              <span className="svc__n">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="h-m">{b.title}</h3>
              <p className="body">{b.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TRUSTING AN OFFSHORE TEAM — concern → answer */}
      <section className="wrap sec">
        <div className="sec__head">
          <p className="eyebrow">the honest bit</p>
          <h2 className="h-l">trusting an offshore team.</h2>
          <p className="lede">
            The questions every UK buyer asks before sending work abroad — answered plainly, the
            way we answer them on the first call.
          </p>
        </div>
        <div className={styles.grid}>
          {INDIA_TRUST.map((t) => (
            <div key={t.concern} className={`${styles.trust} notch`}>
              <p className={styles.concern}>{t.concern}</p>
              <p className={styles.answer}>{t.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* COMMERCIAL GUARANTEES */}
      <section className="wrap sec">
        <div className="sec__head">
          <p className="eyebrow">commercial terms</p>
          <h2 className="h-l">in writing, before you commit.</h2>
        </div>
        <div className={styles.grid}>
          {GUARANTEES.map((g) => (
            <div key={g.title} className={`${styles.guard} notch`}>
              <div className={styles.guardHead}>
                <Check className={styles.guardIco} aria-hidden />
                <h3 className={styles.guardTitle}>{g.title}</h3>
              </div>
              <p className={styles.guardBody}>{g.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW WE WORK — dark slab */}
      <section className="slab dotted">
        <div className="wrap slab__in">
          <div className="sec__head">
            <p className="eyebrow eyebrow--slab">how we work</p>
            <h2 className="h-l" style={{ color: "#fff", maxWidth: "22ch" }}>
              no discovery theatre. five steps, and you own everything at each one
            </h2>
          </div>
          <div className="proc">
            {PROCESS.map((p) => (
              <div key={p.step} className="proc__i notch">
                <span className="proc__n g-dark">{p.step}</span>
                <h3 className="h-s">{p.title}</h3>
                <p>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HONEST COMPARISON — scrolls horizontally on mobile */}
      <section className="wrap sec">
        <div className="sec__head">
          <p className="eyebrow">where we sit</p>
          <h2 className="h-l">the honest comparison.</h2>
          <p className="lede">
            How an offshore shop, a UK agency, a freelancer and us actually compare on the things
            that decide a build.
          </p>
        </div>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th scope="col" className={styles.criterionHead}>
                  What matters
                </th>
                {COMPARISON_COLUMNS.map((c, i) => (
                  <th key={c} scope="col" className={i === 3 ? styles.usHead : undefined}>
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARISON_ROWS.map((row) => (
                <tr key={row.criterion}>
                  <th scope="row">{row.criterion}</th>
                  {row.values.map((v, i) => (
                    <td key={i} className={i === 3 ? styles.us : undefined}>
                      {v}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <FeaturedWork
        title="the work behind the claims"
        lede="Production systems we built and still run for UK and global teams."
        only={config.caseStudyNames}
      />

      <Testimonials
        title="the clients who signed off the work"
        limit={4}
      />

      <Faq
        items={config.faqs.map((f) => ({ question: f.q, answer: f.a }))}
        title="questions, answered"
      />

      {/* CTA */}
      <section className="cta">
        <svg className="art cta-art" viewBox="0 0 400 400" fill="none" aria-hidden="true">
          <path d="M40 120 h220 l100 100 v220 h-320 z" stroke="currentColor" strokeWidth="2.5" />
          <path d="M110 190 h150 l60 60 v150 h-210 z" stroke="currentColor" strokeWidth="2" opacity=".6" />
        </svg>
        <div className="wrap cta__in">
          <div className="cta__t">
            <h2 className="h-l">tell us what you&apos;re building.</h2>
            <p>A thirty-minute call with the engineer who would run it — not a salesperson.</p>
          </div>
          <Link className="cta__btn notch" href="/contact/">
            Get a free quote
          </Link>
        </div>
      </section>
    </>
  );
}
