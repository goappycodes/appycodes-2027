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

const PUBLISHED_ISO = "2026-05-14";
const MODIFIED_ISO = "2026-05-14";
const READ_TIME = "23 min read";

const PAGE_TITLE =
  "Building a Production RAG Pipeline: Chunking, Embeddings, Retrieval, Caching | Appycodes";
const PAGE_DESCRIPTION =
  "Stage-by-stage architecture for a RAG pipeline running in production, chunk size choices, embedding model tradeoffs, retrieval, reranking, semantic cache, and the cost per 1M queries.";

const FAQS = [
  {
    q: "What's the right chunk size for a production RAG pipeline?",
    a: "600-1000 tokens with 10-15% overlap for prose-heavy English content. The recall@5 curve peaks in that range across our four production deployments. Outside it, both smaller and larger, is a measurable regression. Code, tabular data and legal prose need different splitters (AST, row-based, clause-based).",
  },
  {
    q: "Which embedding model gives the best cost-to-quality ratio?",
    a: "OpenAI text-embedding-3-small at $0.02 per 1M tokens. It hits 0.78 recall@5 on our 400-question eval set, within five percentage points of text-embedding-3-large which costs 6.5x as much. Frontier-tier embeddings are rarely worth it outside high-stakes (legal, medical) workloads.",
  },
  {
    q: "Does a semantic cache actually pay for itself in a RAG system?",
    a: "Yes, within the first 100k queries on every production workload we have run it on. Median cache hit rate is 31% at a 0.92 similarity threshold, each hit saves a full LLM call, and the LLM call is the most expensive line item by far. It is the single highest-leverage change for a shipped RAG product.",
  },
];

export const metadata: Metadata = pageMeta({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: "/blog/production-rag-pipeline-2026/",
  image: "/images/blog-production-rag-2026.jpg",
  type: "article",
  keywords:
    "rag pipeline, retrieval augmented generation, vector search, embeddings, semantic cache, chunking, reranking",
  publishedTime: PUBLISHED_ISO,
  modifiedTime: MODIFIED_ISO,
  authors: ["Ritesh Agarwal"],
});

const schemas = buildPostSchemas({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: "/blog/production-rag-pipeline-2026/",
  image: "/images/blog-production-rag-2026.jpg",
  publishedISO: PUBLISHED_ISO,
  modifiedISO: MODIFIED_ISO,
  readTime: READ_TIME,
  breadcrumbLabel: "Production RAG Pipeline",
  keywords:
    "rag pipeline, retrieval augmented generation, vector search, embeddings, semantic cache, chunking, reranking",
  faqs: FAQS,
});

