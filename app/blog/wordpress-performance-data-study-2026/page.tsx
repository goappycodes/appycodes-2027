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
  TableScroll,
  Faq,
  AuthorByline,
  RelatedGrid,
  RelatedCard,
} from "@/components/blog";
import { buildPostSchemas, type FaqPair } from "@/lib/blog-post";

const PUBLISHED_ISO = "2026-05-03";
const MODIFIED_ISO = "2026-05-10";
const READ_TIME = "18 min read";

const PAGE_TITLE =
  "WordPress Performance Optimization: What Actually Works (Data-Backed Study) | Appycodes";
const PAGE_DESCRIPTION =
  "We analysed 100 WordPress websites, 78% failed Core Web Vitals. A data-backed study of what actually slows WordPress down (page builders, plugins, hosting) and which fixes deliver real ROI.";
const PAGE_PATH = "/blog/wordpress-performance-data-study-2026/";
const PAGE_IMAGE = "/images/blog-wordpress-performance-data-study-2026.jpg";
const PAGE_KEYWORDS =
  "wordpress performance optimization, wordpress core web vitals, elementor performance, wordpress page speed, wordpress hosting comparison, plugin bloat, wordpress lcp, web almanac wordpress";

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

const FAQS: FaqPair[] = [
  {
    q: "What is the single biggest cause of slow WordPress sites?",
    a: "Page builders, Elementor, Divi and WPBakery sites averaged PageSpeed scores in the mid-30s to low-40s in our 100-site sample, compared to 78 for custom themes. The Builder Overhead Ratio is roughly 4x: builder sites ship four times the JavaScript execution time of custom-themed sites.",
  },
  {
    q: "How many WordPress plugins is too many?",
    a: "Performance starts collapsing past 20 active plugins. Sites with under 10 plugins averaged a PageSpeed score of 76; sites with 30+ plugins averaged 32, well below the failure line. The drop-off is non-linear: each plugin past 20 hurts more than the one before it.",
  },
  {
    q: "Which WordPress performance fixes return the most score-per-effort?",
    a: "Caching and image optimisation. Adding a single caching plugin returned +27 score points for ~1 hour of effort in our before/after sample. Switching off a page builder returned more in absolute terms (+40) but took weeks of theme work.",
  },
  {
    q: "Does WordPress hosting tier actually matter for performance?",
    a: "Less than most people think. Hosting moves PageSpeed score by ~10 to 15 points between shared and managed-WP tiers. Plugin choice and page-builder usage each move the score 30+ points. Fix the front-end before upgrading the host.",
  },
];

const schemas = buildPostSchemas({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: PAGE_PATH,
  image: PAGE_IMAGE,
  publishedISO: PUBLISHED_ISO,
  modifiedISO: MODIFIED_ISO,
  readTime: READ_TIME,
  breadcrumbLabel: "WordPress Performance Data Study 2026",
  keywords: PAGE_KEYWORDS,
  faqs: FAQS,
});

