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

const PUBLISHED_ISO = "2026-08-11";
const MODIFIED_ISO = "2026-08-11";
const READ_TIME = "20 min read";

const PAGE_TITLE =
  "Retool at 5, 25, and 100 Users vs a Custom Admin Panel: The 3-Year TCO Model | Appycodes";
const PAGE_DESCRIPTION =
  "A 3-year TCO model for Retool, Appsmith and a custom Next.js + Supabase admin panel at 5, 25 and 100 users. The 2026 repricing moved the break-even to 22 seats.";
const PAGE_PATH = "/blog/retool-vs-custom-admin-tco-2026/";
const PAGE_IMAGE = "/images/blog-retool-vs-custom-admin-tco-2026.jpg";
const KEYWORDS =
  "retool vs custom admin panel, retool pricing 2026, retool tco, custom admin dashboard cost, retool alternatives, appsmith vs retool, internal tools build vs buy";

const CHART_SOURCES =
  "Sources: Retool 2026 price list, retool.com/pricing (https://retool.com/pricing); Appsmith pricing, appsmith.com (https://www.appsmith.com/pricing); Appycodes internal-tool engagement time-sheets, 2023 to 2026. Modelled at a $75/hour blended senior rate over 36 months. Figures rounded.";

const FAQS: FaqPair[] = [
  {
    q: "Is Retool worth it at 50 users?",
    a: "On pure cost, no. In our 3-year model, Retool at 50 seats costs about $66,600 against $41,100 for a senior-built custom panel, a 62% premium. It can still be the right call if your roadmap is genuinely CRUD-only, you have no engineers to maintain a custom codebase, or the tool has a planned lifetime under 18 months. Past 50 seats with any workflow complexity, the model says the per-seat bill is buying you convenience you already paid for in year one.",
  },
  {
    q: "What are the best Retool alternatives in 2026?",
    a: "Appsmith is the strongest like-for-like alternative: in our model it is the cheapest path at every seat count below about 43, and it has a self-hostable open-source core. Budibase and ToolJet cover the same self-hosted ground. Past roughly 22 seats against Retool and 43 against Appsmith, the strongest alternative in our data is not another low-code platform, it is a custom Next.js plus Supabase panel whose cost does not scale with headcount.",
  },
  {
    q: "What does a custom admin dashboard cost to build?",
    a: "For the reference scope in this model (8 to 12 screens, 3 roles, an approval flow with audit log, 2 scheduled jobs, basic charts), 320 senior hours, which is $24,000 at our $75/hour blended rate. Running costs add roughly $5,340 a year in maintenance and infrastructure, for a 3-year total of about $40,020. The key property is that this number is seat-independent: it is the same at 5 users and at 500.",
  },
  {
    q: "Can we migrate off Retool later?",
    a: "Yes, but plan for a rebuild, not a port. The SQL queries and JavaScript transform blocks inside a Retool app carry over almost verbatim; the UI and the resource wiring do not. In the migrations we have run, the finished Retool app is the best requirements document the project will ever have, which is why a migration typically lands at 60 to 70% of an equivalent greenfield build. The trap is per-seat lock-in: the longer you wait past your break-even seat count, the more licence spend you burn before the rebuild pays back.",
  },
  {
    q: "Did AI coding tools change the build-vs-buy maths?",
    a: "Yes, on the build side. VentureBeat's 2026 enterprise tooling data found 35% of teams have already replaced at least one SaaS tool with a custom build and 78% plan more custom tooling this year, with AI-lowered build cost as the stated driver. Our own NEXIS CA Compliance Calendar, a 3-role compliance tool on React, Supabase and Resend, was built in Lovable and then hardened by engineers. AI compresses the initial build line; it does nothing to the per-seat licence line, which is why the break-even keeps moving toward custom.",
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
  breadcrumbLabel: "Retool vs Custom Admin TCO 2026",
  keywords: KEYWORDS,
  faqs: FAQS,
});

