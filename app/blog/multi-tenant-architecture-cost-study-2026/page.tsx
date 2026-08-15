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
import { buildPostSchemas } from "@/lib/blog-post";

const PUBLISHED_ISO = "2026-04-08";
const MODIFIED_ISO = "2026-05-10";
const READ_TIME = "19 min read";

const PAGE_TITLE =
  "The Multi-Tenant SaaS Architecture Decision: Cost & Engineering Hours Across 4 Patterns | Appycodes";
const PAGE_DESCRIPTION =
  "Per-pattern cost, isolation strength, and onboarding eng-hours for the four common multi-tenancy approaches in production SaaS. TIC, AOC, BCM metrics included.";
const PAGE_PATH = "/blog/multi-tenant-architecture-cost-study-2026/";
const PAGE_IMAGE = "/images/blog-multi-tenant-architecture-cost-study-2026.jpg";
const PAGE_KEYWORDS =
  "multi tenant saas architecture, tenant per database, schema per tenant, row level security saas, multi tenant cost";

const FAQS = [
  {
    q: "Which multi-tenant architecture pattern is right for most B2B SaaS?",
    a: "Single-DB with a tenant_id column and Postgres Row Level Security. $1,800 per 1,000 tenants per month at typical scale, 40 hours to onboard, and fine isolation if RLS is enforced. Almost every SaaS we audit has over-engineered past this pattern.",
  },
  {
    q: "When should I move to schema-per-tenant or database-per-tenant?",
    a: "Schema-per-tenant for analytics-heavy tables once a few large tenants represent disproportionate read volume. Database-per-tenant only for tenants under hard compliance constraints (HIPAA, sovereign data). Hybrid patterns, single-DB by default, with carved-out heavy or compliance-flagged tenants, are common and almost nobody documents them.",
  },
  {
    q: "Why is application-layer tenant filtering risky?",
    a: "Because a single missing WHERE clause leaks across tenants. The 5 tenant-leak incidents we have audited all happened on stacks that relied on the application to filter; none on stacks that used Postgres RLS as the floor. Defence-in-depth means both, with RLS as the guarantee.",
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
  breadcrumbLabel: "Multi-Tenant Architecture Cost",
  keywords: PAGE_KEYWORDS,
  faqs: FAQS,
});

const CHART_SOURCES =
  "Sources: AWS RDS Postgres pricing; Neon and Supabase tenant pricing; CockroachDB and Postgres benchmarks; Appycodes implementation data across 14 multi-tenant builds.";

