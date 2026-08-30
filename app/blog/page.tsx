import type { Metadata } from "next";
import { siteMeta } from "@/lib/seo";
import Link from "next/link";
import { BLOG_POSTS } from "@/lib/blog";
import { PageHero } from "@/components/page-hero";
import { FeaturedWork, LogoWall } from "@/components/sections";

export const metadata: Metadata = siteMeta({
  title: "Writing — the numbers, not the opinions",
  description:
    "Cost studies, research and benchmarks from real engagements: MVP costs, indexing decay, token economics, replatform maths and more.",
  path: "/blog/",
  image: "/images/blog-mvp-cost-funded-startups-2026.jpg",
});

/* eslint-disable @next/next/no-img-element */

function fmt(date: string) {
  const d = new Date(date + "T00:00:00Z");
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
}

export default function BlogIndex() {
  const posts = [...BLOG_POSTS].sort((a, b) => (a.date < b.date ? 1 : -1));
  const [lead, ...rest] = posts;
  const secondary = rest.slice(0, 2);
  const grid = rest.slice(2);

  // Topic counts, taken from the first tag on each article.
  const topics = Object.entries(
    posts.reduce<Record<string, number>>((acc, p) => {
      const t = p.tags[0];
      if (t) acc[t] = (acc[t] ?? 0) + 1;
      return acc;
    }, {})
  )
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Writing" }]}
        eyebrow="writing"
        title={
          <>
            we publish the <span className="g-disp">numbers</span>, not the opinions.
          </>
        }
        lede="Cost studies, research and benchmarks from real engagements — the data behind the decisions we help founders make, with the working shown."
        actions={[{ label: "Start a project", href: "/contact/" }]}
        media={
          lead
            ? { src: lead.image, alt: "", caption: `Latest: ${lead.title}` }
            : undefined
        }
        mediaContain
        stats={[
          { n: String(posts.length), label: "articles published" },
          { n: "real", label: "engagement data" },
          { n: "no", label: "gated PDFs" },
          { n: "2015", label: "shipping since" },
        ]}
      />

      {/* LEAD STORY + TWO */}
      <section className="wrap sec">
        <div className="sec__head">
          <p className="eyebrow">latest</p>
          <h2 className="h-l">the most recent working out.</h2>
        </div>

        <div className="lead-grid">
          {lead ? (
            <Link href={`/blog/${lead.slug}/`} className="lead-card notch notch-lg">
              <div className="lead-card__shot">
                <img src={lead.image} alt="" loading="eager" />
                <span className="wcard__k">{lead.tags[0]}</span>
              </div>
              <div className="lead-card__in">
                <h3 className="lead-card__t">{lead.title}</h3>
                <p className="lead-card__d">{lead.description}</p>
                <div className="wcard__foot">
                  <span>
                    {fmt(lead.date)} · {lead.readTime}
                  </span>
                  <span className="wcard__read">read the study &rarr;</span>
                </div>
              </div>
            </Link>
          ) : null}

          <div className="lead-side">
            {secondary.map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}/`} className="side-card">
                <div className="side-card__shot">
                  <img src={p.image} alt="" loading="lazy" />
                </div>
                <div className="side-card__in">
                  <p className="side-card__k">{p.tags[0]}</p>
                  <h3 className="side-card__t">{p.title}</h3>
                  <p className="side-card__m">
                    {fmt(p.date)} · {p.readTime}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* TOPICS */}
      {topics.length > 0 ? (
        <section className="wrap topics">
          <span className="topics__lbl">What we write about</span>
          <ul>
            {topics.map(([t, n]) => (
              <li key={t}>
                {t} <span className="tnum">{n}</span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {/* EVERYTHING ELSE */}
      <section className="wrap sec">
        <div className="sec__head">
          <p className="eyebrow">the archive</p>
          <h2 className="h-l">every study, benchmark and teardown.</h2>
        </div>
        <div className="writing-grid writing-grid--archive">
          {grid.map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}/`} className="wcard">
              <div className="wcard__shot">
                <img src={p.image} alt="" loading="lazy" />
                <span className="wcard__k">{p.tags[0]}</span>
              </div>
              <div className="wcard__in">
                <h3 className="wcard__t">{p.title}</h3>
                <p className="wcard__d">{p.description}</p>
                <div className="wcard__foot">
                  <span>{fmt(p.date)}</span>
                  <span className="wcard__read">read &rarr;</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <LogoWall label="The engagements this writing comes from" />

      <FeaturedWork
        title="where these numbers came from"
        lede="Every study above is drawn from work like this — production systems, not thought experiments."
      />

      <section className="cta">
        <svg className="art cta-art" viewBox="0 0 400 400" fill="none" aria-hidden="true">
          <path d="M40 120 h220 l100 100 v220 h-320 z" stroke="currentColor" strokeWidth="2.5" />
          <path d="M110 190 h150 l60 60 v150 h-210 z" stroke="currentColor" strokeWidth="2" opacity=".6" />
        </svg>
        <div className="wrap cta__in">
          <div className="cta__t">
            <h2 className="h-l">want these numbers run for your case?</h2>
            <p>A thirty-minute call with the engineer who would run it — the maths comes free.</p>
          </div>
          <Link className="cta__btn notch" href="/contact/">
            Book a call
          </Link>
        </div>
      </section>
    </>
  );
}
