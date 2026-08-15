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
  TableScroll,
  Faq,
  AuthorByline,
  RelatedGrid,
  RelatedCard,
} from "@/components/blog";
import { buildPostSchemas, type FaqPair } from "@/lib/blog-post";

const PUBLISHED_ISO = "2026-09-08";
const MODIFIED_ISO = "2026-09-08";
const READ_TIME = "19 min read";

const PAGE_TITLE = "Build vs Buy LMS: The Seat-Count Break-Even Model From a Decade Running One";
const PAGE_DESCRIPTION =
  "Year one vs year ten of the same Moodle LMS, then the seat-count model: where TalentLMS and Docebo pricing crosses a custom build. SBEC, PLCC, UMH inside.";
const PAGE_PATH = "/blog/lms-build-vs-buy-2026/";
const PAGE_IMAGE = "/images/blog-lms-build-vs-buy-2026.jpg";
const PAGE_KEYWORDS =
  "custom lms development cost, build vs buy lms, moodle vs talentlms, lms seat pricing, white label course platform, lms development";

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
    q: "How much does custom LMS development cost in 2026?",
    a: "Published agency quotes run $20K to $150K+. Our model prices a customised Moodle deployment of realistic scope (customised core, bespoke plugins, branded theme, checkout, reporting) at $42K to build. Amortised over five years, with hosting and 214 maintenance hours a year, the steady-state cost lands near $24K per year.",
  },
  {
    q: "At what learner count does building an LMS beat buying one?",
    a: "Our central estimate is 1,132 monthly active learners: the point where per-seat SaaS at $1.75 per learner per month crosses a $23.8K annual custom TCO. Across lean and heavy scenarios the break-even band runs roughly 700 to 2,100 learners. Against quoted enterprise SaaS with a $25K+ floor, a custom build is competitive from the first quote.",
  },
  {
    q: "Moodle vs TalentLMS vs fully custom: which should we choose?",
    a: "Under about 700 active learners, per-seat SaaS such as TalentLMS is cheaper and faster; take it. In the 700 to 2,000 band the decision turns on feature ceiling and time horizon, not price: multi-brand, affiliate routing, and custom checkout do not exist on per-seat tiers. Above 2,000 learners, or with multiple brands, customised Moodle or a custom build wins on cost and control.",
  },
  {
    q: "Can we add an AI tutor to Moodle or a custom LMS?",
    a: "Yes. Moodle's web services API exposes course content, attempts, and learner context, which is exactly what a retrieval pipeline needs. The practical work is grounding the tutor in your course corpus and capping token spend per learner. On a platform you own there is no per-seat surcharge for the feature, which is precisely the build-side argument.",
  },
  {
    q: "What does a white-label or multi-brand course platform cost?",
    a: "The first brand carries the build cost; the marginal brand is configuration plus an isolated payment path, a fraction of the first. That is the economics behind running three brands on one engineering layer, and it is the strongest single argument for owning the platform once more than one brand is on the roadmap.",
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
  breadcrumbLabel: "LMS Build vs Buy",
  keywords: PAGE_KEYWORDS,
  faqs: FAQS,
});

