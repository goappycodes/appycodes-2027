import Link from "next/link";
import { HeroParticles } from "@/components/hero-particles";
import { AWARDS, CLIENT_LOGOS, REVIEWS } from "@/lib/site";

const OUTCOMES = [
  {
    href: "/case-studies/ontick/",
    img: "/images/cs-ontick-platform.jpg",
    meta: "Ontick · event ticketing",
    head: <>helping <span className="name">Ontick</span> keep the fees a platform used to take.</>,
    body: "Moved off a commission marketplace onto their own Laravel ticketing platform — multi-organizer, Stripe instalments, and two native apps.",
    fig: "£2M+",
    figlabel: "processed since launch",
  },
  {
    href: "/case-studies/bloc/",
    img: "/images/bloc-ads-dashboard.jpg",
    meta: "Bloc · social events",
    head: <>helping <span className="name">Bloc</span> launch one of the <span className="caps">UK</span>’s most-used social event apps.</>,
    body: "A four-year partnership across the whole estate — the app, its backend, a TikTok-style ads manager, an Algorand marketplace and the web front.",
    fig: "4+ yrs",
    figlabel: "one team, five codebases",
  },
  {
    href: "/case-studies/yippee-malta/",
    img: "/images/cs-yippee-malta-homepage.jpg",
    meta: "Yippee Malta · travel",
    head: <>helping <span className="name">Yippee Malta</span> win the booking on their own checkout.</>,
    body: "Malta’s leading tour operator rebuilt on a mobile-first design system, with a custom checkout against their proprietary booking API.",
    fig: "90+",
    figlabel: "core web vitals, both sides",
  },
];

const SERVICES = [
  { n: "01", h: "product platforms", body: "Multi-tenant SaaS, marketplaces, ticketing and booking engines — the systems your business actually runs on, built to survive their own success." },
  { n: "02", h: "native mobile", body: "React Native apps that ship past App Store review and stay shipped — offline-first paths, push, real-time sync and over-the-air updates." },
  { n: "03", h: <><span className="caps">AI</span> systems</>, body: "Retrieval pipelines, support deflection and internal copilots — costed per token before a line is written, so the unit economics work at volume." },
  { n: "04", h: "rescue & hardening", body: "AI-generated prototypes and stalled builds taken to production. Audit first, stabilise second, then finish it properly." },
  { n: "05", h: "commerce & content", body: "Headless WordPress, Shopify and custom checkouts wired to whatever proprietary API the business already depends on." },
  { n: "06", h: "performance & search", body: "Core Web Vitals, JavaScript SEO and indexing work for teams whose growth is gated on being found." },
];

const PROCESS = [
  { n: "01", h: "scope & cost", body: "A fixed written scope with the risky parts named up front. If we think the budget is wrong, we say so before you commit." },
  { n: "02", h: "architecture", body: "Data model, integrations and failure modes decided on paper first. This is where most projects are quietly lost." },
  { n: "03", h: "build in the open", body: "Your repo, your infrastructure, weekly demos on a real environment. No black box, no big reveal at the end." },
  { n: "04", h: "handover or stay", body: "Documented handover to your team, or we keep running it. Both are real options — the first is not a punishment." },
];

const POSTS = [
  { k: "cost study", t: "What it actually costs to take a Lovable prototype to production" },
  { k: "research", t: "Indexing decay: what happened to 1,200 pages over nine months" },
  { k: "economics", t: "Token economics for AI features, before you ship them to everyone" },
  { k: "benchmark", t: "Custom ticketing versus Eventbrite: where the break-even actually falls" },
];

