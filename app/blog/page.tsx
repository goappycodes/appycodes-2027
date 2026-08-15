import type { Metadata } from "next";
import Link from "next/link";
import { BLOG_POSTS } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Writing — the numbers, not the opinions",
  description:
    "Cost studies, research and benchmarks from real engagements: MVP costs, indexing decay, token economics, and more.",
};

/* eslint-disable @next/next/no-img-element */

function fmt(date: string) {
  const d = new Date(date + "T00:00:00Z");
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
}

export default function BlogIndex() {
  const posts = [...BLOG_POSTS].sort((a, b) => (a.date < b.date ? 1 : -1));
  return (
    <>
      <section className="wrap hero hero--dark">
        <p className="cs-crumb">
          <Link href="/">home</Link> &nbsp;/&nbsp; writing
        </p>
        <h1 className="h-l" style={{ maxWidth: "20ch" }}>
          we publish the <span className="g-disp">numbers</span>, not the opinions.
        </h1>
        <p className="lede">
          Cost studies, research and benchmarks from real engagements — the data behind the decisions
          we help founders make.
        </p>
      </section>

      <section className="wrap sec">
        <div className="blog-grid">
          {posts.map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}/`} className="blog-card notch">
              <div className="blog-card__shot">
                <img src={p.image} alt={p.title} loading="lazy" />
              </div>
              <div className="blog-card__in">
                <p className="blog-card__meta">
                  {p.tags[0]} · {p.readTime}
                </p>
                <h2 className="blog-card__t">{p.title}</h2>
                <p className="body">{p.description}</p>
                <p className="blog-card__date">{fmt(p.date)}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
