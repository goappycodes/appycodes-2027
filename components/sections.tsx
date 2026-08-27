import Link from "next/link";
import type { ReactNode } from "react";
import { Rail } from "@/components/rail";
import { AWARDS, CLIENT_LOGOS, REVIEWS } from "@/lib/site";
import { BLOG_POSTS } from "@/lib/blog";

/* eslint-disable @next/next/no-img-element */

/* ---------------------------------------------------------------- work ---- */

export const CASE_STUDIES = [
  {
    href: "/case-studies/creoate/",
    img: "/images/creoate-marketplace.jpg",
    logo: "/images/logo-creoate.png",
    meta: "Creoate · B2B wholesale marketplace",
    name: "Creoate",
    head: (
      <>
        <span className="name">Creoate</span> — eight years running a <span className="caps">B2B</span> wholesale
        marketplace.
      </>
    ),
    body: "The Next.js storefront, Python ingestion pipelines, DynamoDB data layer and AWS infrastructure behind a cross-border wholesale marketplace of 5,000+ brands and 200,000+ products.",
    fig: "8+ yrs",
    figlabel: "one team, still shipping",
    tags: ["Next.js", "DynamoDB", "Python", "AWS"],
  },
  {
    href: "/case-studies/decofetch/",
    img: "/images/decofetch-home.jpg",
    logo: "/images/decofetch-home.jpg",
    meta: "Decofetch · luxury furniture",
    name: "Decofetch",
    head: (
      <>
        <span className="name">Decofetch</span> — a luxury furniture marketplace, built from scratch.
      </>
    ),
    body: "A fully custom designer-furniture marketplace — a server-rendered Next.js storefront over a Laravel API, a bespoke admin, and AWS infrastructure re-architected to cut cost.",
    fig: "0→live",
    figlabel: "custom, front to back",
    tags: ["Next.js", "Laravel", "AWS"],
  },
  {
    href: "/case-studies/ontick/",
    img: "/images/ontick-6.png",
    logo: "/images/logo-bloc.png",
    meta: "Ontick · event ticketing",
    name: "Ontick",
    head: (
      <>
        <span className="name">Ontick</span> moved off Eventbrite onto ticketing they own.
      </>
    ),
    body: "Off a commission marketplace onto their own Laravel ticketing platform — multi-organizer, Stripe instalments, and two native apps.",
    fig: "£2M+",
    figlabel: "processed since launch",
    tags: ["Laravel", "React Native", "Stripe"],
  },
  {
    href: "/case-studies/bloc/",
    img: "/images/bloc-6.png",
    logo: "/images/logo-bloc.png",
    meta: "Bloc · social events",
    name: "Bloc",
    head: (
      <>
        <span className="name">Bloc</span> — one of the <span className="caps">UK</span>&rsquo;s newest social
        events platforms.
      </>
    ),
    body: "A four-year partnership across the whole estate — the app, its backend, a TikTok-style ads manager, an Algorand marketplace and the web front.",
    fig: "4+ yrs",
    figlabel: "one team, five codebases",
    tags: ["React Native", "Node", "Algorand"],
  },
  {
    href: "/case-studies/yippee-malta/",
    img: "/images/yippee-6.png",
    logo: "/images/logo-yippeemalta.png",
    meta: "Yippee Malta · travel",
    name: "Yippee Malta",
    head: (
      <>
        the mobile-first rebuild that won <span className="name">Yippee Malta</span> their own checkout.
      </>
    ),
    body: "Malta's leading tour operator rebuilt on a mobile-first design system, with a custom checkout against their proprietary booking API.",
    fig: "90+",
    figlabel: "core web vitals, both sides",
    tags: ["WordPress", "Custom checkout", "CWV"],
  },
  {
    href: "/case-studies/professional-energy/",
    img: "/images/pes-6.png",
    logo: "/images/logo-civic.png",
    meta: "Professional Energy · energy brokerage",
    name: "Professional Energy",
    head: (
      <>
        one platform for <span className="name">Professional Energy</span>&rsquo;s tenders, contracts and
        accounts.
      </>
    ),
    body: "A tailor-made ERP for a UK energy broker — supplier tenders, contract lifecycle, brokerage accounting and client management, all in one place.",
    fig: "100+",
    figlabel: "suppliers in one tender",
    tags: ["Laravel", "ERP", "Accounting"],
  },
];

