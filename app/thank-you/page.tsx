import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Thanks",
  description: "Thanks — we'll be in touch.",
};

export default function ThankYouPage() {
  return (
    <section className="wrap hero hero--dark" style={{ minHeight: "62vh" }}>
      <p className="cs-crumb">
        <Link href="/">home</Link> &nbsp;/&nbsp; thanks
      </p>
      <h1 className="h-l" style={{ maxWidth: "16ch" }}>
        thanks — we&apos;ll be in <span className="g-disp">touch</span>.
      </h1>
      <p className="lede">Usually within one working day, from the engineer who would run your project.</p>
      <div className="hero__btns">
        <Link className="btn btn--grad notch" href="/case-studies/">see the work</Link>
        <Link className="btn btn--out notch" href="/">back home</Link>
      </div>
    </section>
  );
}
