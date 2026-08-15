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

const PUBLISHED_ISO = "2026-08-04";
const MODIFIED_ISO = "2026-08-04";
const READ_TIME = "19 min read";

const PAGE_TITLE = "The Real Cost of 10,000 Workflow Runs: Zapier vs Make vs n8n vs Custom Code | Appycodes";
const PAGE_DESCRIPTION =
  "Opens with one ops team's $540 Zapier month, then bills three real workflows on Zapier, Make, self-hosted n8n and custom Node at 1K to 100K runs. EC10K, MTV, FRO.";
const PAGE_PATH = "/blog/workflow-automation-cost-benchmark-2026/";
const PAGE_IMAGE = "/images/blog-workflow-automation-cost-benchmark-2026.jpg";
const PAGE_KEYWORDS =
  "workflow automation cost, zapier vs make vs n8n, n8n self hosted cost, zapier task pricing, zapier alternatives, custom workflow automation";

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
    q: "Should we use Zapier, Make, or n8n?",
    a: "Pick by monthly operations, not by feature list. Under 1K ops the Zapier free tier is fine. From 1K to 10K ops Make is the sweet spot: our 9-module order sync cost $9 a month there against $69 on Zapier. From 10K to 100K ops self-hosted n8n wins on a roughly $10 fixed infrastructure cost. Past 100K ops a custom Node worker's variable cost is near zero once the infrastructure is paid.",
  },
  {
    q: "What does self-hosted n8n actually cost per month?",
    a: "In our benchmark: $10 a month of VPS infrastructure at 10,000 runs and about $38 at 100,000 runs (queue mode, two workers, managed Postgres), plus roughly 1 to 1.5 hours of maintenance a month. Costed at a blended $90 per hour with the build amortised over 24 months, the honest all-in figure at 10K runs is about $253 a month, not $10.",
  },
  {
    q: "When should we replace Zapier or Make with custom code?",
    a: "Compute your Migration Trigger Volume: the volume at which the next tier's all-in monthly cost, including the migration amortised over 24 months, drops below your current bill. Mechanically that lands past 100K ops a month. It arrives earlier if you need transactional guarantees, sub-second latency, or automation logic in version control for compliance, because no-code platforms cannot promise any of the three.",
  },
  {
    q: "How much does an AI agent cost to build into a workflow?",
    a: "A bounded LLM step (classify, extract, draft) adds roughly $0.001 to $0.03 per run in tokens: $10 to $300 a month at 10K runs, which can exceed the platform bill itself. A fully autonomous agent is an $8K to $30K build, and 88% of enterprise agent pilots never reach production. We ship single LLM steps inside deterministic workflows first and measure them before widening scope.",
  },
  {
    q: "Is Make really cheaper than Zapier for multi-step workflows?",
    a: "At volume, consistently. Make bills per module operation and Zapier per task, and Make's unit price is 5 to 8 times lower on our benchmark: the same 10,000 order-sync runs cost $81 on Make against $433 on Zapier at July 2026 list prices. Below a few hundred runs a month the difference rarely matters, which is why the free tier keeps its place on the decision curve.",
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
  breadcrumbLabel: "Workflow Automation Cost Benchmark",
  keywords: PAGE_KEYWORDS,
  faqs: FAQS,
});

