import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight } from "@/components/icons";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
export function fmtDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return `${MONTHS[(m || 1) - 1]} ${d}, ${y}`;
}

/* ---------------------------------------------------------------- post header */

export function PostHeader({
  eyebrow,
  title,
  lead,
  breadcrumbLabel,
  dateISO,
  readTime,
  authorName = "Ritesh",
  image,
  imageAlt,
}: {
  eyebrow: string;
  title: string;
  lead: ReactNode;
  breadcrumbLabel: string;
  dateISO: string;
  readTime: string;
  authorName?: string;
  image: string;
  imageAlt: string;
}) {
  return (
    <header className="post-head">
      <div className="phero__glow" aria-hidden="true" />
      <div className="wrap post-head__in">
        <nav aria-label="Breadcrumb" className="crumbs">
          <span>
            <Link href="/">home</Link>
            <i aria-hidden="true">/</i>
          </span>
          <span>
            <Link href="/blog/">writing</Link>
            <i aria-hidden="true">/</i>
          </span>
          <span aria-current="page">{breadcrumbLabel}</span>
        </nav>

        <div className="post-head__copy">
          <p className="phero__eyebrow">{eyebrow}</p>
          <h1 className="post-head__t">{title}</h1>
          <p className="post-head__lead">{lead}</p>
          <div className="post-head__meta">
            <span className="post-head__author">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/ritesh.jpg" alt="" loading="eager" />
              By {authorName}
            </span>
            <span aria-hidden>·</span>
            <span>{fmtDate(dateISO)}</span>
            <span aria-hidden>·</span>
            <span>{readTime}</span>
          </div>
        </div>
      </div>

      <div className="wrap post-head__figure">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt={imageAlt}
          width={1280}
          height={720}
          fetchPriority="high"
          decoding="async"
          className="notch notch-lg"
        />
      </div>
    </header>
  );
}

/* ---------------------------------------------------------------- body wrapper */

export function PostBody({ children }: { children: ReactNode }) {
  return (
    <div className="wrap py-12 md:py-16">
      <article className="article mx-auto max-w-3xl">{children}</article>
    </div>
  );
}

/* ---------------------------------------------------------------- code block */

export function CodeBlock({
  language,
  caption,
  children,
}: {
  language?: string;
  caption?: string;
  children: string;
}) {
  return (
    <figure className="not-prose my-7 overflow-hidden rounded-xl border border-line bg-card">
      {(caption || language) && (
        <figcaption className="flex items-center justify-between gap-3 border-b border-line bg-stone px-4 py-2.5">
          <span className="font-mono text-[0.72rem] text-muted">{caption}</span>
          {language && (
            <span className="font-mono text-[0.66rem] uppercase tracking-wider text-faint">{language}</span>
          )}
        </figcaption>
      )}
      <pre className="overflow-x-auto px-4 py-4 text-[0.8rem] leading-relaxed text-ink md:text-[0.82rem]">
        <code className="font-mono">{children}</code>
      </pre>
    </figure>
  );
}

/* ---------------------------------------------------------------- callout */

