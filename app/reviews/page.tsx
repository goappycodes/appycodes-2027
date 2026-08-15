import type { Metadata } from "next";
import Link from "next/link";
import { REVIEWS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Reviews — what clients say",
  description: "Real reviews from founders, product teams and business owners across the UK, US and beyond.",
};

/* eslint-disable @next/next/no-img-element */

export default function ReviewsPage() {
  return (
    <>
      <section className="wrap hero hero--dark">
        <p className="cs-crumb">
          <Link href="/">home</Link> &nbsp;/&nbsp; reviews
        </p>
        <h1 className="h-l" style={{ maxWidth: "18ch" }}>
          the people who signed off the <span className="g-disp">work</span>.
        </h1>
        <p className="lede">Real reviews from founders, product teams and business owners we have built for.</p>
      </section>

      <section className="wrap sec">
        <div className="tmon">
          {REVIEWS.map((t) => (
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

      <section className="cta">
        <div className="wrap cta__in">
          <div className="cta__t">
            <h2 className="h-l">want to be the next one?</h2>
            <p>A thirty-minute call with the engineer who would run it.</p>
          </div>
          <Link className="cta__btn notch" href="/contact/">book a call</Link>
        </div>
      </section>
    </>
  );
}