export default function Page() {
  return (
    <>
      <JsonLd data={schemas} />

      <PostHeader
        eyebrow="Build vs buy data report"
        title="Build vs buy LMS: the seat-count break-even from a decade running one"
        lead="At what learner count does per-seat SaaS pricing cross a custom Moodle build? A break-even model priced from vendor list pages and ten years of our own maintenance ledger."
        breadcrumbLabel="LMS Build vs Buy"
        dateISO={MODIFIED_ISO}
        readTime={READ_TIME}
        image={PAGE_IMAGE}
        imageAlt="LMS build vs buy seat-count break-even model"
      />

      <PostBody>
        <p>
          Build vs buy for an LMS is usually argued with a screenshot of a pricing page on one side and a guess at a
          build quote on the other. The pricing page is accurate and misleading; the guess is neither. We can do
          better than a guess. We have been the LMS engineering partner for the same EdTech group for over a decade:
          the TEFL Institute of Ireland, three brands, 100K+ orders processed through one customised Moodle
          deployment. That tenure produces the one dataset this debate always lacks: a maintenance ledger long enough
          to price the build side honestly. Before the model, the anatomy: year one and year ten of that partnership,
          the two invoices compared.
        </p>

        <h2>Anatomy: year one vs year ten of the same LMS</h2>

        <p>
          <strong>The year one invoice (2016).</strong> The first full year of the partnership was dominated by one
          line item: the 2016 Moodle core upgrade. Around it sat the work that upgrade forced into the open: bespoke
          plugin rebasing so customisations would update cleanly with core releases, a branded theme rebuild, and the
          Stripe and PayPal enrolment flow re-wired so a completed payment always produced a completed enrolment. Our
          ledger logs 360 maintenance and upgrade hours against that year, and nearly every one of them was visible on
          the platform. By December the LMS looked and behaved differently than it had in January. That is what a year
          one invoice buys: change you can see.
        </p>

        <p>
          <strong>The year ten invoice (2025).</strong> A decade later the invoice reads like an operations report. A
          Moodle LTS upgrade taken on schedule. Exam-cycle tuning ahead of peak enrolment periods. Certificate issuance
          gated to a passing score, kept correct through a quiz-engine update. SCORM and xAPI package ingestion for
          corporate buyers who require standards compliance. App store releases for the custom Moodle mobile app.
          130 logged hours, and not one of them produced something a learner would point at. The platform looked
          identical in December to how it looked in January. That is what a year ten invoice buys: change you cannot
          see, on a platform that processed its share of 100K+ orders without drama.
        </p>

        <p>
          <strong>What happened between the two invoices</strong> is the part per-seat pricing pages cannot describe.
          2018: affiliate routing, so partner-originated learners landed in partner-priced enrolments. 2020: the custom
          Moodle mobile app, built against Moodle&apos;s web services. 2022: the brand split that spun PremierTEFL out
          as a third brand alongside TEFL.ie, the flagship for the Ireland market, and TEFL Institute, the global
          sister brand. 2024: multi-currency checkout. Three brands, one engineering layer, isolated payment paths,
          independent course catalogues. Readers of our{" "}
          <Link href="/blog/multi-tenant-architecture-cost-study-2026/">multi-tenant architecture cost study</Link>{" "}
          will recognise the pattern: the marginal brand costs a fraction of the first, and that economics only exists
          on a platform you own.
        </p>

        <p>
          Read side by side, the two invoices describe the whole arc of owning a platform. Year one is capital
          expenditure wearing an hourly rate: most of the hours create new capability, and the run cost hides inside
          the build cost. Year ten is the inverse: nearly every hour defends capability that already exists. The
          build vs buy decision is really a bet on which of those two invoices you would rather be paying in a
          decade, because with SaaS you pay neither and both: the vendor absorbs the upgrade hours and prices them
          back into every seat, every month, forever. Both invoices, and the eight between them, are in the ledger
          that prices the custom side of the model below.
        </p>

        <Callout variant="tldr">
          <ul>
            <li>
              <strong>The seat-count break-even lands near 1,100 monthly active learners.</strong> Below that,
              per-seat SaaS is cheaper and faster. Across lean and heavy build scenarios the band runs roughly 700 to
              2,100. Against quoted enterprise SaaS with a $25K+ annual floor, custom is competitive from the first
              quote.
            </li>
            <li>
              <strong>Ten years of running one LMS averaged 214 maintenance and upgrade hours a year.</strong> The
              full year-by-year ledger is published below: core upgrades, an app launch, a brand split, a
              multi-currency checkout, and the quiet years that kept it all boring.
            </li>
            <li>
              <strong>Feature ceiling decides the build question before price does.</strong> Multi-brand operation,
              affiliate routing, and custom checkout logic do not exist on per-seat tiers at any price. If they are on
              your roadmap, the break-even maths is confirmation, not the decision.
            </li>
          </ul>
        </Callout>

        <h2>Methodology</h2>

        <p>
          The model compares three ways of running an LMS: per-seat SaaS (TalentLMS-class list pricing), quoted
          enterprise SaaS (Docebo-class, no public list price), and a custom or self-hosted customised Moodle build.
          SaaS figures use published list prices and commonly reported quote ranges as of July 2026. Custom figures
          come from our own ledger: one Moodle deployment run continuously from 2016 to 2025, with every maintenance
          and upgrade hour logged. We amortise the build over five years, price hosting, CDN and backups at $300 a
          month, and charge maintenance hours at a blended $55 to $60 rate. An active learner is a unique learner with
          course activity in a calendar month. The client is named with consent; the financial figures in the model
          are list prices and our own ledger, not client revenue.
        </p>

        <p>
          Three exclusions keep the comparison fair. Course content authoring is excluded from all three paths,
          because it costs the same whether the platform is rented or owned. Video hosting and delivery are excluded
          for the same reason: a CDN bill follows the catalogue, not the platform. And first-line learner support is
          excluded, although it should not be ignored: SaaS vendors answer platform tickets and a custom deployment
          routes them to whoever holds the retainer. Where a SaaS tier bundles something the custom path buys
          separately, we price the custom equivalent into hosting or maintenance hours rather than pretending it is
          free. The model is deliberately conservative toward the build side; if the custom column still wins at your
          seat count, it wins with margin.
        </p>

        <h2>The seat-count break-even model</h2>

        <p>
          The three cost curves have three different shapes, and the shapes matter more than any single number.
          Per-seat SaaS scales linearly: every additional learner adds the same cost forever. Quoted enterprise SaaS
          has a floor: whatever your learner count, the contract starts around $25K a year and rises from there. A
          custom build is nearly flat: the build amortisation, hosting, and maintenance hours barely move whether 100
          or 5,000 learners log in, because Moodle on tuned hosting does not bill you per head.
        </p>

        <p>
          Why the custom curve stays nearly flat deserves a sentence of engineering honesty. Moodle&apos;s real
          scaling costs are concurrency and media, not registered heads: the platform strains during exam windows and
          peak enrolment, not on quiet Tuesdays. Tuned hosting with a Redis cache and CDN-fronted media absorbs a 10x
          learner count with a hosting bill that moves by hundreds of dollars a year, not thousands, which is why our
          custom column drifts from $23.8K to $27.8K across a 50x range of learners. The per-seat column has no
          equivalent mercy: seat 4,999 costs exactly what seat 101 did. Linear pricing is a subscription to your own
          success.
        </p>

        <DataChart
          title="Chart 1: Annual platform cost at six learner counts"
          subtitle="USD per year. Per-seat SaaS modelled at $1.75 per active learner per month on published tiers; enterprise SaaS on commonly reported quote ranges; custom Moodle from our ledger."
          sources="Sources: TalentLMS list pricing, https://www.talentlms.com/prices; Docebo pricing page, https://www.docebo.com/pricing/; Appycodes maintenance ledger for one Moodle deployment, 2016 to 2025."
        >
          <table>
            <thead>
              <tr>
                <th>Monthly active learners</th>
                <th>Per-seat SaaS (TalentLMS class)</th>
                <th>Quoted SaaS (Docebo class)</th>
                <th>Custom Moodle (our ledger)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>100</td>
                <td>$2.1K</td>
                <td>$25K floor</td>
                <td>$23.8K</td>
              </tr>
              <tr>
                <td>250</td>
                <td>$5.3K</td>
                <td>$25K to $30K</td>
                <td>$23.8K</td>
              </tr>
              <tr>
                <td>500</td>
                <td>$10.5K</td>
                <td>$30K to $35K</td>
                <td>$24.2K</td>
              </tr>
              <tr>
                <td>1,000</td>
                <td>$21.0K</td>
                <td>$35K to $45K</td>
                <td>$24.9K</td>
              </tr>
              <tr>
                <td>2,500</td>
                <td>Quoted (est. $30K to $42K)</td>
                <td>$45K to $60K</td>
                <td>$26.1K</td>
              </tr>
              <tr>
                <td>5,000</td>
                <td>Quoted (est. $48K+)</td>
                <td>$60K+</td>
                <td>$27.8K</td>
              </tr>
            </tbody>
          </table>
        </DataChart>

        <p>
          Two honest observations about that table. First, below 500 learners the per-seat column embarrasses the
          custom column: $10.5K against $24.2K is not a close call, and any agency telling a 300-learner course
          business to build is selling, not advising. Second, the per-seat column stops being a list price above
          1,000 learners. TalentLMS, like most per-seat vendors, moves you to quoted enterprise pricing at exactly the
          volume where the maths starts favouring a build. The estimates we show are the discounted quotes we have
          seen; your quote will vary, which is itself part of the argument for a cost curve you control.
        </p>

        <h2>Finding: the break-even lands near 1,100 active learners</h2>

        <p>
          Set the flat custom curve against the linear per-seat curve and solve for the crossing point. The worked
          example, at our central assumptions:
        </p>

        <CodeBlock language="text" caption="Worked example: SBEC at July 2026 list prices">
{`Custom steady state (central scenario)
  build $42,000 amortised over 5 years    =  $8,400 / yr
  hosting, CDN, backups at $300 / mo      =  $3,600 / yr
  maintenance: 214 hrs x $55 blended      = $11,770 / yr
  annual custom TCO                       = $23,770 / yr

Per-seat SaaS at $1.75 / learner / month
  SBEC = 23,770 / (1.75 x 12)             = 1,132 active learners`}
        </CodeBlock>

        <p>
          1,132 monthly active learners is the central estimate, and it is sensitive to exactly three inputs: what the
          build costs, how many maintenance hours a year the platform really takes, and what you actually pay per seat
          after negotiation. Chart 2 runs the model across a lean scenario, our central scenario, and a heavy scenario.
        </p>

        <p>
          The amortisation window deserves its own sensitivity note, because it is the assumption buyers quietly rig.
          Amortise the $42K build over three years and the annual custom TCO rises to $29.4K, pushing SBEC to exactly
          1,400 learners; stretch it to seven years and TCO falls to $21.4K, pulling SBEC down to 1,018. Five years
          is our default because it matches what we have watched platforms actually survive: the TEFL deployment has
          now amortised its original build twice over, and every year past the window is a year the custom column
          competes against SaaS with no build cost in it at all. That end-state, year six onward, is the quiet
          argument the model undersells: a platform past amortisation costs $15.4K a year to run at any seat count in
          the table.
        </p>

        <DataChart
          title="Chart 2: SBEC sensitivity across three build scenarios"
          subtitle="Blended engineering rate $55 to $60 per hour. Amortisation window five years throughout."
          sources="Sources: TalentLMS list pricing, https://www.talentlms.com/prices; Docebo pricing page, https://www.docebo.com/pricing/; Appycodes maintenance ledger for one Moodle deployment, 2016 to 2025."
        >
          <table>
            <thead>
              <tr>
                <th>Scenario</th>
                <th>Build cost</th>
                <th>UMH (hrs/yr)</th>
                <th>Custom annual TCO</th>
                <th>SaaS $/learner/mo</th>
                <th>SBEC (learners)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Lean (templated Moodle, stock theme)</td>
                <td>$24K</td>
                <td>140</td>
                <td>$16.1K</td>
                <td>$2.00</td>
                <td>671</td>
              </tr>
              <tr>
                <td>Central (customised Moodle, our scope)</td>
                <td>$42K</td>
                <td>214</td>
                <td>$23.8K</td>
                <td>$1.75</td>
                <td>1,132</td>
              </tr>
              <tr>
                <td>Heavy (bespoke build, mobile app)</td>
                <td>$75K</td>
                <td>300</td>
                <td>$37.8K</td>
                <td>$1.50</td>
                <td>2,100</td>
              </tr>
              <tr>
                <td>vs quoted enterprise SaaS floor</td>
                <td>$42K</td>
                <td>214</td>
                <td>$23.8K</td>
                <td>$25K+/yr floor</td>
                <td>Crosses at the first quote</td>
              </tr>
            </tbody>
          </table>
        </DataChart>

        <p>
          The last row is the one buyers miss. Against Docebo-class pricing there is no seat count to wait for: the
          entry quote already exceeds the central custom TCO. The honest comparison there is not price but
          responsibility. The quote buys you a vendor who carries upgrades, uptime, and security; the build means you
          carry them, or you pay someone like us a retainer to carry them. Which is why the next section exists: the
          part of the custom column nobody prices honestly.
        </p>

        <h2>The decade-long maintenance ledger</h2>

        <p>
          Every build vs buy article waves at maintenance cost. Almost none publishes a number, because almost nobody
          has run one LMS long enough to have one. We have run the TEFL deployment for over ten years, and the hours
          are logged. Here is the ledger, year by year: the headline work and the maintenance and upgrade hours behind
          it. New-feature builds, the 2020 mobile app and the 2024 checkout among them, were scoped as separate
          projects; the milestone-year spikes below are the upgrade and integration work around those launches, not
          the builds themselves.
        </p>

        <TableScroll>
          <table>
            <thead>
              <tr>
                <th>Year</th>
                <th>Headline work from the ledger</th>
                <th>Maintenance + upgrade hours</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>2016</td>
                <td>Moodle core upgrade; plugin rebase; theme rebuild</td>
                <td>360</td>
              </tr>
              <tr>
                <td>2017</td>
                <td>Plugin compatibility passes; exam-cycle load tuning</td>
                <td>130</td>
              </tr>
              <tr>
                <td>2018</td>
                <td>Affiliate routing; enrolment plugin rework</td>
                <td>240</td>
              </tr>
              <tr>
                <td>2019</td>
                <td>SCORM and xAPI package ingestion; reporting blocks</td>
                <td>140</td>
              </tr>
              <tr>
                <td>2020</td>
                <td>Custom Moodle mobile app launch support; web services hardening</td>
                <td>330</td>
              </tr>
              <tr>
                <td>2021</td>
                <td>PHP version migration; MySQL upgrade; Redis cache layer</td>
                <td>150</td>
              </tr>
              <tr>
                <td>2022</td>
                <td>Brand split: PremierTEFL; brand-aware configuration</td>
                <td>290</td>
              </tr>
              <tr>
                <td>2023</td>
                <td>Cohort and B2B licensing; seat-pool management</td>
                <td>140</td>
              </tr>
              <tr>
                <td>2024</td>
                <td>Multi-currency checkout integration; payment reconciliation</td>
                <td>230</td>
              </tr>
              <tr>
                <td>2025</td>
                <td>Moodle LTS upgrade; certificate issuance tuning</td>
                <td>130</td>
              </tr>
            </tbody>
          </table>
        </TableScroll>

        <p>
          2,140 hours across ten years: an average of 214 a year, which is the UMH figure the whole model rests on.
          The pattern is worth reading. Roughly every other year is a spike year, 230 to 360 hours, driven by a core
          upgrade or a launch. The years between settle at 130 to 150 hours: patches, compatibility passes, tuning
          before exam peaks. Budget for the average, not the quiet years. Teams that budget 130 hours because last
          year took 130 hours are the teams that meet a core upgrade with no budget and skip it, and skipped upgrades
          are how a ten-year-old LMS becomes a liability instead of an asset. This cadence, not any single project, is
          what our <Link href="/services/lms-development/">LMS development</Link> retainers exist to absorb.
        </p>

        <p>
          It is also worth saying what the 2,140 hours did not include: a rebuild. The 2016 core upgrade was the
          closest the platform came to one, and the decision to keep customisations as clean plugins rather than core
          forks is the reason every subsequent upgrade stayed in the 130 to 360 hour band. The cheapest hour in that
          ledger was the architectural discipline in year one.
        </p>

        <p>
          Where did the 2,140 hours actually go? Grouping the ledger by work type: roughly 40% was upgrade work,
          Moodle core and LTS releases, PHP and MySQL migrations, plugin rebasing. Around 25% was integration
          maintenance: payment providers, the affiliate routing, reconciliation between checkout and enrolment.
          Another 20% was performance and reliability: exam-cycle tuning, cache work, the web services hardening that
          followed the app launch. The remaining 15% is the category nobody budgets: compliance and correctness,
          certificate issuance logic, SCORM conformance, the small fixes that keep a passing score meaning what the
          accreditation says it means. Notice what is absent: firefighting. A decade produced no rebuild year and no
          incident that consumed a quarter, which is not luck; it is what the 40% upgrade share purchased.
        </p>

        <h2>How we measure build vs buy</h2>

        <h3>1. Seat Break-Even Count (SBEC)</h3>
        <Formula>SBEC = Annual custom TCO / (SaaS price per active learner per month x 12)</Formula>
        <p>
          The learner count at which per-seat SaaS spend crosses the custom build&apos;s annual total cost of
          ownership. Central estimate 1,132; sensitivity band roughly 700 to 2,100 across the scenarios in Chart 2.
        </p>

        <h3>2. Per-Learner Cost Curve (PLCC)</h3>
        <Formula>PLCC(n) = Annual platform TCO at n active learners / (n x 12)</Formula>
        <p>
          The monthly cost per learner at a given scale, which is where the shapes of the three curves become
          unmistakable: per-seat SaaS is flat, custom collapses as learners grow. PLCC is also the honest way to
          present the small-scale case against building: at 100 learners a custom platform costs $19.81 per learner
          per month, eleven times the SaaS figure, and no amount of feature-ceiling argument makes that a good trade
          for a platform that fits inside a per-seat tier.
        </p>

        <DataChart
          title="Chart 3: PLCC, monthly cost per active learner at scale"
          subtitle="USD per active learner per month. Same assumptions as Chart 1."
          sources="Sources: TalentLMS list pricing, https://www.talentlms.com/prices; Docebo pricing page, https://www.docebo.com/pricing/; Appycodes maintenance ledger for one Moodle deployment, 2016 to 2025."
        >
          <table>
            <thead>
              <tr>
                <th>Monthly active learners</th>
                <th>Per-seat SaaS</th>
                <th>Quoted SaaS</th>
                <th>Custom Moodle</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>100</td>
                <td>$1.75</td>
                <td>$20.83</td>
                <td>$19.81</td>
              </tr>
              <tr>
                <td>250</td>
                <td>$1.75</td>
                <td>$9.17</td>
                <td>$7.93</td>
              </tr>
              <tr>
                <td>500</td>
                <td>$1.75</td>
                <td>$5.42</td>
                <td>$4.03</td>
              </tr>
              <tr>
                <td>1,000</td>
                <td>$1.75</td>
                <td>$3.33</td>
                <td>$2.08</td>
              </tr>
              <tr>
                <td>2,500</td>
                <td>Quoted (est. $1.00 to $1.40)</td>
                <td>$1.75</td>
                <td>$0.87</td>
              </tr>
              <tr>
                <td>5,000</td>
                <td>Quoted (est. $0.80 to $1.00)</td>
                <td>$1.05</td>
                <td>$0.46</td>
              </tr>
            </tbody>
          </table>
        </DataChart>

        <h3>3. Upgrade Maintenance Hours per year (UMH)</h3>
        <Formula>UMH = Total maintenance and upgrade hours logged / Years in production</Formula>
        <p>
          The number the custom column lives or dies on. Ours is 2,140 / 10 = 214. If a proposal prices maintenance
          below 150 hours a year for a customised LMS with exams, certificates and payments, ask which of those hours
          the ledger above suggests they have never actually logged.
        </p>

        <h2>The market you are deciding inside</h2>

        <p>
          The reason this decision is being argued in more boardrooms this year: the corporate LMS market was worth
          $16.33B in 2025 and is projected at $19.53B in 2026, heading to $65.7B by 2032 on{" "}
          <a
            href="https://www.researchandmarkets.com/report/corporate-learning-management-system"
            target="_blank"
            rel="noopener noreferrer"
          >
            Research and Markets
          </a>{" "}
          and{" "}
          <a
            href="https://www.fortunebusinessinsights.com/industry-reports/learning-management-system-market-101376"
            target="_blank"
            rel="noopener noreferrer"
          >
            Fortune Business Insights
          </a>{" "}
          figures. Vendors are pricing into that growth, which is why per-seat tiers keep being restructured and why
          the enterprise floor keeps drifting upward. On the build side, published custom LMS quotes run{" "}
          <a href="https://www.enacton.com/blog/lms-development-cost/" target="_blank" rel="noopener noreferrer">
            $20K to $150K+
          </a>
          , a range wide enough to be nearly useless without a scope attached. Our central $42K sits where it does
          because the scope is specific: customised Moodle core, bespoke plugins, branded theme, checkout, reporting.
          The same honesty problem affects MVP pricing generally, which is why we published{" "}
          <Link href="/blog/mvp-cost-funded-startups-2026/">what an MVP actually costs</Link> with engagement-level
          data rather than a range.
        </p>

        <p>
          The procurement dynamics are worth naming because they shape the quotes you will actually receive. In a
          market growing at that rate, per-seat vendors optimise for land-and-expand: generous entry tiers, then
          pricing pressure exactly where switching costs peak, at the seat counts and feature depth that make
          migration painful. That is not villainy, it is strategy, but it means the pricing page you evaluate today
          is not the pricing you will negotiate in year three. The custom column has the opposite dynamic: its worst
          year is the first one, and every year afterwards the ledger amortises in your favour. Any break-even model
          that compares today&apos;s list price against the full build cost, without projecting either forward, is
          structurally biased toward buying. Ours projects both, and buying still wins below 700 learners, which
          should tell you how decisively it wins there.
        </p>

        <h2>What ten years of one LMS taught us</h2>

        <ol>
          <li>
            <strong>Upgrades are the tax that keeps the platform alive.</strong> The decade opened with the 2016 core
            upgrade and closed with an LTS upgrade. Neither was optional, and both were cheap only because none in
            between were skipped.
          </li>
          <li>
            <strong>The feature ceiling arrives before the price ceiling.</strong> Affiliate routing in 2018, the
            brand split in 2022, multi-currency checkout in 2024: none of these exist on a per-seat tier at any
            price. The group did not outgrow SaaS pricing; it outgrew SaaS features.
          </li>
          <li>
            <strong>A mobile app doubles your surfaces, not your team.</strong> The 2020 custom Moodle app talks to
            the same Moodle web services the site does. One backend, two surfaces, one ledger line for hardening the
            APIs they share.
          </li>
          <li>
            <strong>Corporate buyers pay for standards.</strong> SCORM and xAPI compliance, cohort and B2B licensing,
            seat pools, manager dashboards: the unglamorous ledger years were the ones that opened corporate
            contracts.
          </li>
          <li>
            <strong>Boring is the KPI.</strong> The year ten invoice, 130 hours that changed nothing a learner could
            see, is the target state. An owned platform that needs drama to justify its ledger is a platform being
            run badly.
          </li>
        </ol>

        <h2>The adjacent decision: course plus community</h2>

        <p>
          Almost every course business that clears the break-even conversation asks the next question in the same
          meeting: should the knowledge base and community be custom too? It is the same decision with a different
          curve, and we run it on the complexity ladder we use in our{" "}
          <Link href="/services/knowledge-base-community-development/">knowledge base and community platform</Link>{" "}
          engagements. Rung 1 is a static FAQ page: pre-product, under 20 questions, done in days. Rung 2 is a
          WordPress-based KB with default search: fine under 200 articles, one to three weeks of work. Rung 3 adds
          Algolia or Elastic search, because default WP search dies above 200 articles: four to eight weeks. Rung 4
          is a multi-product, version-aware KB: 8 to 14 weeks. Rung 5 closes the loop, KB plus forum plus a
          ticket-to-KB support loop: 12 to 24+ weeks of engineering.
        </p>

        <p>
          The buy-side answer is honest and boring: below rung 3, a hosted docs product or a Discourse instance is
          faster and we would recommend it, exactly as per-seat SaaS wins below 700 learners. The build-side answer
          starts at rung 3, where search relevance, role-gated content, and editorial workflow stop being features
          and start being engineering. Most course businesses put that KB on WordPress next to their marketing site,
          which is where our <Link href="/services/custom-wordpress-development-for-business/">custom WordPress
          development</Link> work usually begins, and where the performance debt accumulates: our{" "}
          <Link href="/blog/wordpress-performance-data-study-2026/">study of 100 WordPress sites</Link> found 78%
          failing Core Web Vitals, with plugins and page builders, the exact tools ad-hoc KBs are assembled from, as
          the leading causes. A course platform that clears SBEC and a KB that clears rung 3 tend to arrive together;
          budgeting them together is the difference between a platform strategy and two accidental rebuilds.
        </p>

        <p>
          The two ladders also share a failure mode worth flagging: climbing a rung for status rather than load. We
          have talked clients out of rung 5 builds the way we talk 300-learner course businesses out of custom LMS
          builds, and for the same reason: the engineering only pays back against real article counts, real ticket
          volume, real learners. The complexity ladder is a diagnostic, not a roadmap. Where you sit on it today, and
          the growth rate that is actually in your analytics, decides the next rung; ambition alone decides nothing
          except the size of the write-off.
        </p>

        <h2>Recommendations</h2>

        <h3>Under 700 active learners: buy</h3>
        <p>
          Take the per-seat tier, negotiate annually, and spend the difference on course quality. Revisit the model
          once a year with your real learner count. The single caveat is roadmap: if multi-brand or affiliate
          economics is on it, start the build conversation before the seat count forces it.
        </p>

        <h3>700 to 2,000 learners: decide on features and horizon, not price</h3>
        <p>
          You are inside the sensitivity band, where the maths can be argued either way and will be. Decide instead
          on the two things the maths cannot settle: whether you need what per-seat tiers do not sell (custom
          checkout, brand-aware configuration, affiliate routing, standards work), and whether you are running this
          platform in ten years. A five-year amortisation only pays back if the platform survives it. Ours did, and
          then paid back twice more. If the answer to the horizon question is honestly unknown, a useful hedge is
          customised Moodle over fully bespoke: the open-source core keeps the exit door open in both directions, and
          the customisations, kept as clean plugins, are the part of the build a future migration can carry.
        </p>

        <h3>2,000+ learners, or more than one brand: build</h3>
        <p>
          Above 2,000 learners even the heavy scenario clears break-even, and every learner after that widens the
          gap. With a second brand the argument stops being about seats entirely: the marginal brand on shared
          engineering is configuration and an isolated payment path, not a second platform. This is the shape of
          engagement our <Link href="/services/lms-development/">LMS development service</Link> is built around:
          audit first on existing deployments, phased build, then the long retainer that carries the 214 hours a
          year.
        </p>

        <h2>Limitations</h2>

        <p>
          The maintenance ledger covers one deployment, run by the team that built it; a ledger inherited from
          another vendor would read worse. SaaS list prices are as of July 2026 and change often; enterprise quotes
          vary widely by negotiation, and our estimates above 1,000 seats are informed guesses, not published rates.
          Vendors also define an active learner differently across plans, which moves per-seat comparisons by
          double-digit percentages. The blended $55 to $60 rate reflects our UK and India engineering mix; a
          US-agency rate card can push custom TCO 2x higher and the SBEC with it. And we sell LMS development, so
          read the build-side sympathy in this post with that disclosed.
        </p>

        <p>
          One more bias deserves a name: survivorship. The ledger exists because the platform lasted ten years; a
          custom build abandoned in year three would have left a much uglier per-year figure and no blog post. Treat
          the 214-hour average as what disciplined ownership costs, not what every build achieves. The discipline is
          purchasable; the ledger is only proof that it exists.
        </p>

        <h2>The decision in one sentence</h2>

        <p>
          Buy until the seat count, the feature ceiling, or the second brand makes you an owner; then build once,
          keep the customisations in clean plugins, and budget 214 honest hours a year to keep it boring. The
          companion studies below cover the adjacent decisions this model touches:
        </p>

        <RelatedGrid>
          <RelatedCard
            tag="Research"
            title="The Multi-Tenant SaaS Architecture Decision: Cost &amp; Engineering Hours Across 4 Patterns"
            body="Per-pattern cost, isolation, and onboarding eng-hours for the four common multi-tenancy approaches. TIC, AOC, BCM metrics."
            href="/blog/multi-tenant-architecture-cost-study-2026/"
          />
          <RelatedCard
            tag="Research"
            title="What an MVP Actually Costs in 2026: Three Founder Stories + 31 Engagements of Data"
            body="Three founder stories of 2026 MVP builds, fintech, AI SaaS, marketplace, followed by aggregate cost and bandwidth data across 31 engagements."
            href="/blog/mvp-cost-funded-startups-2026/"
          />
          <RelatedCard
            tag="Research"
            title="WordPress Performance Optimization: What Actually Works (Data-Backed Study)"
            body="We analysed 100 WordPress websites: 78% failed Core Web Vitals. What actually slows WordPress down and which fixes deliver real ROI."
            href="/blog/wordpress-performance-data-study-2026/"
          />
        </RelatedGrid>

        <p>The engagements that run both sides of this decision in production:</p>

        <RelatedGrid>
          <RelatedCard
            tag="Service"
            title="Custom LMS Development"
            body="Customised Moodle deployments, bespoke mobile apps, exam delivery at scale, and cohort licensing. Ten years, one partnership."
            href="/services/lms-development/"
          />
          <RelatedCard
            tag="Service"
            title="Knowledge Base &amp; Community Platforms"
            body="KB, forum and community engineering: search relevance, version-aware routing, and the ticket-to-KB loop."
            href="/services/knowledge-base-community-development/"
          />
          <RelatedCard
            tag="Service"
            title="Custom WordPress Development"
            body="The WordPress builds that sit under course sites and knowledge bases when scale outgrows plugin defaults."
            href="/services/custom-wordpress-development-for-business/"
          />
        </RelatedGrid>

        <Faq items={FAQS} />

        <AuthorByline lastReviewedISO={MODIFIED_ISO}>
          Ritesh has led the TEFL Institute of Ireland engagement across all three brands for over a decade, from the
          2016 Moodle core upgrade to the 2024 multi-currency checkout. The maintenance ledger in this post is his
          team&apos;s own, and the model&apos;s custom-side figures are priced from it.
        </AuthorByline>
      </PostBody>

      <CtaBand />
    </>
  );
}