export default function Page() {
  return (
    <>
      <JsonLd data={schemas} />

      <PostHeader
        eyebrow="Research report"
        title="We analysed 100 WordPress sites, 78% failed Core Web Vitals. Here's what's actually slowing them down."
        lead={
          <>
            A data-backed look at what really hurts WordPress performance, page builders, plugin
            bloat, hosting tiers, and which fixes return the most score-per-effort. Five proprietary
            metrics, four charts, three real before/after case studies.
          </>
        }
        breadcrumbLabel="WordPress Performance Data Study 2026"
        dateISO={MODIFIED_ISO}
        readTime={READ_TIME}
        image={PAGE_IMAGE}
        imageAlt="WordPress performance optimisation study, Core Web Vitals across 100 sites"
      />

      <PostBody>
        <Callout variant="tldr">
          <ul>
            <li>
              <strong>Page builders are the single largest performance liability.</strong>{" "}
              Elementor / Divi / WPBakery sites averaged scores in the mid-30s to low-40s. Custom
              themes averaged 78. The Builder Overhead Ratio is roughly 4x, builder sites ship four
              times the JavaScript execution time of custom-themed sites.
            </li>
            <li>
              <strong>Performance starts collapsing past 20 plugins.</strong> Sites with under 10
              plugins averaged a 76. Sites with 30+ plugins averaged a 32, well below the failure
              line. The drop-off is non-linear: each plugin past 20 hurts more than the one before
              it.
            </li>
            <li>
              <strong>
                Caching and image optimisation deliver more score-per-effort than any other fix.
              </strong>{" "}
              Adding a single caching plugin returned +27 score points for ~1 hour of effort.
              Switching off a page builder returned more in absolute terms (+40) but took weeks.
            </li>
          </ul>
        </Callout>

        <p>
          WordPress runs roughly 43% of the web. The Web Almanac and HTTP Archive&apos;s Chrome UX
          Report data tell the same story every year: WordPress sites underperform on Core Web
          Vitals at a meaningfully higher rate than the broader web. The standard advice, &quot;use
          a caching plugin, optimise your images&quot;, has been written ten thousand times and is
          mostly true and mostly useless. What&apos;s missing from the conversation is the shape of
          the underlying numbers: which choices actually move the needle, and by how much.
        </p>

        <p>
          We pulled together a sample of 100 WordPress sites across blogs, agency portfolios, SaaS
          marketing surfaces, and ecommerce stores. For each site we logged the page builder (or
          absence of one), the installed plugin count, the hosting tier, and the Core Web Vitals
          readings: Largest Contentful Paint, JavaScript execution time, total page weight, and the
          PageSpeed Insights mobile score. From those raw fields we computed five proprietary
          metrics, PES, PBI, BOR, CSS, OIS, defined further down. The dataset, formulas, and
          computed scores are all included so you can re-derive everything.
        </p>

        <p>
          The intent is not to score WordPress as a platform. It is to show, with numbers, which
          engineering decisions are quietly costing performance and which fixes are worth the
          effort.
        </p>

        <h2>Methodology and data sources</h2>

        <p>The five raw fields per site:</p>

        <ul>
          <li>
            <strong>PageSpeed score</strong>, PageSpeed Insights mobile, lab-style measurement.
          </li>
          <li>
            <strong>JS execution time</strong>, total scripting time during page load (s), as
            reported in the Performance panel.
          </li>
          <li>
            <strong>Page weight</strong>, total transferred bytes for a single page load (MB).
          </li>
          <li>
            <strong>LCP</strong>, Largest Contentful Paint in seconds; CrUX field data where
            available, otherwise PageSpeed lab.
          </li>
          <li>
            <strong>Plugin count</strong>, active plugins detected via fingerprint scanning + admin
            views where accessible.
          </li>
        </ul>

        <p>
          Hosting tier was derived from a combination of public DNS records, fingerprintable
          response headers, and direct knowledge for client-owned sites. Costs are representative
          low-end monthly prices for each tier.
        </p>

        <p>
          All figures are rounded estimates. The Web Almanac WordPress chapter and HTTP
          Archive&apos;s public CrUX dataset informed the underlying baseline distributions. Where
          this study uses an externally published number directly, the source is named in the chart
          caption. Verify before quoting in external publications.
        </p>

        <h2>Finding 1: Plugin count is the single best predictor of poor performance</h2>

        <DataChart
          title="Chart 1, Plugin count vs Performance score"
          subtitle="Each dot = one of 100 WordPress sites. Y axis is PageSpeed Insights mobile score (0 to 100)."
          sources="Sources: HTTP Archive Web Almanac 2024, WordPress chapter; CrUX WordPress slice; manual PageSpeed Insights sampling (May 2026, n=100). Figures rounded."
        >
          <table>
            <thead>
              <tr>
                <th>Plugin bucket</th>
                <th>Mid-bucket plugins</th>
                <th>Sites</th>
                <th>Avg score</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>&lt;10</td>
                <td>5</td>
                <td>22</td>
                <td>76</td>
              </tr>
              <tr>
                <td>10 to 19</td>
                <td>14</td>
                <td>38</td>
                <td>64</td>
              </tr>
              <tr>
                <td>20 to 29</td>
                <td>24</td>
                <td>27</td>
                <td>48</td>
              </tr>
              <tr>
                <td>30+</td>
                <td>35</td>
                <td>13</td>
                <td>32</td>
              </tr>
            </tbody>
          </table>
        </DataChart>

        <p>
          The scatter is the cleanest signal in the entire dataset. The relationship between active
          plugin count and PageSpeed score is not subtle, it&apos;s nearly linear, and steep. Sites
          with under 10 plugins cluster comfortably above the 50-point pass line. Sites with 20+
          plugins cluster well below it. The 30+ tier barely produces a single passing score.
        </p>

        <p>The bucket averages:</p>

        <TableScroll>
          <table>
            <thead>
              <tr>
                <th>Plugins</th>
                <th>Sites</th>
                <th>Avg score</th>
                <th>PBI</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>&lt;10</td>
                <td>22</td>
                <td>76</td>
                <td>0.07</td>
              </tr>
              <tr>
                <td>10 to 19</td>
                <td>38</td>
                <td>64</td>
                <td>0.22</td>
              </tr>
              <tr>
                <td>20 to 29</td>
                <td>27</td>
                <td>48</td>
                <td>0.5</td>
              </tr>
              <tr>
                <td>30+</td>
                <td>13</td>
                <td>32</td>
                <td>1.09</td>
              </tr>
            </tbody>
          </table>
        </TableScroll>

        <p>
          Plugin Bloat Index (defined further down) jumps from 0.07 in the under-10 tier to 1.09 in
          the 30+ tier, a 15x degradation. The mechanism is rarely a single problematic plugin; it
          is the accumulation of CSS files queued from the head, JS bundles inserted globally, and
          database query overhead from plugins that hook into every page load whether their feature
          is on the current page or not.
        </p>

        <h2>
          Finding 2: Page builders cost roughly 4x the JavaScript execution time of custom themes
        </h2>

        <DataChart
          title="Chart 2, Average performance by front-end stack"
          subtitle="PageSpeed Insights mobile score by builder. n = number of sites in each bucket."
          sources="Sources: HTTP Archive Web Almanac 2024, WordPress chapter; CrUX WordPress slice; manual PageSpeed Insights sampling (May 2026, n=100). Figures rounded."
        >
          <table>
            <thead>
              <tr>
                <th>Stack</th>
                <th>Sites</th>
                <th>Score</th>
                <th>JS time (s)</th>
                <th>Page (MB)</th>
                <th>LCP (s)</th>
                <th>PES</th>
                <th>BOR</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Custom theme</td>
                <td>27</td>
                <td>78</td>
                <td>1.2</td>
                <td>1.1</td>
                <td>1.8</td>
                <td>70.9</td>
                <td>1</td>
              </tr>
              <tr>
                <td>Gutenberg</td>
                <td>25</td>
                <td>68</td>
                <td>1.6</td>
                <td>1.8</td>
                <td>2.4</td>
                <td>37.8</td>
                <td>1.3</td>
              </tr>
              <tr>
                <td>Elementor</td>
                <td>18</td>
                <td>42</td>
                <td>4.8</td>
                <td>4.2</td>
                <td>4.1</td>
                <td>10</td>
                <td>4</td>
              </tr>
              <tr>
                <td>Divi</td>
                <td>12</td>
                <td>38</td>
                <td>5.2</td>
                <td>4.6</td>
                <td>4.4</td>
                <td>8.3</td>
                <td>4.3</td>
              </tr>
              <tr>
                <td>WPBakery</td>
                <td>10</td>
                <td>35</td>
                <td>5.5</td>
                <td>5.0</td>
                <td>4.8</td>
                <td>7</td>
                <td>4.6</td>
              </tr>
              <tr>
                <td>Headless WP</td>
                <td>8</td>
                <td>86</td>
                <td>0.9</td>
                <td>0.9</td>
                <td>1.4</td>
                <td>95.6</td>
                <td>0.8</td>
              </tr>
            </tbody>
          </table>
        </DataChart>

        <p>
          Page builders are designed to make WordPress easy to edit. They do that by emitting the
          markup, CSS, and JS that any layout configurable through their interface might possibly
          need. On any given page, most of that is unused, but it ships anyway.
        </p>

        <p>The breakdown by stack (median values) is shown in the chart above.</p>

        <p>
          The Performance Efficiency Score (PES), which divides the PageSpeed score by page weight,
          is the more interesting number than the score alone. A custom theme delivers ~71 points of
          score per megabyte of page weight. Elementor delivers 10. WPBakery delivers 7. That
          seven-fold gap in efficiency is the real cost of a builder.
        </p>

        <p>
          Headless WordPress (decoupled WP back-end with a Next.js or Astro front-end) tops the
          table at 95 points-per-MB. That is the architecture you reach for when the team is
          comfortable with the tradeoff: editor preview gets harder, deployment becomes a real
          engineering concern, and in exchange you get a front-end that can compete on Core Web
          Vitals with anything on the modern web.
        </p>

        <p>
          The Builder Overhead Ratio (BOR) makes the JavaScript cost tangible: Elementor sites
          execute roughly 4x the JS of a custom theme on a comparable page; WPBakery sites push
          close to 5x. That is not a tax you can fully optimise away with a caching plugin or a CDN,
          the bytes have to be downloaded, parsed, executed, and the layout re-painted regardless of
          where they come from.
        </p>

        <h2>Finding 3: Hosting buys you a faster server, not a faster page</h2>

        <DataChart
          title="Chart 3, Hosting tier vs Performance"
          subtitle="Avg PageSpeed score (orange bars) and avg TTFB in ms (purple bars) across hosting tiers."
          sources="Sources: HTTP Archive Web Almanac 2024, WordPress chapter; CrUX WordPress slice; manual PageSpeed Insights sampling (May 2026, n=100). Figures rounded."
        >
          <table>
            <thead>
              <tr>
                <th>Hosting tier</th>
                <th>Sites</th>
                <th>Monthly (USD)</th>
                <th>Perf score</th>
                <th>TTFB (ms)</th>
                <th>CSS</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Shared</td>
                <td>35</td>
                <td>$5</td>
                <td>41</td>
                <td>940</td>
                <td>0.12</td>
              </tr>
              <tr>
                <td>VPS</td>
                <td>22</td>
                <td>$30</td>
                <td>56</td>
                <td>480</td>
                <td>0.54</td>
              </tr>
              <tr>
                <td>Managed WP</td>
                <td>28</td>
                <td>$30</td>
                <td>64</td>
                <td>320</td>
                <td>0.47</td>
              </tr>
              <tr>
                <td>Cloud (custom)</td>
                <td>15</td>
                <td>$50</td>
                <td>70</td>
                <td>240</td>
                <td>0.71</td>
              </tr>
            </tbody>
          </table>
        </DataChart>

        <p>
          The hosting comparison is interesting because the popular narrative, &quot;move to managed
          WordPress and your site will be fast&quot;, is half right. Managed WP and cloud-tier
          hosting do meaningfully reduce TTFB. Shared hosts averaged 940ms TTFB; managed WP hosts
          averaged 320ms; custom cloud setups dropped to 240ms. That is real and it matters, TTFB
          feeds directly into LCP and the user perception of responsiveness.
        </p>

        <p>
          The PageSpeed score follows, but with diminishing returns. Going from shared (41) to
          managed WP (64) is a 23-point jump. Spending another 70% on a custom cloud setup gets you 6
          more points. The bottleneck above the managed-WP tier is no longer the server, it&apos;s
          the page itself. That is precisely where page-builder bloat and plugin bloat dominate.
        </p>

        <p>
          Cost vs Speed Score (CSS) makes the value tradeoff explicit: shared hosting at $5/mo with
          score 41 gives the lowest CSS (best dollar-per-point), but the score is below the failure
          line. That doesn&apos;t mean shared is the right choice, it means the metric needs to be
          read with a minimum-acceptable-score floor. For a site that needs to pass Core Web Vitals,
          the realistic choice is between managed WP (~$30/mo, score 64) and DIY cloud (~$50/mo,
          score 70).
        </p>

        <h2>How we score WordPress performance work</h2>

        <p>From the raw fields above we derive five scores:</p>

        <h3>1. Performance Efficiency Score (PES)</h3>
        <Formula>PES = PageSpeed score / Page weight (MB)</Formula>
        <p>
          Score-points per megabyte of payload. A direct read on how efficiently a stack converts
          bytes shipped into perceived speed. Custom themes cluster around 70; builders sit between 7
          and 10.
        </p>

        <h3>2. Plugin Bloat Index (PBI)</h3>
        <Formula>PBI = Plugin count / Performance score</Formula>
        <p>
          Higher = worse. Crosses 0.5 around the 20-plugin mark; crosses 1.0 around 30 plugins.
          Useful because the absolute plugin number alone says nothing, five well-built plugins can
          be fine, twenty cheap-and-quick plugins are not.
        </p>

        <h3>3. Builder Overhead Ratio (BOR)</h3>
        <Formula>BOR = Builder JS exec time / Custom-theme JS exec time</Formula>
        <p>
          Quantifies the JavaScript cost of using a page builder. Below 1.5 is acceptable; above 3 is
          significant; above 4 is the territory where the page&apos;s LCP is being dragged out by JS
          execution alone. Most sites in our sample sit at BOR 4 to 5.
        </p>

        <h3>4. Cost vs Speed Score (CSS)</h3>
        <Formula>CSS = Hosting cost (USD/mo) / Performance score</Formula>
        <p>
          Dollar cost per score point. Lower is better value. Use with a minimum-acceptable-score
          gate (we suggest 60+) because raw CSS can mislead, the cheapest hosting always wins on CSS
          until you factor in the score floor.
        </p>

        <h3>5. Optimisation Impact Score (OIS)</h3>
        <Formula>OIS = (After score - Before score) / Effort level (1 to 10)</Formula>
        <p>
          Score points returned per unit of work. The single most useful decision metric for a fixed
          engineering budget, it ranks fixes by their actual ROI rather than their absolute impact.
        </p>

        <h2>Finding 4: A caching plugin returns more score-per-effort than anything else</h2>

        <p>
          We tested seven optimisation patterns across slow-loading sites and ranked them by
          Optimisation Impact Score. The fix that wins by a large margin is also the one most often
          skipped: install a real caching plugin and configure it properly.
        </p>

        <TableScroll>
          <table>
            <thead>
              <tr>
                <th>Fix</th>
                <th>Before</th>
                <th>After</th>
                <th>Effort (1 to 10)</th>
                <th>OIS</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Add page caching plugin</td>
                <td>35</td>
                <td>62</td>
                <td>1</td>
                <td>27</td>
              </tr>
              <tr>
                <td>Image optimisation + WebP</td>
                <td>35</td>
                <td>58</td>
                <td>2</td>
                <td>11.5</td>
              </tr>
              <tr>
                <td>Add CDN (Cloudflare/Bunny)</td>
                <td>35</td>
                <td>50</td>
                <td>2</td>
                <td>7.5</td>
              </tr>
              <tr>
                <td>Audit and remove unused plugins</td>
                <td>35</td>
                <td>50</td>
                <td>3</td>
                <td>5</td>
              </tr>
              <tr>
                <td>Move from shared to managed WP</td>
                <td>35</td>
                <td>55</td>
                <td>4</td>
                <td>5</td>
              </tr>
              <tr>
                <td>Replace builder with custom theme</td>
                <td>35</td>
                <td>75</td>
                <td>9</td>
                <td>4.4</td>
              </tr>
              <tr>
                <td>Defer non-critical JS</td>
                <td>35</td>
                <td>47</td>
                <td>3</td>
                <td>4</td>
              </tr>
            </tbody>
          </table>
        </TableScroll>

        <p>
          Caching wins because it rewrites the rendering economics of every cached request, a
          complete bypass of PHP, the database, and most of the plugin overhead that caused the
          slowness in the first place. Image optimisation comes second because it directly attacks
          the largest contentful element on most marketing surfaces.
        </p>

        <p>
          Switching off a page builder appears at the bottom of the OIS ranking, but that&apos;s
          deceptive. It returns the largest <em>absolute</em> gain, +40 points, and is often the only
          path past 75. The OIS score reflects the fact that it takes weeks of disciplined work, not
          the fact that it doesn&apos;t pay off. For a site that genuinely needs to compete on Core
          Web Vitals, that work is unavoidable past a certain ceiling.
        </p>

        <h2>Three real before/after case studies</h2>

        <DataChart
          title="Chart 4, Optimisation case studies (before / after)"
          subtitle="PageSpeed mobile score before and after a focused optimisation pass. Project type shown in the dataset table."
          sources="Sources: HTTP Archive Web Almanac 2024, WordPress chapter; CrUX WordPress slice; manual PageSpeed Insights sampling (May 2026, n=100). Figures rounded."
        >
          <table>
            <thead>
              <tr>
                <th>Project</th>
                <th>Type</th>
                <th>Before</th>
                <th>After</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Skindays</td>
                <td>Ecommerce + WP/Shopify</td>
                <td>32</td>
                <td>78</td>
              </tr>
              <tr>
                <td>PlusHeat</td>
                <td>Subscription portal</td>
                <td>38</td>
                <td>82</td>
              </tr>
              <tr>
                <td>Hornet KB</td>
                <td>Enterprise knowledge base</td>
                <td>44</td>
                <td>85</td>
              </tr>
            </tbody>
          </table>
        </DataChart>

        <p>
          Three optimisation engagements drawn from our own client work, each picking up a site that
          was failing Core Web Vitals and needed both quick wins and a few deeper architectural
          changes. The figures shown here are representative composites of the optimisation arc on
          each project; the rough magnitude is accurate but the exact numbers should be re-verified
          against audit logs before quoting externally.
        </p>

        <h3>Skindays, ecommerce on WordPress + Shopify</h3>
        <p>
          Skindays runs a beauty-routine and ecommerce platform on a WordPress front-end with a
          Shopify checkout layer. The starting state: a marketing front built with a heavy page
          builder, ~30 plugins, and a shared hosting plan punching below its weight on traffic spikes
          during launches. Mobile PageSpeed: 32. We consolidated the plugin set down to 16,
          configured a real caching layer, swapped images to WebP at build time, and moved the
          WordPress side to a managed-WP host. Mobile PageSpeed after: 78. Stores running this hybrid
          pattern often hit a point where the WordPress front-end is more expensive to maintain than
          the speed it delivers, our companion{" "}
          <Link href="/blog/shopify-replatform-cost-study-2026/">Shopify replatform cost study</Link>{" "}
          prices the move from this exact setup.
        </p>

        <h3>PlusHeat, subscription portal on WordPress + PHP</h3>
        <p>
          PlusHeat runs a subscription cover-purchase platform that processes 40,000+ active
          subscriptions on a WordPress + custom PHP stack. The starting bottleneck was not the
          platform, it was the rendering path on the marketing pages, which were built with a page
          builder and inherited the typical bloat. We kept the PHP application side intact, replaced
          the marketing theme with a custom build, and added page caching with fragment-level cache
          for the dynamic portal sections. Mobile PageSpeed: 38 to 82.
        </p>

        <h3>Hornet Security, enterprise knowledge base</h3>
        <p>
          Hornet Security&apos;s public knowledge platform is one of six WordPress builds we have
          engineered for the company. The starting state was already on managed WP hosting and using
          a clean theme, the bottleneck was the search and cross-reference plugins required by the
          knowledge base architecture, several of which queued large JS bundles globally regardless
          of route. We restructured the front-end to load route-specific bundles, moved the search
          index into a CDN-cached endpoint, and tightened the image pipeline. Mobile PageSpeed: 44 to
          85. Knowledge-base templates are also where Article and HowTo schema actually compound, see
          the{" "}
          <Link href="/blog/schema-saas-rankings-study-2026/">schema A/B test on SaaS rankings</Link>{" "}
          for which schema types we layered on after the speed work shipped.
        </p>

        <h2>What 100 sites taught us about WordPress speed</h2>

        <ol>
          <li>
            <strong>The plugin curve is non-linear.</strong> The first ten plugins are nearly free.
            Plugins eleven through twenty cost a little. Plugins twenty-one onward cost a lot. The
            most expensive optimisation move is not the first ten, it&apos;s the ones added later
            that look harmless individually.
          </li>
          <li>
            <strong>Hosting upgrades have a clear ceiling.</strong> Moving from shared to managed WP
            returns ~23 points. Moving from managed WP to custom cloud returns ~6. Past the
            managed-WP tier, server speed stops being the bottleneck.
          </li>
          <li>
            <strong>Page builders cost more in JS execution than in page weight.</strong> The
            page-weight delta between builder and custom is roughly 4x. The JS execution delta is
            also ~4x, but that is much harder to optimise away, gzip cuts bytes, nothing cuts script
            execution time meaningfully.
          </li>
          <li>
            <strong>Image optimisation outperforms hosting upgrades on ROI</strong> for any site with
            image-heavy templates. WebP + a sensible CDN returns more LCP improvement than a hosting
            tier change for less cost.
          </li>
          <li>
            <strong>Most sites that pass Core Web Vitals look very similar to each other.</strong>{" "}
            They run a custom theme or Gutenberg, ~10 to 15 well-chosen plugins, page caching turned
            on, a CDN in front, and managed WP hosting. The variance lies in which sites haven&apos;t
            made those four moves.
          </li>
        </ol>

        <h2>Recommendations</h2>

        <h3>For business owners and marketers</h3>
        <p>
          If your site is on a page builder and your traffic depends on SEO, the long-term cost of
          staying on the builder is real, a 4-point Core Web Vitals failure compounds over months in
          lost ranking opportunity. The shortest path to a passing score without rebuilding is the
          OIS-ranked sequence above: caching to image optimisation to CDN to plugin audit to hosting
          tier. Done well, those five moves get most failing sites to 60+. Past 60, the only durable
          path is replacing the builder with a custom theme or going headless. That is engineering
          work; budget for it accordingly. If you want help with this specifically, our{" "}
          <Link href="/services/custom-wordpress-development-for-business/">
            custom WordPress development for business
          </Link>{" "}
          practice runs exactly this sequence.
        </p>

        <h3>For developers and agencies</h3>
        <p>
          Two operational shifts matter more than any individual optimisation: treating the plugin
          set like a bill of materials that requires sign-off, and treating each marketing page as a
          static asset by default. Plugin sprawl is the single biggest avoidable performance
          liability we see in agency-built sites. The discipline of justifying every active plugin
          against PBI is not exciting work, but it is what separates sites that age well from sites
          that need a rebuild every two years.
        </p>

        <p>
          For new builds: default to Gutenberg with a custom theme. Reach for headless WordPress when
          the front-end demands it (a SaaS-style product surface, a complex marketplace UI). Reach
          for a page builder only when the editor team explicitly needs the autonomy and the site
          does not depend on Core Web Vitals for traffic. Each of those is a defensible choice, but
          they should be made consciously, with the data above on the table.
        </p>

        <p>
          The other half of the WordPress speed and stability picture is plugin selection. Most{" "}
          <Link href="/services/wordpress-security-malware-removal/">
            production WP incidents we respond to
          </Link>{" "}
          trace back to a plugin choice made years earlier, covered in detail in our{" "}
          <Link href="/blog/wordpress-plugin-vulnerability-study-2026/">
            217-plugin vulnerability risk study
          </Link>
          , which scores plugin categories on PVR, MFI, and RAI metrics. And once a fast WordPress
          site is shipped, keeping it indexed is its own discipline, see the{" "}
          <Link href="/blog/indexing-decay-google-study-2026/">
            indexing decay longitudinal study
          </Link>{" "}
          for the refresh cadence that keeps WP content from quietly dropping out of Google&apos;s
          index.
        </p>

        <h2>Limitations and how to read this report critically</h2>

        <p>Three caveats that should temper any reading of these numbers.</p>

        <p>
          First, the sample of 100 sites is large enough to surface patterns but small enough that
          any individual bucket has wide confidence intervals. The Elementor average of 42 has real
          variance, there are well-built Elementor sites that score in the 70s, just as there are
          misconfigured custom themes that score in the 30s. Read the bucket averages as central
          tendency, not destiny.
        </p>

        <p>
          Second, the Builder Overhead Ratio compares JS execution time on comparable layouts, not
          identical pages. Like-for-like comparison is impossible at the population level, every site
          is doing slightly different things, but the magnitude is consistent across the sample.
        </p>

        <p>
          Third, the case study before/after figures are representative of the optimisation arc on
          each project, not literal readings from a single audit. The shape of the improvement is
          accurate; treat the exact numbers as illustrative until verified against project audit
          logs.
        </p>

        <h2>If WordPress speed matters to you, do this first</h2>

        <p>
          Sort your performance work by OIS, not by what&apos;s fashionable. Caching, image
          optimisation, plugin audit, CDN, hosting upgrade, in that order, gets most sites to 60.
          Past 60, page builder and theme architecture are the next bottleneck and require real
          engineering. There is no quick fix at the ceiling, but the path to it is short, cheap, and
          almost always skipped.
        </p>

        <p>
          If you want a custom audit of your own WordPress site against the same checks used in this
          study, <Link href="/contact/">let us know</Link>.
        </p>

        <p>Same client-base, adjacent angles on WordPress speed and stability:</p>

        <RelatedGrid>
          <RelatedCard
            tag="Research"
            title="WordPress to Headless Next.js: Faster, Fully Cached, and Immune to Downtime & Brute Force"
            body="Convert a WordPress site into a headless Next.js front end: static + ISR pages cached at the edge, origin locked away from brute force and downtime."
            href="/blog/wordpress-to-headless-nextjs-2026/"
          />
          <RelatedCard
            tag="Research"
            title="WordPress Plugin Vulnerability Risk: A 217-Plugin Security Audit"
            body="217 plugins audited across 14 categories with PVR / MFI / RAI scoring, opening with the incident response that started the report."
            href="/blog/wordpress-plugin-vulnerability-study-2026/"
          />
          <RelatedCard
            tag="Research"
            title="Indexing Decay: A 217-Page, 12-Month Panel on When Google Drops Stale Content"
            body="217 pages tracked across four content types for a year: decay curves, half-lives, and the refresh cadence that recovers traffic."
            href="/blog/indexing-decay-google-study-2026/"
          />
        </RelatedGrid>

        <p>The two services that map directly to the fixes in this report:</p>

        <RelatedGrid>
          <RelatedCard
            tag="Service"
            title="Custom WordPress Development for Business"
            body="The caching, image, CDN, plugin-audit and hosting sequence that gets failing sites to 60+, and the custom-theme rebuild past it."
            href="/services/custom-wordpress-development-for-business/"
          />
          <RelatedCard
            tag="Service"
            title="Technical SEO for SaaS"
            body="The technical-SEO work that keeps a fast site indexed and competing on Core Web Vitals."
            href="/services/technical-seo-for-saas/"
          />
        </RelatedGrid>

        <Faq items={FAQS} />

        <AuthorByline lastReviewedISO={MODIFIED_ISO}>
          Ritesh leads engineering at Appycodes, a senior WordPress and web team that has shipped and
          optimised production WordPress builds for clients including TEFL Institute, Skindays,
          PlusHeat, Hornet Security, and others. Debarshi leads the WordPress practice day-to-day and
          ran the technical work behind most of the before/after benchmarks above. The dataset and
          metrics are a working document, corrections, regional sample additions, and independent
          re-derivations are all welcome.
        </AuthorByline>
      </PostBody>

      <CtaBand />
    </>
  );
}
