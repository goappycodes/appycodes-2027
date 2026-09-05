import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/jsonld";
import { PageHero } from "@/components/page-hero";
import { siteMeta, SEO_BASE } from "@/lib/seo";
import { UK_INSIGHT_CLUSTERS } from "@/lib/uk-insights";
import styles from "@/components/uk-insights-page.module.css";

const PAGE_PATH = "/uk/insights/";

export const metadata: Metadata = siteMeta({
  title: "UK software, ecommerce and compliance insights",
  description: "Decision-led engineering guidance for UK founders and operators covering company data, payments, ecommerce, hosting, compliance and delivery.",
  path: PAGE_PATH,
  image: "/images/appycodes-systems-landscape.png",
});

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Appycodes UK insights",
    description: "UK-specific software, ecommerce and compliance implementation guidance.",
    url: `${SEO_BASE}${PAGE_PATH}`,
    inLanguage: "en-GB",
    hasPart: UK_INSIGHT_CLUSTERS.map((cluster) => ({
      "@type": "CollectionPage",
      name: cluster.title,
      url: `${SEO_BASE}/uk/insights/${cluster.slug}/`,
    })),
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SEO_BASE}/` },
      { "@type": "ListItem", position: 2, name: "UK insights", item: `${SEO_BASE}${PAGE_PATH}` },
    ],
  },
];

export default function Page() {
  const guideCount = UK_INSIGHT_CLUSTERS.reduce((total, cluster) => total + cluster.guides.length, 0);

  return (
    <>
      <JsonLd data={schemas} />
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "UK insights" }]}
        eyebrow="UK knowledge hub"
        title={<>Software decisions for the <span className="g-disp">UK operating context.</span></>}
        titleSize="md"
        lede="Primary-source research, implementation patterns and lessons from production work—for founders and operators who need the boundary between an API call and the real business decision."
        actions={[{ label: "Explore the clusters", href: "#clusters" }, { label: "Discuss a project", href: "/contact/", variant: "out" }]}
        stats={[
          { n: String(UK_INSIGHT_CLUSTERS.length), label: "decision clusters" },
          { n: String(guideCount), label: "published guides" },
          { n: "UK", label: "market-specific" },
          { n: "real", label: "delivery evidence" },
        ]}
      />

      <main className={styles.main}>
        <section className="wrap" id="clusters" aria-labelledby="cluster-title">
          <div className={styles.sectionHead}>
            <div>
              <p className="eyebrow">Three connected clusters</p>
              <h2 className="h-l" id="cluster-title">Follow the decision, not the tool category.</h2>
            </div>
            <p>
              Start where the operational risk sits: resolving a UK entity, moving money and goods, or keeping a product supportable and compliant. Each cluster joins source-backed guidance to practical implementation.
            </p>
          </div>
          <div className={styles.guideGrid}>
            {UK_INSIGHT_CLUSTERS.map((cluster) => (
              <Link href={`/uk/insights/${cluster.slug}/`} key={cluster.slug} className={styles.guideCard}>
                <span>{cluster.guides.length} guides</span>
                <h3>{cluster.title}</h3>
                <p>{cluster.description}</p>
                <strong>Open the cluster &rarr;</strong>
              </Link>
            ))}
          </div>
        </section>

        <section className={styles.principles} aria-labelledby="method-title">
          <div className="wrap">
            <div className={styles.principleIntro}>
              <p className="eyebrow">How to use this hub</p>
              <h2 className="h-l" id="method-title">Four questions before implementation.</h2>
            </div>
            <ol>
              <li><span>01</span>What exact business decision must the system make?</li>
              <li><span>02</span>Which primary source supports each factual assumption?</li>
              <li><span>03</span>What happens when the API, supplier or user input is wrong or unavailable?</li>
              <li><span>04</span>What evidence, ownership and recovery path remain after launch?</li>
            </ol>
          </div>
        </section>

        <section className={`wrap ${styles.guides}`} aria-labelledby="latest-title">
          <div className={styles.sectionHead}>
            <div>
              <p className="eyebrow">Start here</p>
              <h2 className="h-l" id="latest-title">The newest UK implementation guides.</h2>
            </div>
            <p>Direct answers near the top, detailed boundaries underneath, and code or architecture you can take into a product discussion.</p>
          </div>
          <div className={styles.guideGrid}>
            {UK_INSIGHT_CLUSTERS.flatMap((cluster) => cluster.guides).slice(0, 6).map((guide) => (
              <Link href={guide.href} key={guide.href} className={styles.guideCard}>
                <span>{guide.tag}</span><h3>{guide.title}</h3><p>{guide.description}</p><strong>Read the guide &rarr;</strong>
              </Link>
            ))}
          </div>
        </section>

        <section className={styles.scope}>
          <div className="wrap">
            <p>Technical and operational guidance only. Legal, tax, financial and compliance decisions need appropriately qualified professional advice.</p>
            <Link href="/services/product-engineering/">Explore product engineering &rarr;</Link>
          </div>
        </section>
      </main>
    </>
  );
}
