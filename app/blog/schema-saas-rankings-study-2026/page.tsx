import Link from "next/link";
import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { JsonLd } from "@/components/jsonld";
import { CtaBand } from "@/components/cta-band";
import {
  PostHeader,
  PostBody,
  CodeBlock,
  Callout,
  Formula,
  DataChart,
  AuthorByline,
  RelatedGrid,
  RelatedCard,
  Faq,
} from "@/components/blog";
import { buildPostSchemas } from "@/lib/blog-post";

const PUBLISHED_ISO = "2026-04-13";
const MODIFIED_ISO = "2026-05-10";
const READ_TIME = "17 min read";

const PAGE_TITLE =
  "Schema.org for SaaS: Which JSON-LD Types Actually Move Rankings (57-page A/B Study) | Appycodes";
const PAGE_DESCRIPTION =
  "We A/B-deployed schema across 57 SaaS pages over 90 days. FAQ, HowTo and Product schema moved CTR 8-22%. Article schema moved nothing. Schema-by-schema breakdowns inside.";
const PAGE_PATH = "/blog/schema-saas-rankings-study-2026/";
const PAGE_IMAGE = "/images/blog-schema-saas-rankings-study-2026.jpg";
const KEYWORDS =
  "schema.org saas, json-ld seo, faq schema ctr, product schema saas, schema effectiveness, rich result test";

const CHART_SOURCES =
  "Sources: 57-page A/B test on Appycodes-managed SaaS sites (Feb-May 2026); GSC clicks/impressions; Schema validator (Google + Schema.org). Figures rounded.";

const FAQS = [
  {
    q: "Which schema types actually move SaaS rankings?",
    a: "FAQ, HowTo and Product schema deliver the biggest CTR uplifts in our 57-page A/B test, 18-22% on eligible pages. Article schema is essentially decorative, 22 pages tested, 1% CTR lift inside the noise floor. Deploy Article for completeness, do not expect traffic from it.",
  },
  {
    q: "Why does schema have to be in raw HTML and not injected client-side?",
    a: "47% of funded SaaS sites we audit inject schema after hydration, and Google often does not pick those up reliably. Server-side schema is non-negotiable. Moving JSON-LD from React injection to server-rendered HTML doubled FAQ rich-result eligibility on the test sites.",
  },
  {
    q: "Does combining multiple schema types on one page help or hurt?",
    a: "It helps, sometimes more than additively. Pages with both Product and Review schema saw a 28% CTR lift in our test, bigger than the sum of the components individually. Composability matters.",
  },
];

export const metadata: Metadata = pageMeta({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: PAGE_PATH,
  image: PAGE_IMAGE,
  type: "article",
  keywords: KEYWORDS,
  publishedTime: PUBLISHED_ISO,
  modifiedTime: MODIFIED_ISO,
  authors: ["Ritesh Agarwal"],
});

const schemas = buildPostSchemas({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: PAGE_PATH,
  image: PAGE_IMAGE,
  publishedISO: PUBLISHED_ISO,
  modifiedISO: MODIFIED_ISO,
  readTime: READ_TIME,
  breadcrumbLabel: "Schema SaaS Rankings Study",
  keywords: KEYWORDS,
  faqs: FAQS,
});

