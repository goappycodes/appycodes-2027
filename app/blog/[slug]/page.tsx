import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BLOG_POSTS } from "@/lib/blog";

/* eslint-disable @next/next/no-img-element */

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = BLOG_POSTS.find((x) => x.slug === slug);
  if (!p) return {};
  return { title: p.title, description: p.description };
}

function fmt(date: string) {
  const d = new Date(date + "T00:00:00Z");
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = BLOG_POSTS.find((x) => x.slug === slug);
  if (!p) notFound();

  return (
    <article>
      <section className="wrap hero hero--dark">
        <p className="cs-crumb">
          <Link href="/">home</Link> &nbsp;/&nbsp; <Link href="/blog/">writing</Link> &nbsp;/&nbsp;{" "}
          {p.tags[0]}
        </p>
        <h1 className="h-l" style={{ maxWidth: "24ch" }}>
          {p.title}
        </h1>
        <p className="post-meta">
          {fmt(p.date)} · {p.readTime}
        </p>
      </section>

      <section className="wrap sec">
        <figure className="cs-fig">
          <img src={p.image} alt={p.title} loading="lazy" className="notch notch-lg" />
        </figure>
        <div className="prose">
          <p className="post-lead">{p.description}</p>
          <p>
            The full write-up is being migrated into the new site. In the meantime you can read the
            complete article on our current blog.
          </p>
          <p>
            <a href={`https://appycodes.dev/blog/${p.slug}/`} target="_blank" rel="noopener noreferrer">
              Read the full article ↗
            </a>
          </p>
          <div className="post-tags">
            {p.tags.map((t) => (
              <span key={t} className="post-tag">{t}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="wrap cta__in">
          <div className="cta__t">
            <h2 className="h-l">building something in this space?</h2>
            <p>A thirty-minute call with the engineer who would run it.</p>
          </div>
          <Link className="cta__btn notch" href="/contact/">book a call</Link>
        </div>
      </section>
    </article>
  );
}
