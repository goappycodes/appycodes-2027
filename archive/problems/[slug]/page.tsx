import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { siteMeta } from "@/lib/seo";
import { PROBLEMS, problemBySlug } from "../problems-data";
import { SERVICES_DATA } from "@/lib/services-data";
import { PageHero } from "@/components/page-hero";
import { ChevronRight } from "@/components/icons";
import { ServiceTitle } from "@/components/service-title";
import { JsonLd } from "@/components/jsonld";
import { breadcrumbSchema } from "@/lib/schema";

export function generateStaticParams() {
  return PROBLEMS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = problemBySlug(slug);
  if (!p) return {};
  return siteMeta({
    title: p.metaTitle,
    description: p.metaDescription,
    path: `/problems/${p.slug}/`,
  });
}

export default async function ProblemDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = problemBySlug(slug);
  if (!p) notFound();

  const service = SERVICES_DATA.find((s) => s.slug === p.service);
  const related = PROBLEMS.filter((x) => x.area === p.area && x.slug !== p.slug).slice(0, 3);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Problems", path: "/problems/" },
          { name: p.title, path: `/problems/${p.slug}/` },
        ])}
      />

      <PageHero
        crumbs={[
          { label: "home", href: "/" },
          { label: "problems", href: "/problems/" },
          { label: p.area },
        ]}
        eyebrow={`solved · ${p.area}`}
        titleSize="md"
        title={<ServiceTitle label={p.title} />}
        lede={p.symptom}
        actions={[
          { label: "we can fix this", href: "/contact/" },
          { label: "all problems", href: "/problems/", variant: "out" },
        ]}
      />

      <article className="wrap sec prob">
        <section className="prob__s">
          <h2 className="h-m">what was observed</h2>
          {p.observed.map((t, i) => (
            <p key={i}>{t}</p>
          ))}
        </section>

        <section className="prob__s">
          <h2 className="h-m">what it actually was</h2>
          {p.diagnosis.map((t, i) => (
            <p key={i}>{t}</p>
          ))}
        </section>

        <section className="prob__s">
          <h2 className="h-m">what we changed</h2>
          <ol className="prob__steps">
            {p.fix.map((t, i) => (
              <li key={i}>
                <span className="tnum">{String(i + 1).padStart(2, "0")}</span>
                <p>{t}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="prob__s prob__check notch">
          <h2 className="h-m">check this on your own system</h2>
          <ul>
            {p.check.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </section>

        <section className="prob__s">
          <h2 className="h-m">the general lesson</h2>
          <p className="prob__lesson">{p.lesson}</p>
        </section>

        <p className="prob__note">
          Written from a real engagement. The client is not named — the engineering is ours to
          publish, the identity is not.
        </p>
      </article>

      {service ? (
        <section className="wrap sec">
          <Link href={`/services/${service.slug}/`} className="pillar-link notch">
            <span className="pillar-link__k">the practice this sits under</span>
            <span className="pillar-link__t">
              <ServiceTitle label={service.title} />
            </span>
            <span className="pillar-link__d">{service.summary}</span>
          </Link>
        </section>
      ) : null}

      {related.length > 0 ? (
        <section className="wrap sec">
          <div className="sec__head">
            <p className="eyebrow">more in {p.area}</p>
            <h2 className="h-l">problems that travel together.</h2>
          </div>
          <div className="svc-sub">
            {related.map((r) => (
              <Link key={r.slug} href={`/problems/${r.slug}/`} className="svc-sub__i">
                <span>{r.title}</span>
                <ChevronRight className="svc-sub__chev" aria-hidden />
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <section className="cta">
        <svg className="art cta-art" viewBox="0 0 400 400" fill="none" aria-hidden="true">
          <path d="M40 120 h220 l100 100 v220 h-320 z" stroke="currentColor" strokeWidth="2.5" />
          <path d="M110 190 h150 l60 60 v150 h-210 z" stroke="currentColor" strokeWidth="2" opacity=".6" />
        </svg>
        <div className="wrap cta__in">
          <div className="cta__t">
            <h2 className="h-l">is this happening to you right now?</h2>
            <p>Tell us on the call that it is live and we will treat it that way.</p>
          </div>
          <Link className="cta__btn notch" href="/contact/">
            book a call
          </Link>
        </div>
      </section>
    </>
  );
}