function Chevron() {
  return (
    <svg className="case__chev" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="wrap hero hero--dark">
        <HeroParticles />
        <h1 className="h-xl">
          we build the software businesses <span className="g-disp">actually run on</span>.
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

      {/* OUTCOMES */}
      <section className="wrap sec" id="work">
        <div className="sec__head">
          <h2 className="h-l">we measure the work by what happened next.</h2>
          <p className="lede">Not a menu of services — a short list of companies, and the change we helped them make.</p>
        </div>
        <div className="work">
          {OUTCOMES.map((o) => (
            <Link key={o.href} href={o.href} className="case notch notch-lg">
              <div className="case__shot">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={o.img} alt={o.meta} loading="lazy" />
              </div>
              <div className="case__bar" />
              <div className="case__in">
                <p className="case__meta">{o.meta}</p>
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
        </div>
      </section>

      {/* CLIENT LOGOS — after outcomes */}
      <section className="logos">
        <div className="wrap logos__in">
          <span className="logos__lbl">Teams that trusted us with the thing that matters</span>
          <div className="logos__row">
            {CLIENT_LOGOS.map((l) => (
              // eslint-disable-next-line @next/next/no-img-element
              <a key={l.name} href="#work" title={l.name}>
                <img src={l.src} alt={l.name} loading="lazy" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* SHOWCASE */}
      <section className="showcase dotted">
        <div className="wrap showcase__in">
          <div className="showcase__copy">
            <h2 className="h-l">helping <span className="name">Ontick</span> move off a commission platform onto ticketing they own.</h2>
            <p>Off Eventbrite and onto a custom Laravel platform — multi-organizer, Stripe-orchestrated instalments, QR tickets held back until full settlement, and two React Native apps for staff and customers.</p>
            <dl className="showcase__facts">
              <div className="showcase__fact"><dt>processed since launch</dt><dd className="tnum g-dark">£2M+</dd></div>
              <div className="showcase__fact"><dt>surfaces shipped</dt><dd className="tnum g-dark">3</dd></div>
              <div className="showcase__fact"><dt>commission to a third party</dt><dd className="g-dark">nil</dd></div>
            </dl>
          </div>
          <div className="showcase__stage">
            <div className="frame notch notch-lg showcase__browser">
              <div className="frame__bar"><i /><i /><i /></div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/cs-ontick-platform.jpg" alt="Ontick ticketing platform" loading="lazy" />
            </div>
            <div className="showcase__phone">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/cs-ontick-customer-app.jpg" alt="Ontick customer app" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* PROOF SLAB */}
      <section className="slab dotted">
        <div className="wrap slab__in">
          <dl className="stats">
            <div className="stat"><dt>sales processed</dt><dd className="tnum g-dark">£2M+</dd><p>Through the Ontick ticketing platform since launch.</p></div>
            <div className="stat"><dt>longest engagement</dt><dd className="tnum g-dark">4+ yrs</dd><p>Bloc — app, backend, ads manager, marketplace and web.</p></div>
            <div className="stat"><dt>core web vitals</dt><dd className="tnum g-dark">90+</dd><p>Yippee Malta, on mobile and desktop, after rebuild.</p></div>
            <div className="stat"><dt>building since</dt><dd className="tnum g-dark">2015</dd><p>Independent, senior-only, and still founder-led.</p></div>
          </dl>
        </div>
      </section>

      {/* SERVICES */}
      <section className="wrap sec" id="services">
        <div className="sec__head">
          <h2 className="h-l">outcomes like those need six things done well.</h2>
          <p className="lede">Not a menu to pick from — the areas we have shipped repeatedly for a decade. If your problem sits outside them, we will say so.</p>
        </div>
        <div className="svc">
          {SERVICES.map((s) => (
            <div key={s.n} className="svc__i notch">
              <span className="svc__n">{s.n}</span>
              <h3 className="h-m">{s.h}</h3>
              <p className="body">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="wrap sec" id="reviews">
        <div className="sec__head">
          <h2 className="h-l">the people who signed off the work.</h2>
        </div>
        <div className="tmon">
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
        </div>
      </section>

      {/* PROCESS */}
      <section className="slab dotted" id="how">
        <div className="wrap slab__in">
          <h2 className="h-l" style={{ maxWidth: "21ch" }}>no discovery theatre. four steps, and you own everything at each one.</h2>
          <div className="proc">
            {PROCESS.map((p) => (
              <div key={p.n} className="proc__i notch">
                <span className="proc__n g-dark">{p.n}</span>
                <h3 className="h-s">{p.h}</h3>
                <p>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOUNDERS / DISCOVERY CALL */}
      <section className="std" id="team">
        <div className="wrap founders-band">
          <div className="founder-cta notch notch-lg">
            <div className="founder-cta__pics">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/ritesh.jpg" alt="Ritesh, founder" loading="lazy" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/swati.jpg" alt="Swati, founder" loading="lazy" />
            </div>
            <div className="founder-cta__body">
              <h2 className="h-l">book a discovery call with lead architect <span className="name">Ritesh</span>.</h2>
              <p className="founder-cta__t">You work with the founders. Ritesh and Swati have run every engagement on this page. The people who scope your project are the people who build it.</p>
              <Link className="btn btn--grad notch" href="/contact/">book a discovery call</Link>
            </div>
          </div>
        </div>
      </section>

      {/* WRITING */}
      <section className="wrap sec" id="writing">
        <div className="sec__head">
          <h2 className="h-l">we publish the numbers, not the opinions.</h2>
        </div>
        <div className="posts">
          {POSTS.map((p) => (
            <a key={p.t} className="post" href="#writing">
              <span className="post__k">{p.k}</span>
              <span className="post__t">{p.t}</span>
              <span className="post__a">read &rarr;</span>
            </a>
          ))}
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
        <div className="wrap cta__in">
          <div className="cta__t">
            <h2 className="h-l">tell us what you are trying to build.</h2>
            <p>A thirty-minute call with the engineer who would run it — not a salesperson, and not a form that goes nowhere.</p>
          </div>
          <Link className="cta__btn notch" href="/contact/">book a call</Link>
        </div>
      </section>
    </>
  );
}
