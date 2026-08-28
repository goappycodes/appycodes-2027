import type { Metadata } from "next";
import Link from "next/link";
import { HeroParticles } from "@/components/hero-particles";
import { ServiceTitle } from "@/components/service-title";
import { ChevronRight } from "@/components/icons";
import { Rail } from "@/components/rail";
import { WorldMapPreview } from "@/components/world-map-preview";
import { SERVICES_DATA } from "@/lib/services-data";
import { BLOG_POSTS } from "@/lib/blog";
import { AWARDS, CLIENT_LOGOS, REVIEWS } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "https://appycodes.dev/" },
};

const OUTCOMES = [
  {
    href: "/case-studies/creoate/",
    img: "/images/creoate-featured.png",
    meta: "Creoate · B2B wholesale marketplace",
    head: <><span className="name">Creoate</span> — eight years running a <span className="caps">B2B</span> wholesale marketplace.</>,
    body: "The Next.js storefront, Python ingestion pipelines, DynamoDB data layer and AWS infra behind a cross-border marketplace of 5,000+ brands and 200,000+ products.",
    fig: "8+ yrs",
    figlabel: "one team, still shipping",
  },
  {
    href: "/case-studies/easyship/",
    img: "/images/easyship-featured.png",
    meta: "Easyship · global shipping platform",
    head: <>the embedded team behind <span className="name">Easyship</span>’s site and <span className="caps">CMS</span>.</>,
    body: "Inside Easyship’s own Nuxt/Vue codebase — the shipping-rate and tax & duty calculators, server-rendered courier pages, a MongoDB CMS and the reliability work behind it, on Google Cloud.",
    fig: "550+",
    figlabel: "couriers on the calculator",
  },
  {
    href: "/case-studies/decofetch/",
    img: "/images/decofetch-featured.png",
    meta: "Decofetch · luxury furniture",
    head: <><span className="name">Decofetch</span> — a luxury furniture marketplace, built from scratch.</>,
    body: "A fully custom designer-furniture marketplace — a server-rendered Next.js storefront over a Laravel API, a bespoke admin, and AWS infra re-architected to cut cost.",
    fig: "0→live",
    figlabel: "custom, front to back",
  },
  {
    href: "/case-studies/leonia/",
    img: "/images/leonia-featured.png",
    meta: "Léonia Paris · clean-beauty e-commerce",
    head: <>the custom <span className="caps">Shopify</span> build behind <span className="name">Léonia Paris</span>.</>,
    body: "A certified-organic French beauty brand on Shopify — a bespoke theme plus the features Shopify can’t do natively: a real account dashboard, loyalty and referral, gift-with-purchase, and a performance pass.",
    fig: "5 yrs",
    figlabel: "partners since 2021",
  },
  {
    href: "/case-studies/ba-engine-room/",
    img: "/images/engineroom-featured.png",
    meta: "BA Engine Room · AI ops platform",
    head: <><span className="name">BA Engine Room</span> — an <span className="caps">AI</span> operating system for a consultancy.</>,
    body: "A custom AI-native platform that runs an agency lead-to-invoice — AI discovery briefs, e-signed contracts, Stripe deposits and milestone delivery.",
    fig: "0→1",
    figlabel: "built from the ground up",
  },
  {
    href: "/case-studies/bloc-ads-manager/",
    img: "/images/blocads-featured.png",
    meta: "Bloc Ads Manager · ad-tech",
    head: <>a self-serve ad platform for <span className="name">Bloc</span>, built from the ground up.</>,
    body: "Bloc for Business — a Meta-style ad platform with PostGIS audience estimation, Python interest targeting, in-app ad serving and check-in attribution.",
    fig: "check-ins",
    figlabel: "closed-loop attribution",
  },
  {
    href: "/case-studies/ontick/",
    img: "/images/ontick-6.png",
    meta: "Ontick · event ticketing",
    head: <><span className="name">Ontick</span> moved off Eventbrite onto ticketing they own.</>,
    body: "Moved off a commission marketplace onto their own Laravel ticketing platform — multi-organizer, Stripe instalments, and two native apps.",
    fig: "£2M+",
    figlabel: "processed since launch",
  },
  {
    href: "/case-studies/bloc/",
    img: "/images/bloc-6.png",
    meta: "Bloc · social events",
    head: <><span className="name">Bloc</span> — one of the <span className="caps">UK</span>’s newest social events platforms.</>,
    body: "A four-year partnership across the whole estate — the app, its backend, a TikTok-style ads manager, an Algorand marketplace and the web front.",
    fig: "4+ yrs",
    figlabel: "one team, five codebases",
  },
  {
    href: "/case-studies/zonely/",
    img: "/images/zonely-featured.png",
    meta: "Zonely · companionship app",
    head: <><span className="name">Zonely</span> — a pay-by-the-minute companionship app, on both stores.</>,
    body: "A two-sided React Native marketplace — consumer app, buddy app, backend and admin — with real-time per-minute billing and a trust-and-safety layer built to pass App Store review.",
    fig: "2 apps",
    figlabel: "consumer + buddy, iOS & Android",
  },
  {
    href: "/case-studies/player-profile-hub/",
    img: "/images/pph-featured.png",
    meta: "Player Profile Hub · grassroots football",
    head: <><span className="name">Player Profile Hub</span> — a safeguarded profile platform for grassroots football.</>,
    body: "A verified, safeguarding-first platform for youth football, built from the ground up — FIFA-style player cards, a highlight feed, coach discovery and five tiers, on web and a React Native app.",
    fig: "0→1",
    figlabel: "built from the ground up",
  },
  {
    href: "/case-studies/deepspatial/",
    img: "/images/deepspatial-featured.png",
    meta: "DeepSpatial · geospatial AI",
    head: <>the web presence behind <span className="name">DeepSpatial</span>, a listed geospatial <span className="caps">AI</span> company.</>,
    body: "The corporate site, investor pages and Xploor talent platform for a publicly-traded geospatial AI company — a React front end on AWS Amplify.",
    fig: "2 yrs",
    figlabel: "one team, ongoing",
  },
  {
    href: "/case-studies/yippee-malta/",
    img: "/images/yippee-6.png",
    meta: "Yippee Malta · travel",
    head: <>the mobile-first rebuild that won <span className="name">Yippee Malta</span> their own checkout.</>,
    body: "Malta’s leading tour operator rebuilt on a mobile-first design system, with a custom checkout against their proprietary booking API.",
    fig: "90+",
    figlabel: "core web vitals, both sides",
  },
  {
    href: "/case-studies/professional-energy/",
    img: "/images/pes-6.png",
    meta: "Professional Energy · energy brokerage",
    head: <>one platform for <span className="name">Professional Energy</span>’s tenders, contracts and accounts.</>,
    body: "A tailor-made ERP for a UK energy broker — supplier tenders, contract lifecycle, brokerage accounting and client relationships, all in one place.",
    fig: "100+",
    figlabel: "suppliers in one tender",
  },
];

