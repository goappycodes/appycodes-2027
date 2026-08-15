import type { Metadata } from "next";
import Link from "next/link";
import { SERVICES_DATA } from "@/lib/services-data";
import { ServiceTitle } from "@/components/service-title";
import { ChevronRight } from "@/components/icons";

export const metadata: Metadata = {
  title: "Services — what we do well",
  description:
    "Six things we ship repeatedly: product platforms, native mobile, AI systems, rescue and hardening, commerce and content, and performance and search.",
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
          {SERVICES_DATA.map((s) => (
            <Link key={s.slug} href={`/services/${s.slug}/`} className="svc__i notch">
              <h3 className="h-m"><ServiceTitle label={s.title} /></h3>
              <p className="body">{s.summary}</p>
              <ChevronRight className="svc__chev" aria-hidden />
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
