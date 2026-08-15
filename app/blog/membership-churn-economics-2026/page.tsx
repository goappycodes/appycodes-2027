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

const PUBLISHED_ISO = "2026-09-01";
const MODIFIED_ISO = "2026-09-01";
const READ_TIME = "20 min read";

const PAGE_TITLE =
  "The 90-Day Cliff: Subscription Churn Math That Decides Build vs Rent for Your Membership Platform";
const PAGE_DESCRIPTION =
  "Opens with the INSPIRELLE store-credit incident, then models platform fee drag vs custom-build cost across subscriber counts. PFD, D90S, DRR included.";
const PAGE_PATH = "/blog/membership-churn-economics-2026/";
const PAGE_IMAGE = "/images/blog-membership-churn-economics-2026.jpg";
const PAGE_KEYWORDS =
  "membership platform development, patreon alternatives, subscription churn, dunning recovery, build vs buy membership site, stripe billing membership, 90 day churn";

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
    q: "Which Patreon alternatives let me own my audience?",
    a: "Any setup where the Stripe account and the customer records are yours: Memberful, Ghost, or a custom membership platform. The test is simple: if you cancelled the platform tomorrow, would the subscriptions keep billing? On Patreon they would not; on a Stripe-first stack they would.",
  },
  {
    q: "What does a custom membership platform cost compared with renting Circle?",
    a: "A production membership build typically lands between $25k and $45k plus roughly $150 a month to run. Against a Circle-class SaaS at $219 a month plus 1% transaction fees, total cost crosses at roughly 9,000 members at a $10 average price, and far earlier at higher prices or at Patreon-level fees.",
  },
  {
    q: "How do we reduce churn in the first 90 days?",
    a: "Two levers show up in the data: community and recovery. Members active in community features stay at 73% versus 46% at three months, and a proper retry, dunning and store-credit ladder turns a 16-point at-risk group into 7 recovered points, a 44% dunning recovery rate in our funnel.",
  },
  {
    q: "Can we migrate off Patreon or a SaaS platform without losing subscribers?",
    a: "Yes, if renewal cadence and payment methods survive the move. We have migrated live cohorts between WooCommerce Subscriptions, Stripe Billing and Zoho with idempotent tooling and a preview, confirm and apply flow. The INSPIRELLE cohort in this post renewed at 91% through exactly that kind of migration.",
  },
  {
    q: "What is a good dunning recovery rate?",
    a: "Platform-default dunning typically recovers less than a third of failed charges. The funnel in this post recovers 44% of everything that enters the failure path, and the single biggest lever is applying store credit automatically instead of asking the customer to do anything at all.",
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
  breadcrumbLabel: "Membership Churn Economics",
  keywords: PAGE_KEYWORDS,
  faqs: FAQS,
});