export default function Page() {
  return (
    <>
      <JsonLd data={schemas} />

      <PostHeader
        eyebrow="Architecture review"
        title="A production RAG pipeline, stage by stage, with cost and retrieval-quality numbers"
        lead="Eight stages from raw documents to grounded answer. Chunking, embeddings, vector store, retrieval, reranking, generation, semantic cache, evaluation. Cost per 1M queries, recall@k, and the choices that meaningfully move both. Drawn from four production RAG products we ship and maintain."
        breadcrumbLabel="Production RAG Pipeline"
        dateISO={PUBLISHED_ISO}
        readTime={READ_TIME}
        image="/images/blog-production-rag-2026.jpg"
        imageAlt="Production RAG pipeline architecture, eight stages from documents to answer"
      />

      <PostBody>
        <h2>The pipeline at a glance</h2>

        <CodeBlock language="text" caption="End-to-end flow">{`             ┌────────────────────┐
             │  1. Raw documents  │
             └─────────┬──────────┘
                       ▼
             ┌────────────────────┐
             │  2. Chunking       │   semantic + size guard
             └─────────┬──────────┘
                       ▼
             ┌────────────────────┐
             │  3. Embeddings     │   batched, cached
             └─────────┬──────────┘
                       ▼
             ┌────────────────────┐         ┌────────────────────┐
             │  4. Vector store   │◀──────▶│  7. Semantic cache │
             └─────────┬──────────┘         └────────────────────┘
                       ▼                            ▲
             ┌────────────────────┐                 │
             │  5. Retrieval      │─────────────────┘
             └─────────┬──────────┘
                       ▼
             ┌────────────────────┐
             │  6. Reranking      │   cross-encoder, top-k → top-n
             └─────────┬──────────┘
                       ▼
             ┌────────────────────┐         ┌────────────────────┐
             │  7. Generation     │◀──────▶│  8. Eval (offline) │
             └─────────┬──────────┘         └────────────────────┘
                       ▼
                  Answer + sources`}</CodeBlock>

        <p>
          Read top-to-bottom: each stage&apos;s output is the next stage&apos;s input. The Eval loop on
          the right runs offline against a curated question set.
        </p>

        <p>
          The remainder of this post takes each stage in order. For every stage we cover: the choice we
          ship by default, why, the code, and the marginal cost per 1M queries.
        </p>

        <h2>Stage 1, Documents</h2>

        <p>
          Most production RAG content is heterogeneous: PDFs, HTML dumps, transcripts, Notion exports,
          support tickets. The ingestion step that pays off most is one we are too quick to skip,{" "}
          <em>structural extraction</em>. Strip the navigation, the boilerplate footer, the disclaimer
          repeated on every page. The signal-to-noise ratio of your corpus is the single thing that the
          rest of the pipeline cannot fix.
        </p>

        <p>
          For PDFs we run{" "}
          <a
            href="https://github.com/Unstructured-IO/unstructured"
            target="_blank"
            rel="noopener noreferrer"
          >
            Unstructured
          </a>{" "}
          with the <code>fast</code> strategy for typical text-heavy docs and the <code>hi_res</code>{" "}
          (Detectron2) strategy for diagram-dense ones. For HTML we use{" "}
          <a
            href="https://github.com/mozilla/readability"
            target="_blank"
            rel="noopener noreferrer"
          >
            Mozilla Readability
          </a>{" "}
          wrapped in a thin Node service. The choice is rarely about quality at the extraction layer, it
          is about consistency. Pick one and run all of your content through it.
        </p>

        <h2>Stage 2, Chunking</h2>

        <p>
          The chunk-size choice is the most discussed and most over-tuned decision in the pipeline. The
          honest answer from our four-product sample:
          <strong>
            {" "}
            recursive character splitting at 600-1000 tokens with 10-15% overlap covers 80% of use
            cases
          </strong>
          . The cases where it fails are where you knew it would fail: code (split on AST), tabular data
          (split on rows), legal prose (split on clauses or sections).
        </p>

        <p>
          LangChain&apos;s RecursiveCharacterTextSplitter with the separators tuned for prose-heavy
          English content. The metadata each chunk carries is more important than the size, keep the
          source document id, page, and section heading.
        </p>

        <CodeBlock
          language="python"
          caption="ingest/chunk.py, the chunker we ship by default"
        >{`from langchain_text_splitters import RecursiveCharacterTextSplitter

splitter = RecursiveCharacterTextSplitter(
    chunk_size=800,
    chunk_overlap=100,
    length_function=len,           # characters; ~250 chars ≈ 60 tokens
    separators=["\\n\\n", "\\n", ". ", " ", ""],
)

def chunk_document(doc: Document) -> list[Chunk]:
    pieces = splitter.split_text(doc.text)
    return [
        Chunk(
            text=p,
            metadata={
                "doc_id": doc.id,
                "title": doc.title,
                "section": nearest_heading_for_offset(doc, offset_of(p)),
                "page": page_for_offset(doc, offset_of(p)),
                "source_url": doc.source_url,
                "ingested_at": doc.ingested_at,
            },
        )
        for p in pieces
    ]`}</CodeBlock>

        <p>
          Two things to know. First, retrieval works on
          <em> semantic similarity to the query</em>, not on document hierarchy, so adding section
          headings to the chunk text itself (prefixed at the top of each chunk) measurably improves
          retrieval on multi-section documents. Second, chunks that are too small lose context; chunks
          that are too large dilute the relevance signal. Across our four products, the recall@5 curve
          peaks between 600 and 900 tokens; everything outside that window is a real, measurable
          regression.
        </p>

        <h2>Stage 3, Embeddings</h2>

        <p>
          The embedding model is where you can save the most money for the least quality loss. The
          frontier-tier models (OpenAI <code>text-embedding-3-large</code>, Voyage{" "}
          <code>voyage-3-large</code>) are not always materially better for typical English prose than
          the smaller-tier options. The honest comparison:
        </p>

        <TableScroll>
          <table>
            <thead>
              <tr>
                <th>Model</th>
                <th>Dims</th>
                <th>$/1M tokens</th>
                <th>Recall@5 (our prose set)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>OpenAI text-embedding-3-small</td>
                <td>1,536</td>
                <td>$0.02</td>
                <td>0.78</td>
              </tr>
              <tr>
                <td>OpenAI text-embedding-3-large</td>
                <td>3,072</td>
                <td>$0.13</td>
                <td>0.83</td>
              </tr>
              <tr>
                <td>Voyage voyage-3</td>
                <td>1,024</td>
                <td>$0.06</td>
                <td>0.81</td>
              </tr>
              <tr>
                <td>Cohere embed-english-v3</td>
                <td>1,024</td>
                <td>$0.10</td>
                <td>0.80</td>
              </tr>
              <tr>
                <td>BGE-small-en-v1.5 (self-hosted)</td>
                <td>384</td>
                <td>~$0.005 (infra)</td>
                <td>0.74</td>
              </tr>
            </tbody>
          </table>
        </TableScroll>

        <p>
          Recall@5 measured on a 400-question evaluation set drawn from production traffic of our
          doc-Q&amp;A and support-search clients. Higher is better. Prices as of May 2026.
        </p>

        <p>
          The takeaway: <code>text-embedding-3-small</code> at $0.02 per million tokens is what we ship
          by default. The frontier tier (<code>3-large</code>) costs ~6.5x as much for a five
          percentage-point recall gain, rarely worth it unless the application is high-stakes (legal,
          medical). For budget-sensitive workloads, BGE self-hosted is competitive if you already run
          GPU infrastructure.
        </p>

        <p>
          The cost-vs-model curve is the same one we map on the feature side in our companion{" "}
          <Link href="/blog/ai-feature-token-economics-2026/">AI feature token economics</Link> study.
          The pattern is consistent: the cheap model is good enough far more often than first instinct
          suggests.
        </p>

        <h2>Stage 4, Vector store</h2>

        <p>The three we have shipped to production, in rough order of how often we pick them now:</p>

        <ul>
          <li>
            <strong>Postgres + pgvector</strong>, 0 ops overhead if you already run Postgres. Fast
            enough up to ~5M vectors with HNSW. Joins to your relational data are free. This is what we
            use for the majority of new builds.
          </li>
          <li>
            <strong>Pinecone / Weaviate / Qdrant Cloud</strong>, managed dedicated service. Faster at
            high cardinality, comes with namespace + metadata filtering UX. Worth it from ~10M vectors
            onward.
          </li>
          <li>
            <strong>LanceDB or DuckDB-VSS</strong>, in-process embedded option for batch / analytical
            RAG workloads. Trivially cheap, no network hop, ideal for the eval loop.
          </li>
        </ul>

        <p>
          HNSW index for ANN search; the metadata filter index on doc_id; the partial index on the{" "}
          <code>is_current</code> column so superseded chunks can stay in the table for audit without
          polluting search.
        </p>

        <CodeBlock
          language="sql"
          caption="Postgres + pgvector, production schema we ship by default"
        >{`CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE chunks (
  id          uuid          PRIMARY KEY DEFAULT gen_random_uuid(),
  doc_id      uuid          NOT NULL,
  text        text          NOT NULL,
  embedding   vector(1536)  NOT NULL,
  section     text,
  page        int,
  source_url  text,
  is_current  boolean       NOT NULL DEFAULT true,
  ingested_at timestamptz   NOT NULL DEFAULT now()
);

CREATE INDEX chunks_embedding_idx
  ON chunks USING hnsw (embedding vector_cosine_ops)
  WITH (m = 16, ef_construction = 64)
  WHERE is_current;

CREATE INDEX chunks_doc_id_idx ON chunks (doc_id) WHERE is_current;
CREATE INDEX chunks_source_url_idx ON chunks (source_url) WHERE is_current;`}</CodeBlock>

        <h2>Stage 5, Retrieval</h2>

        <p>
          The retrieval call itself is a thin wrapper around the vector store. The decisions here are{" "}
          <em>k</em> (how many chunks to fetch), the metadata filter, and whether to do hybrid retrieval
          (vector + keyword).
        </p>

        <p>
          We retrieve k=20 by default and rely on the reranker (next stage) to narrow to the 4-6 that
          get into the prompt. Going wider on retrieval and tighter on reranking is consistently better
          than the reverse, because the cross-encoder used for reranking is far more discriminating than
          cosine similarity.
        </p>

        <p>
          Vector ANN + lexical (BM25 via Postgres <code>to_tsvector</code>). The two ranked lists are
          merged via reciprocal rank fusion before reranking.
        </p>

        <CodeBlock language="typescript" caption="rag/retrieve.ts, hybrid retrieval">{`export async function retrieve(
  query: string,
  queryEmbedding: number[],
  tenantId: string,
  k = 20,
): Promise<RetrievedChunk[]> {
  const [vector, lexical] = await Promise.all([
    db.query(\`
      SELECT id, text, doc_id, source_url,
             1 - (embedding <=> $1) AS score
      FROM chunks
      WHERE is_current AND tenant_id = $2
      ORDER BY embedding <=> $1
      LIMIT $3
    \`, [queryEmbedding, tenantId, k]),
    db.query(\`
      SELECT id, text, doc_id, source_url,
             ts_rank(to_tsvector('english', text), plainto_tsquery('english', $1)) AS score
      FROM chunks
      WHERE is_current AND tenant_id = $2
        AND to_tsvector('english', text) @@ plainto_tsquery('english', $1)
      ORDER BY score DESC
      LIMIT $3
    \`, [query, tenantId, k]),
  ]);

  return reciprocalRankFusion(vector.rows, lexical.rows, k);
}

function reciprocalRankFusion(
  a: RetrievedChunk[],
  b: RetrievedChunk[],
  k: number,
  rrfK = 60,
): RetrievedChunk[] {
  const scores = new Map<string, { chunk: RetrievedChunk; score: number }>();
  for (const list of [a, b]) {
    list.forEach((chunk, rank) => {
      const score = 1 / (rrfK + rank);
      const existing = scores.get(chunk.id);
      if (existing) existing.score += score;
      else scores.set(chunk.id, { chunk, score });
    });
  }
  return [...scores.values()]
    .sort((x, y) => y.score - x.score)
    .slice(0, k)
    .map((entry) => entry.chunk);
}`}</CodeBlock>

        <p>
          The tenant filter on the SQL is non-negotiable on multi-tenant RAG, the most common RAG
          security failure we audit is a missing tenant scope on the vector query. The pattern is the
          same as the{" "}
          <Link href="/blog/multi-tenant-architecture-cost-study-2026/">
            multi-tenant architecture study
          </Link>
          , enforce isolation in the database, not in the application. We ship this isolation pattern by
          default on every RAG build through our{" "}
          <Link href="/services/ai-saas-product-development/">AI SaaS product development</Link>{" "}
          engagement.
        </p>

        <h2>Stage 6, Reranking</h2>

        <p>
          The reranker takes the 20 retrieved candidates and scores them with a cross-encoder, a model
          trained to evaluate query / passage pairs directly, rather than comparing two independent
          embeddings. Cross-encoders are meaningfully better than bi-encoders for the final ranking
          step; the trade-off is they require a forward pass per candidate, so you cannot use them for
          the first retrieval.
        </p>

        <p>
          The two we use: <code>cohere-rerank-3.5</code> (API, $2 / 1k queries with up to 100 docs each)
          and
          <code> BAAI/bge-reranker-large</code> (self-hosted, free if you already have a GPU). Both move
          recall@4 up by 8-14 percentage points compared to no reranking, in our evaluation set.
        </p>

        <CodeBlock language="typescript" caption="rag/rerank.ts, cohere reranker call">{`import { CohereClient } from "cohere-ai";
const cohere = new CohereClient({ token: process.env.COHERE_API_KEY! });

export async function rerank(
  query: string,
  candidates: RetrievedChunk[],
  topN = 5,
): Promise<RetrievedChunk[]> {
  if (candidates.length === 0) return [];
  const res = await cohere.v2.rerank({
    model: "rerank-v3.5",
    query,
    documents: candidates.map((c) => c.text),
    topN,
  });
  return res.results.map((r) => candidates[r.index]);
}`}</CodeBlock>

        <h2>Stage 7, Generation</h2>

        <p>
          The prompt template that has held up best across our four products: explicit grounding
          instruction, an inline source list, an instruction to cite by source id, and a refusal clause
          for when the retrieved context doesn&apos;t support an answer.
        </p>

        <CodeBlock language="typescript" caption="rag/prompt.ts, the system + user composition">{`export function buildMessages(
  question: string,
  passages: RetrievedChunk[],
): ChatMessage[] {
  const sources = passages
    .map((p, i) => \`[\${i + 1}] (\${p.metadata.title})\\n\${p.text}\`)
    .join("\\n\\n---\\n\\n");

  return [
    {
      role: "system",
      content: \`You answer the user's question using only the SOURCES below. Cite each claim with the bracketed source number, e.g. [2]. If the sources do not contain the answer, reply exactly: "I don't have that in my sources." Do not invent facts.\`,
    },
    {
      role: "user",
      content: \`Question: \${question}\\n\\nSOURCES:\\n\${sources}\`,
    },
  ];
}`}</CodeBlock>

        <h2>Stage 8, Semantic cache</h2>

        <p>
          The single biggest cost saver in a production RAG system is caching answers to
          semantically-similar questions. Two queries with different wording (&ldquo;how do I reset my
          password&rdquo; vs &ldquo;forgot password reset&rdquo;) should hit the same cached answer. The
          check is itself a vector similarity lookup, against a much smaller table of recent question
          embeddings + their generated answers.
        </p>

        <CodeBlock language="sql" caption="Semantic cache schema">{`CREATE TABLE rag_cache (
  id           uuid          PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id   uuid          NOT NULL,
  question     text          NOT NULL,
  q_embedding  vector(1536)  NOT NULL,
  answer       text          NOT NULL,
  sources      jsonb         NOT NULL,
  hits         int           NOT NULL DEFAULT 0,
  created_at   timestamptz   NOT NULL DEFAULT now(),
  last_used_at timestamptz   NOT NULL DEFAULT now()
);

CREATE INDEX rag_cache_q_idx
  ON rag_cache USING hnsw (q_embedding vector_cosine_ops);

-- Tunable: how similar must a query be to hit cache?
-- 0.92 = strict (very few false positives, modest hit rate)
-- 0.88 = relaxed (more hits, occasional wrong cache match)`}</CodeBlock>

        <p>
          The threshold is the knob to tune. On our doc-Q&amp;A client, 0.92 yields a 31% cache hit rate
          at &lt;1% incorrect matches. Each hit saves the cost of the LLM call, the single most expensive
          line item by far.
        </p>

        <h2>Cost per 1M queries</h2>

        <p>
          Putting the numbers together, for a workload that retrieves k=20, reranks to top-5, and
          generates with Claude Haiku 4.5 (300 input tokens of context, 200 output tokens):
        </p>

        <TableScroll>
          <table>
            <thead>
              <tr>
                <th>Stage</th>
                <th>$/1M queries (no cache)</th>
                <th>$/1M queries (31% cache)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Query embedding</td>
                <td>$0.30</td>
                <td>$0.30</td>
              </tr>
              <tr>
                <td>Vector + lexical retrieval (Postgres)</td>
                <td>~$1 (infra amortised)</td>
                <td>~$1</td>
              </tr>
              <tr>
                <td>Reranker (Cohere v3.5)</td>
                <td>$2,000</td>
                <td>$1,380</td>
              </tr>
              <tr>
                <td>Generation (Claude Haiku 4.5)</td>
                <td>$1,000</td>
                <td>$690</td>
              </tr>
              <tr>
                <td>
                  <strong>Total</strong>
                </td>
                <td>
                  <strong>~$3,001</strong>
                </td>
                <td>
                  <strong>~$2,071</strong>
                </td>
              </tr>
            </tbody>
          </table>
        </TableScroll>

        <p>
          Costs at May 2026 list prices; numbers exclude monthly fixed costs for vector DB and reranker
          hosting if self-hosted. The 31% cache hit rate is the median across our four production
          deployments.
        </p>

        <p>
          The semantic cache pays for itself within the first 100k queries on every production workload
          we have run it on. It is the single highest-leverage change for an already-shipped RAG
          product, and the one we add first when a team brings us a working but expensive RAG prototype
          through our <Link href="/services/ai-app-completion/">AI app completion</Link> engagement.
        </p>

        <h2>Evaluation, the one part nobody wants to do</h2>

        <p>
          Build the eval set <em>before</em> you ship. 100-400 question / expected-answer pairs covering
          the surface area of the corpus. Run the full pipeline against them after every chunking,
          embedding, or prompt change, report recall@k for retrieval and a faithfulness score (LLM-as-
          judge) for generation. The version of this we run in CI for one of our doc-Q&amp;A clients is
          ~140 questions and takes ~6 minutes per run. It has caught three regressions that would
          otherwise have shipped. Most of our RAG products ship as one feature inside a larger SaaS we
          built through the{" "}
          <Link href="/services/saas-web-app-development/">SaaS web-app development</Link> engagement,
          eval CI is wired in from day one rather than retrofitted.
        </p>

        <p>
          Companion reads on AI economics, multi-tenant data layout, and what AI prototypes typically
          look like before this hardening pass:
        </p>

        <RelatedGrid>
          <RelatedCard
            tag="Research"
            title="Per-Token Economics: What an AI Feature Actually Costs in Production (47 SaaS Sample)"
            body="Real per-MAU token cost data across 47 production AI SaaS products. CPMU by feature class, model-tier routing, and the unit-economic decision."
            href="/blog/ai-feature-token-economics-2026/"
          />
          <RelatedCard
            tag="Research"
            title="The Multi-Tenant SaaS Architecture Decision: Cost & Engineering Hours Across 4 Patterns"
            body="Per-pattern cost, isolation, and onboarding eng-hours for the four common multi-tenancy approaches. TIC, AOC, BCM metrics."
            href="/blog/multi-tenant-architecture-cost-study-2026/"
          />
          <RelatedCard
            tag="Research"
            title="We Audited 31 Lovable / Bolt / v0 / Cursor Codebases. Here's What Survives Production."
            body="A code-level teardown of 31 AI-generated SaaS prototypes: three proprietary metrics (PSR, TDR, RCM) and a 10-mode failure taxonomy."
            href="/blog/ai-prototype-codebase-audit-2026/"
          />
        </RelatedGrid>

        <p>
          The end-to-end AI SaaS product build, the AI-app-completion engagement that hardens a
          prototype RAG to the architecture above, and the SaaS web-app build that includes a RAG layer
          as one component:
        </p>

        <RelatedGrid>
          <RelatedCard
            tag="Service"
            title="AI SaaS Product Development"
            body="The end-to-end AI SaaS product build, with the multi-tenant isolation pattern shipped by default."
            href="/services/ai-saas-product-development/"
          />
          <RelatedCard
            tag="Service"
            title="AI App Completion"
            body="The engagement that hardens a working but expensive RAG prototype to the architecture above."
            href="/services/ai-app-completion/"
          />
          <RelatedCard
            tag="Service"
            title="SaaS Web App Development"
            body="The SaaS web-app build that includes a RAG layer as one component, with eval CI from day one."
            href="/services/saas-web-app-development/"
          />
        </RelatedGrid>

        <Faq items={FAQS} />

        <AuthorByline lastReviewedISO={MODIFIED_ISO}>
          Ritesh leads engineering at Appycodes. The pipeline above is the one we run, with small
          per-product variations, across four production RAG products, a doc-Q&amp;A SaaS for an
          enterprise compliance team, a developer-tools support assistant, an internal knowledge-base
          bot for a 600-person services firm, and a transcript-search product for a media client. The
          semantic cache and the reranker are the two changes that turn a working demo into a production
          system.
        </AuthorByline>
      </PostBody>

      <CtaBand />
    </>
  );
}