export default function Page() {
  return (
    <>
      <JsonLd data={schemas} />

      <PostHeader
        eyebrow="Automation cost benchmark"
        title="The real cost of 10,000 workflow runs: Zapier vs Make vs n8n vs custom code"
        lead="The same three workflows, lead routing, order sync, report generation, rebuilt on four automation tiers and billed at 1,000, 10,000 and 100,000 runs a month. With the invoices."
        breadcrumbLabel="Workflow Automation Cost Benchmark"
        dateISO={MODIFIED_ISO}
        readTime={READ_TIME}
        image={PAGE_IMAGE}
        imageAlt="Workflow automation cost benchmark"
      />

      <PostBody>
        <Callout variant="tldr">
          <ul>
            <li>
              <strong>
                At 10,000 runs a month, one 9-module order-sync workflow bills $433 on Zapier, $81 on Make, about $10 of
                infrastructure on self-hosted n8n, and about $6 on a custom Node worker.
              </strong>{" "}
              Per-task pricing punishes exactly the workflows that save the most manual work.
            </li>
            <li>
              <strong>Step count, not run count, drives the bill.</strong> A looped report that touches 120 line items
              bills 125 times per run on Zapier, about 130 times on Make, once on n8n, and never on a worker you own.
              Failure recovery is billable too: 7 to 11% of Zapier tasks in our sample were replays.
            </li>
            <li>
              <strong>
                The decision curve holds: under 1K ops the Zapier free tier, 1K to 10K ops Make, 10K to 100K ops
                self-hosted n8n, 100K+ ops a custom Node worker.
              </strong>{" "}
              Migrations amortise faster than operators expect: the rebuild behind this post&apos;s opening anatomy paid
              back inside eight months.
            </li>
          </ul>
        </Callout>

        <p>
          Every automation platform prices a different unit. Zapier bills the task, Make bills the operation, n8n bills
          the execution, and a worker you own bills nothing but the server it runs on. Before the aggregate, the anatomy
          of one specific bill: a nine-person operations team at a UK trade distributor, and the March invoice that made
          them phone us.
        </p>

        <h2>Anatomy: a $540 Zapier month, line by line</h2>

        <p>
          The account was a Zapier Professional plan with a 50,000-task allowance, billed monthly at $433.35. Three Zaps
          did the unglamorous work of the business: routing inbound leads, syncing storefront orders into the ERP, and
          producing a morning trading report. The March invoice came to $540.26. Zapier&apos;s invoice is one line, so we
          reconstructed where the money went from the task-history export. Four lines explain all of it.
        </p>

        <p>
          Worth saying up front: this account was four years old and had been cheap for most of its life. The team
          started on the free tier in 2022 with a single lead-capture Zap, upgraded to a paid plan when the storefront
          launched, and then let order volume do what order volume does. Nobody ever made a decision that cost $540 a
          month. They made a dozen small, sensible decisions, each of which added a step or a Zap, and the pricing model
          compounded them.
        </p>

        <p>
          <strong>Line one, lead routing.</strong> A six-module Zap: form-submission trigger, enrichment lookup,
          spreadsheet owner lookup, CRM upsert, Slack alert to the sales channel, and an intro email. Zapier does not
          bill the trigger, so each run consumes five tasks. It ran 4,120 times in March: 20,600 tasks, about a third of
          everything billed.
        </p>

        <p>
          <strong>Line two, order sync.</strong> The heaviest legitimate line. A webhook fires from the storefront on
          every order, then eight billable actions run: fetch the full order detail, transform it, check for a
          duplicate, upsert into the ERP, check stock, draft the invoice, post to Slack, and write an audit-log row.
          3,410 runs at eight tasks each: 27,280 tasks, just under half the month.
        </p>

        <p>
          <strong>Line three, the morning report.</strong> A scheduled Zap that ran only 62 times all month, every
          weekday morning plus month-end reruns, and still billed 7,750 tasks. The reason is the loop: it pulls the
          previous day&apos;s orders and iterates roughly 120 line items through a formatting action before assembling
          and delivering the report, an average of 125 billable tasks per run. A workflow that ran 62 times cost more
          than 1,500 runs of lead routing would have.
        </p>

        <p>
          <strong>Line four, the replays.</strong> 4,238 tasks, 7.1% of everything billed, were replays of failed runs:
          a flaky ERP endpoint here, a rate-limited CRM there. Replaying a failed run on Zapier bills every step of that
          run again. Failure recovery was the fourth-largest workload in the account, and it produced nothing new.
        </p>

        <p>
          The total: 59,868 tasks against a 50,000-task allowance, from just 7,592 workflow runs. The 9,868 overage
          tasks billed at 1.25x the blended per-task rate added $106.91 to the $433.35 base. $540.26 for the month,
          seven cents per workflow run. Nothing in the account was misconfigured; every Zap was defensible on its own.
          The bill is an artefact of the pricing model, which converts step count and failure recovery into revenue.
          This team is the exact persona on our service page: operators on Zapier whose monthly bill has crossed $500
          and is climbing.
        </p>

        <p>
          We rebuilt the same three workflows on a self-hosted n8n instance: one $12-a-month VPS running Docker,
          Postgres, and nightly backups. The engagement cost $3,200. The monthly bill fell from $540 to $12 of
          infrastructure plus about an hour of attention. Billing that hour at agency rates, the rebuild paid back in
          month eight; costing it at zero, inside seven. That one account is the reason this benchmark exists.
        </p>

        <h2>The benchmark: the same three workflows, four ways</h2>

        <p>
          The three shapes in that account recur across almost every automation engagement we run, so we made them the
          benchmark. We rebuilt lead routing, order sync, and report generation on all four tiers of the automation
          stack, Zapier, Make, self-hosted n8n, and a custom Node worker, and priced each at 1,000, 10,000, and 100,000
          runs a month. Independent pricing teardowns, like{" "}
          <a
            href="https://massivegrid.com/blog/n8n-pricing-self-hosted-vs-cloud-vs-zapier/"
            target="_blank"
            rel="noopener noreferrer"
          >
            MassiveGrid&apos;s n8n pricing comparison
          </a>{" "}
          and{" "}
          <a href="https://tech-insider.org/n8n-vs-zapier-2026/" target="_blank" rel="noopener noreferrer">
            Tech Insider&apos;s 2026 n8n vs Zapier analysis
          </a>
          , land in the same bands on list prices. What list prices cannot show is production behaviour: retries,
          replays, loop blowouts, and ops hours. We have the invoice exports for those.
        </p>

        <p>
          A note on units before the charts, because the vendors do not share one. A <strong>run</strong> is one
          end-to-end pass through a workflow: one lead routed, one order synced, one report produced. That is the unit a
          business actually buys, so it is the unit we bill the benchmark in. An <strong>operation</strong> (or task) is
          a single step inside a run, and it is what Zapier and Make meter. The whole benchmark, reduced to one
          sentence: the gap between what you buy and what you are billed for is where automation budgets go to die.
        </p>

        <h2>Methodology</h2>

        <p>
          The three workflow shapes, exactly as benchmarked. <strong>Lead routing:</strong> six modules (trigger plus
          five actions), five billable Zapier tasks or six Make operations per run. <strong>Order sync:</strong> nine
          modules (webhook trigger plus eight actions), eight tasks or nine operations per run.{" "}
          <strong>Report generation:</strong> a scheduled trigger that iterates roughly 120 line items, averaging 125
          billable tasks or about 130 operations per run. Each shape was built with the same error handling on every
          tier: retry with backoff, then a dead-letter path that alerts a human.
        </p>

        <p>
          The four tiers as configured: Zapier Professional and Make Core at July 2026 list prices on annual billing
          (see the{" "}
          <a href="https://zapier.com/pricing" target="_blank" rel="noopener noreferrer">
            Zapier
          </a>{" "}
          and{" "}
          <a href="https://www.make.com/en/pricing" target="_blank" rel="noopener noreferrer">
            Make
          </a>{" "}
          pricing pages); n8n self-hosted via Docker Compose with Postgres and nightly snapshots on a $10 VPS, since the
          licence itself is fair-code and free (
          <a href="https://n8n.io/pricing" target="_blank" rel="noopener noreferrer">
            n8n Cloud
          </a>{" "}
          Pro lists at roughly $50 a month for 10K executions, but self-hosted is what we ship); and a custom Node
          worker using BullMQ and Redis on the same class of VPS. Failure-recovery figures come from 60 days of
          execution logs across 11 client accounts we operate. Invoice exports and task histories are from client
          accounts, anonymised and shared with consent; figures are rounded so no single account is identifiable.
        </p>

        <TableScroll>
          <table>
            <thead>
              <tr>
                <th>Tier</th>
                <th>Billable unit</th>
                <th>What counts</th>
                <th>List anchor (July 2026)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Zapier</td>
                <td>Task</td>
                <td>Every successful action step; triggers are free</td>
                <td>2K tasks from $49/mo; 50K from $347/mo (annual)</td>
              </tr>
              <tr>
                <td>Make</td>
                <td>Operation</td>
                <td>Every module run, triggers included</td>
                <td>10K ops from $9/mo (Core, annual)</td>
              </tr>
              <tr>
                <td>n8n (self-hosted)</td>
                <td>Execution</td>
                <td>A full workflow run, any number of steps; licence free</td>
                <td>Infrastructure from $10/mo</td>
              </tr>
              <tr>
                <td>n8n Cloud</td>
                <td>Execution</td>
                <td>Same unit, managed hosting</td>
                <td>Pro about $50/mo for 10K executions</td>
              </tr>
              <tr>
                <td>Custom Node worker</td>
                <td>Nothing metered</td>
                <td>You pay infrastructure and build cost only</td>
                <td>Infrastructure from $6/mo</td>
              </tr>
            </tbody>
          </table>
        </TableScroll>

        <h2>Finding 1: four bills for the same 10,000 runs</h2>

        <DataChart
          title="Chart 1: One month of Zapier usage, reconstructed from the task-history export"
          subtitle="The anatomy account, March 2026. 59,868 tasks from 7,592 runs; $540.26 billed."
          sources="Sources: anonymised client Zapier invoice and task-history export (March 2026), shared with consent; Zapier pricing (https://zapier.com/pricing)."
        >
          <table>
            <thead>
              <tr>
                <th>Line item</th>
                <th>Billable steps per run</th>
                <th>Runs</th>
                <th>Tasks</th>
                <th>Share</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Lead routing</td>
                <td>5</td>
                <td>4,120</td>
                <td>20,600</td>
                <td>34.4%</td>
              </tr>
              <tr>
                <td>Order sync</td>
                <td>8</td>
                <td>3,410</td>
                <td>27,280</td>
                <td>45.6%</td>
              </tr>
              <tr>
                <td>Report generation (looped)</td>
                <td>125 avg</td>
                <td>62</td>
                <td>7,750</td>
                <td>12.9%</td>
              </tr>
              <tr>
                <td>Replays of failed runs</td>
                <td>varies</td>
                <td>replays</td>
                <td>4,238</td>
                <td>7.1%</td>
              </tr>
            </tbody>
          </table>
        </DataChart>

        <p>
          Scaled to a clean 10,000 runs a month per workflow, the four tiers produce four very different bills for
          identical work. The order-sync spread runs from $6 to $433 a month, a factor of 72, before failure recovery is
          added.
        </p>

        <DataChart
          title="Chart 2: Monthly platform bill at 10,000 runs per month, by workflow and tier"
          subtitle="USD per month. List prices, annual billing. Custom Node excludes build cost, covered under EC10K below."
          sources="Sources: Zapier pricing (https://zapier.com/pricing), Make pricing (https://www.make.com/en/pricing), n8n pricing (https://n8n.io/pricing), list prices July 2026; anonymised client invoice exports (2025 to 2026) for validation, shared with consent."
        >
          <table>
            <thead>
              <tr>
                <th>Workflow (units at 10K runs)</th>
                <th>Zapier</th>
                <th>Make</th>
                <th>n8n self-hosted</th>
                <th>Custom Node</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Lead routing (50K tasks / 60K ops)</td>
                <td>$347</td>
                <td>$54</td>
                <td>$10</td>
                <td>$6</td>
              </tr>
              <tr>
                <td>Order sync (80K tasks / 90K ops)</td>
                <td>$433</td>
                <td>$81</td>
                <td>$10</td>
                <td>$6</td>
              </tr>
              <tr>
                <td>Report generation (1.25M tasks / 1.3M ops)</td>
                <td>$3,900+ (est.)</td>
                <td>$649 (est.)</td>
                <td>$22</td>
                <td>$9</td>
              </tr>
            </tbody>
          </table>
        </DataChart>

        <p>
          The order-sync row is the one to memorise. An eight-action workflow at 10,000 runs is 80,000 Zapier tasks:
          $433 a month on annual billing and north of $540 on monthly billing, exactly the $300 to $500+ band the
          independent comparisons report. Make holds the middle at $81 because its operations are 5 to 8 times cheaper
          per unit. n8n does not care how many steps the workflow has, so both transactional shapes cost the same $10 of
          infrastructure. The report-generation row is where per-unit pricing stops being a bill and becomes a policy:
          1.25 million tasks a month took us off Zapier&apos;s public price list entirely. The quote we got back was an
          enterprise conversation, not a price.
        </p>

        <p>
          The lead-routing row makes a subtler point. Zapier&apos;s free trigger is genuinely worth something on short
          workflows: five billable tasks instead of six shaves 17% off the unit count, which is why Zapier looks least
          bad on the shortest shape. Make bills the trigger as an operation, so its unit counts run slightly higher, and
          it still lands at an eighth of Zapier&apos;s price. Once a workflow passes four or five steps, no accounting
          nicety survives the per-unit multiplication.
        </p>

        <h2>Finding 2: step count is the multiplier nobody prices in</h2>

        <DataChart
          title="Chart 3: Order sync, monthly bill at 1K, 10K and 100K runs per month"
          subtitle="Nine modules, eight billable actions. Monthly platform and infrastructure bill, USD."
          sources="Sources: Zapier pricing (https://zapier.com/pricing), Make pricing (https://www.make.com/en/pricing), n8n pricing (https://n8n.io/pricing), list prices July 2026; infrastructure at Hetzner / DigitalOcean list prices; anonymised client invoice exports, shared with consent."
        >
          <table>
            <thead>
              <tr>
                <th>Runs per month</th>
                <th>Zapier</th>
                <th>Make</th>
                <th>n8n self-hosted</th>
                <th>Custom Node</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1,000</td>
                <td>$69</td>
                <td>$9</td>
                <td>$10</td>
                <td>$6</td>
              </tr>
              <tr>
                <td>10,000</td>
                <td>$433</td>
                <td>$81</td>
                <td>$10</td>
                <td>$6</td>
              </tr>
              <tr>
                <td>100,000</td>
                <td>$2,999+ (est.)</td>
                <td>$415</td>
                <td>$38</td>
                <td>$24</td>
              </tr>
            </tbody>
          </table>
        </DataChart>

        <p>
          Scale the runs 100x and the four tiers diverge completely. Zapier climbs roughly 43x, from $69 to an estimated
          $2,999 and a sales call. Make climbs 46x but from a far lower base, reaching $415. The self-hosted n8n line
          moves only when the infrastructure does: $10 to $38, the step up paying for queue mode, two worker containers,
          and managed Postgres. The custom worker moves from $6 to $24 for the same reason. Per-unit pricing has a
          second, quieter property: the tier thresholds. Every time usage crosses one, the plan upgrades and the
          per-month figure ratchets, usually announced in an email nobody reads. The anatomy team&apos;s bill never
          jumped; it crept, $30 to $60 at a time, for over a year.
        </p>

        <p>
          The thresholds also poison capacity planning. On a per-unit platform you buy an allowance, and a good month
          for the business, a product launch, a seasonal spike, a viral post, is by definition a bad month for the
          automation bill: the overage rate on the anatomy account was 1.25x list. The fixed-cost tiers invert that. A
          spike month on self-hosted n8n or a custom worker costs the same as a quiet one until you physically outgrow
          the box, and outgrowing a box is a planned upgrade, not a penalty rate.
        </p>

        <p>
          The loop is the extreme case. An iterator turns one run of the report workflow into 125 billable units, so the
          workflows that replace the most manual effort, the ones that touch every order line, every row, every
          attachment, are precisely the ones per-task pricing punishes hardest. On n8n and on a worker you own, the loop
          is just compute, and compute is nearly free at this scale.
        </p>

        <h2>Finding 3: failures are billable</h2>

        <p>
          Distributed workflows fail routinely: rate limits, timeouts, flaky third-party endpoints. The engineering
          answer is retries with backoff, idempotency, and a dead-letter path, the same discipline we documented
          end-to-end in our <Link href="/blog/stripe-webhooks-end-to-end-2026/">Stripe webhooks guide</Link>. The
          billing answer differs by tier: on per-unit platforms, recovery consumes units. Zapier bills a replayed run in
          full. Make&apos;s error-handler routes are modules, and modules consume operations. n8n retries cost compute
          only. On a custom worker, retries are code you wrote once.
        </p>

        <DataChart
          title="Chart 4: Failure Recovery Overhead (FRO) measured over 60 days"
          subtitle="Order-sync shape across 11 client accounts we operate. FRO = share of billed units consumed by recovery."
          sources="Sources: execution logs and invoice exports from 11 anonymised client accounts (60 days, 2026), shared with consent; Zapier pricing (https://zapier.com/pricing), Make pricing (https://www.make.com/en/pricing), n8n pricing (https://n8n.io/pricing)."
        >
          <table>
            <thead>
              <tr>
                <th>Tier</th>
                <th>Recovery mechanism</th>
                <th>FRO</th>
                <th>Cost at 10K runs</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Zapier</td>
                <td>Replay bills the run&apos;s tasks again</td>
                <td>9.2%</td>
                <td>$40 / mo</td>
              </tr>
              <tr>
                <td>Make</td>
                <td>Error-handler routes consume operations</td>
                <td>7.6%</td>
                <td>$6 / mo</td>
              </tr>
              <tr>
                <td>n8n (self-hosted)</td>
                <td>Retry on fail, compute only</td>
                <td>8.4% of executions</td>
                <td>$0 marginal</td>
              </tr>
              <tr>
                <td>Custom Node worker</td>
                <td>Retry with backoff, written once</td>
                <td>n/a (nothing metered)</td>
                <td>$0 marginal</td>
              </tr>
            </tbody>
          </table>
        </DataChart>

        <p>
          Failure rates were similar everywhere, 7 to 9% of runs needing at least one retry, because the failures live
          in the third-party APIs, not the orchestrator. What differs is who pays. Across the 11 accounts, Zapier FRO
          ranged 7 to 11% of billed tasks; the anatomy account sat at 7.1%. The practical rule: add your measured FRO to
          any per-unit quote before comparing tiers. A $433 list bill is a $473 real bill at 9.2%. And treat a rising
          FRO as an architecture smell: it usually means a missing idempotency key or a retry storm, not a worse month.
        </p>

        <p>
          The dead-letter path deserves its own line item in the comparison, because it is where the tiers differ most
          in kind rather than price. On Zapier, a failed run sits in the Zap history waiting for someone to notice and
          replay it, and auto-replay is gated to the higher plans. On Make, you build the error route yourself, and it
          spends operations every time it fires. On n8n and on a custom worker, the failed job is a row you own: you can
          query it, alert on it, batch-retry it after the flaky endpoint recovers, and audit it months later. For the
          compliance-bound clients in our sample, that queryability, not the price, was the deciding argument.
        </p>

        <h2>How we measure automation cost</h2>

        <h3>1. Effective Cost per 10K Runs (EC10K)</h3>
        <Formula>EC10K = (platform fees + infrastructure + ops hours at a blended rate + build cost / 24) x (10,000 / monthly runs)</Formula>
        <p>
          The all-in monthly cost, normalised to 10,000 runs so tiers with different billing units become comparable.
          The anatomy account&apos;s EC10K on Zapier was $712. After the n8n rebuild it fell to roughly $310 including
          the amortised build and the maintenance hour, and it drops to about $134 once the build finishes amortising in
          month 24.
        </p>

        <DataChart
          title="Chart 5: All-in EC10K for order sync at 10,000 runs per month"
          subtitle="Platform and infrastructure bill, ops hours at a blended $90/hr, and build cost amortised over 24 months. At exactly 10K runs, EC10K equals the all-in monthly figure."
          sources="Sources: benchmark builds of the order-sync shape on all four tiers (2026); Zapier pricing (https://zapier.com/pricing), Make pricing (https://www.make.com/en/pricing), n8n pricing (https://n8n.io/pricing); our engagement records for build hours, anonymised with consent."
        >
          <table>
            <thead>
              <tr>
                <th>Tier</th>
                <th>Platform + infra</th>
                <th>Ops hours</th>
                <th>Build amortised</th>
                <th>EC10K</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Zapier</td>
                <td>$433</td>
                <td>$45 (0.5 hr)</td>
                <td>$29</td>
                <td>$507</td>
              </tr>
              <tr>
                <td>Make</td>
                <td>$81</td>
                <td>$90 (1 hr)</td>
                <td>$50</td>
                <td>$221</td>
              </tr>
              <tr>
                <td>n8n (self-hosted)</td>
                <td>$10</td>
                <td>$135 (1.5 hrs)</td>
                <td>$108</td>
                <td>$253</td>
              </tr>
              <tr>
                <td>Custom Node worker</td>
                <td>$6</td>
                <td>$45 (0.5 hr)</td>
                <td>$283</td>
                <td>$334</td>
              </tr>
            </tbody>
          </table>
        </DataChart>

        <p>
          Two honest observations from Chart 5. First, on a single workflow at this volume, Make wins the all-in race:
          its platform bill is low and it carries almost no ops burden. Second, the n8n and custom rows are carrying
          fixed costs that do not scale with the portfolio. Add the other two benchmark workflows at the same volume and
          Make&apos;s platform line grows to $784 a month ($54 + $81 + $649), while one $22 n8n instance runs all three.
          The n8n crossover comes from portfolio size as much as from volume, and after month 24 the amortisation
          columns fall to zero: the custom row drops to $51 and the n8n row to $145.
        </p>

        <h3>2. Migration Trigger Volume (MTV)</h3>
        <Formula>MTV = the monthly volume at which (next tier&apos;s all-in monthly cost + migration cost / 24) drops below the current monthly bill</Formula>
        <p>
          The volume at which staying put starts costing more than moving, with the migration itself priced in. For the
          anatomy team, MTV against a self-hosted n8n rebuild worked out at roughly 35,000 tasks a month. Their usage
          crossed that line more than a year before the $540 invoice arrived, which is the point: MTV is invisible
          unless you compute it, because per-unit bills ratchet quietly. We now recompute it quarterly for every
          automation client.
        </p>

        <h3>3. Failure Recovery Overhead (FRO)</h3>
        <Formula>FRO = billable units consumed by retries, replays and error handlers / total billable units consumed</Formula>
        <p>
          The share of the bill that produced nothing new. Benchmark bands: 7 to 11% on Zapier, 6 to 9% on Make,
          compute-only on n8n and custom workers. FRO belongs in every tier comparison and in every capacity plan: a
          50,000-unit allowance is really a 45,000-unit allowance at 10% FRO.
        </p>

        <h2>The decision curve, with receipts</h2>

        <p>
          The cost-vs-volume curve on our{" "}
          <Link href="/services/workflow-automation-development/">workflow automation development</Link> service page
          plots estimated monthly cost against operations per month and picks a winner per band. This benchmark is that
          curve with receipts. The bands are in operations, billable steps, not runs: multiply runs by module count to
          find your position. The anatomy team&apos;s 7,592 runs were 64,000 operations, squarely in the n8n band.
        </p>

        <DataChart
          title="Chart 6: The automation cost-vs-volume decision curve, validated"
          subtitle="Platform and infrastructure spend. Assumes the marginal ops burden of a VPS you already run is under an hour a month."
          sources="Sources: the cost-vs-volume curve on our workflow automation service page, validated against Charts 2 to 5; Zapier pricing (https://zapier.com/pricing), Make pricing (https://www.make.com/en/pricing), n8n pricing (https://n8n.io/pricing)."
        >
          <table>
            <thead>
              <tr>
                <th>Volume band (ops / mo)</th>
                <th>Cheapest tier</th>
                <th>Benchmark receipt</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Under 1K</td>
                <td>Zapier free tier</td>
                <td>Single scenario, save the budget: the free tier absorbs it</td>
              </tr>
              <tr>
                <td>1K to 10K</td>
                <td>Make.com (sweet spot)</td>
                <td>Order sync at 1K runs: $9 against $69 on Zapier</td>
              </tr>
              <tr>
                <td>10K to 100K</td>
                <td>n8n (self-hosted)</td>
                <td>Order sync at 10K runs: $10 of infrastructure against $81 on Make; one instance runs the whole portfolio</td>
              </tr>
              <tr>
                <td>100K+</td>
                <td>Custom Node worker</td>
                <td>At 100K runs: $24 against $415, and near zero once the build amortises</td>
              </tr>
            </tbody>
          </table>
        </DataChart>

        <p>
          One annotation the service page already makes and the data supports: the curve tracks platform and
          infrastructure spend. If you bill your own time at agency rates, the crossovers slide right, and the n8n
          takeover lands nearer 60 to 90K ops; if your ops time is already sunk into servers you run anyway, it lands
          near the 10K boundary. The Make band is also the tier we teach. The live-training stack we run for practising
          Chartered Accountants (Lovable, Supabase, Vercel, Cloudflare, Make.com) uses Make because a six-step scenario
          at 1,000 runs costs around $5 a month: cheap enough that non-engineers automate their own practice without
          asking anyone&apos;s permission.
        </p>

        <p>
          Where does n8n Cloud sit on the curve? Between bands, deliberately. At roughly $50 a month for 10K executions
          it is five times the infrastructure cost of self-hosting, and what it buys is the absence of the ops hours in
          Chart 5. For a team with no VPS and no appetite for one, that trade is often correct, and it moves the
          self-hosting question from &ldquo;can we run a server&rdquo; to &ldquo;when does $40 a month of convenience
          stop being worth it&rdquo;. The moment the answer involves audit requirements or six-figure execution counts,
          the self-hosted band reasserts itself.
        </p>

        <h2>Where an AI agent step belongs (and where pilots go to die)</h2>

        <p>
          Every automation conversation in 2026 eventually arrives at &ldquo;should this be an agent?&rdquo; Our answer
          from production: an LLM earns its place in a workflow as a bounded, single-purpose step, not as the
          orchestrator. Classify the inbound lead before routing it. Extract purchase-order fields from the emailed PDF
          before the ERP upsert. Draft the reply a human approves. In each case the workflow engine stays deterministic,
          the model produces schema-validated output, and there is a fallback path when it does not.
        </p>

        <p>
          The unit economics are unforgiving either way. A bounded LLM step adds roughly $0.001 to $0.03 per run
          depending on model tier: $10 to $300 a month at 10,000 runs, which can exceed the entire platform bill from
          Chart 2. We covered the per-token math in depth in our{" "}
          <Link href="/blog/ai-feature-token-economics-2026/">AI feature token economics study</Link>. And if the step
          answers from your own documents, retrieval quality is the ceiling on everything downstream; the{" "}
          <Link href="/blog/production-rag-pipeline-2026/">production RAG pipeline guide</Link> covers the chunking,
          reranking, and caching decisions that keep that step both accurate and affordable. Note the double billing on
          per-task platforms: the LLM step bills as a task and in tokens. On n8n or a worker you own, you pay tokens
          only.
        </p>

        <p>
          The industry data explains our caution about going further.{" "}
          <a
            href="https://www.digitalapplied.com/blog/ai-agent-adoption-2026-enterprise-data-points"
            target="_blank"
            rel="noopener noreferrer"
          >
            Digital Applied&apos;s 2026 enterprise adoption data
          </a>{" "}
          puts the share of AI agent pilots that never reach production at 88%, and{" "}
          <a href="https://www.accelirate.com/agentic-ai-statistics-2026/" target="_blank" rel="noopener noreferrer">
            Accelirate&apos;s agentic AI statistics
          </a>{" "}
          point at the same culprits: governance gaps, ROI nobody can measure, and integration debt. The pattern we see
          in rescue work matches. Pilots die when the agent is the orchestrator: unbounded scope, unauditable decisions,
          a per-run cost nobody can forecast. Agent-as-step survives because it is measurable: a deflection rate, a
          capped token budget, and a dead-letter path to a human when confidence drops. Build the boring workflow first;
          promote one step to a model; measure it; only then consider a second.
        </p>

        <h2>The migration path off Zapier</h2>

        <p>
          The wrong way off a $500 Zapier bill is a big-bang rewrite of everything at once. The right way is to compute
          MTV per workflow and move the expensive shapes first, because the loop-heavy report workflow and the 3,000-run
          order sync are carrying the bill while a dozen small Zaps cost pennies. This laddering is most of what our{" "}
          <Link href="/services/workflow-automation-development/">workflow automation engagements</Link> consist of, and
          the same shape as the migrations-off-Zapier work on the service page: preserved scenario logic, no downtime.
        </p>

        <p>
          Whatever the hop, the mechanics are the same and they are what makes a migration safe rather than brave. Run
          old and new side by side against the same triggers for at least a week. Reconcile the outputs daily: count the
          CRM records, the ERP writes, the report rows, and chase every discrepancy to a root cause before cut-over.
          Keep the old scenarios paused, not deleted, for a month after the switch, because a paused Zap is a free
          rollback plan. None of this is glamorous, and all of it is why our migrations land without downtime.
        </p>

        <p>
          <strong>Zapier to Make</strong> is two to four days for a typical portfolio: rebuild the scenarios preserving
          logic, run both in parallel for a week, then repoint the webhooks. <strong>Make to self-hosted n8n</strong> is
          one to two weeks including the infrastructure: Docker, Postgres, nightly backups, monitoring, and the workflow
          JSON checked into version control, which is the moment compliance-bound teams stop arguing, because the
          automation logic finally lives somewhere auditable. <strong>n8n to a custom worker</strong> should be partial:
          keep n8n for the long tail and move only the hot paths, the shapes pushing past 100K operations or carrying
          transactional requirements. The skeleton below is the whole starting point.
        </p>

        <CodeBlock language="TypeScript" caption="A minimal order-sync worker: retry with backoff, idempotency, dead-letter">
{`import { Queue, Worker } from "bullmq";

const connection = { host: process.env.REDIS_HOST ?? "127.0.0.1", port: 6379 };

// One queue per workflow shape. Jobs carry the smallest payload that
// lets the handler re-fetch truth from the source system.
export const orderSync = new Queue("order-sync", {
  connection,
  defaultJobOptions: {
    attempts: 5,
    backoff: { type: "exponential", delay: 2000 }, // 2s, 4s, 8s, 16s, 32s
    removeOnComplete: 1000,
    removeOnFail: false, // failed jobs stay visible: this is the dead-letter queue
  },
});

new Worker(
  "order-sync",
  async (job) => {
    // Idempotency key derived from the order, not the job, so a
    // replay after a crash cannot double-write to the ERP.
    const key = "order-sync:" + job.data.orderId;
    if (await alreadyProcessed(key)) return;

    await syncOrder(job.data.orderId); // re-fetch, transform, upsert
    await markProcessed(key);
  },
  { connection, concurrency: 10 },
);`}
        </CodeBlock>

        <p>
          Forty lines buys retry with exponential backoff, an idempotency guarantee, and a dead-letter queue a human can
          inspect. What it does not buy is the 500 prebuilt connectors: every integration is now real engineering, with
          real auth and real webhook reliability, which is its own discipline and the subject of our{" "}
          <Link href="/services/api-and-integration/">API and integration</Link> practice. And watch for the moment the
          automation sprouts an approvals screen, role-based access, and an audit view: it has stopped being automation
          and become an <Link href="/services/internal-tools-admin-dashboards/">internal tool</Link>, the bigger-budget
          cousin, and deserves to be scoped as one. The honest end of the ladder points the other way too: if you are
          under 1,000 operations a month, stay on the free tier. We would rather argue you out of an engagement we could
          happily bill for than migrate a workflow that costs nothing.
        </p>

        <h2>Limitations</h2>

        <p>
          Prices are July 2026 list prices on annual billing unless stated; all three vendors reprice often, so treat
          the ratios as durable and the dollar figures as perishable. The three workflow shapes come from our
          operations-heavy client base; marketing-automation shapes (bulk email, audience sync) bill differently and are
          not represented. Ops hours are costed at a blended $90 per hour, and your labour rate moves the crossovers.
          FRO comes from 60 days across 11 accounts we operate: a small sample, directional rather than definitive.
          Self-hosting figures assume a team already comfortable running a VPS; a first server carries a learning tax
          the charts do not show. Client figures throughout are anonymised, rounded, and shared with consent.
        </p>

        <h2>What this changes about scoping automation</h2>

        <p>
          Pick the tier by volume and audit posture, not by default, and recompute quarterly. The $540 month at the top
          of this post was not a mistake anyone made; it was growth arriving without anyone repricing it. EC10K makes
          tiers comparable, MTV tells you when the move pays for itself, and FRO stops list prices flattering the
          per-unit platforms. Treat every plan-upgrade email as an alert, not an FYI.
        </p>

        <p>
          And keep the ladder&apos;s direction in mind: the tiers are not rivals, they are stages. The right first
          automation for most teams is still a free Zap built in an afternoon. The mistake is not starting there; the
          mistake is still being there at 60,000 tasks a month because nobody owned the recomputation. Volume is the
          only variable that matters, and volume only moves one way in a growing business.
        </p>

        <p>Pair this benchmark with the reliability and AI economics work it leans on:</p>

        <RelatedGrid>
          <RelatedCard
            tag="Research"
            title="Stripe Webhooks End-to-End: Signature Verification, Idempotency, Replay, Dead-Letter"
            body="The five guarantees a production webhook handler has to give you, with TypeScript code and the SQL schema we ship."
            href="/blog/stripe-webhooks-end-to-end-2026/"
          />
          <RelatedCard
            tag="Research"
            title="Per-Token Economics: What an AI Feature Actually Costs in Production (47 SaaS Sample)"
            body="Real per-MAU token cost data across 47 production AI SaaS products, model-tier routing, and the unit-economic decision."
            href="/blog/ai-feature-token-economics-2026/"
          />
          <RelatedCard
            tag="Research"
            title="Building a Production RAG Pipeline: Chunking, Embeddings, Retrieval, Caching"
            body="Stage-by-stage architecture for a RAG pipeline in production, from chunk sizes to semantic caching, and the cost per 1M queries."
            href="/blog/production-rag-pipeline-2026/"
          />
        </RelatedGrid>

        <p>The engagements that run this ladder end to end, from the first Make scenario to the worker fleet:</p>

        <RelatedGrid>
          <RelatedCard
            tag="Service"
            title="Workflow Automation Development"
            body="Make.com, n8n, Zapier, and custom Node automations, chosen by volume, not by default. We teach the same stack we ship."
            href="/services/workflow-automation-development/"
          />
          <RelatedCard
            tag="Service"
            title="Internal Tools &amp; Admin Dashboards"
            body="The bigger-budget cousin: for when the automation grows approvals, roles, and an audit view."
            href="/services/internal-tools-admin-dashboards/"
          />
          <RelatedCard
            tag="Service"
            title="API &amp; Integration"
            body="The integration plumbing: real auth, webhook reliability, and the connectors no-code used to give you for free."
            href="/services/api-and-integration/"
          />
        </RelatedGrid>

        <Faq items={FAQS} />

        <AuthorByline lastReviewedISO={MODIFIED_ISO}>
          Ritesh runs the automation stacks behind this benchmark, including the $540 Zapier account torn down at the
          top of this post and its n8n rebuild. The Make.com patterns come from the live-training curriculum we teach to
          practising Chartered Accountants, and the BullMQ worker skeleton is lifted from a production order-sync
          engagement.
        </AuthorByline>
      </PostBody>

      <CtaBand />
    </>
  );
}