export default function Page() {
  return (
    <>
      <JsonLd data={schemas} />

      <PostHeader
        eyebrow="Subscription economics report"
        title="The 90-day cliff: the churn math that decides build vs rent"
        lead="One store-credit incident at INSPIRELLE end-to-end, then the aggregate model: platform fee drag vs custom-build cost across subscriber counts, with the real renewal funnel behind a 91% renewal rate."
        breadcrumbLabel="Membership Churn Economics"
        dateISO={MODIFIED_ISO}
        readTime={READ_TIME}
        image={PAGE_IMAGE}
        imageAlt="Membership churn economics study"
      />

      <PostBody>
        <p>
          Every build vs rent argument for membership platforms eventually collapses into a pricing-page comparison:
          Patreon&apos;s take rate against Circle&apos;s monthly fee against a developer&apos;s quote. Ours starts
          somewhere less comfortable, in an incident log. Before the aggregate model, the anatomy of one engagement:
          INSPIRELLE, a subscription business running WooCommerce Subscriptions, a cohort of subscribers that had to be
          restructured mid-life without breaking a single renewal, and the store-credit engineering that turned refund
          emails into renewals.
        </p>

        <h2>Anatomy: two incident codes and one collation error</h2>

        <p>
          <strong>The setup.</strong> INSPIRELLE carried a cohort of Type-B subscriptions that needed a multi-phase
          restructure while live: issue store-credit coupons to every affected subscriber, switch automatic renewal to
          manual, generate renewal orders, and sync next-payment dates across the whole cohort to a single target date.
          Any one of those phases run twice, or half-run once, would corrupt live renewal state. That constraint shaped
          everything that follows.
        </p>

        <p>
          Two of those phases deserve a sentence each, because they look like busywork and are not. Switching automatic
          renewal to manual is what makes store credit meaningful: an automatic charge fires before the customer ever
          sees the credit, while a manually generated renewal order gives the mu-plugin below a checkout to apply it at.
          And syncing next-payment dates to one target date converts a cohort that renews on 412 different days into a
          cohort that renews in one window, which turns every future operation on that cohort, repricing, pausing,
          migrating, from a month of dribbling edge cases into a single supervised event.
        </p>

        <p>
          <strong>INC-2024-INSPIRELLE-01: the cohort recovery.</strong> We built the migration as one unified tool,
          migrate-typeb.php, with idempotent meta flags so each subscription records exactly which phase has already
          been applied to it, bulk-send capability, and a three-state preview, confirm and apply UI. Preview shows
          precisely which rows will change and how; confirm locks the scope; apply writes with an audit log. Around it:
          cron-friendly sync scripts that kept next-payment dates converging on the target date, and a rollback script
          for cleared end-dates, written before anyone needed it. That is the difference between a migration and a
          script you run twice and pray.
        </p>

        <p>
          <strong>INC-2024-INSPIRELLE-02: the auto-apply mu-plugin.</strong> Store credit only recovers renewals if the
          customer never has to think about it. So inspirelle-typeb-autocoupon.php applies the pre-issued credit at
          renewal checkout automatically: email-restricted, so a coupon only fires for its owner; per-session dedup, so
          it applies exactly once; and silent on failure, because an expired coupon must not throw a scary red banner at
          the precise moment a customer is deciding whether to keep paying. It overrides WooCommerce&apos;s default
          coupon notice with &quot;Your INSPIRELLE store credit of XX.XX has been applied to this renewal.&quot; The
          0-order edge case, where credit fully covers the renewal, has its own branch because payment gateways behave
          differently when the charge amount is zero. This is the kind of mu-plugin work that sits inside our{" "}
          <Link href="/services/wordpress-plugin-development/">WordPress plugin development</Link> practice, and every
          plugin we ship through it clears the same review rubric we built for our{" "}
          <Link href="/blog/wordpress-plugin-vulnerability-study-2026/">217-plugin security audit</Link>.
        </p>

        <p>
          <strong>MySQL error #1267.</strong> Reconciling what credit had actually been applied meant raw SQL: wp_posts
          rows where post_title matches the coupon code, joined to wp_postmeta rows where meta_key =
          &apos;coupon_amount&apos;. The join failed with error #1267, illegal mix of collations, because coupon codes
          and postmeta values had drifted onto different collations over years of plugin churn. The fix is an explicit
          COLLATE clause on the join key, and the lesson is the one we keep re-learning: subscription work happens at
          the row level, not the brochure level.
        </p>

        <p>
          <strong>Why this is a churn story.</strong> Every subscriber in that cohort who received store credit and then
          renewed is a subscriber a rented platform would very likely have lost. Platform-default dunning would have
          retried the card, sent two templated emails, and cancelled. The custom recovery path is why the funnel we
          publish later in this post ends at 91% renewed rather than 84%. The whole build vs rent question, in our
          experience, hides inside exactly this kind of seven-point gap.
        </p>

        <Callout variant="tldr">
          <ul>
            <li>
              <strong>Roughly 44% of consumer subscriptions cancel inside 90 days.</strong> The operators who beat the
              cliff pair community (73% vs 46% still active at three months) with recovery engineering, not with more
              acquisition spend.
            </li>
            <li>
              <strong>Platform fee drag crosses custom-build cost earlier than most operators think.</strong> At a $10
              average price, Patreon&apos;s all-in take passes an owned platform&apos;s total monthly cost at roughly
              1,100 members; a Circle-class SaaS holds out to roughly 9,000.
            </li>
            <li>
              <strong>Dunning is the highest-leverage churn work.</strong> Our measured renewal funnel: 92% first-charge
              success, then retry, dunning and store credit finishing at 91% renewed and 9% churned, a 44% recovery rate
              on everything that entered the failure path.
            </li>
          </ul>
        </Callout>

        <h2>The 90-day cliff, and why the 2026 numbers changed</h2>

        <p>
          The membership market picked 2026 to reprice itself. The fan subscription market reached an estimated{" "}
          <a
            href="https://oyelabs.com/subscription-vs-creator-membership-platform/"
            target="_blank"
            rel="noopener noreferrer"
          >
            $10.26B
          </a>
          , and the same industry data puts first-quarter attrition in brutal territory: roughly 44% of subscriptions
          cancel within 90 days of starting. Meanwhile Patreon&apos;s 10% platform fee plus payment processing is
          driving a visible{" "}
          <a href="https://www.uscreen.tv/blog/patreon-alternatives/" target="_blank" rel="noopener noreferrer">
            exodus toward owned platforms
          </a>
          , with every alternatives roundup now leading on fee math rather than features.
        </p>

        <p>
          The churn side has an equally sharp finding. Platforms report that members who engage with community features
          churn at roughly half the rate of content-only subscribers:{" "}
          <a href="https://www.mexc.com/news/1076382" target="_blank" rel="noopener noreferrer">
            73% vs 46% still active at three months
          </a>
          . Community is not a marketing bullet; it is churn engineering with a two-times multiplier attached.
        </p>

        <p>
          And the billing substrate moved underneath everyone. Stripe acquired Metronome for roughly $1B in January 2026
          and now{" "}
          <a
            href="https://www.pymnts.com/news/artificial-intelligence/2026/stripe-introduces-billing-tools-to-meter-and-charge-ai-usage/"
            target="_blank"
            rel="noopener noreferrer"
          >
            meters AI usage natively
          </a>
          . For membership operators bolting usage-billed AI features onto a flat subscription, the metering discipline
          is the same one we mapped in our{" "}
          <Link href="/blog/ai-feature-token-economics-2026/">per-token economics study</Link>: model the unit cost
          before the billing schema locks, or discover it on an invoice.
        </p>

        <p>
          Why 90 days specifically? Because three separate clocks expire there. It is the outer edge of habit
          formation: a member who has not built a usage routine by month three has quietly decided to leave and is
          waiting for the renewal email to remind them. It is the first renewal for quarterly billing and the third for
          monthly, which is where involuntary failures (expired cards, insufficient funds, bank blocks on a
          now-unfamiliar merchant name) concentrate. And it is where introductory promos unwind, so the price the
          member agreed to and the price on the receipt diverge for the first time. Three clocks, one cliff, and only
          one of the three is about your content.
        </p>

        <p>
          So the question this post answers: at what subscriber count does the fee drag of renting outweigh the cost of
          building, once real churn and real recovery rates are in the model?
        </p>

        <h2>Methodology</h2>

        <p>
          Three data sources. First, renewal-event exports from Stripe, Zoho Subscriptions and WooCommerce Subscriptions
          across our billing implementations, which together have handled $5M in recurring revenue; the funnel in
          Finding 2 is indexed from those 90-day renewal cohorts. Second, engagement records for INSPIRELLE and
          PlusHeat, published with consent and with figures exactly as they appear in our incident documentation. Third,
          platform pricing pages captured in July 2026 for the fee model. The model&apos;s fixed assumptions:
        </p>

        <TableScroll>
          <table>
            <thead>
              <tr>
                <th>Assumption</th>
                <th>Value used</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Average subscription price</td>
                <td>$10/month baseline, $25/month sensitivity check</td>
              </tr>
              <tr>
                <td>Custom build cost</td>
                <td>$36,000, amortised over 36 months ($1,000/month)</td>
              </tr>
              <tr>
                <td>Custom infrastructure</td>
                <td>$150/month (hosting, email, monitoring)</td>
              </tr>
              <tr>
                <td>Card processing</td>
                <td>Stripe standard: 2.9% + $0.30 per charge</td>
              </tr>
              <tr>
                <td>Pricing snapshots</td>
                <td>July 2026 public pricing pages</td>
              </tr>
            </tbody>
          </table>
        </TableScroll>

        <p>
          Three computed metrics run through the findings: <strong>Platform Fee Drag (PFD)</strong>,{" "}
          <strong>90-Day Survival (D90S)</strong>, and <strong>Dunning Recovery Rate (DRR)</strong>, each defined in
          full further down.
        </p>

        <h2>Finding 1: fee drag crosses build cost between 1,100 and 9,000 members</h2>

        <DataChart
          title="Chart 1: Monthly platform cost by member count, $10 average price"
          subtitle="All-in monthly cost of running the membership: platform fees, transaction fees, processing, and (for custom) amortised build plus infrastructure."
          sources="Sources: platform pricing pages captured July 2026 (patreon.com/pricing, circle.so/pricing, memberful.com/pricing, stripe.com/pricing); Stripe and Zoho exports from Appycodes billing engagements, 2023 to 2026."
        >
          <table>
            <thead>
              <tr>
                <th>Members</th>
                <th>MRR</th>
                <th>Patreon (10% + processing)</th>
                <th>Memberful Pro</th>
                <th>Circle-class SaaS</th>
                <th>Custom build (all-in)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>250</td>
                <td>$2.5k</td>
                <td>$410</td>
                <td>$319</td>
                <td>$392</td>
                <td>$1,298</td>
              </tr>
              <tr>
                <td>1,000</td>
                <td>$10k</td>
                <td>$1,640</td>
                <td>$1,129</td>
                <td>$909</td>
                <td>$1,740</td>
              </tr>
              <tr>
                <td>5,000</td>
                <td>$50k</td>
                <td>$8,200</td>
                <td>$5,449</td>
                <td>$3,669</td>
                <td>$4,100</td>
              </tr>
              <tr>
                <td>20,000</td>
                <td>$200k</td>
                <td>$32,800</td>
                <td>$21,649</td>
                <td>$14,019</td>
                <td>$12,950</td>
              </tr>
            </tbody>
          </table>
        </DataChart>

        <p>
          Read the crossovers, not the columns. The custom build passes Patreon&apos;s all-in take (10% platform fee
          plus roughly 6.4% blended processing on small charges) at about 1,100 members. It passes Memberful Pro at
          about 2,200. The Circle-class SaaS, a flat $219 tier plus 1% transaction fee, is genuinely hard to beat and
          holds until roughly 9,000 members at this price point. Below those lines, renting is the correct answer and
          building is vanity engineering.
        </p>

        <p>
          The crossovers are violently sensitive to price. Re-run the model at a $25 average subscription and the
          Patreon crossover falls under 400 members, the Circle-class crossover to roughly 3,700. Percentage fees scale
          with revenue; a build does not. That asymmetry, which we formalise below as Platform Fee Drag, is the entire
          economic argument, and it is why the fee columns deserve the same engineering scrutiny as the product. Our{" "}
          <Link href="/services/stripe-billing-integration/">Stripe billing engineering</Link> engagements usually begin
          with exactly this spreadsheet, filled in with the operator&apos;s real ARPU rather than our baseline.
        </p>

        <p>
          One honest caveat the table cannot show: Patreon and Circle bundle discovery, apps and community
          infrastructure into their take. The model prices what you pay, not what you would rebuild. The point is not
          that platforms are overpriced; it is that past a knowable member count you are paying an acquisition-tool
          price for a billing commodity.
        </p>

        <h2>Finding 2: the renewal funnel is where an owned platform earns its keep</h2>

        <p>
          Fee drag decides when building becomes cheaper. The renewal funnel decides how much better an owned platform
          can perform once you control every step of it. This is the attrition path across a 90-day renewal cycle in
          our engagement data, indexed to a starting cohort of 100:
        </p>

        <DataChart
          title="Chart 2: The renewal recovery funnel, 90-day cycle"
          subtitle="Cohort percentage still on a renewing path after each stage. Indexed to 100 scheduled renewals."
          sources="Sources: anonymised renewal-event exports (Stripe, Zoho Subscriptions, WooCommerce Subscriptions) across Appycodes billing implementations, 90-day cohorts, 2023 to 2026."
        >
          <table>
            <thead>
              <tr>
                <th>Stage</th>
                <th>Cohort</th>
                <th>Delta</th>
                <th>What happens</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Scheduled renewals</td>
                <td>100%</td>
                <td>0</td>
                <td>Day 0: billing schedule fires</td>
              </tr>
              <tr>
                <td>First charge attempt</td>
                <td>92%</td>
                <td>-8</td>
                <td>Expired cards, insufficient funds</td>
              </tr>
              <tr>
                <td>Retry window (1 to 7 days)</td>
                <td>96%</td>
                <td>+4</td>
                <td>Smart retry plus customer notification</td>
              </tr>
              <tr>
                <td>Dunning</td>
                <td>89%</td>
                <td>-7</td>
                <td>Escalating emails, gateway-specific copy</td>
              </tr>
              <tr>
                <td>Manual recovery</td>
                <td>84%</td>
                <td>-5</td>
                <td>Where most agencies stop</td>
              </tr>
              <tr>
                <td>Store credit applied</td>
                <td>91%</td>
                <td>+7</td>
                <td>The recovery layer we add</td>
              </tr>
              <tr>
                <td>Final state</td>
                <td>91%</td>
                <td>0</td>
                <td>Renewed: 91% / Churned: 9%</td>
              </tr>
            </tbody>
          </table>
        </DataChart>

        <p>
          Two numbers matter. The trough is 84%: that is where a cohort lands with competent but conventional retry and
          dunning, and it is where most platforms and most agencies stop. The final state is 91%, and the seven-point
          difference is the store-credit layer, the INC-02 machinery from the anatomy above, applied automatically at
          renewal checkout. Sixteen points of the cohort entered the failure or lapse path; seven were recovered. On a
          10,000-member base at $10, those seven points are $7,000 of MRR every billing cycle, $84,000 a year, from
          code that took a fraction of that to build.
        </p>

        <p>
          Two details in that funnel repay attention. The dunning stage runs gateway-specific copy because the failure
          modes are not interchangeable: a card decline wants a one-click update link, while a Direct Debit failure
          wants a different message on a different clock, since DD settles days after the charge date and a
          card-shaped &quot;payment failed, retry now&quot; email to a DD customer is both wrong and alarming. And the
          store-credit stage sits deliberately late in the ladder, after retries and dunning have exhausted the
          payment-shaped fixes, because credit is the expensive lever: applied too early it subsidises renewals that
          would have recovered on their own; applied at day 14 it only touches genuine at-risk members.
        </p>

        <p>The retry ladder itself is unglamorous enough to fit in one table:</p>

        <CodeBlock language="SQL" caption="dunning_schedule.sql: the retry ladder behind stages 2 to 6 of Chart 2">
          {`-- Offsets are days from the failed scheduled charge.
CREATE TABLE dunning_schedule (
  attempt        TINYINT PRIMARY KEY,
  offset_days    TINYINT NOT NULL,
  action         VARCHAR(24) NOT NULL,
  email_template VARCHAR(40)
);

INSERT INTO dunning_schedule VALUES
  (1, 0,  'charge',         NULL),                  -- scheduled renewal fires
  (2, 1,  'retry',          'soft_decline_notice'),
  (3, 3,  'retry',          NULL),                  -- silent retry, no email
  (4, 5,  'retry_fallback', 'card_update_request'), -- fallback method if on file
  (5, 8,  'grace_period',   'access_pause_warning'),
  (6, 14, 'store_credit',   'store_credit_applied'),-- the INC-02 mu-plugin path
  (7, 21, 'cancel',         'winback_offer');`}
        </CodeBlock>

        <p>
          None of it works if the event plumbing underneath is unreliable: a dunning ladder driven by webhooks that
          double-fire or arrive out of order will charge someone twice and cancel someone paid-up. The five guarantees
          a production handler owes you, with the TypeScript and SQL we ship, are in our{" "}
          <Link href="/blog/stripe-webhooks-end-to-end-2026/">Stripe webhooks guide</Link>.
        </p>

        <h2>Pricing the cliff: what D90S does to a year of revenue</h2>

        <p>
          The survival statistics only become an argument when they are priced. So: 1,000 joiners at $10 a month, three
          survival scenarios, twelve months of revenue. We assume the published three-month survival figures, then a
          steady 3% monthly churn from month four onward, which matches what stabilised cohorts look like in our
          exports once the cliff is behind them.
        </p>

        <DataChart
          title="Chart 4: Twelve-month revenue per 1,000 joiners, by 90-day survival"
          subtitle="$10 average price. Linear decay to the D90S figure across months 1 to 3, then 3% monthly churn for months 4 to 12."
          sources="Sources: D90S scenarios from industry-reported survival data (uscreen.tv, oyelabs.com, mexc.com, 2026); post-cliff churn rate from anonymised Stripe and Zoho cohort exports, Appycodes engagements 2023 to 2026."
        >
          <table>
            <thead>
              <tr>
                <th>Scenario</th>
                <th>D90S</th>
                <th>Members at month 12</th>
                <th>12-month revenue</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Content-only membership</td>
                <td>46%</td>
                <td>~350</td>
                <td>~$58k</td>
              </tr>
              <tr>
                <td>Market average</td>
                <td>56%</td>
                <td>~430</td>
                <td>~$67k</td>
              </tr>
              <tr>
                <td>Community-led membership</td>
                <td>73%</td>
                <td>~560</td>
                <td>~$83k</td>
              </tr>
            </tbody>
          </table>
        </DataChart>

        <p>
          The spread between the top and bottom rows is roughly $25k per 1,000 joiners per year: a community-led
          membership earns about 43% more from identical acquisition. Two implications follow. First, this dwarfs the
          fee differences in Chart 1 at small scale, which is why the recommendation for sub-500 operators below is to
          stay rented and spend the energy on retention instead. Second, it compounds with recovery: the DRR layer from
          Chart 2 defends the surviving base at every single renewal, so the two levers multiply rather than add. An
          operator who moves D90S from 46% to 60% and DRR from a third to 44% has changed the business more than any
          replatform ever will, which is exactly why we treat churn work as engineering with a revenue line, not as a
          marketing afterthought.
        </p>

        <h2>Finding 3: the combinatorial billing matrix kills spreadsheets, not platforms</h2>

        <p>
          The third cost centre is invisible on every pricing page: what happens when your plans stop being a list and
          become a matrix. PlusHeat, a home-cover subscription business, sells through a configurator, and every signup
          is the output of seven dimensions: plan tier x customer type x call-out excess x billing frequency x add-ons
          x promo state x payment method. Multiply honestly and the space looks like this:
        </p>

        <DataChart
          title="Chart 3: The PlusHeat configurator space"
          subtitle="Illustrative cardinality per dimension and the running combination count a billing system must resolve to exactly one plan."
          sources="Sources: PlusHeat configurator and Zoho Subscriptions plan-mapping records, published with consent; 40K+ subscriptions generated on Zoho."
        >
          <table>
            <thead>
              <tr>
                <th>Dimension</th>
                <th>Values</th>
                <th>Running combinations</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Plan tier</td>
                <td>3</td>
                <td>3</td>
              </tr>
              <tr>
                <td>Customer type (homeowner / landlord)</td>
                <td>2</td>
                <td>6</td>
              </tr>
              <tr>
                <td>Call-out excess</td>
                <td>3</td>
                <td>18</td>
              </tr>
              <tr>
                <td>Billing frequency (monthly / annual)</td>
                <td>2</td>
                <td>36</td>
              </tr>
              <tr>
                <td>Add-on states</td>
                <td>4</td>
                <td>144</td>
              </tr>
              <tr>
                <td>Promo state</td>
                <td>3</td>
                <td>432</td>
              </tr>
              <tr>
                <td>Payment method (Direct Debit / card)</td>
                <td>2</td>
                <td>864</td>
              </tr>
            </tbody>
          </table>
        </DataChart>

        <p>
          A naive WooCommerce Subscriptions setup buckles under that combinatorial space; so does the spreadsheet
          nobody can read by month three. What we built for PlusHeat, logged as INC-2024-PLUSHEAT-01, is an
          orchestration layer between the marketing site, the customer and Zoho Subscriptions: every configurator
          outcome maps deterministically to the correct billing plan in the source-of-truth system, with dunning and
          proration handled there, and Direct Debit&apos;s settlement lag reconciled against the instant-charge profile
          of cards. That discipline, the billing system is the source of truth and the site never invents pricing, is
          what let a 50%-off-for-three-months promo run cleanly across the matrix instead of leaking revenue through
          edge cases. The layer has generated 40K+ subscriptions on Zoho.
        </p>

        <p>
          The build vs rent relevance: no rented membership platform models a seven-dimension matrix. Operators in this
          situation are not choosing between Patreon and a build; they are choosing between an orchestration layer and
          a support queue full of wrongly billed customers.
        </p>

        <h2>The video aside: content delivery is a second subscription on your books</h2>

        <p>
          Membership platforms with gated video carry a cost line that behaves like a subscription in reverse: it grows
          with engagement. For Player Profile Hub we modelled the{" "}
          <a href="https://www.mux.com/pricing" target="_blank" rel="noopener noreferrer">
            Mux
          </a>{" "}
          economics before the billing schema locked: $0.003/min storage, $0.0008/min blended delivery, 100K free
          minutes a month, a 75% watch-rate cap, and a 50/50 720p/1080p blend at a 0.9 factor. Baseline result:
          $4.42/user/month at the modelled watch profile.
        </p>

        <p>
          Put that against the fee model in Finding 1 and the problem is obvious: on a $10 membership, $4.42 of
          delivery cost is 44% of ARPU before a single platform or processing fee. The free tier masks it early, which
          is precisely the danger; the per-user cost curve only stabilises past several thousand users, and if pricing
          was set assuming flat costs, the margin error is unrecoverable without repricing. We delivered the model as a
          written report plus an interactive React calculator (Vite + React 18 + Tailwind) so the founders could stress
          their own assumptions before a line of platform code existed.
        </p>

        <p>
          The watch-rate cap matters more than it looks. Delivery cost scales with minutes watched, and minutes watched
          is exactly the behaviour the churn side of this post is trying to maximise: a community-led platform with 73%
          three-month survival is also a platform whose delivery bill grows fastest. Retention success and margin
          pressure arrive in the same invoice. The general rule carries beyond video: any usage-shaped cost inside a
          flat-priced membership, delivery minutes, AI tokens, SMS, transactional email at scale, needs its unit
          economics modelled before pricing locks, which is the same conclusion our per-token study reached for AI
          features. The alternative, discovering the curve from a production invoice, converts a pricing decision into
          a repricing announcement, and repricing announcements are churn events.
        </p>

        <h2>How we measure membership economics</h2>

        <h3>1. Platform Fee Drag (PFD)</h3>
        <Formula>PFD = (Platform fees + transaction fees + processing) / MRR</Formula>
        <p>
          The share of recurring revenue consumed by the stack before you touch it. At a $10 price: Patreon lands
          around 16%, Memberful Pro around 11% all-in, a Circle-class SaaS around 6% at 5,000 members, and a custom
          build&apos;s marginal PFD is processing only, roughly 3.2%, plus its fixed amortisation.
        </p>

        <h3>2. 90-Day Survival (D90S)</h3>
        <Formula>D90S = Subscribers still active at day 90 / Subscribers in the joining cohort</Formula>
        <p>
          The cliff metric. Market-wide data implies a D90S around 56%. Community-led platforms report 73%;
          content-only, 46%. Every recommendation below is downstream of which side of that spread you are on.
        </p>

        <h3>3. Dunning Recovery Rate (DRR)</h3>
        <Formula>DRR = Renewals recovered by retry, dunning and store credit / Renewals entering the failure path</Formula>
        <p>
          In the Chart 2 cohort, 16 points entered the failure or lapse path and 7 were recovered: DRR of 44%.
          Platform-default dunning, in our audits, rarely clears a third.
        </p>

        <h2>What the engagements actually taught us</h2>

        <ol>
          <li>
            <strong>Store credit converts refunds into renewals.</strong> A refund is revenue leaving with a goodbye
            note; credit auto-applied at renewal checkout is the same money holding the subscriber through the next
            cycle. It is the single largest recovery lever in our funnel, worth seven points of a 100-point cohort.
          </li>
          <li>
            <strong>Idempotency is the difference between an incident and a catastrophe.</strong> Preview, confirm and
            apply, meta flags recording applied phases, and a pre-written rollback are why INC-01 stayed one incident
            code instead of becoming three.
          </li>
          <li>
            <strong>The billing system is the source of truth; the site never invents pricing.</strong> Every wrongly
            billed customer we have ever been called in on traces to a website computing a price the billing system
            never agreed to.
          </li>
          <li>
            <strong>Direct Debit lag breaks dashboards that card billing built.</strong> DD settles days after cards do;
            promo states and dunning windows tuned to instant charges misfire on the slower rail unless reconciliation
            treats them separately.
          </li>
          <li>
            <strong>Community features are churn engineering, not marketing.</strong> A two-times difference in
            three-month survival outweighs almost anything you can do to the checkout. Budget for it as retention
            infrastructure.
          </li>
          <li>
            <strong>The 90-day cliff is partly a billing artefact.</strong> First renewals concentrate involuntary
            failures: cards saved months earlier, promo prices unwinding, unfamiliar merchant descriptors triggering
            bank declines. A meaningful share of what gets reported as &quot;churn&quot; in month three is recoverable
            payment failure wearing churn&apos;s clothes, which is why DRR belongs in every churn conversation.
          </li>
        </ol>

        <h2>Recommendations</h2>

        <h3>Under roughly 500 members: rent, deliberately</h3>
        <p>
          At this scale fee drag is noise and your scarce resource is attention. Stay on Patreon or a Circle-class
          platform, but rent deliberately: keep an export of your member list, prefer platforms where the Stripe
          customer objects are yours, and instrument D90S from day one so the eventual decision is made with your own
          cohort data rather than industry averages.
        </p>

        <h3>500 to 5,000 members: rent the platform, own the billing</h3>
        <p>
          This is the band where the crossovers in Chart 1 start to bite, especially above a $10 price. A Stripe-first
          setup (Memberful, Ghost, or custom checkout in front of a rented community) keeps PFD in single digits and
          makes the eventual migration a re-skin rather than a rescue. This is also the point to get the dunning ladder
          and webhook reliability engineered properly; our{" "}
          <Link href="/services/stripe-billing-integration/">Stripe billing integration</Link> work most often lands
          here, where a two-point DRR improvement already outearns its invoice.
        </p>

        <p>
          One habit worth forming in this band: reconcile monthly. Billing events to application database to
          accounting, on a schedule, so that fee drag, failed-charge recovery and promo leakage are numbers you read
          rather than numbers you estimate. Every operator we have moved from estimate to export has found at least one
          surprise, and it has never once been a pleasant one.
        </p>

        <h3>Above 5,000 members, or any operator with $1M+ recurring: run the build math</h3>
        <p>
          Here the fee columns dominate and the edge cases multiply: combinatorial plans, store credit, cohort
          migrations, mixed payment rails. This is the territory our{" "}
          <Link href="/services/membership-subscriptions-development/">
            membership and subscriptions engineering
          </Link>{" "}
          practice exists for: audits and recoveries on WooCommerce Subscriptions, migrations between WCS, Stripe
          Billing, Zoho and Chargebee that preserve renewal cadence and payment methods, and the recovery layer that
          moves the funnel from 84 to 91. Whether the answer is a full build or an orchestration layer over Zoho, as at
          PlusHeat, the decision should come out of the PFD and DRR numbers, not out of a feature comparison.
        </p>

        <h2>Limitations</h2>

        <p>
          The renewal funnel is indexed from our own engagements, which skew toward operators with subscription
          edge-cases painful enough to hire us: selection bias likely flatters the recovery layer&apos;s headline. Fee
          figures are July 2026 snapshots and reprice frequently; the build cost band uses blended UK / India rates.
          The market-wide 90-day and community statistics are third-party and platform-reported, not independently
          audited by us. Chart 3 cardinalities are illustrative of the PlusHeat configurator&apos;s shape, not its
          exact catalogue. Client names appear where we have consent; everything else is anonymised.
        </p>

        <h2>The decision is a churn decision, not a feature decision</h2>

        <p>
          Strip the pricing pages away and build vs rent reduces to three numbers you can compute this week: your PFD
          at current and projected scale, your D90S measured on your own cohorts, and the DRR your current stack
          actually achieves. Rent while PFD is noise and community is unbuilt. Build, or take control of the billing
          layer, once fee drag crosses your amortised build cost or once the recovery gap between platform-default
          dunning and an engineered funnel is worth more than the engineering. The 90-day cliff is not weather; it is a
          measurable slope with known handholds.
        </p>

        <p>
          And when the decision does land on build, or on taking over an existing stack, treat the unglamorous layers
          as the product: idempotent migration tooling, a dunning ladder with gateway-aware copy, store credit that
          applies itself, reconciliation that closes in hours. Nothing in this post came from a feature launch. The 91%
          came from a mu-plugin, a retry table, and a COLLATE clause.
        </p>

        <p>Pair this model with the engineering guides and studies underneath it:</p>

        <RelatedGrid>
          <RelatedCard
            tag="Research"
            title="Stripe Webhooks End-to-End: Signature Verification, Idempotency, Replay, Dead-Letter"
            body="The five guarantees a production Stripe webhook handler has to give you: verification, idempotency, ordering, replay, observability, with TypeScript code and the SQL schema we ship."
            href="/blog/stripe-webhooks-end-to-end-2026/"
          />
          <RelatedCard
            tag="Research"
            title="WordPress Plugin Vulnerability Risk: A 217-Plugin Security Audit"
            body="Open with the incident response that started this report. 217 plugins audited across 14 categories with PVR / MFI / RAI scoring."
            href="/blog/wordpress-plugin-vulnerability-study-2026/"
          />
          <RelatedCard
            tag="Research"
            title="Per-Token Economics: What an AI Feature Actually Costs in Production (47 SaaS Sample)"
            body="Real per-MAU token cost data across 47 production AI SaaS products. CPMU by feature class, model-tier routing, and the unit-economic decision."
            href="/blog/ai-feature-token-economics-2026/"
          />
        </RelatedGrid>

        <p>And the engagements that do the work described in this post:</p>

        <RelatedGrid>
          <RelatedCard
            tag="Service"
            title="Membership &amp; Subscriptions Engineering"
            body="Subscription recovery, dunning, migrations, and combinatorial billing matrices for stores doing $1M+ in recurring revenue."
            href="/services/membership-subscriptions-development/"
          />
          <RelatedCard
            tag="Service"
            title="Stripe Billing Integration"
            body="Webhook reliability, metering, proration, dunning, tax, multi-currency, reconciliation. For teams already live on Stripe who need it right."
            href="/services/stripe-billing-integration/"
          />
          <RelatedCard
            tag="Service"
            title="WordPress Plugin Development"
            body="Custom plugins and mu-plugins with idempotency, audit logs and rollback paths, like the INSPIRELLE store-credit auto-apply."
            href="/services/wordpress-plugin-development/"
          />
        </RelatedGrid>

        <Faq items={FAQS} />

        <AuthorByline lastReviewedISO={MODIFIED_ISO}>
          Ritesh ran both INSPIRELLE incidents torn down at the top of this post, built the PlusHeat orchestration
          layer that maps a seven-dimension configurator onto Zoho Subscriptions, and delivered the Player Profile Hub
          video cost model. The renewal funnel numbers come from engagement records across billing implementations that
          have handled $5M in recurring revenue.
        </AuthorByline>
      </PostBody>

      <CtaBand />
    </>
  );
}
