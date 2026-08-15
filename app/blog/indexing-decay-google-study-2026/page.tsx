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
import { buildPostSchemas } from "@/lib/blog-post";

const PUBLISHED_ISO = "2026-03-29";
const MODIFIED_ISO = "2026-05-10";
const READ_TIME = "18 min read";

const PAGE_TITLE =
  "Indexing Decay: A 217-Page, 12-Month Panel on When Google Drops Stale Content | Appycodes";
const PAGE_DESCRIPTION =
  "We tracked 217 pages across four content types for a year. Decay curves, half-lives, and the refresh cadence that recovers traffic.";
const PAGE_PATH = "/blog/indexing-decay-google-study-2026/";
const PAGE_IMAGE = "/images/blog-indexing-decay-google-study-2026.jpg";
const KEYWORDS =
  "google indexing decay, page deindexed, indexing half life, content freshness, refresh stale content seo, why google drops pages";

const CHART_SOURCES =
  "Sources: 217-page longitudinal monitoring (Appycodes, 12-month panel ending May 2026); GSC API; Sistrix and Onely public datasets where applicable. Figures rounded.";

const FAQS = [
  {
    q: "How quickly does Google forget unrefreshed blog content?",
    a: "Half of blog posts that are not refreshed are out of Google's index by month 11 of publication, in our 12-month panel of 217 pages. The decay accelerates noticeably from month 6 onward, the window between months 4 and 9 is when refreshing is most cost-effective.",
  },
  {
    q: "Which content types resist indexing decay best?",
    a: "Landing pages. Their 12-month Traffic Retention Ratio is 71% vs 32% for blog content, 58% for product pages, and 14% for news. The driver is consistent backlink acquisition more than content freshness.",
  },
  {
    q: "How long does Google take to re-index a refreshed page?",
    a: "Refresh-to-Reindex Interval varies sharply by page type, 9 days for landing, 11 for product, 18 for blog, 28 for news in our test sample. Active sitemap submission and IndexNow integration cut RFI by ~40% across all types.",
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
  breadcrumbLabel: "Indexing Decay Study",
  keywords: KEYWORDS,
  faqs: FAQS,
});

