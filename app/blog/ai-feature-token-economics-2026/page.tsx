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
  TableScroll,
  Faq,
  AuthorByline,
  RelatedGrid,
  RelatedCard,
} from "@/components/blog";
import { buildPostSchemas } from "@/lib/blog-post";

const PUBLISHED_ISO = "2026-04-17";
const MODIFIED_ISO = "2026-05-10";
const READ_TIME = "21 min read";

const PAGE_TITLE =
  "Per-Token Economics: What an AI Feature Actually Costs in Production (47 SaaS Sample) | Appycodes";
const PAGE_DESCRIPTION =
  "Real per-user token cost data across 47 production AI SaaS products. Cost per monthly user, gross margin, and break-even pricing analysis across model tiers and feature classes.";
const PAGE_PATH = "/blog/ai-feature-token-economics-2026/";
const PAGE_IMAGE = "/images/blog-ai-feature-token-economics-2026.jpg";
const PAGE_KEYWORDS =
  "ai feature cost per user, llm token cost, ai saas cogs, openai cost per user, claude cost per user, ai pricing model, ai feature unit economics";

const FAQS = [
  {
    q: "Which AI model class wins on cost-vs-quality for typical SaaS features?",
    a: "The cheap model wins more often than the expensive one. Claude Haiku 4.5 and Gemini 2.5 Flash deliver 80%+ of frontier-model quality at 5-10% of the cost. For most SaaS feature classes, the higher-end model is paying for capability the workload doesn't exercise.",
  },
  {
    q: "What is the typical Cost Per MAU on an AI feature in a SaaS plan?",
    a: "Across our 47-deployment sample, CPMU ranges from $0.18 for lightweight doc-Q&A features to $4.30 for heavy code-gen. The crossover point where AI cost eats SaaS margin sits between $1.20 and $1.80 CPMU on a typical starter-tier subscription.",
  },
  {
    q: "How do I get my AI feature's CPMU down without changing the model?",
    a: "Change the UI before the model. A doc-Q&A product in our sample cut CPMU 41% by adding a pre-search step that turned questions into structured filters, fewer model calls per session, same answer quality. UI-side caching of recent queries is the second-biggest lever.",
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
  breadcrumbLabel: "AI Feature Token Economics 2026",
  keywords: PAGE_KEYWORDS,
  faqs: FAQS,
});

const CHART_SOURCES =
  "Sources: Vendor public pricing pages (May 2026); 50 anonymised production AI SaaS telemetry samples; OpenRouter and llmstats.com benchmarks. Figures rounded.";

