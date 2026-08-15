import Link from "next/link";
import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { JsonLd } from "@/components/jsonld";
import { CtaBand } from "@/components/cta-band";
import {
  PostHeader,
  PostBody,
  CodeBlock,
  TableScroll,
  AuthorByline,
  RelatedGrid,
  RelatedCard,
  Faq,
} from "@/components/blog";
import { buildPostSchemas } from "@/lib/blog-post";

const PUBLISHED_ISO = "2026-05-12";
const MODIFIED_ISO = "2026-05-12";
const READ_TIME = "21 min read";

const PAGE_TITLE =
  "Zero-Downtime Deploy on DigitalOcean App Platform vs Vercel, Render, Fly | Appycodes";
const PAGE_DESCRIPTION =
  "Anatomy of one deploy, side-by-side, on four PaaS platforms: health-check semantics, traffic-shift mechanics, rollback paths, and the real cost of zero-downtime at 100 RPS.";
const PAGE_PATH = "/blog/zero-downtime-digitalocean-app-platform-2026/";
const PAGE_IMAGE = "/images/blog-digitalocean-zero-downtime-2026.jpg";
const KEYWORDS =
  "digitalocean app platform, zero downtime deploy, vercel vs render vs fly, paas comparison, blue green deploy";

const FAQS = [
  {
    q: "What does zero-downtime deploy actually require?",
    a: "Five behaviours: no 5xx during traffic shift, in-flight requests drain on the old version, WebSocket connections close cleanly with a reconnect signal, database migrations stay backward-compatible during the overlap, and rollback is the same command as deploy. Most platforms call any non-502 deploy 'zero-downtime', that is a low bar.",
  },
  {
    q: "Which PaaS is cheapest for a typical long-process API?",
    a: "DigitalOcean App Platform. A 2-instance Professional XS deployment runs around $73/mo against a comparable Vercel function bill in the $300+/mo range. Render sits in between with a more forgiving starter tier. Fly.io is cheapest at the very low end but requires the most config knobs.",
  },
  {
    q: "Why is Vercel weak for WebSocket workloads?",
    a: "Vercel's deploy mechanism is an atomic alias swap on top of the function pool, the swap is instant but anything stateful across it is the developer's problem. Long-lived sockets on serverless are inherently fragile. For persistent connections, App Platform, Render or Fly are all better-shaped.",
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
  breadcrumbLabel: "Zero-Downtime Deploy on DigitalOcean App Platform",
  keywords: KEYWORDS,
  faqs: FAQS,
});

