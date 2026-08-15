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
    img: "/images/ontick-6.png",
    meta: "Ontick · event ticketing",
    head: <><span className="name">Ontick</span> moved off Eventbrite onto ticketing they own.</>,
    body: "Off Eventbrite onto a custom Laravel platform — multi-organizer, Stripe instalments, and two native apps.",
    fig: "£2M+",
    figlabel: "processed since launch",
  },
  {
    href: "/case-studies/bloc/",
    img: "/images/bloc-6.png",
    meta: "Bloc · social events",
    head: <><span className="name">Bloc</span> — one of the <span className="caps">UK</span>’s newest social events platforms.</>,
    body: "A four-year partnership across the app, backend, a TikTok-style ads manager, an Algorand marketplace and the web front.",
    fig: "4+ yrs",
    figlabel: "one team, five codebases",
  },
  {
    href: "/case-studies/yippee-malta/",
    img: "/images/yippee-6.png",
    meta: "Yippee Malta · travel",
    head: <>the mobile-first rebuild that won <span className="name">Yippee Malta</span> their own checkout.</>,
    body: "Malta's leading tour operator rebuilt on a mobile-first design system, with a custom checkout against their proprietary booking API.",
    fig: "90+",
    figlabel: "core web vitals, both sides",
  },
  {
    href: "/case-studies/professional-energy/",
    img: "/images/pes-6.png",
    meta: "Professional Energy · energy brokerage",
    head: <>one platform for <span className="name">Professional Energy</span>’s tenders, contracts and accounts.</>,
    body: "A tailor-made ERP for a UK energy broker — supplier tenders, contract lifecycle, brokerage accounting and client management, all in one place.",
    fig: "100+",
    figlabel: "suppliers in one tender",
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
