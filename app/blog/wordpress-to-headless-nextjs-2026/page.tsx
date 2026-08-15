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
import { buildPostSchemas, type FaqPair } from "@/lib/blog-post";

const PUBLISHED_ISO = "2026-06-02";
const MODIFIED_ISO = "2026-06-02";
const READ_TIME = "18 min read";

const FAQS: FaqPair[] = [
  {
    q: "Is headless WordPress with Next.js faster than a normal WordPress site?",
    a: "Usually by an order of magnitude. A headless front end serves pre-built static HTML from a CDN edge node, so time-to-first-byte drops from roughly 400-800 ms (PHP and MySQL rendering on every request) to about 20-80 ms. The reader is handed a cached file near them instead of waiting for the origin to assemble the page.",
  },
  {
    q: "Does converting WordPress to headless Next.js hurt SEO?",
    a: "No, done with static generation or server rendering it usually helps. The content ships inside the HTML, which is the most indexable shape there is, and faster LCP and TTFB are ranking inputs. The only thing to avoid is rendering content solely on the client; keep it server-rendered and Googlebot sees everything.",
  },
  {
    q: "How does a headless setup stop WordPress brute-force attacks?",
    a: "The WordPress origin is moved to a private hostname behind authentication (HTTP Basic Auth or Cloudflare Access), so wp-login.php and xmlrpc.php are no longer on the public internet. Brute-force bots get a 401 before they ever reach WordPress, there is no public login form left to attack.",
  },
  {
    q: "What happens to my site if WordPress goes down?",
    a: "The public site stays up. Because pages are static and cached at the CDN edge, they keep serving exactly as they were even if the WordPress origin is offline, overwhelmed, or in maintenance. The only thing that pauses is new edits going live, which resume the moment WordPress is back.",
  },
  {
    q: "Can editors still use the WordPress editor and preview drafts after going headless?",
    a: "Yes. Editors keep writing in Gutenberg and hit Publish as normal; a webhook tells Next.js to refresh the affected pages within a second or two. Draft preview is wired up with Next.js Draft Mode, which fetches unpublished content from WordPress with credentials and renders it on a private URL.",
  },
  {
    q: "Do existing WordPress plugins still work after going headless?",
    a: "Content and API plugins (custom fields, WPGraphQL, SEO data) keep working because their data is read over the API. Plugins that render into the theme, related-post widgets, page builders, AMP, do not, because there is no public theme for them to inject into. Those features get rebuilt in the Next.js front end.",
  },
];

export const metadata: Metadata = pageMeta({
  title: "WordPress to Headless Next.js: Faster, Fully Cached & Attack-Proof | Appycodes",
  description:
    "How to convert a WordPress news or blog site into a headless Next.js front end that reads the WP REST API, ships as static + ISR, caches globally at the edge, and locks the WordPress origin away from brute-force attacks and downtime.",
  path: "/blog/wordpress-to-headless-nextjs-2026/",
  image: "/images/blog-wordpress-headless-nextjs-2026.jpg",
  type: "article",
  keywords:
    "headless wordpress, wordpress nextjs, wordpress rest api, wpgraphql, headless cms, wordpress to nextjs, decoupled wordpress, wordpress security, isr nextjs",
  publishedTime: PUBLISHED_ISO,
  modifiedTime: MODIFIED_ISO,
  authors: ["Ritesh Agarwal"],
});

const schemas = buildPostSchemas({
  title: "WordPress to Headless Next.js: Faster, Fully Cached & Attack-Proof | Appycodes",
  description:
    "How to convert a WordPress news or blog site into a headless Next.js front end that reads the WP REST API, ships as static + ISR, caches globally at the edge, and locks the WordPress origin away from brute-force attacks and downtime.",
  path: "/blog/wordpress-to-headless-nextjs-2026/",
  image: "/images/blog-wordpress-headless-nextjs-2026.jpg",
  publishedISO: PUBLISHED_ISO,
  modifiedISO: MODIFIED_ISO,
  readTime: READ_TIME,
  breadcrumbLabel: "WordPress to headless Next.js",
  keywords:
    "headless wordpress, wordpress nextjs, wordpress rest api, wpgraphql, headless cms, wordpress to nextjs, decoupled wordpress, wordpress security, isr nextjs",
  faqs: FAQS,
});