/* Headlines on this site spell numbers out. Derived from the data so adding a
   practice does not leave a stale numeral in an H2. */
const COUNT_WORD: Record<number, string> = {
  5: "five",
  6: "six",
  7: "seven",
  8: "eight",
  9: "nine",
};

const PROCESS = [
  { n: "01", h: "scope & cost", body: "A fixed written scope with the risky parts named up front. If we think the budget is wrong, we say so before you commit." },
  { n: "02", h: "architecture", body: "Data model, integrations and failure modes decided on paper first. This is where most projects are quietly lost." },
  { n: "03", h: "build in the open", body: "Your repo, your infrastructure, weekly demos on a real environment. No black box, no big reveal at the end." },
  { n: "04", h: "handover or stay", body: "Documented handover to your team, or we keep running it. Both are real options — the first is not a punishment." },
];

/* Four featured studies, pulled from the real article set so the card imagery,
   dates and read times stay in sync with /blog. */
const FEATURED_POSTS = [
  { slug: "lovable-to-production-cost-2026", k: "cost study" },
  { slug: "indexing-decay-google-study-2026", k: "research" },
  { slug: "ai-feature-token-economics-2026", k: "economics" },
  { slug: "custom-ticketing-breakeven-2026", k: "benchmark" },
]
  .map((f) => {
    const post = BLOG_POSTS.find((p) => p.slug === f.slug);
    return post ? { ...post, k: f.k } : null;
  })
  .filter((p): p is NonNullable<typeof p> => p !== null);