function CaseCard({ o }: { o: (typeof CASE_STUDIES)[number] }) {
  return (
    <Link href={o.href} className="case notch notch-lg">
      <div className="case__shot">
        <img src={o.img} alt={o.meta} loading="lazy" />
      </div>
      <div className="case__bar" />
      <div className="case__in">
        <h3 className="h-m">{o.head}</h3>
        <p className="body">{o.body}</p>
        <div className="case__metric">
          <div className="case__metric-txt">
            <span className="case__fig tnum g-disp">{o.fig}</span>
            <span className="case__figlabel">{o.figlabel}</span>
          </div>
          <svg className="case__chev" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </Link>
  );
}

/**
 * Case-study pull-through. Used on the homepage, every service page and the
 * about page so the proof is never more than one section away.
 */
export function FeaturedWork({
  title = "the same work, shipped for other people",
  lede,
  only,
  more = true,
}: {
  title?: string;
  lede?: string;
  only?: string[];
  more?: boolean;
}) {
  const items = only ? CASE_STUDIES.filter((c) => only.includes(c.name)) : CASE_STUDIES;
  if (items.length === 0) return null;
  return (
    <section className="wrap sec reveal">
      <div className="sec__head">
        <p className="eyebrow">selected work</p>
        <h2 className="h-l">{title}</h2>
        {lede ? <p className="lede">{lede}</p> : null}
      </div>
      <Rail label="Case studies" className="work-rail">
        {items.map((o) => (
          <CaseCard key={o.href} o={o} />
        ))}
      </Rail>
      {more ? (
        <div className="sec__more">
          <Link className="btn btn--out notch" href="/case-studies/">
            all case studies
          </Link>
        </div>
      ) : null}
    </section>
  );
}

/* --------------------------------------------------------------- logos ---- */