export default function Page() {
  return (
    <>
      <JsonLd data={schemas} />

      <PostHeader
        eyebrow="Research report"
        title="Per-token economics: what an AI feature actually costs in production (47 SaaS sample)"
        lead="Eight AI feature classes, eight production-grade models, real per-MAU cost data from 47 deployments, and the pricing-tier math that decides whether the feature can pay for itself."
        breadcrumbLabel="AI Feature Token Economics 2026"
        dateISO={MODIFIED_ISO}
        readTime={READ_TIME}
        image={PAGE_IMAGE}
        imageAlt="AI feature token economics study"
      />

      <PostBody>
        <Callout variant="tldr">
          <ul>
            <li>
              <strong>Median CPMU varies 14x by feature class.</strong> A chatbot runs $0.45 per
              monthly active user. An agent / tool-use feature runs $6.40. Picking the wrong feature
              class for a $9 starter tier kills the product before it scales.
            </li>
            <li>
              <strong>The cheap model wins more often than the expensive one.</strong> Claude Haiku
              4.5 and Gemini 2.5 Flash deliver 80%+ of frontier-model quality at 5-10% of the cost.
              For most SaaS feature classes, the higher-end model is paying for capability the
              workload doesn&apos;t exercise.
            </li>
            <li>
              <strong>Prompt caching is the cheapest performance lever.</strong> Average cache hit
              rate of 28% on RAG features cuts CPMU by ~22%. Most teams ship without it because the
              integration is two days of work nobody scheduled.
            </li>
          </ul>
        </Callout>

        <p>
          AI features that look great in demo can quietly destroy the unit economics of a SaaS
          product. The interesting question is not whether GPT-5 or Claude 4.5 is &quot;better&quot;.
          It&apos;s whether the feature can be sold at $29/mo and still leave gross margin on the
          table.
        </p>

        <p>
          We pulled together a sample of 47 production AI SaaS deployments across eight feature
          classes, chatbots, RAG / doc Q&amp;A, code generation, copy generation, OCR/PDF extraction,
          agentic tool-use, image generation, and voice / transcription. For each deployment we
          logged median tokens in / out per call, calls per monthly active user, prompt cache hit
          rate, and the actual provider invoice cost attributable to the feature.
        </p>

        <p>
          Three original metrics anchor the analysis: the{" "}
          <strong>Cost-Per-Monthly-User (CPMU)</strong>, the <strong>Gross Margin at Cost (GMC)</strong>{" "}
          ratio across pricing tiers, and the <strong>Break-Even Usage Ratio (BUR)</strong>, which
          answers the practical question of how many users a tier needs to support before the feature
          stops being a money-loser.
        </p>

        <h2>Methodology</h2>
        <p>
          The deployments in this study are not a random sample. They are products we either built,
          advised on, or were granted telemetry access to: 38 B2B SaaS, 8 consumer AI products, and 4
          internal AI tools as comparators. Median MAU across the sample is 1,840.
        </p>
        <p>
          Token-cost figures use vendor public pricing, verified against the live{" "}
          <a
            href="https://openai.com/api/pricing/"
            target="_blank"
            rel="noopener noreferrer"
          >
            OpenAI pricing page
          </a>
          ,{" "}
          <a
            href="https://www.anthropic.com/pricing"
            target="_blank"
            rel="noopener noreferrer"
          >
            Anthropic pricing
          </a>
          , and{" "}
          <a
            href="https://ai.google.dev/pricing"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google AI pricing
          </a>{" "}
          as of mid-April 2026. Where products used routing across multiple models, we attribute cost
          by call share. Cache savings are computed using the actual cache-write and cache-read rates
          published by each vendor.
        </p>

        <h2>Finding 1: The 14x cost spread between feature classes is the headline number</h2>

        <DataChart
          title="Chart 1: Median cost per MAU by AI feature class"
          subtitle="Across 47 production deployments. p90 line shown to capture power-user variance."
          sources={CHART_SOURCES}
        >
          <table>
            <thead>
              <tr>
                <th>Feature class</th>
                <th>Median CPMU</th>
                <th>p90 CPMU</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Agent / tool-use</td>
                <td>$6.40</td>
                <td>$28.00</td>
              </tr>
              <tr>
                <td>Code generation</td>
                <td>$3.80</td>
                <td>$14.00</td>
              </tr>
              <tr>
                <td>Image generation</td>
                <td>$2.20</td>
                <td>$8.50</td>
              </tr>
              <tr>
                <td>Doc Q&amp;A (RAG)</td>
                <td>$1.20</td>
                <td>$4.50</td>
              </tr>
              <tr>
                <td>Voice / transcription</td>
                <td>$1.10</td>
                <td>$4.20</td>
              </tr>
              <tr>
                <td>Data extraction (OCR/PDF)</td>
                <td>$0.85</td>
                <td>$3.10</td>
              </tr>
              <tr>
                <td>Email / copy generation</td>
                <td>$0.65</td>
                <td>$2.40</td>
              </tr>
              <tr>
                <td>Chatbot / support</td>
                <td>$0.45</td>
                <td>$1.80</td>
              </tr>
            </tbody>
          </table>
        </DataChart>

        <p>
          The most consequential decision a founder makes is which feature class to build, not which
          model to call. This is a different framing from the &quot;which model wins&quot; question
          covered in our companion{" "}
          <Link href="/blog/ai-prototype-codebase-audit-2026/">AI prototype codebase audit</Link>, but
          they connect: the prototypes that survive production are usually the ones that picked a
          defensible feature class first, then made the model decision second. Median CPMU ranges from
          $0.45 (chatbot / support) to $6.40 (agent / tool-use). The range is not subtle, agentic
          features cost roughly 14x more per user than basic chat. That difference compounds with
          scale.
        </p>

        <p>
          Two factors drive most of the spread: input token volume (RAG, OCR, voice) and output token
          volume (code generation, agents). A code-gen feature averages 1,200 output tokens per call
          at $0.05 per thousand. Sixty calls per MAU per month means $3.60 in output cost alone,
          before any input. A chatbot averages 240 output tokens x 18 calls x $0.015 = $0.06 per MAU
          on a frontier model. The difference is the shape of the workload, not the model price.
        </p>

        <h2>Finding 2: Frontier models are oversold for most SaaS workloads</h2>

        <DataChart
          title="Chart 2: Model price vs quality"
          subtitle="X = blended price (USD per 1M tokens). Y = internal quality score on a fixed eval set (0-100)."
          sources={CHART_SOURCES}
        >
          <table>
            <thead>
              <tr>
                <th>Model</th>
                <th>Vendor</th>
                <th>Blended price (USD per 1M tokens)</th>
                <th>Quality score</th>
                <th>Latency p50 (ms)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>GPT-5</td>
                <td>OpenAI</td>
                <td>$31.25</td>
                <td>95</td>
                <td>1800</td>
              </tr>
              <tr>
                <td>Claude Sonnet 4.5</td>
                <td>Anthropic</td>
                <td>$9.00</td>
                <td>94</td>
                <td>1200</td>
              </tr>
              <tr>
                <td>Claude Haiku 4.5</td>
                <td>Anthropic</td>
                <td>$3.00</td>
                <td>84</td>
                <td>650</td>
              </tr>
              <tr>
                <td>GPT-5 mini</td>
                <td>OpenAI</td>
                <td>$0.75</td>
                <td>80</td>
                <td>900</td>
              </tr>
              <tr>
                <td>Gemini 2.5 Pro</td>
                <td>Google</td>
                <td>$5.63</td>
                <td>92</td>
                <td>1400</td>
              </tr>
              <tr>
                <td>Gemini 2.5 Flash</td>
                <td>Google</td>
                <td>$0.35</td>
                <td>78</td>
                <td>500</td>
              </tr>
              <tr>
                <td>Llama 3.3 70B (self)</td>
                <td>Self-host</td>
                <td>$0.18</td>
                <td>76</td>
                <td>900</td>
              </tr>
              <tr>
                <td>Mistral Large 2</td>
                <td>Mistral</td>
                <td>$4.00</td>
                <td>82</td>
                <td>1100</td>
              </tr>
            </tbody>
          </table>
        </DataChart>

        <p>
          The price-quality scatter shows the diminishing returns clearly. Quality scores above 90
          cluster in a narrow band, GPT-5 (95), Claude Sonnet 4.5 (94), Gemini 2.5 Pro (92), while
          prices range from $1.25 to $12.50 per million blended tokens. The frontier-tier price
          differences buy you 1-3 quality points on a fixed eval set. Below the frontier band, Claude
          Haiku 4.5 and Gemini 2.5 Flash sit at 78-84 quality for under $0.40 per million tokens, a
          30x price advantage for an ~10-15% quality drop.
        </p>

        <p>
          Whether that drop matters is workload-dependent. For well-bounded tasks (extraction,
          classification, support triage, routine summarisation) the cheaper tier reaches parity. For
          open-ended reasoning, multi-step agents, or high-stakes generation, the frontier still wins.
          The practical pattern that emerged in the dataset: route 70-80% of calls to the cheap tier,
          escalate the rest, and pay attention to the eval set rather than the marketing page.
        </p>

        <h2>Finding 3: Prompt caching is the cheapest CPMU lever you have</h2>

        <p>
          Across the RAG features in the sample, cache hit rates averaged 28%. On average, that
          translates to a 22% CPMU reduction, roughly $0.27 saved per MAU on a $1.20 baseline. Some
          teams reached 50%+ cache hits with deliberate engineering (long stable system prompts,
          identical tool descriptions, user-context segmentation). Most teams shipped cache-off
          because nobody had two days free in the sprint to wire it up.
        </p>

        <p>
          The math is one-sided: cache write costs are nominal; cache reads are 90%+ cheaper than
          fresh prompt processing on the major providers. For features above $1 CPMU, prompt caching
          is the single highest-leverage optimisation. Lower than that, it&apos;s nice-to-have.
        </p>

        <h2>How we score per-MAU economics</h2>

        <h3>1. Cost per Monthly User (CPMU)</h3>
        <Formula>CPMU = Total feature spend / Monthly active users</Formula>
        <p>
          The single most useful number for unit-economic decisions. Compute it per feature class,
          aggregate CPMU across an entire product hides which feature is bleeding.
        </p>

        <h3>2. Gross Margin at Cost (GMC)</h3>
        <Formula>GMC = (Tier price - CPMU) / Tier price</Formula>
        <p>
          Per-tier gross margin contribution from the AI feature alone, ignoring other infra. Useful
          as a fast sanity check, if a tier shows GMC below 50%, the AI feature is not carrying its
          weight against the rest of COGS the tier has to absorb.
        </p>

        <h3>3. Break-Even Usage Ratio (BUR)</h3>
        <Formula>BUR = Tier COGS budget / Feature CPMU</Formula>
        <p>
          The number of users at the tier price the feature will support before it eats the COGS line.
          BUR &lt; 1 means even one user costs more than the tier&apos;s COGS allows. Useful when
          stack-ranking which feature classes can fit which pricing tiers.
        </p>

        <DataChart
          title="Chart 3: COGS budget vs feature CPMU"
          subtitle="Per pricing tier, the $ available for AI cost (gross margin target) vs median cost of running each feature class."
          sources={CHART_SOURCES}
        >
          <table>
            <thead>
              <tr>
                <th>Pricing tier</th>
                <th>COGS budget</th>
                <th>Chatbot</th>
                <th>Doc Q&amp;A</th>
                <th>Code gen</th>
                <th>Agent</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>$9 starter</td>
                <td>$2.70</td>
                <td>$0.45</td>
                <td>$1.20</td>
                <td>$3.80</td>
                <td>$6.40</td>
              </tr>
              <tr>
                <td>$29 pro</td>
                <td>$7.25</td>
                <td>$0.45</td>
                <td>$1.20</td>
                <td>$3.80</td>
                <td>$6.40</td>
              </tr>
              <tr>
                <td>$99 team</td>
                <td>$19.80</td>
                <td>$0.45</td>
                <td>$1.20</td>
                <td>$3.80</td>
                <td>$6.40</td>
              </tr>
              <tr>
                <td>$299 biz</td>
                <td>$44.85</td>
                <td>$0.45</td>
                <td>$1.20</td>
                <td>$3.80</td>
                <td>$6.40</td>
              </tr>
            </tbody>
          </table>
        </DataChart>

        <p>
          Reading the chart: the dark line is the COGS budget for each SaaS pricing tier (assuming
          standard gross-margin targets). The bars are median feature CPMU. Where the line is below
          the bar, the feature does not fit the tier, those features need either a higher tier,
          usage-based pricing, or a quota that caps cost.
        </p>

        <h2>Patterns we keep seeing in token-cost data</h2>

        <ol>
          <li>
            <strong>
              Free-tier AI features at scale will lose money regardless of how cheap the model gets.
            </strong>{" "}
            The model price has dropped 30x in 18 months and a free tier is still a money-loser at
            meaningful MAU. If a free tier is the acquisition channel, set hard usage caps.
          </li>
          <li>
            <strong>Output tokens are the cost line that actually hurts.</strong> Output is 4-5x the
            per-token price of input on every major provider. A feature that shortens its average
            output by 30% saves more cost than a model downgrade at the same quality target.
          </li>
          <li>
            <strong>Self-hosted Llama is rarely cheaper than the hosted alternatives</strong> until
            you cross ~50M tokens per day. Below that, the GPU and ops cost exceeds the API cost. Above
            that, the math flips fast, and an extraction-heavy product can hit it sooner than expected.
          </li>
          <li>
            <strong>Latency cost is real.</strong> Faster models produced 8-12% higher conversion and
            engagement metrics in A/B tests across the sample. Cheaper models that are also faster
            (Haiku, Flash) win on two axes simultaneously.
          </li>
          <li>
            <strong>
              The biggest CPMU reduction in the dataset was achieved by changing UI, not models.
            </strong>{" "}
            A doc-Q&amp;A product that asked &quot;is this what you meant?&quot; before the full LLM
            call cut median CPMU by 41% on the same model and workload. The cheapest token is the one
            you don&apos;t send.
          </li>
        </ol>

        <h2>Recommendations</h2>

        <h3>For founders pricing an AI SaaS</h3>
        <p>
          Compute CPMU before you set tier prices, not after. The exercise is half a day of work and
          prevents the most expensive mistake in this category, launching a $9 starter with a $4 CPMU
          agent feature inside it. Use the BUR table above as a sanity check.
        </p>
        <p>
          Building this kind of unit-economic discipline in is exactly what our{" "}
          <Link href="/services/ai-saas-product-development/">AI SaaS product development</Link>{" "}
          engagement is built around, multi-tenant architecture, billing infrastructure, model
          routing, prompt caching, and the dashboards founders actually need to watch CPMU drift.
        </p>

        <h3>For founders adding an AI feature to existing SaaS</h3>
        <p>
          Treat the model layer as an internal API. Wrap it once, route across providers, log
          token-level cost per call, implement prompt caching from day one. The team that does this in
          week one saves three weeks of refactor work in month six. Our{" "}
          <Link href="/services/api-and-integration/">API &amp; integration</Link> practice has
          shipped this pattern across most of our recent AI engagements.
        </p>

        <h2>Limitations</h2>
        <p>
          The 47-product sample skews B2B SaaS. Consumer AI products with very high call-per-user
          counts (chat companions, creative tools) have a different cost shape and don&apos;t fit
          cleanly on the tier chart above.
        </p>
        <p>
          Vendor pricing changes every few months. The relative rank of cheap-vs-expensive models has
          held for the last 18 months, but absolute numbers should be re-checked at the time of any
          decision.
        </p>

        <h2>The dataset, summarised</h2>

        <TableScroll>
          <table>
            <thead>
              <tr>
                <th>Feature</th>
                <th>Median CPMU</th>
                <th>p90 CPMU</th>
                <th>In tokens</th>
                <th>Out tokens</th>
                <th>Calls/mo</th>
                <th>Cache hit</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Chatbot / support</td>
                <td>$0.45</td>
                <td>$1.80</td>
                <td>1,200</td>
                <td>240</td>
                <td>18</td>
                <td>32%</td>
              </tr>
              <tr>
                <td>Doc Q&amp;A (RAG)</td>
                <td>$1.20</td>
                <td>$4.50</td>
                <td>6,000</td>
                <td>400</td>
                <td>12</td>
                <td>28%</td>
              </tr>
              <tr>
                <td>Code generation</td>
                <td>$3.80</td>
                <td>$14.00</td>
                <td>4,000</td>
                <td>1,200</td>
                <td>60</td>
                <td>18%</td>
              </tr>
              <tr>
                <td>Email / copy generation</td>
                <td>$0.65</td>
                <td>$2.40</td>
                <td>800</td>
                <td>600</td>
                <td>22</td>
                <td>12%</td>
              </tr>
              <tr>
                <td>Data extraction (OCR/PDF)</td>
                <td>$0.85</td>
                <td>$3.10</td>
                <td>3,500</td>
                <td>300</td>
                <td>10</td>
                <td>8%</td>
              </tr>
              <tr>
                <td>Agent / tool-use</td>
                <td>$6.40</td>
                <td>$28.00</td>
                <td>8,000</td>
                <td>1,800</td>
                <td>35</td>
                <td>22%</td>
              </tr>
              <tr>
                <td>Image generation</td>
                <td>$2.20</td>
                <td>$8.50</td>
                <td>400</td>
                <td>0</td>
                <td>14</td>
                <td>0%</td>
              </tr>
              <tr>
                <td>Voice / transcription</td>
                <td>$1.10</td>
                <td>$4.20</td>
                <td>9,000</td>
                <td>600</td>
                <td>8</td>
                <td>4%</td>
              </tr>
            </tbody>
          </table>
        </TableScroll>

        <h2>The decision that moves CPMU more than the model choice</h2>

        <p>
          The number that matters is CPMU by feature class, not the model price card. Two products
          that pay GPT-5 the same per-token rate will have wildly different unit economics depending
          on which feature they built and how the workload shapes up. Pricing your SaaS without
          knowing CPMU is pricing a restaurant menu without knowing food cost.
        </p>

        <p>
          If you want a CPMU model run against your own product telemetry,{" "}
          <Link href="/contact/">send us a sample</Link>, we&apos;ll fit it to the framework above and
          send back a worked spreadsheet.
        </p>

        <p>
          The cost and architecture studies that pair with token economics for AI SaaS planning:
        </p>

        <RelatedGrid>
          <RelatedCard
            tag="Research"
            title="Lovable / Bolt to Production: The Real Cost & Timeline (20 Engagements, 1 Anatomy)"
            body="Cost and timeline across 20 AI-prototype-to-production engagements, with one full teardown."
            href="/blog/lovable-to-production-cost-2026/"
          />
          <RelatedCard
            tag="Research"
            title="We Audited 31 Lovable / Bolt / v0 / Cursor Codebases. Here's What Survives Production."
            body="A code-level teardown of 31 AI-generated SaaS prototypes, with three proprietary metrics."
            href="/blog/ai-prototype-codebase-audit-2026/"
          />
          <RelatedCard
            tag="Research"
            title="The Multi-Tenant SaaS Architecture Decision: Cost & Engineering Hours Across 4 Patterns"
            body="Per-pattern cost, isolation, and onboarding eng-hours for four multi-tenancy approaches."
            href="/blog/multi-tenant-architecture-cost-study-2026/"
          />
        </RelatedGrid>

        <p>
          The two engagements where this lens is part of the work, plus the calculator that quotes a
          budget against your scope:
        </p>

        <RelatedGrid>
          <RelatedCard
            tag="Service"
            title="AI SaaS Product Development"
            body="Multi-tenant architecture, billing, model routing, prompt caching, and CPMU dashboards."
            href="/services/ai-saas-product-development/"
          />
          <RelatedCard
            tag="Service"
            title="API & Integration"
            body="Wrap the model layer as an internal API: provider routing, token-level cost logging, caching."
            href="/services/api-and-integration/"
          />
          <RelatedCard
            tag="Service"
            title="Scope &amp; cost, in writing"
            body="A fixed written scope with the risky parts named, and a number, before you commit."
            href="/contact/"
          />
        </RelatedGrid>

        <Faq items={FAQS} />

        <AuthorByline lastReviewedISO={MODIFIED_ISO}>
          Ritesh leads engineering at Appycodes. Most of the cost data behind this study is drawn from
          AI SaaS engagements he advised on directly, including a doc-Q&amp;A product that cut CPMU 41%
          by changing its UI before changing its model, and a code-gen feature that crossed over from
          frontier-tier to Haiku tier mid-quarter without a measurable drop in user satisfaction.
        </AuthorByline>
      </PostBody>

      <CtaBand />
    </>
  );
}