export function Callout({
  variant = "note",
  label,
  children,
}: {
  variant?: "tldr" | "note" | "warning";
  label?: string;
  children: ReactNode;
}) {
  const tinted = variant === "tldr" || variant === "warning";
  const defaultLabel = variant === "tldr" ? "TL;DR" : variant === "warning" ? "Why this matters" : "Note";
  return (
    <div
      className={`not-prose my-8 rounded-xl border p-5 md:p-6 ${
        tinted ? "border-accent/30 bg-accent-tint" : "border-line bg-stone"
      }`}
    >
      <p className="mb-3 font-mono text-[0.7rem] uppercase tracking-widest text-accent-strong">
        {label ?? defaultLabel}
      </p>
      <div className="space-y-3 text-[0.95rem] leading-relaxed text-ink [&_a]:text-accent-strong [&_a]:underline [&_a]:underline-offset-2 [&_code]:font-mono [&_code]:text-[0.85em]">
        {children}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- figure */

export function Figure({
  src,
  alt,
  caption,
  width = 1200,
  height = 675,
}: {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
}) {
  return (
    <figure className="not-prose my-8">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
        className="w-full rounded-xl border border-line bg-card object-contain"
      />
      {caption && <figcaption className="mt-2 font-mono text-[0.72rem] text-faint">{caption}</figcaption>}
    </figure>
  );
}

/* ---------------------------------------------------------------- table scroll */

export function TableScroll({ children }: { children: ReactNode }) {
  return <div className="not-prose my-7 overflow-x-auto rounded-xl border border-line">{children}</div>;
}

/* ---------------------------------------------------------------- author byline */

export function AuthorByline({
  authorName = "Ritesh Agarwal",
  jobTitle = "Founding Partner",
  linkedin = "https://www.linkedin.com/in/agrites/",
  lastReviewedISO,
  children,
}: {
  authorName?: string;
  jobTitle?: string;
  linkedin?: string;
  lastReviewedISO?: string;
  children: ReactNode;
}) {
  return (
    <aside className="not-prose mt-14 rounded-xl border border-line bg-stone p-6 md:p-8">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <div>
          <p className="font-display text-lg text-ink">{authorName}</p>
          <p className="font-mono text-[0.72rem] uppercase tracking-wider text-faint">{jobTitle}</p>
        </div>
        {lastReviewedISO && (
          <p className="font-mono text-[0.7rem] uppercase tracking-wider text-faint">
            Last reviewed {fmtDate(lastReviewedISO)}
          </p>
        )}
      </div>
      <div className="mt-4 text-[0.95rem] leading-relaxed text-muted [&_a]:text-accent-strong [&_a]:underline [&_a]:underline-offset-2">
        {children}
      </div>
      {linkedin && (
        <a
          href={linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="arrow-link mt-4 font-mono text-[0.72rem] uppercase tracking-wider"
        >
          LinkedIn <ArrowUpRight className="text-sm" />
        </a>
      )}
    </aside>
  );
}

/* ---------------------------------------------------------------- related cards */

export function RelatedGrid({ children }: { children: ReactNode }) {
  return <div className="not-prose mt-12 grid gap-4 md:grid-cols-3">{children}</div>;
}

export function RelatedCard({
  tag,
  title,
  body,
  href,
}: {
  tag: string;
  title: string;
  body: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group block rounded-xl border border-line bg-card p-5 transition-colors hover:border-accent/40"
    >
      <p className="font-mono text-[0.66rem] uppercase tracking-widest text-accent-strong">{tag}</p>
      <h3 className="mt-2 font-display text-base text-ink">{title}</h3>
      <p className="mt-2 text-[0.85rem] leading-snug text-muted">{body}</p>
    </Link>
  );
}

/* ---------------------------------------------------------------- formula */

export function Formula({ children }: { children: ReactNode }) {
  return (
    <p className="not-prose my-4 overflow-x-auto rounded-lg border border-line bg-stone px-4 py-3 font-mono text-[0.82rem] text-ink">
      {children}
    </p>
  );
}

/* ---------------------------------------------------------------- stat grid */

export function StatGrid({ children }: { children: ReactNode }) {
  return <div className="not-prose my-8 cell-grid sm:grid-cols-2 lg:grid-cols-3">{children}</div>;
}

export function Stat({ figure, label }: { figure: string; label: string }) {
  return (
    <div className="bg-card p-6">
      <div className="figure text-3xl text-ink">{figure}</div>
      <p className="mt-2 text-[0.85rem] text-muted">{label}</p>
    </div>
  );
}

/* ---------------------------------------------------------------- data chart (card with title + table + sources) */

export function DataChart({
  title,
  subtitle,
  sources,
  children,
}: {
  title: string;
  subtitle?: string;
  sources?: string;
  children: ReactNode;
}) {
  return (
    <figure className="not-prose my-8 rounded-xl border border-line bg-card p-5 md:p-6">
      <figcaption>
        <p className="font-display text-base text-ink md:text-lg">{title}</p>
        {subtitle && <p className="mt-1 text-[0.85rem] text-muted">{subtitle}</p>}
      </figcaption>
      <div className="mt-4 overflow-x-auto">{children}</div>
      {sources && <p className="mt-3 font-mono text-[0.68rem] italic text-faint">{sources}</p>}
    </figure>
  );
}

/* ---------------------------------------------------------------- faq section */

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <section className="not-prose mt-14">
      <h2 className="font-display text-[clamp(1.4rem,3vw,1.9rem)] text-ink">Frequently asked questions</h2>
      <dl className="mt-6 divide-y divide-line border-y border-line">
        {items.map((f) => (
          <div key={f.q} className="py-5">
            <dt className="font-display text-lg text-ink">{f.q}</dt>
            <dd className="mt-2 text-[0.95rem] leading-relaxed text-muted">{f.a}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
