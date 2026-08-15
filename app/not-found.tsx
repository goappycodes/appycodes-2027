import type { Metadata } from "next";
import Link from "next/link";
import { SERVICES_DATA } from "@/lib/services-data";
import { ServiceTitle } from "@/components/service-title";
import { ChevronRight } from "@/components/icons";
import { PageHero } from "@/components/page-hero";
import { FeaturedWork, WritingCards } from "@/components/sections";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Page not found",
  description: "That page has moved or never existed. Here is everything that has not.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "home", href: "/" }, { label: "not found" }]}
        eyebrow="error 404"
        title={
          <>
            that page has <span className="g-disp">moved</span>.
          </>
        }
        lede="Either the URL changed in the rebuild, or it never existed. Nothing else is broken — here is the way back to everything that does."
        actions={[
          { label: "back home", href: "/" },
          { label: "see the work", href: "/case-studies/", variant: "out" },
        ]}
        aside={
          <div className="next-card notch notch-lg">
            <p className="eyebrow eyebrow--slab">looking for a service?</p>
            <ol>
              {SERVICES_DATA.map((s, i) => (
                <li key={s.slug}>
                  <span className="tnum">{String(i + 1).padStart(2, "0")}</span>
                  <span>
                    <b>
                      <Link href={`/services/${s.slug}/`}>
                        <ServiceTitle label={s.title} />
                      </Link>
                    </b>
                  </span>
                </li>
              ))}
            </ol>
            <p className="next-card__mail">
              Still stuck? <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            </p>
          </div>
        }
      />

      <section className="wrap sec">
        <div className="sec__head">
          <p className="eyebrow">the main routes</p>
          <h2 className="h-l">everywhere worth going.</h2>
        </div>
        <div className="svc-sub">
          {[
            { href: "/services/", label: "All services" },
            { href: "/case-studies/", label: "Case studies" },
            { href: "/blog/", label: "Writing — cost studies & benchmarks" },
            { href: "/reviews/", label: "Client reviews" },
            { href: "/about/", label: "About the studio" },
            { href: "/contact/", label: "Start a project" },
          ].map((l) => (
            <Link key={l.href} href={l.href} className="svc-sub__i">
              <span>{l.label}</span>
              <ChevronRight className="svc-sub__chev" aria-hidden />
            </Link>
          ))}
        </div>
      </section>

      <FeaturedWork title="or just read the work" more={false} />

      <WritingCards title="or the numbers behind it" />

      <section className="cta">
        <div className="wrap cta__in">
          <div className="cta__t">
            <h2 className="h-l">landed here from a link we broke?</h2>
            <p>Tell us where you came from and we will fix the redirect.</p>
          </div>
          <a className="cta__btn notch" href={`mailto:${SITE.email}`}>
            email {SITE.email}
          </a>
        </div>
      </section>
    </>
  );
}
