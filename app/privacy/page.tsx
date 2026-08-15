import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "How Appycodes handles your data.",
};

export default function PrivacyPage() {
  return (
    <>
      <section className="wrap hero hero--dark">
        <p className="cs-crumb">
          <Link href="/">home</Link> &nbsp;/&nbsp; privacy
        </p>
        <h1 className="h-l">privacy policy.</h1>
        <p className="lede">Last updated: May 2026. This page is a working draft.</p>
      </section>
      <section className="wrap sec">
        <div className="static-prose">
          <p>
            We collect only what we need to respond to your enquiry and run our engagements — your
            name, email, and anything you choose to send us. We do not sell your data, and we do not
            share it beyond the tools we use to operate.
          </p>
          <p>
            To ask what we hold, or to have it removed, email{" "}
            <a href="mailto:hello@appycodes.com">hello@appycodes.com</a>. A full policy is being
            finalised for the rebranded site.
          </p>
        </div>
      </section>
    </>
  );
}
