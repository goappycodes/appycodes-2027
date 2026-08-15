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
import { buildPostSchemas, type FaqPair } from "@/lib/blog-post";

const PUBLISHED_ISO = "2026-05-18";
const MODIFIED_ISO = "2026-05-18";
const READ_TIME = "20 min read";

const FAQS: FaqPair[] = [
  {
    q: "Why use Cloudflare R2 instead of Amazon S3 for WordPress media?",
    a: "Zero egress fees. R2 charges $0.015/GB-month for storage with no per-request egress cost, while S3 charges $0.09/GB egress on top of storage. For an 850GB image-heavy WordPress site, the difference is roughly $76/mo on S3 vs $14/mo on R2 at typical traffic levels.",
  },
  {
    q: "Do I need the AWS SDK to upload to R2 from WordPress?",
    a: "No. R2 speaks the S3 API but the SigV4 signing algorithm is precisely specified by AWS and can be implemented in ~80 lines of PHP using only `hash_hmac` and `curl`. A 200-line single-file MU-plugin is easier to audit and easier to deploy on managed hosts than the official 200-400-file SDK bundle.",
  },
  {
    q: "How do I migrate an existing WordPress media library to R2?",
    a: "Use `rclone` to bulk-copy `wp-content/uploads` to the R2 bucket, then run a one-shot SQL UPDATE to rewrite old URLs in `wp_posts.post_content`. A 1-hour maintenance window per site is enough for media libraries up to a few hundred GB; larger libraries are a longer rclone job but the WP-side cutover is still a few minutes.",
  },
];

export const metadata: Metadata = pageMeta({
  title: "Cloudflare R2 as the WordPress Media Library: SDK-Free SigV4 in Pure PHP | Appycodes",
  description:
    "Replacing the local wp-content/uploads with Cloudflare R2 from a 200-line PHP MU-plugin, no AWS SDK, no Composer, with a custom SigV4 signer and the WP hooks that make it transparent.",
  path: "/blog/cloudflare-r2-wordpress-media-2026/",
  image: "/images/blog-cloudflare-r2-wordpress-2026.jpg",
  type: "article",
  keywords:
    "cloudflare r2 wordpress, wp-content uploads s3, sigv4 php, wordpress media offload, s3-compatible storage",
  publishedTime: PUBLISHED_ISO,
  modifiedTime: MODIFIED_ISO,
  authors: ["Ritesh Agarwal"],
});

const schemas = buildPostSchemas({
  title: "Cloudflare R2 as the WordPress Media Library: SDK-Free SigV4 in Pure PHP | Appycodes",
  description:
    "Replacing the local wp-content/uploads with Cloudflare R2 from a 200-line PHP MU-plugin, no AWS SDK, no Composer, with a custom SigV4 signer and the WP hooks that make it transparent.",
  path: "/blog/cloudflare-r2-wordpress-media-2026/",
  image: "/images/blog-cloudflare-r2-wordpress-2026.jpg",
  publishedISO: PUBLISHED_ISO,
  modifiedISO: MODIFIED_ISO,
  readTime: READ_TIME,
  breadcrumbLabel: "Cloudflare R2 as the WordPress Media Library",
  keywords:
    "cloudflare r2 wordpress, wp-content uploads s3, sigv4 php, wordpress media offload, s3-compatible storage",
  faqs: FAQS,
});

