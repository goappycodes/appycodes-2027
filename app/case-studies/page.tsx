import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Case studies — companies we've helped ship",
  description:
    "Selected engagements: Ontick's custom ticketing platform, Bloc's four-year build, and Yippee Malta's booking engine.",
};

/* eslint-disable @next/next/no-img-element */

const CASES = [
  {
    href: "/case-studies/ontick/",
    img: "/images/cs-ontick-platform.jpg",
    meta: "Ontick · event ticketing",
    head: <>helping <span className="name">Ontick</span> keep the fees a platform used to take.</>,
    body: "Off Eventbrite onto a custom Laravel platform — multi-organizer, Stripe instalments, and two native apps.",
    fig: "£2M+",
    figlabel: "processed since launch",
  },
  {
    href: "/case-studies/bloc/",
    img: "/images/bloc-ads-dashboard.jpg",
    meta: "Bloc · social events",
    head: <>helping <span className="name">Bloc</span> launch one of the <span className="caps">UK</span>’s most-used social event apps.</>,
    body: "A four-year partnership across the app, backend, a TikTok-style ads manager, an Algorand marketplace and the web front.",
    fig: "4+ yrs",
    figlabel: "one team, five codebases",
  },
  {
    href: "/case-studies/yippee-malta/",
    img: "/images/cs-yippee-malta-homepage.jpg",
    meta: "Yippee Malta · travel",
    head: <>helping <span className="name">Yippee Malta</span> win the booking on their own checkout.</>,
    body: "Malta's leading tour operator rebuilt on a mobile-first design system, with a custom checkout against their proprietary booking API.",
    fig: "90+",
    figlabel: "core web vitals, both sides",
  },
];

export default function CaseStudiesIndex() {
  return (
    <>
      <section className="hero--dark dotted">
        <div className="wrap cs-hero">
          <p className="cs-crumb">
            <Link href="/">Home</Link> &nbsp;/&nbsp; Case studies
          </p>
          <h1 style={{ maxWidth: "18ch" }}>we measure the work by what happened next.</h1>
          <p className="cs-lede">
            Not a menu of services — a short list of companies, and the change we helped them make.
          </p>
        </div>
      </section>

      <section className="wrap sec">
        <div className="work">
          {CASES.map((o) => (
            <Link key={o.href} href={o.href} className="case notch notch-lg">
              <div className="case__shot">
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
                  <svg className="case__chev" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