/** Client logo strip — static row on desktop, opposing marquees on mobile. */
export function LogoWall({
  label = "Teams that trusted us with the thing that matters",
}: {
  label?: string;
}) {
  return (
    <section className="logos">
      <div className="wrap logos__in reveal">
        <span className="logos__lbl">{label}</span>
        <div className="logos__row">
          {CLIENT_LOGOS.map((l) => (
            <a key={l.name} href="/case-studies/" title={l.name}>
              <img src={l.src} alt={l.name} loading="lazy" />
            </a>
          ))}
        </div>
        <div className="logos__marquee" aria-hidden="true">
          {[
            CLIENT_LOGOS.slice(0, Math.ceil(CLIENT_LOGOS.length / 2)),
            CLIENT_LOGOS.slice(Math.ceil(CLIENT_LOGOS.length / 2)),
          ].map((row, r) => (
            <div key={r} className={`logos__track${r === 1 ? " logos__track--rev" : ""}`}>
              {[...row, ...row].map((l, i) => (
                <span key={i} className="logos__chip">
                  <img src={l.src} alt="" loading="lazy" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Recognition badges — the same set the homepage hero carries. */
export function AwardsStrip({ label = "Recognised by" }: { label?: string }) {
  return (
    <section className="wrap awards-band reveal">
      <span className="awards-band__lbl">{label}</span>
      <ul className="awards">
        {AWARDS.map((a) => (
          <li key={a.by} className="award">
            <img className="award__logo" src={a.img} alt={a.by} loading="lazy" />
            {a.name ? <span className="award__name">{a.by}</span> : null}
          </li>
        ))}
      </ul>
    </section>
  );
}

/* --------------------------------------------------------- testimonials ---- */

export function Testimonials({
  title = "the people who signed off the work",
  lede,
  limit,
}: {
  title?: string;
  lede?: string;
  limit?: number;
}) {
  const items = limit ? REVIEWS.slice(0, limit) : REVIEWS;
  return (
    <section className="wrap sec reveal">
      <div className="sec__head">
        <p className="eyebrow">reviews</p>
        <h2 className="h-l">{title}</h2>
        {lede ? <p className="lede">{lede}</p> : null}
      </div>
      <div className="tmon">
        {items.map((t) => (
          <figure key={t.name} className="quote notch">
            <span className="quote__mark">&ldquo;</span>
            <blockquote className="quote__t">{t.quote}</blockquote>
            <figcaption className="quote__by">
              <img src={t.avatar} alt={t.name} loading="lazy" />
              <span>
                <span className="quote__n">{t.name}</span>
                <span className="quote__r">{t.role}</span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------- writing ---- */

export function WritingCards({
  slugs,
  title = "the numbers behind the decisions",
  lede,
  eyebrow = "writing",
  more = true,
}: {
  slugs?: string[];
  title?: string;
  lede?: string;
  eyebrow?: string;
  more?: boolean;
}) {
  const posts = (
    slugs
      ? slugs.map((s) => BLOG_POSTS.find((p) => p.slug === s)).filter(Boolean)
      : [...BLOG_POSTS].sort((a, b) => (a.date < b.date ? 1 : -1)).slice(0, 4)
  ) as typeof BLOG_POSTS;
  if (posts.length === 0) return null;
  return (
    <section className="wrap sec reveal">
      <div className="sec__head">
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="h-l">{title}</h2>
        {lede ? <p className="lede">{lede}</p> : null}
      </div>
      <div className="writing-grid">
        {posts.map((p) => (
          <Link key={p.slug} href={`/blog/${p.slug}/`} className="wcard">
            <div className="wcard__shot">
              <img src={p.image} alt="" loading="lazy" />
              <span className="wcard__k">{p.tags[0]}</span>
            </div>
            <div className="wcard__in">
              <h3 className="wcard__t">{p.title}</h3>
              <p className="wcard__d">{p.description}</p>
              <div className="wcard__foot">
                <span>{p.readTime}</span>
                <span className="wcard__read">read &rarr;</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
      {more ? (
        <div className="sec__more">
          <Link className="btn btn--out notch" href="/blog/">
            read all writing
          </Link>
        </div>
      ) : null}
    </section>
  );
}

/* ------------------------------------------------------------------ faq ---- */

export function Faq({
  items,
  title = "questions, answered",
  eyebrow = "faq",
}: {
  items: { question: string; answer: string }[];
  title?: string;
  eyebrow?: string;
}) {
  if (!items || items.length === 0) return null;
  return (
    <section className="wrap sec reveal">
      <div className="sec__head">
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="h-l">{title}</h2>
      </div>
      <dl className="faq">
        {items.map((f) => (
          <div key={f.question} className="faq__row">
            <dt>{f.question}</dt>
            <dd>{f.answer}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

/* -------------------------------------------------------------- founders ---- */

export function FoundersBand({
  title = (
    <>
      book a discovery call with lead architect <span className="name">Ritesh</span>
    </>
  ),
  body = "You work with the founders. Ritesh and Swati have run every engagement on this site. The people who scope your project are the people who build it.",
  cta = "book a discovery call",
}: {
  title?: ReactNode;
  body?: string;
  cta?: string;
}) {
  return (
    <section className="std">
      <div className="wrap founders-band reveal">
        <div className="founder-cta notch notch-lg">
          <div className="founder-cta__pics">
            <img src="/images/ritesh.jpg" alt="Ritesh, founder and lead architect" loading="lazy" />
          </div>
          <div className="founder-cta__body">
            <h2 className="h-l">{title}</h2>
            <p className="founder-cta__t">{body}</p>
            <Link className="btn btn--grad notch" href="/contact/">
              {cta}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
