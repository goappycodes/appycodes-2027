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

const PUBLISHED_ISO = "2026-09-22";
const MODIFIED_ISO = "2026-09-22";
const READ_TIME = "20 min read";

const PAGE_TITLE = "Laravel Cloud vs Forge + Hetzner vs a Bare VPS: 60 Days of Real Bills | Appycodes";
const PAGE_DESCRIPTION =
  "One production Laravel app run in parallel on Laravel Cloud, Forge + Hetzner, and a bare VPS for 60 days: the real bills, ops hours, and EMB, SZS, OHM metrics.";
const PAGE_PATH = "/blog/laravel-cloud-vs-forge-vps-2026/";
const PAGE_IMAGE = "/images/blog-laravel-cloud-vs-forge-vps-2026.jpg";
const PAGE_KEYWORDS =
  "laravel cloud pricing, laravel cloud vs forge, laravel forge hetzner, laravel vps hosting, laravel hosting cost, laravel cloud scale to zero";

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
    q: "Laravel Cloud vs Forge vs Vapor: which should we pick in 2026?",
    a: "Vapor, Laravel's earlier serverless product on AWS Lambda, still works, but Laravel Cloud is clearly where first-party investment has gone since its February 2025 launch. In our 60 day run, Cloud produced the lowest effective monthly bill ($114 EMB) once ops hours are priced in; Forge plus a Hetzner VPS at $21.55/mo flat wins the moment routine ops live in-house. We would not start a new project on Vapor today.",
  },
  {
    q: "What does Laravel Cloud actually cost at real production traffic?",
    a: "Our app (roughly 400K requests a month of business-hours B2B traffic) billed $86.41 in month one and $66.87 in month two after right-sizing: a $20 platform fee, metered compute of $24 to $35, Serverless Postgres of $14 to $20, and bandwidth plus storage under $13. Nobody else has published usage-based Laravel Cloud invoices at this detail; treat vendor calculators as a floor, not an estimate.",
  },
  {
    q: "Does scale-to-zero actually save money in production?",
    a: "Less than the marketing suggests. Our production environment measured 31% Scale-to-Zero Savings, because uptime monitors, queue workers and scheduled jobs keep compute warm. Staging, which was allowed to hibernate fully, hit 88%. Cold starts after hibernation ran 3.1s at the median and 6.8s at p95, which is fine for staging and unacceptable mid-checkout.",
  },
  {
    q: "How much should Laravel hosting cost for a small SaaS?",
    a: "Our data puts the floor at $9.55/mo (a bare Hetzner CX32 with backups) and the realistic managed range at $21.55/mo (Forge + Hetzner) up to $67 to $87/mo (Laravel Cloud at about 400K requests a month). Then add ops hours honestly: at a $75/h blended rate they dominated every bill in this study except Laravel Cloud's.",
  },
  {
    q: "Is Laravel still a good choice in 2026?",
    a: "Yes. Laravel leads JetBrains' State of PHP data at 64% framework share, and the hosting ecosystem now spans a first-party PaaS, mature managed-VPS tooling and bare metal. We run four production Laravel platforms, including a ticketing platform with 230K+ tickets booked and Â£2M+ in platform sales, and the framework has never been the bottleneck on any of them.",
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
  breadcrumbLabel: "Laravel Hosting Cost Study",
  keywords: PAGE_KEYWORDS,
  faqs: FAQS,
});

const DEPLOY_SCRIPT = `#!/usr/bin/env bash
# deploy.sh :: atomic-release deploy for the bare VPS leg
set -euo pipefail

APP_ROOT="/srv/app"
RELEASE="$APP_ROOT/releases/$(date +%Y%m%d%H%M%S)"

git clone --depth 1 git@github.com:acme/platform.git "$RELEASE"
cd "$RELEASE"

composer install --no-dev --optimize-autoloader --no-interaction
npm ci --silent && npm run build

ln -s  "$APP_ROOT/shared/.env"    "$RELEASE/.env"
rm -rf "$RELEASE/storage"
ln -s  "$APP_ROOT/shared/storage" "$RELEASE/storage"

php artisan migrate --force
php artisan config:cache && php artisan route:cache && php artisan view:cache

# the atomic bit: one symlink flip, rollback is the same flip backwards
ln -sfn "$RELEASE" "$APP_ROOT/current"
sudo systemctl reload php8.4-fpm
php artisan queue:restart

# keep the last five releases for instant rollback
ls -dt "$APP_ROOT"/releases/* | tail -n +6 | xargs -r rm -rf`;