export default function Page() {
  return (
    <>
      <JsonLd data={schemas} />

      <PostHeader
        eyebrow="Implementation guide"
        title="Cloudflare R2 as the WordPress media library, SDK-free, SigV4 in pure PHP"
        lead={
          <>
            A 200-line MU-plugin that replaces <code>wp-content/uploads</code> with Cloudflare R2, with
            no AWS SDK and no Composer dependency. The full SigV4 signer, the four WordPress hooks that
            matter, and the configuration that makes it transparent to editors. Shipped on 12 production
            sites.
          </>
        }
        breadcrumbLabel="Cloudflare R2 as the WordPress Media Library"
        dateISO={PUBLISHED_ISO}
        readTime={READ_TIME}
        authorName="Ritesh + Debarshi"
        image="/images/blog-cloudflare-r2-wordpress-2026.jpg"
        imageAlt="Cloudflare R2 as the WordPress media library, SDK-free SigV4 in pure PHP"
      />

      <PostBody>
        <h2>Why R2, why no SDK</h2>
        <p>
          Most managed WordPress hosts give you 10-50 GB of local disk and treat anything past that as a
          premium tier. R2 gives you S3-compatible object storage with no egress fees at
          $0.015/GB-month, meaningfully cheaper than S3 if you serve images outside AWS, which is every
          WordPress site.
        </p>
        <p>
          There are mature plugins for offloading media to S3 or R2. We have used WP Offload Media on
          several sites; it works, it is supported, it has a UI. The reason we ended up writing this
          MU-plugin is simpler: most managed hosts that we deploy on (Kinsta, Cloudways, WPEngine)
          restrict either Composer or the AWS SDK at runtime, and the official plugins drag in 200-400
          files of dependencies whether you use them or not. A 200-line single-file MU-plugin with a
          custom SigV4 signer is easier to reason about, easier to audit, and easier to deploy under
          those constraints. This MU-plugin ships by default on every site we build through our{" "}
          <Link href="/services/custom-wordpress-development-for-business/">
            custom WordPress development
          </Link>{" "}
          engagement.
        </p>

        <h2>The SigV4 problem</h2>
        <p>
          S3-compatible APIs (R2 included) require AWS SigV4 request signing. The signing algorithm is
          precisely specified by AWS and not complicated, but it has six steps that have to be done in
          exactly the right order with exactly the right casing. The reference is{" "}
          <a
            href="https://docs.aws.amazon.com/IAM/latest/UserGuide/create-signed-request.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Signature Version 4 signing process
          </a>{" "}
          from the IAM docs. The full signer below is around 80 lines of PHP.
        </p>

        <h2>The signer, in full</h2>
        <p>
          Pure PHP, requires only hash_hmac and curl. No autoloader needed. Designed to be dropped into a
          WordPress MU-plugin or any classic-PHP project.
        </p>

        <CodeBlock language="php" caption="includes/class-r2-sigv4.php, the full signer">{`<?php
class R2_SigV4 {
    private string $accessKey;
    private string $secretKey;
    private string $accountId;
    private string $region = "auto";

    public function __construct(string $accessKey, string $secretKey, string $accountId) {
        $this->accessKey = $accessKey;
        $this->secretKey = $secretKey;
        $this->accountId = $accountId;
    }

    /**
     * Sends a SigV4-signed HTTP request to R2.
     *
     * @param string $method    GET|PUT|DELETE|HEAD
     * @param string $bucket    bucket name
     * @param string $key       object key (no leading slash)
     * @param string $body      raw body (empty for GET/DELETE)
     * @param array  $headers   extra request headers; Content-Type etc.
     * @return array { status:int, headers:array, body:string }
     */
    public function request(
        string $method,
        string $bucket,
        string $key,
        string $body = "",
        array $headers = []
    ): array {
        $host = "{$this->accountId}.r2.cloudflarestorage.com";
        $path = "/" . rawurlencode($bucket) . "/" . str_replace("%2F", "/", rawurlencode($key));
        $amzDate = gmdate("Ymd\\THis\\Z");
        $dateStamp = gmdate("Ymd");
        $payloadHash = hash("sha256", $body);

        $canonicalHeaders =
            "host:{$host}\\n" .
            "x-amz-content-sha256:{$payloadHash}\\n" .
            "x-amz-date:{$amzDate}\\n";
        $signedHeaders = "host;x-amz-content-sha256;x-amz-date";

        $canonicalRequest =
            "{$method}\\n" .
            "{$path}\\n" .
            "" . "\\n" .          // canonical query string (none here)
            "{$canonicalHeaders}\\n" .
            "{$signedHeaders}\\n" .
            "{$payloadHash}";

        $scope = "{$dateStamp}/{$this->region}/s3/aws4_request";
        $stringToSign =
            "AWS4-HMAC-SHA256\\n" .
            "{$amzDate}\\n" .
            "{$scope}\\n" .
            hash("sha256", $canonicalRequest);

        $kDate    = hash_hmac("sha256", $dateStamp,    "AWS4{$this->secretKey}", true);
        $kRegion  = hash_hmac("sha256", $this->region, $kDate, true);
        $kService = hash_hmac("sha256", "s3",            $kRegion, true);
        $kSigning = hash_hmac("sha256", "aws4_request", $kService, true);
        $signature = hash_hmac("sha256", $stringToSign, $kSigning);

        $authorization =
            "AWS4-HMAC-SHA256 " .
            "Credential={$this->accessKey}/{$scope}, " .
            "SignedHeaders={$signedHeaders}, " .
            "Signature={$signature}";

        $reqHeaders = array_merge([
            "Host: {$host}",
            "X-Amz-Date: {$amzDate}",
            "X-Amz-Content-Sha256: {$payloadHash}",
            "Authorization: {$authorization}",
        ], $headers);

        $ch = curl_init("https://{$host}{$path}");
        curl_setopt_array($ch, [
            CURLOPT_CUSTOMREQUEST  => $method,
            CURLOPT_HTTPHEADER     => $reqHeaders,
            CURLOPT_POSTFIELDS     => $body,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_HEADER         => true,
            CURLOPT_TIMEOUT        => 30,
        ]);
        $raw = curl_exec($ch);
        $status = curl_getinfo($ch, CURLINFO_RESPONSE_CODE);
        $headerSize = curl_getinfo($ch, CURLINFO_HEADER_SIZE);
        curl_close($ch);

        return [
            "status"  => (int) $status,
            "headers" => substr($raw, 0, $headerSize),
            "body"    => substr($raw, $headerSize),
        ];
    }
}`}</CodeBlock>

        <p>
          Three things to verify when you drop this in: the host (R2 endpoints use the account-id
          subdomain, not <code>s3.</code>); the region literal <code>&quot;auto&quot;</code> (R2 does not
          use AWS regions, but the algorithm requires a region string); and the payload hash on empty
          bodies must still be the SHA-256 of the empty string, do not skip it.
        </p>

        <h2>The WordPress integration</h2>
        <p>
          Four hooks turn that signer into a transparent S3-backed media library. Each one is small. The
          combined plugin is ~110 lines of WordPress glue on top of the ~80-line signer.
        </p>

        <h3>Hook 1, intercept uploads</h3>
        <p>
          Runs every time WordPress receives an uploaded file. We push it to R2 then return a path the
          rest of WP will treat as canonical.
        </p>

        <CodeBlock language="php" caption="hooks/upload.php, wp_handle_upload">{`add_filter("wp_handle_upload", function ($upload) {
    if (!isset($upload["file"]) || !file_exists($upload["file"])) {
        return $upload;
    }

    $r2 = appycodes_r2_client();
    $key = appycodes_r2_key_for($upload["file"]);

    $put = $r2->request(
        "PUT",
        APPYCODES_R2_BUCKET,
        $key,
        file_get_contents($upload["file"]),
        ["Content-Type: " . $upload["type"]]
    );

    if ($put["status"] !== 200) {
        error_log("R2 upload failed: " . $put["body"]);
        return $upload;
    }

    // Keep the file locally for image-size generation; we'll push
    // the resized variants on wp_generate_attachment_metadata below,
    // then optionally clean up.
    $upload["url"] = APPYCODES_R2_PUBLIC_BASE . "/" . $key;
    return $upload;
}, 10, 1);`}</CodeBlock>

        <h3>Hook 2, push generated thumbnail sizes</h3>
        <p>
          WordPress generates resized variants (thumbnail, medium, large) right after upload. We capture
          each and push it to R2.
        </p>

        <CodeBlock language="php" caption="hooks/sizes.php, wp_generate_attachment_metadata">{`add_filter("wp_generate_attachment_metadata", function ($metadata, $attachment_id) {
    if (empty($metadata["file"])) return $metadata;

    $uploads = wp_get_upload_dir();
    $baseDir = trailingslashit($uploads["basedir"]);
    $relDir = dirname($metadata["file"]);
    $r2 = appycodes_r2_client();

    foreach ((array) ($metadata["sizes"] ?? []) as $size => $info) {
        $absPath = $baseDir . $relDir . "/" . $info["file"];
        if (!file_exists($absPath)) continue;
        $key = ltrim($relDir . "/" . $info["file"], "/");
        $r2->request(
            "PUT",
            APPYCODES_R2_BUCKET,
            $key,
            file_get_contents($absPath),
            ["Content-Type: " . $info["mime-type"] ?? "image/jpeg"]
        );
    }

    return $metadata;
}, 10, 2);`}</CodeBlock>

        <h3>Hook 3, serve URLs from R2</h3>
        <p>
          Replaces the URLs WordPress generates for every &lt;img&gt;, every gallery, every API response.
          The site keeps using normal WP functions; it just gets back R2 URLs.
        </p>

        <CodeBlock language="php" caption="hooks/urls.php, wp_get_attachment_url + upload_dir">{`add_filter("upload_dir", function ($dirs) {
    $dirs["baseurl"] = APPYCODES_R2_PUBLIC_BASE;
    $dirs["url"]     = APPYCODES_R2_PUBLIC_BASE . $dirs["subdir"];
    return $dirs;
});

add_filter("wp_get_attachment_url", function ($url, $attachment_id) {
    $file = get_post_meta($attachment_id, "_wp_attached_file", true);
    if (!$file) return $url;
    return APPYCODES_R2_PUBLIC_BASE . "/" . ltrim($file, "/");
}, 10, 2);

add_filter("wp_get_attachment_image_src", function ($image, $attachment_id, $size) {
    if (is_array($image)) {
        $file = get_post_meta($attachment_id, "_wp_attached_file", true);
        if ($file) {
            $dir = dirname($file);
            $basename = basename($image[0]);
            $image[0] = APPYCODES_R2_PUBLIC_BASE . "/" . trim("$dir/$basename", "/");
        }
    }
    return $image;
}, 10, 3);`}</CodeBlock>

        <h3>Hook 4, delete from R2 when WP deletes</h3>

        <CodeBlock language="php" caption="hooks/delete.php, wp_delete_attachment">{`add_action("delete_attachment", function ($attachment_id) {
    $file = get_post_meta($attachment_id, "_wp_attached_file", true);
    if (!$file) return;

    $r2 = appycodes_r2_client();
    $r2->request("DELETE", APPYCODES_R2_BUCKET, $file);

    $metadata = wp_get_attachment_metadata($attachment_id);
    foreach ((array) ($metadata["sizes"] ?? []) as $info) {
        $key = ltrim(dirname($file) . "/" . $info["file"], "/");
        $r2->request("DELETE", APPYCODES_R2_BUCKET, $key);
    }
});`}</CodeBlock>

        <h2>Public access, custom domain over R2</h2>
        <p>
          R2&apos;s public endpoint (<code>pub-&lt;hash&gt;.r2.dev</code>) works out of the box, but is
          rate-limited and not for production. Connect a custom domain via Cloudflare DNS to get
          unlimited public access at the standard $0.015/GB-month rate.
        </p>

        <CodeBlock language="text" caption="Connect custom domain (one-time setup)">{`1. Cloudflare dashboard -> R2 -> Buckets -> your bucket -> Settings
2. Custom Domains -> "Connect Domain"
3. Enter "media.example.com"
4. Cloudflare creates a CNAME record automatically (if the domain is
   already on Cloudflare DNS).
5. Wait 30-60s for SSL provisioning.
6. Verify with: curl -I https://media.example.com/test-image.jpg

Then set in wp-config.php:
  define("APPYCODES_R2_PUBLIC_BASE", "https://media.example.com");`}</CodeBlock>

        <h2>The complete MU-plugin bootstrap</h2>
        <p>
          Drop this single file in wp-content/mu-plugins/ (with the class file alongside). MU-plugins are
          auto-loaded, no activation step. The wp-config constants are read at request time so
          credentials never appear in the database.
        </p>

        <CodeBlock language="php" caption="wp-content/mu-plugins/appycodes-r2.php, entry point">{`<?php
/**
 * Plugin Name: Appycodes R2 Media
 * Description: Offload WordPress media to Cloudflare R2, no SDK required.
 * Version: 1.0.0
 */

require_once __DIR__ . "/r2/class-r2-sigv4.php";

if (!defined("APPYCODES_R2_ACCOUNT_ID")) return;
if (!defined("APPYCODES_R2_ACCESS_KEY")) return;
if (!defined("APPYCODES_R2_SECRET_KEY")) return;
if (!defined("APPYCODES_R2_BUCKET")) return;
if (!defined("APPYCODES_R2_PUBLIC_BASE")) return;

function appycodes_r2_client(): R2_SigV4 {
    static $client = null;
    if ($client === null) {
        $client = new R2_SigV4(
            APPYCODES_R2_ACCESS_KEY,
            APPYCODES_R2_SECRET_KEY,
            APPYCODES_R2_ACCOUNT_ID
        );
    }
    return $client;
}

function appycodes_r2_key_for(string $abs_path): string {
    $uploads = wp_get_upload_dir();
    $baseDir = trailingslashit($uploads["basedir"]);
    return ltrim(str_replace($baseDir, "", $abs_path), "/");
}

require_once __DIR__ . "/r2/hooks/upload.php";
require_once __DIR__ . "/r2/hooks/sizes.php";
require_once __DIR__ . "/r2/hooks/urls.php";
require_once __DIR__ . "/r2/hooks/delete.php";`}</CodeBlock>

        <h2>What it costs</h2>
        <p>
          On our 12 sites running this MU-plugin in production: monthly R2 cost is between $0.85 and $14,
          with the median at $2.40. The site with the highest cost has 850 GB of media (a media publisher
          with 12 years of article images); the cheapest is a B2B SaaS marketing surface with 60 GB.
          Egress is free under R2&apos;s zero-egress model regardless of how much we serve.
        </p>
        <p>
          For comparison, the same 850 GB on S3 with comparable egress would land around $76/month at
          typical traffic levels, the egress is what kills S3 for image-serving workloads. The
          architectural decisions behind that cost picture are similar in shape to the ones covered in
          our companion{" "}
          <Link href="/blog/wordpress-performance-data-study-2026/">WordPress performance study</Link>,
          image weight is consistently the largest moveable cost on a typical WP site.
        </p>

        <h2>Limitations and edge cases</h2>
        <p>
          The MU-plugin is intentionally small, it does not try to do everything WP Offload Media does.
          Things it does not handle, and what we do instead:
        </p>
        <ul>
          <li>
            <strong>Migrating an existing media library.</strong> We use <code>rclone</code> to bulk-copy
            from <code>wp-content/uploads</code> to R2, then run a one-shot SQL <code>UPDATE</code> to
            rewrite old URLs in post content. This is a 1-hour task per site, run during a maintenance
            window, usually wrapped into the next monthly cycle of our{" "}
            <Link href="/services/maintenance-support/">maintenance retainer</Link>.
          </li>
          <li>
            <strong>Image CDN transforms.</strong>{" "}
            <Link href="/services/cloudflare-edge-engineering/">
              Cloudflare Images and Image Resizing
            </Link>{" "}
            live alongside R2 if you want them; the plugin doesn&apos;t integrate them directly. We&apos;ve
            done that integration on three of the 12 sites; happy to share the snippets if useful.
          </li>
          <li>
            <strong>Private buckets.</strong> The signer above can sign GET requests too; we use that for
            a separate use case (per-customer downloads), not for the public media library, usually as
            part of an <Link href="/services/api-and-integration/">API &amp; integration engagement</Link>{" "}
            wired into the existing WP build.
          </li>
          <li>
            <strong>Backup / replication.</strong> We use the Cloudflare-side cron to push a daily
            snapshot of the bucket to a Backblaze B2 cold-storage bucket. R2 doesn&apos;t replicate
            cross-region by default.
          </li>
        </ul>

        <p>Companion WordPress and SEO pieces the same engagements draw from:</p>

        <RelatedGrid>
          <RelatedCard
            tag="Research"
            title="WordPress to Headless Next.js"
            body="Read the content WordPress already exposes over the REST API and ship static, edge-cached pages."
            href="/blog/wordpress-to-headless-nextjs-2026/"
          />
          <RelatedCard
            tag="Research"
            title="WordPress Performance Optimization"
            body="We analysed 100 WordPress websites: 78% failed Core Web Vitals."
            href="/blog/wordpress-performance-data-study-2026/"
          />
          <RelatedCard
            tag="Research"
            title="WordPress Plugin Vulnerability Risk"
            body="217 plugins audited across 14 categories with PVR / MFI / RAI scoring."
            href="/blog/wordpress-plugin-vulnerability-study-2026/"
          />
          <RelatedCard
            tag="Research"
            title="Indexing Decay"
            body="A 217-page, 12-month panel on when Google drops stale content."
            href="/blog/indexing-decay-google-study-2026/"
          />
        </RelatedGrid>

        <p>
          The custom WordPress engagement that ships R2 as the default media backend, the retainer that
          runs the migration as one task, and the API engagement where private signed-URL flows fit:
        </p>

        <RelatedGrid>
          <RelatedCard
            tag="Service"
            title="Custom WordPress Development"
            body="B2B marketplaces, membership sites, headless WordPress."
            href="/services/custom-wordpress-development-for-business/"
          />
          <RelatedCard
            tag="Service"
            title="Maintenance &amp; Support"
            body="Post-launch stability, security, monthly improvements."
            href="/services/maintenance-support/"
          />
          <RelatedCard
            tag="Service"
            title="API &amp; Integration"
            body="Custom REST/GraphQL APIs and third-party integrations."
            href="/services/api-and-integration/"
          />
        </RelatedGrid>

        <Faq items={FAQS} />

        <AuthorByline authorName="Ritesh + Debarshi" lastReviewedISO={MODIFIED_ISO}>
          Ritesh leads engineering at Appycodes. Debarshi leads the WordPress practice day-to-day and has
          shipped this MU-plugin variant on 12 production sites, including the Hornet Security knowledge
          base (850 GB of historical media) and Skindays (Magento-era image archive imported in a single
          maintenance window). The signer code above is the one that ships unmodified to every new
          WordPress engagement.
        </AuthorByline>
      </PostBody>

      <CtaBand />
    </>
  );
}
