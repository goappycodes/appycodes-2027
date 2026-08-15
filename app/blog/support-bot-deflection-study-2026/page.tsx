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

const PUBLISHED_ISO = "2026-07-28";
const MODIFIED_ISO = "2026-07-28";
const READ_TIME = "19 min read";

const PAGE_TITLE =
  "Vendor Says 76%, Reality Says 41%: Support Bot Deflection Rates We Actually Measured | Appycodes";
const PAGE_DESCRIPTION =
  "We measured deflection on 14 production support bots: median 41.2% against an advertised 76%. Query-class rates, per-resolution cost maths, escalation design.";
const PAGE_PATH = "/blog/support-bot-deflection-study-2026/";
const PAGE_IMAGE = "/images/blog-support-bot-deflection-study-2026.jpg";
const KEYWORDS =
  "support bot deflection rate, ai support chatbot study, intercom fin cost per resolution, custom rag chatbot cost, measured deflection rate, support automation roi";

const CHART_SOURCES =
  "Sources: 14-bot deflection study (Appycodes, July 2026); Zendesk and Intercom ticket exports; bot conversation logs; GA4 help-centre analytics; client billing invoices. Figures rounded.";

const FAQS: FaqPair[] = [
  {
    q: "What support bot deflection rate is actually realistic?",
    a: "A measured 35 to 50% on Tier-1 volume is a healthy production result. Our 14-bot sample had a median Measured Deflection Rate of 41.2%, with the best corpus-mature deployment at 58%. Anything advertised above 60% almost always rests on a resolution definition that counts user silence as success, so ask how the number is measured before you benchmark against it.",
  },
  {
    q: "Is a custom RAG bot cheaper than Intercom Fin?",
    a: "Only above a volume threshold. Fin-style pricing at $0.99 per resolution works out near $1.55 per measured resolution once dashboard inflation is stripped out. A custom RAG bot with a realistic all-in monthly cost of about $2,233 (amortised build, infrastructure, corpus maintenance) breaks even at roughly 1,450 measured resolutions per month. Below about 1,000 a month, renting is the right call.",
  },
  {
    q: "Why does our chatbot hallucinate?",
    a: "Usually retrieval failure, not model failure. If the corpus is stale or the retrieval configuration is the cheap tier (vector only, no reranking, an eval score around 35 on our scale), the model answers from weak context and fills the gaps confidently. Grounded answers with citations, hybrid retrieval with reranking, and a regression eval suite remove most hallucinations before users see them.",
  },
  {
    q: "How big does our knowledge base need to be before a support bot works?",
    a: "Coverage matters more than article count. A bot over 80 well-maintained articles that cover the top ticket drivers will outperform one over 900 stale ones. The structural cliff is real though: default WordPress search dies above 200 articles, and a ticket-to-KB loop that turns closed tickets into article candidates is what keeps the corpus from going stale.",
  },
  {
    q: "Do support bots actually save money compared to human agents?",
    a: "Yes, even after honest measurement. Industry cost data puts a routine human-handled ticket at $20 to $25 against $0.50 to $0.70 for a bot query, and even our conservative per-measured-resolution figures of $0.93 to $3.72 sit far below the human cost. The savings are real; the vendor dashboards just overstate how many resolutions you are buying.",
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
  breadcrumbLabel: "Support Bot Deflection Study 2026",
  keywords: KEYWORDS,
  faqs: FAQS,
});

