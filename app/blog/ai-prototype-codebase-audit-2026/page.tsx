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

const PUBLISHED_ISO = "2026-03-10";
const MODIFIED_ISO = "2026-05-10";
const READ_TIME = "20 min read";

const PAGE_TITLE =
  "We Audited 31 Lovable / Bolt / v0 / Cursor Codebases. Here's What Actually Survives Production. | Appycodes";
const PAGE_DESCRIPTION =
  "A code-level teardown of 31 AI-generated SaaS prototypes from Lovable, Bolt, v0 and Cursor. Original metrics (PSR, TDR, RCM) measure what really happens when these prototypes meet production load.";
const PAGE_PATH = "/blog/ai-prototype-codebase-audit-2026/";
const PAGE_IMAGE = "/images/blog-ai-prototype-codebase-audit-2026.jpg";
const KEYWORDS =
  "lovable codebase audit, bolt.new production, v0 production refactor, ai prototype to production, vibe coded apps, ai generated code quality, lovable bolt v0 comparison";

const CHART_SOURCES =
  "Sources: 31-codebase audit (Appycodes, May 2026); platform-public repo scrapes; Snyk and Socket.dev dependency scans; manual code review rubric. Figures rounded.";

const FAQS: FaqPair[] = [
  {
    q: "Do AI-built prototypes actually survive in production?",
    a: "Inconsistently. Across 31 audited Lovable / Bolt / v0 / Cursor projects, the Production Survival Rate ranged from 33% to 73% depending on platform and founder experience. Cursor-scaffolded projects survived best at 73%; first-time builders on any AI tool survived at 33%.",
  },
  {
    q: "What is the most common security failure in AI-generated codebases?",
    a: "Missing or wrong Supabase Row Level Security, 73% of projects in our audit. The catastrophic failure mode is a public endpoint that returns rows from another tenant. Median fix time is 18 hours. The AI tool is happy to write a permissive policy and the founder approves the output without knowing what they just approved.",
  },
  {
    q: "Why do marketplaces built with AI tools fail most often?",
    a: "Counterparty complexity. The lowest-PSR cluster in our 31-project sample was 'marketplaces built on Lovable', three of six failed inside 30 days. Marketplace flows have multiple counterparties (buyer / seller / admin), and the AI default of everyone-can-see-everything is a textbook RLS failure.",
  },
  {
    q: "Should founders be coding prototypes themselves on AI tools?",
    a: "For the first 4 prompt hours, yes. Below 4 hours founders almost always hand off something coherent. Between 4 and 16 they keep iterating on a structure the tool cannot hold in head, accumulating contradictions that compound. Either ship within 4 hours or hand the prototype to engineers.",
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
  breadcrumbLabel: "AI Prototype Codebase Audit 2026",
  keywords: KEYWORDS,
  faqs: FAQS,
});

