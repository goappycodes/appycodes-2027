import Link from "next/link";
import type { ReactNode } from "react";
import { AWARDS, CLIENT_LOGOS } from "@/lib/site";
import { BLOG_POSTS } from "@/lib/blog";
import { JsonLd } from "@/components/jsonld";
import { faqSchema } from "@/lib/schema";
import { InstitutionalWorkRail, type InstitutionalWorkItem } from "@/components/institutional-work-rail";
import { TestimonialSlider } from "@/components/testimonial-slider";

/* eslint-disable @next/next/no-img-element */

/* ---------------------------------------------------------------- work ---- */

export const CASE_STUDIES = [
  {
    href: "/case-studies/creoate/",
    img: "/images/creoate-featured.png",
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
    href: "/case-studies/easyship/",
    img: "/images/easyship-featured.png",
    logo: "/images/easyship-featured.png",
    meta: "Easyship · global shipping platform",
    name: "Easyship",
    head: (
      <>
        the embedded team behind <span className="name">Easyship</span>&rsquo;s site and{" "}
        <span className="caps">CMS</span>.
      </>
    ),
    body: "Inside a global logistics company's own Nuxt/Vue codebase — the shipping-rate and tax & duty calculators, server-rendered programmatic courier pages, a MongoDB CMS and the reliability work behind it, on Google Cloud.",
    fig: "550+",
    figlabel: "couriers on the rate calculator",
    tags: ["Nuxt/Vue", "Node", "MongoDB", "GCP"],
  },
  {
    href: "/case-studies/decofetch/",
    img: "/images/decofetch-featured.png",
    logo: "/images/decofetch-featured.png",
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
    href: "/case-studies/leonia/",
    img: "/images/leonia-featured.png",
    logo: "/images/leonia-featured.png",
    meta: "Léonia Paris · clean-beauty e-commerce",
    name: "Léonia",
    head: (
      <>
        the custom <span className="caps">Shopify</span> build behind <span className="name">Léonia Paris</span>.
      </>
    ),
    body: "A certified-organic French beauty brand's Shopify storefront — a bespoke theme plus the features Shopify can't do natively: a real account dashboard, loyalty and referral, gift-with-purchase, and a performance pass. Partners since 2021.",
    fig: "5 yrs",
    figlabel: "partners since 2021",
    tags: ["Shopify", "Liquid", "Custom account"],
  },
  {
    href: "/case-studies/plusheat/",
    img: "/images/plusheat-featured.png",
    logo: "/images/plusheat-featured.png",
    meta: "PlusHeat · UK boiler & home cover",
    name: "PlusHeat",
    head: (
      <>
        the cover-plan engine behind <span className="name">PlusHeat</span>.
      </>
    ),
    body: "The conversion engine for a UK boiler-cover brand — a custom plan configurator that prices homeowner and landlord cover by call-out fee and billing period, a postcode-lookup lead flow, CRM sync and landing pages. Partners since 2021.",
    fig: "5 yrs",
    figlabel: "web partner since 2021",
    tags: ["WordPress", "Lead engine", "CRM"],
  },
  {
    href: "/case-studies/shutters365/",
    img: "/images/shutters-featured.png",
    logo: "/images/shutters-featured.png",
    meta: "Shutters 365 · made-to-measure shutters",
    name: "Shutters 365",
    head: (
      <>
        the made-to-measure configurator behind <span className="name">Shutters 365</span>.
      </>
    ),
    body: "A factory-direct made-to-measure shutters store — a seven-step online configurator with a live preview and a live per-window price, a free-samples flow, measuring and fitting guides, and the order and supplier tooling behind the factory.",
    fig: "7-step",
    figlabel: "configurator, live pricing",
    tags: ["WordPress", "WooCommerce", "Stripe"],
  },
  {
    href: "/case-studies/ba-engine-room/",
    img: "/images/engineroom-featured.png",
    logo: "/images/engineroom-featured.png",
    meta: "BA Engine Room · AI ops platform",
    name: "BA Engine Room",
    head: (
      <>
        <span className="name">BA Engine Room</span> — an <span className="caps">AI</span> operating system for a
        consultancy.
      </>
    ),
    body: "A custom AI-native platform that runs an agency lead-to-invoice — AI discovery briefs, e-signed contracts, Stripe deposits and milestone delivery — on Next.js, Supabase and Claude.",
    fig: "0→1",
    figlabel: "built from the ground up",
    tags: ["Next.js", "Supabase", "Claude AI"],
  },
  {
    href: "/case-studies/bloc-ads-manager/",
    img: "/images/blocads-featured.png",
    logo: "/images/blocads-featured.png",
    meta: "Bloc Ads Manager · ad-tech",
    name: "Bloc Ads Manager",
    head: (
      <>
        a self-serve ad platform for <span className="name">Bloc</span>, built from the ground up.
      </>
    ),
    body: "Bloc for Business — a Meta-style ad platform with PostGIS audience estimation, Python interest targeting, in-app ad serving and reporting that closes the loop to real venue check-ins.",
    fig: "check-ins",
    figlabel: "closed-loop attribution",
    tags: ["Next.js", "PostGIS", "Python"],
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
    href: "/case-studies/zonely/",
    img: "/images/zonely-featured.png",
    logo: "/images/zonely-featured.png",
    meta: "Zonely · companionship app",
    name: "Zonely",
    head: (
      <>
        <span className="name">Zonely</span> — a pay-by-the-minute companionship app, on both stores.
      </>
    ),
    body: "A two-sided React Native marketplace — consumer app, buddy app, backend and admin — with real-time per-minute billing and the trust-and-safety layer it took to pass App Store review.",
    fig: "2 apps",
    figlabel: "consumer + buddy, iOS & Android",
    tags: ["React Native", "Expo", "Real-time"],
  },
  {
    href: "/case-studies/player-profile-hub/",
    img: "/images/pph-featured.png",
    logo: "/images/pph-featured.png",
    meta: "Player Profile Hub · grassroots football",
    name: "Player Profile Hub",
    head: (
      <>
        <span className="name">Player Profile Hub</span> — a safeguarded profile platform for grassroots football.
      </>
    ),
    body: "A verified, safeguarding-first platform for youth football, built from the ground up — FIFA-style player cards, a highlight feed, coach discovery and five profile tiers, on web and a React Native app.",
    fig: "0→1",
    figlabel: "built from the ground up",
    tags: ["React Native", "Web app", "Video"],
  },
  {
    href: "/case-studies/deepspatial/",
    img: "/images/deepspatial-featured.png",
    logo: "/images/deepspatial-featured.png",
    meta: "DeepSpatial · geospatial AI",
    name: "DeepSpatial",
    head: (
      <>
        the web presence behind <span className="name">DeepSpatial</span>, a listed geospatial{" "}
        <span className="caps">AI</span> company.
      </>
    ),
    body: "The corporate site, investor pages and Xploor talent platform for a publicly-traded geospatial AI company — a React front end shipped continuously on AWS Amplify.",
    fig: "2 yrs",
    figlabel: "one team, ongoing",
    tags: ["React", "AWS Amplify", "IR"],
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
        One platform for <span className="name">Professional Energy</span>&rsquo;s tenders, contracts and
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
  const institutionalItems: InstitutionalWorkItem[] = items.map((item) => ({
    href: item.href,
    image: item.img,
    client: item.name,
    logo: item.logo?.startsWith("/images/logo-") ? item.logo : undefined,
    brand: item.name.replace(/[^A-Za-z0-9]/g, ""),
    sector: item.meta.split("·")[1]?.trim() ?? "Product engineering",
    title: item.meta,
    detail: item.body,
    metric: item.fig,
    metricLabel: item.figlabel,
  }));
  if (items.length === 0) return null;
  return (
    <section className="wrap sec reveal">
      <div className="sec__head">
        <p className="eyebrow">selected work</p>
        <h2 className="h-l">{title}</h2>
        {lede ? <p className="lede">{lede}</p> : null}
      </div>
      <InstitutionalWorkRail items={institutionalItems} label="Case studies" />
      {more ? (
        <div className="sec__more">
          <Link className="btn btn--out notch" href="/case-studies/">
            All case studies
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
  return (
    <section className="institutional-testimonial reveal">
      <div className="wrap">
        <div className="institutional-testimonial__head">
          <p className="eyebrow">reviews · verified on clutch</p>
          <h2 className="h-l">{title}</h2>
          {lede ? <p className="lede">{lede}</p> : null}
        </div>
        <TestimonialSlider />
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
            Read all writing
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
      {/* FAQPage structured data — helps answer engines (Google, ChatGPT,
          Perplexity) quote these Q&As directly. Content matches what renders. */}
      <JsonLd data={faqSchema(items)} />
      <div className="sec__head">
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="h-l">{title}</h2>
      </div>
      <div className="faq">
        {items.map((f) => (
          <details key={f.question} className="faq__row" name="faq">
            <summary className="faq__q">
              <span>{f.question}</span>
              <svg className="faq__mark" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </summary>
            <p className="faq__a">{f.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------- founders ---- */

export function FoundersBand({
  title = (
    <>
      Book a discovery call with lead architect <span className="name">Ritesh</span>
    </>
  ),
  body = "You work with the founders. Ritesh and Swati have run every engagement on this site. The people who scope your project are the people who build it.",
  cta = "Book a discovery call",
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