export default function Page() {
  return (
    <>
      <JsonLd data={schemas} />

      <PostHeader
        eyebrow="Architecture guide"
        title="WordPress to headless Next.js, faster, fully cached, and immune to downtime and brute force"
        lead="Take a news or blog site running on WordPress. Keep WordPress as the editor, but stop letting the public touch it. A Next.js front end reads the content WordPress already exposes over JSON, renders it as static pages cached at the edge, and refreshes the moment an editor hits Publish. The result is an order of magnitude faster, survives traffic spikes, and removes the login page attackers were hammering, because the public never reaches WordPress at all."
        breadcrumbLabel="WordPress to headless Next.js"
        dateISO={PUBLISHED_ISO}
        readTime={READ_TIME}
        authorName="Ritesh + Debarshi"
        image="/images/blog-wordpress-headless-nextjs-2026.jpg"
        imageAlt="Headless WordPress feeding a Next.js front end cached at the CDN edge"
      />

      <PostBody>
        <h2>The problem with a busy WordPress site</h2>
        <p>
          Picture a regional news site. Twenty editors, a few thousand articles, a Gutenberg workflow
          everyone already knows. On a normal day it is fine. Then a story breaks, traffic goes 20x in
          an hour, and PHP-FPM and MySQL fall over while the homepage is trying to render the same query
          for every one of those visitors. The cache plugin helps until it does not, and the one
          afternoon you actually needed the site, it served 503s.
        </p>
        <p>
          Underneath that is a second, quieter problem: <code>wp-login.php</code> and{" "}
          <code>xmlrpc.php</code> are sitting on the public internet, and bots find them within minutes
          of a domain going live. We open most forensic jobs on exactly this pattern, see the{" "}
          <Link href="/blog/wordpress-plugin-vulnerability-study-2026/">
            217-plugin vulnerability audit
          </Link>{" "}
          for what gets through. And the reason the homepage is slow in the first place is rarely the
          host; it is the front end, as the{" "}
          <Link href="/blog/wordpress-performance-data-study-2026/">100-site performance study</Link>{" "}
          found across the board.
        </p>
        <p>
          Going headless solves all three at once, speed, uptime, and attack surface, without throwing
          away the editor your team already lives in. This is the architecture we ship on a{" "}
          <Link href="/services/headless-wordpress-development/">headless WordPress engagement</Link>,
          and the rest of this guide is how to build it.
        </p>

        <h2>What &ldquo;headless&rdquo; actually means here</h2>
        <p>
          A normal WordPress install does two jobs: it stores and edits content (the admin, the
          database, Gutenberg) and it renders the public HTML (the theme, PHP templates, plugins on the
          front end). Headless keeps the first job and deletes the second. WordPress becomes a{" "}
          <strong>content API</strong>; a separate Next.js app becomes the only thing the public ever
          sees.
        </p>
        <ul>
          <li>
            <strong>WordPress (private origin)</strong>, wp-admin, the database, media uploads, the REST
            API. Lives on a locked-down hostname like <code>cms.example.com</code> that is never
            advertised.
          </li>
          <li>
            <strong>Next.js (public front end)</strong>, pulls content at build and on a schedule,
            renders static HTML, serves from a global CDN at <code>www.example.com</code>.
          </li>
        </ul>
        <p>
          The two only talk over HTTPS+JSON, on your terms, with credentials. Nothing else about the
          editorial workflow changes, editors still write in Gutenberg and hit Publish.
        </p>

        <h2>What WordPress already gives you for free</h2>
        <p>
          The reason this is so achievable is that WordPress ships a complete read API out of the box at{" "}
          <code>/wp-json</code>. You do not install anything to get posts, pages, categories, tags,
          media and authors as JSON. Custom post types join the API the moment they are registered with{" "}
          <code>show_in_rest</code>.
        </p>

        <CodeBlock
          language="bash"
          caption="The WordPress REST API, available on every install, no plugin required"
        >{`# Read-only JSON endpoints exposed by default:
curl "https://cms.example.com/wp-json/wp/v2/posts?per_page=10&_embed"
curl "https://cms.example.com/wp-json/wp/v2/pages"
curl "https://cms.example.com/wp-json/wp/v2/categories"
curl "https://cms.example.com/wp-json/wp/v2/tags"
curl "https://cms.example.com/wp-json/wp/v2/media/123"
curl "https://cms.example.com/wp-json/wp/v2/users"

# _embed inlines the featured image, author and terms so you avoid N+1 calls.
# Custom post types appear automatically once registered for REST:
curl "https://cms.example.com/wp-json/wp/v2/breaking-news"`}</CodeBlock>

        <CodeBlock
          language="php"
          caption="wp-content/mu-plugins/news-cpt.php, a custom type the REST API can see"
        >{`<?php
add_action('init', function () {
  register_post_type('breaking_news', [
    'label'        => 'Breaking News',
    'public'       => true,
    'has_archive'  => true,
    'show_in_rest' => true,        // <- this line is what creates the JSON route
    'rest_base'    => 'breaking-news',
    'supports'     => ['title', 'editor', 'excerpt', 'thumbnail', 'custom-fields'],
  ]);
});`}</CodeBlock>

        <p>
          Two things the raw REST API does <em>not</em> hand you cleanly are the navigation menus and
          deeply structured field data. For both, the answer on a serious build is{" "}
          <strong>WPGraphQL</strong>, one plugin that turns the whole site into a typed GraphQL schema,
          including menus (via WPGraphQL Menus), Advanced Custom Fields (via WPGraphQL for ACF), and
          exactly-the-fields-you-asked-for responses that keep payloads small. REST is perfectly fine
          for a simple blog; WPGraphQL is what we reach for once menus, ACF and CPT relationships are in
          play.
        </p>

        <h2>Mapping the site structure to Next.js routes</h2>
        <p>
          Everything the old theme rendered has a one-to-one home in the Next.js App Router. You are
          re-creating the same URL structure so existing links and rankings carry over, URL parity is
          the whole game in a migration, the same discipline behind a{" "}
          <Link href="/services/tech-stack-migration/">tech-stack migration</Link>.
        </p>

        <TableScroll>
          <table>
            <thead>
              <tr>
                <th>WordPress concept</th>
                <th>REST / GraphQL source</th>
                <th>Next.js route</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Single post</td>
                <td>
                  <code>/wp/v2/posts?slug=</code>
                </td>
                <td>
                  <code>app/[slug]/page.tsx</code>
                </td>
              </tr>
              <tr>
                <td>Page</td>
                <td>
                  <code>/wp/v2/pages?slug=</code>
                </td>
                <td>
                  <code>app/[...path]/page.tsx</code>
                </td>
              </tr>
              <tr>
                <td>Category / tag archive</td>
                <td>
                  <code>/wp/v2/posts?categories=</code>
                </td>
                <td>
                  <code>app/category/[slug]/page.tsx</code>
                </td>
              </tr>
              <tr>
                <td>Custom post type</td>
                <td>
                  <code>/wp/v2/breaking-news</code>
                </td>
                <td>
                  <code>app/news/[slug]/page.tsx</code>
                </td>
              </tr>
              <tr>
                <td>Pagination</td>
                <td>
                  <code>?page=2&amp;per_page=20</code> + <code>X-WP-TotalPages</code> header
                </td>
                <td>
                  <code>app/page/[n]/page.tsx</code>
                </td>
              </tr>
              <tr>
                <td>Nav menu</td>
                <td>
                  WPGraphQL <code>menuItems</code>
                </td>
                <td>
                  Shared <code>&lt;SiteHeader /&gt;</code> server component
                </td>
              </tr>
            </tbody>
          </table>
        </TableScroll>

        <h2>Scaffolding the build with an AI coding agent</h2>
        <p>
          This is the part that used to take a fortnight and now takes an afternoon. The WordPress REST
          schema is self-describing, so you can point an AI coding agent, Claude Code is what we use,
          straight at <code>/wp-json</code> and have it generate the types, the data layer and the route
          tree from the live site. It is the same prototype-to-production motion we describe in the{" "}
          <Link href="/blog/lovable-to-production-cost-2026/">Lovable-to-production teardown</Link>,
          applied to a CMS migration.
        </p>
        <p>
          Each prompt produces a reviewable diff. You are the editor, the agent does the typing, you
          keep the architecture decisions.
        </p>

        <CodeBlock language="text" caption="Driving Claude Code from the live WordPress schema">{`> Read https://cms.example.com/wp-json and list every post type, taxonomy and
  REST route. Generate src/types/wp.ts with interfaces for WpPost, WpPage,
  WpCategory, WpMedia and the breaking-news CPT.

> Create lib/wp.ts: a typed fetch wrapper with Basic-Auth from env and Next ISR
  cache tags. Add getPostBySlug, getAllPostSlugs, getPostsByCategory, getMenu.

> Generate the App Router tree: app/[slug] for posts, app/category/[slug] for
  archives with pagination, app/news/[slug] for the CPT. Add generateStaticParams
  to each.

> Build a GutenbergBlocks renderer that maps WordPress block HTML to our
  design-system components, and wire app/api/revalidate + a WP MU-plugin that
  POSTs to it on save_post.`}</CodeBlock>

        <p>
          Treat the output the way you would treat any junior engineer&apos;s PR, read every diff, keep
          the decisions. The leverage is real, but the review is not optional; it is exactly the
          discipline the{" "}
          <Link href="/blog/ai-prototype-codebase-audit-2026/">AI-prototype codebase audit</Link> found
          separates the prototypes that survive production from the ones that do not.
        </p>

        <h2>The data layer</h2>
        <p>
          One thin wrapper around <code>fetch</code> is the entire integration. The two things that
          matter: an <code>Authorization</code> header so a private WordPress will answer, and
          Next&apos;s <code>next.revalidate</code> / cache tags so every response is cached and
          refreshed on a schedule rather than re-fetched per request.
        </p>

        <CodeBlock
          language="typescript"
          caption="lib/wp.ts, one typed wrapper for the whole WordPress API"
        >{`const WP = process.env.WP_API_URL!;       // https://cms.example.com/wp-json
const AUTH = process.env.WP_BASIC_AUTH;   // base64 "user:app_password", server only

export async function wp<T>(path: string, revalidate = 300): Promise<T> {
  const res = await fetch(WP + path, {
    headers: AUTH ? { Authorization: "Basic " + AUTH } : {},
    next: { revalidate, tags: ["wp"] },     // ISR: cache + background refresh
  });
  if (!res.ok) throw new Error("WP " + res.status + " for " + path);
  return res.json() as Promise<T>;
}

export const getPostBySlug = (slug: string) =>
  wp<WpPost[]>("/wp/v2/posts?slug=" + slug + "&_embed").then((r) => r[0]);

export const getAllPostSlugs = () =>
  wp<WpPost[]>("/wp/v2/posts?per_page=100&_fields=slug").then((r) => r.map((p) => p.slug));`}</CodeBlock>

        <h2>Rendering: static at build, fresh on publish</h2>
        <p>
          Each post is statically generated at build and then served as plain HTML from the CDN edge.{" "}
          <code>generateStaticParams</code> enumerates every slug so they are all pre-rendered;{" "}
          <code>revalidate</code> makes the page Incremental Static Regeneration (ISR), so it refreshes
          in the background on a window. The full breakdown of which rendering mode to use where is in
          the{" "}
          <Link href="/blog/nextjs-app-router-ssr-seo-2026/">App Router SSR-for-SEO guide</Link>, for a
          content site, the answer is almost always static + ISR.
        </p>

        <CodeBlock
          language="typescript"
          caption="app/[slug]/page.tsx, every post becomes an edge-cached static page"
        >{`import { notFound } from "next/navigation";
import { getPostBySlug, getAllPostSlugs } from "@/lib/wp";

export const revalidate = 300; // a ceiling, on-demand revalidation makes it instant

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);
  if (!post) notFound();
  return (
    <article>
      <h1 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
      <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
    </article>
  );
}`}</CodeBlock>

        <p>
          The <code>revalidate = 300</code> window is a safety net, not the real refresh path. For a
          news site, &ldquo;up to 5 minutes stale&rdquo; is not good enough, so WordPress tells Next the
          instant anything changes. A tiny must-use plugin fires on <code>save_post</code> and pings a
          revalidation endpoint, which drops the cached responses for that content. Editors hit Publish;
          the live page updates in a second or two.
        </p>

        <CodeBlock
          language="typescript"
          caption="app/api/revalidate/route.ts, WordPress calls this on every publish"
        >{`import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");
  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  revalidateTag("wp");   // next request for that content rebuilds from WP
  return NextResponse.json({ ok: true, revalidated: true });
}`}</CodeBlock>

        <CodeBlock
          language="apache"
          caption="wp-content/mu-plugins/revalidate-next.php, the publish webhook"
        >{`<?php
add_action('save_post', function ($post_id, $post) {
  if (wp_is_post_revision($post_id) || $post->post_status !== 'publish') return;
  $url = 'https://www.example.com/api/revalidate?secret=' . REVALIDATE_SECRET;
  wp_remote_post($url, ['blocking' => false, 'timeout' => 2]);
}, 10, 2);`}</CodeBlock>

        <h2>Hosting and deployment</h2>
        <p>The two halves deploy independently, which is half the point.</p>
        <ul>
          <li>
            <strong>The Next.js front end</strong> goes on Vercel, Netlify or Cloudflare Pages. Push to{" "}
            <code>main</code>, it builds, pre-renders every post, and pushes static assets to the CDN.
            Pull requests get preview deployments so editors can review a redesign on a real URL.
          </li>
          <li>
            <strong>The WordPress origin</strong> stays on whatever cheap, boring host it is already on,
            it now serves JSON to one consumer instead of HTML to the world, so it barely breaks a
            sweat. The static media can move to object storage; we cover exactly that in{" "}
            <Link href="/blog/cloudflare-r2-wordpress-media-2026/">
              Cloudflare R2 as the WordPress media library
            </Link>
            .
          </li>
        </ul>
        <p>
          Config is a handful of environment variables on the front end: <code>WP_API_URL</code>,{" "}
          <code>WP_BASIC_AUTH</code> (or a Cloudflare Access service token) and{" "}
          <code>REVALIDATE_SECRET</code>. The edge and caching layer, cache rules, WAF, redirects, is{" "}
          <Link href="/services/cloudflare-edge-engineering/">Cloudflare edge engineering</Link>{" "}
          territory, and it is what turns &ldquo;a Next.js app&rdquo; into &ldquo;a site that does not go
          down.&rdquo;
        </p>

        <h2>Locking the WordPress origin away</h2>
        <p>
          This is the security win, and it is structural rather than a plugin you bolt on. Once the
          public front end is static, <em>nothing</em> on the internet needs to reach WordPress except
          your build and your revalidation webhook. So you take WordPress off the public internet.
        </p>
        <ol>
          <li>
            <strong>Move it to its own hostname</strong>, <code>cms.example.com</code>, never linked
            from anywhere public.
          </li>
          <li>
            <strong>Require auth on the whole origin.</strong> HTTP Basic Auth is the simplest; the
            front end sends the matching header. Better still, put it behind Cloudflare Access (Zero
            Trust) with a service token the Next.js app presents.
          </li>
          <li>
            <strong>Use Application Passwords</strong> for the REST credentials, scoped to a read-only
            user.
          </li>
          <li>
            <strong>Disable XML-RPC and user enumeration, and 2FA the admin.</strong> Defence in depth
            for the rare authorised session.
          </li>
        </ol>

        <CodeBlock
          language="apache"
          caption=".htaccess at the WordPress root, the origin answers no one without credentials"
        >{`AuthType Basic
AuthName "Restricted CMS"
AuthUserFile /var/www/.htpasswd
Require valid-user

# The Next.js build/ISR sends the matching Authorization header (WP_BASIC_AUTH).
# Optional belt-and-braces: also pin to your build / serverless egress IPs.
#   Require ip 203.0.113.0/24`}</CodeBlock>

        <p>
          Now reason about the attack surface. The brute-force bots hammering <code>wp-login.php</code>{" "}
          get a <code>401</code> before they ever reach WordPress, there is no public login form to
          attack. The plugin vulnerabilities that drive most incidents (the kind we clean up under{" "}
          <Link href="/services/wordpress-security-malware-removal/">
            WordPress security &amp; malware removal
          </Link>
          ) are no longer exposed, because the only public surface is static HTML with no PHP behind it.
          You have not hardened the login page; you have <em> removed it from the internet.</em>
        </p>
        <p>
          And the uptime story falls out of the same design. If WordPress is down for maintenance, gets
          overwhelmed, or simply errors, the static pages keep serving from the CDN exactly as they
          were, the only thing that pauses is <em>new</em> edits going live. A traffic spike hits the
          CDN, which is built for it, not PHP-FPM, which is not. The site your readers see is decoupled
          from the health of the box your editors log into.
        </p>

        <h2>Why this is so much faster, and tougher</h2>
        <p>
          The gains are not marginal; they come from deleting the per-request PHP+MySQL render and
          serving pre-built HTML from a CDN node near the reader. Typical before/after we see on content
          sites:
        </p>

        <TableScroll>
          <table>
            <thead>
              <tr>
                <th>Dimension</th>
                <th>Traditional WordPress</th>
                <th>Headless WP + Next.js</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>TTFB (cached)</td>
                <td>400 to 800 ms (PHP + MySQL per request)</td>
                <td>20 to 80 ms (static HTML from the edge)</td>
              </tr>
              <tr>
                <td>Under a 20x traffic spike</td>
                <td>PHP-FPM / MySQL saturate, 502 / 503</td>
                <td>CDN absorbs it; the origin sees almost nothing</td>
              </tr>
              <tr>
                <td>Brute-force / login surface</td>
                <td>
                  <code>wp-login.php</code> + <code>xmlrpc.php</code> public
                </td>
                <td>Origin private, no public login to attack</td>
              </tr>
              <tr>
                <td>If the origin is down</td>
                <td>Whole site is down</td>
                <td>Static pages keep serving; only edits pause</td>
              </tr>
              <tr>
                <td>Public attack surface</td>
                <td>Every plugin on the request path</td>
                <td>Static HTML, no PHP on the public path</td>
              </tr>
            </tbody>
          </table>
        </TableScroll>
        <p>
          Typical ranges from content-site builds, not a controlled study. The measured WordPress
          baseline, and why the front end, not the host, is usually the bottleneck, is in the{" "}
          <Link href="/blog/wordpress-performance-data-study-2026/">100-site performance study</Link>.
        </p>

        <p>
          The speed is also an SEO story. Static HTML with the content in the markup is the most
          indexable shape there is, fast LCP and TTFB are ranking inputs, and there is no
          JavaScript-rendering gap for Googlebot to trip over, the failure mode we quantified in the{" "}
          <Link href="/blog/javascript-seo-funded-saas-study-2026/">JavaScript SEO study</Link> and keep
          fixed under a{" "}
          <Link href="/services/technical-seo-for-saas/">technical-SEO engagement</Link>. Fresh content
          via on-demand ISR also keeps you on the right side of{" "}
          <Link href="/blog/indexing-decay-google-study-2026/">indexing decay</Link>.
        </p>

        <h2>The trade-offs, and how we handle them</h2>
        <p>
          Headless is not free. The honest list of what gets harder, and the standard answers:
        </p>
        <ul>
          <li>
            <strong>Preview.</strong> Drafts are not public, so editors lose the &ldquo;Preview&rdquo;
            button unless you wire it up. Next.js Draft Mode hits WordPress with auth and renders
            unpublished content on a private URL, a half-day of work, not a blocker.
          </li>
          <li>
            <strong>Forms, search and comments.</strong> Anything interactive that a plugin used to
            render needs a home: a form service or a serverless handler, a build-time search index
            (Pagefind / Algolia) or the WP search endpoint, and a comments service or headless comments
            API.
          </li>
          <li>
            <strong>Gutenberg blocks.</strong> WordPress returns block HTML; you either ship its
            stylesheet or map blocks to your own components. This is the bulk of the front-end work and
            where{" "}
            <Link href="/services/custom-wordpress-development-for-business/">
              knowing WordPress deeply
            </Link>{" "}
            earns its keep.
          </li>
          <li>
            <strong>Frontend-only plugins stop working.</strong> Anything that injects into the theme
            (related-posts widgets, some SEO and AMP plugins) has no theme to inject into. Yoast&apos;s
            data is still readable over the API; its output is not.
          </li>
          <li>
            <strong>Very large sites.</strong> Tens of thousands of posts make a full static build slow,
            lean on on-demand ISR and only pre-build the hot set, generating the long tail on first
            request.
          </li>
        </ul>
        <p>
          If your team genuinely lives inside page-builder plugins for every layout, a headless split
          fights that workflow, and a focused{" "}
          <Link href="/services/wordpress-performance-optimisation/">WordPress performance pass</Link>{" "}
          may be the better spend. Headless pays off hardest for content-led sites, news, blogs, docs,
          marketing, where the editorial model is simple and the read traffic is large. (Greenfield,
          with no legacy WordPress to keep, a{" "}
          <Link href="/services/sanity-cms-development/">Sanity CMS build</Link> is often the cleaner
          starting point.)
        </p>

        <h2>Where this lands</h2>
        <p>
          You keep the editor your team knows and the years of content already in it. You hand the
          public a static, edge-cached front end that is an order of magnitude faster, shrugs off
          traffic spikes, and stays up even when the CMS does not. And you take the login page, the
          thing attackers were actually after, off the public internet entirely. That is the whole pitch
          for headless WordPress, and on a typical news or blog site it is a few weeks of work, not a
          rebuild from scratch.
        </p>

        <p>The companion pieces on the rendering, media, performance and SEO sides of this build:</p>

        <RelatedGrid>
          <RelatedCard
            tag="Research"
            title="SSR on Next.js App Router for SEO"
            body="What to render where, with measurements across six pages we migrated."
            href="/blog/nextjs-app-router-ssr-seo-2026/"
          />
          <RelatedCard
            tag="Research"
            title="Cloudflare R2 as the WordPress Media Library"
            body="SDK-free SigV4 in pure PHP, replacing wp-content/uploads with R2."
            href="/blog/cloudflare-r2-wordpress-media-2026/"
          />
          <RelatedCard
            tag="Research"
            title="WordPress Performance Optimization"
            body="We analysed 100 WordPress sites: 78% failed Core Web Vitals."
            href="/blog/wordpress-performance-data-study-2026/"
          />
          <RelatedCard
            tag="Research"
            title="JavaScript SEO Reality Check"
            body="We crawled 103 funded SaaS marketing sites; 41% are not reliably indexable."
            href="/blog/javascript-seo-funded-saas-study-2026/"
          />
        </RelatedGrid>

        <p>
          The headless build itself, the technical-SEO layer that keeps it indexable, and the edge
          engineering that makes it fast and resilient:
        </p>

        <RelatedGrid>
          <RelatedCard
            tag="Service"
            title="Headless WordPress &amp; WooCommerce"
            body="WP + Next.js with preview, ISR, auth handoff, media pipeline, search."
            href="/services/headless-wordpress-development/"
          />
          <RelatedCard
            tag="Service"
            title="Technical SEO for SaaS"
            body="Prerender, schema, Core Web Vitals, engineering-led SEO."
            href="/services/technical-seo-for-saas/"
          />
          <RelatedCard
            tag="Service"
            title="Cloudflare Edge Engineering"
            body="Workers, R2, WAF, Bulk Redirects. The full surface, not just the orange cloud."
            href="/services/cloudflare-edge-engineering/"
          />
        </RelatedGrid>

        <Faq items={FAQS} />

        <AuthorByline authorName="Ritesh + Debarshi" lastReviewedISO={MODIFIED_ISO}>
          Ritesh runs engineering at Appycodes. Debarshi leads the WordPress practice and has taken
          news, publishing and B2B WordPress sites headless onto Next.js, keeping the editorial team in
          Gutenberg while moving the public front end to a static, edge-cached, locked-down
          architecture.
        </AuthorByline>
      </PostBody>

      <CtaBand />
    </>
  );
}