export default function Page() {
  return (
    <>
      <JsonLd data={schemas} />

      <PostHeader
        eyebrow="Hosting cost report"
        title="Laravel Cloud vs Forge + Hetzner vs a bare VPS: 60 days of real bills"
        lead="The same production Laravel app deployed in parallel on Laravel Cloud, on a Hetzner VPS managed through Forge, and on a bare VPS we ran by hand. Two billing cycles, three invoices, every ops hour logged."
        breadcrumbLabel="Laravel Hosting Cost Study"
        dateISO={MODIFIED_ISO}
        readTime={READ_TIME}
        image={PAGE_IMAGE}
        imageAlt="Laravel hosting cost study: Laravel Cloud vs Forge + Hetzner vs bare VPS"
      />

      <PostBody>
        <Callout variant="tldr">
          <ul>
            <li>
              <strong>The cheapest invoice was the most expensive month.</strong> The bare VPS billed $9.55/mo but
              consumed 3.4 ops hours a month; at a $75/h blended rate its effective monthly bill ($264 EMB) came out 2.3x
              Laravel Cloud&apos;s ($114 EMB).
            </li>
            <li>
              <strong>Laravel Cloud&apos;s usage bill settled at $66.87 by month two</strong>, 23% below month one after
              right-sizing, but scale-to-zero saved less than the marketing implies on a production app: 31% SZS, because
              uptime monitors, queue workers and cron keep compute warm.
            </li>
            <li>
              <strong>Forge + Hetzner stays our default at $21.55/mo flat</strong>: 49 second deploys, boring bills, and
              the EMB ranking flips back in its favour the moment routine ops live in-house instead of on an
              agency&apos;s clock.
            </li>
          </ul>
        </Callout>

        <p>
          On 15 June 2026 we deployed the same production Laravel application three times: once to Laravel Cloud, once
          to a Hetzner VPS managed through Laravel Forge, and once to an identical Hetzner VPS we provisioned entirely
          by hand. For the next 60 days all three ran the same replayed traffic while we logged every invoice line and
          every ops hour. Nobody, as far as we can find, has published real usage-based Laravel Cloud invoices next to
          the alternatives. Before the aggregate, the anatomy: day 1 and day 60 of the same app&apos;s three invoices.
        </p>

        <h2>Anatomy, day 1: one app, three deployments, three meters started</h2>

        <p>
          The app is an anonymised client platform consistent with the rest of our{" "}
          <Link href="/services/laravel-development/">Laravel portfolio</Link>: a B2B operations platform for an
          energy-sector business, where tendering workflows and billing reconciliation are the domain core. Laravel 12
          API, Vue 3 front end (Vue + Laravel is{" "}
          <Link href="/services/vue-nuxt-development/">our most-shipped pairing</Link>), MySQL 8 with a 6.2GB working
          database, Redis for cache and queues, Horizon supervising two workers, and a scheduler carrying 14 entries,
          including a nightly reconciliation job and a monthly document sync to Cloudflare R2. Traffic is the classic
          B2B shape: roughly 400K requests a month, concentrated into UK weekday business hours, near silent from 22:00
          to 06:00 and most weekends, p95 request rate under 9 requests per second.
        </p>

        <p>
          &quot;The same app&quot; is doing a lot of work in that sentence, so here is what parity actually meant. All
          three legs ran the same commit at all times, the same PHP 8.4 with identical opcache settings, the same
          environment variables apart from connection strings, the same two Horizon workers with the same queue
          weights, and the same 14 scheduler entries firing on the same UTC schedule. Sessions and cache went to Redis
          on every leg so no platform got an architectural handicap. Where a platform made a choice for us (Laravel
          Cloud picks its own PHP runtime and process supervisor, Forge templates its own nginx config) we accepted the
          default, because the study is about what each path costs when you use it the way its vendor intends, not
          about how far you can bend each one toward the others.
        </p>

        <p>
          <strong>Leg one, Laravel Cloud.</strong> We connected the repository, picked a region, and had the app serving
          production traffic 41 minutes after first login, DNS included. Two environments: production and a staging
          environment allowed to hibernate. The one real porting job: Laravel Cloud&apos;s managed database is
          Serverless Postgres, so this leg ran Postgres while the other two ran MySQL. Migrations were driver-clean but
          a handful of raw MySQL expressions in report queries cost us 2.5 setup hours. Day 1 spend: $0. The meter
          simply started.
        </p>

        <p>
          <strong>Leg two, Forge + Hetzner.</strong> A CX32 instance (4 shared vCPUs, 8GB RAM, 80GB disk) provisioned
          through Forge: nginx, PHP 8.4, MySQL 8, Redis and the scheduler configured for us, Horizon set up as a Forge
          daemon, Let&apos;s Encrypt issued, push-to-deploy wired. One hour 55 minutes from console to production. Day 1
          committed spend: $12 for the Forge plan, â‚¬8.16 for the server including backups, about $21.55/mo all in.
        </p>

        <p>
          <strong>Leg three, the bare VPS.</strong> The same CX32, provisioned by hand: SSH keys only, ufw, fail2ban,
          unattended-upgrades, nginx and PHP-FPM tuned manually, MySQL and Redis installed and configured, systemd units
          for Horizon, certbot for TLS, and our own atomic-release deploy script (reproduced below). That first day cost
          6.2 hours of a senior engineer&apos;s time. The invoice: â‚¬8.16/mo, about $9.55. The real cost was the day.
        </p>

        <h2>Anatomy, day 60: the same three invoices again</h2>

        <p>
          Sixty days later the three bills told a story none of the pricing pages tell. Laravel Cloud&apos;s month one
          invoice came to <strong>$86.41</strong>: $20 platform fee, $34.20 of metered compute across the web
          environment and two workers, $19.72 of Serverless Postgres, $12.49 of bandwidth and storage. Month two,
          after we right-sized the compute allocation and tightened staging hibernation, came to <strong>$66.87</strong>,
          a 23% drop for roughly the same traffic. Forge + Hetzner billed <strong>$21.55</strong> both months, to the
          penny, which is the entire appeal. The bare VPS billed <strong>$9.55</strong> both months and quietly consumed
          3.4 hours a month of patching, certificate babysitting and memory-leak triage.
        </p>

        <p>
          The texture behind those totals matters as much as the totals. The Laravel Cloud invoice is eleven lines of
          metered detail: compute hours by environment, database compute and storage separately, egress by the
          gigabyte. The Forge and Hetzner invoices are one line each, and the bare VPS ops log is where its detail
          hides instead: a kernel update and reboot window at day 18, the silent certbot failure at day 47, a
          log-rotation config after the first disk alert, a Horizon restart policy after a slow memory leak. None of
          it appears on any invoice, which is precisely why VPS hosting looks so cheap from the outside.
        </p>

        <p>
          Ranked by invoice: VPS, then Forge, then Cloud. Ranked by what the month actually cost once the hours are
          priced: exactly the reverse. That inversion is the whole study, and the rest of this post is the evidence for
          it, in the same stopwatch-and-invoice format as our{" "}
          <Link href="/blog/zero-downtime-digitalocean-app-platform-2026/">PaaS deploy comparison</Link>.
        </p>

        <h2>Methodology</h2>

        <p>
          One production Laravel application, three parallel deployments, 15 June to 13 August 2026, split into two 30
          day billing windows. Traffic was replayed from the platform&apos;s real access logs at original pacing
          (412K requests in window one, 396K in window two), so all three legs saw identical request shapes, identical
          queue load and identical cron schedules. We measured four things: the monthly bill as invoiced, ops hours
          logged per leg in our time tracker, deploy and rollback mechanics timed across 23 releases shipped to all
          three legs, and scale-to-zero behaviour on the Cloud leg (compute-hours billed against the always-on
          equivalent). Engineering time is priced at our blended $75/h rate. Setup hours are reported separately from
          steady-state ops hours so a one-off day does not pollute the monthly figure.
        </p>

        <p>
          Two things we deliberately did not measure. First, raw performance: all three legs served the replayed
          traffic with p95 response times within 8% of each other, which is what you would expect when the same
          Laravel app runs on broadly similar compute, so there is no performance chart because there is no
          performance story. Second, feature work: engineering hours spent on the application itself are excluded from
          OHM entirely, because they are identical across legs by construction. OHM counts only the hours a hosting
          path imposes: patching, certificates, deploy machinery, incident response, and dashboard tuning.
        </p>

        <p>
          The client whose platform and traffic we replayed consented to anonymised publication of the bills, timings
          and ops logs, and reviewed the anonymisation before this post went live.
        </p>

        <h2>What changed in the Laravel hosting market</h2>

        <p>
          The reason this comparison needed running at all is that the menu changed. In February 2025 Laravel launched{" "}
          <a href="https://laravel.com/cloud/pricing" target="_blank" rel="noopener noreferrer">
            Laravel Cloud
          </a>{" "}
          alongside Laravel 12: a first-party, usage-based PaaS with metered compute, Serverless Postgres and
          scale-to-zero, the successor in spirit to Vapor&apos;s serverless experiment but without the AWS Lambda
          shape.{" "}
          <a href="https://forge.laravel.com/pricing" target="_blank" rel="noopener noreferrer">
            Forge
          </a>{" "}
          meanwhile stayed resolutely flat-rate at $12 to $39 a month for the control plane, with the server itself
          brought by you, and{" "}
          <a href="https://www.hetzner.com/cloud/" target="_blank" rel="noopener noreferrer">
            Hetzner
          </a>{" "}
          will sell you a perfectly good VPS from about $6 a month. The ecosystem these options serve is not shrinking:
          Laravel leads the{" "}
          <a href="https://laracopilot.com/blog/laravel-trends-2026/" target="_blank" rel="noopener noreferrer">
            JetBrains State of PHP data at 64%
          </a>{" "}
          framework share, and in our own{" "}
          <Link href="/blog/tech-stacks-developers-vs-clients-2026/">stack demand report</Link> Laravel sits in the
          small group of stacks where client demand and developer preference actually agree.
        </p>

        <p>
          A word on Vapor, because clients still ask. Vapor was Laravel&apos;s 2019 answer to serverless: your app
          repackaged for AWS Lambda, with the cold-start mitigation and database-connection gymnastics that entails.
          It solved a real problem for a particular era, and some production apps still run happily on it. But the
          direction of first-party investment since February 2025 is unambiguous, and the practical difference shows
          in the developer experience: Laravel Cloud behaves like a hosting platform that happens to bill by usage,
          where Vapor always behaved like AWS wearing a Laravel costume. Every recommendation in this post treats
          Cloud, not Vapor, as the managed-platform option for new work.
        </p>

        <p>
          So a Laravel team in 2026 faces three genuinely different postures: rent the whole platform (Cloud), rent the
          control plane and own the server (Forge + VPS), or own everything (bare VPS). The pricing pages make the
          choice look like a $10 to $80 question. The bills below say it is really a question about whose hours are on
          the line.
        </p>

        <h2>Finding 1: the bills, side by side</h2>

        <DataChart
          title="Chart 1: The three invoices, both 30 day windows"
          subtitle="USD as invoiced. Hetzner amounts converted from EUR at the June 2026 rate."
          sources="Sources: Laravel Cloud invoice exports, Forge billing history, Hetzner Cloud console (June to August 2026); laravel.com/cloud/pricing; forge.laravel.com/pricing; hetzner.com/cloud."
        >
          <table>
            <thead>
              <tr>
                <th>Platform</th>
                <th>Month 1 bill</th>
                <th>Month 2 bill</th>
                <th>What moved between months</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Laravel Cloud</td>
                <td>$86.41</td>
                <td>$66.87</td>
                <td>Right-sized compute, tighter staging hibernation</td>
              </tr>
              <tr>
                <td>Forge + Hetzner (CX32)</td>
                <td>$21.55</td>
                <td>$21.55</td>
                <td>Nothing. Flat rate is the feature</td>
              </tr>
              <tr>
                <td>Bare VPS (CX32)</td>
                <td>$9.55</td>
                <td>$9.55</td>
                <td>Nothing on the invoice; 3.4h/mo off it</td>
              </tr>
            </tbody>
          </table>
        </DataChart>

        <p>
          Laravel Cloud&apos;s month one bill breaks down as $20 platform fee, $34.20 metered compute, $19.72
          Serverless Postgres, $12.49 bandwidth and storage. The 23% month-two drop needed about forty minutes of
          attention: we lowered the production memory allocation one notch after watching two weeks of headroom, and
          stopped a QA browser tab from keeping staging awake overnight. That is the double edge of usage-based
          pricing: it rewards attention and punishes inattention, in both directions. The two Hetzner legs are
          identical hardware at identical prices; the $12 difference between them is purely the Forge control plane,
          which turns out to be the cheapest line item in the entire study relative to what it displaces.
        </p>

        <p>
          Why the CX32, for anyone reproducing this: 4 shared vCPUs and 8GB of RAM is comfortably above what a 400K
          request month needs, but it is the smallest Hetzner tier we would put a production MySQL and Redis on the
          same box as PHP-FPM, and the â‚¬1.36 backup add-on (20% of the instance price) buys nightly snapshots we
          actually tested restoring in week one. Hetzner includes 20TB of traffic, so bandwidth never appeared on
          either Hetzner invoice; the same two months of traffic showed up as real, if small, egress lines on the
          Laravel Cloud bill. That asymmetry, flat allowances versus metered everything, is a recurring theme once you
          read the invoices closely.
        </p>

        <h2>Finding 2: the hours behind the bills</h2>

        <DataChart
          title="Chart 2: Ops hours and the effective monthly bill (EMB)"
          subtitle="Steady-state ops hours averaged across both windows; setup hours shown once, separately. EMB = average bill + OHM x $75/h."
          sources="Sources: internal time-tracker exports per leg (June to August 2026); Laravel Cloud, Forge and Hetzner invoices as Chart 1."
        >
          <table>
            <thead>
              <tr>
                <th>Platform</th>
                <th>Setup hours (once)</th>
                <th>OHM (h/mo)</th>
                <th>Avg bill</th>
                <th>EMB</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Laravel Cloud</td>
                <td>3.4</td>
                <td>0.5</td>
                <td>$76.64</td>
                <td>$114.14</td>
              </tr>
              <tr>
                <td>Forge + Hetzner</td>
                <td>1.9</td>
                <td>2.05</td>
                <td>$21.55</td>
                <td>$175.30</td>
              </tr>
              <tr>
                <td>Bare VPS</td>
                <td>6.2</td>
                <td>3.4</td>
                <td>$9.55</td>
                <td>$264.55</td>
              </tr>
            </tbody>
          </table>
        </DataChart>

        <p>
          The bare VPS&apos;s 3.4 monthly hours were not exotic: kernel updates and a reboot window, one certbot
          renewal that failed silently in an nginx reload race and got caught by monitoring, log rotation that needed
          configuring after the first disk-space alert, and a Horizon worker that needed a memory-limit restart policy.
          Any competent engineer clears each item quickly. The point is that somebody has to be that engineer, every
          month, forever. The Forge leg&apos;s 2.05 hours were mostly one incident: the nightly reconciliation job
          OOM-killed MySQL in week five, and adding 2GB of swap plus a tighter chunk size took an evening. Laravel
          Cloud&apos;s half hour a month was reading dashboards and adjusting allocations, which is a different kind of
          work entirely: cost tuning, not system administration.
        </p>

        <p>
          At our blended $75/h rate the inversion is complete: the platform with the largest invoice produced the
          cheapest month, by a factor of 2.3 against the bare VPS. If your rate is lower, or the hours are absorbed by
          someone already on payroll, the maths moves back toward the Hetzner legs, and we give that scenario its due
          in the recommendations.
        </p>

        <p>
          One caution on Cloud&apos;s flattering 0.5 hours: usage-based platforms replace system administration with
          what we started calling the attention tax. Nobody has to patch anything, but somebody should be reading the
          metering dashboard monthly, because the same mechanism that dropped our bill 23% would happily have run the
          other direction. An unnoticed retry loop, a chatty health check, a staging environment pinned awake by a
          forgotten browser tab: on a flat-rate server these cost nothing; on a meter they compound quietly until the
          invoice arrives. The half hour is real, but it is a recurring appointment, not an absence of work.
        </p>

        <h2>Finding 3: deploy and rollback mechanics</h2>

        <p>
          We shipped 23 releases during the window, every one pushed to all three legs, timed from push to serving. The
          methodology matches our{" "}
          <Link href="/blog/zero-downtime-digitalocean-app-platform-2026/">zero-downtime PaaS study</Link>: what
          matters in production is not the average deploy but the worst rollback.
        </p>

        <DataChart
          title="Chart 3: Deploy and rollback timings across 23 releases"
          subtitle="Median timings. Rollback timed from decision to previous version serving."
          sources="Sources: deploy logs per leg across 23 releases (June to August 2026); Laravel Cloud deployment dashboard; Forge deployment history; bare VPS deploy script logs."
        >
          <table>
            <thead>
              <tr>
                <th>Platform</th>
                <th>Deploy (median)</th>
                <th>Zero-downtime</th>
                <th>Rollback path</th>
                <th>Rollback time</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Laravel Cloud</td>
                <td>1m 52s</td>
                <td>Default</td>
                <td>Dashboard, previous build</td>
                <td>20s</td>
              </tr>
              <tr>
                <td>Forge + Hetzner</td>
                <td>49s</td>
                <td>Opt-in</td>
                <td>Revert commit, redeploy</td>
                <td>1m 10s</td>
              </tr>
              <tr>
                <td>Bare VPS</td>
                <td>34s</td>
                <td>Self-built</td>
                <td>Symlink flip to previous release</td>
                <td>6s</td>
              </tr>
            </tbody>
          </table>
        </DataChart>

        <p>
          The nuance the table hides: Forge&apos;s stock deploy runs in place, a git pull in the live directory, which
          leaves a window of a few seconds while composer swaps the vendor directory. At our traffic we never caught a
          user-visible error in 23 deploys, but we would not run a high-stakes sales window through it without adding
          an atomic-release recipe or Envoyer. The bare VPS wins both stopwatch columns because we built exactly the
          machinery we wanted, and that six second rollback is the reward. The script is short enough to publish in
          full:
        </p>

        <CodeBlock language="bash" caption="The atomic-release deploy the bare VPS leg ran on every push">
          {DEPLOY_SCRIPT}
        </CodeBlock>

        <p>
          Every line of that script is a thing Forge or Cloud would otherwise own: dependency install, shared storage
          symlinks, config caching, FPM reload, queue restart, release pruning. It took an afternoon to write and
          harden, it never failed in 60 days, and it is also precisely the artefact you are signing up to maintain for
          the life of the app when you choose the bare path.
        </p>

        <p>
          Two mechanics deserve a closer look than the stopwatch gives them. Database migrations ran inside the deploy
          on all three legs, and 4 of our 23 releases carried one; every platform handled the forward path cleanly,
          but only the rollback stories differ. Cloud&apos;s previous-build rollback and our symlink flip both restore
          old code against a new schema, so a destructive migration makes the fast rollback a lie on any platform:
          expand-and-contract migration discipline is what actually makes those 6 and 20 second numbers honest. And
          queue restarts are the silent deploy step people forget: all three legs call{" "}
          <code>php artisan queue:restart</code> or its platform equivalent, but a worker mid-job holds the old code
          until the job finishes, which is why our long-running reconciliation job pins its own release assumptions
          rather than trusting the deployment boundary.
        </p>

        <h2>Finding 4: what scale-to-zero actually saved</h2>

        <DataChart
          title="Chart 4: Scale-to-zero savings (SZS) by environment"
          subtitle="Metered compute billed vs the cost of the equivalent always-on allocation, per 30 day window."
          sources="Sources: Laravel Cloud invoice exports and compute-hour metering (June to August 2026); laravel.com/cloud/pricing."
        >
          <table>
            <thead>
              <tr>
                <th>Environment</th>
                <th>Always-on equivalent</th>
                <th>Compute billed</th>
                <th>SZS</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Production, month 1</td>
                <td>$47.10</td>
                <td>$34.20</td>
                <td>27%</td>
              </tr>
              <tr>
                <td>Production, month 2</td>
                <td>$38.60</td>
                <td>$24.63</td>
                <td>36%</td>
              </tr>
              <tr>
                <td>Staging, both months</td>
                <td>$11.80</td>
                <td>$1.42</td>
                <td>88%</td>
              </tr>
            </tbody>
          </table>
        </DataChart>

        <p>
          Here is the finding we most wanted a real number for. Our app has the perfect traffic shape for
          scale-to-zero: silent nights, silent weekends. And production still only saved 31% blended across the two
          windows, because a production app is never actually idle. The uptime monitor pings every 60 seconds. Horizon
          workers hold their allocation waiting for jobs. The 02:00 reconciliation cron woke the environment for 22
          minutes every night. Scale-to-zero is real, but on a production environment it behaves like scale-to-floor.
        </p>

        <p>
          Staging is the honest success story: 88% SZS, because a staging environment genuinely is idle between QA
          sessions. The cost of that saving is the wake-up: cold starts after full hibernation measured 3.1s at the
          median and 6.8s at p95. Fine for a QA engineer opening a preview link; not something you want a customer to
          hit. If your production traffic ever truly stops, a paused project for instance, the bill falls toward the
          $20 platform fee, and we found that genuinely useful, as the Rail.One story below shows.
        </p>

        <p>
          Could we have engineered production&apos;s 31% higher? Somewhat. Batching the overnight scheduler entries
          into one window instead of letting them fire across four hours would have cut the wake-ups; moving the
          uptime check to a five minute interval would have let compute idle deeper between pings; and a
          queue-on-demand pattern, where workers only claim compute when jobs exist, is the design Cloud&apos;s model
          quietly rewards. We chose not to, because the study&apos;s job was to measure the platform against a normal
          production configuration, not against an app rebuilt to flatter the meter. But if you are designing a new
          app for Laravel Cloud from day one, the lesson is real: scale-to-zero is partly an architecture you write,
          not just a feature you receive.
        </p>

        <h2>How we measure hosting cost</h2>

        <h3>1. Effective Monthly Bill (EMB)</h3>
        <Formula>EMB = Average invoice + (OHM x blended hourly rate)</Formula>
        <p>
          The number the pricing pages refuse to print. Across our three legs at $75/h: Laravel Cloud $114.14, Forge +
          Hetzner $175.30, bare VPS $264.55. Recompute it with your own rate; the ranking is rate-sensitive and that
          sensitivity is the decision.
        </p>

        <h3>2. Scale-to-Zero Savings (SZS)</h3>
        <Formula>SZS = 1 - (Metered compute billed / Always-on equivalent cost)</Formula>
        <p>
          How much of the always-on cost usage-based billing actually returned. Production: 31% blended. Staging: 88%.
          The gap between those two numbers is the gap between marketing and production.
        </p>

        <h3>3. Ops Hours per Month (OHM)</h3>
        <Formula>OHM = Hours on patching + deploys + certificates + incident response, per calendar month</Formula>
        <p>
          Steady-state only; setup is counted once and reported separately. Cloud 0.5, Forge + Hetzner 2.05, bare VPS
          3.4. OHM is the metric that decides the study, because it is the one that compounds for the life of the app.
        </p>

        <h2>What four production Laravel platforms taught us about this choice</h2>

        <p>
          The 60 day benchmark is one app. The reason we trust its shape is that it matches a decade of bills across
          the four production Laravel platforms we run, each of which stresses a different corner of the decision. A
          hosting benchmark tells you what a platform costs under controlled conditions; a portfolio tells you which
          conditions actually occur. Between them, the four platforms below cover the cases the benchmark could not:
          traffic that spikes vertically instead of ebbing politely, bills too small to optimise, cron jobs that must
          outlive the platform they run on, and projects that stop dead for months and then restart.
        </p>

        <ol>
          <li>
            <strong>Ontick: spikes favour flat rate.</strong>{" "}
            <Link href="/case-studies/ontick/">Ontick</Link> has booked 230K+ tickets and put Â£2M+ in platform sales
            through a Laravel + Vue + MySQL stack. Ticketing traffic is the anti-B2B shape: near-vertical spikes the
            minute a tour goes on sale. A Forge-managed server sized for the spike costs the same on the quiet days,
            which sounds wasteful until you price what usage-based metering does during the loud ones. For spiky
            transactional platforms we still size for the peak and pay the flat rate.
          </li>
          <li>
            <strong>PES: the perfect scale-to-zero shape that does not need it.</strong> The PES tendering ERP has $1M+
            in tenders flowing through it and has saved 800+ broker hours. Its traffic is business-hours only, the
            exact profile Laravel Cloud&apos;s metering flatters. It also runs contentedly on one modest Forge box at a
            bill so small the SZS conversation is not worth the migration. Usage-based pricing needs a bill big enough
            to be worth shrinking.
          </li>
          <li>
            <strong>All White Laser: portability is an ops feature.</strong> The AWL contracts portal ($5M in
            contracts, 500 contract docs) runs a monthly document sync to Cloudflare R2 via standalone PHP migration
            scripts that deliberately load neither WordPress nor Laravel, so plugin Guzzle conflicts cannot break the
            cron. Those scripts ran unchanged on all three legs of this study, which is the quiet argument for keeping
            edge and storage concerns decoupled from the host platform; it is the same pattern behind our{" "}
            <Link href="/services/cloudflare-edge-engineering/">Cloudflare edge engineering</Link> work and our{" "}
            <Link href="/blog/cloudflare-r2-wordpress-media-2026/">SDK-free R2 media study</Link>.
          </li>
          <li>
            <strong>Rail.One: pauses are a billing event.</strong> Rail.One is a DE/EN bilingual corporate platform
            with a Next.js front end on <Link href="/services/sanity-cms-development/">Sanity</Link>, and it survived
            two full project pauses. A paused project on a flat-rate server keeps billing; on usage-based
            infrastructure it falls toward the platform fee. If your project portfolio includes builds that stop and
            restart, scale-to-zero is worth more to you than any throughput argument.
          </li>
        </ol>

        <h2>Recommendations</h2>

        <h3>If nobody owns ops: Laravel Cloud</h3>
        <p>
          For a founder-led team with no in-house DevOps, or a build where every hour is billed at agency rates,
          Laravel Cloud produced the lowest EMB in this study and the least dangerous failure modes. Budget $70 to $90
          a month at around 400K requests, expect to claw back 20% or so with one right-sizing pass, and accept the
          Postgres default unless your app has deep MySQL assumptions. Watch the meter monthly; usage pricing rewards
          exactly that attention.
        </p>

        <h3>If routine ops live in-house: Forge + Hetzner</h3>
        <p>
          This is our default and where most of our{" "}
          <Link href="/services/laravel-development/">Laravel engagements</Link> ship: $21.55 a month flat, 49 second
          deploys, and a control plane that turns server administration into a checklist. Add an atomic-release recipe
          before any high-stakes traffic window. The EMB penalty in our table assumes agency-priced hours; with an
          engineer already on payroll doing 2 hours a month of routine Forge maintenance, this leg wins the maths
          comfortably.
        </p>
        <p>
          The scaling path is also more graceful than the VPS label suggests. When this app outgrows a CX32, the next
          move is a resize to the next Hetzner tier, ten minutes of downtime scheduled into a quiet window; after
          that, splitting MySQL onto its own box and putting two app servers behind a load balancer, all of it still
          inside Forge&apos;s remit. We have run that exact progression on production platforms without ever leaving
          the flat-rate world, and the bill at the end of it is still less than many teams&apos; first month of
          metered compute.
        </p>

        <h3>If the hours are genuinely free: the bare VPS</h3>
        <p>
          The bare VPS is the right answer when compliance demands full control, when the box hosts several apps and
          amortises its hours, or when the person patching it would be patching servers anyway. It gave us the fastest
          deploys and the fastest rollbacks in the study. Just price the 3.4 hours a month honestly, because the
          invoice never will.
        </p>

        <TableScroll>
          <table>
            <thead>
              <tr>
                <th>Choose</th>
                <th>When</th>
                <th>Expect (monthly)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Laravel Cloud</td>
                <td>No ops cover, spiky-or-quiet traffic, paused projects</td>
                <td>$67 to $87 billed, 0.5h ops</td>
              </tr>
              <tr>
                <td>Forge + Hetzner</td>
                <td>In-house routine ops, predictable traffic, our default</td>
                <td>$21.55 billed, about 2h ops</td>
              </tr>
              <tr>
                <td>Bare VPS</td>
                <td>Compliance, multi-app boxes, hours already paid for</td>
                <td>$9.55 billed, about 3.4h ops</td>
              </tr>
            </tbody>
          </table>
        </TableScroll>

        <h2>Limitations</h2>

        <p>
          This is one app with one traffic shape over two billing cycles; a spiky consumer workload would move every
          number, especially SZS. The Laravel Cloud leg ran Serverless Postgres while the others ran MySQL, so the
          database columns are close cousins rather than twins. Sixty days overweights early-life ops: the Forge and
          VPS legs&apos; OHM would trend down as the servers settle, and Cloud&apos;s right-sizing gain was a one-off.
          Currency conversion adds noise to the Hetzner figures, and our $75/h blended rate reflects UK / India agency
          economics; recompute EMB with yours before deciding anything. Usage-based pricing also changes faster than
          flat rates, so treat the Cloud figures as a June to August 2026 snapshot, not a durable quote.
        </p>

        <h2>The invoice is not the bill</h2>

        <p>
          Sixty days, three deployments of the same app, and one conclusion that survives every caveat above: the
          hosting invoice is the smallest and least honest number in the decision. The real bill is the invoice plus
          the hours, and once you write both down the three paths stop being competitors and become three different
          answers to the question of who does the ops. Rent the platform, rent the control plane, or own the machine:
          the app itself, Laravel with a Vue front end and a queue doing the heavy lifting, ran identically well on
          all three.
        </p>

        <p>
          The companion reads: how the deploy mechanics compare across the general-purpose PaaS field, and why clients
          keep paying for this stack in the first place:
        </p>

        <RelatedGrid>
          <RelatedCard
            tag="Research"
            title="Zero-Downtime Push-to-Deploy on DigitalOcean App Platform vs Vercel, Render and Fly"
            body="Anatomy of one deploy on four PaaS platforms: timings, traffic-shift mechanics, rollback paths, and the real cost of zero-downtime at 100 RPS."
            href="/blog/zero-downtime-digitalocean-app-platform-2026/"
          />
          <RelatedCard
            tag="Research"
            title="Tech stacks clients pay for vs what developers actually want, 2026 data report"
            body="12 web stacks compared across usage, developer preference, client demand and freelance rate, with four original metrics computed from survey data."
            href="/blog/tech-stacks-developers-vs-clients-2026/"
          />
          <RelatedCard
            tag="Research"
            title="Cloudflare R2 as the WordPress Media Library: SDK-Free SigV4 in Pure PHP"
            body="Replacing wp-content/uploads with Cloudflare R2 from a 200-line PHP MU-plugin, no AWS SDK, with a custom SigV4 signer."
            href="/blog/cloudflare-r2-wordpress-media-2026/"
          />
        </RelatedGrid>

        <p>
          And the engagements this study feeds: the Laravel work itself, and the edge and frontend practices it pairs
          with:
        </p>

        <RelatedGrid>
          <RelatedCard
            tag="Service"
            title="Laravel Development &amp; Modernisation"
            body="Greenfield ERPs, CRMs and B2B portals, plus modernisation of existing Laravel codebases. Forge plus Cloudflare deployment patterns."
            href="/services/laravel-development/"
          />
          <RelatedCard
            tag="Service"
            title="Cloudflare Edge Engineering"
            body="Workers for edge logic, R2 for media and documents, WAF and Bulk Redirects for migrations. The full surface, not just the orange cloud."
            href="/services/cloudflare-edge-engineering/"
          />
          <RelatedCard
            tag="Service"
            title="Vue.js &amp; Nuxt Development"
            body="Vue + Laravel is our most-shipped pairing, in production on Ontick, PES and the AWL contracts portal."
            href="/services/vue-nuxt-development/"
          />
        </RelatedGrid>

        <Faq items={FAQS} />

        <AuthorByline lastReviewedISO={MODIFIED_ISO}>
          Ritesh ran the 60 day parallel deployment behind this study and the four production Laravel platforms it
          draws on, including Ontick (230K+ tickets booked, Â£2M+ platform sales) and the PES tendering ERP. Invoice
          exports from Laravel Cloud, Forge and the Hetzner console, plus per-leg ops logs, informed the methodology.
        </AuthorByline>
      </PostBody>

      <CtaBand />
    </>
  );
}