export default function Page() {
  return (
    <>
      <JsonLd data={schemas} />

      <PostHeader
        eyebrow="Engineering playbook"
        title="Zero-downtime push-to-deploy on DigitalOcean App Platform, and how it actually compares to Vercel, Render and Fly"
        lead="We have moved 11 production apps onto DigitalOcean App Platform in the last 18 months, most from Vercel or Render. This is the side-by-side deploy story, with timings, traffic-shift mechanics, and rollback paths on all four platforms."
        breadcrumbLabel="Zero-Downtime Deploy on DigitalOcean App Platform"
        dateISO={MODIFIED_ISO}
        readTime={READ_TIME}
        image={PAGE_IMAGE}
        imageAlt="Zero-downtime deploy on DigitalOcean App Platform versus Vercel, Render and Fly"
      />

      <PostBody>
        <h2>What &quot;zero-downtime&quot; actually has to mean</h2>
        <p>
          Most platforms call any deploy that does not return a 502 &quot;zero-downtime&quot;. That is
          a low bar. The five behaviours we actually test for, on every platform, before we sign off on
          a deploy pipeline:
        </p>
        <ol>
          <li>
            <strong>No 5xx during traffic shift</strong>, measured by hitting <code>/health</code> at
            50 RPS for the full deploy window.
          </li>
          <li>
            <strong>In-flight requests drain</strong>, long-running POSTs started against the old
            version finish on the old version.
          </li>
          <li>
            <strong>WebSocket / SSE connections survive</strong>, or close cleanly with a reconnect
            signal, not RST.
          </li>
          <li>
            <strong>DB migrations stay backward-compatible</strong>, old and new versions run
            side-by-side for at least the drain window.
          </li>
          <li>
            <strong>Rollback is the same command as deploy</strong>, not a separate operations
            procedure.
          </li>
        </ol>

        <p>
          Below, all four platforms are scored against those five behaviours, then we walk through one
          deploy on each. The rest of the post covers the gotchas we hit moving an app between them.
        </p>

        <h2>The matrix</h2>

        <TableScroll>
          <table>
            <thead>
              <tr>
                <th>Behaviour</th>
                <th>DO App Platform</th>
                <th>Vercel</th>
                <th>Render</th>
                <th>Fly.io</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>No 5xx during shift</td>
                <td>Yes if health-check path configured</td>
                <td>Yes (atomic alias swap)</td>
                <td>Yes if zero-downtime enabled</td>
                <td>Yes with bluegreen strategy</td>
              </tr>
              <tr>
                <td>Drain in-flight requests</td>
                <td>~120s SIGTERM grace</td>
                <td>Function-bound, ~15s</td>
                <td>~30s by default, configurable</td>
                <td>Configurable via kill_timeout</td>
              </tr>
              <tr>
                <td>WS / SSE survive deploy</td>
                <td>Closes, client reconnects</td>
                <td>Edge-only, fragile for long sockets</td>
                <td>Closes cleanly</td>
                <td>Cleanest of the four (per-machine)</td>
              </tr>
              <tr>
                <td>Side-by-side runtime</td>
                <td>~2 min overlap during shift</td>
                <td>Atomic; no overlap</td>
                <td>~30 to 90s overlap</td>
                <td>Long, depends on rollout</td>
              </tr>
              <tr>
                <td>One-click rollback</td>
                <td>Yes (per deployment)</td>
                <td>Yes (per deployment, instant)</td>
                <td>Yes</td>
                <td>
                  Manual: <code>fly deploy --image</code>
                </td>
              </tr>
              <tr>
                <td>Median deploy time, 250MB image</td>
                <td>4 to 6 min</td>
                <td>35 to 90 s</td>
                <td>3 to 5 min</td>
                <td>90 s to 3 min</td>
              </tr>
            </tbody>
          </table>
        </TableScroll>
        <p>
          Sources: per-platform documentation; deploy timings averaged across our 11 production
          migrations (Node, Python, Laravel, Next.js).
        </p>

        <p>
          The numbers paint a real picture: Vercel is the fastest at the swap mechanism itself (it is
          just an alias) but the worst at long-lived connections. App Platform and Render are the most
          predictable for typical CRUD APIs. Fly is the most controllable but expects you to design the
          strategy yourself.
        </p>

        <h2>Deploy 1, DigitalOcean App Platform, second by second</h2>

        <p>
          The platform builds your container in a managed Cloud-Native Buildpacks runner, pushes the
          resulting image to DOCR, then performs a rolling deploy across the configured number of
          instances. The health-check path is the single most important config, get it wrong and you
          ship downtime.
        </p>

        <p>
          The two settings that matter: http_path and the initial_delay_seconds. Default initial_delay
          is 0, which fails the health check before the app boots; set it to your real cold-start time
          + 5 seconds.
        </p>

        <CodeBlock language="yaml" caption=".do/app.yaml, production health-check config">{`name: api-prod
services:
  - name: web
    github:
      repo: appycodes/api
      branch: main
      deploy_on_push: true
    instance_size_slug: professional-xs
    instance_count: 2
    http_port: 8080
    health_check:
      http_path: /healthz
      initial_delay_seconds: 25
      period_seconds: 10
      timeout_seconds: 5
      success_threshold: 1
      failure_threshold: 3
    routes:
      - path: /
    envs:
      - key: DATABASE_URL
        scope: RUN_TIME
        type: SECRET
    autoscaling:
      min_instance_count: 2
      max_instance_count: 8
      metrics:
        cpu:
          percent: 70`}</CodeBlock>

        <p>The deploy lifecycle, as we measure it from the DO control panel:</p>

        <CodeBlock language="text" caption="DO App Platform, observed deploy timeline (250MB Node image, 2 instances)">{`t = 0:00    push to main, webhook fires
t = 0:08    build container starts in DO managed runner
t = 2:55    build complete, image pushed to DOCR
t = 3:00    new instance 1 starts in parallel to old 1
t = 3:25    new instance 1 passes health check
t = 3:25    load balancer adds new instance 1, removes old instance 1
t = 3:30    old instance 1 receives SIGTERM, has 120s to drain
t = 3:55    new instance 2 starts in parallel to old 2
t = 4:20    new instance 2 passes health check
t = 4:20    load balancer swap; old instance 2 starts draining
t = 5:30    old instance 1 finishes drain, exits cleanly
t = 6:25    old instance 2 finishes drain, exits cleanly
t = 6:25    deploy marked complete`}</CodeBlock>

        <p>
          The 120-second SIGTERM grace window is generous compared to most PaaS, Heroku gives 30s,
          Vercel functions are effectively bound by their function timeout. For our Laravel and Node
          APIs, 120s is enough to drain even the longest legitimate request (a CSV export hitting a slow
          third-party).
        </p>

        <p>
          Two things to know about how App Platform handles long-lived connections. First, WebSocket
          connections are terminated at SIGTERM, the client sees a clean close, not an RST. Second, the
          load balancer does not currently forward sticky-session cookies for WS connections by default,
          so any reconnection-based recovery needs to tolerate landing on a different instance. We design
          every WS handler we ship to be re-entrant for this reason.
        </p>

        <h2>Deploy 2, Vercel</h2>

        <p>
          Vercel&apos;s deploy mechanism is fundamentally different. Each push builds a new immutable
          deployment with its own URL (<code>my-app-xyz.vercel.app</code>). The production alias is then
          atomically swapped to point at that deployment. There is no rolling shift; the old deployment
          keeps running its in-flight functions until they finish, and new traffic goes straight to the
          new deployment.
        </p>

        <CodeBlock language="text" caption="Vercel, observed deploy timeline (same app)">{`t = 0:00    push to main
t = 0:05    build starts on Vercel build container
t = 0:48    build complete
t = 0:55    new deployment marked Ready
t = 1:00    production alias swap, atomic, < 1 s
t = 1:00    new traffic 100% on new deployment
t = 1:00 -> ~15s  in-flight functions on old deployment continue
            until they finish or the 15s default timeout`}</CodeBlock>

        <p>
          Strengths: the swap itself is instant, builds are fast, and every preview deployment is a
          real, queryable URL. Rollback is one click and equally instant.
        </p>

        <p>
          Weaknesses: anything stateful across the swap is your problem. Long-running HTTP responses
          (file downloads, streaming AI responses) can be cut at the function timeout. WebSocket support
          on Vercel relies on the edge runtime and is not a primary use case, long-lived sockets on
          serverless are inherently fragile. If you need persistent connections, Vercel is the wrong
          shape.
        </p>

        <h2>Deploy 3, Render</h2>

        <p>
          Render sits in between. It runs your service as a long-lived process (like App Platform), not
          as a function pool (like Vercel), but the deploy mechanic is simpler than DO&apos;s rolling
          shift. With <em>Zero-downtime deploys</em> enabled on a paid plan, Render starts the new
          instance, waits for it to pass its health check, then routes 100% of traffic over and SIGTERMs
          the old instance.
        </p>

        <CodeBlock language="text" caption="Render, observed deploy timeline">{`t = 0:00    push to main
t = 0:06    build starts
t = 2:30    build complete, container starts
t = 2:55    health check passes (default: HTTP 200 on /)
t = 2:55    100% traffic switched to new instance
t = 2:55    old instance starts ~30s SIGTERM drain
t = 3:25    old instance terminated`}</CodeBlock>

        <p>
          The 30-second drain is the part you usually need to tune. For most CRUD APIs it is fine; for
          anything that holds a connection open it is short. Increase it via the{" "}
          <code>RENDER_DRAIN_SECONDS</code> environment variable if your workload needs it.
        </p>

        <p>
          The health-check on Render defaults to TCP, not HTTP. If you want behaviour comparable to App
          Platform&apos;s
          <code> /healthz</code> probe, set the <em>Health Check Path</em> in the dashboard explicitly.
          We have audited several Render deployments where the team thought they had a real health check
          and actually had a TCP probe that passed long before the app was ready.
        </p>

        <h2>Deploy 4, Fly.io</h2>

        <p>
          Fly does not assume a strategy. You pick one from <code>fly.toml</code> and the platform will
          execute it. The two we use most: <em>rolling</em> (default, similar to DO) and{" "}
          <em>bluegreen</em> (full parallel fleet, then swap). Bluegreen is the one to use for serious
          traffic shifts.
        </p>

        <CodeBlock language="toml" caption="fly.toml, bluegreen deploy with health checks">{`app = "api-prod"
primary_region = "lhr"

[deploy]
  strategy = "bluegreen"
  release_command = "node scripts/migrate.js"

[http_service]
  internal_port = 8080
  force_https = true
  auto_stop_machines = false
  min_machines_running = 2
  processes = ["app"]

[[http_service.checks]]
  grace_period = "20s"
  interval = "10s"
  method = "GET"
  timeout = "5s"
  path = "/healthz"

[[vm]]
  cpu_kind = "shared"
  cpus = 2
  memory_mb = 1024`}</CodeBlock>

        <CodeBlock language="text" caption="Fly bluegreen, observed deploy timeline">{`t = 0:00    fly deploy (or push if CI)
t = 0:20    image build complete (locally or in fly builder)
t = 0:35    release_command runs migrations, exits 0
t = 0:40    full set of "green" machines started in parallel
t = 1:05    green machines pass health checks
t = 1:05    proxy switches traffic from blue -> green
t = 1:05    blue machines start draining (kill_timeout)
t = 1:35    blue machines terminated`}</CodeBlock>

        <p>
          Fly gives you the most knobs but expects you to use them. The default <code>kill_timeout</code>{" "}
          is 5 seconds, which is too short for most production workloads. Bump it to 60 or 120
          explicitly. WebSocket handling is the cleanest of the four platforms because each app is a real
          persistent process on a real VM, the proxy will respect existing connections during the swap
          window.
        </p>

        <h2>One real migration, Vercel to App Platform</h2>

        <p>
          The cleanest before/after we have is a Next.js + Postgres app we moved off Vercel onto App
          Platform last quarter. The reason was not performance, Vercel is faster, it was bill
          predictability. The app had a Stripe webhook handler that occasionally triggered a 90-second
          batch reconciliation, and the Vercel function-runtime cost was creeping up.
        </p>

        <p>The work, week by week:</p>

        <ul>
          <li>
            <strong>Week 1, runtime audit.</strong> List every code path that assumes serverless:
            per-request DB connections (fine, but pool them now), file uploads to <code>/tmp</code>{" "}
            (rewrite to stream to object storage), ISR caches (replace with real Redis or KV cache). Six
            edits across the codebase.
          </li>
          <li>
            <strong>Week 2, Dockerfile + health endpoint.</strong> Wrote a minimal Next.js standalone
            Dockerfile, exposed <code>/api/healthz</code> that returns <code>{`{ ok: true }`}</code>{" "}
            after the DB pool warms.
          </li>
          <li>
            <strong>Week 3, staging on App Platform.</strong> Connected the repo, deployed to a staging
            app spec, ran the same load test we ran on Vercel. Cold start: 8s on App Platform vs 700ms on
            Vercel functions, expected, mitigated by keeping <code>min_instance_count: 2</code>.
          </li>
          <li>
            <strong>Week 4, cutover.</strong> Pointed the{" "}
            <Link href="/services/cloudflare-edge-engineering/">Cloudflare-managed apex record</Link> at
            App Platform via an ALIAS, kept Vercel running for 48 hours behind a feature flag for instant
            fallback. No 5xx during the shift.
          </li>
        </ul>

        <p>
          Bill comparison after the first full month: Vercel was $312/mo (Pro plus function execution),
          App Platform was $73/mo (2 x Professional XS instances + DB) for the same traffic shape. The
          latency at p95 went from 145ms to 195ms, real but acceptable for an internal-facing API.
        </p>

        <p>
          The pattern that sets up this migration cleanly is the same engineering hygiene that helps a
          SaaS get through a Series A audit, see our companion{" "}
          <Link href="/blog/series-a-codebase-audit-2026/">Series A codebase audit</Link> study for the
          broader picture, and the{" "}
          <Link href="/blog/multi-tenant-architecture-cost-study-2026/">multi-tenant cost study</Link>{" "}
          for what to budget per-tenant once you are on the new platform. We run end-to-end PaaS
          migrations like this through our{" "}
          <Link href="/services/tech-stack-migration/">tech-stack migration engagement</Link>, usually
          3-5 weeks for a Next.js or Node app, including the staging soak and the 48-hour fallback
          window.
        </p>

        <h2>Choosing between the four, in 60 seconds</h2>

        <ul>
          <li>
            <strong>
              You are mostly serving HTTP responses under 10s, with edge or static caching desirable.
            </strong>{" "}
            Vercel. The function model lines up with the workload, the build is fast, the rollback is
            instant.
          </li>
          <li>
            <strong>
              You run a long-process API or{" "}
              <Link href="/services/laravel-development/">Laravel</Link> / Rails monolith and want
              predictable infrastructure cost.
            </strong>{" "}
            DigitalOcean App Platform. Boring is the feature; the rolling shift is well-behaved; the bill
            at $73/mo for two instances is a fifth of equivalent Vercel.
          </li>
          <li>
            <strong>You want the App Platform shape but at a lower price floor.</strong> Render. The free
            / starter tiers are more forgiving than DO&apos;s; the trade-off is fewer instance types and
            a less-detailed deploy log.
          </li>
          <li>
            <strong>
              You need regional placement, per-machine control, or stable WebSocket / SSE workloads.
            </strong>{" "}
            Fly. The deeper the workload, the more Fly&apos;s knobs become an advantage instead of a tax.
          </li>
        </ul>

        <h2>Reference: production-ready configs</h2>

        <p>The four configs we ship by default, in roughly the same shape:</p>

        <CodeBlock language="dockerfile" caption="Dockerfile, Node app, multi-stage, used on DO / Render / Fly">{`FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json ./package.json
EXPOSE 8080
USER node
# Catch SIGTERM in app code; default tini behaviour is fine for Node.
CMD ["node", "dist/server.js"]`}</CodeBlock>

        <p>
          Captures SIGTERM, stops accepting new connections, drains in-flight, then exits. Tuned for the
          120s App Platform grace and Fly kill_timeout.
        </p>

        <CodeBlock language="javascript" caption="src/server.js, graceful shutdown that works on all four">{`import http from "http";
import app from "./app.js";

const PORT = process.env.PORT || 8080;
const server = http.createServer(app);
server.listen(PORT, () => console.log("listening on", PORT));

const SHUTDOWN_TIMEOUT_MS = 60_000;

function shutdown(signal) {
  console.log("received", signal, ", draining");
  server.close((err) => {
    if (err) {
      console.error("server close error", err);
      process.exit(1);
    }
    console.log("drain complete");
    process.exit(0);
  });

  // Hard cutoff in case clients hold connections open past
  // platform timeout. Pick a value < your platform's SIGKILL window.
  setTimeout(() => {
    console.warn("forcing shutdown after", SHUTDOWN_TIMEOUT_MS, "ms");
    process.exit(0);
  }, SHUTDOWN_TIMEOUT_MS).unref();
}

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));`}</CodeBlock>

        <p>
          The same graceful-shutdown shape runs unmodified on App Platform, Render and Fly. Vercel
          handles this for you at the function boundary, you do not write
          <code> server.close</code>, the platform does. The shape above is the one we paste into every
          new service shipped through our{" "}
          <Link href="/services/saas-web-app-development/">SaaS web-app development</Link> engagement, and
          the one our <Link href="/services/maintenance-support/">maintenance retainer</Link> owns
          post-launch alongside the deploy pipeline.
        </p>

        <p>Three companion studies that line up with the migrations behind this post:</p>

        <p>Engagements that map directly to this work. The migration engagement that runs this exact change, the SaaS web-app build that ships with these configs from day one, and the post-launch retainer that owns the deploy pipeline:</p>

        <RelatedGrid>
          <RelatedCard
            tag="Research"
            title="Series A Code Audit: Inside 23 Funded SaaS Codebases"
            body="Patterns from 23 SaaS codebase audits, opening with one anonymised takeover."
            href="/blog/series-a-codebase-audit-2026/"
          />
          <RelatedCard
            tag="Research"
            title="The Multi-Tenant SaaS Architecture Decision: Cost & Engineering Hours Across 4 Patterns"
            body="Per-pattern cost, isolation, and onboarding eng-hours for the four multi-tenancy approaches."
            href="/blog/multi-tenant-architecture-cost-study-2026/"
          />
          <RelatedCard
            tag="Research"
            title="Lovable / Bolt to Production: The Real Cost & Timeline (20 Engagements, 1 Anatomy)"
            body="One AI-prototype-to-production engagement teardown, then cost and timeline across 20 projects."
            href="/blog/lovable-to-production-cost-2026/"
          />
          <RelatedCard
            tag="Service"
            title="Tech Stack Migration"
            body="Modernise legacy systems with zero-downtime migrations."
            href="/services/tech-stack-migration/"
          />
          <RelatedCard
            tag="Service"
            title="SaaS Web App Development"
            body="MVP to production builds, multi-tenant, billing, AI features."
            href="/services/saas-web-app-development/"
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
          Ritesh leads engineering at Appycodes. The 11 migrations behind this post include three
          Next.js apps off Vercel to App Platform, two Node APIs onto Fly bluegreen, and a Laravel
          monolith that has lived on Render since 2022. The graceful-shutdown shape in the reference
          section is the one we paste into every new service we ship.
        </AuthorByline>
      </PostBody>

      <CtaBand />
    </>
  );
}
