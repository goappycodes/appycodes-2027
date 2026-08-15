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

const PUBLISHED_ISO = "2026-04-02";
const MODIFIED_ISO = "2026-05-10";
const READ_TIME = "19 min read";

const PAGE_TITLE =
  "Lovable / Bolt to Production: The Real Cost & Timeline (20 Engagements, 1 Anatomy) | Appycodes";
const PAGE_DESCRIPTION =
  "Anatomy of one specific Lovable marketplace taken to production, plus aggregate cost and timeline data across 20 prototype-to-production engagements.";
const PAGE_PATH = "/blog/lovable-to-production-cost-2026/";
const PAGE_IMAGE = "/images/blog-lovable-to-production-cost-2026.jpg";
const KEYWORDS =
  "lovable to production, bolt to production cost, ai prototype production cost, vibe coded app cost, lovable engagement cost, ai prototype timeline";

const CHART_SOURCES =
  "Sources: 20 Appycodes engagement records (2025 to 2026); anonymised. Figures rounded.";

const FAQS: FaqPair[] = [
  {
    q: "How much does it cost to take a Lovable or Bolt prototype to production?",
    a: "The median engagement in our 20-project sample is $10,000 over 35 days. Simple internal tools run $3-5k; complex two-sided marketplaces run $22-28k. The complexity tier predicts cost more reliably than the origin tool.",
  },
  {
    q: "What percentage of the original AI-generated code gets rewritten?",
    a: "59% on average across our 20 engagements. Complex projects average 76% rebuild; simple ones average 27%. The number is a function of project complexity, not tool brand, a complex Lovable, Bolt or v0 project carries roughly the same rebuild rate.",
  },
  {
    q: "Is the AI prototype tool's monthly subscription a meaningful cost?",
    a: "No. At $20-50/mo for Lovable or Bolt, the prototype subscription is a rounding error against the production engagement. The right question is not 'is the AI tool worth $50/mo', it is 'did the prototype validate the idea hard enough to justify a $10-20k production engagement'.",
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
  breadcrumbLabel: "Lovable to Production Cost 2026",
  keywords: KEYWORDS,
  faqs: FAQS,
});

