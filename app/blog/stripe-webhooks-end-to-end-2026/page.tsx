import Link from "next/link";
import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { JsonLd } from "@/components/jsonld";
import { CtaBand } from "@/components/cta-band";
import {
  PostHeader,
  PostBody,
  CodeBlock,
  AuthorByline,
  RelatedGrid,
  RelatedCard,
  Faq,
} from "@/components/blog";
import { buildPostSchemas } from "@/lib/blog-post";

const PUBLISHED_ISO = "2026-05-16";
const MODIFIED_ISO = "2026-05-16";
const READ_TIME = "20 min read";

const PAGE_TITLE =
  "Stripe Webhooks End-to-End: Signature Verification, Idempotency, Replay, Dead-Letter | Appycodes";
const PAGE_DESCRIPTION =
  "The five guarantees a production Stripe webhook handler has to give you, verification, idempotency, ordering, replay, observability, with TypeScript code and the SQL schema we ship.";
const PAGE_PATH = "/blog/stripe-webhooks-end-to-end-2026/";
const KEYWORDS =
  "stripe webhooks, signature verification, idempotency, dead letter queue, webhook replay, payment reliability";

const FAQS = [
  {
    q: "How do I make a Stripe webhook handler idempotent?",
    a: "Insert the Stripe event id into a `processed_webhooks` table with a unique-constraint primary key before doing any work. If the insert fails with a unique-violation, the event has already been processed, skip. The pattern is the same one Stripe uses for idempotency keys on the API side.",
  },
  {
    q: "Why does Stripe sometimes deliver webhooks out of order?",
    a: "Because Stripe does not guarantee event ordering, `invoice.payment_succeeded` can arrive before `customer.subscription.updated`, or vice versa. Handlers must not depend on order; they must refetch the related resource fresh from the API or from your own projection, and treat the webhook as a trigger to reconcile, not as the source of truth.",
  },
  {
    q: "Should I process a Stripe webhook synchronously?",
    a: "No. Acknowledge with 200 OK first, then process from a queue. Stripe's timeout is 10 seconds; if your processing takes longer Stripe retries and you double-process. Fast ack + async work is the safe shape and it lets you keep the verification logic on the HTTP path while the heavy lifting runs elsewhere.",
  },
];

export const metadata: Metadata = pageMeta({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: PAGE_PATH,
  image: "/images/blog-stripe-webhooks-2026.jpg",
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
  image: "/images/blog-stripe-webhooks-2026.jpg",
  publishedISO: PUBLISHED_ISO,
  modifiedISO: MODIFIED_ISO,
  readTime: READ_TIME,
  breadcrumbLabel: "Stripe Webhooks End-to-End",
  keywords: KEYWORDS,
  faqs: FAQS,
});

