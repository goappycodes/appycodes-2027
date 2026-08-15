import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About — the engineering studio behind the work",
  description:
    "Founder-led since 2015. What began with one engineer and a laptop is now a senior team shipping web platforms, mobile apps and AI systems across the UK, EU and US.",
};

/* eslint-disable @next/next/no-img-element */

export default function AboutPage() {
  return (
    <>
      <section className="wrap hero hero--dark">
        <p className="cs-crumb">
          <Link href="/">home</Link> &nbsp;/&nbsp; about
        </p>
        <h1 className="h-l" style={{ maxWidth: "18ch" }}>
          we make building tech <span className="g-disp">simpler</span>.
        </h1>
        <p className="lede">
          What began in 2015 with one engineer and a laptop is now a senior team supporting companies
          across India, the UK and the US — and we still own the codebases we shipped in year one.
        </p>
      </section>

      <section className="wrap sec">
        <div className="static-prose">
          <p>
            Every product has a beginning. Ours started with a clear frustration: building tech was
            far more complicated than it needed to be. So in 2015 we set out to fix that.
          </p>
          <p>
            What began with one engineer, a laptop, and a commitment to make tech simpler has grown
            into a team supporting companies across India, the UK and the US — building SaaS web apps,
            React Native mobile apps, custom WordPress platforms, and the technical SEO that makes them
            found.
          </p>
          <h2>what drives us</h2>
          <p>
            We are optimised to still be running your platform in year four — not just to win the
            pitch. Senior engineers only, no juniors billed at senior rates. You own the code from day
            one: your repository, your cloud accounts, your keys. And we say no to work that sits
            outside what we do well, because a good referral beats a bad engagement.
          </p>
        </div>
      </section>

      {/* PROOF */}
      <section className="slab dotted">
        <div className="wrap slab__in">
          <dl className="stats">
            <div className="stat"><dt>building since</dt><dd className="tnum g-dark">2015</dd></div>
            <div className="stat"><dt>markets</dt><dd className="g-dark">UK · EU · US</dd></div>
            <div className="stat"><dt>longest engagement</dt><dd className="tnum g-dark">4+ yrs</dd></div>
            <div className="stat"><dt>team</dt><dd className="g-dark">senior-only</dd></div>
          </dl>
        </div>
      </section>

      {/* FOUNDERS */}
      <section className="std" id="team">
        <div className="wrap founders-band">
          <div className="founder-cta notch notch-lg">
            <div className="founder-cta__pics">
              <img src="/images/ritesh.jpg" alt="Ritesh, founder" loading="lazy" />
              <img src="/images/swati.jpg" alt="Swati, founder" loading="lazy" />
            </div>
            <div className="founder-cta__body">
              <h2 className="h-l">
                the strategist and builder behind the <span className="name">magic</span>.
              </h2>
              <p className="founder-cta__t">
                You work with the founders. Ritesh and Swati have run every engagement on this site.
                The people who scope your project are the people who build it.
              </p>
              <Link className="btn btn--grad notch" href="/contact/">book a discovery call</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="wrap cta__in">
          <div className="cta__t">
            <h2 className="h-l">tell us what you are trying to build.</h2>
            <p>A thirty-minute call with the engineer who would run it.</p>
          </div>
          <Link className="cta__btn notch" href="/contact/">book a call</Link>
        </div>
      </section>
    </>
  );
}
