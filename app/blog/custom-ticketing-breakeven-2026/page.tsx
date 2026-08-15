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

const PUBLISHED_ISO = "2026-08-18";
const MODIFIED_ISO = "2026-08-18";
const READ_TIME = "20 min read";

const PAGE_TITLE =
  "The Break-Even Ticket Volume: When Building Your Own Ticketing Beats Eventbrite's Fees | Appycodes";
const PAGE_DESCRIPTION =
  "One Ontick replatform anatomised, fee maths across 8 ticketing platforms, and the annual ticket volume where a custom Stripe build beats Eventbrite. EFR, BETV, IRR.";
const PAGE_PATH = "/blog/custom-ticketing-breakeven-2026/";
const PAGE_IMAGE = "/images/blog-custom-ticketing-breakeven-2026.jpg";
const PAGE_KEYWORDS =
  "custom ticketing platform, eventbrite fees, lowest fee ticketing platform, build your own ticketing system, ticketing platform costs, break even ticket volume, eventbrite alternative";

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
    q: "What is the lowest-fee ticketing platform in 2026?",
    a: "Of the eight platforms we priced, SimpleTix is the cheapest at roughly $1.19 all-in on a $20 ticket (6%), against Eventbrite Flex at about $3.11 (15.5%). A custom platform paying only Stripe processing costs about $0.88 (4.4%), but that only makes sense above the break-even volumes in this study.",
  },
  {
    q: "How much does it cost to build your own ticketing system?",
    a: "From our engagement data: roughly $45k for a lean web-only platform, $75k for a mid build with full organiser tooling, and $120k+ when a venue check-in app and a customer app are included. Add $9k to $22k per year for hosting, monitoring and maintenance. Amortised over three years, that annual cost is the number your fee savings have to beat.",
  },
  {
    q: "How do instalment ticket payments work?",
    a: "The platform stores a tokenised payment method with Stripe and orchestrates the schedule server-side, charging each instalment when due with an idempotency key derived from the booking id and the instalment index. On Ontick, the QR ticket is only minted once the final instalment settles, failed charges enter an automated retry schedule, and a daily cron reconciles the ledger against Stripe balance transactions.",
  },
  {
    q: "Can we run white-label ticketing on our own Stripe account?",
    a: "Yes, and it is the main structural advantage of owning the stack: revenue settles into your Stripe account minus processing fees only. For venue groups and promoter networks, Stripe Connect adds per-organiser payout routing, hold periods and dispute reserves on top of the same platform.",
  },
  {
    q: "Does the FTC Junk Fees Rule apply to our events?",
    a: "If you sell live-event tickets to US buyers, yes. Since May 12, 2025 the first price a buyer sees must include all mandatory fees, with civil penalties up to $51,744 per violation. It applies whether you sell through Eventbrite or your own platform; owning the stack simply makes all-in pricing easy, because the only fee line is Stripe processing.",
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
  breadcrumbLabel: "Custom Ticketing Break-Even",
  keywords: PAGE_KEYWORDS,
  faqs: FAQS,
});