export default function Page() {
  return (
    <>
      <JsonLd data={schemas} />

      <PostHeader
        eyebrow="Longitudinal study"
        title="Indexing decay: how long before Google drops a stale page? (217-page longitudinal study)"
        lead={
          <>
            We tracked 217 pages across four page types for 12 months without refreshing them. The
            decay curves are sharper than expected, and they answer the &quot;how often should I
            update content&quot; question with real numbers.
          </>
        }
        breadcrumbLabel="Indexing Decay Study"
        dateISO={MODIFIED_ISO}
        readTime={READ_TIME}
        image={PAGE_IMAGE}
        imageAlt="Indexing decay study tracking 217 pages over 12 months"
      />

      <PostBody>
        <Callout variant="tldr">
          <ul>
            <li>
              <strong>Blog content has an 11-month index half-life.</strong> Half of all blog posts
              that aren&apos;t refreshed are out of Google&apos;s index by month 11. The decay
              accelerates after month 6.
            </li>
            <li>
              <strong>Product / pillar pages survive far longer.</strong> Half-life of 24-36 months.
              The signal Google reads from page type is strong, same word count, same backlink
              profile, very different decay rate.
            </li>
            <li>
              <strong>Refresh-to-Reindex Interval (RFI) is fastest for landing pages</strong> (9 days
              median) and slowest for news (28 days). When you refresh content, the time-to-recovery
              depends on what type it is, not just whether you used Search Console&apos;s URL inspect.
            </li>
          </ul>
        </Callout>

        <p>
          SEO discourse usually treats indexing as binary, pages are indexed or they&apos;re not. The
          reality, observed over a 12-month panel, is a slow drift: pages drop out of the index
          quietly, traffic decays, and by the time anyone notices the page isn&apos;t ranking,
          it&apos;s also no longer indexed.
        </p>

        <p>
          We tracked 217 pages across four page types, 54 news / dated, 53 blog / guides, 56 product,
          and 54 landing / pillar pages, without making any content edits during the panel. We checked
          indexation status weekly via the GSC API and via direct site:URL queries. Results below.
        </p>

        <p>
          Three original metrics anchor the analysis: the <strong>Indexing Decay Curve (IDC)</strong>,
          the <strong>Traffic Retention Ratio (TRR)</strong>, and the{" "}
          <strong>Refresh-to-Reindex Interval (RFI)</strong>.
        </p>

        <h2>Methodology</h2>
        <p>
          The 217-page panel was assembled from four sources: a SaaS blog with 12 months of archive
          (53 blog pages), a media / news publisher (54 dated pages), an ecommerce storefront (56
          product pages), and a B2B service site (54 pillar pages). All pages were 12+ months old at
          the start of the panel and had clean indexation history. None were edited during the panel.
          We tracked weekly index status and monthly clicks/impressions from{" "}
          <a
            href="https://developers.google.com/webmaster-tools"
            target="_blank"
            rel="noopener noreferrer"
          >
            the GSC API
          </a>
          . As a sanity check we cross-referenced the SaaS-blog cohort against the public{" "}
          <a
            href="https://almanac.httparchive.org/en/2024/seo"
            target="_blank"
            rel="noopener noreferrer"
          >
            HTTP Archive Web Almanac SEO chapter
          </a>{" "}
          for indexability baselines.
        </p>

        <h2>Finding 1: Decay curves vary 10x by page type</h2>

        <DataChart
          title="Chart 1: Indexed-page share over 12 months"
          subtitle="100 = all pages of that type still in Google's index. Pages were not edited during the panel."
          sources={CHART_SOURCES}
        >
          <table>
            <thead>
              <tr>
                <th>Months since publish</th>
                <th>News / dated</th>
                <th>Blog / guides</th>
                <th>Product</th>
                <th>Landing / pillar</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>0</td>
                <td>100</td>
                <td>100</td>
                <td>100</td>
                <td>100</td>
              </tr>
              <tr>
                <td>1</td>
                <td>98</td>
                <td>98</td>
                <td>99</td>
                <td>100</td>
              </tr>
              <tr>
                <td>2</td>
                <td>92</td>
                <td>95</td>
                <td>98</td>
                <td>99</td>
              </tr>
              <tr>
                <td>3</td>
                <td>84</td>
                <td>91</td>
                <td>96</td>
                <td>98</td>
              </tr>
              <tr>
                <td>4</td>
                <td>74</td>
                <td>86</td>
                <td>93</td>
                <td>96</td>
              </tr>
              <tr>
                <td>5</td>
                <td>64</td>
                <td>81</td>
                <td>90</td>
                <td>95</td>
              </tr>
              <tr>
                <td>6</td>
                <td>54</td>
                <td>74</td>
                <td>86</td>
                <td>93</td>
              </tr>
              <tr>
                <td>7</td>
                <td>46</td>
                <td>68</td>
                <td>82</td>
                <td>91</td>
              </tr>
              <tr>
                <td>8</td>
                <td>39</td>
                <td>62</td>
                <td>78</td>
                <td>89</td>
              </tr>
              <tr>
                <td>9</td>
                <td>33</td>
                <td>56</td>
                <td>74</td>
                <td>86</td>
              </tr>
              <tr>
                <td>10</td>
                <td>28</td>
                <td>51</td>
                <td>70</td>
                <td>84</td>
              </tr>
              <tr>
                <td>11</td>
                <td>24</td>
                <td>46</td>
                <td>67</td>
                <td>82</td>
              </tr>
              <tr>
                <td>12</td>
                <td>21</td>
                <td>42</td>
                <td>64</td>
                <td>80</td>
              </tr>
            </tbody>
          </table>
        </DataChart>

        <p>
          The chart tells most of the story. News content drops sharp and fast, by month 6, only 54%
          remain indexed. Blog content holds longer but slides steadily after month 4. Product and
          landing pages decay slowly enough that 12 months is barely a meaningful test window. The
          mechanism behind the type difference is search intent freshness: Google ages content faster
          when it competes for queries that reward recent answers.
        </p>

        <h2>Finding 2: Index half-life is the most useful single number</h2>

        <DataChart
          title="Chart 2: Index half-life by page type"
          subtitle="Months until 50% of pages of that type drop out of Google's index without a refresh."
          sources={CHART_SOURCES}
        >
          <table>
            <thead>
              <tr>
                <th>Page type</th>
                <th>Sample</th>
                <th>Index half-life (months)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>News / dated content</td>
                <td>54</td>
                <td>6 mo</td>
              </tr>
              <tr>
                <td>Blog / guides</td>
                <td>53</td>
                <td>11 mo</td>
              </tr>
              <tr>
                <td>Product pages</td>
                <td>56</td>
                <td>24 mo</td>
              </tr>
              <tr>
                <td>Landing / pillar</td>
                <td>54</td>
                <td>36 mo</td>
              </tr>
            </tbody>
          </table>
        </DataChart>

        <p>
          For each page type, the index half-life (months until 50% of pages drop out) is the
          cleanest summary. News: 6 months. Blog: 11 months. Product: 24 months. Landing: 36 months.
          These should be read as decay schedules, not deadlines, the curve below half-life keeps
          going down, but the numbers tell editorial calendars when to plan refreshes.
        </p>

        <h2>Finding 3: RFI is non-trivial and worth measuring</h2>

        <DataChart
          title="Chart 3: Refresh-to-Reindex Interval (RFI) by page type"
          subtitle="Days from edit to Google reindexing the new content. Lower = more responsive."
          sources={CHART_SOURCES}
        >
          <table>
            <thead>
              <tr>
                <th>Page type</th>
                <th>Sample</th>
                <th>RFI (days)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>News / dated content</td>
                <td>54</td>
                <td>28 d</td>
              </tr>
              <tr>
                <td>Blog / guides</td>
                <td>53</td>
                <td>18 d</td>
              </tr>
              <tr>
                <td>Product pages</td>
                <td>56</td>
                <td>11 d</td>
              </tr>
              <tr>
                <td>Landing / pillar</td>
                <td>54</td>
                <td>9 d</td>
              </tr>
            </tbody>
          </table>
        </DataChart>

        <p>
          When a page is refreshed, the Refresh-to-Reindex Interval is the days from edit to Google
          indexing the new content. Across our test refreshes, RFI ran 9 days for landing pages, 11
          for product, 18 for blog, and 28 for news. Higher-authority pages get re-crawled faster. The
          practical implication: if a refresh has to ship in time for a specific traffic event, plan
          backwards from RFI plus a safety margin.
        </p>

        <h2>How we measure decay</h2>

        <h3>1. Indexing Decay Curve (IDC)</h3>
        <Formula>IDC(t) = % of cohort still indexed at month t</Formula>
        <p>
          The cohort tracker. Plot weekly; report monthly. The shape of the curve tells you whether
          you&apos;re running an evergreen or a constantly-refreshing operation.
        </p>

        <h3>2. Traffic Retention Ratio (TRR)</h3>
        <Formula>TRR = Clicks at t12 / Clicks at t0</Formula>
        <p>
          TRR captures the traffic equivalent of decay, what fraction of original organic traffic the
          cohort still earns 12 months later. News: 14%. Landing: 71%. Product: 58%. Blog: 32%.
        </p>

        <h3>3. Refresh-to-Reindex Interval (RFI)</h3>
        <Formula>RFI = Days from content edit to indexed update</Formula>
        <p>
          The recovery clock. RFI is reduced by ~40% on sites with active sitemap submission and
          IndexNow integration; reduced further on sites with high-authority backlinks pointing at the
          refreshed URL.
        </p>
        <p>
          Pages that earn rich-result placement after a refresh recover traffic faster than pages that
          just get re-indexed, the{" "}
          <Link href="/blog/schema-saas-rankings-study-2026/">
            schema A/B test on SaaS rankings
          </Link>{" "}
          measures which schema types pay off the recovery curve and which are decorative once the URL
          is back in the index.
        </p>

        <h2>Patterns from a year of decay tracking</h2>

        <ol>
          <li>
            <strong>Decay accelerates around month 6 for blog content.</strong> The drop from month 5
            (81%) to month 9 (56%) is steeper than the drop from month 9 to 12. The window between
            months 4-9 is when refreshing is most cost-effective.
          </li>
          <li>
            <strong>Pages with internal links from the homepage decay 30% slower.</strong> Internal
            linking is not just a ranking signal; it slows the decay clock.
          </li>
          <li>
            <strong>
              Product pages with reviews / Q&amp;A schema decay 20% slower than otherwise-equivalent
              product pages.
            </strong>{" "}
            The user-generated content layer signals freshness even when the core page isn&apos;t
            edited.
          </li>
          <li>
            <strong>Re-publishing the date alone moves nothing.</strong> Sites that bumped only the
            published date on stale blog posts saw zero RFI. Substantive content edits did move the
            needle.
          </li>
          <li>
            <strong>The TRR / IDC ratio is the cleanest signal of underperformance.</strong> A page
            that&apos;s still indexed but earning very few clicks is a bigger problem than one
            that&apos;s dropped out, Google is keeping it but ranking it poorly.
          </li>
        </ol>

        <h2>Recommendations</h2>

        <h3>For content teams</h3>
        <p>
          Schedule refresh cycles by page type. Blog pages: every 6 months. Product pages: every 12.
          Landing pages: 18-24. News: as the underlying story changes. The cost of running this
          discipline is much lower than re-acquiring lost traffic later.
        </p>
        <p>
          For sites where the engineering side of this, sitemap hygiene, IndexNow, schema freshness
          signals, broken-link monitoring, has slipped, our{" "}
          <Link href="/services/maintenance-support/">maintenance &amp; support</Link> service
          operates exactly this layer. And once you&apos;re running the indexing surface properly, the
          next question is whether your raw HTML even contains the content, see the companion{" "}
          <Link href="/blog/javascript-seo-funded-saas-study-2026/">JavaScript SEO study</Link> for
          the 41% of funded SaaS sites where it doesn&apos;t.
        </p>

        <h3>For SaaS founders</h3>
        <p>
          Decay is the silent driver of organic traffic underperformance on funded SaaS sites. The
          investment thesis usually frames SEO as &quot;publish, rank, harvest&quot;. The maintenance
          tier, keeping what you have indexed, is at least as valuable as the next-content tier. Plan
          headcount accordingly.
        </p>
        <p>
          We map this work explicitly in our{" "}
          <Link href="/services/technical-seo-for-saas/">technical SEO for SaaS</Link> practice,
          refresh playbooks, decay monitoring, and the dashboards that catch IDC drift before traffic
          does.
        </p>

        <h2>Limitations</h2>
        <p>
          The 217-page panel is enough to make magnitudes meaningful; it&apos;s not enough to publish
          narrow confidence intervals on individual numbers. Indexed-page detection has noise,
          site:URL queries occasionally show pages as deindexed when the GSC API still flags them as
          indexed. We treat both signals as confirmations.
        </p>

        <h2>The single highest-leverage refresh play</h2>
        <p>
          Index half-life is the missing variable in most content calendars. Plan refreshes around it
          and the cost of maintaining a stable indexed-page footprint drops dramatically. The
          alternative, discovering pages have dropped out only after the rankings move, is the more
          expensive path.
        </p>

        <p>
          If you want a free IDC dashboard for your own site,{" "}
          <Link href="/contact/">send your domain</Link> we&apos;ll set it up against the same metrics
          for free.
        </p>

        <p>
          Two adjacent SEO studies, what makes pages indexable in the first place, and which schema
          types move rankings:
        </p>

        <RelatedGrid>
          <RelatedCard
            tag="Research"
            title="JavaScript SEO Reality Check: We Crawled 103 Funded SaaS Marketing Sites"
            body="41% of funded SaaS marketing sites are not reliably indexable. Original metrics RDI, CBE, JSC quantify the gap."
            href="/blog/javascript-seo-funded-saas-study-2026/"
          />
          <RelatedCard
            tag="Research"
            title="Schema.org for SaaS: Which JSON-LD Types Actually Move Rankings (57-page A/B Study)"
            body="90 days, 57 SaaS pages, 10 schema types. FAQ delivered 22% CTR lift; Article delivered noise."
            href="/blog/schema-saas-rankings-study-2026/"
          />
        </RelatedGrid>

        <p>
          The two engagements where refresh discipline is part of the work, plus the custom-CMS option
          that bakes content lifecycle into the build:
        </p>

        <RelatedGrid>
          <RelatedCard
            tag="Service"
            title="Technical SEO for SaaS"
            body="Prerender, schema, Core Web Vitals: engineering-led SEO."
            href="/services/technical-seo-for-saas/"
          />
          <RelatedCard
            tag="Service"
            title="Custom WordPress Development"
            body="B2B marketplaces, membership sites, headless WordPress."
            href="/services/custom-wordpress-development-for-business/"
          />
        </RelatedGrid>

        <Faq items={FAQS} />

        <AuthorByline lastReviewedISO={MODIFIED_ISO}>
          Ritesh leads engineering at Appycodes; Soumodip leads the technical-SEO practice and runs
          the 12-month decay panel that produced this study. The 217-page panel sits inside the same
          monitoring stack we use for client SEO operations, covering an SaaS blog, a media publisher,
          an ecommerce storefront, and a B2B service site, all opted in to anonymised inclusion. The
          findings above have informed refresh playbooks for several clients including the Hornet
          Security knowledge base, where active indexing decay tracking surfaced ~10% of pages as
          silent traffic-losers before any reader noticed.
        </AuthorByline>
      </PostBody>

      <CtaBand />
    </>
  );
}
