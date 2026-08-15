import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact — book a discovery call",
  description:
    "Book a thirty-minute discovery call with the engineer who would run your project. Founder-led, senior-only.",
};

export default function ContactPage() {
  return (
    <section className="hero--dark dotted">
      <div className="wrap cs-hero">
        <p className="cs-sector">Contact</p>
        <h1 style={{ maxWidth: "18ch" }}>
          tell us what you are trying to <span className="g-disp">build</span>.
        </h1>
        <p className="cs-lede">
          A thirty-minute call with the engineer who would run it — not a salesperson, and not a form
          that goes nowhere. Founder-led, senior-only, since {SITE.founded}.
        </p>
        <div className="cs-hero__btns">
          <a className="btn btn--grad notch" href={`mailto:${SITE.email}`}>
            email {SITE.email}
          </a>
        </div>
      </div>
    </section>
  );
}