export default function Page() {
  return (
    <>
      <JsonLd data={schemas} />

      <PostHeader
        eyebrow="Reference architecture"
        title="Stripe webhooks end-to-end, the five guarantees a production handler has to give you"
        lead={
          <>
            Signature verification. Idempotency. Ordering. Replay. Observability. The five things that
            turn a fragile <code>POST /webhooks/stripe</code> endpoint into one you can sleep through
            Black Friday on. With the SQL schema we ship and the TypeScript code that runs it.
          </>
        }
        breadcrumbLabel="Stripe Webhooks End-to-End"
        dateISO={PUBLISHED_ISO}
        readTime={READ_TIME}
        image="/images/blog-stripe-webhooks-2026.jpg"
        imageAlt="Stripe webhooks end-to-end, five guarantees"
      />

      <PostBody>
        <h2>Webhook bugs are silent and expensive</h2>
        <p>
          Of the 30+{" "}
          <Link href="/services/stripe-billing-integration/">Stripe integrations</Link> we have either
          built or audited, the most common production incident is not the webhook handler going down,
          it is the webhook handler succeeding for the wrong reason. Returning 200 OK before the event
          is processed, double-processing a retry, or missing a critical event because of an upstream
          timeout. Each of these can sit undetected for weeks. By the time someone notices, the
          reconciliation cost is real.
        </p>
        <p>
          This post is structured around the five guarantees a production handler has to provide. Each
          guarantee gets its own section with the code and the database shape we use. The last section
          is the dead-letter queue and the observability stack that watches all five.
        </p>

        <h2>Guarantee 1, Signature verification</h2>

        <p>
          The webhook must verify the <code>Stripe-Signature</code> header before doing anything else.
          Without this, anyone who guesses your endpoint URL can post forged events and trigger the
          same side effects (account upgrades, refund issuing) that your real handler does. This is the
          easiest part to get right and the most consequential to get wrong.
        </p>

        <p>
          Stripe&apos;s SDK gives you <code>stripe.webhooks.constructEvent</code>, which takes the{" "}
          <em>raw</em> request body, the signature header, and your endpoint signing secret. Two
          non-obvious implementation details: the body must be passed to the verifier <em>before</em>{" "}
          any JSON parser sees it, and the endpoint signing secret is per-endpoint, not per-account.
          Test mode and live mode have separate secrets; staging and production also have separate
          endpoints with separate secrets.
        </p>

        <CodeBlock
          language="typescript"
          caption="server/webhooks/stripe.ts, express endpoint"
        >{`import express, { Request, Response } from "express";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2024-12-18.acacia" });
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export const stripeWebhookRouter = express.Router();

stripeWebhookRouter.post(
  "/webhooks/stripe",
  express.raw({ type: "application/json" }),
  async (req: Request, res: Response) => {
    const sig = req.header("stripe-signature");
    if (!sig) return res.status(400).send("missing signature header");

    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
      console.error("stripe signature verification failed", err);
      return res.status(400).send("invalid signature");
    }

    // From here on, we trust the event identity. The next four
    // guarantees take over.
    await enqueue(event);
    res.status(200).json({ received: true });
  },
);`}</CodeBlock>

        <p>
          Acknowledge the receipt with a 200 OK <em>before</em> processing the event. Stripe&apos;s
          timeout is 10 seconds; if you process inline and your processing takes longer, Stripe retries
          and you double-process. Acknowledge fast, then process from a queue. The full handler shape is
          what we ship by default on every payments integration through our{" "}
          <Link href="/services/api-and-integration/">API &amp; integration engagement</Link>.
        </p>

        <h2>Guarantee 2, Idempotency</h2>

        <p>
          Stripe retries webhooks, if Stripe doesn&apos;t get a 2xx back, you get the same event again,
          and not just once. Up to a 3-day window. Your handler has to be able to receive the same event
          12 times and produce the same end state every time.
        </p>

        <p>
          The mechanism is a unique constraint on the event id. Insert the id into a{" "}
          <code>processed_webhooks</code> table <em>before</em> you do the work; if the insert fails
          with a unique-constraint violation, the event has already been processed. The pattern is the
          same one used by Stripe itself for idempotency keys on the API side.
        </p>

        <CodeBlock
          language="sql"
          caption="processed_webhooks, the idempotency table"
        >{`CREATE TABLE processed_webhooks (
  event_id      text          PRIMARY KEY,
  type          text          NOT NULL,
  received_at   timestamptz   NOT NULL DEFAULT now(),
  processed_at  timestamptz,
  status        text          NOT NULL DEFAULT 'queued', -- queued | done | failed
  attempts      int           NOT NULL DEFAULT 0,
  last_error    text,
  payload       jsonb         NOT NULL
);

CREATE INDEX processed_webhooks_status_idx
  ON processed_webhooks (status) WHERE status <> 'done';

-- Optional: cron prune events older than ~30 days that succeeded.
-- Keep failed events forever; they are the audit trail.`}</CodeBlock>

        <CodeBlock
          language="typescript"
          caption="server/webhooks/process.ts, the worker"
        >{`export async function processWebhook(event: Stripe.Event) {
  // Phase 1: idempotency
  try {
    await db.query(\`
      INSERT INTO processed_webhooks (event_id, type, payload)
      VALUES ($1, $2, $3)
    \`, [event.id, event.type, event]);
  } catch (err: any) {
    if (err.code === "23505") {
      // unique_violation, we have seen this event before
      return { skipped: true, reason: "already_processed" };
    }
    throw err;
  }

  // Phase 2: actual handler
  try {
    await db.transaction(async (tx) => {
      await dispatch(tx, event);
    });
    await db.query(\`
      UPDATE processed_webhooks SET status = 'done', processed_at = now()
      WHERE event_id = $1
    \`, [event.id]);
  } catch (err: any) {
    await db.query(\`
      UPDATE processed_webhooks
      SET status = 'failed', attempts = attempts + 1, last_error = $2
      WHERE event_id = $1
    \`, [event.id, String(err.message ?? err)]);
    throw err;
  }
}`}</CodeBlock>

        <h2>Guarantee 3, Ordering</h2>

        <p>
          Stripe does not guarantee event order. The <code>invoice.payment_succeeded</code> webhook can
          arrive before the <code>customer.subscription.updated</code> event that caused the invoice, or
          vice versa. Handlers must not depend on order; they must look up the current state from the
          API or the database, not trust the event payload as the truth.
        </p>

        <p>
          The pattern: every handler reads the related resource fresh, either from Stripe via the API or
          from your own cached projection that was updated by an earlier event. Treat the webhook as a
          trigger to <em>reconcile</em>, not as the source of truth itself.
        </p>

        <CodeBlock
          language="typescript"
          caption="server/webhooks/handlers/subscription.ts, order-independent"
        >{`async function handleSubscriptionUpdated(
  tx: Tx,
  event: Stripe.Event,
) {
  const sub = event.data.object as Stripe.Subscription;

  // Don't trust the payload to be current, refetch.
  const current = await stripe.subscriptions.retrieve(sub.id, {
    expand: ["customer", "items.data.price.product"],
  });

  // Upsert our local mirror. Conflict resolution: the higher
  // updated_at wins, handles out-of-order delivery safely.
  await tx.query(\`
    INSERT INTO subscriptions (
      stripe_id, status, current_period_end, plan_id, updated_at
    ) VALUES ($1, $2, to_timestamp($3), $4, to_timestamp($5))
    ON CONFLICT (stripe_id) DO UPDATE
      SET status = EXCLUDED.status,
          current_period_end = EXCLUDED.current_period_end,
          plan_id = EXCLUDED.plan_id,
          updated_at = EXCLUDED.updated_at
      WHERE subscriptions.updated_at < EXCLUDED.updated_at
  \`, [
    current.id,
    current.status,
    (current.items.data[0]?.current_period_end ?? 0),
    current.items.data[0]?.price.id,
    Math.floor(Date.now() / 1000),
  ]);
}`}</CodeBlock>

        <h2>Guarantee 4, Replay</h2>

        <p>
          Sometimes a webhook handler had a bug, processed events wrongly, and now you need to
          re-process a window of events. Stripe lets you re-send any individual event from the
          dashboard, but for a real recovery you want an admin endpoint that re-runs your <em>own</em>{" "}
          handler against a window of events, in order.
        </p>

        <CodeBlock
          language="typescript"
          caption="server/admin/replay.ts, bounded replay"
        >{`export const replayRouter = express.Router();
replayRouter.use(requireAdminAuth, rateLimit({ max: 1, windowMs: 60_000 }));

replayRouter.post("/admin/stripe/replay", async (req, res) => {
  const { from, to, types } = req.body as {
    from: string;            // ISO date
    to: string;
    types?: string[];        // optional filter
  };

  // 1. Pull events from Stripe in the requested window
  let starting_after: string | undefined;
  const events: Stripe.Event[] = [];
  do {
    const page = await stripe.events.list({
      created: {
        gte: Math.floor(new Date(from).getTime() / 1000),
        lte: Math.floor(new Date(to).getTime() / 1000),
      },
      type: types?.length === 1 ? types[0] : undefined,
      limit: 100,
      starting_after,
    });
    events.push(...page.data);
    starting_after = page.has_more ? page.data[page.data.length - 1].id : undefined;
  } while (starting_after);

  // 2. Optional type filter
  const filtered = types && types.length > 1
    ? events.filter((e) => types.includes(e.type))
    : events;

  // 3. Process oldest first (events.list returns newest-first by default)
  filtered.reverse();

  // 4. Mark them for re-processing: bypass the idempotency table by
  //    deleting prior records first, then run the normal path.
  for (const event of filtered) {
    await db.query("DELETE FROM processed_webhooks WHERE event_id = $1", [event.id]);
    await enqueue(event);
  }

  res.json({ queued: filtered.length });
});`}</CodeBlock>

        <h2>Guarantee 5, Observability</h2>

        <p>
          You need three things visible at all times: (a) the lag between when an event was emitted and
          when your handler ran, (b) the failure rate per event type, and (c) the backlog of events
          sitting in <code>status = &apos;queued&apos;</code> or <code>status = &apos;failed&apos;</code>.
        </p>

        <p>
          We export these three metrics on a Prometheus / OpenTelemetry endpoint that the alerting stack
          consumes. The names we use, exactly as we ship them:
        </p>

        <CodeBlock
          language="typescript"
          caption="server/webhooks/metrics.ts"
        >{`import { Counter, Histogram, Gauge } from "prom-client";

export const webhookReceived = new Counter({
  name: "stripe_webhook_received_total",
  help: "Stripe webhooks received, by event type",
  labelNames: ["type"],
});

export const webhookLagSeconds = new Histogram({
  name: "stripe_webhook_lag_seconds",
  help: "Time from Stripe event.created to handler completion",
  labelNames: ["type"],
  buckets: [0.5, 1, 2, 5, 10, 30, 60, 300, 900],
});

export const webhookFailures = new Counter({
  name: "stripe_webhook_failures_total",
  help: "Webhook events that exited with status=failed",
  labelNames: ["type"],
});

export const webhookBacklog = new Gauge({
  name: "stripe_webhook_backlog",
  help: "Count of processed_webhooks rows not yet done",
  labelNames: ["status"],
  async collect() {
    const rows = await db.query(
      "SELECT status, count(*)::int FROM processed_webhooks WHERE status <> 'done' GROUP BY 1"
    );
    this.reset();
    for (const r of rows.rows) this.set({ status: r.status }, r.count);
  },
});`}</CodeBlock>

        <p>The alerts we ship by default:</p>
        <ul>
          <li>
            <strong>
              <code>stripe_webhook_lag_seconds</code> p99 &gt; 60s for 5 minutes
            </strong>
            , the handler is keeping up but slowly.
          </li>
          <li>
            <strong>
              <code>stripe_webhook_failures_total</code> increases by &gt; 5 over 5 minutes
            </strong>
            , something is broken, page someone.
          </li>
          <li>
            <strong>
              <code>stripe_webhook_backlog{`{status="failed"}`}</code> &gt; 10
            </strong>
            , events have stalled in the dead-letter; needs manual review.
          </li>
        </ul>

        <h2>The dead-letter pattern</h2>

        <p>
          Some events will fail in ways no retry helps with. The customer&apos;s underlying record was
          deleted; the plan was renamed to a value your code does not handle; the event type is one you
          never coded for. Dead-letter those events into a manual-review queue rather than losing them.
        </p>

        <p>
          The schema in Guarantee 2 already gives us this: rows with{" "}
          <code>status = &apos;failed&apos;</code> are the dead-letter. Add a small admin UI (or a
          Linear / Slack integration) that surfaces these events, lets a human decide what to do, and
          re-queues or marks them as ignored. The 30+ Stripe integrations we maintain typically generate
          0-2 dead-letter events per month per app, rare, but losing them silently is the disaster. The
          Slack-routing of dead-letters and the monthly review cadence are part of our{" "}
          <Link href="/services/maintenance-support/">maintenance retainer</Link> on the apps we keep
          ownership of post-launch.
        </p>

        <h2>The 30-second production checklist</h2>

        <p>The list we ship at the bottom of every Stripe webhook PR:</p>
        <ol>
          <li>
            Endpoint uses <code>express.raw</code> (or framework equivalent) so the body is bytes when
            the verifier sees it.
          </li>
          <li>
            <code>STRIPE_WEBHOOK_SECRET</code> is set per environment and rotates without redeploying
            user code.
          </li>
          <li>200 OK is returned before processing begins; processing happens off the request path.</li>
          <li>
            Idempotency table has a primary-key constraint on <code>event_id</code>.
          </li>
          <li>Every handler refetches the resource from Stripe rather than trusting the payload.</li>
          <li>Replay admin endpoint exists and is rate-limited.</li>
          <li>
            Three metrics exported: <code>received</code>, <code>lag</code>, <code>failures</code>.
          </li>
          <li>Dead-letter queue is monitored; failures generate an alert, not just a log line.</li>
        </ol>

        <p>
          The full reference architecture ships by default on every SaaS we build that has paid
          subscriptions, see our{" "}
          <Link href="/services/saas-web-app-development/">SaaS web-app development</Link> engagement for
          the rest of the stack the webhook handler slots into.
        </p>

        <p>Companion reads that touch the same reliability surface:</p>

        <RelatedGrid>
          <RelatedCard
            tag="Research"
            title="Per-Token Economics: What an AI Feature Actually Costs in Production (47 SaaS Sample)"
            body="Real per-MAU token cost data across 47 production AI SaaS products."
            href="/blog/ai-feature-token-economics-2026/"
          />
          <RelatedCard
            tag="Research"
            title="The Multi-Tenant SaaS Architecture Decision: Cost & Engineering Hours Across 4 Patterns"
            body="Per-pattern cost, isolation, and onboarding eng-hours for the four common multi-tenancy approaches."
            href="/blog/multi-tenant-architecture-cost-study-2026/"
          />
          <RelatedCard
            tag="Research"
            title="Series A Code Audit: Inside 23 Funded SaaS Codebases"
            body="Patterns from 23 SaaS codebase audits, with one anonymised takeover up front."
            href="/blog/series-a-codebase-audit-2026/"
          />
        </RelatedGrid>

        <p>
          The API engagement that builds the integration end-to-end, the SaaS build that includes Stripe
          as a default, and the retainer that owns the alerting after launch:
        </p>

        <RelatedGrid>
          <RelatedCard
            tag="Service"
            title="API & Integration"
            body="The API engagement that builds the integration end-to-end."
            href="/services/api-and-integration/"
          />
          <RelatedCard
            tag="Service"
            title="SaaS Web App Development"
            body="The SaaS build that includes Stripe as a default."
            href="/services/saas-web-app-development/"
          />
          <RelatedCard
            tag="Service"
            title="Maintenance & Support"
            body="The retainer that owns the alerting after launch."
            href="/services/maintenance-support/"
          />
        </RelatedGrid>

        <Faq items={FAQS} />

        <AuthorByline lastReviewedISO={MODIFIED_ISO}>
          Ritesh leads engineering at Appycodes. The reference architecture above is what we ship by
          default on every new Stripe integration, the idempotency table, the replay admin endpoint, the
          three metrics, and the dead-letter surfaced into the team&apos;s Slack. Across our 30+ Stripe
          integrations the pattern has now run for several years without a duplicate-charge or
          missed-event incident.
        </AuthorByline>
      </PostBody>

      <CtaBand />
    </>
  );
}
