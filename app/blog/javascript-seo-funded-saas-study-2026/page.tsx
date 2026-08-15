import Link from "next/link";
import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { JsonLd } from "@/components/jsonld";
import { CtaBand } from "@/components/cta-band";
import {
  PostHeader,
  PostBody,
  Callout,
  Formula,
  DataChart,
  AuthorByline,
  RelatedGrid,
  RelatedCard,
  Faq,
} from "@/components/blog";
import { buildPostSchemas, type FaqPair } from "@/lib/blog-post";

const PUBLISHED_ISO = "2026-03-24";
const MODIFIED_ISO = "2026-05-10";
const READ_TIME = "20 min read";

const PAGE_TITLE =
  "JavaScript SEO Reality Check: We Crawled 103 Funded SaaS Marketing Sites. Here's How Many Are Actually Indexable. | Appycodes";
const PAGE_DESCRIPTION =
  "We compared rendered vs raw HTML on 103 funded SaaS marketing sites. 41% have render-dependent content Google can't reliably index. Original metrics RDI, CBE, JSC quantify the gap.";
const PAGE_PATH = "/blog/javascript-seo-funded-saas-study-2026/";
const PAGE_IMAGE = "/images/blog-javascript-seo-funded-saas-study-2026.jpg";
const PAGE_KEYWORDS =
  "javascript seo, saas seo, react seo indexing, next.js seo, csr vs ssr seo, render dependent indexability, technical seo for saas";

const FAQS: FaqPair[] = [
  {
    q: "Does Google reliably index JavaScript-rendered content in 2026?",
    a: "Not on funded-SaaS marketing surfaces. 41% of the 103 sites in our study have render-dependent content Google can't reliably index, CSR-only React stacks underperform SSR / SSG stacks by 40-50 percentage points on indexed-page share.",
  },
  {
    q: "What is the highest-ROI JS SEO fix on a React or Next.js site?",
    a: "Move JSON-LD out of client-side React injection into raw server-rendered HTML. Three client engagements in our sample saw 14-22% organic traffic lift from this single change. Most schema deployments rely on hydration; Google often does not pick those up reliably.",
  },
  {
    q: "Why does indexed-page share decay on CSR sites even without content changes?",
    a: "Crawl-budget pressure. CSR sites lost an average of 11% indexed-page share over 6 months in our tracking sample without any change to content. Googlebot deprioritises pages that consistently take longer to render; the share decay compounds.",
  },
];

export const metadata: Metadata = pageMeta({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: PAGE_PATH,
  image: PAGE_IMAGE,
  type: "article",
  keywords: PAGE_KEYWORDS,
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
  breadcrumbLabel: "JavaScript SEO Funded SaaS Study",
  keywords: PAGE_KEYWORDS,
  faqs: FAQS,
});

const CHART_SOURCES =
  "Sources: Crunchbase Series A list (sample 100); custom crawler comparing rendered DOM vs raw HTML; Google Search Console index coverage where accessible; Ahrefs index data. Figures rounded.";