function Chevron() {
  return (
    <svg className="case__chev" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function HomePage() {
  return (
    <div className="lux home">
      {/* HERO */}
      <section className="wrap hero hero--dark">
        <HeroParticles />
        <h1 className="h-xl">
          we build the software businesses <span className="g-disp">actually run on</span>
        </h1>
        <p className="lede">
          Web platforms, mobile apps and AI systems for companies that have outgrown off-the-shelf.
          We do not pitch services — we help you ship the one thing that changes your business, then
          keep it running.
        </p>
        <div className="hero__btns">
          <a className="btn btn--grad notch" href="#work">see what we&apos;ve helped build</a>
          <Link className="btn btn--out notch" href="/contact/">start a project</Link>
        </div>
        <div className="hero__awards">
          <span className="hero__awards-lbl">Recognised by</span>
          <ul className="awards">
            {AWARDS.map((a) => (
              <li key={a.by} className="award">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="award__logo" src={a.img} alt={a.by} loading="eager" />
                {a.name ? <span className="award__name">{a.by}</span> : null}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* OUTCOMES — featured case studies, 2 per row */}
      <section className="wrap sec" id="work">
        <div className="sec__head reveal">
          <h2 className="h-l">we measure the work by what happened next</h2>
          <p className="lede">Not a menu of services — a short list of companies, and the change we helped them make.</p>
        </div>
        <div className="reveal">
          <Rail label="Featured case studies" className="work-rail">
            {OUTCOMES.map((o) => (
              <Link key={o.href} href={o.href} className="case notch notch-lg">
                <div className="case__shot">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
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
                    <Chevron />
                  </div>
                </div>
              </Link>
            ))}
          </Rail>
        </div>
      </section>

      {/* CLIENT LOGOS */}
      <section className="logos">
        <div className="wrap logos__in reveal">
          <span className="logos__lbl">Teams that trusted us with the thing that matters</span>
          <div className="logos__row">
            {CLIENT_LOGOS.map((l) => (
              // eslint-disable-next-line @next/next/no-img-element
              <a key={l.name} href="#work" title={l.name}>
                <img src={l.src} alt={l.name} loading="lazy" />
              </a>
            ))}
          </div>
          {/* Mobile only: two marquee rows drifting in opposite directions.
              Each track repeats its half twice so the -50% loop is seamless.
              Decorative — the static row above carries the semantics. */}
          <div className="logos__marquee" aria-hidden="true">
            {[
              CLIENT_LOGOS.slice(0, Math.ceil(CLIENT_LOGOS.length / 2)),
              CLIENT_LOGOS.slice(Math.ceil(CLIENT_LOGOS.length / 2)),
            ].map((row, r) => (
              <div key={r} className={`logos__track${r === 1 ? " logos__track--rev" : ""}`}>
                {[...row, ...row].map((l, i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <span key={i} className="logos__chip">
                    <img src={l.src} alt="" loading="lazy" />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROOF SLAB */}
      <section className="slab dotted">
        <div className="wrap slab__in reveal">
          <dl className="stats">
            <div className="stat"><dt>sales processed</dt><dd className="tnum g-dark">£2M+</dd><p>Through the Ontick ticketing platform since launch.</p></div>
            <div className="stat"><dt>longest engagement</dt><dd className="tnum g-dark">8+ yrs</dd><p>Creoate — the Next.js storefront, Python pipelines, DynamoDB and AWS infra behind their marketplace.</p></div>
            <div className="stat"><dt>core web vitals</dt><dd className="tnum g-dark">90+</dd><p>Yippee Malta, on mobile and desktop, after rebuild.</p></div>
            <div className="stat"><dt>building since</dt><dd className="tnum g-dark">2015</dd><p>Independent, senior-only, and still founder-led.</p></div>
          </dl>
        </div>
      </section>

      {/* THE ATLAS — the whole register, plotted */}
      <WorldMapPreview />

      {/* SERVICES */}
      <section className="wrap sec" id="services">
        <div className="sec__head reveal">
          <h2 className="h-l">outcomes like those need {COUNT_WORD[SERVICES_DATA.length] ?? SERVICES_DATA.length} things done well</h2>
          <p className="lede">Not a menu to pick from — the areas we have shipped repeatedly for a decade. If your problem sits outside them, we will say so.</p>
        </div>
        <div className="svc reveal">
          {SERVICES_DATA.map((s) => (
            <Link key={s.slug} href={`/services/${s.slug}/`} className="svc__i notch">
              <h3 className="h-m"><ServiceTitle label={s.title} /></h3>
              <p className="body">{s.summary}</p>
              <ChevronRight className="svc__chev" aria-hidden />
            </Link>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="wrap sec" id="reviews">
        <div className="sec__head reveal">
          <h2 className="h-l">the people who signed off the work</h2>
        </div>
        <div className="reveal">
          <Rail label="Client testimonials" className="tmon-rail">
            {REVIEWS.map((t) => (
              <figure key={t.name} className="quote notch">
                <span className="quote__mark">&ldquo;</span>
                <blockquote className="quote__t">{t.quote}</blockquote>
                <figcaption className="quote__by">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={t.avatar} alt={t.name} loading="lazy" />
                  <span>
                    <span className="quote__n">{t.name}</span>
                    <span className="quote__r">{t.role}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </Rail>
        </div>
      </section>

      {/* PROCESS */}
      <section className="slab dotted" id="how">
        <div className="wrap slab__in reveal">
          <h2 className="h-l" style={{ maxWidth: "21ch" }}>no discovery theatre. four steps, and you own everything at each one</h2>
          <div className="proc">
            {PROCESS.map((p) => (
              <div key={p.n} className="proc__i notch">
                <h3 className="h-s">{p.h}</h3>
                <p>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOUNDERS / DISCOVERY CALL */}
      <section className="std" id="team">
        <div className="wrap founders-band reveal">
          <div className="founder-cta notch notch-lg">
            <div className="founder-cta__pics">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/ritesh.jpg" alt="Ritesh, founder and lead architect" loading="lazy" />
            </div>
            <div className="founder-cta__body">
              <h2 className="h-l">book a discovery call with lead architect <span className="name">Ritesh</span></h2>
              <p className="founder-cta__t">You work with the founders. Ritesh and Swati have run every engagement on this page. The people who scope your project are the people who build it.</p>
              <Link className="btn btn--grad notch" href="/contact/">book a discovery call</Link>
            </div>
          </div>
        </div>
      </section>

      {/* WRITING */}
      <section className="wrap sec" id="writing">
        <div className="sec__head reveal">
          <h2 className="h-l">we publish the numbers, not the opinions</h2>
          <p className="lede">
            Cost studies and benchmarks from real engagements — the data behind the decisions we help
            founders make, with the working shown.
          </p>
        </div>
        <div className="reveal">
          <Rail label="Featured writing" className="writing-rail">
            {FEATURED_POSTS.map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}/`} className="wcard">
                <div className="wcard__shot">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.image} alt="" loading="lazy" />
                  <span className="wcard__k">{p.k}</span>
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
          </Rail>
        </div>
        <div className="sec__more reveal">
          <Link className="btn btn--out notch" href="/blog/">read all writing</Link>
        </div>
      </section>

      {/* CTA */}
      <section className="cta" id="contact">
        <svg className="art cta-art" viewBox="0 0 400 400" fill="none" aria-hidden="true">
          <path d="M40 120 h220 l100 100 v220 h-320 z" stroke="currentColor" strokeWidth="2.5" />
          <path d="M110 190 h150 l60 60 v150 h-210 z" stroke="currentColor" strokeWidth="2" opacity=".6" />
          <circle cx="40" cy="120" r="6" fill="currentColor" />
          <circle cx="360" cy="440" r="6" fill="currentColor" />
        </svg>
        <div className="wrap cta__in reveal">
          <div className="cta__t">
            <h2 className="h-l">tell us what you are trying to build</h2>
            <p>A thirty-minute call with the engineer who would run it — not a salesperson, and not a form that goes nowhere.</p>
          </div>
          <Link className="cta__btn notch" href="/contact/">book a call</Link>
        </div>
      </section>
    </div>
  );
}