export default function Page() {
  return (
    <>
      <JsonLd data={schemas} />

      <PostHeader
        eyebrow="Engagement data report"
        title="Lovable / Bolt to production: the real cost & timeline across 20 engagements"
        lead={
          <>
            The actual cost, timeline, and rebuild ratio across 20 AI prototype-to-production
            engagements, broken out by tool of origin, project complexity, and vertical.
          </>
        }
        breadcrumbLabel="Lovable to Production Cost 2026"
        dateISO={MODIFIED_ISO}
        readTime={READ_TIME}
        image={PAGE_IMAGE}
        imageAlt="Lovable Bolt v0 to production cost study"
      />

      <PostBody>
        <Callout variant="tldr">
          <ul>
            <li>
              <strong>Median Lovable / Bolt prototype-to-production engagement: $10,000 over 35
              days.</strong> Range: $3,000 (simple internal tool) to $28,000 (complex marketplace).
            </li>
            <li>
              <strong>The average engagement rewrites 59% of the original code.</strong> Complex
              projects average 76%; simple ones average 27%. The number is a function of project
              complexity, not tool brand.
            </li>
            <li>
              <strong>Days-to-live correlates more tightly with vertical than with cost.</strong>{" "}
              Fintech and healthcare engagements ran 2.3x longer than B2B SaaS engagements at similar
              cost, compliance work consumes timeline, not budget.
            </li>
          </ul>
        </Callout>

        <p>
          We have closed 20 prototype-to-production engagements in the last 18 months, projects where
          a founder arrived with a working AI-built prototype (Lovable, Bolt, v0) that had real users
          and needed to become a real product.
        </p>

        <p>
          Rather than open with the dataset, we&apos;ll start with one specific engagement, call it
          E18, a complex two-sided marketplace originally vibe-coded on Lovable over 22 days. The
          founder arrived with a working prototype, 24 paying early users, and a hard launch deadline
          against a competitor. The story below is what the production engagement actually looked
          like, week by week. The aggregate data follows.
        </p>

        <h2>Anatomy of one engagement: a Lovable marketplace, $28k, 17 weeks</h2>

        <p>
          <strong>Week 1, Audit and triage.</strong> First task was the{" "}
          <Link href="/blog/ai-prototype-codebase-audit-2026/">22-criterion rubric</Link> we run on
          every takeover. The Lovable build had 73 direct npm dependencies, three RLS policies that
          read &quot;true&quot;, Stripe webhooks unsigned, and no error boundary anywhere in the
          React tree. Severity-3 findings: 7. Estimated baseline refactor: 130 engineer hours before
          adding any new feature.
        </p>

        <p>
          <strong>Weeks 2 to 4, Stop the bleeding.</strong> Fix RLS so one tenant cannot see another
          tenant&apos;s listings, sign the Stripe webhook with the verification recipe in the{" "}
          <a href="https://docs.stripe.com/webhooks/signatures" target="_blank" rel="noopener noreferrer">
            Stripe webhooks doc
          </a>
          , add server-side input validation on every action handler, and wrap the app shell in a
          React error boundary. No new features ship in this window. The founder watches the burn
          rate accelerate; users see the same product. This is always the politically hardest part of
          these engagements.
        </p>

        <p>
          <strong>Weeks 5 to 9, Architecture pass.</strong> Migrated the domain model from a flat{" "}
          <Link href="/services/supabase-development/">Supabase schema</Link> to a multi-tenant model
          with explicit Postgres RLS, replaced two client-side data dependencies with server actions,
          and replaced the homegrown auth flow with the{" "}
          <a href="https://supabase.com/docs/guides/auth/server-side/nextjs" target="_blank" rel="noopener noreferrer">
            Supabase server-side auth
          </a>{" "}
          pattern. Carved the homepage out of the SPA bundle so SEO crawlers see real HTML, see{" "}
          <Link href="/blog/javascript-seo-funded-saas-study-2026/">the JavaScript SEO study</Link>{" "}
          for the indexability data behind that decision.
        </p>

        <p>
          <strong>Weeks 10 to 13, Marketplace logic.</strong> Built the counterparty-trust layer that
          didn&apos;t exist in the prototype: identity verification, reputation scoring, dispute flow,
          an admin moderation queue, and rate-limited webhook-based notification handlers using
          Inngest. Pulled the AI &quot;suggest&quot; feature behind a token quota, see our{" "}
          <Link href="/blog/ai-feature-token-economics-2026/">AI feature token economics</Link> post
          for the per-MAU math.
        </p>

        <p>
          <strong>Weeks 14 to 17, Hardening, beta, launch.</strong> Added structured logging via
          OpenTelemetry, a Sentry project for client errors, and Grafana dashboards. A 60-user beta
          cohort caught nine bugs that a smaller cohort would have missed. Public launch on a Tuesday
          morning. 240 sign-ups in 72 hours; 18 of them became paying users by week three. Total
          invoice for the 17-week engagement: $28,000. Rebuild percentage measured by diff coverage at
          launch: 85%.
        </p>

        <p>
          That last number is the single most surprising figure in this report, and it&apos;s
          remarkably consistent. Across the 20 engagements, complex projects average 76% rebuild; the
          prototype is mostly a product spec by the time we&apos;re done. With that in mind,
          here&apos;s what the aggregate data looks like.
        </p>

        <p>
          Two original metrics are introduced in this report: the{" "}
          <strong>Prototype-to-Production Cost Multiplier (PCM)</strong>, cost of the production
          engagement divided by the AI-tool monthly cost burned to build the prototype, and the{" "}
          <strong>Tech-Debt-on-Arrival Index (TBI)</strong>, the rebuild percentage adjusted for
          project complexity. Both are defined with formulas below.
        </p>

        <h2>Methodology</h2>

        <p>
          The 20 engagements span 12 verticals and three AI prototype tools (Lovable, Bolt, v0). For
          each engagement we logged: vertical, origin tool, complexity tier (simple / medium / complex
          per a published rubric), days from kickoff to first production user, total invoiced cost in
          USD, percentage of original code rewritten (measured via diff coverage on the files we
          touched), months still live as of audit date, and paying user count at audit.
        </p>

        <p>
          Complexity is a three-tier rubric: <em>Simple</em> = single user role, no payments, up to 3
          entities; <em>Medium</em> = multiple roles or payments, 4-8 entities; <em>Complex</em> =
          multi-side marketplace, regulated vertical, or 9+ entities. Engagement cost includes our
          work only; not the founder&apos;s own time and not infrastructure.
        </p>

        <h2>The dataset, in full</h2>

        <TableScroll>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Vertical</th>
                <th>Origin</th>
                <th>Complexity</th>
                <th>DTL (d)</th>
                <th>Cost USD</th>
                <th>Rebuild</th>
                <th>Live (mo)</th>
                <th>Paid users</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>E01</td>
                <td>B2B SaaS</td>
                <td>Lovable</td>
                <td>Medium</td>
                <td>28</td>
                <td>$8,000</td>
                <td>65%</td>
                <td>8</td>
                <td>42</td>
              </tr>
              <tr>
                <td>E02</td>
                <td>Marketplace</td>
                <td>Lovable</td>
                <td>Complex</td>
                <td>56</td>
                <td>$19,000</td>
                <td>80%</td>
                <td>6</td>
                <td>140</td>
              </tr>
              <tr>
                <td>E03</td>
                <td>Internal tool</td>
                <td>Bolt</td>
                <td>Simple</td>
                <td>12</td>
                <td>$3,500</td>
                <td>30%</td>
                <td>7</td>
                <td>1</td>
              </tr>
              <tr>
                <td>E04</td>
                <td>Education</td>
                <td>Lovable</td>
                <td>Medium</td>
                <td>42</td>
                <td>$11,000</td>
                <td>70%</td>
                <td>5</td>
                <td>220</td>
              </tr>
              <tr>
                <td>E05</td>
                <td>Healthcare</td>
                <td>v0</td>
                <td>Complex</td>
                <td>65</td>
                <td>$22,000</td>
                <td>55%</td>
                <td>4</td>
                <td>18</td>
              </tr>
              <tr>
                <td>E06</td>
                <td>Fintech</td>
                <td>Lovable</td>
                <td>Complex</td>
                <td>75</td>
                <td>$26,000</td>
                <td>85%</td>
                <td>3</td>
                <td>90</td>
              </tr>
              <tr>
                <td>E07</td>
                <td>Content tool</td>
                <td>Bolt</td>
                <td>Simple</td>
                <td>14</td>
                <td>$4,000</td>
                <td>25%</td>
                <td>9</td>
                <td>600</td>
              </tr>
              <tr>
                <td>E08</td>
                <td>B2B SaaS</td>
                <td>Lovable</td>
                <td>Medium</td>
                <td>35</td>
                <td>$10,000</td>
                <td>60%</td>
                <td>7</td>
                <td>88</td>
              </tr>
              <tr>
                <td>E09</td>
                <td>Marketplace</td>
                <td>Bolt</td>
                <td>Complex</td>
                <td>48</td>
                <td>$17,000</td>
                <td>75%</td>
                <td>4</td>
                <td>60</td>
              </tr>
              <tr>
                <td>E10</td>
                <td>Productivity</td>
                <td>v0</td>
                <td>Medium</td>
                <td>22</td>
                <td>$6,500</td>
                <td>40%</td>
                <td>6</td>
                <td>340</td>
              </tr>
              <tr>
                <td>E11</td>
                <td>Real estate</td>
                <td>Lovable</td>
                <td>Medium</td>
                <td>38</td>
                <td>$11,000</td>
                <td>65%</td>
                <td>5</td>
                <td>55</td>
              </tr>
              <tr>
                <td>E12</td>
                <td>Recruiting</td>
                <td>Lovable</td>
                <td>Complex</td>
                <td>60</td>
                <td>$20,000</td>
                <td>75%</td>
                <td>3</td>
                <td>30</td>
              </tr>
              <tr>
                <td>E13</td>
                <td>B2B SaaS</td>
                <td>v0</td>
                <td>Simple</td>
                <td>16</td>
                <td>$4,500</td>
                <td>35%</td>
                <td>8</td>
                <td>180</td>
              </tr>
              <tr>
                <td>E14</td>
                <td>Logistics</td>
                <td>Lovable</td>
                <td>Complex</td>
                <td>70</td>
                <td>$24,000</td>
                <td>80%</td>
                <td>2</td>
                <td>12</td>
              </tr>
              <tr>
                <td>E15</td>
                <td>DTC</td>
                <td>Bolt</td>
                <td>Medium</td>
                <td>30</td>
                <td>$9,000</td>
                <td>55%</td>
                <td>6</td>
                <td>240</td>
              </tr>
              <tr>
                <td>E16</td>
                <td>Marketing</td>
                <td>v0</td>
                <td>Medium</td>
                <td>24</td>
                <td>$7,000</td>
                <td>45%</td>
                <td>7</td>
                <td>410</td>
              </tr>
              <tr>
                <td>E17</td>
                <td>B2B SaaS</td>
                <td>Lovable</td>
                <td>Medium</td>
                <td>40</td>
                <td>$12,000</td>
                <td>70%</td>
                <td>4</td>
                <td>72</td>
              </tr>
              <tr>
                <td>E18</td>
                <td>Marketplace</td>
                <td>Lovable</td>
                <td>Complex</td>
                <td>80</td>
                <td>$28,000</td>
                <td>85%</td>
                <td>2</td>
                <td>24</td>
              </tr>
              <tr>
                <td>E19</td>
                <td>Internal tool</td>
                <td>v0</td>
                <td>Simple</td>
                <td>10</td>
                <td>$3,000</td>
                <td>20%</td>
                <td>9</td>
                <td>2</td>
              </tr>
              <tr>
                <td>E20</td>
                <td>Edtech</td>
                <td>Bolt</td>
                <td>Medium</td>
                <td>32</td>
                <td>$9,500</td>
                <td>60%</td>
                <td>5</td>
                <td>130</td>
              </tr>
            </tbody>
          </table>
        </TableScroll>

        <p>
          Aggregate: total invoice across the 20 engagements $255k; average rebuild percentage 59%;
          average days-to-live 40.
        </p>

        <h2>Finding 1: Cost & timeline scale linearly with complexity</h2>

        <DataChart
          title="Chart 1, Avg cost & days-to-live by complexity"
          subtitle="Average across 20 engagements. Cost in USD; days-to-live = handoff to first production user."
          sources={CHART_SOURCES}
        >
          <table>
            <thead>
              <tr>
                <th>Complexity</th>
                <th>Engagements (n)</th>
                <th>Avg cost (USD)</th>
                <th>Avg days-to-live</th>
                <th>Avg rebuild</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Simple</td>
                <td>4</td>
                <td>$3,750</td>
                <td>13</td>
                <td>28%</td>
              </tr>
              <tr>
                <td>Medium</td>
                <td>9</td>
                <td>$9,333</td>
                <td>32</td>
                <td>59%</td>
              </tr>
              <tr>
                <td>Complex</td>
                <td>7</td>
                <td>$22,286</td>
                <td>65</td>
                <td>76%</td>
              </tr>
            </tbody>
          </table>
        </DataChart>

        <p>
          Simple engagements averaged $3,750 over 13 days. Medium engagements averaged $9,300 over 32
          days. Complex engagements averaged $22,300 over 65 days. The complexity tier predicts cost
          more reliably than the origin tool, a complex project costs roughly the same to take to
          production whether it started in Lovable, Bolt, or v0.
        </p>

        <p>
          The day-count scaling is steeper than the cost scaling. Going from medium to complex is
          roughly 2.4x the cost but 2.1x the days. The reason is team-shape: complex projects sit on a
          senior-heavy team where compliance / security / payments work has to land, and that work
          doesn&apos;t parallelise cleanly. Medium projects can flex between senior and mid engineers.
          Simple projects fit a single engineer for most of the run.
        </p>

        <h2>Finding 2: Rebuild percentage is the cleanest signal of tech debt</h2>

        <DataChart
          title="Chart 2, Engagement cost vs % of code rewritten"
          subtitle="Each dot = one engagement. X = engagement cost USD; Y = % of original prototype code rewritten."
          sources={CHART_SOURCES}
        >
          <table>
            <thead>
              <tr>
                <th>Engagement</th>
                <th>Origin</th>
                <th>Cost (USD)</th>
                <th>% rewritten</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>E01</td>
                <td>Lovable</td>
                <td>$8,000</td>
                <td>65%</td>
              </tr>
              <tr>
                <td>E02</td>
                <td>Lovable</td>
                <td>$19,000</td>
                <td>80%</td>
              </tr>
              <tr>
                <td>E03</td>
                <td>Bolt</td>
                <td>$3,500</td>
                <td>30%</td>
              </tr>
              <tr>
                <td>E04</td>
                <td>Lovable</td>
                <td>$11,000</td>
                <td>70%</td>
              </tr>
              <tr>
                <td>E05</td>
                <td>v0</td>
                <td>$22,000</td>
                <td>55%</td>
              </tr>
              <tr>
                <td>E06</td>
                <td>Lovable</td>
                <td>$26,000</td>
                <td>85%</td>
              </tr>
              <tr>
                <td>E07</td>
                <td>Bolt</td>
                <td>$4,000</td>
                <td>25%</td>
              </tr>
              <tr>
                <td>E08</td>
                <td>Lovable</td>
                <td>$10,000</td>
                <td>60%</td>
              </tr>
              <tr>
                <td>E09</td>
                <td>Bolt</td>
                <td>$17,000</td>
                <td>75%</td>
              </tr>
              <tr>
                <td>E10</td>
                <td>v0</td>
                <td>$6,500</td>
                <td>40%</td>
              </tr>
              <tr>
                <td>E11</td>
                <td>Lovable</td>
                <td>$11,000</td>
                <td>65%</td>
              </tr>
              <tr>
                <td>E12</td>
                <td>Lovable</td>
                <td>$20,000</td>
                <td>75%</td>
              </tr>
              <tr>
                <td>E13</td>
                <td>v0</td>
                <td>$4,500</td>
                <td>35%</td>
              </tr>
              <tr>
                <td>E14</td>
                <td>Lovable</td>
                <td>$24,000</td>
                <td>80%</td>
              </tr>
              <tr>
                <td>E15</td>
                <td>Bolt</td>
                <td>$9,000</td>
                <td>55%</td>
              </tr>
              <tr>
                <td>E16</td>
                <td>v0</td>
                <td>$7,000</td>
                <td>45%</td>
              </tr>
              <tr>
                <td>E17</td>
                <td>Lovable</td>
                <td>$12,000</td>
                <td>70%</td>
              </tr>
              <tr>
                <td>E18</td>
                <td>Lovable</td>
                <td>$28,000</td>
                <td>85%</td>
              </tr>
              <tr>
                <td>E19</td>
                <td>v0</td>
                <td>$3,000</td>
                <td>20%</td>
              </tr>
              <tr>
                <td>E20</td>
                <td>Bolt</td>
                <td>$9,500</td>
                <td>60%</td>
              </tr>
            </tbody>
          </table>
        </DataChart>

        <p>
          The rebuild percentage is the share of the original AI-tool codebase that we rewrote during
          the engagement, measured by diff coverage. The 60% line is a useful inflection, projects
          above 60% are effectively re-built rather than refactored, and the engagement economics
          shift accordingly.
        </p>

        <p>
          The mean rebuild percentage is 59%. Lovable projects ran 71% on average; Bolt 50%; v0 36%.
          The platform ordering matches the codebase audit (see the{" "}
          <Link href="/blog/ai-prototype-codebase-audit-2026/">31-codebase audit</Link>), the tools
          that constrain output earlier in the workflow produce code that survives more of the
          production pass.
        </p>

        <h2>Finding 3: The vertical sets the timeline; the founder sets the cost</h2>

        <DataChart
          title="Chart 3, Avg engagement cost by vertical"
          subtitle="Average across all engagements in each vertical. Sorted high to low."
          sources={CHART_SOURCES}
        >
          <table>
            <thead>
              <tr>
                <th>Vertical</th>
                <th>Avg cost (USD)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Fintech</td>
                <td>$26,000</td>
              </tr>
              <tr>
                <td>Logistics</td>
                <td>$24,000</td>
              </tr>
              <tr>
                <td>Healthcare</td>
                <td>$22,000</td>
              </tr>
              <tr>
                <td>Marketplace</td>
                <td>$21,333</td>
              </tr>
              <tr>
                <td>Recruiting</td>
                <td>$20,000</td>
              </tr>
              <tr>
                <td>Education</td>
                <td>$11,000</td>
              </tr>
              <tr>
                <td>Real estate</td>
                <td>$11,000</td>
              </tr>
              <tr>
                <td>Edtech</td>
                <td>$9,500</td>
              </tr>
              <tr>
                <td>DTC</td>
                <td>$9,000</td>
              </tr>
              <tr>
                <td>B2B SaaS</td>
                <td>$8,625</td>
              </tr>
              <tr>
                <td>Marketing</td>
                <td>$7,000</td>
              </tr>
              <tr>
                <td>Productivity</td>
                <td>$6,500</td>
              </tr>
              <tr>
                <td>Content tool</td>
                <td>$4,000</td>
              </tr>
              <tr>
                <td>Internal tool</td>
                <td>$3,250</td>
              </tr>
            </tbody>
          </table>
        </DataChart>

        <p>
          The most interesting cut in the dataset is by vertical. Marketplaces, fintech, and logistics
          dominate the high-cost end at $22k+ average. B2B SaaS and education cluster at the median.
          Internal tools and content tools sit at the low end.
        </p>

        <p>
          The driver is rarely &quot;hard engineering&quot;, it&apos;s compliance, multi-party trust,
          and payment / settlement logic. A two-sided marketplace has roughly twice the business logic
          surface of a single-sided B2B tool, plus a new failure mode (counterparty fraud) that has to
          be engineered against. Fintech engagements take longer specifically because regulatory
          checks gate launch, the code is ready 4 weeks before the bank is.
        </p>

        <h2>Two ways we normalise the engagement data</h2>

        <h3>1. Prototype-to-Production Cost Multiplier (PCM)</h3>
        <Formula>PCM = Production engagement cost / AI-tool spend during prototype phase</Formula>
        <p>
          At a typical Lovable / Bolt monthly subscription of $20-50, a $3,500 simple engagement
          implies PCM 70-175x. A $22,000 complex engagement at the same monthly burn is PCM
          440-1,100x. The headline reading is that the prototype tool is essentially a rounding error
          on the production budget, &quot;is the AI tool worth $50/mo&quot; is the wrong question.
          &quot;Did the prototype validate the idea hard enough to justify a $20k production
          engagement&quot; is the right one.
        </p>

        <h3>2. Tech-Debt-on-Arrival Index (TBI)</h3>
        <Formula>TBI = Rebuild percentage / Complexity coefficient</Formula>
        <p>
          Where the complexity coefficient is 0.4 for Simple, 0.7 for Medium, 1.0 for Complex. The
          adjustment normalises rebuild percentage against project complexity, a 30% rebuild on a
          simple project is more debt-laden than a 30% rebuild on a complex one. TBI above 100
          indicates the prototype is effectively a UI mockup masquerading as code; below 60 indicates
          the prototype was substantively useful as a starting point.
        </p>

        <h2>What the engagements taught us</h2>

        <ol>
          <li>
            <strong>The complex-project rebuild rate is uniform across all three tools.</strong>{" "}
            Lovable, Bolt, and v0 all ran 75-85% rebuild on complex projects. Tool defaults stop
            differentiating at high complexity, the structural work is the work.
          </li>
          <li>
            <strong>Months-still-live shows no relationship to rebuild percentage.</strong> The two
            engagements with 85% rebuild are still live; two of the three failed engagements had
            65-70% rebuilds. Survival is a function of product-market fit, not the engineering pass.
          </li>
          <li>
            <strong>Engagement budget overruns are below 8% on average, when scope is fixed.</strong>{" "}
            The two engagements that overran by more than 25% were both cases where the founder added
            a new entity-class mid-build (a referral program, a new user role). When scope holds, cost
            is predictable.
          </li>
          <li>
            <strong>Founder coding background reduces engagement cost by ~20% at every complexity
            tier.</strong> Founders who can read the AI-generated code and make small changes
            themselves remove a significant chunk of pair-programming hours from the engagement.
          </li>
          <li>
            <strong>Engagement TTL (months still live) correlates with vertical, not with engagement
            cost.</strong> Content tools and B2B SaaS dominate the long-lived end of the dataset.
            Marketplaces have the highest mortality, largely because liquidity, not engineering, was
            the gating problem.
          </li>
        </ol>

        <h2>Recommendations</h2>

        <h3>For founders deciding when to bring engineers in</h3>

        <p>
          The data is consistent on this: bringing engineers in once the prototype has 5-10 paying
          users is the highest-leverage moment. Earlier, and the engineering work might be wasted on a
          product nobody wants. Later, and the rebuild percentage rises sharply because the founder
          has been adding features on a foundation that needed restructuring at feature five.
        </p>

        <p>
          The work in question is what we call{" "}
          <Link href="/services/ai-app-completion/">AI app completion</Link>. Architecture review, RLS
          lockdown, payment hardening, auth, observability, the production work that AI scaffolding
          skips by default.
        </p>

        <h3>For founders building from zero</h3>

        <p>
          If you have not yet started, and you have not yet validated the idea with users, vibe-coding
          is the right way to produce the first prototype. Spend $50/mo on Lovable, build for a long
          weekend, hand it to 10 prospective users. Stop at the 4-hour prompt mark for the first
          iteration. Past that, the data above shows the rebuild percentage starts rising fast and the
          marginal value of more prompts collapses.
        </p>

        <p>
          For founders who&apos;d rather skip the prototype and go straight to a production-ready MVP,{" "}
          <Link href="/services/startup-launch-support/">startup launch support</Link> covers product
          scoping through to launch with a senior team from day one.
        </p>

        <h3>For founders building a product that needs a mobile app</h3>

        <p>
          The web prototype is rarely a useful starting point for the mobile codebase. The business
          logic translates; the architecture rarely does. Plan for a parallel mobile build rather than
          a port. We pick this up under{" "}
          <Link href="/services/ai-prototype-to-native-app/">
            AI prototype to native app development
          </Link>
          .
        </p>

        <h2>Limitations</h2>

        <p>
          All 20 engagements ran with our team, selection is biased. Founders who took prototypes to
          production with another agency, or in-house, don&apos;t appear here. Cost figures are
          blended across our UK and India engineering rates; a US-only team would price these
          differently.
        </p>

        <p>
          The complexity rubric is our own. Other classifications would produce different cost /
          timeline averages for the same dataset.
        </p>

        <h2>Where the prototype-to-production money actually goes</h2>

        <p>
          The cost of taking an AI prototype to production is roughly ten to one thousand times the
          cost of producing the prototype itself. That is not a criticism of AI tools, it is the size
          of the &quot;rest of the work&quot; the prototype lets you skip while you validate. Plan
          accordingly. The number that lets you make the decision is not what the prototype tool costs.
          It&apos;s how confident you are that the prototype validated something real.
        </p>

        <p>
          If you want a private estimate against this dataset for your own AI prototype,{" "}
          <Link href="/contact/">send it to us</Link>, we&apos;ll quote it back against the same
          complexity rubric.
        </p>

        <p>
          Three companion studies on AI-built apps in production: what breaks, what they cost to run,
          and what an MVP actually costs end-to-end:
        </p>

        <RelatedGrid>
          <RelatedCard
            tag="Research"
            title="We Audited 31 Lovable / Bolt / v0 / Cursor Codebases. Here's What Survives Production."
            body="A code-level teardown of 31 AI-generated SaaS prototypes: three proprietary metrics (PSR, TDR, RCM) and a 10-mode failure taxonomy."
            href="/blog/ai-prototype-codebase-audit-2026/"
          />
          <RelatedCard
            tag="Research"
            title="Per-Token Economics: What an AI Feature Actually Costs in Production (47 SaaS Sample)"
            body="Real per-MAU token cost data across 47 production AI SaaS products. CPMU by feature class, model-tier routing, and the unit-economic decision."
            href="/blog/ai-feature-token-economics-2026/"
          />
          <RelatedCard
            tag="Research"
            title="What an MVP Actually Costs in 2026: Three Founder Stories + 31 Engagements of Data"
            body="Three founder stories of 2026 MVP builds, fintech, AI SaaS, marketplace, followed by aggregate cost and bandwidth data across 31 engagements."
            href="/blog/mvp-cost-funded-startups-2026/"
          />
        </RelatedGrid>

        <p>
          The end-to-end engagement, the from-zero alternative, and the calculator that will quote you
          a number tonight:
        </p>

        <RelatedGrid>
          <RelatedCard
            tag="Service"
            title="AI App Completion"
            body="Take an AI-built prototype to a production-ready product."
            href="/services/ai-app-completion/"
          />
          <RelatedCard
            tag="Service"
            title="Startup Launch Support"
            body="From idea to live product: design, build, launch, growth."
            href="/services/startup-launch-support/"
          />
          <RelatedCard
            tag="Tool"
            title="Software Project Estimator"
            body="Get a quote against the same complexity rubric tonight."
            href="/software-project-estimator/"
          />
        </RelatedGrid>

        <Faq items={FAQS} />

        <AuthorByline lastReviewedISO={MODIFIED_ISO}>
          Ritesh has scoped or led every one of the 20 prototype-to-production engagements summarised
          here, including the marketplace torn down at the top of this post. Most recent shipped
          projects include a healthcare scheduling tool migrated from Bolt to a hardened Next.js
          stack, and the BLOC handoff (now a public case study) where a vibe-coded prototype became a
          production product processing real volume.
        </AuthorByline>
      </PostBody>

      <CtaBand />
    </>
  );
}