export default function Page() {
  return (
    <>
      <JsonLd data={schemas} />

      <PostHeader
        eyebrow="Architecture report"
        title="The multi-tenant SaaS architecture decision: cost & engineering hours across four patterns"
        lead="The four mainstream multi-tenancy patterns scored on per-tenant cost, isolation strength, blast radius, and engineering hours to onboard. Three new metrics (TIC, AOC, BCM) sized against real workloads."
        breadcrumbLabel="Multi-Tenant Architecture Cost"
        dateISO={MODIFIED_ISO}
        readTime={READ_TIME}
        image={PAGE_IMAGE}
        imageAlt="Multi-tenant architecture cost study"
      />

      <PostBody>
        <Callout variant="tldr">
          <ul>
            <li>
              <strong>Single-DB tenant_id is right for 80% of B2B SaaS at typical scale.</strong>{" "}
              $1,800 per 1k tenants/mo, 40 hours to onboard, fine isolation if RLS is correct. Almost
              everyone over-engineers past this.
            </li>
            <li>
              <strong>Database-per-tenant breaks economically past ~5,000 tenants.</strong> The cost
              curve goes vertical. Outside compliance-heavy verticals (healthcare, finance, defence),
              it&apos;s the wrong default.
            </li>
            <li>
              <strong>Onboard latency is the under-discussed cost.</strong> Schema-per-tenant takes
              ~1.8s to provision; database-per-tenant takes 5+. If sign-up flows are time-sensitive,
              this is the deciding factor.
            </li>
          </ul>
        </Callout>

        <p>
          Multi-tenancy decisions are easy to over-engineer because the failure mode of getting them
          wrong (data leaking between tenants) is catastrophic. The interesting question is which
          pattern actually fits the workload, most teams default to the most-isolated pattern they
          can afford, which is often two patterns more isolated than they need.
        </p>

        <p>
          We compared the four mainstream patterns, single DB with tenant_id, schema-per-tenant,
          database-per-tenant, and sharded-by-region, across cost, isolation, onboard latency, and
          engineering hours to ship. Below.
        </p>

        <h2>The four patterns at a glance</h2>

        <TableScroll>
          <table>
            <thead>
              <tr>
                <th>Pattern</th>
                <th>Description</th>
                <th>TIC/1k</th>
                <th>AOC (hrs)</th>
                <th>BCM</th>
                <th>Isolation</th>
                <th>Onboard ms</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Single DB, tenant_id column</td>
                <td>Row-level isolation by tenant_id with RLS / app guards</td>
                <td>$1800</td>
                <td>40</td>
                <td>75</td>
                <td>55</td>
                <td>200</td>
              </tr>
              <tr>
                <td>Schema-per-tenant</td>
                <td>One DB, one schema per tenant</td>
                <td>$6200</td>
                <td>110</td>
                <td>50</td>
                <td>75</td>
                <td>1,800</td>
              </tr>
              <tr>
                <td>Database-per-tenant</td>
                <td>Separate database / namespace per tenant</td>
                <td>$24000</td>
                <td>220</td>
                <td>18</td>
                <td>95</td>
                <td>5,200</td>
              </tr>
              <tr>
                <td>Sharded by region</td>
                <td>Tenants partitioned by region/cluster, multi-tenant within each shard</td>
                <td>$8200</td>
                <td>320</td>
                <td>35</td>
                <td>80</td>
                <td>600</td>
              </tr>
            </tbody>
          </table>
        </TableScroll>

        <h2>Finding 1: TIC ranges 13x across the four patterns</h2>

        <DataChart
          title="Chart 1: Tenant Isolation Cost (TIC) per pattern at 1,000 tenants"
          subtitle="USD per 1,000 active tenants per month. Higher isolation = higher infrastructure spend."
          sources={CHART_SOURCES}
        >
          <table>
            <thead>
              <tr>
                <th>Pattern</th>
                <th>TIC/1k ($)</th>
                <th>AOC (hrs)</th>
                <th>BCM</th>
                <th>Isolation</th>
                <th>Onboard latency (ms)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Single DB, tenant_id column</td>
                <td>$1,800</td>
                <td>40</td>
                <td>75</td>
                <td>55</td>
                <td>200</td>
              </tr>
              <tr>
                <td>Schema-per-tenant</td>
                <td>$6,200</td>
                <td>110</td>
                <td>50</td>
                <td>75</td>
                <td>1,800</td>
              </tr>
              <tr>
                <td>Database-per-tenant</td>
                <td>$24,000</td>
                <td>220</td>
                <td>18</td>
                <td>95</td>
                <td>5,200</td>
              </tr>
              <tr>
                <td>Sharded by region</td>
                <td>$8,200</td>
                <td>320</td>
                <td>35</td>
                <td>80</td>
                <td>600</td>
              </tr>
            </tbody>
          </table>
        </DataChart>

        <p>
          Tenant Isolation Cost (TIC) per 1,000 tenants ranges from $1,800 (single DB, tenant_id) to
          $24,000 (database-per-tenant) at the 1k-tenant baseline. The range matters because it
          compounds, at 1k tenants the TIC delta is already $27k/mo, on the order of an additional
          engineer. Pick the wrong pattern early and the infrastructure bill funds a salary nobody
          plans for.
        </p>

        <h2>Finding 2: Cost scaling diverges sharply past 10k tenants</h2>

        <DataChart
          title="Chart 2: Cost scaling with tenant count"
          subtitle="Y is monthly TIC ($), X is active tenants on a log scale. Database-per-tenant breaks down economically past ~5k tenants."
          sources={CHART_SOURCES}
        >
          <table>
            <thead>
              <tr>
                <th>Active tenants</th>
                <th>Single DB / tenant_id ($)</th>
                <th>Schema-per-tenant ($)</th>
                <th>DB-per-tenant ($)</th>
                <th>Sharded by region ($)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>100</td>
                <td>$1,800</td>
                <td>$6,200</td>
                <td>$24,000</td>
                <td>$8,200</td>
              </tr>
              <tr>
                <td>500</td>
                <td>$1,900</td>
                <td>$6,500</td>
                <td>$26,000</td>
                <td>$8,400</td>
              </tr>
              <tr>
                <td>1,000</td>
                <td>$2,200</td>
                <td>$7,200</td>
                <td>$29,500</td>
                <td>$8,800</td>
              </tr>
              <tr>
                <td>5,000</td>
                <td>$3,400</td>
                <td>$11,500</td>
                <td>$56,000</td>
                <td>$11,800</td>
              </tr>
              <tr>
                <td>10,000</td>
                <td>$5,200</td>
                <td>$18,000</td>
                <td>$110,000</td>
                <td>$16,500</td>
              </tr>
              <tr>
                <td>50,000</td>
                <td>$14,000</td>
                <td>$62,000</td>
                <td>$510,000</td>
                <td>$48,000</td>
              </tr>
              <tr>
                <td>100,000</td>
                <td>$27,000</td>
                <td>$118,000</td>
                <td>$1,080,000</td>
                <td>$88,000</td>
              </tr>
            </tbody>
          </table>
        </DataChart>

        <p>
          Read on log-log axes: the Single-DB pattern scales sub-linearly (cost per tenant goes{" "}
          <em>down</em>) because the underlying database has fixed overhead. Database-per-tenant
          scales super-linearly (cost goes up faster than tenant count) because each tenant gets its
          own running database. Past 10k tenants, the gap is 20x+. Past 100k it&apos;s 40x.
        </p>

        <h2>Finding 3: Blast-Radius is real and asymmetric</h2>

        <DataChart
          title="Chart 3: Blast-Radius Cost Multiplier (BCM) by pattern"
          subtitle="Higher = a misbehaving tenant is more likely to impact others. Reads in dollars: how much it costs to contain a single bad tenant."
          sources={CHART_SOURCES}
        >
          <table>
            <thead>
              <tr>
                <th>Pattern</th>
                <th>BCM</th>
                <th>TIC/1k ($)</th>
                <th>AOC (hrs)</th>
                <th>Isolation</th>
                <th>Onboard latency (ms)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Single DB, tenant_id column</td>
                <td>75</td>
                <td>$1,800</td>
                <td>40</td>
                <td>55</td>
                <td>200</td>
              </tr>
              <tr>
                <td>Schema-per-tenant</td>
                <td>50</td>
                <td>$6,200</td>
                <td>110</td>
                <td>75</td>
                <td>1,800</td>
              </tr>
              <tr>
                <td>Database-per-tenant</td>
                <td>18</td>
                <td>$24,000</td>
                <td>220</td>
                <td>95</td>
                <td>5,200</td>
              </tr>
              <tr>
                <td>Sharded by region</td>
                <td>35</td>
                <td>$8,200</td>
                <td>320</td>
                <td>80</td>
                <td>600</td>
              </tr>
            </tbody>
          </table>
        </DataChart>

        <p>
          The BCM score captures how much one bad tenant can affect others. Single-DB with tenant_id
          has the highest BCM (75) because a runaway query on a hot table affects everyone.
          Database-per-tenant has the lowest (18). The asymmetry: the BCM cost is paid only when
          something goes wrong; the TIC cost is paid every month.
        </p>

        <h2>How we compare the four patterns</h2>

        <h3>1. Tenant Isolation Cost (TIC)</h3>
        <Formula>TIC = (Monthly infra cost / active tenants) x 1000</Formula>
        <p>
          The core unit-economic number. Compute on observed infra spend and tenant count; compare
          against pattern benchmarks above.
        </p>

        <h3>2. Architecture Onboarding Cost (AOC)</h3>
        <Formula>AOC = Engineering hours to ship the multi-tenancy pattern from scratch</Formula>
        <p>
          Includes schema design, RLS / policy setup, test coverage, observability for the chosen
          pattern, and tenant onboarding flow. Measured per pattern across our own implementations.
        </p>

        <h3>3. Blast-Radius Cost Multiplier (BCM)</h3>
        <Formula>BCM = Probability of cross-tenant impact x cost-of-impact</Formula>
        <p>
          A risk-weighted cost. Multi-tenant SaaS in regulated verticals applies BCM as a hard floor,
          patterns above a threshold are rejected regardless of TIC.
        </p>

        <h2>What surprised us about tenant isolation in practice</h2>

        <ol>
          <li>
            <strong>Most over-engineering happens at &lt;1k tenants.</strong> Founders pick
            database-per-tenant because it &quot;feels safer&quot; before there&apos;s any reason to.
            The 100-tenant company on database-per-tenant is paying $24/mo per tenant in infra to
            isolate.
          </li>
          <li>
            <strong>Hybrid patterns work and almost nobody documents them.</strong> Single-DB with
            tenant_id for the bulk of the workload, schema-per-tenant for analytics-heavy tables,
            database-per-tenant for HIPAA-flagged tenants. Three of our highest-scale builds run this
            hybrid.
          </li>
          <li>
            <strong>Postgres RLS is dramatically more reliable than app-layer guards.</strong> The 5
            tenant-leak incidents we&apos;ve audited all happened on stacks that relied on the
            application to filter; none on stacks that used RLS as the floor.
          </li>
          <li>
            <strong>Schema-per-tenant runs out of room around 5k tenants on Postgres.</strong>{" "}
            Catalogue scans, migration time, and connection-pool fragmentation all degrade. Past that
            point you&apos;re moving to sharded-by-region whether you wanted to or not.
          </li>
          <li>
            <strong>Onboard latency over 3 seconds measurably hurts conversion.</strong> A/B testing
            across two of our SaaS clients showed sign-up completion drops 6-9% when the
            &quot;creating your workspace&quot; step exceeds 3s. Database-per-tenant pays this tax
            every signup.
          </li>
        </ol>

        <p>
          Concretely, &ldquo;single-DB with tenant_id and RLS as the floor&rdquo; is short for the
          policy below. This is the minimum we deploy on a new Postgres-backed multi-tenant SaaS, the
          policy is the second line of defence after application-layer filtering, but it is the line
          that actually held up across the audits we ran.
        </p>

        <p>
          Applied to every tenant-scoped table. Reads and writes are restricted to the tenant in the
          JWT claim that the API server sets via SET LOCAL on each request.
        </p>

        <CodeBlock
          language="sql"
          caption="postgres / multi-tenant baseline RLS policy"
        >{`-- 1. enforce tenant_id on every table that holds tenant data
ALTER TABLE projects
  ADD COLUMN tenant_id uuid NOT NULL REFERENCES tenants(id);

CREATE INDEX projects_tenant_id_idx ON projects(tenant_id);

-- 2. turn RLS on, force it (so even the table owner is bound by it)
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects FORCE ROW LEVEL SECURITY;

-- 3. tenant scoping policy: rows must match the request's tenant
CREATE POLICY projects_tenant_isolation ON projects
  USING       (tenant_id = current_setting('app.current_tenant', true)::uuid)
  WITH CHECK  (tenant_id = current_setting('app.current_tenant', true)::uuid);

-- 4. the API server sets the tenant per-transaction from the verified JWT:
--    SET LOCAL app.current_tenant = '<tenant uuid from auth claim>';
--
-- 5. an integration test should attempt a cross-tenant read with tenant A's
--    session and assert zero rows. Run it on every PR.`}</CodeBlock>

        <h2>Recommendations</h2>

        <h3>For founders building a new SaaS</h3>
        <p>
          Default to single-DB with tenant_id on Postgres with RLS. Validate isolation with tests
          before launch. Plan to keep the pattern through ~10k tenants. Hybrid only when a real
          compliance or performance reason forces it. Our{" "}
          <Link href="/services/saas-web-app-development/">SaaS web app development</Link> engagement
          runs this pattern by default.
        </p>

        <h3>For founders building AI SaaS</h3>
        <p>
          AI features add an interesting wrinkle: tenant-context data shouldn&apos;t leak into model
          prompts across tenants. The cleanest pattern is single-DB tenant_id with tenant-scoped RAG
          indexes. We bake this into{" "}
          <Link href="/services/ai-saas-product-development/">AI SaaS product development</Link> from
          day one, the alternative is a single embedding-store leak from one tenant&apos;s docs into
          another&apos;s completions.
        </p>

        <h3>For founders connecting multi-tenant data via APIs</h3>
        <p>
          Tenant scoping has to live at the API gateway layer, not just inside the application. We see
          this miss repeatedly: app code is tenant-aware, public APIs are not, and a single
          misconfigured token grants cross-tenant read access. The{" "}
          <Link href="/blog/series-a-codebase-audit-2026/">Series A codebase audit</Link> has the war
          stories, three of the 23 audited codebases had this exact failure mode in production. Our{" "}
          <Link href="/services/api-and-integration/">API &amp; integration</Link> engagement covers
          exactly this surface, gateway-level tenant scoping, scoped tokens, and tenant-aware rate
          limits.
        </p>

        <h2>Limitations</h2>
        <p>
          Cost figures use AWS / GCP / Neon / Supabase pricing as of May 2026. Self-hosted setups will
          diverge, usually lower at scale, higher at small scale. Onboard latency numbers come from
          production telemetry on our own stacks.
        </p>

        <h2>How to choose the pattern in 30 minutes</h2>
        <p>
          The cost difference between &quot;chose the right multi-tenant pattern&quot; and &quot;chose
          the safest-feeling one&quot; is an entire engineer&apos;s salary at scale. Pick on the basis
          of TIC x tenant count five years out, not on the strength of the strongest-isolated
          alternative.
        </p>

        <p>
          What multi-tenancy looks like at Series A, what an MVP build cost it, and the per-tenant
          token math for AI features:
        </p>

        <RelatedGrid>
          <RelatedCard
            tag="Research"
            title="Series A Code Audit: Inside 23 Funded SaaS Codebases"
            body="Patterns from 23 SaaS codebase audits, opening with one anonymised takeover."
            href="/blog/series-a-codebase-audit-2026/"
          />
          <RelatedCard
            tag="Research"
            title="What an MVP Actually Costs in 2026: Three Founder Stories + 31 Engagements of Data"
            body="Three founder stories of 2026 MVP builds, then aggregate cost and bandwidth data across 31 engagements."
            href="/blog/mvp-cost-funded-startups-2026/"
          />
          <RelatedCard
            tag="Research"
            title="Per-Token Economics: What an AI Feature Actually Costs in Production (47 SaaS Sample)"
            body="Real per-MAU token cost data across 47 production AI SaaS products."
            href="/blog/ai-feature-token-economics-2026/"
          />
        </RelatedGrid>

        <p>
          The two engagements where this pattern is part of the architecture from sprint zero, plus
          the calculator that prices an architecture against your scope:
        </p>

        <RelatedGrid>
          <RelatedCard
            tag="Service"
            title="AI SaaS Product Development"
            body="Multi-tenant AI SaaS with subscriptions and admin dashboards."
            href="/services/ai-saas-product-development/"
          />
          <RelatedCard
            tag="Service"
            title="API & Integration"
            body="Custom REST/GraphQL APIs and third-party integrations."
            href="/services/api-and-integration/"
          />
          <RelatedCard
            tag="Service"
            title="Software Project Estimator"
            body="Price an architecture against your scope before you commit to the build."
            href="/software-project-estimator/"
          />
        </RelatedGrid>

        <Faq items={FAQS} />

        <AuthorByline lastReviewedISO={MODIFIED_ISO}>
          Ritesh leads engineering at Appycodes. The team has shipped 14 multi-tenant SaaS builds in
          the last three years across three of the four patterns scored here, including a B2B platform
          on schema-per-tenant and a security-focused product on database-per-tenant. The Series A
          audit findings linked in this post show what happens when this decision is delayed past the
          right moment.
        </AuthorByline>
      </PostBody>

      <CtaBand />
    </>
  );
}