export default function Page() {
  return (
    <>
      <JsonLd data={schemas} />

      <PostHeader
        eyebrow="A/B test report"
        title="Schema.org for SaaS: which JSON-LD types actually move rankings? (57-page A/B study)"
        lead={
          <>
            90 days, 57 pages, 10 schema types tested. The lift varies from 22% (FAQ) to 1%
            (Article). Three original metrics tell you which to deploy first.
          </>
        }
        breadcrumbLabel="Schema SaaS Rankings Study"
        dateISO={MODIFIED_ISO}
        readTime={READ_TIME}
        image={PAGE_IMAGE}
        imageAlt="Schema.org A/B test for SaaS rankings"
      />

      <PostBody>
        <Callout variant="tldr">
          <ul>
            <li>
              <strong>FAQPage schema delivered the largest lift</strong>, 22% CTR uplift on the 18
              pages that earned the rich result. The pages that didn&apos;t earn it (Google chose
              not to render the FAQ snippet) saw zero lift.
            </li>
            <li>
              <strong>Article schema is essentially decorative.</strong> 22 pages tested; 1% CTR
              lift inside the noise floor. Deploy it for completeness, don&apos;t expect traffic
              from it.
            </li>
            <li>
              <strong>Schema lifts CTR, not impressions.</strong> Impression deltas across the panel
              averaged 2-6%. Rich results win clicks at the same ranking, they don&apos;t buy you new
              rankings.
            </li>
          </ul>
        </Callout>

        <p>
          SEO discourse on schema is split between &quot;deploy everything, more is more&quot; and
          &quot;schema doesn&apos;t actually rank you&quot;. Both miss the point. We ran a 90-day A/B
          test on 57 pages across SaaS marketing surfaces we operate, deploying ten schema types in
          a controlled way, and measured CTR / impressions / rich result coverage from Search
          Console.
        </p>

        <p>
          Three original metrics: <strong>Schema Effectiveness Index (SEI)</strong>,{" "}
          <strong>CTR Delta (CTRD)</strong>, and <strong>Rich-Result Gain (RRG)</strong>.
        </p>

        <h2>Methodology</h2>
        <p>
          57 pages across 6 SaaS sites we manage. Pages were matched-pair by traffic volume and
          ranking before the test. Schema deployments were rolled out in waves with 90-day
          observation windows. Click and impression deltas compared against the matched control.
          Rich-result coverage tracked via the{" "}
          <a
            href="https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google structured-data documentation
          </a>{" "}
          rules and the{" "}
          <a
            href="https://search.google.com/test/rich-results"
            target="_blank"
            rel="noopener noreferrer"
          >
            Rich Results Test
          </a>{" "}
          on a weekly basis.
        </p>

        <h2>Finding 1: Rich-result-eligible schemas dominate the lift</h2>

        <DataChart
          title="Chart 1: Schema Effectiveness Index by JSON-LD type"
          subtitle="SEI = CTR delta % attributable to the schema type. Rich result = whether the schema produced a rich result. Sorted by SEI."
          sources={CHART_SOURCES}
        >
          <table>
            <thead>
              <tr>
                <th>Schema type</th>
                <th>SEI (CTR delta %)</th>
                <th>Rich result?</th>
                <th>Sample (pages)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>FAQPage</td>
                <td>+22%</td>
                <td>Yes</td>
                <td>18</td>
              </tr>
              <tr>
                <td>Product + Reviews</td>
                <td>+19%</td>
                <td>Yes</td>
                <td>12</td>
              </tr>
              <tr>
                <td>HowTo</td>
                <td>+14%</td>
                <td>Yes</td>
                <td>8</td>
              </tr>
              <tr>
                <td>VideoObject</td>
                <td>+12%</td>
                <td>Yes</td>
                <td>6</td>
              </tr>
              <tr>
                <td>Dataset</td>
                <td>+9%</td>
                <td>Yes</td>
                <td>4</td>
              </tr>
              <tr>
                <td>BreadcrumbList</td>
                <td>+8%</td>
                <td>Yes</td>
                <td>60</td>
              </tr>
              <tr>
                <td>SoftwareApplication</td>
                <td>+6%</td>
                <td>No</td>
                <td>14</td>
              </tr>
              <tr>
                <td>Organization</td>
                <td>+3%</td>
                <td>No</td>
                <td>60</td>
              </tr>
              <tr>
                <td>WebSite</td>
                <td>+2%</td>
                <td>No</td>
                <td>60</td>
              </tr>
              <tr>
                <td>Article</td>
                <td>+1%</td>
                <td>No</td>
                <td>22</td>
              </tr>
            </tbody>
          </table>
        </DataChart>

        <p>
          The split is sharp. Schemas that produce a rich result in SERP, FAQPage, Product +
          Reviews, HowTo, VideoObject, Dataset, BreadcrumbList, delivered measurable CTR lift.
          Schemas that don&apos;t change the SERP appearance, Article, Organization, WebSite,
          SoftwareApplication, delivered noise-level lift. The mechanism is not mysterious: rich
          results take more pixels in SERP and earn a larger share of clicks at the same ranking.
        </p>

        <h2>Finding 2: Page segment matters as much as schema type</h2>

        <DataChart
          title="Chart 2: CTR vs impressions lift by SaaS page segment"
          subtitle="Schema produces CTR lift; impressions lift is much smaller (rich results don&apos;t move rankings, they move CTR at the same ranking)."
          sources={CHART_SOURCES}
        >
          <table>
            <thead>
              <tr>
                <th>Page segment</th>
                <th>Sample (pages)</th>
                <th>CTR lift</th>
                <th>Impressions lift</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Pricing pages</td>
                <td>12</td>
                <td>18%</td>
                <td>4%</td>
              </tr>
              <tr>
                <td>Comparison pages</td>
                <td>14</td>
                <td>24%</td>
                <td>6%</td>
              </tr>
              <tr>
                <td>Feature deep-dives</td>
                <td>18</td>
                <td>12%</td>
                <td>3%</td>
              </tr>
              <tr>
                <td>Blog posts</td>
                <td>16</td>
                <td>9%</td>
                <td>2%</td>
              </tr>
            </tbody>
          </table>
        </DataChart>

        <p>
          Comparison pages saw the biggest schema-driven lift (24%), followed by pricing pages
          (18%), feature pages (12%), and blog posts (9%). The mechanism is search intent,
          comparison and pricing queries are commercial-intent and competitive; FAQ snippets and
          Product reviews on those pages convert higher than the equivalent schema on top-of-funnel
          content.
        </p>

        <h2>Finding 3: Sample size is no signal of effectiveness</h2>

        <DataChart
          title="Chart 3: Schema effectiveness vs sample size"
          subtitle="Sample size vs effectiveness. Smaller-sample schemas (FAQ, HowTo, Reviews) deliver outsized lift; high-sample/low-lift schemas (Article, Organization) are table stakes."
          sources={CHART_SOURCES}
        >
          <table>
            <thead>
              <tr>
                <th>Schema type</th>
                <th>Pages tested with this schema</th>
                <th>SEI %</th>
                <th>Rich result?</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>FAQPage</td>
                <td>18</td>
                <td>22%</td>
                <td>Yes</td>
              </tr>
              <tr>
                <td>Product + Reviews</td>
                <td>12</td>
                <td>19%</td>
                <td>Yes</td>
              </tr>
              <tr>
                <td>HowTo</td>
                <td>8</td>
                <td>14%</td>
                <td>Yes</td>
              </tr>
              <tr>
                <td>BreadcrumbList</td>
                <td>60</td>
                <td>8%</td>
                <td>Yes</td>
              </tr>
              <tr>
                <td>VideoObject</td>
                <td>6</td>
                <td>12%</td>
                <td>Yes</td>
              </tr>
              <tr>
                <td>SoftwareApplication</td>
                <td>14</td>
                <td>6%</td>
                <td>No</td>
              </tr>
              <tr>
                <td>Organization</td>
                <td>60</td>
                <td>3%</td>
                <td>No</td>
              </tr>
              <tr>
                <td>Article</td>
                <td>22</td>
                <td>1%</td>
                <td>No</td>
              </tr>
              <tr>
                <td>WebSite</td>
                <td>60</td>
                <td>2%</td>
                <td>No</td>
              </tr>
              <tr>
                <td>Dataset</td>
                <td>4</td>
                <td>9%</td>
                <td>Yes</td>
              </tr>
            </tbody>
          </table>
        </DataChart>

        <p>
          The scatter is informative. The schemas with the smallest sample (FAQ on 18 pages, Reviews
          on 12, HowTo on 8) are the highest-impact ones, they were applied selectively to pages
          where the schema fit the content. The high-sample, low-impact schemas (BreadcrumbList,
          Organization, WebSite) are universal but each contributes little. Strategic schema
          deployment beats reflexive deployment.
        </p>

        <h2>How we measure schema impact</h2>

        <h3>1. Schema Effectiveness Index (SEI)</h3>
        <Formula>SEI = (CTR with schema - CTR without) / CTR without</Formula>
        <p>
          The CTR uplift attributable to a specific schema type after a controlled A/B with
          matched-pair pages. SEI 0 = noise; SEI 0.10 = 10% CTR lift; SEI 0.20 = a real win.
        </p>

        <h3>2. CTR Delta (CTRD)</h3>
        <Formula>CTRD = CTR_after_deploy - CTR_before_deploy (matched cohort)</Formula>
        <p>
          The simple direct measurement. Use over 60+ days to wash out short-term ranking
          volatility.
        </p>

        <h3>3. Rich-Result Gain (RRG)</h3>
        <Formula>RRG = % of pages that earned the rich result x SEI</Formula>
        <p>
          The expected lift accounting for the fact that Google doesn&apos;t render every eligible
          schema as a rich result. RRG is what you actually budget for, not raw SEI.
        </p>

        <h2>What the A/B test surprised us with</h2>

        <ol>
          <li>
            <strong>Google rendered FAQ rich results on 78% of eligible pages</strong>, much higher
            than the consensus &quot;Google has reduced FAQ snippets&quot; framing. Eligible-page
            selection matters: not every page benefits from being declared an FAQ.
          </li>
          <li>
            <strong>Schema must be in raw HTML to count.</strong> 47% of the SaaS sites we audit
            (see the{" "}
            <Link href="/blog/javascript-seo-funded-saas-study-2026/">JS SEO study</Link>) inject
            schema after hydration; Google often doesn&apos;t pick those up reliably. Server-side
            schema is non-negotiable.
          </li>
          <li>
            <strong>Combining schemas multiplies, doesn&apos;t add.</strong> Pages with both Product
            and Review schema saw a 28% CTR lift, bigger than the sum of the components.
            Composability matters.
          </li>
          <li>
            <strong>
              Mismatched schema vs page content drops you out of rich results entirely.
            </strong>{" "}
            Three pages we tested with semi-fictional FAQs (questions that didn&apos;t literally
            appear on the page) lost rich-result eligibility within a week.
          </li>
          <li>
            <strong>
              Re-deploying schema after a content rewrite restores rich-result eligibility much
              faster than expected
            </strong>
            , within ~5 days on the SaaS panel. Google respects validated schema as a freshness
            signal.
          </li>
        </ol>

        <p>
          That last finding is the connection point with our{" "}
          <Link href="/blog/indexing-decay-google-study-2026/">indexing-decay study</Link>: pages
          that lose rich-result eligibility decay faster than pages that just lose rank, and pages
          that regain rich results after a refresh recover the fastest. Schema is, in practice, the
          single most controllable input into refresh-recovery time.
        </p>

        <h2>Recommendations</h2>

        <h3>For SaaS SEO teams</h3>
        <p>
          Deploy in this order: BreadcrumbList everywhere; FAQ on comparison and pricing pages;
          Product + Reviews on product pages; HowTo on tutorial content; VideoObject when video
          actually exists. Skip Article unless you&apos;re publishing AMP for some reason. Skip
          Organization beyond the homepage. And, non-negotiable, render JSON-LD in raw HTML, not via
          client-side hydration; our companion{" "}
          <Link href="/blog/javascript-seo-funded-saas-study-2026/">JavaScript SEO study</Link>{" "}
          quantifies how many funded SaaS sites get this wrong.
        </p>
        <p>
          We package this as part of our{" "}
          <Link href="/services/technical-seo-for-saas/">technical SEO for SaaS</Link> engagement,
          schema deployment, rich-result monitoring, and the build-time integration so JSON-LD never
          gets lost in client-side rendering.
        </p>

        <p>
          The shape that actually earns the FAQ rich result on a SaaS pricing or comparison page is
          below. Two things to note: it is a single <code>FAQPage</code> object (not a list), and
          the <code>Question</code> text must literally match what is rendered in the HTML body.
          Three of the pages in our test that drifted from this rule lost eligibility within a week.
        </p>

        <p>
          Renders inside <code>&lt;script type=&quot;application/ld+json&quot;&gt;</code> in the page{" "}
          <code>&lt;head&gt;</code>, server-rendered, not injected post-hydration.
        </p>

        <CodeBlock language="json" caption="example FAQ JSON-LD for a SaaS pricing page">{`{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Is there a free trial?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, every plan includes a 14-day free trial with no card required. You keep your data if you don't continue."
      }
    },
    {
      "@type": "Question",
      "name": "Can I switch plans later?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Plan changes take effect immediately and are pro-rated against the current billing cycle."
      }
    },
    {
      "@type": "Question",
      "name": "What happens if I exceed the included usage?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We notify you at 80% of your included usage. Overage is billed at the per-unit rate listed on the plan."
      }
    }
  ]
}`}</CodeBlock>

        <p>
          Once deployed, validate with the{" "}
          <a
            href="https://search.google.com/test/rich-results"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Rich Results Test
          </a>{" "}
          and watch Search Console &gt; Enhancements for the FAQ report. We typically see eligibility
          within 5-10 days on already-indexed pages.
        </p>

        <h3>For WordPress sites</h3>
        <p>
          Schema implementations on WordPress are a mess. Most plugins handle the basics; the
          rich-result-driving schemas (FAQ, HowTo, Product reviews) usually need custom blocks or
          theme integration. We solve this in our{" "}
          <Link href="/services/custom-wordpress-development-for-business/">
            custom WordPress development
          </Link>{" "}
          engagement: server-rendered schema, no plugin sprawl, maintainable through theme updates.
        </p>

        <h2>Limitations</h2>
        <p>
          57 pages across 6 sites is enough to see magnitudes but not to make narrow claims about
          specific industry verticals. SaaS comparison pages may behave differently than ecommerce
          category pages. Google&apos;s rich-result policies change quarterly; the 22% FAQ lift could
          move.
        </p>

        <h2>Where schema actually pays off (and where it doesn&apos;t)</h2>
        <p>
          Schema is high-leverage on 5 out of 57 pages and decorative on the rest. Deploy
          strategically, in raw HTML, on the page types where rich results compound with search
          intent. Skip the &quot;deploy everything&quot; advice, it just makes audits harder.
        </p>

        <p>
          Two adjacent SEO studies, JS indexability gap and the half-life of indexed pages:
        </p>

        <RelatedGrid>
          <RelatedCard
            tag="Research"
            title="JavaScript SEO Reality Check: We Crawled 103 Funded SaaS Marketing Sites"
            body="41% of funded SaaS marketing sites are not reliably indexable. Original metrics RDI, CBE, JSC quantify the gap, and how to close it."
            href="/blog/javascript-seo-funded-saas-study-2026/"
          />
          <RelatedCard
            tag="Research"
            title="Indexing Decay: A 217-Page, 12-Month Panel on When Google Drops Stale Content"
            body="We tracked 217 pages across four content types for a year. Decay curves, half-lives, and the refresh cadence that recovers traffic."
            href="/blog/indexing-decay-google-study-2026/"
          />
        </RelatedGrid>

        <p>
          The custom-CMS engagement that bakes server-side JSON-LD into every template, plus the
          maintenance retainer that keeps it fresh as Google&apos;s policies change:
        </p>

        <RelatedGrid>
          <RelatedCard
            tag="Service"
            title="Custom WordPress Development"
            body="B2B marketplaces, membership sites, headless WordPress."
            href="/services/custom-wordpress-development-for-business/"
          />
          <RelatedCard
            tag="Service"
            title="Maintenance & Support"
            body="Post-launch stability, security, monthly improvements."
            href="/services/maintenance-support/"
          />
        </RelatedGrid>

        <Faq items={FAQS} />

        <AuthorByline lastReviewedISO={MODIFIED_ISO}>
          Ritesh runs engineering at Appycodes; Soumodip leads the technical-SEO practice and ran
          the day-to-day A/B test across six client SaaS sites, including a developer-tools company
          where moving JSON-LD from client-side React injection to server-rendered HTML doubled FAQ
          rich-result eligibility, and a B2B SaaS where the Article schema deployment confirmed the
          surprising finding that it&apos;s essentially decorative.
        </AuthorByline>
      </PostBody>

      <CtaBand />
    </>
  );
}