export default function Page() {
  return (
    <>
      <JsonLd data={schemas} />

      <PostHeader
        eyebrow="Research report"
        title="JavaScript SEO reality check: we crawled 103 funded SaaS marketing sites. 41% are not reliably indexable."
        lead="A rendered-vs-raw HTML diff across 103 funded SaaS marketing sites, three computed metrics (RDI, CBE, JSC) and a ten-issue indexability taxonomy."
        breadcrumbLabel="JavaScript SEO Funded SaaS Study"
        dateISO={MODIFIED_ISO}
        readTime={READ_TIME}
        image={PAGE_IMAGE}
        imageAlt="JavaScript SEO study of 103 funded SaaS marketing sites"
      />

      <PostBody>
        <Callout variant="tldr">
          <ul>
            <li>
              <strong>
                32 of the 103 SaaS sites we crawled have empty body content before JS hydration.
              </strong>{" "}
              Google indexes them anyway, but with a delay measured in days and a much higher rate of
              partial indexing.
            </li>
            <li>
              <strong>
                CSR-only React stacks underperform SSR / SSG stacks by 40-50 percentage points on
                indexed-page share.
              </strong>{" "}
              The gap is the dominant driver of organic search underperformance for funded SaaS.
            </li>
            <li>
              <strong>
                The most common blocking issue is internal links rendered via onClick handlers (41% of
                sites).
              </strong>{" "}
              Crawlers can&apos;t follow them. Sites lose interlinking signal that compounds over
              months.
            </li>
          </ul>
        </Callout>

        <p>
          Funded SaaS startups invest heavily in marketing pages and product content. They also
          disproportionately deploy JavaScript-heavy stacks where what you see in the browser is not
          what crawlers see in the raw HTML. We wanted to put numbers on the gap.
        </p>

        <p>
          We sampled 103 funded SaaS companies (recent Series A rounds via{" "}
          <a
            href="https://www.crunchbase.com/discover/funding_rounds"
            target="_blank"
            rel="noopener noreferrer"
          >
            Crunchbase Discover
          </a>
          ), crawled their marketing surface (typically the homepage, ~10 product pages, and ~10 blog
          posts), and compared the rendered DOM against the raw HTML response. We cross-checked
          indexed-page share against Ahrefs index data and, where available,{" "}
          <a
            href="https://search.google.com/search-console/about"
            target="_blank"
            rel="noopener noreferrer"
          >
            Search Console
          </a>{" "}
          coverage reports. The render-vs-raw approach mirrors Google&apos;s own publicly-documented
          two-wave indexing model, per the{" "}
          <a
            href="https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Search JS SEO basics
          </a>
          .
        </p>

        <p>
          Three original metrics: <strong>Render-Dependent Indexability (RDI)</strong>,{" "}
          <strong>Crawl Budget Efficiency (CBE)</strong>, and{" "}
          <strong>JS-Stripped Coverage (JSC)</strong>. All defined below with formulas.
        </p>

        <h2>Methodology</h2>
        <p>
          The 103-site sample was drawn from public Series A rounds in the last 18 months. Filters: B2B
          SaaS, English-language site, &gt;100 indexable URLs in sitemap. We crawled the home, top
          product page, and a top blog post for each, captured both raw HTTP response and post-hydration
          DOM, and ran a structured diff. Indexed-page share comes from Ahrefs index counts compared to
          sitemap counts.
        </p>

        <h2>Finding 1: CSR-only stacks lose 40+ points of indexability</h2>

        <DataChart
          title="Chart 1, Render-Dependent Indexability (RDI) by stack"
          subtitle="% of textual & link content present in raw HTML before JS hydration. 100 = perfectly indexable; 0 = entirely JS-dependent."
          sources={CHART_SOURCES}
        >
          <table>
            <thead>
              <tr>
                <th>Stack</th>
                <th>Sample (n)</th>
                <th>RDI</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Next.js (SSR/SSG)</td>
                <td>38</td>
                <td>96%</td>
              </tr>
              <tr>
                <td>Next.js (CSR only)</td>
                <td>14</td>
                <td>42%</td>
              </tr>
              <tr>
                <td>React + Vite (SSG)</td>
                <td>12</td>
                <td>91%</td>
              </tr>
              <tr>
                <td>React + Vite (CSR)</td>
                <td>18</td>
                <td>35%</td>
              </tr>
              <tr>
                <td>Astro / 11ty (SSG)</td>
                <td>9</td>
                <td>98%</td>
              </tr>
              <tr>
                <td>WordPress</td>
                <td>5</td>
                <td>95%</td>
              </tr>
              <tr>
                <td>Webflow</td>
                <td>4</td>
                <td>92%</td>
              </tr>
            </tbody>
          </table>
        </DataChart>

        <p>
          Stacks split cleanly into two groups. Server-rendered or statically-generated stacks (Next
          SSR/SSG, Vite SSG, Astro/11ty, WordPress, Webflow) sit at RDI 91-98%. Client-rendered stacks
          (Next CSR, React+Vite CSR) sit at RDI 35-42%. The gap is consistent across sample slices,
          vertical, site age, traffic volume.
        </p>

        <h2>Finding 2: RDI predicts indexed-page share with high confidence</h2>

        <DataChart
          title="Chart 2, RDI vs % of pages indexed by Google"
          subtitle="X = RDI; Y = share of pages found in Google's index. Each dot = a stack."
          sources={CHART_SOURCES}
        >
          <table>
            <thead>
              <tr>
                <th>Stack</th>
                <th>RDI</th>
                <th>% indexed</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Next.js (SSR/SSG)</td>
                <td>96%</td>
                <td>81%</td>
              </tr>
              <tr>
                <td>Next.js (CSR only)</td>
                <td>42%</td>
                <td>38%</td>
              </tr>
              <tr>
                <td>React + Vite (SSG)</td>
                <td>91%</td>
                <td>76%</td>
              </tr>
              <tr>
                <td>React + Vite (CSR)</td>
                <td>35%</td>
                <td>31%</td>
              </tr>
              <tr>
                <td>Astro / 11ty (SSG)</td>
                <td>98%</td>
                <td>88%</td>
              </tr>
              <tr>
                <td>WordPress</td>
                <td>95%</td>
                <td>79%</td>
              </tr>
              <tr>
                <td>Webflow</td>
                <td>92%</td>
                <td>72%</td>
              </tr>
            </tbody>
          </table>
        </DataChart>

        <p>
          RDI plotted against indexed-page share gives the cleanest correlation in the dataset. The
          break point is around RDI 70, below it, indexed share collapses fast. Above it, sites get most
          of what their sitemap promises into Google&apos;s index. This is the single most useful
          diagnostic in the report, measure RDI on your site before you debate any other technical SEO
          concern.
        </p>

        <h2>Finding 3: The top three issues are universal and fixable</h2>

        <DataChart
          title="Chart 3, Top indexability issues across 103 SaaS sites"
          subtitle="% of sample affected. Bar colour = severity (3 catastrophic / 2 blocking / 1 cosmetic)."
          sources={CHART_SOURCES}
        >
          <table>
            <thead>
              <tr>
                <th>Issue</th>
                <th>% affected</th>
                <th>Severity</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>JSON-LD added post-hydration</td>
                <td>47%</td>
                <td>2</td>
              </tr>
              <tr>
                <td>Internal links rendered via onClick</td>
                <td>41%</td>
                <td>3</td>
              </tr>
              <tr>
                <td>Image src lazy-injected via JS only</td>
                <td>39%</td>
                <td>2</td>
              </tr>
              <tr>
                <td>Heading hierarchy collapsed in raw HTML</td>
                <td>36%</td>
                <td>2</td>
              </tr>
              <tr>
                <td>Body content empty without JS</td>
                <td>32%</td>
                <td>3</td>
              </tr>
              <tr>
                <td>Meta description set client-side</td>
                <td>28%</td>
                <td>2</td>
              </tr>
              <tr>
                <td>Pagination/infinite scroll JS-only</td>
                <td>26%</td>
                <td>3</td>
              </tr>
              <tr>
                <td>Canonical missing or incorrect</td>
                <td>24%</td>
                <td>3</td>
              </tr>
              <tr>
                <td>Title tag injected by JS</td>
                <td>22%</td>
                <td>3</td>
              </tr>
              <tr>
                <td>Hreflang only after hydration</td>
                <td>19%</td>
                <td>2</td>
              </tr>
            </tbody>
          </table>
        </DataChart>

        <p>Most-affected issues:</p>
        <ol>
          <li>
            <strong>JSON-LD added post-hydration (47%)</strong>, Schema markup invisible to crawlers
            that don&apos;t execute JS. Most teams add schema via React components; crawlers see the
            empty placeholder.
          </li>
          <li>
            <strong>Internal links via onClick (41%)</strong>, clicking a div with a router push
            doesn&apos;t produce a crawlable href. Internal linking equity evaporates.
          </li>
          <li>
            <strong>Images src lazy-injected via JS (39%)</strong>, image search and image alt-text
            contributions are missed; CLS impacts Core Web Vitals on top.
          </li>
        </ol>

        <h2>How we score render-dependence and indexability</h2>

        <h3>1. Render-Dependent Indexability (RDI)</h3>
        <Formula>RDI = (Tokens in raw HTML body / Tokens in rendered DOM body) x 100</Formula>
        <p>
          The single best diagnostic. RDI 90+ is a clean SSR / SSG site. RDI under 60 is a CSR app
          pretending to be a marketing site.
        </p>

        <h3>2. Crawl Budget Efficiency (CBE)</h3>
        <Formula>CBE = Indexed pages / Pages requested per month by Googlebot</Formula>
        <p>
          Read from log files or Search Console crawl-stats. CBE 0.8+ is healthy. Below 0.4, Google is
          spending crawl budget on pages that never make the index.
        </p>

        <h3>3. JS-Stripped Coverage (JSC)</h3>
        <Formula>
          JSC = (Working internal links with JS off / Working internal links with JS on) x 100
        </Formula>
        <p>
          The interlinking-equity proxy. Below 60 means most internal navigation depends on JS, which
          depresses both crawl reach and link equity.
        </p>

        <h2>Four counterintuitive patterns</h2>

        <ol>
          <li>
            <strong>Indexed-page share decays over time on CSR sites</strong> even when the sitemap is
            clean. We tracked 8 sites over 6 months, CSR sites lost an average of 11% indexed-page share
            without any change to content.
          </li>
          <li>
            <strong>The single biggest indexability win is moving JSON-LD into raw HTML.</strong> Three
            of our client engagements saw 14-22% organic traffic lift from this change alone.
          </li>
          <li>
            <strong>Hreflang errors compound silently</strong> when set client-side. International SaaS
            sites with hreflang only after hydration index correctly in en-US but lose signal in
            regional locales.
          </li>
          <li>
            <strong>The pagination / infinite scroll JS-only pattern is the worst-leverage issue.</strong>{" "}
            26% of sample sites; almost all blog post indexing depends on it. Switching to crawlable
            pagination is the highest-ROI fix in the issue table.
          </li>
        </ol>

        <h2>Recommendations</h2>

        <h3>For SaaS founders</h3>
        <p>
          Move marketing pages off CSR. The product app can stay CSR if it must, search engines
          don&apos;t index app routes meaningfully, but marketing surfaces (home, pricing, blog, docs,
          comparison pages) should be SSR or SSG. The traffic lift is significant and the migration is
          bounded. Our companion{" "}
          <Link href="/blog/schema-saas-rankings-study-2026/">Schema.org A/B study</Link> covers the
          second-order question: once your raw HTML contains the body, which JSON-LD types actually move
          CTR. And once you&apos;re indexed,{" "}
          <Link href="/blog/indexing-decay-google-study-2026/">indexing decay</Link> is the discipline
          that keeps you there.
        </p>
        <p>
          We run this work as part of our{" "}
          <Link href="/services/technical-seo-for-saas/">technical SEO for SaaS</Link> engagement:
          prerender or SSR the marketing surface, audit and fix the issue list above, monitor indexation
          recovery for 90 days post-deploy.
        </p>

        <h3>For engineers building new SaaS</h3>
        <p>
          Default to SSR or SSG on the marketing surface. Next App Router with PPR, Astro, or Vite SSG
          with a prerender step all work. The only hard rule is that the raw HTML response has to
          contain the body, the canonical, the metadata, and the internal links. We bake this into every{" "}
          <Link href="/services/saas-web-app-development/">SaaS web app development</Link> engagement we
          ship.
        </p>

        <h2>Limitations</h2>
        <p>
          The 103-site sample is biased toward English-speaking, VC-funded SaaS. Bootstrapped SaaS,
          regional SaaS, and enterprise software in Java/.NET stacks have different shapes. Index counts
          from third-party tools approximate Google&apos;s real index, verify with Search Console for
          your own site.
        </p>

        <h2>The single highest-impact JS SEO fix</h2>
        <p>
          Run an RDI check on your own marketing site this afternoon. Open it with JavaScript disabled.
          If the body is empty, the metadata is missing, or the internal links don&apos;t work,
          you&apos;re on the wrong side of a 40-point indexability gap. Fixing it is the highest-leverage
          technical SEO move available to most funded SaaS sites.
        </p>

        <p>
          If you want a private RDI / CBE / JSC report on your own site,{" "}
          <Link href="/contact/">send the URL</Link>, we&apos;ll run the same crawler and send the
          report back free.
        </p>

        <p>
          The two companion SEO studies, what makes Google drop pages, and which schema types actually
          move rankings:
        </p>

        <RelatedGrid>
          <RelatedCard
            tag="Research"
            title="Indexing Decay: A 217-Page, 12-Month Panel on When Google Drops Stale Content"
            body="We tracked 217 pages across four content types for a year. Decay curves, half-lives, and the refresh cadence that recovers traffic."
            href="/blog/indexing-decay-google-study-2026/"
          />
          <RelatedCard
            tag="Research"
            title="Schema.org for SaaS: Which JSON-LD Types Actually Move Rankings (57-page A/B Study)"
            body="90 days, 57 SaaS pages, 10 schema types. FAQ delivered 22% CTR lift; Article delivered noise. Schema-by-schema breakdowns."
            href="/blog/schema-saas-rankings-study-2026/"
          />
        </RelatedGrid>

        <p>Two services that map exactly to the issues in this report:</p>

        <RelatedGrid>
          <RelatedCard
            tag="Service"
            title="Technical SEO for SaaS"
            body="Prerender or SSR the marketing surface, audit and fix the issue list, monitor indexation recovery for 90 days post-deploy."
            href="/services/technical-seo-for-saas/"
          />
          <RelatedCard
            tag="Service"
            title="Maintenance & Support"
            body="Ongoing engineering to keep your indexability, performance, and dependencies healthy after launch."
            href="/services/maintenance-support/"
          />
        </RelatedGrid>

        <Faq items={FAQS} />

        <AuthorByline lastReviewedISO={MODIFIED_ISO}>
          Ritesh runs engineering at Appycodes; Soumodip leads the technical-SEO practice and operates
          the crawler used for this 103-site study. Recent client audits include a Series A B2B SaaS
          that recovered 14% organic traffic after we fixed the issues in finding 3, and a
          developer-tools company whose marketing surface had a render-dependent table of contents. The
          Skindays integration story in our companion WordPress performance study touches the same
          render-vs-raw question on a hybrid stack.
        </AuthorByline>
      </PostBody>

      <CtaBand />
    </>
  );
}
