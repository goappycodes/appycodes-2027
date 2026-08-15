import type { Metadata } from "next";
import Link from "next/link";
import { SERVICES_DATA } from "@/lib/services-data";

export const metadata: Metadata = {
  title: "Services — what we do well",
  description:
    "The engineering practices behind the outcomes: platform builds, native mobile, AI systems, rescue and hardening, and ongoing support.",
};

export default function ServicesIndex() {
  return (
    <>
      <section className="wrap hero hero--dark">
        <p className="cs-crumb">
          <Link href="/">home</Link> &nbsp;/&nbsp; services
        </p>
        <h1 className="h-l" style={{ maxWidth: "18ch" }}>
          the practices behind the <span className="g-disp">work</span>.
        </h1>
        <p className="lede">
          Not a menu to pick from — the areas we have shipped repeatedly for a decade. If your problem
          sits outside them, we will say so.
        </p>
      </section>

      <section className="wrap sec">
        <div className="svc">
          {SERVICES_DATA.map((s, i) => (
            <Link key={s.slug} href={`/services/${s.slug}/`} className="svc__i notch">
              <span className="svc__n">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="h-m">{s.title.toLowerCase()}</h3>
              <p className="body">{s.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