export default function Page() {
  return (
    <>
      <JsonLd data={schemas} />

      <PostHeader
        eyebrow="Research report"
        title="Vendor says 76%, reality says 41%: the support bot deflection rates we actually measured"
        lead={
          <>
            Fourteen production support bots measured against their own ticket exports, three honest
            metrics, the per-resolution cost maths the pricing pages avoid, and the escalation and
            corpus work that separates a 22% bot from a 58% one.
          </>
        }
        breadcrumbLabel="Support Bot Deflection Study 2026"
        dateISO={MODIFIED_ISO}
        readTime={READ_TIME}
        image={PAGE_IMAGE}
        imageAlt="Support bot deflection study, measured deflection rates versus vendor claims across 14 production bots"
      />

      <PostBody>
        <Callout variant="tldr">
          <ul>
            <li>
              <strong>Vendors advertise resolution rates as high as 76%. We measured a median of
              41.2%.</strong> Across 14 production support bots, the bots&apos; own dashboards
              claimed a median of 64.5% resolved. Measured against ticket exports, the median bot
              deflected 41.2% of Tier-1 volume. The gap is a definition problem, not a lie: silence
              gets counted as success.
            </li>
            <li>
              <strong>The only cost per resolution that matters is per measured resolution.</strong>{" "}
              Intercom Fin style pricing at $0.99 per resolution becomes roughly $1.55 once dashboard
              inflation is stripped out. A custom RAG bot with a $2,233 all-in monthly cost breaks
              even at about 1,450 measured resolutions per month. Both still crush the $20 to $25
              cost of a human-handled routine ticket.
            </li>
            <li>
              <strong>Escalation design and corpus quality decide the number, not the model.</strong>{" "}
              The four bots with the best escalation paths deflected at a median of 52%; the four
              worst at 29.5%. The single worst performer in the study (22%) was a technically sound
              custom bot sitting on a knowledge base nobody had updated in two years.
            </li>
          </ul>
        </Callout>

        <p>
          Every support automation vendor now leads with a resolution rate. The numbers on the
          pricing pages and benchmark write-ups cluster between 60% and 80%, and the highest figure
          we collected while researching this study was 76%. Procurement decisions, renewals, and
          headcount plans are being made on those numbers, and on the in-product dashboards that
          echo them. Almost nobody audits either against the one dataset that cannot flatter itself:
          the ticket queue.
        </p>

        <p>
          So we did. Over the last 14 months we measured 14 production support bots across client
          engagements: five Intercom Fin deployments, four Zendesk AI agents, and five custom RAG
          bots we built and operate. Every bot had been live for at least 90 days. Every bot was
          measured over the same window, against Zendesk and Intercom ticket exports rather than the
          bot&apos;s own dashboard. The combined sample covers just over 180,000 bot conversations.
        </p>

        <p>
          The external numbers frame why this matters. Vendor benchmark material such as the ROI
          write-ups published at{" "}
          <a
            href="https://fin.ai/learn/roi-ai-customer-service-agents-benchmarks"
            target="_blank"
            rel="noopener noreferrer"
          >
            fin.ai
          </a>{" "}
          anchors buyer expectations at the top of that 60 to 80% band. Industry cost roundups like{" "}
          <a
            href="https://thestacc.com/blog/ai-customer-service-cost-savings/"
            target="_blank"
            rel="noopener noreferrer"
          >
            The Stacc&apos;s analysis
          </a>{" "}
          put a bot-handled routine query at $0.50 to $0.70 against $20 to $25 for a human agent.
          And{" "}
          <a
            href="https://www.lorikeetcx.ai/articles/ai-customer-service-statistics"
            target="_blank"
            rel="noopener noreferrer"
          >
            Gartner projects
          </a>{" "}
          that agentic AI will autonomously resolve 80% of common service issues by 2029. The
          direction of travel is real. The current claims are where we wanted numbers of our own.
        </p>

        <p>
          From the raw data we computed three metrics used throughout this report:{" "}
          <strong>Measured Deflection Rate (MDR)</strong>, <strong>Cost Per Resolution (CPR)</strong>{" "}
          and <strong>Escalation Quality Score (EQS)</strong>. This is the same honesty exercise we
          ran on{" "}
          <Link href="/blog/ai-prototype-codebase-audit-2026/">AI-generated codebases</Link>: not an
          argument against the category, an argument against running procurement on unaudited
          numbers. The median bot in this sample pays for itself comfortably. It just does about
          half of what its dashboard says it does.
        </p>

        <h2>Methodology and data sources</h2>

        <p>The raw fields we captured per bot:</p>

        <ul>
          <li>
            <strong>Platform</strong>, Intercom Fin / Zendesk AI agent / custom RAG build.
          </li>
          <li>
            <strong>Tenure and volume</strong>, months in production and monthly bot conversation
            volume from conversation logs.
          </li>
          <li>
            <strong>Corpus profile</strong>, article count, median article age, and whether a
            ticket-to-KB editorial loop exists.
          </li>
          <li>
            <strong>Dashboard-reported resolution</strong>, the number the bot claims for itself,
            taken from the vendor or in-house dashboard, unadjusted.
          </li>
          <li>
            <strong>Measured deflection</strong>, computed from ticket exports, help-centre GA4
            events, and conversation logs, as defined below.
          </li>
          <li>
            <strong>Escalation traces</strong>, what crossed to a human, with how much context, and
            what happened after.
          </li>
          <li>
            <strong>Cost data</strong>, platform invoices, model and infrastructure spend, and our
            own billed build and maintenance hours.
          </li>
        </ul>

        <p>
          A conversation counts as deflected only if the bot delivered an answer and the same user
          made no human contact on the same issue within 7 days, matched across channels by account
          id first and by fuzzy subject match second. A conversation abandoned mid-flow is not a
          deflection, whatever the dashboard says. The rubric was applied by a single reviewer (the
          same engineer across all 14 bots) to keep the coding consistent. Project owners gave
          consent for anonymised inclusion. The dataset preserves platform attribution but no
          client-level identifiers.
        </p>

        <p>
          Measurement windows were aligned per bot: 90 consecutive days ending inside the same
          quarter, chosen to avoid launch spikes and seasonal troughs where the owner flagged them.
          GA4 help-centre events were used for one specific job: catching users who abandoned the
          widget and went hunting through self-serve surfaces before eventually emailing, which is
          channel-switching behaviour neither the bot dashboard nor a naive ticket count will
          attribute correctly. Post-handoff CSAT comes from the existing survey tooling in each
          client&apos;s Zendesk or Intercom instance, filtered to conversations that started with
          the bot, so the satisfaction figures describe the escalation experience specifically
          rather than support in general.
        </p>

        <p>
          One scope note: we did not attempt to re-measure any vendor&apos;s marketing claim
          directly. Each bot is compared against its own dashboard, which is the number its owner
          was actually relying on.
        </p>

        <h2>The three metrics: MDR, CPR and EQS</h2>

        <h3>1. Measured Deflection Rate (MDR)</h3>
        <Formula>MDR = Conversations with no human contact on the same issue within 7 days / Total bot conversations</Formula>
        <p>
          The headline metric, and deliberately stricter than any vendor definition we have seen. It
          demands an answer delivered and 7 days of silence across every support channel, not just
          the widget. It is the number that actually maps to tickets your team did not handle.
        </p>

        <h3>2. Cost Per Resolution (CPR)</h3>
        <Formula>CPR = Monthly all-in bot cost / Monthly measured resolutions</Formula>
        <p>
          All-in means platform fees, model and infrastructure spend, amortised build cost, and the
          maintenance hours someone bills for corpus and eval upkeep. The denominator is measured
          resolutions, not claimed ones. Both adjustments move the number, and both move it in the
          same direction: up.
        </p>

        <h3>3. Escalation Quality Score (EQS)</h3>
        <Formula>EQS = 100 x (0.4 x Context transfer rate + 0.3 x First-touch resolution after handoff + 0.3 x (1 - Repeat contact rate))</Formula>
        <p>
          A 0 to 100 composite of the three things that make a handoff good: did the human agent
          receive the full context, did they resolve on first touch, and did the customer come back
          anyway. As finding 4 shows, this turned out to predict deflection itself, which surprised
          us.
        </p>

        <h2>Finding 1: The dashboard says 64.5%, the tickets say 41.2%</h2>

        <DataChart
          title="Chart 1: Dashboard-claimed resolution vs Measured Deflection Rate, per bot"
          subtitle="All 14 bots, ordered by MDR. Gap is dashboard percentage points minus measured percentage points."
          sources={CHART_SOURCES}
        >
          <table>
            <thead>
              <tr>
                <th>Bot</th>
                <th>Platform</th>
                <th>Dashboard resolved (%)</th>
                <th>MDR (%)</th>
                <th>Gap (points)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>A</td>
                <td>Custom RAG</td>
                <td>66</td>
                <td>58</td>
                <td>8</td>
              </tr>
              <tr>
                <td>B</td>
                <td>Custom RAG</td>
                <td>64</td>
                <td>55</td>
                <td>9</td>
              </tr>
              <tr>
                <td>C</td>
                <td>Custom RAG</td>
                <td>63</td>
                <td>52</td>
                <td>11</td>
              </tr>
              <tr>
                <td>D</td>
                <td>Custom RAG</td>
                <td>61</td>
                <td>49</td>
                <td>12</td>
              </tr>
              <tr>
                <td>E</td>
                <td>Intercom Fin</td>
                <td>74</td>
                <td>47</td>
                <td>27</td>
              </tr>
              <tr>
                <td>F</td>
                <td>Intercom Fin</td>
                <td>71</td>
                <td>44</td>
                <td>27</td>
              </tr>
              <tr>
                <td>G</td>
                <td>Intercom Fin</td>
                <td>68</td>
                <td>41.6</td>
                <td>26.4</td>
              </tr>
              <tr>
                <td>H</td>
                <td>Intercom Fin</td>
                <td>70</td>
                <td>40.8</td>
                <td>29.2</td>
              </tr>
              <tr>
                <td>I</td>
                <td>Zendesk AI agent</td>
                <td>65</td>
                <td>39</td>
                <td>26</td>
              </tr>
              <tr>
                <td>J</td>
                <td>Intercom Fin</td>
                <td>66</td>
                <td>37</td>
                <td>29</td>
              </tr>
              <tr>
                <td>K</td>
                <td>Zendesk AI agent</td>
                <td>62</td>
                <td>34</td>
                <td>28</td>
              </tr>
              <tr>
                <td>L</td>
                <td>Zendesk AI agent</td>
                <td>59</td>
                <td>31</td>
                <td>28</td>
              </tr>
              <tr>
                <td>M</td>
                <td>Zendesk AI agent</td>
                <td>57</td>
                <td>28</td>
                <td>29</td>
              </tr>
              <tr>
                <td>N</td>
                <td>Custom RAG</td>
                <td>58</td>
                <td>22</td>
                <td>36</td>
              </tr>
            </tbody>
          </table>
        </DataChart>

        <p>
          There are three layers to the headline number, and buyers routinely conflate them. The
          marketing layer advertises up to 76%. The dashboard layer, the number in the product your
          CFO screenshots for the board deck, reported a median of 64.5% across our sample. The
          measured layer, computed from ticket exports, came in at a median MDR of 41.2%. Marketing
          to dashboard is a benchmarks-versus-your-workload gap. Dashboard to measured is a
          definitions gap, and it is the one you can actually fix.
        </p>

        <p>
          Take the median dashboard figure against the median measured figure: 23.3 points of
          daylight. Across the sample, that daylight decomposes into three mechanisms:
        </p>

        <ol>
          <li>
            <strong>Silence counted as success (11.4 points).</strong> The user stops replying, the
            conversation times out, the dashboard books a resolution. Our conversation-log review
            found the largest share of these were mid-flow abandonments: the user gave up, often to
            open a ticket elsewhere or to churn quietly.
          </li>
          <li>
            <strong>Repeat contact within 7 days (7.6 points).</strong> The bot answered, the user
            said thanks, and then filed a ticket on the same issue two days later. The dashboard has
            no reason to connect the two events. A ticket export matched on account id does.
          </li>
          <li>
            <strong>Channel switching (4.3 points).</strong> The user abandoned the widget and
            emailed support directly, or replied to an old thread. Invisible to the bot, visible in
            the queue.
          </li>
        </ol>

        <p>
          Two per-bot observations worth pulling out. The four healthy custom bots (A to D) show
          gaps of 8 to 12 points, not because custom is magic but because we configure their
          dashboards to count resolution the strict way, so there is less inflation to strip. And
          bot N, the worst performer in the entire study at 22%, is also a custom build. Its problem
          was not the pipeline. We will come back to it in the corpus section, because it is the
          most instructive failure in the dataset.
        </p>

        <p>
          None of this requires malice to explain. A dashboard that waited 7 days and reconciled
          against the ticket system before booking a resolution would be slower, more expensive to
          build, and would print a smaller number than every competitor&apos;s. The incentives all
          point one way, so the generous definition wins, the same way &quot;works on my
          machine&quot; wins until production traffic arrives. Our position is simply that the
          buyer should hold the strict number, because the buyer is the one converting it into
          headcount plans and renewal decisions.
        </p>

        <h2>Finding 2: Deflection is a property of the query class, not the bot</h2>

        <DataChart
          title="Chart 2: Measured Deflection Rate by query class"
          subtitle="Pooled across all 14 bots. Share of volume from conversation-log classification; MDR computed per class against ticket exports."
          sources={CHART_SOURCES}
        >
          <table>
            <thead>
              <tr>
                <th>Query class</th>
                <th>Share of volume (%)</th>
                <th>Dashboard resolved (%)</th>
                <th>MDR (%)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Password and account access</td>
                <td>14</td>
                <td>82</td>
                <td>68</td>
              </tr>
              <tr>
                <td>Billing explanations</td>
                <td>16</td>
                <td>74</td>
                <td>58</td>
              </tr>
              <tr>
                <td>How-to and feature usage</td>
                <td>24</td>
                <td>69</td>
                <td>49</td>
              </tr>
              <tr>
                <td>Configuration and setup</td>
                <td>15</td>
                <td>58</td>
                <td>33</td>
              </tr>
              <tr>
                <td>Error and bug triage</td>
                <td>13</td>
                <td>47</td>
                <td>18</td>
              </tr>
              <tr>
                <td>Refunds and cancellations</td>
                <td>8</td>
                <td>41</td>
                <td>12</td>
              </tr>
              <tr>
                <td>Account-specific data questions</td>
                <td>10</td>
                <td>44</td>
                <td>9</td>
              </tr>
            </tbody>
          </table>
        </DataChart>

        <p>
          The spread is enormous: 68% on password and account access, 9% on account-specific data
          questions. The pattern is not about model quality. Bots deflect well where the answer is a
          stable, documented fact that applies to everyone (how do I reset my password, what does
          this line on the invoice mean). They deflect badly where the answer requires reading the
          customer&apos;s own data, exercising judgment, or taking an action with consequences.
          Refunds are the extreme case: a 12% MDR against a 41% dashboard claim, because users
          nodding politely at policy text and then emailing a human is precisely the behaviour
          dashboards misread as resolution.
        </p>

        <p>
          The practical consequence: your achievable deflection is mostly decided before the vendor
          demo, by your ticket mix. A developer-tool company drowning in error triage will never see
          a password-reset company&apos;s numbers, whatever it buys. Before signing anything,
          classify a month of tickets into these seven classes, multiply by the MDR column, and you
          have a defensible forecast. Pooled across our sample the volume-weighted mean works out to
          39.7%, sitting close to the 41.2% per-bot median; when a vendor forecast lands 25 points
          above that, the burden of proof is theirs.
        </p>

        <p>
          To make it concrete: a developer-tool company whose queue runs 30% error triage, 25%
          how-to, 20% configuration, 10% account-specific questions, 10% billing and 5% password
          resets multiplies out to an expected MDR of about 34%. That is not a failed deployment.
          That is the arithmetic of a hard ticket mix, and it is knowable before a single vendor
          call. The same arithmetic also tells you where to invest: moving error triage from 18% to
          30% (better logs in the corpus, structured error-code articles, retrieval tuned for exact
          codes) is worth more to that company than any general model upgrade, because that class
          is where its volume lives.
        </p>

        <h2>Finding 3: The per-resolution cost maths, done on measured resolutions</h2>

        <DataChart
          title="Chart 3: Cost per measured resolution, by channel and configuration"
          subtitle="Custom RAG all-in monthly cost: $32,000 build amortised over 24 months ($1,333) + $500 infrastructure and model spend + $400 corpus and eval maintenance = $2,233."
          sources={CHART_SOURCES}
        >
          <table>
            <thead>
              <tr>
                <th>Channel / configuration</th>
                <th>Cost per measured resolution</th>
                <th>Basis</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Human agent, routine Tier-1 ticket</td>
                <td>$20 to $25</td>
                <td>Industry cost roundups</td>
              </tr>
              <tr>
                <td>Vendor bot, per claimed resolution</td>
                <td>$0.99</td>
                <td>Fin-style list pricing</td>
              </tr>
              <tr>
                <td>Vendor bot, per measured resolution (median bot)</td>
                <td>$1.55</td>
                <td>$0.99 x 64.5 / 41.2</td>
              </tr>
              <tr>
                <td>Custom RAG at 600 measured resolutions / month</td>
                <td>$3.72</td>
                <td>$2,233 monthly TCO</td>
              </tr>
              <tr>
                <td>Custom RAG at 1,450 measured resolutions / month</td>
                <td>$1.54</td>
                <td>Break-even vs vendor effective rate</td>
              </tr>
              <tr>
                <td>Custom RAG at 2,400 measured resolutions / month</td>
                <td>$0.93</td>
                <td>$2,233 monthly TCO</td>
              </tr>
              <tr>
                <td>Custom RAG at 4,000 measured resolutions / month</td>
                <td>$0.56</td>
                <td>$2,233 monthly TCO</td>
              </tr>
            </tbody>
          </table>
        </DataChart>

        <p>
          Per-resolution pricing sounds like perfect alignment: you pay only when the bot succeeds.
          The catch is who defines success. If the vendor bills $0.99 on its own resolution
          definition, and that definition runs at the median inflation we measured (64.5 claimed
          against 41.2 measured), your effective price is $0.99 multiplied by the inflation ratio:
          about $1.55 per resolution that genuinely kept a ticket out of the queue. Not a scandal,
          still excellent against $20 to $25 for a human. But it is 57% more than the list price,
          and it compounds across every forecast built on it.
        </p>

        <p>
          The custom side has its own honest accounting to do, and most build-versus-buy posts skip
          it. A production-grade RAG bot is not a weekend project: chunking, hybrid retrieval,
          reranking, grounding with citations, an eval suite, and the escalation integration land
          around $32,000 of build for the deployments in our sample. Amortise over 24 months, add
          $500 a month of infrastructure and model spend at the configuration that actually works
          (more on that curve below), add $400 a month of corpus and eval maintenance, and the
          all-in monthly cost is $2,233. Divide by measured resolutions and the curve is brutal at
          low volume: $3.72 at 600 a month. It crosses the vendor&apos;s effective $1.55 at roughly
          1,450 measured resolutions a month, and keeps falling: $0.93 at 2,400, $0.56 at 4,000.
        </p>

        <p>
          A caution on optimising the wrong direction: the cheapest resolution is not always the
          right one. Refunds and cancellations sit at a 12% MDR partly because they should. A
          customer heading for the exit is a retention conversation, and handing that to a policy
          quoting bot to save $20 is how you convert a save opportunity into a chargeback. The
          per-resolution maths in Chart 3 applies to the query classes a bot handles well; the
          classes it handles badly belong in the escalation budget, priced as relationship work
          rather than as tickets.
        </p>

        <p>
          So the decision is a volume threshold, not a philosophy. Below about 1,000 measured
          resolutions a month, rent. Above about 1,500 with a curated corpus, building wins on cost
          and keeps your support data out of a third party. The same discipline applies to the model
          bill itself; our{" "}
          <Link href="/blog/ai-feature-token-economics-2026/">per-token economics study</Link>{" "}
          covers why AI features that look cheap per call become line items per MAU, and support
          bots are no exception.
        </p>

        <h2>Finding 4: Escalation quality predicts deflection</h2>

        <DataChart
          title="Chart 4: Escalation Quality Score quartiles vs deflection and post-handoff outcomes"
          subtitle="14 bots ranked by EQS and split into quartiles. CSAT collected on post-handoff conversations only."
          sources={CHART_SOURCES}
        >
          <table>
            <thead>
              <tr>
                <th>EQS quartile</th>
                <th>EQS range</th>
                <th>Median MDR (%)</th>
                <th>Post-handoff CSAT (/5)</th>
                <th>Repeat contact within 7 days (%)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Top</td>
                <td>74 to 88</td>
                <td>52</td>
                <td>4.4</td>
                <td>9</td>
              </tr>
              <tr>
                <td>Second</td>
                <td>61 to 73</td>
                <td>43</td>
                <td>4.0</td>
                <td>14</td>
              </tr>
              <tr>
                <td>Third</td>
                <td>48 to 60</td>
                <td>36</td>
                <td>3.6</td>
                <td>21</td>
              </tr>
              <tr>
                <td>Bottom</td>
                <td>31 to 47</td>
                <td>29.5</td>
                <td>3.1</td>
                <td>34</td>
              </tr>
            </tbody>
          </table>
        </DataChart>

        <p>
          We built EQS to measure handoffs, expecting it to be independent of deflection. It is not.
          The four bots with the best escalation design deflect at a median of 52%; the four worst
          at 29.5%. The mechanism became obvious in the conversation logs. When users trust that a
          human is one click away, they give the bot a real chance, ask full questions, and accept
          its answers. When the bot behaves like a wall in front of the support team, users learn to
          type &quot;agent&quot; as their first message, and measured deflection craters. Bad
          escalation also unwinds deflections retroactively: a third of the bottom quartile&apos;s
          handoffs came back within a week, each one converting an earlier &quot;resolution&quot;
          into two contacts instead of one.
        </p>

        <p>
          The external data agrees. The statistics roundups report{" "}
          <a
            href="https://www.lorikeetcx.ai/articles/ai-customer-service-statistics"
            target="_blank"
            rel="noopener noreferrer"
          >
            92% customer satisfaction when the human handoff is seamless
          </a>
          , a figure most support bots never see because the handoff is where the product
          investment stopped. Our top quartile&apos;s 4.4 out of 5 post-handoff CSAT is that effect,
          measured on our own sample.
        </p>

        <h2>Designing the escalation path</h2>

        <p>
          Every top-quartile bot in the sample shares the same escalation architecture, and none of
          it is exotic. The rules we now treat as defaults:
        </p>

        <ul>
          <li>
            <strong>Escalation is a feature, not a failure state.</strong> It gets designed,
            built and evaluated in the first sprint, not bolted on when the complaints arrive.
          </li>
          <li>
            <strong>Thresholds are tuned per query class.</strong> Retrieval confidence that
            justifies answering a how-to question does not justify answering a refund request. On
            refunds and cancellations, the best bots barely try: they collect context and route.
          </li>
          <li>
            <strong>The exit is always visible.</strong> Counterintuitively, hiding the escape
            hatch lowers deflection. Two bots in our sample removed the &quot;talk to a human&quot;
            button to protect their numbers; both sat in the bottom EQS quartile with
            below-median MDR.
          </li>
          <li>
            <strong>Context travels with the customer.</strong> Full transcript, what the bot
            retrieved, what it already tried. The customer should never repeat themselves, and the
            agent should never repeat the bot.
          </li>
          <li>
            <strong>Escalated conversations jump the queue.</strong> The customer has already spent
            minutes with the bot. Making them wait again from the back of the line is how a 3.1
            CSAT happens.
          </li>
          <li>
            <strong>Post-handoff outcomes are measured.</strong> First-touch resolution and 7-day
            repeat contact feed back into EQS, per query class, so threshold tuning is evidence
            rather than vibes.
          </li>
        </ul>

        <p>
          One rule deserves its own paragraph: channel continuity. The handoff must continue in the
          same thread the customer is already in. The moment the bot says &quot;we will email you
          back&quot;, the conversation resets: the customer restates the problem from scratch, the
          context evaporates, and a healthy share of them simply open a fresh ticket instead, which
          is exactly the channel-switching leak that finding 1 quantified at 4.3 points of the gap.
          Every top-quartile bot in our sample keeps the human reply inside the widget conversation,
          with email as a notification layer rather than a replacement channel.
        </p>

        <p>
          Context transfer is the piece most deployments skip because it is integration work rather
          than prompt work. This is the payload our custom builds ship with every escalation:
        </p>

        <CodeBlock
          language="typescript"
          caption="the handoff payload every escalation carries to the agent desk"
        >{`type EscalationPayload = {
  conversationId: string;
  transcript: Turn[];          // full bot conversation, never a summary
  retrievedChunks: ChunkRef[]; // what the bot read before answering
  botConfidence: number;       // final-turn retrieval confidence, 0 to 1
  queryClass: QueryClass;      // password | billing | howto | config | bug | refund | account
  attemptedAnswers: string[];  // so the agent never repeats the bot
  userContext: {
    plan: string;
    accountAgeDays: number;
    openTicketCount: number;
  };
};

// routing rule: thresholds are per query class, not global.
// refunds escalate at any confidence; how-to holds until confidence < 0.62`}</CodeBlock>

        <p>
          On the vendor platforms you do not control the payload shape, but Fin and the Zendesk
          agents both expose enough hooks to pass transcript and attempted answers into the ticket.
          The two Fin deployments in our sample that wired this up properly sit in the top half of
          the EQS table; the ones that left the default behaviour do not.
        </p>

        <h2>The bot is only as good as the corpus</h2>

        <p>
          Bot N deserves its own section. Technically it was one of the better builds in the
          sample: hybrid retrieval, reranking, grounded answers with citations. It measured 22%,
          worst in the study, while its dashboard claimed 58%. The cause was not in the pipeline. It
          was retrieving, confidently and with citations, from a knowledge base that had not been
          meaningfully updated in two years. The product had shipped two major versions since. The
          bot was fluently, verifiably wrong, which is worse than being unavailable, and users
          learned that faster than the dashboard did.
        </p>

        <p>
          The pattern generalises: in our sample, corpus age and coverage predicted MDR better than
          any retrieval configuration choice. Which is why the most valuable support-automation work
          we have done was not a bot at all. For a $200M-ARR cybersecurity company we shipped six
          platforms around the same knowledge estate: a knowledge base, a customer forum, a partner
          portal, release notes, a support console, and public docs. The unglamorous one, the
          internal support console, exists to close the ticket-to-KB loop: every closed support
          ticket is a KB-article candidate, and the hook between the ticket system (Zendesk,
          Intercom or Help Scout) and the editorial workflow is where most knowledge bases quietly
          stagnate. That loop is what keeps a corpus worth retrieving from, and it is the core of
          our{" "}
          <Link href="/services/knowledge-base-community-development/">
            knowledge base and community platform practice
          </Link>
          .
        </p>

        <p>
          Scale has a cliff too: default WordPress search dies above 200 articles, and tag-based
          discovery breaks at the same point. If humans cannot find the right article in your KB, do
          not expect embeddings over the same neglected corpus to conjure relevance. Retrieval
          inherits your information architecture: version-aware routing (the article that applies to
          v3 but not v4), role-gated content, and an editorial owner are prerequisites, not
          nice-to-haves.
        </p>

        <p>
          Once the corpus is healthy, retrieval spend follows a curve we have measured across
          engagements, and it bends hard in one place:
        </p>

        <DataChart
          title="Chart 5: Monthly RAG spend vs answer quality (eval score)"
          subtitle="Eval score 0 to 100 on a per-question regression set. The curve bends at hybrid retrieval plus reranking; past it, you spend a lot more for a little more."
          sources="Sources: Appycodes RAG engagement cost modelling and eval suites, 2026. Figures rounded."
        >
          <table>
            <thead>
              <tr>
                <th>Monthly spend</th>
                <th>Eval score</th>
                <th>Configuration</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>$50 / mo</td>
                <td>35</td>
                <td>Cheap embed, no rerank</td>
              </tr>
              <tr>
                <td>$200 / mo</td>
                <td>48</td>
                <td>Better embed, no rerank</td>
              </tr>
              <tr>
                <td>$500 / mo</td>
                <td>72</td>
                <td>Hybrid and rerank (the sweet spot)</td>
              </tr>
              <tr>
                <td>$900 / mo</td>
                <td>81</td>
                <td>Hybrid, rerank, GPT-4-class</td>
              </tr>
              <tr>
                <td>$1,800 / mo</td>
                <td>84</td>
                <td>More-of-everything</td>
              </tr>
            </tbody>
          </table>
        </DataChart>

        <p>
          The jump from 48 to 72 costs $300 a month. The jump from 81 to 84 costs $900. Hybrid
          retrieval plus reranking at around $500 a month is where the quality per dollar peaks,
          and it is the configuration behind the $2,233 TCO in finding 3. The stage-by-stage build,
          chunking through embeddings, retrieval, reranking and caching, is documented in our{" "}
          <Link href="/blog/production-rag-pipeline-2026/">production RAG pipeline guide</Link>.
          But spend the first budget on the corpus. A $1,800 retrieval stack over bot N&apos;s
          two-year-stale KB still loses to a $500 stack over a maintained one.
        </p>

        <h2>What this means for build vs rent</h2>

        <p>
          The honest summary of the data: bots work, dashboards inflate, and the decision points are
          knowable in advance.
        </p>

        <ul>
          <li>
            <strong>Under about 1,000 measured resolutions a month: rent.</strong> Fin or the
            Zendesk agents will be cheaper than any custom TCO. But instrument MDR from day one,
            because the renewal conversation should happen on your number, not theirs.
          </li>
          <li>
            <strong>Between 1,000 and 1,500: negotiate.</strong> You are inside the break-even band.
            Per-resolution pricing renegotiated against a measured definition is worth more than any
            feature on the roadmap.
          </li>
          <li>
            <strong>Above about 1,500 with a curated corpus: build.</strong> Custom RAG wins on
            cost, keeps conversation data in your stack, and lets you tune thresholds per query
            class, which is where the deflection actually lives. This is the work of our{" "}
            <Link href="/services/ai-chatbot-rag-development/">
              AI chatbot and RAG development practice
            </Link>
            : chunking, hybrid retrieval, reranking, grounding, eval, and the escalation
            integration, costed before the architecture is locked.
          </li>
          <li>
            <strong>Whichever you choose, fix the definition in writing.</strong> A deflection
            claim without a measurement window and a channel-matching rule is a marketing number.
          </li>
        </ul>

        <p>
          And if the support bot is becoming part of the product itself, an in-product copilot
          rather than a widget in front of the queue, the unit economics and architecture questions
          change shape again; that is the territory of our{" "}
          <Link href="/services/ai-saas-product-development/">
            AI SaaS product development
          </Link>{" "}
          engagements, where the bot&apos;s cost per user has to survive contact with a pricing
          page.
        </p>

        <h2>Limitations and how to read this study critically</h2>

        <p>
          Four caveats that should temper any reading of these numbers.
        </p>

        <p>
          First, sample bias runs in our favour on the gap. Clients tend to bring us bots they
          already suspect are underperforming; happily-renewing vendor deployments are
          under-represented. True vendor medians across all deployments are plausibly higher than
          our 41.2%, though the definitional inflation mechanisms apply to every deployment
          regardless.
        </p>

        <p>
          Second, n is 14, and the cohort splits are small: five Fin, four Zendesk, five custom.
          Read the medians as magnitudes, not precise estimates. The custom cohort&apos;s stronger
          showing partly reflects that those corpora were curated as part of the same engagements,
          which is an argument about where the work is, not about whose model is better.
        </p>

        <p>
          Third, the 7-day repeat-contact window is a judgment call. We re-ran a subset at 14 days
          and median MDR dropped roughly 3 points, so a stricter window makes the headline worse,
          not better. Cross-channel matching by fuzzy subject line will also miss some repeat
          contacts, which inflates every MDR figure slightly, vendors&apos; and ours alike.
        </p>

        <p>
          Fourth, we built five of the bots in this sample, and we sell the service this post links
          to. Mitigations: one reviewer applied the same rubric to all 14 bots, every number comes
          from ticket exports rather than our dashboards, and the worst bot in the study is one of
          ours. The vendors are also moving targets; Fin and the Zendesk agents both shipped
          meaningful updates during the measurement window, and the Gartner trajectory suggests the
          2029 picture will look very different. Read this as a snapshot, July 2026.
        </p>

        <h2>The sample at a glance</h2>

        <TableScroll>
          <table>
            <thead>
              <tr>
                <th>Cohort</th>
                <th>n</th>
                <th>Dashboard median (%)</th>
                <th>MDR median (%)</th>
                <th>CPR median</th>
                <th>EQS median</th>
                <th>Post-handoff CSAT (/5)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Intercom Fin</td>
                <td>5</td>
                <td>70</td>
                <td>41.6</td>
                <td>$1.67</td>
                <td>64</td>
                <td>4.0</td>
              </tr>
              <tr>
                <td>Zendesk AI agent</td>
                <td>4</td>
                <td>60.5</td>
                <td>32.5</td>
                <td>$1.84</td>
                <td>52</td>
                <td>3.5</td>
              </tr>
              <tr>
                <td>Custom RAG</td>
                <td>5</td>
                <td>63</td>
                <td>52</td>
                <td>$1.29</td>
                <td>71</td>
                <td>4.2</td>
              </tr>
            </tbody>
          </table>
        </TableScroll>

        <h2>What to measure before you renew any bot contract</h2>

        <p>
          You do not need our rubric to run this audit on your own bot; you need an afternoon and
          two exports. Pull 90 days of bot conversations and 90 days of tickets. Match on account
          id. Count a deflection only when an answer was delivered and no human contact followed
          within 7 days. Split by query class. Divide your true monthly bot cost by that number.
          Then put the result next to the dashboard and next to whatever number is in the renewal
          deck.
        </p>

        <p>
          If the gap looks like the ones in Chart 1 and you want a second pair of eyes on where the
          points are leaking, corpus, thresholds, or escalation,{" "}
          <Link href="/contact/">send us the exports</Link>. We will run the same measurement and
          send back the actual numbers.
        </p>

        <p>
          More measured-numbers research from the same shelf:
        </p>

        <RelatedGrid>
          <RelatedCard
            tag="Research"
            title="Building a Production RAG Pipeline: Chunking, Embeddings, Retrieval, Caching"
            body="Stage-by-stage architecture for a RAG pipeline running in production: chunk size choices, embedding model tradeoffs, retrieval, reranking, semantic cache, and the cost per 1M queries."
            href="/blog/production-rag-pipeline-2026/"
          />
          <RelatedCard
            tag="Research"
            title="Per-Token Economics: What an AI Feature Actually Costs in Production (47 SaaS Sample)"
            body="Real per-MAU token cost data across 47 production AI SaaS products. CPMU by feature class, model-tier routing, and the unit-economic decision."
            href="/blog/ai-feature-token-economics-2026/"
          />
          <RelatedCard
            tag="Research"
            title="We Audited 31 Lovable / Bolt / v0 / Cursor Codebases. Here's What Survives Production."
            body="A code-level teardown of 31 AI-generated SaaS prototypes: three proprietary metrics (PSR, TDR, RCM) and a 10-mode failure taxonomy."
            href="/blog/ai-prototype-codebase-audit-2026/"
          />
        </RelatedGrid>

        <p>
          The engagements that map to the failure modes in this study:
        </p>

        <RelatedGrid>
          <RelatedCard
            tag="Service"
            title="AI Chatbot, RAG & Agent Development"
            body="Production RAG chatbots and copilots: chunking, hybrid retrieval, reranking, grounding, eval, and the escalation integration."
            href="/services/ai-chatbot-rag-development/"
          />
          <RelatedCard
            tag="Service"
            title="Knowledge Base & Community Platforms"
            body="Search relevance past 200 articles, version-aware routing, role gating, and the ticket-to-KB loop that keeps the corpus alive."
            href="/services/knowledge-base-community-development/"
          />
          <RelatedCard
            tag="Service"
            title="AI SaaS Product Development"
            body="Full-cycle AI product builds where the unit economics are modelled before the architecture is locked."
            href="/services/ai-saas-product-development/"
          />
        </RelatedGrid>

        <Faq items={FAQS} />

        <AuthorByline lastReviewedISO={MODIFIED_ISO}>
          Ritesh led the measurement work across the 14 deployments in this study, including the
          five custom RAG builds in the sample and the six-platform knowledge estate for the
          $200M-ARR cybersecurity company anonymised above. The MDR / CPR / EQS rubric was developed
          iteratively across those engagements, and the ticket-export matching method is the same
          one we now run at the start of every support-automation takeover.
        </AuthorByline>
      </PostBody>

      <CtaBand />
    </>
  );
}
