import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms",
  description: "Terms of use for the Appycodes website.",
};

export default function TermsPage() {
  return (
    <>
      <section className="wrap hero hero--dark">
        <p className="cs-crumb">
          <Link href="/">home</Link> &nbsp;/&nbsp; terms
        </p>
        <h1 className="h-l">terms.</h1>
        <p className="lede">Last updated: May 2026. This page is a working draft.</p>
      </section>
      <section className="wrap sec">
        <div className="static-prose">
          <p>
            The content on this site is provided as-is, for information. Engagement terms are agreed
            per project in a written scope of work.
          </p>
          <p>
            Questions? Email <a href="mailto:hello@appycodes.com">hello@appycodes.com</a>.
          </p>
        </div>
      </section>
    </>
  );
}
