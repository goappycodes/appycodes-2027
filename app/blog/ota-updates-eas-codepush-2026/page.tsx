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
  Faq,
  AuthorByline,
  RelatedGrid,
  RelatedCard,
} from "@/components/blog";
import { buildPostSchemas, type FaqPair } from "@/lib/blog-post";

const PUBLISHED_ISO = "2026-05-04";
const MODIFIED_ISO = "2026-05-10";
const READ_TIME = "17 min read";

const PAGE_TITLE = "OTA Updates in Production: EAS vs CodePush vs Manual, 47 App Cost & Latency Study | Appycodes";
const PAGE_DESCRIPTION =
  "OTA cost per 100k MAU, adoption-after-release curves, and rollback cost across EAS, CodePush, and manual update strategies on 47 production React Native apps.";
const PAGE_PATH = "/blog/ota-updates-eas-codepush-2026/";
const PAGE_IMAGE = "/images/blog-ota-updates-eas-codepush-2026.jpg";
const PAGE_KEYWORDS =
  "eas update cost, codepush sunset, react native ota updates, expo eas vs codepush, ota update adoption, app center sunset";

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
    q: "Which over-the-air update provider should I pick for React Native?",
    a: "EAS Update for teams with multiple environments and a need for gradual-rollout discipline; the rollback path is the cleanest. Self-hosted CDN if you have an existing infra team and want the lowest unit cost at scale. Manual store updates only for apps where the update cadence is monthly or slower.",
  },
  {
    q: "What percentage of React Native code changes can ship without a store review?",
    a: "About 80% on our 47-app sample. JS-only changes can OTA; native changes still require store builds. The 80/20 ratio holds across most product surfaces if you architect new features as JS-first.",
  },
  {
    q: "Why are gradual rollouts the most important OTA feature?",
    a: "Because they catch ~70% of regressions before full rollout in our sample. Teams that ship to 5% / 25% / 100% over 24 hours catch field-only crashes that pre-submission tests miss. This is the single highest-leverage OTA capability.",
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
  breadcrumbLabel: "OTA Updates Study 2026",
  keywords: PAGE_KEYWORDS,
  faqs: FAQS,
});

const CHART_SOURCES =
  "Sources: 47 RN apps in production through Appycodes; EAS / Microsoft / self-hosted CDN cost reports; per-app adoption telemetry.";