export default function Page() {
  return (
    <>
      <JsonLd data={schemas} />

      <PostHeader
        eyebrow="Fee economics report"
        title="The break-even ticket volume: when building your own ticketing beats Eventbrite's fees"
        lead="The full anatomy of the Ontick replatform off Eventbrite, an 8-platform fee dataset, and a break-even model for the annual ticket volume where owning your ticketing stack beats renting it."
        breadcrumbLabel="Custom Ticketing Break-Even"
        dateISO={MODIFIED_ISO}
        readTime={READ_TIME}
        image={PAGE_IMAGE}
        imageAlt="Ontick custom ticketing platform: the Laravel booking surface behind Â£2M+ in sales"
      />

      <PostBody>
        <Callout variant="tldr">
          <ul>
            <li>
              <strong>
                The same $20 general-admission ticket costs $3.11 to sell on Eventbrite Flex (15.5%) and $0.88 on a
                custom Stripe-only stack (4.4%).
              </strong>{" "}
              The cheapest rented platform we priced, SimpleTix, sits between the two at $1.19.
            </li>
            <li>
              <strong>
                Break-Even Ticket Volume (BETV): a lean custom build pays for itself at roughly 10,800 tickets a year
                against Eventbrite-level fees, and roughly 33,300 against the cheapest rented platforms.
              </strong>{" "}
              Below those volumes, renting wins and we will tell you so.
            </li>
            <li>
              <strong>
                Ontick, the engagement this model comes from, has processed 230K+ tickets and Â£2M+ in sales since
                replatforming off Eventbrite,
              </strong>{" "}
              with platform commission now zero and Stripe processing the only per-ticket cost.
            </li>
          </ul>
        </Callout>

        <p>
          Every ticketing conversation we have starts the same way: an organiser looks at last season&apos;s platform
          fees, multiplies by next season&apos;s volume, and asks whether building their own stack would be cheaper.
          Sometimes the answer is yes and sometimes it is emphatically no, and the difference is a number you can
          compute. Before the aggregate, the anatomy of one specific replatform: Ontick, a UK events business that moved
          off Eventbrite onto a fully owned ticketing platform we built and still run.
        </p>

        <h2>Anatomy: Ontick, off Eventbrite onto an owned Laravel stack</h2>

        <p>
          <strong>The brief.</strong> Ontick came to us running their events on Eventbrite. The buyer experience was
          fine and the operational tooling was fine, but the commission Eventbrite took on every ticket was the largest
          fixed cost on the business. At the volume Ontick was already running, the percentage made a custom platform a
          clearly positive ROI decision rather than a vanity project. One feature was non-negotiable from day one:
          tickets had to be purchasable in instalments, with the QR codes released only after the final payment landed.
          That single requirement set the architectural agenda for everything that followed. The full write-up lives in
          the <Link href="/case-studies/ontick/">Ontick case study</Link>; the short version here is what matters for
          the fee maths.
        </p>

        <p>
          <strong>Stage 1, the platform.</strong> Built end-to-end on Laravel: the public booking surface, the
          organiser back-end, the super-admin back-end, and the REST API the mobile apps would later consume. One
          framework, one team, one deploy. The multi-organiser model was the most consequential architectural choice: a
          super admin creates organiser accounts, and each organiser manages their own events, ticket tiers, inventory
          and sale windows. The data model was designed for that from day one rather than retrofitted, which is where
          multi-tenant platforms usually accumulate compounding problems later, as our{" "}
          <Link href="/blog/multi-tenant-architecture-cost-study-2026/">multi-tenant architecture cost study</Link>{" "}
          covers in detail. The booking and instalment ledger sits in MySQL.
        </p>

        <p>
          <strong>Stage 2, the instalment engine.</strong> Stripe handles the actual capture; the platform stores
          tokenised payment methods and orchestrates the schedule server-side, calling Stripe when each instalment is
          due. The single most important business rule is enforced in code, not in policy: a booking can be paid down
          over months, but the QR ticket is only minted and emailed once the final instalment settles. Every charge
          carries a Stripe idempotency key derived from the booking id and the instalment index, so a retried request
          can never double-charge. Failed charges enter a retry schedule with backoff, and a daily reconciliation cron
          compares the platform&apos;s ledger to the Stripe balance transactions, so drift between the two systems is
          caught within a day rather than at year-end accounting.
        </p>

        <p>
          <strong>Stage 3, the check-in app.</strong> Door staff scan tickets with a React Native app built around one
          design constraint: speed at queue tempo. The app is offline-first; the full attendee list is cached at
          session start, scanning resolves locally, and the network round-trip to mark the attendee server-side happens
          in the background. The door operator never waits on the API, which means the queue never waits on the venue
          Wi-Fi. Bluetooth scanner support and role-scoped logins round it out: a staff member can only check in
          attendees for events they are assigned to.
        </p>

        <p>
          <strong>Stage 4, the customer app.</strong> A second React Native app gives buyers the whole booking
          experience in their pocket, and its commercial unlock is push messaging. Three flows that previously sat in
          email now run over push: upsell offers segmented by booking history, heads-up reminders before the next
          instalment is due, and failed-payment recovery, where a push lands within minutes of an instalment declining
          with a one-tap path back into the app to retry. Conversion on that channel is materially higher than the
          equivalent email sequence. The delivery engineering underneath is the same pattern from our{" "}
          <Link href="/blog/push-notifications-expo-fcm-apns-2026/">push notifications on Expo, FCM and APNs</Link>{" "}
          write-up.
        </p>

        <p>
          <strong>Where it stands.</strong> The stack is Laravel, Vue and MySQL on the web side with two React Native
          apps on top. Since launch the platform has processed 230K+ tickets and Â£2M+ in sales, at an average ticket
          value a little under Â£9. The per-ticket commission that drove the original brief now sits at zero; the only
          per-ticket cost is Stripe&apos;s processing fee. The engagement is ongoing: we run the platform day-to-day
          and own the observability and recovery flows.
        </p>

        <p>
          Ontick is the existence proof that the replatform can work: the commission line went to zero, the instalment
          engine sells tickets Eventbrite could not, and the platform has run for years without a payments incident.
          But an existence proof is not a recommendation. The question this study answers is when the same decision is
          right for you, because for most organisers, most of the time, it is not, and the honest way to answer it is
          with the fee data and a break-even formula rather than a sales call. The aggregate.
        </p>

        <h2>Methodology: pricing the same ticket on eight platforms</h2>

        <p>
          We priced an identical scenario on eight rented ticketing platforms plus a custom baseline: a $20
          general-admission ticket, one ticket per order, sold online with a card payment, using each platform&apos;s
          published self-serve pricing as of July 2026. Where a platform separates service fees from payment
          processing, we summed both; where processing is bundled, we used the bundled figure. We ignored negotiated
          enterprise rates (if you have the volume to negotiate, you also have the volume where this study says build)
          and we ignored free-event tiers, since fee economics on free tickets are moot. The custom baseline pays
          Stripe&apos;s standard published rate of 2.9% + $0.30 per successful card charge, per{" "}
          <a href="https://stripe.com/pricing" target="_blank" rel="noopener noreferrer">
            stripe.com/pricing
          </a>
          . We use US dollar pricing throughout the dataset because that is the currency the platforms publish;
          Ontick&apos;s own economics are in sterling, where UK card rates are lower still.
        </p>

        <p>
          Three computed metrics run through the findings: <strong>Effective Fee Rate (EFR)</strong>,{" "}
          <strong>Break-Even Ticket Volume (BETV)</strong> and <strong>Instalment Recovery Rate (IRR)</strong>, each
          defined in the metrics section below.
        </p>

        <h2>Finding 1: the same $20 ticket costs $0.88 to $3.11 to sell</h2>

        <DataChart
          title="Chart 1: All-in cost of selling a $20 ticket, 8 platforms plus a custom baseline"
          subtitle="Published fee schedules, service plus processing, single-ticket order. EFR = all-in fee / ticket price."
          sources="Sources: published pricing pages captured July 2026: eventbrite.com/organizer/pricing, universe.com/pricing, ticketleap.com/pricing, brownpapertickets.com, eventbee.com/pricing, tickettailor.com/pricing, ticketspice.com, simpletix.com/pricing, stripe.com/pricing; cross-checked against eventbritealternatives.com/blog/lowest-fee-ticketing-platform and eventcloud.io/blog/ticketing-platform-fees-compared-2026."
        >
          <table>
            <thead>
              <tr>
                <th>Platform</th>
                <th>Published fee schedule</th>
                <th>All-in fee on $20</th>
                <th>EFR</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Eventbrite (Flex)</td>
                <td>3.7% + $1.79 service + 2.9% processing</td>
                <td>$3.11</td>
                <td>15.5%</td>
              </tr>
              <tr>
                <td>Universe</td>
                <td>2.5% + $0.99 + 2.9% + $0.30 processing</td>
                <td>$2.37</td>
                <td>11.9%</td>
              </tr>
              <tr>
                <td>Ticketleap</td>
                <td>2% + $1.00 + 3% processing</td>
                <td>$2.30</td>
                <td>11.5%</td>
              </tr>
              <tr>
                <td>Brown Paper Tickets</td>
                <td>5% + $0.99, processing included</td>
                <td>$1.99</td>
                <td>10.0%</td>
              </tr>
              <tr>
                <td>Eventbee</td>
                <td>$1.00 flat + gateway (approx 2.9% + $0.30)</td>
                <td>$1.88</td>
                <td>9.4%</td>
              </tr>
              <tr>
                <td>Ticket Tailor (pay as you go)</td>
                <td>$0.75 per ticket + 2.9% + $0.30 Stripe</td>
                <td>$1.63</td>
                <td>8.2%</td>
              </tr>
              <tr>
                <td>TicketSpice</td>
                <td>$0.99 + 2.99% processing</td>
                <td>$1.59</td>
                <td>8.0%</td>
              </tr>
              <tr>
                <td>SimpleTix</td>
                <td>2% + $0.79</td>
                <td>$1.19</td>
                <td>6.0%</td>
              </tr>
              <tr>
                <td>Custom build (Stripe only)</td>
                <td>2.9% + $0.30</td>
                <td>$0.88</td>
                <td>4.4%</td>
              </tr>
            </tbody>
          </table>
        </DataChart>

        <p>
          The spread is 3.5x between the most and least expensive rented options, which is the first practical lesson
          of the dataset: most organisers agonising over build vs rent have not yet exhausted the cheaper rentals. On{" "}
          <a href="https://www.eventbrite.com/organizer/pricing/" target="_blank" rel="noopener noreferrer">
            Eventbrite&apos;s published Flex pricing
          </a>
          , the $20 ticket carries about $3.11 in fees, 15.5% of face value. SimpleTix does the same job for $1.19.
          Moving between rented platforms captures $1.92 of the $2.23 gap to custom, for zero build cost. The remaining
          $0.31 per ticket is what the custom build actually competes for on fees alone, which is why the honest
          break-even model has to include everything a custom platform costs, and everything beyond fees it earns.
        </p>

        <p>
          Two caveats cut in opposite directions. Flat per-ticket components hit cheap tickets hardest: on a $10
          ticket, Eventbrite&apos;s EFR climbs past 21% while percentage-only components stay flat. And multi-ticket
          orders amortise order-level processing fees but not per-ticket service fees, so a family of four buying
          together improves the custom baseline slightly more than it improves most rented platforms.
        </p>

        <h2>Finding 2: fee drag compounds brutally with volume</h2>

        <DataChart
          title="Chart 2: Annual fee drag at a $20 average ticket, three volume tiers"
          subtitle="All-in platform plus processing fees per year. Custom = Stripe processing only, before build and run costs."
          sources="Sources: fee schedules as Chart 1, applied at a $20 average ticket across 5,000 / 25,000 / 100,000 tickets per year."
        >
          <table>
            <thead>
              <tr>
                <th>Tickets / year</th>
                <th>Eventbrite (15.5%)</th>
                <th>TicketSpice (8.0%)</th>
                <th>SimpleTix (6.0%)</th>
                <th>Custom (4.4%)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>5,000</td>
                <td>$15,550</td>
                <td>$7,950</td>
                <td>$5,950</td>
                <td>$4,400</td>
              </tr>
              <tr>
                <td>25,000</td>
                <td>$77,750</td>
                <td>$39,750</td>
                <td>$29,750</td>
                <td>$22,000</td>
              </tr>
              <tr>
                <td>100,000</td>
                <td>$311,000</td>
                <td>$159,000</td>
                <td>$119,000</td>
                <td>$88,000</td>
              </tr>
            </tbody>
          </table>
        </DataChart>

        <p>
          At 5,000 tickets a year, the Eventbrite-to-custom gap is $11,150: real money, but far less than a custom
          platform costs to build and run, so the correct move at that volume is a cheaper rental, not a build. At
          25,000 tickets the gap is $55,750 a year, which starts to look like an engineering budget. At 100,000 tickets
          the gap is $223,000 a year, and the conversation inverts: the question is no longer whether you can afford to
          build, it is how you justify continuing to hand a six-figure line item to a platform whose job your team
          could own. Ontick&apos;s 230K+ lifetime tickets sit well past that inversion point, which is why the
          replatform paid for itself as quickly as it did even at an average ticket value under Â£9.
        </p>

        <h2>Finding 3: flat fees punish cheap tickets, percentages punish dear ones</h2>

        <p>
          The $20 basket hides a structural split in how the platforms charge. Reprice the same dataset at $10 and $50
          and the league table reshuffles. On a $10 ticket, Eventbrite&apos;s flat $1.79 service component drives the
          all-in fee to roughly $2.45, an EFR of 24.5%, while SimpleTix sits at $0.99 (9.9%) and the custom baseline at
          $0.59 (5.9%). On a $50 ticket the picture inverts: Eventbrite falls to a 10.2% EFR, and SimpleTix at $1.79
          (3.6%) lands within a rounding error of the custom baseline&apos;s $1.75 (3.5%). At high ticket values,
          percentage-light rentals converge on Stripe-only economics; at low ticket values, flat-fee-heavy platforms
          take a quarter of the face price.
        </p>

        <p>
          This is why average ticket value belongs in the break-even model as a first-class input rather than a
          footnote. Ontick&apos;s average sits a little under Â£9, exactly the territory where flat per-ticket fees bite
          hardest, which made the rented options structurally expensive for that business no matter which one it chose.
          A conference organiser selling $400 passes reads the same charts and reaches the opposite conclusion: their
          cheapest rental is already within a point of custom on fees, and their build case has to rest on
          capabilities, not fee arithmetic. Neither organiser is wrong; they are on opposite ends of the same curve.
        </p>

        <h2>The break-even model</h2>

        <p>
          The model is deliberately simple enough to run in a spreadsheet cell. A custom platform costs you an annual
          amount: the build cost amortised over three years plus the annual run cost. It saves you a per-ticket amount:
          the rented platform&apos;s all-in fee minus Stripe&apos;s processing fee at your average ticket value. Divide
          the first by the second and you have the annual ticket volume where the build breaks even. Three build
          scenarios from our engagement data: a lean web-only platform at $45k with a $9k annual run cost ($24k a year
          all-in), a mid build with full organiser tooling at $75k and $15k ($40k a year), and a full build with venue
          check-in and customer mobile apps at $120k and $24k ($64k a year). Against Eventbrite-level fees the saving
          is $2.23 per $20 ticket; against a 12% platform it is $1.52; against the 8% tier it is $0.72.
        </p>

        <DataChart
          title="Chart 3: Break-Even Ticket Volume (BETV) by build scenario and platform fee tier"
          subtitle="Annual tickets required for the custom build to beat the rented platform, $20 average ticket, 3-year amortisation."
          sources="Sources: build and run cost bands from Appycodes engagement data (2023 to 2026); fee schedules as Chart 1; savings per ticket of $2.23 / $1.52 / $0.72 vs the 15.5% / 12% / 8% tiers."
        >
          <table>
            <thead>
              <tr>
                <th>Build scenario (annual all-in cost)</th>
                <th>vs 15.5% platform</th>
                <th>vs 12% platform</th>
                <th>vs 8% platform</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Lean web build ($24k / yr)</td>
                <td>10,800</td>
                <td>15,800</td>
                <td>33,300</td>
              </tr>
              <tr>
                <td>Mid build ($40k / yr)</td>
                <td>17,900</td>
                <td>26,300</td>
                <td>55,600</td>
              </tr>
              <tr>
                <td>Full build, two mobile apps ($64k / yr)</td>
                <td>28,700</td>
                <td>42,100</td>
                <td>88,900</td>
              </tr>
            </tbody>
          </table>
        </DataChart>

        <p>
          Read the corners. Bottom-left is the trap: an organiser on a cheap rental commissioning a full two-app build
          needs nearly 90,000 tickets a year to win on fees alone, and almost nobody in that seat has them. Top-left is
          the sleeper: an organiser paying Eventbrite-level fees clears a lean build at 10,800 tickets a year, roughly
          900 a month, which is a single mid-sized venue running weekly events. The fee tier you are leaving matters
          more than the build you are buying, which is also why the first recommendation below is sometimes
          &quot;change rental&quot; rather than &quot;build&quot;.
        </p>

        <p>
          Two things the pure fee model undercounts, both in favour of building at the margin. First, capability
          revenue: Ontick&apos;s instalment engine is not an Eventbrite feature at any price, and tickets that can be
          paid down over months sell to buyers who would otherwise not buy at all. Second, the customer relationship:
          on a rented marketplace the buyer list, the remarketing surface and the checkout experience belong to the
          platform. Against that, renting buys you distribution and zero maintenance, and those are worth real money
          too. The model gives you the floor; the strategy question sits on top of it.
        </p>

        <h2>How we measure ticketing economics</h2>

        <h3>1. Effective Fee Rate (EFR)</h3>
        <Formula>EFR = Total platform + processing fees / Gross ticket sales</Formula>
        <p>
          The all-in percentage of face value lost to fees. Across our dataset EFR runs from 4.4% (custom, Stripe only)
          through 6.0% (SimpleTix) to 15.5% (Eventbrite Flex) on a $20 ticket. Compute it from your own settlement
          reports rather than the pricing page: absorbed fees, refunds and payment-method mix all move the real number.
        </p>

        <h3>2. Break-Even Ticket Volume (BETV)</h3>
        <Formula>BETV = (Build cost / 3 + Annual run cost) / ((Platform EFR - Custom EFR) x Average ticket value)</Formula>
        <p>
          The annual ticket volume where owning the stack beats renting it, amortising the build over three years.
          Chart 3 tabulates it across our three build scenarios. Sensitivity note: BETV falls fast as average ticket
          value rises, because percentage fees scale with price while Stripe&apos;s flat component does not.
        </p>

        <h3>3. Instalment Recovery Rate (IRR)</h3>
        <Formula>IRR = Declined instalments recovered within the retry window / Total declined instalments</Formula>
        <p>
          Not the finance textbook IRR. On an instalment platform, declined payments are routine rather than
          exceptional, and the recovery flow is a revenue feature. Ontick&apos;s push-first recovery, a notification
          within minutes of the decline plus an automated retry schedule with backoff, recovers roughly four in five
          declined instalments without a human touching the booking; treat that figure as directional, but the design
          target it implies (IRR above 80%) is the difference between instalments as a growth lever and instalments as
          a support queue.
        </p>

        <h2>The engineering that earns the lower fee rate</h2>

        <p>
          The 4.4% EFR is only real if the platform underneath is boring in production, and payments is where custom
          ticketing builds go wrong. The Ontick instalment engine ships five guarantees: Stripe performs every capture
          against tokenised payment methods; QR tickets are held until the final instalment settles; every payment
          touchpoint is idempotent; failed payments recover automatically; and a daily reconciliation cron compares the
          platform ledger to Stripe&apos;s balance transactions so the two systems cannot silently drift. Beyond
          idempotency keys there are defensive layers: booking-level locks during a payment attempt, and a guard on the
          webhook side that refuses to mark a booking paid past its total. The full pattern, signature verification
          through dead-letter queues, is in our{" "}
          <Link href="/blog/stripe-webhooks-end-to-end-2026/">Stripe webhooks reference architecture</Link>; the piece
          worth reproducing here is the claim-before-work insert that makes duplicate webhook deliveries harmless.
        </p>

        <CodeBlock language="sql" caption="Claim-before-work: the idempotent webhook insert (MySQL)">
{`-- stripe_events claims each webhook delivery exactly once.
-- The PRIMARY KEY on event_id is the lock.
CREATE TABLE stripe_events (
  event_id         VARCHAR(255) NOT NULL PRIMARY KEY,
  event_type       VARCHAR(64)  NOT NULL,
  booking_id       BIGINT UNSIGNED NULL,
  instalment_index TINYINT UNSIGNED NULL,
  payload          JSON NOT NULL,
  received_at      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Handler, step 1: claim the event before doing any work.
INSERT IGNORE INTO stripe_events
  (event_id, event_type, booking_id, instalment_index, payload)
VALUES
  (:event_id, :event_type, :booking_id, :instalment_index, :payload);

-- ROW_COUNT() = 0 means Stripe has delivered this event before:
-- acknowledge with a 200 and stop. Exactly one state change per
-- event, no matter how many times it arrives.`}
        </CodeBlock>

        <p>
          The outbound side mirrors it: each charge request carries a Stripe idempotency key derived from the booking
          id and the instalment index, something like <code>booking-4812-instalment-3</code>, so a timeout-and-retry
          can never produce a second charge for the same instalment. Between the inbound insert and the outbound key,
          the reconciliation cron becomes a verification step rather than a repair job; in production on Ontick, none
          of these guarantees has generated a real-world incident to date. This is the layer our{" "}
          <Link href="/services/stripe-billing-integration/">Stripe billing integration</Link> engagement exists to
          build, and it is the part of a ticketing platform we would never let a team improvise.
        </p>

        <h2>The regulatory hook: all-in pricing changes the fee game</h2>

        <p>
          The fee conversation stopped being purely commercial in 2025. The FTC&apos;s Rule on Unfair or Deceptive
          Fees, the Junk Fees Rule,{" "}
          <a
            href="https://www.ftc.gov/news-events/news/press-releases/2025/05/ftc-rule-unfair-or-deceptive-fees-take-effect-may-12-2025"
            target="_blank"
            rel="noopener noreferrer"
          >
            took effect on May 12, 2025
          </a>
          , and it names live-event ticketing explicitly: the first price a buyer sees must include all mandatory fees,
          itemised before payment, with civil penalties up to $51,744 per violation. Then in September 2025 the FTC and
          seven state attorneys general sued Live Nation and Ticketmaster over ticketing practices, the loudest
          possible signal that enforcement in this market is not theoretical.{" "}
          <a
            href="https://www.jcainc.com/understanding-the-ftcs-junk-fees-rule-implications-for-live-event-ticketing/"
            target="_blank"
            rel="noopener noreferrer"
          >
            JCA&apos;s analysis of the rule&apos;s implications for live-event ticketing
          </a>{" "}
          is the best practitioner summary we have read.
        </p>

        <p>
          The second-order effect matters for the build-vs-rent maths. Drip pricing let high-fee platforms hide the fee
          until the buyer was committed; all-in pricing puts the full freight in the advertised price, where it
          suppresses conversion and where your buyers now compare it against competitors&apos; all-in prices. A 15.5%
          fee you could once bury is now a 15.5% price disadvantage on the first screen. Organisers on owned stacks get
          the mirror-image benefit: with Stripe processing as the only fee line, the all-in price and the face price
          are nearly the same number, which is both trivially compliant and quietly persuasive. We do not build
          platforms to arbitrage regulation, but when the law pushes the market toward honest pricing, the stack with
          the lowest honest price wins.
        </p>

        <h2>What a custom platform costs to run</h2>

        <p>
          Build cost gets all the attention, but the run cost is what the amortisation model actually feeds on, and it
          is the number owners most often underestimate to zero. The band below is what a platform in Ontick&apos;s
          shape costs to keep in production, from our own invoices and infrastructure bills. The single biggest line is
          the maintenance retainer: dependency bumps, framework upgrades, Stripe API version migrations, app-store
          resubmissions and the steady trickle of small features that keep a live platform competitive.
        </p>

        <TableScroll>
          <table>
            <thead>
              <tr>
                <th>Line item</th>
                <th>Monthly</th>
                <th>Annual</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Managed VPS hosting: web, queue workers, MySQL</td>
                <td>$180</td>
                <td>$2,160</td>
              </tr>
              <tr>
                <td>Backups, uptime monitoring, error tracking</td>
                <td>$60</td>
                <td>$720</td>
              </tr>
              <tr>
                <td>Transactional email: tickets, receipts, schedule reminders</td>
                <td>$50</td>
                <td>$600</td>
              </tr>
              <tr>
                <td>Apple Developer Program + Google Play accounts</td>
                <td>$10</td>
                <td>$124</td>
              </tr>
              <tr>
                <td>Maintenance retainer: patches, upgrades, small features</td>
                <td>$500 to $1,500</td>
                <td>$6,000 to $18,000</td>
              </tr>
              <tr>
                <td>
                  <strong>Total</strong>
                </td>
                <td></td>
                <td>
                  <strong>$9,600 to $21,600</strong>
                </td>
              </tr>
            </tbody>
          </table>
        </TableScroll>

        <p>
          Note what is absent: per-ticket cost. Everything in the table is fixed against volume, which is the whole
          economic point. A rented platform&apos;s fees scale linearly with your success; a custom platform&apos;s
          costs are a flat line that ticket volume amortises further with every event. That asymmetry is why BETV is a
          threshold rather than a trade-off: below it the flat line looms over your fee savings, above it every
          additional ticket widens the gap in your favour.
        </p>

        <h2>Recommendations</h2>

        <h3>Under roughly 10,000 tickets a year: rent, but rent cheaply</h3>
        <p>
          No custom build clears break-even at this volume, including ours, and we say so on the{" "}
          <Link href="/services/event-ticketing-platform-development/">
            event ticketing platform development
          </Link>{" "}
          page itself: Eventbrite is fine for 95% of events. The actionable move is inside the rental market. Shifting
          the same 5,000 tickets from Eventbrite&apos;s 15.5% to SimpleTix, TicketSpice or Ticket Tailor saves $8,000
          to $9,600 a year for an afternoon of setup, capturing most of the custom gap with none of the cost. Revisit
          the maths when volume, instalments or white-label requirements change.
        </p>

        <h3>10,000 to 50,000 tickets a year: the break-even band, model it properly</h3>
        <p>
          This is where the decision genuinely swings on your specifics: average ticket value, the fee tier you are
          leaving, and whether you need capabilities the rentals cannot price, instalment payments and white-label
          multi-organiser operation being the two we see most. Run BETV with your own numbers before any scoping call,
          ours included. If the model clears, a lean web-first build is the right first phase: the fee savings start
          the amortisation clock, and the mobile apps can follow once the platform proves itself, exactly the sequence
          Ontick ran. Two scoping rules from that engagement. First, the payments layer is where the budget should
          concentrate; it is the difference between the{" "}
          <Link href="/services/stripe-billing-integration/">billing engineering</Link> being an asset and being the
          reason you phone us mid-season. Second, treat the door as a launch feature, not a fast-follow: an
          offline-first check-in path has to exist before your first event on the new platform, because the venue
          Wi-Fi will fail on the one night it matters most.
        </p>

        <h3>Above 50,000 tickets a year: owning the stack is the default</h3>
        <p>
          At this volume even the full two-app build clears break-even against every fee tier in Chart 3, and the
          annual fee drag on a rented platform is a six-figure line item that compounds with growth. The burden of
          proof flips: the question is what specifically justifies staying rented, and &quot;marketplace
          discovery&quot; is the only answer we find regularly persuasive. The stack we ship for this shape is the
          Ontick stack, <Link href="/services/laravel-development/">Laravel</Link> underneath, Vue on the booking
          surface, MySQL for the ledger, React Native at the door and in the buyer&apos;s pocket, because it is the
          one we have run at 230K+ tickets without the payments layer generating an incident.
        </p>

        <h2>Limitations</h2>
        <p>
          Fee schedules were captured in July 2026 from public pricing pages and change without notice; treat Chart 1
          as a snapshot, not a contract. The $20 single-ticket basket is a simplification: multi-ticket orders,
          absorbed vs passed-on fees, and cheaper UK and EU card rates all move EFR by tenths of a point in either
          direction. Build and run cost bands use blended UK and India engineering rates from our own engagements and
          will not match Bay Area agency quotes. The anatomy is a single engagement, and Ontick&apos;s instalment-led
          model flatters the case for custom; the IRR figure is directional. The model also prices distribution at
          zero: if a marketplace genuinely fills your events, that is worth real money the spreadsheet does not see.
        </p>

        <h2>The decision, compressed</h2>
        <p>
          Renting ticketing costs 6% to 15.5% of every ticket forever; owning it costs a fixed annual amount plus 4.4%
          to Stripe. BETV is the volume where the lines cross: about 10,800 tickets a year for a lean build leaving
          Eventbrite-level fees, about 88,900 for a full build leaving the cheapest rentals, and your real number sits
          somewhere between, one spreadsheet cell away. Below it, change rentals and bank most of the saving. Above
          it, the fee line becomes an engineering budget with a payback date, and the capabilities that come with
          ownership, instalments, white-label, the customer relationship, are the compounding upside the fee model
          never captures.
        </p>

        <p>
          The payments engineering this study leans on, and the architecture decisions underneath it, in the companion
          research:
        </p>

        <RelatedGrid>
          <RelatedCard
            tag="Research"
            title="Stripe Webhooks End-to-End: Signature Verification, Idempotency, Replay, Dead-Letter"
            body="The five guarantees a production Stripe webhook handler has to give you, with TypeScript code and the SQL schema we ship."
            href="/blog/stripe-webhooks-end-to-end-2026/"
          />
          <RelatedCard
            tag="Research"
            title="Push Notifications on Expo + FCM + APNs: The Setup That Actually Delivers"
            body="Token registration, delivery measurement, and the 12 failure modes we see most often when delivery rates drop."
            href="/blog/push-notifications-expo-fcm-apns-2026/"
          />
          <RelatedCard
            tag="Research"
            title="The Multi-Tenant SaaS Architecture Decision: Cost &amp; Engineering Hours Across 4 Patterns"
            body="Per-pattern cost, isolation, and onboarding eng-hours for the four common multi-tenancy approaches. TIC, AOC, BCM metrics."
            href="/blog/multi-tenant-architecture-cost-study-2026/"
          />
        </RelatedGrid>

        <p>The engagements that build and run a platform in this shape:</p>

        <RelatedGrid>
          <RelatedCard
            tag="Service"
            title="Event Ticketing Platform Development"
            body="Custom ticketing platforms, white-label venue groups, and offline-first door-staff apps. The Ontick engagement runs through this service."
            href="/services/event-ticketing-platform-development/"
          />
          <RelatedCard
            tag="Service"
            title="Stripe Billing Integration"
            body="Instalments, Connect-style payouts, idempotent webhooks and reconciliation: the payments engineering underneath a ticketing stack."
            href="/services/stripe-billing-integration/"
          />
          <RelatedCard
            tag="Service"
            title="Laravel Development"
            body="The backend Ontick runs on: booking surfaces, queue workers, scheduled reconciliation, one deploy."
            href="/services/laravel-development/"
          />
        </RelatedGrid>

        <Faq items={FAQS} />

        <AuthorByline lastReviewedISO={MODIFIED_ISO}>
          Ritesh has run the Ontick engagement end-to-end since the original Eventbrite replatform brief: the Laravel
          platform, the Stripe instalment engine, and both React Native apps, through 230K+ tickets and Â£2M+ in sales.
          The fee dataset was compiled in July 2026 from the platforms&apos; published pricing pages, and the build and
          run cost bands come from Appycodes engagement records.
        </AuthorByline>
      </PostBody>

      <CtaBand />
    </>
  );
}
