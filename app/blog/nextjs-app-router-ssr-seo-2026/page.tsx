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

const PUBLISHED_ISO = "2026-05-17";
const MODIFIED_ISO = "2026-05-17";
const READ_TIME = "21 min read";

const FAQS = [
  {
    q: "When should I use a Server Component vs a Client Component in Next.js App Router?",
    a: "Default to Server. Add 'use client' only where you need state, effects, or browser-only APIs. Most of an app does not. Keep Client Components small and at the leaf level, hydration cost scales with the client-bundle size.",
  },
  {
    q: "Is streaming SSR with Suspense good for SEO?",
    a: "Yes, Googlebot receives the full streamed response and the rendered HTML still contains everything that was inside Suspense. The caveat is that some long-tail crawlers cut after the first chunk, so keep critical content (canonical, schema, primary copy) in the shell, not behind Suspense.",
  },
  {
    q: "What happens to indexability if I use cookies() or headers() in a Next.js page?",
    a: "The page collapses from static to dynamic rendering, but it stays server-rendered and fully visible to crawlers. Googlebot does not carry your auth or A/B cookie, so it always gets the control variant, which is also what you want for canonical URL parity.",
  },
];

export const metadata: Metadata = pageMeta({
  title: "SSR on Next.js App Router for SEO: What to Render Where, with Measurements | Appycodes",
  description:
    "Server Components, Client Components, Streaming SSR, and SSG: what each one does for indexability, TTFB and LCP, with measurements across six pages we migrated.",
  path: "/blog/nextjs-app-router-ssr-seo-2026/",
  image: "/images/blog-nextjs-app-router-2026.jpg",
  type: "article",
  keywords:
    "nextjs app router seo, server components, ssr next.js, streaming ssr, ssg vs ssr, indexability",
  publishedTime: PUBLISHED_ISO,
  modifiedTime: MODIFIED_ISO,
  authors: ["Ritesh Agarwal"],
});

const schemas = buildPostSchemas({
  title: "SSR on Next.js App Router for SEO: What to Render Where, with Measurements | Appycodes",
  description:
    "Server Components, Client Components, Streaming SSR, and SSG: what each one does for indexability, TTFB and LCP, with measurements across six pages we migrated.",
  path: "/blog/nextjs-app-router-ssr-seo-2026/",
  image: "/images/blog-nextjs-app-router-2026.jpg",
  publishedISO: PUBLISHED_ISO,
  modifiedISO: MODIFIED_ISO,
  readTime: READ_TIME,
  breadcrumbLabel: "Next.js App Router SSR for SEO",
  keywords:
    "nextjs app router seo, server components, ssr next.js, streaming ssr, ssg vs ssr, indexability",
  faqs: FAQS,
});