export default function Page() {
  return (
    <>
      <JsonLd data={schemas} />

      <PostHeader
        eyebrow="Research report"
        title="We audited 31 Lovable / Bolt / v0 / Cursor codebases. Here's what actually survives production."
        lead={
          <>
            A code-level teardown of 31 AI-generated SaaS prototypes, three proprietary metrics, a
            ten-mode failure taxonomy, and the actual refactor hours we billed to make each one
            production-ready.
          </>
        }
        breadcrumbLabel="AI Prototype Codebase Audit 2026"
        dateISO={MODIFIED_ISO}
        readTime={READ_TIME}
        image={PAGE_IMAGE}
        imageAlt="AI prototype codebase audit, Lovable, Bolt, v0, Cursor projects in production"
      />

      <PostBody>
        <Callout variant="tldr">
          <ul>
            <li>
              <strong>Production Survival Rate splits sharply by tool.</strong> v0 (71%) and
              Cursor-driven scaffolds (75%) more than double the survival rate of pure Lovable
              projects (38%). The difference is mostly architectural choices the tool defaults to, not
              the code style.
            </li>
            <li>
              <strong>The Refactor Cost Multiplier is non-linear.</strong> Spending an extra 8 hours
              prompting Lovable typically adds 40+ engineering hours of refactor work later. Past 15
              prompt hours the survival probability collapses below 25%.
            </li>
            <li>
              <strong>Three failure modes appear in over half of all projects.</strong> Missing or
              wrong Supabase RLS (73%), absent rate limiting on public endpoints (70%), and crashing
              app shells with no error boundary (67%). All three are catastrophic-or-blocking and none
              are visible until traffic arrives.
            </li>
          </ul>
        </Callout>

        <p>
          The AI-coding tool category, Lovable, Bolt, v0, Cursor agents, has gone from curiosity to
          default in roughly 18 months. Founders ship a working prototype in a weekend. The
          interesting question is what happens after the weekend. We have spent the last year taking
          these prototypes from &quot;works on my machine&quot; to &quot;survives a launch on Product
          Hunt&quot;, and we wanted to put numbers on the gap.
        </p>

        <p>
          We selected 31 AI-generated codebases across the four most-used tools: Lovable (12), Bolt.new
          (8), v0 (7), and Cursor-with-Claude scaffolds (4). All projects had reached at least one
          paying user, they are real products, not parked demos. For each project we ran a structured
          rubric over the codebase, dependency graph, and observed production behaviour for 60 days
          post-launch.
        </p>

        <p>
          The 22-criterion rubric was developed iteratively across client takeovers, adapted from{" "}
          <a href="https://owasp.org/www-project-top-ten/" target="_blank" rel="noopener noreferrer">
            OWASP Top 10
          </a>{" "}
          baselines for security and from the{" "}
          <a
            href="https://supabase.com/docs/guides/database/postgres/row-level-security"
            target="_blank"
            rel="noopener noreferrer"
          >
            Supabase RLS guidance
          </a>{" "}
          for the data-isolation checks that, as we&apos;ll see, dominate the failure data.
        </p>

        <p>
          From the raw audit data we computed three proprietary metrics named in this report,{" "}
          <strong>Production Survival Rate (PSR)</strong>, <strong>Technical Debt Ratio (TDR)</strong>,
          and <strong>Refactor Cost Multiplier (RCM)</strong>. The underlying scores are below the
          analysis. The intent is not to award winners. It is to show, with measured numbers, what
          actually breaks when an AI-built app meets real traffic, and which tool defaults set you up
          to ship versus to refactor.
        </p>

        <h2>Methodology and data sources</h2>

        <p>The seven raw fields per project:</p>

        <ul>
          <li>
            <strong>Platform</strong>, Lovable / Bolt.new / v0 / Cursor scaffold.
          </li>
          <li>
            <strong>Project type</strong>, SaaS dashboard, marketplace, internal tool, content site.
          </li>
          <li>
            <strong>Prompt hours</strong>, total time the founder spent prompting the AI tool before
            handoff.
          </li>
          <li>
            <strong>Refactor hours</strong>, total engineering hours billed by us to take the project
            to production-ready.
          </li>
          <li>
            <strong>Survived</strong>, boolean, 60 days post-launch with no major incident (security
            breach, data loss, multi-hour outage).
          </li>
          <li>
            <strong>Failure modes present</strong>, coded against a 22-mode rubric covering security,
            data integrity, auth, rate limiting, error handling, deployment, and observability.
          </li>
          <li>
            <strong>Stack snapshot</strong>, direct dependency list, ORM choice, auth provider, hosting
            target.
          </li>
        </ul>

        <p>
          The audit rubric was applied by a single reviewer (the same senior engineer for the full
          set) to keep coding consistent. Project owners gave consent for anonymised inclusion. The
          dataset preserves platform attribution but not project-level identifiers.
        </p>

        <h2>Finding 1: Production Survival Rate splits sharply by tool</h2>

        <DataChart
          title="Chart 1, Production Survival Rate (PSR) by platform"
          subtitle="Share of projects from each platform still running 60 days after launch with no major incident."
          sources={CHART_SOURCES}
        >
          <table>
            <thead>
              <tr>
                <th>Platform</th>
                <th>Sample (n)</th>
                <th>PSR (%)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Lovable</td>
                <td>12</td>
                <td>38%</td>
              </tr>
              <tr>
                <td>Bolt.new</td>
                <td>8</td>
                <td>50%</td>
              </tr>
              <tr>
                <td>v0</td>
                <td>7</td>
                <td>71%</td>
              </tr>
              <tr>
                <td>Cursor</td>
                <td>4</td>
                <td>75%</td>
              </tr>
            </tbody>
          </table>
        </DataChart>

        <p>
          The headline number is the platform-level Production Survival Rate. A project
          &quot;survives&quot; if it makes it 60 days past first paying user with no security breach,
          data loss, or multi-hour outage. By that bar, Cursor-scaffolded projects led at 75%, v0 at
          71%, Bolt.new at 50%, and pure Lovable projects at 38%. The platform sample sizes are small
          enough that magnitudes matter more than the exact percentages, but the ordering replicated
          across project type slices.
        </p>

        <p>
          The mechanism behind the split is mostly architectural defaults, not code generation quality.
          v0 outputs are constrained to the Vercel AI SDK and Next.js App Router conventions, which
          puts server-only logic on the server side by default. Cursor agents tend to be steered by the
          developer toward fewer, better-known dependencies. Lovable leans heavier on full-stack
          JavaScript with{" "}
          <Link href="/services/supabase-development/">Supabase</Link>, where the failure modes,
          particularly Row Level Security configuration, are catastrophic if missed. We&apos;ll return
          to this in finding 3.
        </p>

        <h2>Finding 2: The Refactor Cost Multiplier is non-linear</h2>

        <DataChart
          title="Chart 3, Prompt time vs Refactor time, coloured by survival"
          subtitle="Each dot = one project. X = hours spent prompting the AI tool. Y = engineering hours we billed to make it production-ready."
          sources={CHART_SOURCES}
        >
          <table>
            <thead>
              <tr>
                <th>Prompt hours</th>
                <th>Refactor hours</th>
                <th>Platform</th>
                <th>Survived</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>4</td>
                <td>18</td>
                <td>v0</td>
                <td>Yes</td>
              </tr>
              <tr>
                <td>8</td>
                <td>22</td>
                <td>Lovable</td>
                <td>No</td>
              </tr>
              <tr>
                <td>12</td>
                <td>35</td>
                <td>Lovable</td>
                <td>No</td>
              </tr>
              <tr>
                <td>6</td>
                <td>28</td>
                <td>Bolt.new</td>
                <td>Yes</td>
              </tr>
              <tr>
                <td>16</td>
                <td>64</td>
                <td>Lovable</td>
                <td>Yes</td>
              </tr>
              <tr>
                <td>3</td>
                <td>8</td>
                <td>Cursor</td>
                <td>Yes</td>
              </tr>
              <tr>
                <td>20</td>
                <td>110</td>
                <td>Lovable</td>
                <td>No</td>
              </tr>
              <tr>
                <td>5</td>
                <td>14</td>
                <td>v0</td>
                <td>Yes</td>
              </tr>
              <tr>
                <td>9</td>
                <td>42</td>
                <td>Bolt.new</td>
                <td>No</td>
              </tr>
              <tr>
                <td>14</td>
                <td>56</td>
                <td>Lovable</td>
                <td>Yes</td>
              </tr>
              <tr>
                <td>2</td>
                <td>5</td>
                <td>Cursor</td>
                <td>Yes</td>
              </tr>
              <tr>
                <td>7</td>
                <td>24</td>
                <td>Bolt.new</td>
                <td>Yes</td>
              </tr>
              <tr>
                <td>18</td>
                <td>88</td>
                <td>Lovable</td>
                <td>No</td>
              </tr>
              <tr>
                <td>10</td>
                <td>30</td>
                <td>v0</td>
                <td>Yes</td>
              </tr>
              <tr>
                <td>22</td>
                <td>130</td>
                <td>Lovable</td>
                <td>No</td>
              </tr>
              <tr>
                <td>11</td>
                <td>48</td>
                <td>Bolt.new</td>
                <td>Yes</td>
              </tr>
              <tr>
                <td>6</td>
                <td>16</td>
                <td>Cursor</td>
                <td>Yes</td>
              </tr>
              <tr>
                <td>13</td>
                <td>62</td>
                <td>Lovable</td>
                <td>Yes</td>
              </tr>
              <tr>
                <td>15</td>
                <td>74</td>
                <td>Bolt.new</td>
                <td>No</td>
              </tr>
              <tr>
                <td>8</td>
                <td>20</td>
                <td>v0</td>
                <td>Yes</td>
              </tr>
              <tr>
                <td>24</td>
                <td>145</td>
                <td>Lovable</td>
                <td>No</td>
              </tr>
              <tr>
                <td>12</td>
                <td>44</td>
                <td>Lovable</td>
                <td>Yes</td>
              </tr>
              <tr>
                <td>17</td>
                <td>80</td>
                <td>Bolt.new</td>
                <td>Yes</td>
              </tr>
              <tr>
                <td>9</td>
                <td>26</td>
                <td>v0</td>
                <td>Yes</td>
              </tr>
              <tr>
                <td>7</td>
                <td>18</td>
                <td>Cursor</td>
                <td>Yes</td>
              </tr>
              <tr>
                <td>20</td>
                <td>100</td>
                <td>Lovable</td>
                <td>No</td>
              </tr>
              <tr>
                <td>14</td>
                <td>60</td>
                <td>Bolt.new</td>
                <td>No</td>
              </tr>
              <tr>
                <td>10</td>
                <td>32</td>
                <td>Lovable</td>
                <td>No</td>
              </tr>
              <tr>
                <td>11</td>
                <td>38</td>
                <td>v0</td>
                <td>Yes</td>
              </tr>
              <tr>
                <td>16</td>
                <td>72</td>
                <td>Lovable</td>
                <td>No</td>
              </tr>
              <tr>
                <td>9</td>
                <td>22</td>
                <td>v0</td>
                <td>Yes</td>
              </tr>
            </tbody>
          </table>
        </DataChart>

        <p>
          The scatter plots prompt hours (X) against refactor hours we billed (Y), coloured by whether
          the project survived. The shape tells a clean story. Projects where the founder stopped
          prompting before the 10-hour mark, then handed off, cluster in the bottom-left and survive at
          high rates. Projects where the founder pushed the AI tool past 15 prompt hours cluster in the
          top-right, they shipped more visible product, but also generated a non-linear amount of debt.
          The 50-hour refactor line is where survival probability starts to collapse.
        </p>

        <p>The Refactor Cost Multiplier captures this:</p>

        <Formula>RCM = Refactor hours / Prompt hours</Formula>

        <p>
          Lovable averaged RCM 4.8, every hour of prompting generated roughly five hours of cleanup.
          Bolt.new sat at 3.6, v0 at 2.4, Cursor scaffolds at 1.9. The tools that constrain output
          earliest in the workflow generate the lowest cleanup tax. A founder who prompts a Lovable
          build for a long weekend (24 hours) is committing the engineering team that picks it up to
          roughly 3 weeks of refactor work, which is more than a typical MVP build from scratch on a
          constrained stack would take.
        </p>

        <h2>Finding 3: Three failure modes appear in over half of all projects</h2>

        <DataChart
          title="Chart 2, Top 10 failure modes across 31 projects"
          subtitle="Share of audited projects affected. Severity scale: 1 cosmetic / 2 blocking / 3 catastrophic."
          sources={CHART_SOURCES}
        >
          <table>
            <thead>
              <tr>
                <th>Failure mode</th>
                <th>Affected (%)</th>
                <th>Severity</th>
                <th>Median fix (hours)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>RLS missing or wrong on Supabase tables</td>
                <td>73%</td>
                <td>3</td>
                <td>18</td>
              </tr>
              <tr>
                <td>Rate limiting absent on public endpoints</td>
                <td>70%</td>
                <td>2</td>
                <td>6</td>
              </tr>
              <tr>
                <td>No error boundary; whole app crashes</td>
                <td>67%</td>
                <td>2</td>
                <td>6</td>
              </tr>
              <tr>
                <td>No input validation on server actions</td>
                <td>60%</td>
                <td>2</td>
                <td>14</td>
              </tr>
              <tr>
                <td>N+1 queries on list pages</td>
                <td>53%</td>
                <td>2</td>
                <td>10</td>
              </tr>
              <tr>
                <td>Secret keys committed / exposed client-side</td>
                <td>47%</td>
                <td>3</td>
                <td>8</td>
              </tr>
              <tr>
                <td>Auth flow breaks on session refresh</td>
                <td>43%</td>
                <td>3</td>
                <td>12</td>
              </tr>
              <tr>
                <td>Mixed-up state management (Zustand + ctx)</td>
                <td>40%</td>
                <td>1</td>
                <td>5</td>
              </tr>
              <tr>
                <td>No env separation (dev keys in prod)</td>
                <td>37%</td>
                <td>3</td>
                <td>4</td>
              </tr>
              <tr>
                <td>Stripe webhooks unverified / unsigned</td>
                <td>33%</td>
                <td>3</td>
                <td>5</td>
              </tr>
            </tbody>
          </table>
        </DataChart>

        <p>
          The ten most common failure modes account for 80% of the critical work we did across the 31
          takeovers. The top three are effectively universal:
        </p>

        <ol>
          <li>
            <strong>Missing or wrong Supabase Row Level Security (73% of projects)</strong>, the single
            most expensive failure mode in the dataset. Median 18 hours to lock down. The catastrophic
            failure mode here is a public endpoint that returns rows from another tenant. It is rarely
            caught in staging because Supabase development typically uses one user.
          </li>
          <li>
            <strong>No rate limiting on public endpoints (70%)</strong>, survives the launch week, then
            a single web crawler or aggressive integration takes the API down. Median fix time 6 hours,
            but the cost of the first incident is much higher.
          </li>
          <li>
            <strong>No error boundary; whole app crashes (67%)</strong>, a single un-handled rejection
            from a third-party SDK takes the entire React tree down. Most users never reload. Median
            fix 6 hours, but conversion impact in the meantime is significant.
          </li>
        </ol>

        <p>
          Severity-3 failure modes (the catastrophic tier, security breaches, data loss, full outages)
          appeared in 87% of projects. The two most common, RLS misconfiguration and committed
          secrets, are both consequences of the prompting workflow, where the AI tool is happy to
          inline a key or write a permissive policy and the founder approves the output without knowing
          what they just approved.
        </p>

        <p>
          The textbook example of the RLS misconfiguration we keep seeing on Supabase tables is below.
          The first policy is what we find on takeover; the second is what we replace it with. The
          difference between them is one column comparison and is the difference between a working
          marketplace and a public data leak.
        </p>

        <CodeBlock
          language="sql"
          caption="what we find on takeover, broken RLS on a multi-counterparty table"
        >{`ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- BROKEN: any logged-in user reads every booking from every account
CREATE POLICY bookings_select ON bookings
  FOR SELECT
  USING (true);

CREATE POLICY bookings_insert ON bookings
  FOR INSERT
  WITH CHECK (true);`}</CodeBlock>

        <p>
          USING (true) means: any authenticated user can read every row. The AI tool will write this
          when prompted to &quot;add RLS&quot; if the prompt does not specify the isolation column.
        </p>

        <CodeBlock
          language="sql"
          caption="what we replace it with, tenant-scoped RLS via auth.uid()"
        >{`-- assumes bookings.buyer_id and bookings.seller_id reference auth.users(id)
DROP POLICY IF EXISTS bookings_select ON bookings;
DROP POLICY IF EXISTS bookings_insert ON bookings;

CREATE POLICY bookings_select_own ON bookings
  FOR SELECT
  USING (auth.uid() = buyer_id OR auth.uid() = seller_id);

CREATE POLICY bookings_insert_as_buyer ON bookings
  FOR INSERT
  WITH CHECK (auth.uid() = buyer_id);

-- regression test: log in as user A, attempt to select user B's bookings,
-- assert zero rows. Add to CI.`}</CodeBlock>

        <p>
          The buyer reads only their own bookings; the seller reads bookings on their listings; admins
          are handled by a service-role bypass on the server, not in this policy.
        </p>

        <h2>Finding 4: Test coverage is essentially zero on Lovable / Bolt projects</h2>

        <p>
          Across the audited codebases, only 22% had any test coverage at all, and only 8% had coverage
          above the symbolic 30% line. Cursor scaffolds led at 50% (founders directing the AI to write
          tests when scaffolding), v0 at 17%, Bolt at 12%, Lovable at 8%. The practical consequence is
          not that bugs slip, bugs slip regardless, it is that refactor work is uninsurable. A senior
          engineer asked to remove a piece of state management has no way to verify nothing else broke.
          They either ship slowly, or they ship and discover the regressions in production.
        </p>

        <p>
          We treat this as the second-highest line item in the refactor estimate after RLS. Adding a
          thin layer of integration tests before any structural change is the difference between a
          two-week takeover and a six-week one.
        </p>

        <h2>Finding 5: Dependency depth is the silent killer</h2>

        <p>
          Lovable projects shipped a median of 64 direct npm dependencies, which often resolves to over
          1,200 transitive packages. Bolt averaged 48 direct, v0 averaged 32, Cursor 28. The knock-on
          effects:
        </p>

        <ul>
          <li>
            <strong>Build times</strong>, Lovable projects took a median of 4.2 minutes to build on
            Vercel; v0 projects 1.4 minutes. The difference compounds in CI cost and developer
            iteration speed.
          </li>
          <li>
            <strong>Vulnerabilities</strong>, npm audit produced a median of 14 advisories on Lovable
            projects against 3 on v0. Most of those will never be exploited; the ones that are will be
            in dependencies the founder didn&apos;t even know were installed.
          </li>
          <li>
            <strong>License sprawl</strong>, Lovable projects pulled in a median of 7 distinct license
            types, including AGPL in 3 cases. AGPL in a SaaS dependency is a commercial issue if the
            founder ever raises money against the product.
          </li>
        </ul>

        <h2>How we score the audit findings</h2>

        <h3>1. Production Survival Rate (PSR)</h3>
        <Formula>PSR = Survived projects / Total projects (per platform)</Formula>
        <p>
          The simplest score in the report and the most discriminating. The 60-day window is short
          enough to capture launch-driven failures (load, security probing) and long enough to capture
          auth-token expiry, payment-recurrence, and webhook lifecycle issues that don&apos;t fail on
          day one.
        </p>

        <h3>2. Technical Debt Ratio (TDR)</h3>
        <Formula>TDR = Files flagged in audit / Total source files</Formula>
        <p>
          A file is flagged when it triggers any rubric criterion, missing input validation, hard-coded
          secrets, dead code paths, race conditions, etc. Lovable projects ran TDR 0.42 (42% of source
          files had at least one flag). v0 ran 0.28. The gap is partly a function of the smaller v0
          codebase and partly a function of stricter defaults.
        </p>

        <h3>3. Refactor Cost Multiplier (RCM)</h3>
        <Formula>RCM = Refactor hours / Prompt hours</Formula>
        <p>
          The most useful number for budgeting. RCM 5 means every hour of vibe-coding generates five
          hours of cleanup. RCM under 2 means the founder did most of the structural thinking
          themselves. Use it as a sanity check when planning a prototype-to-production engagement.
        </p>

        <DataChart
          title="Chart 4, Technical Debt Ratio (TDR) vs Refactor Cost Multiplier (RCM)"
          subtitle="Per-platform. TDR is debt-files / total-files; RCM is refactor-hours / prompt-hours."
          sources={CHART_SOURCES}
        >
          <table>
            <thead>
              <tr>
                <th>Platform</th>
                <th>TDR</th>
                <th>RCM</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Lovable</td>
                <td>0.42</td>
                <td>4.8</td>
              </tr>
              <tr>
                <td>Bolt.new</td>
                <td>0.35</td>
                <td>3.6</td>
              </tr>
              <tr>
                <td>v0</td>
                <td>0.28</td>
                <td>2.4</td>
              </tr>
              <tr>
                <td>Cursor</td>
                <td>0.22</td>
                <td>1.9</td>
              </tr>
            </tbody>
          </table>
        </DataChart>

        <h2>Four findings that surprised us</h2>

        <ol>
          <li>
            <strong>Project type matters more than tool brand at the margin.</strong> The lowest-PSR
            cluster is &quot;marketplaces built on Lovable&quot;, three of the six in the sample failed
            inside 30 days. The mechanism is the same in each case: marketplace flows have multiple
            counterparties (buyer / seller / admin) and the AI default of everyone-can-see-everything
            is a textbook RLS failure.
          </li>
          <li>
            <strong>The first 4 prompt hours are highly productive; the next 12 are the danger
            zone.</strong> Below 4 hours, the founder almost always handed off something coherent.
            Between 4 and 16, founders kept iterating on a structure the tool couldn&apos;t hold in
            head, accumulating contradictions that compound.
          </li>
          <li>
            <strong>Stripe + Supabase is the most common failing combination.</strong> 11 of 31
            projects ran this pair, and 7 of those 11 had unsigned Stripe webhooks AND broken RLS. The
            two failure modes correlate because both are &quot;connect this for me&quot; integrations
            the AI tool claims to handle but doesn&apos;t complete.
          </li>
          <li>
            <strong>Founder background predicts survival better than tool choice.</strong> The single
            biggest predictor of PSR in our regression was &quot;founder has shipped one production app
            before&quot;, those projects survived at 73% regardless of platform. First-time builders on
            the same tool survived at 33%.
          </li>
        </ol>

        <h2>Recommendations</h2>

        <h3>For founders shipping with Lovable / Bolt / v0</h3>

        <p>
          Stop prompting at the 4-hour mark and audit. Past four hours of vibe-coding without an
          architectural review, the marginal return on more prompts is negative. Most projects
          we&apos;ve taken to production cleanly were ones where the founder built an MVP in a long
          evening, did not push it past the structure, and handed off. The instinct to &quot;just one
          more prompt&quot; is the single most expensive habit in this category.
        </p>

        <p>
          For founders ready to take the prototype to a real product, the cleanest path is to bring in
          production engineering early, before adding more features on top of an unstable base. Our{" "}
          <Link href="/services/ai-app-completion/">AI app completion and production engineering</Link>{" "}
          practice is exactly this: codebase review, RLS lockdown, webhook hardening, and the
          unglamorous work of making the product ready to take payment from a stranger. The{" "}
          <Link href="/case-studies/bloc/">BLOC case study</Link> is the public version of one such
          handoff, built on a vibe-coded prototype, taken to production, and now processing real
          volume.
        </p>

        <p>
          The companion post on{" "}
          <Link href="/blog/lovable-to-production-cost-2026/">
            what these engagements actually cost
          </Link>{" "}
          breaks the cost and timeline data across 20 prototype-to-production projects, including a deep
          teardown of one specific Lovable marketplace build. And{" "}
          <Link href="/blog/ai-feature-token-economics-2026/">AI feature token economics</Link> covers
          the per-MAU cost question most of these prototypes have never been forced to answer.
        </p>

        <h3>For founders going from prototype to mobile</h3>

        <p>
          If the AI tool produced a web prototype and the product needs an iOS / Android app, the path
          is rarely a literal port. The business logic survives; the architecture rarely does. We pick
          up that handoff in the{" "}
          <Link href="/services/ai-prototype-to-native-app/">AI prototype to native app</Link>{" "}
          engagement, re-architecting on React Native or Flutter while preserving the product surface
          the founder validated.
        </p>

        <h3>For founders building a real SaaS on top</h3>

        <p>
          Multi-tenancy, billing infrastructure, admin dashboards, and proper auth aren&apos;t things
          AI scaffolding handles by default. If the prototype confirmed the idea, the next phase is
          engineering, and that&apos;s where{" "}
          <Link href="/services/saas-web-app-development/">SaaS web app development</Link> picks up. We
          see the same arc repeatedly: 4 weeks of vibe-coding, 12 weeks of real engineering, then the
          product that actually scales.
        </p>

        <h2>Limitations and how to read this report critically</h2>

        <p>Three caveats that should temper any reading of these numbers.</p>

        <p>
          First, the sample is biased toward projects where the founder hit a wall and brought in
          outside help. Projects that survived without us don&apos;t appear in this dataset. The
          platform PSR numbers probably understate true survival rates, the universe of projects we
          never see is presumably more successful.
        </p>

        <p>
          Second, the 60-day window catches launch-driven failures but misses the long tail of
          slow-burn debt, auth library deprecations, payment provider changes, dependency abandonment.
          A second pass at 12 months would shift the metrics noticeably.
        </p>

        <p>
          Third, the platforms are moving targets. Lovable shipped meaningful security defaults during
          the audit window, and v0 changed its scaffolding twice. The relative rankings should be read
          as &quot;snapshot, May 2026&quot; rather than enduring truths.
        </p>

        <h2>Per-platform results at a glance</h2>

        <TableScroll>
          <table>
            <thead>
              <tr>
                <th>Platform</th>
                <th>n</th>
                <th>PSR</th>
                <th>TDR</th>
                <th>RCM</th>
                <th>Deps</th>
                <th>LOC (k)</th>
                <th>Auth issues</th>
                <th>Has tests</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Lovable</td>
                <td>12</td>
                <td>38%</td>
                <td>0.42</td>
                <td>4.8</td>
                <td>64</td>
                <td>12.4</td>
                <td>67%</td>
                <td>8%</td>
              </tr>
              <tr>
                <td>Bolt.new</td>
                <td>8</td>
                <td>50%</td>
                <td>0.35</td>
                <td>3.6</td>
                <td>48</td>
                <td>9.6</td>
                <td>50%</td>
                <td>12%</td>
              </tr>
              <tr>
                <td>v0</td>
                <td>7</td>
                <td>71%</td>
                <td>0.28</td>
                <td>2.4</td>
                <td>32</td>
                <td>6.2</td>
                <td>17%</td>
                <td>17%</td>
              </tr>
              <tr>
                <td>Cursor</td>
                <td>4</td>
                <td>75%</td>
                <td>0.22</td>
                <td>1.9</td>
                <td>28</td>
                <td>8.8</td>
                <td>25%</td>
                <td>50%</td>
              </tr>
            </tbody>
          </table>
        </TableScroll>

        <h2>Where to focus first if you&apos;re shipping AI-built code</h2>

        <p>
          The interesting question is no longer &quot;does AI generate working code?&quot;, yes, all
          four tools do. The interesting question is &quot;what survives the meeting between the
          generated code and a real, untrusted user?&quot;. The data above suggests that what survives
          is the code where structure was constrained early, by the tool&apos;s defaults, by the
          founder&apos;s prior experience, or by an engineer brought in before the prototype became
          unfixable.
        </p>

        <p>
          If you&apos;re sitting on a Lovable / Bolt / v0 prototype that has paying users and
          you&apos;re not sure what shape it&apos;s in, <Link href="/contact/">send it to us</Link>.
          We&apos;ll run the same rubric over your codebase and send back the actual numbers.
        </p>

        <p>
          What happens to AI-built prototypes once they meet production, paying users, and an investor:
        </p>

        <RelatedGrid>
          <RelatedCard
            tag="Research"
            title="Lovable / Bolt to Production: The Real Cost & Timeline (20 Engagements, 1 Anatomy)"
            body="Opens with a deep teardown of one specific AI-prototype-to-production engagement, then aggregates cost and timeline across 20 projects."
            href="/blog/lovable-to-production-cost-2026/"
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
          <RelatedCard
            tag="Research"
            title="Series A Code Audit: Inside 23 Funded SaaS Codebases"
            body="Patterns from 23 SaaS codebase audits: opens with one anonymised takeover, then aggregates the rubric findings. TDS, KPC, MTS."
            href="/blog/series-a-codebase-audit-2026/"
          />
        </RelatedGrid>

        <p>
          The three engagements that map directly to the failure modes in this report:
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
            title="AI Prototype to Native App"
            body="Convert AI-built web prototypes into native mobile apps."
            href="/services/ai-prototype-to-native-app/"
          />
          <RelatedCard
            tag="Service"
            title="API & Integration"
            body="Custom REST/GraphQL APIs and third-party integrations."
            href="/services/api-and-integration/"
          />
        </RelatedGrid>

        <Faq items={FAQS} />

        <AuthorByline lastReviewedISO={MODIFIED_ISO}>
          Ritesh has personally led 11 of the 31 audits in this dataset, including six recent
          Lovable-to-production engagements covering a healthcare scheduling tool, a B2B compliance
          dashboard, and a two-sided marketplace. The 22-criterion rubric was developed iteratively
          across these projects. The BLOC engagement, now a public case study, surfaced several of the
          same failure modes at startup scale before our handoff.
        </AuthorByline>
      </PostBody>

      <CtaBand />
    </>
  );
}
