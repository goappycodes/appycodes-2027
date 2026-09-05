import Link from "next/link";
import { JsonLd } from "@/components/jsonld";
import { PageHero } from "@/components/page-hero";
import { SEO_BASE } from "@/lib/seo";
import type { UkInsightCluster } from "@/lib/uk-insights";
import styles from "./uk-insights-page.module.css";

export function UkInsightClusterPage({ cluster }: { cluster: UkInsightCluster }) {
  const path = `/uk/insights/${cluster.slug}/`;
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: cluster.title,
      description: cluster.description,
      url: `${SEO_BASE}${path}`,
      inLanguage: "en-GB",
      mainEntity: {
        "@type": "ItemList",
        itemListElement: cluster.guides.map((guide, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: guide.title,
          url: `${SEO_BASE}${guide.href}`,
        })),
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SEO_BASE}/` },
        { "@type": "ListItem", position: 2, name: "UK insights", item: `${SEO_BASE}/uk/insights/` },
        { "@type": "ListItem", position: 3, name: cluster.shortTitle, item: `${SEO_BASE}${path}` },
      ],
    },
  ];

  return (
    <>
      <JsonLd data={schemas} />
      <PageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: "UK insights", href: "/uk/insights/" },
          { label: cluster.shortTitle },
        ]}
        eyebrow="UK implementation guides"
        title={cluster.title}
        titleSize="md"
        lede={cluster.lede}
        actions={[
          { label: "Read the guides", href: "#guides" },
          { label: "Discuss a UK project", href: "/contact/", variant: "out" },
        ]}
        media={{ src: cluster.image, alt: "", caption: `${cluster.guides.length} practical guides in this cluster` }}
        mediaContain
        stats={[
          { n: String(cluster.guides.length), label: "published guides" },
          { n: "UK", label: "market-specific" },
          { n: "source", label: "linked at each claim" },
          { n: "2015", label: "shipping since" },
        ]}
      />

      <main className={styles.main}>
        <section className="wrap" aria-labelledby="decision-title">
          <div className={styles.sectionHead}>
            <div>
              <p className="eyebrow">Decision overview</p>
              <h2 className="h-l" id="decision-title">Start with the business decision.</h2>
            </div>
            <p>{cluster.description}</p>
          </div>
          <div className={styles.decisionGrid}>
            {cluster.decisions.map((decision, index) => (
              <article key={decision.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{decision.title}</h3>
                <p>{decision.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.principles}>
          <div className="wrap">
            <div className={styles.principleIntro}>
              <p className="eyebrow">Working principles</p>
              <h2 className="h-l">Controls that travel between projects.</h2>
            </div>
            <ol>
              {cluster.principles.map((principle, index) => (
                <li key={principle}><span>{String(index + 1).padStart(2, "0")}</span>{principle}</li>
              ))}
            </ol>
          </div>
        </section>

        <section className={`wrap ${styles.guides}`} id="guides" aria-labelledby="guides-title">
          <div className={styles.sectionHead}>
            <div>
              <p className="eyebrow">Published guidance</p>
              <h2 className="h-l" id="guides-title">Implementation detail, with the boundary shown.</h2>
            </div>
            <p>Each guide states what the cited source supports, what still needs product or professional judgement, and how the integration fails in practice.</p>
          </div>
          <div className={styles.guideGrid}>
            {cluster.guides.map((guide) => (
              <Link href={guide.href} key={guide.href} className={styles.guideCard}>
                <span>{guide.tag}</span>
                <h3>{guide.title}</h3>
                <p>{guide.description}</p>
                <strong>Read the guide &rarr;</strong>
              </Link>
            ))}
          </div>
        </section>

        <section className={styles.scope}>
          <div className="wrap">
            <p>
              These pages provide technical and operational guidance, not legal, tax, financial or compliance advice.
              Confirm regulated decisions with an appropriately qualified UK adviser.
            </p>
            <Link href="/uk/insights/">Explore all UK insight clusters &rarr;</Link>
          </div>
        </section>
      </main>
    </>
  );
}