export default function Page() {
  return (
    <>
      <JsonLd data={schemas} />

      <PostHeader
        eyebrow="Research report"
        title="Retool at 5, 25, and 100 users vs a custom admin panel: the 3-year TCO model"
        lead={
          <>
            A spreadsheet-backed, three-year total cost of ownership model for Retool, Appsmith and
            a senior-built Next.js plus Supabase admin panel, priced from 2026 list prices and our
            own engagement time-sheets, at three team sizes.
          </>
        }
        breadcrumbLabel="Retool vs Custom Admin TCO 2026"
        dateISO={MODIFIED_ISO}
        readTime={READ_TIME}
        image={PAGE_IMAGE}
        imageAlt="Retool vs custom admin panel 3-year total cost of ownership model at 5, 25 and 100 users"
      />

      <PostBody>
        <Callout variant="tldr">
          <ul>
            <li>
              <strong>The seat break-even point moved in 2026 and nobody recalculated.</strong>{" "}
              Retool&apos;s repricing (Business at $65 per builder per month, month-to-month, with
              separate builder / internal / external user tiers) pulls the crossover against a
              custom panel down from 32 seats to 22 in our model. Most build-vs-buy spreadsheets
              were last opened in 2024.
            </li>
            <li>
              <strong>At 5 users, low-code wins and it is not close.</strong> Retool runs $21,780
              over three years and Appsmith $19,950, against $40,020 for a custom Next.js plus
              Supabase panel. At 100 users it inverts hard: $113,040 on Retool against $42,180
              custom, a 2.7x gap, because the custom number barely notices headcount.
            </li>
            <li>
              <strong>The licence table is not the whole bill.</strong> Someone still builds and
              maintains the Retool apps (about $14,400 over three years in our time-sheet data),
              and workflow-heavy features carry a positive Customisation Debt Delta: they take
              longer to build on the platform than in code. Meanwhile 35% of teams have already
              replaced a SaaS tool with a custom build and 78% plan more custom tooling in 2026.
            </li>
          </ul>
        </Callout>

        <p>
          Build versus buy for internal tools is usually argued from instinct. The engineer wants
          to build, the finance lead wants a subscription, and the deciding artefact is a
          spreadsheet somebody made in 2024 and never opened again. In 2026 both sides of that
          spreadsheet moved at once. Retool restructured its price list: the Business tier now
          bills builders at $65 per builder per month on month-to-month terms, splits every account
          into builders, internal users and external users, and bundles AI credits into the tiers.
          At the same time, AI-assisted engineering kept compressing the hours it takes a senior
          team to ship a custom panel. Two moving inputs, one stale spreadsheet.
        </p>

        <p>
          The wider market has already started re-running the numbers.{" "}
          <a
            href="https://venturebeat.com/infrastructure/ai-lowered-the-cost-of-building-software-enterprise-governance-hasnt-caught"
            target="_blank"
            rel="noopener noreferrer"
          >
            VentureBeat&apos;s 2026 reporting on enterprise tooling
          </a>{" "}
          found that 35% of teams have replaced at least one SaaS tool with a custom build, and 78%
          plan more custom tooling in 2026. The stated reason is nearly always the same: AI lowered
          the cost of building software, and the per-seat bill did not follow it down.
        </p>

        <p>
          So we rebuilt the spreadsheet properly. This post prices the same admin panel three ways,
          Retool Business, Appsmith Business, and a senior-built Next.js plus Supabase panel, at
          three team sizes (5, 25, and 100 users) over three years. Three metrics fall out of the
          model: <strong>T3TCO (3-Year Total Cost of Ownership)</strong>,{" "}
          <strong>SBP (Seat Break-Even Point)</strong>, and{" "}
          <strong>CDD (Customisation Debt Delta)</strong>.
        </p>

        <p>
          One bias declared up front: we sell custom builds. Our own{" "}
          <Link href="/services/internal-tools-admin-dashboards/">
            internal tools and admin dashboards
          </Link>{" "}
          page literally says &quot;Not Retool dashboards. Real platforms the business runs
          on.&quot; The way we keep the model honest is to publish every assumption, keep the
          arithmetic reproducible in one screen of code, and let low-code win the scenarios it
          genuinely wins. As you will see, it wins more of them than you might expect an agency
          that builds the alternative to admit.
        </p>

        <h2>Methodology and price sources</h2>

        <p>
          The model prices one reference tool over 36 months. &quot;The same admin panel&quot;
          means a fixed scope drawn from the median internal-tool engagement in our books: 8 to 12
          screens over an existing Postgres or MySQL database, three user roles, one approval flow
          with an audit log, two scheduled jobs, and basic charting. Every path pays for four cost
          lines:
        </p>

        <ul>
          <li>
            <strong>Licences</strong>, the per-seat platform bill over 36 months. Zero for the
            custom path.
          </li>
          <li>
            <strong>Initial build</strong>, the hours to get the reference scope live, priced at a
            blended senior rate. Low-code does not remove this line; it shrinks it.
          </li>
          <li>
            <strong>Maintenance</strong>, the monthly hours to keep the tool matching the business:
            new columns, new roles, changed workflows, breakage.
          </li>
          <li>
            <strong>Infrastructure</strong>, hosting and database. Zero on the vendor-cloud
            low-code paths, real but small on the custom path.
          </li>
        </ul>

        <p>
          Licence pricing comes from the published 2026 lists:{" "}
          <a href="https://retool.com/pricing" target="_blank" rel="noopener noreferrer">
            retool.com/pricing
          </a>{" "}
          for Retool and{" "}
          <a href="https://www.appsmith.com/pricing" target="_blank" rel="noopener noreferrer">
            Appsmith&apos;s pricing page
          </a>{" "}
          for Appsmith. For the background on what changed in the 2026 Retool repricing we leaned
          on the{" "}
          <a
            href="https://automationatlas.io/answers/retool-pricing-explained-2026/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Automation Atlas explainer
          </a>{" "}
          and{" "}
          <a
            href="https://www.appsmith.com/blog/retool-pricing"
            target="_blank"
            rel="noopener noreferrer"
          >
            Appsmith&apos;s own teardown of Retool pricing
          </a>
          , read with the obvious caveat that the latter is written by a competitor.
        </p>

        <p>
          Build and maintenance hours come from our own engagement time-sheets across real
          internal-tool projects, 2023 to 2026: the PES tendering ERP, the All White Laser contract
          platform, the Easyship calculator surfaces, and our own NEXIS CA Compliance Calendar,
          plus platform-side hours from engagements where we inherited or maintained existing
          Retool and Appsmith workspaces. The named clients gave consent for the figures quoted;
          hour data is aggregated across engagements and rounded. Everything is priced at a $75 per
          hour blended senior rate, which sits mid-range in the freelance-rate data we published in{" "}
          <Link href="/blog/tech-stacks-developers-vs-clients-2026/">
            tech stacks clients pay for vs what developers want
          </Link>
          .
        </p>

        <p>
          We deliberately excluded the costs that are identical across all three paths: the
          database that already exists, staff training, and the operator hours spent inside the
          tool once it works. One asymmetry we chose not to price but should flag: on the platform
          paths, several things a growing company eventually needs (SSO, granular audit logs,
          environment separation) sit in higher tiers than the one we modelled, so the platform
          columns below are, if anything, floors rather than ceilings.
        </p>

        <h2>The model: one admin panel, three ways to pay for it</h2>

        <p>The headline metric is a straight sum of the four cost lines:</p>

        <Formula>
          T3TCO = Licences (36 mo) + Build hours x rate + Maintenance hours x rate +
          Infrastructure (36 mo)
        </Formula>

        <p>
          The whole model fits in one function, which is the point: if you disagree with an input,
          change it and re-run. Nothing below depends on a hidden tab.
        </p>

        <CodeBlock language="typescript" caption="the entire TCO model, no hidden tabs">{`const RATE = 75; // blended senior rate, USD/hour
const MONTHS = 36;

type Path = {
  licencePerMonth: (seats: number) => number; // builders + users blended
  buildHours: number;
  maintHoursPerMonth: number;
  infraPerMonth: number;
};

function t3tco(p: Path, seats: number): number {
  const licences = p.licencePerMonth(seats) * MONTHS;
  const build = p.buildHours * RATE;
  const maintenance = p.maintHoursPerMonth * MONTHS * RATE;
  const infra = p.infraPerMonth * MONTHS;
  return licences + build + maintenance + infra;
}

// Retool Business, month-to-month: $65/builder + $25/internal user
// Appsmith Business, cloud: $15/user, flat
// Custom Next.js + Supabase: no licences, $70 to $130/mo infra`}</CodeBlock>

        <TableScroll>
          <table>
            <thead>
              <tr>
                <th>Path</th>
                <th>Licence model</th>
                <th>Initial build (hrs)</th>
                <th>Maintenance (hrs/mo)</th>
                <th>Infra ($/mo)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Retool Business (month-to-month)</td>
                <td>$65 / builder + $25 / internal user</td>
                <td>120</td>
                <td>2.0</td>
                <td>0</td>
              </tr>
              <tr>
                <td>Appsmith Business (cloud)</td>
                <td>$15 / user, flat</td>
                <td>140</td>
                <td>2.5</td>
                <td>0</td>
              </tr>
              <tr>
                <td>Custom Next.js + Supabase</td>
                <td>None</td>
                <td>320</td>
                <td>5.0</td>
                <td>70 to 130</td>
              </tr>
            </tbody>
          </table>
        </TableScroll>

        <p>
          Two assumptions worth pausing on. First, the builder mix: we model 2 builders at 5 and 10
          seats, 4 at 25, 5 at 50, and 6 at 100, with the remainder as internal users at the $25
          modelled rate; this roughly tracks the builder-to-viewer ratios we see in inherited
          workspaces. Second, the low-code build line is not zero. 120 hours to ship the reference
          scope on Retool is what our time-sheets say a competent builder actually takes once you
          count resource wiring, permissions, query optimisation, and the last 20% of polish the
          demo never shows. Anyone modelling low-code at zero build cost is comparing a finished
          custom panel to an empty Retool workspace.
        </p>

        <h2>At 5 users: low-code wins, and it is not close</h2>

        <DataChart
          title="Chart 1: 3-year TCO at 5 users"
          subtitle="Reference admin panel, 36 months, 2 builders + 3 internal users on the Retool path. All figures USD, rounded."
          sources={CHART_SOURCES}
        >
          <table>
            <thead>
              <tr>
                <th>Cost line</th>
                <th>Retool</th>
                <th>Appsmith</th>
                <th>Custom</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Licences (36 mo)</td>
                <td>$7,380</td>
                <td>$2,700</td>
                <td>$0</td>
              </tr>
              <tr>
                <td>Initial build</td>
                <td>$9,000</td>
                <td>$10,500</td>
                <td>$24,000</td>
              </tr>
              <tr>
                <td>Maintenance (36 mo)</td>
                <td>$5,400</td>
                <td>$6,750</td>
                <td>$13,500</td>
              </tr>
              <tr>
                <td>Infrastructure</td>
                <td>$0</td>
                <td>$0</td>
                <td>$2,520</td>
              </tr>
              <tr>
                <td>
                  <strong>T3TCO</strong>
                </td>
                <td>
                  <strong>$21,780</strong>
                </td>
                <td>
                  <strong>$19,950</strong>
                </td>
                <td>
                  <strong>$40,020</strong>
                </td>
              </tr>
            </tbody>
          </table>
        </DataChart>

        <p>
          At 5 seats the custom panel costs roughly double either low-code path, and Appsmith is
          the cheapest option in the entire model. The licence line is a rounding error at this
          size ($7,380 on Retool over three full years); what the platforms are really selling you
          is 200 build hours you do not spend. If we were advising a 5-person operations team with
          a CRUD-shaped problem and no engineers on staff, we would not pitch them a custom build,
          and this table is why.
        </p>

        <p>
          Note what the custom column is buying, though, because it matters later: the $40,020 is
          front-loaded and then flat. $24,000 of it is a one-time build, and the running cost is
          about $445 a month regardless of how many people log in. The low-code columns are the
          mirror image: cheap to start, and priced per person, forever.
        </p>

        <h2>At 25 users: the crossover nobody recalculated</h2>

        <DataChart
          title="Chart 2: 3-year TCO at 25 users"
          subtitle="Same scope, 36 months, 4 builders + 21 internal users on the Retool path. The Retool column has now crossed the custom column."
          sources={CHART_SOURCES}
        >
          <table>
            <thead>
              <tr>
                <th>Cost line</th>
                <th>Retool</th>
                <th>Appsmith</th>
                <th>Custom</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Licences (36 mo)</td>
                <td>$28,260</td>
                <td>$13,500</td>
                <td>$0</td>
              </tr>
              <tr>
                <td>Initial build</td>
                <td>$9,000</td>
                <td>$10,500</td>
                <td>$24,000</td>
              </tr>
              <tr>
                <td>Maintenance (36 mo)</td>
                <td>$5,400</td>
                <td>$6,750</td>
                <td>$13,500</td>
              </tr>
              <tr>
                <td>Infrastructure</td>
                <td>$0</td>
                <td>$0</td>
                <td>$2,520</td>
              </tr>
              <tr>
                <td>
                  <strong>T3TCO</strong>
                </td>
                <td>
                  <strong>$42,660</strong>
                </td>
                <td>
                  <strong>$30,750</strong>
                </td>
                <td>
                  <strong>$40,020</strong>
                </td>
              </tr>
            </tbody>
          </table>
        </DataChart>

        <p>
          This is the table that changed in 2026. At 25 seats, Retool ($42,660) is now more
          expensive over three years than the custom panel ($40,020). The gap is small, 7%, which
          is exactly the problem: a crossover this shallow is invisible unless someone actually
          re-runs the model, and in most companies nobody owns that job. The tool was cheaper when
          it was adopted at 8 seats, the team grew, and the spreadsheet that justified the decision
          was never opened again.
        </p>

        <p>
          Appsmith, at $30,750, is still comfortably cheaper here, mostly because it does not
          split builders from users: everyone is $15. If your team is genuinely in the 20 to 40
          seat band and staying there, the honest reading of this chart is &quot;Appsmith or
          custom, and Retool only if you are already deeply invested in it&quot;.
        </p>

        <h2>At 100 users: the per-seat bill becomes the product</h2>

        <DataChart
          title="Chart 3: 3-year TCO at 100 users"
          subtitle="Same scope, 36 months, 6 builders + 94 internal users on the Retool path. Custom infra stepped up to $130/mo at this scale."
          sources={CHART_SOURCES}
        >
          <table>
            <thead>
              <tr>
                <th>Cost line</th>
                <th>Retool</th>
                <th>Appsmith</th>
                <th>Custom</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Licences (36 mo)</td>
                <td>$98,640</td>
                <td>$54,000</td>
                <td>$0</td>
              </tr>
              <tr>
                <td>Initial build</td>
                <td>$9,000</td>
                <td>$10,500</td>
                <td>$24,000</td>
              </tr>
              <tr>
                <td>Maintenance (36 mo)</td>
                <td>$5,400</td>
                <td>$6,750</td>
                <td>$13,500</td>
              </tr>
              <tr>
                <td>Infrastructure</td>
                <td>$0</td>
                <td>$0</td>
                <td>$4,680</td>
              </tr>
              <tr>
                <td>
                  <strong>T3TCO</strong>
                </td>
                <td>
                  <strong>$113,040</strong>
                </td>
                <td>
                  <strong>$71,250</strong>
                </td>
                <td>
                  <strong>$42,180</strong>
                </td>
              </tr>
            </tbody>
          </table>
        </DataChart>

        <p>
          At 100 seats the inversion is total. Retool costs 2.7x the custom panel over three
          years; Appsmith costs 1.7x. The licence line alone on Retool ($98,640) is more than
          double the entire lifetime cost of building and running the custom alternative. And
          notice the custom column&apos;s response to a 20x increase in users since Chart 1: the
          infrastructure line went from $2,520 to $4,680. That is the whole difference. Postgres
          does not care how many staff members have a login.
        </p>

        <p>
          There is also a hidden fifth cost line that only appears at this scale: seat management
          itself. At 100 users someone has to audit who is a builder and who is a viewer, chase
          departed employees off the licence, and negotiate the renewal. In the workspaces we have
          inherited, that admin overhead ran 2 to 4 hours a month, unbudgeted, and the builder
          count quietly crept upward because reclassifying people downward is a conversation
          nobody wants to have. Per-seat products are optimised to grow inside your organisation;
          that is not a criticism, it is their business model working as designed.
        </p>

        <p>
          This is also the point where the comparison stops being about money and starts being
          about what the tool is. A 100-user internal platform is not a side dashboard any more,
          it is the operational system of record, the screen the business actually runs on. The
          question &quot;should the system of record live on a per-seat rental?&quot; answers
          itself for most operators once it is phrased that way.
        </p>

        <h2>The seat break-even point moved in 2026</h2>

        <p>
          Collapsing the three tables into one curve gives the second metric, the seat count at
          which the platform path and the custom path cost the same over three years:
        </p>

        <Formula>SBP = Seat count at which T3TCO (platform) = T3TCO (custom)</Formula>

        <DataChart
          title="Chart 4: T3TCO by seat count, all three paths"
          subtitle="3-year totals at five team sizes. Retool crosses custom at 22 seats; Appsmith at about 43."
          sources={CHART_SOURCES}
        >
          <table>
            <thead>
              <tr>
                <th>Seats</th>
                <th>Retool</th>
                <th>Appsmith</th>
                <th>Custom</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>5</td>
                <td>$21,780</td>
                <td>$19,950</td>
                <td>$40,020</td>
              </tr>
              <tr>
                <td>10</td>
                <td>$26,280</td>
                <td>$22,650</td>
                <td>$40,020</td>
              </tr>
              <tr>
                <td>25</td>
                <td>$42,660</td>
                <td>$30,750</td>
                <td>$40,020</td>
              </tr>
              <tr>
                <td>50</td>
                <td>$66,600</td>
                <td>$44,250</td>
                <td>$41,100</td>
              </tr>
              <tr>
                <td>100</td>
                <td>$113,040</td>
                <td>$71,250</td>
                <td>$42,180</td>
              </tr>
            </tbody>
          </table>
        </DataChart>

        <p>
          On the 2026 price card, the Retool line crosses the custom line at{" "}
          <strong>22 seats</strong>. We ran the identical model against the pre-2026 card we used
          in client work through 2024 ($50 per builder, $15 per standard user, annual billing),
          and the crossover sat at <strong>32 seats</strong>. The repricing moved the break-even
          roughly a third closer, and it did so quietly, inside a tier restructure that most
          finance teams experienced as &quot;the invoice got more complicated&quot; rather than
          &quot;the build-vs-buy answer changed&quot;.
        </p>

        <p>
          The one-line version for your own numbers: divide the fixed-cost gap between the paths
          by the per-seat licence cost over the window. In this model the custom path carries
          $40,020 of fixed cost against $14,400 of platform-side build and maintenance, and a
          blended Retool seat costs $1,188 over 36 months, so ($40,020 - $14,400) / $1,188 lands
          at 22 seats. Swap in your own rate, your own builder mix and your negotiated seat price
          and the same division gives your SBP in thirty seconds.
        </p>

        <p>
          Appsmith&apos;s flat $15 keeps its crossover out at about <strong>43 seats</strong>,
          which matches its position in this market: the value option that makes the rental model
          defensible for longer. But the direction of travel is the same on both curves. Per-seat
          pricing plus growing headcount has one asymptote, and it is not in the buyer&apos;s
          favour. A team of 12 that expects to be a team of 40 in two years should read this chart
          at 40, not at 12.
        </p>

        <h2>Customisation Debt Delta: the cost the price list hides</h2>

        <p>
          T3TCO treats the two paths as delivering the same tool, and for the reference scope they
          do. The divergence shows up on the roadmap: what happens when the business asks for the
          next feature. We measure that with the third metric:
        </p>

        <Formula>CDD = Î£ (platform hours - custom hours) per roadmap feature</Formula>

        <DataChart
          title="Chart 5: Customisation Debt Delta (CDD) by feature class"
          subtitle="Median hours to ship each feature class on a low-code platform vs in a custom codebase, from our engagement time-sheets. Negative CDD favours the platform."
          sources={CHART_SOURCES}
        >
          <table>
            <thead>
              <tr>
                <th>Feature class</th>
                <th>Platform (hrs)</th>
                <th>Custom (hrs)</th>
                <th>CDD</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>CRUD table with filters and exports</td>
                <td>6</td>
                <td>14</td>
                <td>-8</td>
              </tr>
              <tr>
                <td>Role-gated views (3 roles)</td>
                <td>10</td>
                <td>12</td>
                <td>-2</td>
              </tr>
              <tr>
                <td>Approval workflow with audit log</td>
                <td>26</td>
                <td>18</td>
                <td>+8</td>
              </tr>
              <tr>
                <td>Scheduled reconciliation job with retries</td>
                <td>22</td>
                <td>12</td>
                <td>+10</td>
              </tr>
              <tr>
                <td>Reminder pipeline (email + WhatsApp)</td>
                <td>24</td>
                <td>14</td>
                <td>+10</td>
              </tr>
              <tr>
                <td>External customer portal page</td>
                <td>30</td>
                <td>16</td>
                <td>+14</td>
              </tr>
            </tbody>
          </table>
        </DataChart>

        <p>
          The pattern is consistent across our time-sheets: anything CRUD-shaped is faster on the
          platform, anything workflow-shaped is faster in code. The platform&apos;s advantage is a
          library of pre-built components; its disadvantage is that the moment a feature does not
          match a component, you are writing code anyway, inside a sandbox, against an API surface
          you do not control, with the debugging tools the vendor chose to give you. Across a
          representative 12-feature roadmap from our engagement history, the classes above sum to
          a CDD of +41 hours, about $3,075 at the blended rate, per roadmap cycle, in the
          platform&apos;s disfavour.
        </p>

        <p>
          CDD is also the number that compounds. A positive delta on every workflow feature means
          the platform tool drifts further behind the business each quarter, which is exactly the
          drift pattern we keep finding when we audit older codebases:{" "}
          <Link href="/blog/series-a-codebase-audit-2026/">
            the Series A codebase audit
          </Link>{" "}
          found the same shape in a different costume, tools that were fast to start and expensive
          to keep matching reality.
        </p>

        <h2>Where low-code genuinely wins</h2>

        <p>
          An honest model has to report the scenarios where the rental is the right answer,
          because there are several, and we decline work in them regularly:
        </p>

        <ul>
          <li>
            <strong>Under 10 seats.</strong> Chart 1 is unambiguous. At 5 seats you are paying
            roughly 2x for a custom build, and the premium buys you nothing the team will notice
            for years.
          </li>
          <li>
            <strong>CRUD-only against a clean schema.</strong> If the tool is genuinely tables,
            filters, forms and exports, the negative-CDD rows are your whole roadmap and the
            platform&apos;s component library is doing exactly what it is priced for.
          </li>
          <li>
            <strong>No engineers on staff.</strong> A custom panel needs someone to own it. If the
            organisation has no engineering function and no plans for one, the platform&apos;s
            maintenance model is worth its premium.
          </li>
          <li>
            <strong>Planned lifetime under 18 months.</strong> Migration tooling scaffolds,
            one-off data-cleanup consoles, tools for a process being sunset: the build cost never
            amortises, so minimise it.
          </li>
          <li>
            <strong>Speed to first screen.</strong> A competent builder gets a usable Retool
            screen in front of an operations team in days. When the tool&apos;s value is proving
            whether anyone will use it at all, that speed is the product.
          </li>
        </ul>

        <p>
          There is also a hybrid pattern the model quietly endorses: rent first, build second. A
          Retool v1 at 5 seats costs $21,780 over three years, and if the tool earns its keep and
          the team grows, the finished workspace becomes the best requirements document the
          eventual custom build will ever have. Every screen, every query, every permission rule
          has been argued about and settled by real operators. Migrations we have run from a
          mature platform workspace land at 60 to 70% of an equivalent greenfield build for
          exactly that reason: the expensive part of software is discovering what it should do,
          and the rental already paid for the discovery.
        </p>

        <p>
          Our service page says it plainly: generic Retool dashboards that a junior engineer can
          ship in a week are listed under &quot;probably not a fit&quot;, because we would be
          expensive for that job. This model is the arithmetic behind that sentence.
        </p>

        <h2>Where the model inverts</h2>

        <h3>External users</h3>

        <p>
          Every number above prices internal seats. The moment customers or counterparties need a
          login, per-seat pricing meets an audience you do not control the size of. The PES
          platform manages around 300 industrial and commercial energy clients; give each of them
          portal access on a per-external-user price and the licence line stops being a rounding
          error. Even at a modelled $10 per external user per month, 300 counterparties add
          $108,000 over three years, two and a half times the entire T3TCO of the custom panel.
          All White Laser is the same story: the contract portal exists precisely so that
          customers, not staff, can sign in against 500 contract documents stored on Cloudflare
          R2. A tool whose point is external access should never be priced per external head.
        </p>

        <h3>Complex workflows</h3>

        <p>
          The positive-CDD rows in Chart 5 are the second inversion. The PES tender module ingests
          supplier responses from across the UK energy market, normalises them into comparable
          formats, surfaces the best deal per client, and reconciles multi-year supply-agreement
          commissions, logic that has saved 800+ broker hours a year and puts $1M+ in tenders
          through the platform. None of that maps to a drag-and-drop component. The NEXIS CA
          Compliance Calendar runs GST, ROC and Income Tax deadlines across clients and team
          members with WhatsApp reminders via wa.me, a classic reminder-pipeline feature class at
          +10 CDD. When the roadmap looks like this, the workflow engine is the product, which is
          why this class of build usually pairs with{" "}
          <Link href="/services/workflow-automation-development/">
            workflow automation development
          </Link>{" "}
          rather than a component library.
        </p>

        <h3>Per-seat growth</h3>

        <p>
          The third inversion is simply Chart 4 read forward in time. Headcount growth doubles the
          licence line and leaves the custom line flat; on the 2026 card the crossover arrives at
          22 seats, which many companies pass without noticing. If your operations team is hiring,
          the honest comparison is not today&apos;s seat count but the seat count at the end of
          the three-year window you are modelling.
        </p>

        <h3>The data layer outlives the tool</h3>

        <p>
          One structural argument sits underneath all three: a custom panel leaves you owning a
          schema, a set of policies, and an API, assets that survive any UI decision you make
          later. Our default data layer for this class of build is Postgres with row-level
          security and multi-role auth on{" "}
          <Link href="/services/supabase-development/">Supabase</Link>, which is exactly how the
          NEXIS calendar separates its Admin, Team and Client roles. A platform workspace, by
          contrast, is a UI you rent on top of a database you own; when you leave, the UI stays
          behind.
        </p>

        <h2>The four dashboards behind our side of the ledger</h2>

        <p>
          The custom-path hours in this model are not estimates; they are the logged shape of four
          platforms currently in production, each the operational heart of the business that runs
          on it.
        </p>

        <p>
          <strong>PES</strong> is a tendering ERP for a UK energy brokerage: tender comparison
          across the supplier market, a CRM for roughly 300 industrial and commercial clients, and
          commission accounting for multi-year supply agreements. $1M+ in tenders flows through
          it, and it has saved 800+ broker hours a year against the spreadsheet process it
          replaced. <strong>All White Laser</strong> runs contract operations on it: contract
          creation, payment scheduling, a customer portal, and document storage on Cloudflare R2,
          with $5M in contracts across 500 contract documents on the platform.
        </p>

        <p>
          <strong>NEXIS CA Compliance Calendar</strong> is our own ecosystem product, built for
          practising Indian CAs: GST, ROC (MCA) and Income Tax deadlines (TDS, advance tax, ITR)
          tracked across clients and team members, three roles (Admin, Team, Client), WhatsApp
          reminders via wa.me, on React plus Supabase plus Resend, and it was built in Lovable.
          That last fact matters for this post: the initial-build line on the custom path has been
          falling for exactly the reason the VentureBeat data describes.{" "}
          <strong>Easyship</strong> is the outlier that proves the category boundary: 100+
          shipping rate calculators aggregating rates across 550+ courier integrations, with every
          origin-destination pair published as a separate indexable landing page. An internal
          calculation engine doubling as a public programmatic-SEO surface is not something any
          per-seat platform has a price for.
        </p>

        <p>
          This is what the &quot;Not Retool dashboards&quot; line on the service page actually
          means. It is not a claim that Retool is bad; Charts 1 and 2 show it winning. It is a
          claim about which half of the market we build for: the half where the business logic is
          the product, and where the tool&apos;s cost should not scale with the number of people
          who look at it.
        </p>

        <h2>Limitations and how to read this model critically</h2>

        <p>
          First, the blended rate. $75 an hour is our number; a Bay Area contractor at $150 doubles
          every hour-priced line and pushes the SBP up substantially, while an internal engineer
          whose salary is already sunk pushes it down. Re-run the model with your rate before
          quoting it in a meeting.
        </p>

        <p>
          Second, list prices move and negotiated prices differ. We modelled month-to-month
          Business-tier list pricing; annual commitments and enterprise agreements discount it,
          sometimes heavily, and every discount pushes the break-even seat count back up. The
          model is a snapshot of the published 2026 card, not of your procurement team&apos;s best
          day.
        </p>

        <p>
          Third, the build hours assume senior engineers who have shipped this exact class of tool
          before. A team learning Next.js and Supabase on the job will not hit 320 hours, and a
          founder vibe-coding the panel will produce a different artefact with different risks, a
          pattern we documented at length in the AI-prototype audit. Our sample is also biased in
          a direction worth naming: businesses come to us when their logic has outgrown
          off-the-shelf tools, so our time-sheets over-represent workflow-heavy builds and
          under-represent the simple CRUD tools where low-code shines.
        </p>

        <p>
          Fourth, T3TCO is nominal dollars over 36 months. We apply no discount rate, model no
          platform price rises after the 2026 card, and give no dollar value to the optionality of
          quitting a month-to-month subscription, which is real and favours the platforms. The
          Appsmith self-hosted community edition, at zero licence cost plus ops hours, is a
          legitimate fourth path we left out to keep the comparison to paid, supported tiers.
        </p>

        <h2>How to run this model for your own team</h2>

        <p>
          Four inputs decide the whole thing: your seat count at the end of the window (not the
          start), your builder-to-user mix, your hourly rate, and the share of your roadmap that
          is workflow-shaped rather than CRUD-shaped. Put those into the function above and the
          answer usually falls out in a page. If the result lands under 10 seats and CRUD-only,
          rent the tool with our blessing. If it lands past 22 seats or the CDD rows dominate your
          roadmap, the arithmetic has changed since your spreadsheet was last open, and the
          numbers in this post are what it changed to. For a sense of what the initial-build line
          looks like on real invoices,{" "}
          <Link href="/blog/mvp-cost-funded-startups-2026/">
            what an MVP actually costs in 2026
          </Link>{" "}
          covers the same hour-and-rate anatomy across 31 engagements. And if you would rather we
          ran the model against your actual tool list,{" "}
          <Link href="/contact/">send us the spreadsheet you have been avoiding</Link>.
        </p>

        <p>The research that pairs with this model:</p>

        <RelatedGrid>
          <RelatedCard
            tag="Research"
            title="What an MVP Actually Costs in 2026: Three Founder Stories + 31 Engagements of Data"
            body="Three founder stories of 2026 MVP builds, fintech, AI SaaS, marketplace, followed by aggregate cost and bandwidth data across 31 engagements."
            href="/blog/mvp-cost-funded-startups-2026/"
          />
          <RelatedCard
            tag="Research"
            title="Series A Code Audit: Inside 23 Funded SaaS Codebases"
            body="Patterns from 23 SaaS codebase audits: opens with one anonymised takeover, then aggregates the rubric findings. TDS, KPC, MTS."
            href="/blog/series-a-codebase-audit-2026/"
          />
          <RelatedCard
            tag="Research"
            title="Tech stacks clients pay for vs what developers actually want, 2026 data report"
            body="12 web stacks compared across usage, developer preference, client demand and freelance rate, the source of the blended rate this model runs on."
            href="/blog/tech-stacks-developers-vs-clients-2026/"
          />
        </RelatedGrid>

        <p>The engagements that map to the custom side of the ledger:</p>

        <RelatedGrid>
          <RelatedCard
            tag="Service"
            title="Internal Tools & Admin Dashboards"
            body="Tender automation, contract operations, compliance calendars. Not Retool dashboards. Real platforms the business runs on."
            href="/services/internal-tools-admin-dashboards/"
          />
          <RelatedCard
            tag="Service"
            title="Workflow Automation Development"
            body="The approval chains, reconciliation jobs and reminder pipelines that carry a positive CDD on every low-code platform."
            href="/services/workflow-automation-development/"
          />
          <RelatedCard
            tag="Service"
            title="Supabase Development"
            body="Postgres, row-level security and multi-role auth: the data layer that outlives whichever UI you put on top."
            href="/services/supabase-development/"
          />
        </RelatedGrid>

        <Faq items={FAQS} />

        <AuthorByline lastReviewedISO={MODIFIED_ISO}>
          Ritesh leads the internal-tools practice the time-sheet data in this model comes from,
          including the PES tendering ERP ($1M+ in tenders, 800+ broker hours saved a year), the
          All White Laser contract platform ($5M in contracts across 500 documents), and the NEXIS
          CA Compliance Calendar the studio runs for its own ecosystem. The platform-side hour
          figures come from engagements where we inherited or maintained existing Retool and
          Appsmith workspaces.
        </AuthorByline>
      </PostBody>

      <CtaBand />
    </>
  );
}