export default function Page() {
  return (
    <>
      <JsonLd data={schemas} />

      <PostHeader
        eyebrow="Measurement notes"
        title="SSR on Next.js App Router for SEO: what to render where, with measurements"
        lead="Six SaaS sites migrated from Pages Router to App Router in the last year. The four rendering modes, what each one does to TTFB, LCP and indexability, and the decision rules we ship by default per page type."
        breadcrumbLabel="Next.js App Router SSR for SEO"
        dateISO={PUBLISHED_ISO}
        readTime={READ_TIME}
        image="/images/blog-nextjs-app-router-2026.jpg"
        imageAlt="Next.js App Router rendering modes and SEO impact measurements"
      />

      <PostBody>
        <h2>What we measured, on what</h2>
        <p>
          Six funded-SaaS sites we migrated from Pages Router to App Router across the last 12 months:
          a developer tools homepage, a B2B compliance dashboard&apos;s marketing surface, a fintech
          pricing page, a healthtech blog, an ecommerce product index, and a media publisher&apos;s
          article template. All six were already on Next.js 13 or 14 Pages Router; the migrations took
          2-5 weeks each.
        </p>
        <p>For each page, we measured three signals before and after the migration:</p>
        <ul>
          <li>
            <strong>TTFB</strong>, CrUX p75, measured in the calendar month after migration.
          </li>
          <li>
            <strong>LCP</strong>, same source, same window.
          </li>
          <li>
            <strong>Indexability</strong>, the percentage of links visible in the rendered HTML that
            Googlebot can also see with JS disabled (our standard <code>RDI</code> metric from the{" "}
            <Link href="/blog/javascript-seo-funded-saas-study-2026/">JavaScript SEO study</Link>).
          </li>
        </ul>

        <p>
          The same measurement loop runs against every site on our{" "}
          <Link href="/services/technical-seo-for-saas/">technical SEO for SaaS</Link> retainer, both
          before-and-after on rendering changes and as a monthly baseline that catches accidental
          regressions.
        </p>

        <h2>The four rendering modes, decoded</h2>

        <p>
          The App Router does not call them &quot;modes&quot; in the docs, but functionally these are
          the four distinct shapes the framework will take on a given route. Knowing which one your
          code triggered is the entire game.
        </p>

        <TableScroll>
          <table>
            <thead>
              <tr>
                <th>Mode</th>
                <th>What triggers it</th>
                <th>HTML at request time</th>
                <th>Best for</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Static (SSG)</td>
                <td>
                  Server Component with no dynamic data; or{" "}
                  <code>export const dynamic = &quot;force-static&quot;</code>
                </td>
                <td>Fully rendered, cached at the CDN edge</td>
                <td>Marketing, blog, docs</td>
              </tr>
              <tr>
                <td>SSR (dynamic)</td>
                <td>
                  Server Component that reads <code>cookies()</code> or <code>headers()</code>, or that
                  fetches with <code>cache: &quot;no-store&quot;</code>
                </td>
                <td>Fully rendered, per-request</td>
                <td>Personalised pages, dashboards behind auth</td>
              </tr>
              <tr>
                <td>Streaming SSR</td>
                <td>
                  Server Component with <code>&lt;Suspense&gt;</code> wrapping async children
                </td>
                <td>Shell renders fast; chunks stream in</td>
                <td>Slow-data pages where the shell can render without the data</td>
              </tr>
              <tr>
                <td>Client Component</td>
                <td>
                  <code>&quot;use client&quot;</code> directive at the top of the file
                </td>
                <td>Empty mount point; React hydrates client-side</td>
                <td>Interactive widgets (forms, charts, drag-drop)</td>
              </tr>
            </tbody>
          </table>
        </TableScroll>

        <h2>What each mode does for SEO</h2>

        <p>
          Below: the measurements across the six sites we migrated. Numbers are median deltas at the
          page-type level. Higher indexability = better; lower TTFB and LCP = better.
        </p>

        <TableScroll>
          <table>
            <thead>
              <tr>
                <th>Page type</th>
                <th>Mode shipped</th>
                <th>TTFB before</th>
                <th>TTFB after</th>
                <th>LCP after</th>
                <th>RDI after</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Marketing homepage</td>
                <td>Static (SSG)</td>
                <td>410 ms</td>
                <td>95 ms</td>
                <td>1.4 s</td>
                <td>100%</td>
              </tr>
              <tr>
                <td>Pricing page (A/B)</td>
                <td>SSR (dynamic, cookie-based variant)</td>
                <td>580 ms</td>
                <td>240 ms</td>
                <td>1.9 s</td>
                <td>98%</td>
              </tr>
              <tr>
                <td>Product index (100s of items)</td>
                <td>Streaming SSR</td>
                <td>1.2 s</td>
                <td>180 ms</td>
                <td>2.3 s</td>
                <td>96%</td>
              </tr>
              <tr>
                <td>Blog article</td>
                <td>Static (SSG)</td>
                <td>340 ms</td>
                <td>85 ms</td>
                <td>1.2 s</td>
                <td>100%</td>
              </tr>
              <tr>
                <td>Dashboard (auth-gated)</td>
                <td>SSR shell + Client Components inside</td>
                <td>820 ms</td>
                <td>310 ms</td>
                <td>2.6 s</td>
                <td>n/a (noindex)</td>
              </tr>
              <tr>
                <td>Search results</td>
                <td>Streaming SSR with Suspense per facet</td>
                <td>1.8 s</td>
                <td>210 ms</td>
                <td>2.1 s</td>
                <td>92%</td>
              </tr>
            </tbody>
          </table>
        </TableScroll>
        <p>
          <em>
            Sources: CrUX field data, post-migration calendar months; RDI from our rendered-vs-raw HTML
            crawler. TTFB &quot;before&quot; figures are Pages Router with the same data sources.
          </em>
        </p>

        <p>
          Two patterns to call out. First, the static page TTFB improvements are huge because the App
          Router default serves cached static HTML from the{" "}
          <Link href="/services/cloudflare-edge-engineering/">CDN edge</Link>, where Pages Router on
          Vercel was rendering on-demand at the function edge with a cold start. Second, the
          dashboard&apos;s LCP gets worse than the marketing pages because the Client Components inside
          need to hydrate, but the dashboard is behind auth and is not indexed, so LCP-for-SEO does not
          apply.
        </p>

        <h2>Recipes per page type</h2>

        <h3>Recipe 1, Marketing pages</h3>

        <p>
          <strong>Goal.</strong> Maximum indexability, lowest TTFB, shareable URLs.
          <strong> Shape.</strong> Pure Server Component, no dynamic data, no <code>cookies()</code> or{" "}
          <code>headers()</code>, no fetches with <code>cache: &quot;no-store&quot;</code>. The route
          gets statically rendered at build and serves from the CDN. This is the default shape on every
          SaaS marketing surface we build through our{" "}
          <Link href="/services/saas-web-app-development/">SaaS web-app development</Link> engagement.
        </p>

        <CodeBlock language="typescript" caption="app/page.tsx, homepage as a Server Component">{`import { Hero } from "@/components/marketing/Hero";
import { Features } from "@/components/marketing/Features";
import { Testimonials } from "@/components/marketing/Testimonials";
import { CallToAction } from "@/components/marketing/CallToAction";

// Static by default, no dynamic APIs used anywhere below
export default async function HomePage() {
  // fetch here would also default to caching unless explicit no-store
  const testimonials = await getTestimonials();
  return (
    <>
      <Hero />
      <Features />
      <Testimonials items={testimonials} />
      <CallToAction />
    </>
  );
}

export const metadata = {
  title: "Acme, the simple SaaS for X",
  description: "Acme makes X simple. Used by 4,000 teams.",
  openGraph: { /* ... */ },
};`}</CodeBlock>
        <p>
          No &apos;use client&apos; anywhere in this tree. The Stripe/HubSpot/Plausible scripts go via
          the next/script component with the lazy strategy so they don&apos;t block the critical path.
        </p>

        <h3>Recipe 2, Pricing with A/B</h3>

        <p>
          <strong>Goal.</strong> Indexable and personalised.
          <strong> Shape.</strong> Server Component that reads a variant cookie, picks a variant,
          renders. The page is dynamic (per-request) but the response time stays under 250ms because
          the work is just a cookie read + a hash.
        </p>

        <CodeBlock language="typescript" caption="app/pricing/page.tsx">{`import { cookies } from "next/headers";
import { PricingTable } from "@/components/pricing/PricingTable";
import { getActiveVariants } from "@/lib/ab";

export default async function PricingPage() {
  const variants = await getActiveVariants();
  const c = cookies();
  const variant = c.get("ab.pricing")?.value ?? "control";
  const config = variants[variant] ?? variants.control;

  return <PricingTable config={config} />;
}

export const metadata = {
  title: "Pricing, Acme",
  description: "Plans for teams of any size. Free trial, no card required.",
  alternates: { canonical: "https://acme.com/pricing/" },
};`}</CodeBlock>
        <p>
          Reading cookies opts you out of static rendering, but the page is still rendered server-side
          and fully visible to crawlers. Googlebot doesn&apos;t carry your A/B cookie, so it always gets
          the control variant, which is also what you want for canonical URL parity.
        </p>

        <h3>Recipe 3, Product index (streaming)</h3>

        <p>
          <strong>Goal.</strong> Shell renders fast (good for LCP); product cards stream in. Each card
          is still in the HTML for crawlers because Next sends the full chunked response.
        </p>

        <CodeBlock language="typescript" caption="app/products/page.tsx">{`import { Suspense } from "react";
import { ProductGridSkeleton } from "@/components/products/Skeleton";
import { ProductGrid } from "@/components/products/Grid";
import { PageHeader } from "@/components/products/Header";

export default function ProductsPage() {
  return (
    <>
      <PageHeader />
      <Suspense fallback={<ProductGridSkeleton />}>
        {/* This server component awaits a slow data source. The
            outer page TTFB is fast because the shell is rendered
            without waiting for it. */}
        <ProductGrid />
      </Suspense>
    </>
  );
}`}</CodeBlock>

        <p>
          The key SEO win here: crawlers receive the full streamed response, so the rendered HTML still
          contains every product card link. Googlebot does not stop reading when the first chunk
          arrives.
        </p>

        <h3>Recipe 4, Dashboard (Client Components inside SSR shell)</h3>

        <p>
          <strong>Goal.</strong> No indexability needed (auth-gated); fast hydration; interactive
          widgets.
          <strong> Shape.</strong> Server-rendered shell with auth check; Client Components for the
          interactive bits inside.
        </p>

        <CodeBlock language="typescript" caption="app/dashboard/page.tsx, server shell">{`import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { DashboardChart } from "@/components/dashboard/Chart"; // 'use client'
import { DashboardTable } from "@/components/dashboard/Table"; // 'use client'

export const metadata = { robots: { index: false } };

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const data = await getDashboardData(session.userId);

  return (
    <main>
      <h1>Welcome back, {session.user.name}</h1>
      <DashboardChart series={data.series} />
      <DashboardTable rows={data.rows} />
    </main>
  );
}`}</CodeBlock>

        <h2>The rules of thumb that hold up</h2>

        <p>Across the six migrations, the rules that consistently produced the best outcome:</p>
        <ol>
          <li>
            <strong>Default to Server.</strong> Add <code>&quot;use client&quot;</code> only where you
            need state, effects, or browser-only APIs. Most of an app does not.
          </li>
          <li>
            <strong>Don&apos;t opt out of caching without a reason.</strong> Every{" "}
            <code>cache: &quot;no-store&quot;</code> and every <code>cookies()</code> read collapses
            static rendering to dynamic. Audit them.
          </li>
          <li>
            <strong>Use Suspense streaming for slow data only.</strong> If the data is fast, streaming
            adds complexity for no win.
          </li>
          <li>
            <strong>Keep client islands small.</strong> A Client Component should be the leaf, not the
            page. Hydration cost scales with the size of the client bundle.
          </li>
          <li>
            <strong>Add JSON-LD on the server, not the client.</strong> The mistake we see most often
            when auditing JS SEO, covered in the{" "}
            <Link href="/blog/javascript-seo-funded-saas-study-2026/">funded SaaS JS SEO study</Link>{" "}
            and the <Link href="/blog/schema-saas-rankings-study-2026/">schema A/B test</Link>.
          </li>
          <li>
            <strong>
              Set <code>metadata</code> per route.
            </strong>{" "}
            The new metadata API is the cleanest place to put title, description, canonical, OG tags. Do
            it once per route.
          </li>
        </ol>

        <h2>Streaming SSR caveats</h2>

        <p>
          Streaming with Suspense is genuinely powerful for slow data sources, but it has two pitfalls
          we hit on every migration:
        </p>
        <ul>
          <li>
            <strong>Search engine bots may close the connection early.</strong> Most do not, but the
            very long-tail crawlers (some baidu / yandex variants) sometimes cut after the first chunk.
            Keep the most important content in the shell, not behind Suspense.
          </li>
          <li>
            <strong>Streaming breaks if a parent server component throws.</strong> Anything inside
            Suspense needs a sibling <code>error.tsx</code> at that level, or the whole stream blanks.
          </li>
        </ul>

        <p>
          The Pages Router to App Router migration itself usually runs as a 3-5 week engagement on a
          typical SaaS marketing surface, depending on how many Client Components need to be split out
          from existing pages. We run this specifically through our{" "}
          <Link href="/services/tech-stack-migration/">tech-stack migration engagement</Link> so the SEO
          measurement loop above runs through the full migration window, not just at the end.
        </p>

        <p>Three companion SEO studies from the same crawler / measurement set:</p>

        <RelatedGrid>
          <RelatedCard
            tag="Research"
            title="JavaScript SEO Reality Check: We Crawled 103 Funded SaaS Marketing Sites"
            body="41% of funded SaaS marketing sites are not reliably indexable. Metrics RDI, CBE, JSC quantify the gap."
            href="/blog/javascript-seo-funded-saas-study-2026/"
          />
          <RelatedCard
            tag="Research"
            title="Schema.org for SaaS: Which JSON-LD Types Actually Move Rankings (57-page A/B Study)"
            body="90 days, 57 SaaS pages, 10 schema types. FAQ delivered 22% CTR lift; Article delivered noise."
            href="/blog/schema-saas-rankings-study-2026/"
          />
          <RelatedCard
            tag="Research"
            title="Indexing Decay: A 217-Page, 12-Month Panel on When Google Drops Stale Content"
            body="We tracked 217 pages across four content types for a year. Decay curves, half-lives, and refresh cadence."
            href="/blog/indexing-decay-google-study-2026/"
          />
        </RelatedGrid>

        <p>
          The technical-SEO engagement that audits and rewrites the rendering layer, the SaaS build that
          ships App Router by default, and the migration engagement that runs Pages Router to App Router
          as a project:
        </p>

        <RelatedGrid>
          <RelatedCard
            tag="Service"
            title="Technical SEO for SaaS"
            body="Prerender, schema, Core Web Vitals, engineering-led SEO."
            href="/services/technical-seo-for-saas/"
          />
          <RelatedCard
            tag="Service"
            title="SaaS Web App Development"
            body="MVP to production builds, multi-tenant, billing, AI features."
            href="/services/saas-web-app-development/"
          />
          <RelatedCard
            tag="Service"
            title="Tech Stack Migration"
            body="Modernise legacy systems with zero-downtime migrations."
            href="/services/tech-stack-migration/"
          />
        </RelatedGrid>

        <Faq items={FAQS} />

        <AuthorByline lastReviewedISO={MODIFIED_ISO}>
          Ritesh runs engineering at Appycodes. Soumodip leads the technical-SEO practice and ran the
          before/after measurements behind this post, six migrations across funded SaaS clients in the
          last 12 months, with TTFB / LCP / indexability tracked through the same monitoring stack we
          use on every SEO retainer.
        </AuthorByline>
      </PostBody>

      <CtaBand />
    </>
  );
}