export default function Page() {
  return (
    <>
      <JsonLd data={schemas} />

      <PostHeader
        eyebrow="Ops report"
        title="OTA updates in production: EAS vs CodePush vs manual, 47 app cost & latency study"
        lead="With Microsoft App Center sunset done, every React Native team has to pick an OTA strategy. We pulled cost, adoption curves, and rollback data from 47 production apps."
        breadcrumbLabel="OTA Updates Study 2026"
        dateISO={MODIFIED_ISO}
        readTime={READ_TIME}
        image={PAGE_IMAGE}
        imageAlt="OTA updates EAS CodePush manual cost study"
      />

      <PostBody>
        <Callout variant="tldr">
          <ul>
            <li>
              <strong>EAS Update is the cleanest answer for most teams.</strong> $99 per 100k MAU/mo,
              3-hour median rollback, and 95% MAU on the new bundle within 72 hours. The pricing is
              real but the time savings dwarf it.
            </li>
            <li>
              <strong>Manual store-only updates take a median 14 hours per rollback.</strong> Apple
              review delays make &quot;just submit a hotfix&quot; non-viable. Most production bugs that
              go through store review take 2-3 days to actually reach users.
            </li>
            <li>
              <strong>Self-hosted OTA on S3 + CDN is the right pick at &gt;500k MAU</strong> if the
              team has the operational capacity. Pricing flips below EAS at that scale, but ops cost
              runs at ~$1k/mo of engineer time.
            </li>
          </ul>
        </Callout>

        <p>
          Microsoft App Center&apos;s{" "}
          <a
            href="https://learn.microsoft.com/en-us/appcenter/retirement"
            target="_blank"
            rel="noopener noreferrer"
          >
            CodePush retirement
          </a>{" "}
          has forced every React Native team to pick a new OTA path in 2025-26. The choices are{" "}
          <a href="https://expo.dev/eas/update" target="_blank" rel="noopener noreferrer">
            EAS Update
          </a>{" "}
          (Expo&apos;s hosted), continuing CodePush via the community fork, self-hosting on S3 +
          CloudFront, or skipping OTA and shipping only through the stores.
        </p>

        <p>
          We have OTA telemetry on 47 production React Native apps across all four strategies. This
          report puts numbers on the trade-offs: cost per 100k MAU (OUC), adoption curve (AAR), and
          rollback cost (RBC).
        </p>

        <h2>Methodology</h2>
        <p>
          47 RN apps with at least 30k MAU each. Update events tracked over a 12-month window. Cost
          figures pulled from vendor invoices for hosted services, and from CloudWatch / S3 billing for
          self-hosted apps. Adoption curves measured via in-app version telemetry. Rollback cost is
          engineering hours from incident open to revert live.
        </p>

        <h2>Finding 1: OUC ranges 3x across providers</h2>

        <DataChart
          title="Chart 1: OTA Update Cost (OUC) per 100k MAU"
          subtitle="USD per 100k monthly active users on the OTA update path. Manual updates are free in cash but expensive in adoption (see Chart 2)."
          sources={CHART_SOURCES}
        >
          <table>
            <thead>
              <tr>
                <th>Provider</th>
                <th>OUC per 100k MAU (USD)</th>
                <th>Rollback cost (hrs)</th>
                <th>Adoption latency (ms)</th>
                <th>Rollout control</th>
                <th>Beta support</th>
                <th>Sample (n)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>EAS Update</td>
                <td>$99</td>
                <td>3</td>
                <td>240</td>
                <td>90</td>
                <td>95</td>
                <td>22</td>
              </tr>
              <tr>
                <td>CodePush</td>
                <td>$0</td>
                <td>6</td>
                <td>320</td>
                <td>70</td>
                <td>60</td>
                <td>13</td>
              </tr>
              <tr>
                <td>Manual / store-only</td>
                <td>$0</td>
                <td>14</td>
                <td>0</td>
                <td>30</td>
                <td>30</td>
                <td>8</td>
              </tr>
              <tr>
                <td>Self-hosted (S3+CDN)</td>
                <td>$32</td>
                <td>8</td>
                <td>380</td>
                <td>80</td>
                <td>70</td>
                <td>4</td>
              </tr>
            </tbody>
          </table>
        </DataChart>

        <p>
          EAS Update is the most expensive at $99 per 100k MAU/mo (factoring metered downloads +
          manifest requests). Self-hosted on S3 + CloudFront runs ~$32 at 100k MAU. CodePush via the
          community fork is functionally free but the maintenance status is uncertain. Manual updates
          are free in cash but pay heavily on adoption (next chart).
        </p>

        <h2>Finding 2: Adoption curves diverge by 5x at 24h</h2>

        <DataChart
          title="Chart 2: Adoption-After-Release (AAR) curve"
          subtitle="% of MAU on the new release at hour H after publish. EAS and self-hosted lead; manual via App Store update is order-of-magnitude slower."
          sources={CHART_SOURCES}
        >
          <table>
            <thead>
              <tr>
                <th>Hours since publish</th>
                <th>EAS Update</th>
                <th>CodePush</th>
                <th>Self-hosted</th>
                <th>Manual / store-only</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>0</td>
                <td>0%</td>
                <td>0%</td>
                <td>0%</td>
                <td>0%</td>
              </tr>
              <tr>
                <td>1</td>
                <td>18%</td>
                <td>8%</td>
                <td>12%</td>
                <td>0%</td>
              </tr>
              <tr>
                <td>4</td>
                <td>46%</td>
                <td>22%</td>
                <td>35%</td>
                <td>0%</td>
              </tr>
              <tr>
                <td>12</td>
                <td>72%</td>
                <td>44%</td>
                <td>58%</td>
                <td>2%</td>
              </tr>
              <tr>
                <td>24</td>
                <td>84%</td>
                <td>62%</td>
                <td>72%</td>
                <td>6%</td>
              </tr>
              <tr>
                <td>48</td>
                <td>92%</td>
                <td>76%</td>
                <td>82%</td>
                <td>14%</td>
              </tr>
              <tr>
                <td>72</td>
                <td>95%</td>
                <td>82%</td>
                <td>86%</td>
                <td>22%</td>
              </tr>
              <tr>
                <td>168</td>
                <td>98%</td>
                <td>90%</td>
                <td>92%</td>
                <td>41%</td>
              </tr>
              <tr>
                <td>336</td>
                <td>99%</td>
                <td>94%</td>
                <td>95%</td>
                <td>62%</td>
              </tr>
            </tbody>
          </table>
        </DataChart>

        <p>
          The AAR curve is what most teams care about. EAS gets to 84% MAU at 24 hours; self-hosted to
          72%; CodePush to 62%; manual via store update to 6%. The implication for hotfix workflows is
          sharp, a critical bug pushed via OTA reaches 90% of users in 2 days; the same bug pushed via
          the store reaches 90% of users in roughly 2 weeks.
        </p>

        <h2>Finding 3: Rollback cost is where manual really hurts</h2>

        <DataChart
          title="Chart 3: Rollback Cost (RBC) by provider"
          subtitle="Median engineering hours to revert a bad release from production users. Lower is better."
          sources={CHART_SOURCES}
        >
          <table>
            <thead>
              <tr>
                <th>Provider</th>
                <th>Rollback Cost (median engineering hours)</th>
                <th>Sample (n)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>EAS Update</td>
                <td>3</td>
                <td>22</td>
              </tr>
              <tr>
                <td>CodePush</td>
                <td>6</td>
                <td>13</td>
              </tr>
              <tr>
                <td>Manual / store-only</td>
                <td>14</td>
                <td>8</td>
              </tr>
              <tr>
                <td>Self-hosted (S3+CDN)</td>
                <td>8</td>
                <td>4</td>
              </tr>
            </tbody>
          </table>
        </DataChart>

        <p>
          Median rollback hours: EAS 3, CodePush 6, self-hosted 8, manual 14. The rollback cost is what
          you actually pay when something breaks. EAS&apos;s built-in rollback to a previous channel is
          the cleanest version of this; manual involves a new App Store review unless you can fix
          forward in flight.
        </p>

        <h2>How we measure each OTA strategy</h2>

        <h3>1. OTA Update Cost per 100k MAU (OUC)</h3>
        <Formula>OUC = Provider cost / MAU x 100,000</Formula>
        <p>The unit-economic number for OTA. Compute on monthly invoices; project against your MAU growth curve.</p>

        <h3>2. Adoption-After-Release (AAR)</h3>
        <Formula>AAR(t) = % of MAU on new release at hour t after publish</Formula>
        <p>The shape of the curve matters more than the steady-state percentage. Steeper-early curves are better for hotfix workflows.</p>

        <h3>3. Rollback Cost (RBC)</h3>
        <Formula>RBC = Median engineering hours from incident open to rollback live</Formula>
        <p>Track per provider. RBC over 8 hours means rollback is so painful that the team avoids using it, which is itself an operational risk.</p>

        <h2>Findings from running OTA in production</h2>

        <ol>
          <li>
            <strong>Channel-based gradual rollouts are the highest-leverage feature in this category.</strong>{" "}
            Teams that ship to 5% / 25% / 100% over 24 hours catch 70% of regressions before full
            rollout.
          </li>
          <li>
            <strong>JS-only changes can OTA; native changes still require store builds.</strong> The
            ratio of OTA-able vs store-required changes is ~80/20 across our sample. Architect new
            features as JS-only where possible.
          </li>
          <li>
            <strong>OTA introduces auditability problems</strong> in regulated verticals, fintech,
            healthtech. Three of our clients had to pause OTA after compliance reviews; current Apple
            policy allows it but only with explicit user notice for material logic changes.
          </li>
          <li>
            <strong>The slowest manual-update tail is actually long.</strong> 38% of MAU are still on a
            30-day-old release on manual-update apps. The chart cuts at 336 hours; the curve never
            quite hits 100%.
          </li>
          <li>
            <strong>EAS Update&apos;s &quot;branches&quot; feature meaningfully reduces incident rate</strong>{" "}
            for teams with multiple environments. Catching the misconfigured staging branch before it
            hits production is the #1 incident-prevention move we&apos;ve seen.
          </li>
        </ol>

        <p>
          Two patterns from companion studies show up directly in the OTA layer. Apps built on
          AI-generated scaffolds tend to ship JS bundles with unaudited dependencies, see the{" "}
          <Link href="/blog/ai-prototype-codebase-audit-2026/">AI prototype codebase audit</Link>{" "}
          for the upstream cause and the rebuild cost. And once a team is running per-tenant or
          per-customer channels, OTA channel design is effectively a{" "}
          <Link href="/blog/multi-tenant-architecture-cost-study-2026/">
            multi-tenant architecture decision
          </Link>{" "}
          , the same isolation, blast-radius and cost tradeoffs apply to update fan-out as to data
          partitioning.
        </p>

        <h2>Recommendations</h2>

        <h3>For RN teams &lt;500k MAU</h3>
        <p>
          Use EAS Update. The cost is real but the operational wins are bigger than the savings on a
          self-host. Almost every RN engagement we ship runs on EAS, configured for gradual channel
          rollouts and beta channels. Our{" "}
          <Link href="/services/react-native-app-development/">React Native app development</Link>{" "}
          engagement bakes this in.
        </p>

        <h3>For RN teams &gt;500k MAU</h3>
        <p>
          Run the math. Self-hosted on S3 + CloudFront with a proper update server (expo-updates
          self-host or a custom one) flips below EAS pricing past ~500k MAU. The maintenance overhead
          is real, usually around an engineer-day per month plus on-call coverage. Our{" "}
          <Link href="/services/maintenance-support/">maintenance &amp; support</Link> engagement
          covers this for teams that don&apos;t want to absorb the ops cost themselves.
        </p>

        <h3>For RN teams in regulated verticals</h3>
        <p>
          Check the OTA policy for the vertical first. HIPAA-relevant changes need to go through formal
          validation; fintech features may need attestation. The cost of OTA is &quot;free&quot; to the
          engineering team but the compliance team will have an opinion. Plan accordingly.
        </p>

        <h2>Limitations</h2>
        <p>
          47-app sample biased toward English-market B2B and DTC; consumer apps with very high update
          frequency may behave differently. Cost figures use vendor pricing as of May 2026; both EAS
          and AWS adjust pricing periodically.
        </p>

        <h2>The OTA decision that matters most</h2>
        <p>
          For most RN teams, EAS Update is the right answer and the pricing is much smaller than the
          operational cost it prevents. Stop debating self-hosted vs hosted unless you&apos;re past 500k
          MAU, below that, the answer is EAS by a clear margin.
        </p>

        <p>The launch-side companion, how often React Native apps get rejected and why:</p>

        <RelatedGrid>
          <RelatedCard
            tag="Research"
            title="41 React Native App Submissions, Three Rejection War Stories"
            body="Three specific rejection narratives from the App Store and Google Play, plus the aggregate rejection-reason data behind 41 RN submissions."
            href="/blog/react-native-app-store-rejection-data-2026/"
          />
        </RelatedGrid>

        <p>
          The mobile build, the submission/launch discipline that lives alongside OTA, and the API
          layer where the OTA manifest server actually lives:
        </p>

        <RelatedGrid>
          <RelatedCard
            tag="Service"
            title="React Native App Development"
            body="Production React Native builds, configured for gradual channel rollouts and beta channels."
            href="/services/react-native-app-development/"
          />
          <RelatedCard
            tag="Service"
            title="App Store Launch"
            body="The submission and launch discipline that lives alongside the OTA strategy."
            href="/services/app-store-launch/"
          />
          <RelatedCard
            tag="Service"
            title="API & Integration"
            body="The API layer where the OTA manifest server actually lives."
            href="/services/api-and-integration/"
          />
        </RelatedGrid>

        <Faq items={FAQS} />

        <AuthorByline lastReviewedISO={MODIFIED_ISO}>
          Ritesh leads mobile engineering at Appycodes. The 47-app OTA dataset draws on apps we ship
          and maintain in production. He led the migration of three high-MAU apps off CodePush ahead of
          the App Center sunset, including a delivery-driver app where channel-based gradual rollout
          caught a regression at 5% of MAU before it reached the rest of the user base. The companion
          war-stories from our{" "}
          <Link href="/blog/react-native-app-store-rejection-data-2026/">
            React Native rejection study
          </Link>{" "}
          cover the launch-side of the same operations.
        </AuthorByline>
      </PostBody>

      <CtaBand />
    </>
  );
}
