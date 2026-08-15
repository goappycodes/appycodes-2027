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

const PUBLISHED_ISO = "2026-05-13";
const MODIFIED_ISO = "2026-05-13";
const READ_TIME = "19 min read";

const PAGE_TITLE =
  "Shopify Functions for Custom Pricing: B2B Tiers, Volume Discounts, Member Rates | Appycodes";
const PAGE_DESCRIPTION =
  "Three production patterns for custom pricing built on Shopify Functions: Rust source, metafield design, checkout integration, and the gotchas Scripts users hit.";

const FAQS = [
  {
    q: "What's the difference between Shopify Functions and Scripts?",
    a: "Functions are WebAssembly modules (Rust or JS source) that run inside Shopify's infrastructure with strict 5ms / 256MB / 11MB execution budgets. Scripts were the Ruby-based predecessor, Plus-only, and are being sunset in August 2025. Functions are the modern replacement and are not Plus-only for every use case, pricing Functions still require Plus.",
  },
  {
    q: "Can a Shopify Function make a network call?",
    a: "No. Functions run inside a sandboxed runtime with no network access. The pattern for external verification (membership, VAT lookup, etc.) is to do the network work in a background job that writes the result to a customer metafield; the Function then reads the metafield at checkout.",
  },
  {
    q: "How fast does a Shopify pricing Function run in practice?",
    a: "Well under the 5ms budget for typical carts. A tight input GraphQL query against a 50-line cart lands at 0.8-1.2ms in our production deployments. The optimisation lever is the input query, ask for less data and execution time drops accordingly.",
  },
];

export const metadata: Metadata = pageMeta({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: "/blog/shopify-functions-custom-pricing-2026/",
  image: "/images/blog-shopify-functions-pricing-2026.jpg",
  type: "article",
  keywords:
    "shopify functions, b2b pricing, volume discount, member rate, shopify scripts migration, shopify plus",
  publishedTime: PUBLISHED_ISO,
  modifiedTime: MODIFIED_ISO,
  authors: ["Ritesh Agarwal"],
});

const schemas = buildPostSchemas({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: "/blog/shopify-functions-custom-pricing-2026/",
  image: "/images/blog-shopify-functions-pricing-2026.jpg",
  publishedISO: PUBLISHED_ISO,
  modifiedISO: MODIFIED_ISO,
  readTime: READ_TIME,
  breadcrumbLabel: "Shopify Functions for Custom Pricing",
  keywords:
    "shopify functions, b2b pricing, volume discount, member rate, shopify scripts migration, shopify plus",
  faqs: FAQS,
});

export default function Page() {
  return (
    <>
      <JsonLd data={schemas} />

      <PostHeader
        eyebrow="Pattern library"
        title="Shopify Functions for custom pricing: three patterns we ship in production"
        lead="B2B tier pricing, volume discounts, and verified-member rates, each as a complete Function, with the metafield design, theme integration and the deploy command. Written from nine Shopify Plus stores we have shipped on the new Functions API."
        breadcrumbLabel="Shopify Functions for Custom Pricing"
        dateISO={PUBLISHED_ISO}
        readTime={READ_TIME}
        image="/images/blog-shopify-functions-pricing-2026.jpg"
        imageAlt="Three Shopify Functions patterns for custom pricing"
      />

      <PostBody>
        <h2>Why Functions, why now</h2>
        <p>
          Shopify Scripts were the previous mechanism for custom checkout logic on Shopify Plus. They
          ran Ruby, they were limited to Plus, and Shopify announced their sunset for August 2025.{" "}
          <a
            href="https://shopify.dev/docs/api/functions"
            target="_blank"
            rel="noopener noreferrer"
          >
            Functions
          </a>{" "}
          are the replacement: WebAssembly modules (Rust or JS source), running inside Shopify&apos;s
          infrastructure at every checkout decision point, with strict execution budgets (5ms / 256MB /
          11MB output). They are not Plus-only for every use case, pricing-related Functions still
          require Plus, but shipping-rate and payment-customisation Functions work on all plans.
        </p>
        <p>
          We use Functions for three pricing patterns far more often than anything else. The rest of
          this post is the working code for each.
        </p>

        <h2>Pattern 1: B2B tier pricing</h2>

        <p>
          <strong>Business case.</strong> A wholesale customer with a <em>Bronze / Silver / Gold</em>{" "}
          tier gets 5% / 10% / 15% off every line item, automatically, with no discount code entered.
        </p>
        <p>
          <strong>Mechanism.</strong> A <code>discountCustomerRun</code> Function reads the
          authenticated customer&apos;s <code>tier</code> metafield and emits a percentage discount on
          every line item.
        </p>

        <p>
          Function manifest. The targeting block declares which API the Function runs on; the
          input.graphql below dictates what data Shopify hands you at each invocation.
        </p>

        <CodeBlock
          language="toml"
          caption="b2b-tier-pricing/shopify.extension.toml"
        >{`api_version = "2024-10"
name = "b2b-tier-pricing"
type = "function"

[build]
command = "cargo build --release --target wasm32-wasip1"
path = "target/wasm32-wasip1/release/b2b_tier_pricing.wasm"

[ui.paths]
create = "/"
details = "/"

[[extensions.targeting]]
target = "purchase.product-discount.run"
input_query = "src/run.graphql"
export = "run"`}</CodeBlock>

        <p>
          Tell Shopify what you actually need from the cart input. Asking for less keeps execution time
          down, we routinely run at 0.8-1.2ms with this query.
        </p>

        <CodeBlock
          language="graphql"
          caption="src/run.graphql"
        >{`query Input {
  cart {
    buyerIdentity {
      customer {
        metafield(namespace: "b2b", key: "tier") { value }
      }
    }
    lines {
      id
      quantity
      cost {
        amountPerQuantity { amount }
      }
    }
  }
}`}</CodeBlock>

        <p>
          Pure Rust. Compiles to wasm32-wasip1. Shopify guarantees a 5ms budget per invocation; this
          function lands well under 2ms even on a 50-line cart.
        </p>

        <CodeBlock
          language="rust"
          caption="src/lib.rs, the Function logic"
        >{`use shopify_function::prelude::*;
use shopify_function::Result;

generate_types!(
    query_path = "src/run.graphql",
    schema_path = "schema.graphql"
);

#[shopify_function]
fn run(input: input::ResponseData) -> Result<output::FunctionRunResult> {
    let tier = input
        .cart
        .buyer_identity
        .as_ref()
        .and_then(|b| b.customer.as_ref())
        .and_then(|c| c.metafield.as_ref())
        .map(|m| m.value.as_str())
        .unwrap_or("");

    let percent: f64 = match tier {
        "bronze" => 5.0,
        "silver" => 10.0,
        "gold" => 15.0,
        _ => return Ok(output::FunctionRunResult { discounts: vec![], discount_application_strategy: output::DiscountApplicationStrategy::First }),
    };

    let discounts = input
        .cart
        .lines
        .iter()
        .map(|line| output::Discount {
            value: output::Value::Percentage(output::Percentage { value: percent }),
            targets: vec![output::Target::ProductVariant(output::ProductVariantTarget {
                id: line.id.clone(),
                quantity: None,
            })],
            message: Some(format!("{}% B2B tier discount", percent as i32)),
        })
        .collect();

    Ok(output::FunctionRunResult {
        discounts,
        discount_application_strategy: output::DiscountApplicationStrategy::First,
    })
}`}</CodeBlock>

        <p>The metafield design that makes this work:</p>

        <CodeBlock
          language="text"
          caption="Customer metafield setup (Settings > Custom data > Customer)"
        >{`Namespace + key:   b2b.tier
Type:              Single-line text
Access:            Storefronts: read; Admin: read/write
Values:            bronze | silver | gold | <unset>

Recommended: limit valid values via a Shopify Flow workflow that
fires on the "customer tag added" trigger and writes the metafield
from a curated tag list.`}</CodeBlock>

        <p>
          <strong>Deploy.</strong> <code>shopify app deploy</code> from the extension folder pushes the
          wasm binary and registers it. The Function then needs to be turned on as a Discount in the
          admin (Discounts &gt; Create discount &gt; Automatic discount &gt; your Function). The
          activation is the part many teams miss the first time, the Function exists but won&apos;t run
          until it&apos;s wrapped in an active discount. When we ship Functions through our{" "}
          <Link href="/services/shopify-development/">Shopify development engagement</Link>, the
          activation step is part of the merchant-facing handover doc, not a developer-only checklist.
        </p>

        <h2>Pattern 2: Volume discounts</h2>

        <p>
          <strong>Business case.</strong> Buy 5 of any variant, get 10% off; buy 10, get 15% off; buy
          25+, get 20% off. Applied per-variant, not across the cart total.
        </p>
        <p>
          <strong>Mechanism.</strong> Same Function target as Pattern 1, but the input query reads
          quantities and the logic applies a tiered percentage per line.
        </p>

        <CodeBlock
          language="rust"
          caption="volume-discount/src/lib.rs"
        >{`use shopify_function::prelude::*;
use shopify_function::Result;

generate_types!(
    query_path = "src/run.graphql",
    schema_path = "schema.graphql"
);

const TIERS: &[(i32, f64)] = &[
    (25, 20.0),
    (10, 15.0),
    (5,  10.0),
];

#[shopify_function]
fn run(input: input::ResponseData) -> Result<output::FunctionRunResult> {
    let discounts = input
        .cart
        .lines
        .iter()
        .filter_map(|line| {
            let qty: i32 = line.quantity.into();
            let tier = TIERS.iter().find(|(threshold, _)| qty >= *threshold)?;
            Some(output::Discount {
                value: output::Value::Percentage(output::Percentage { value: tier.1 }),
                targets: vec![output::Target::ProductVariant(output::ProductVariantTarget {
                    id: line.id.clone(),
                    quantity: None,
                })],
                message: Some(format!("Volume discount: {}% off at qty {}+", tier.1 as i32, tier.0)),
            })
        })
        .collect();

    Ok(output::FunctionRunResult {
        discounts,
        discount_application_strategy: output::DiscountApplicationStrategy::First,
    })
}`}</CodeBlock>

        <p>
          The detail that catches teams: the threshold is the line-item quantity, not the cart total.
          If the customer adds 5 of variant A and 3 of variant B, only variant A gets the discount. If
          you want the discount to apply per-cart-total, the loop above sums first and applies a single
          value, two extra lines of Rust.
        </p>

        <p>
          The matching theme-side message that explains the math on the PDP, so customers know what they
          will get before they hit the cart:
        </p>

        <CodeBlock
          language="liquid"
          caption="sections/product-volume-pricing.liquid (theme block)"
        >{`<dl class="volume-pricing">
  {% assign tiers = '5,10|10,15|25,20' | split: '|' %}
  {% for t in tiers %}
    {% assign parts = t | split: ',' %}
    <dt>Buy {{ parts[0] }}+</dt>
    <dd>{{ parts[1] }}% off this variant</dd>
  {% endfor %}
</dl>

<p class="volume-pricing-note">
  Discount applies automatically at checkout. Per-variant.
</p>`}</CodeBlock>

        <h2>Pattern 3: Verified member rates</h2>

        <p>
          <strong>Business case.</strong> Wholesale members get an <em>across-the-board</em> rate
          (cost-plus, e.g. 30% off retail) on a subset of the catalogue tagged{" "}
          <code>wholesale-eligible</code>. The eligibility is verified via an external API call out
          (think VAT-number lookup, or membership status), but Functions cannot make network calls.
        </p>
        <p>
          <strong>Mechanism.</strong> Solve the network-call limitation by lifting the verification
          result into a customer metafield, written by a background job that <em>can</em> call out. The
          Function then trusts the metafield.
        </p>

        <CodeBlock
          language="rust"
          caption="member-rate/src/lib.rs"
        >{`use shopify_function::prelude::*;
use shopify_function::Result;

generate_types!(
    query_path = "src/run.graphql",
    schema_path = "schema.graphql"
);

const MEMBER_DISCOUNT_PERCENT: f64 = 30.0;

#[shopify_function]
fn run(input: input::ResponseData) -> Result<output::FunctionRunResult> {
    let verified = input
        .cart
        .buyer_identity
        .as_ref()
        .and_then(|b| b.customer.as_ref())
        .and_then(|c| c.verified_member.as_ref())
        .map(|m| m.value == "true")
        .unwrap_or(false);

    if !verified {
        return Ok(output::FunctionRunResult {
            discounts: vec![],
            discount_application_strategy: output::DiscountApplicationStrategy::First,
        });
    }

    let discounts = input
        .cart
        .lines
        .iter()
        .filter(|line| {
            // only discount lines whose product has the eligibility tag
            line.merchandise
                .as_ref()
                .and_then(|m| m.product.as_ref())
                .map(|p| p.has_wholesale_tag)
                .unwrap_or(false)
        })
        .map(|line| output::Discount {
            value: output::Value::Percentage(output::Percentage { value: MEMBER_DISCOUNT_PERCENT }),
            targets: vec![output::Target::ProductVariant(output::ProductVariantTarget {
                id: line.id.clone(),
                quantity: None,
            })],
            message: Some("Wholesale member rate".to_string()),
        })
        .collect();

    Ok(output::FunctionRunResult {
        discounts,
        discount_application_strategy: output::DiscountApplicationStrategy::First,
    })
}`}</CodeBlock>

        <p>The input GraphQL pulls the verification flag and the product tag presence:</p>

        <CodeBlock
          language="graphql"
          caption="src/run.graphql"
        >{`query Input {
  cart {
    buyerIdentity {
      customer {
        verifiedMember: metafield(namespace: "b2b", key: "verified_member") { value }
      }
    }
    lines {
      id
      quantity
      merchandise {
        ... on ProductVariant {
          product {
            hasWholesaleTag: hasAnyTag(tags: ["wholesale-eligible"])
          }
        }
      }
    }
  }
}`}</CodeBlock>

        <p>
          The background job that owns the verification can be anywhere, we usually put it on the same
          Node API that handles the merchant&apos;s account portal. It listens for a customer-tag-added
          event (via a Shopify webhook), calls out to whatever verification service the merchant uses,
          and writes <code>b2b.verified_member</code> on the customer record via the Admin API. The
          Function then sees the result instantly on the next cart load. We build the webhook + admin-API
          layer behind this pattern as part of our{" "}
          <Link href="/services/api-and-integration/">API &amp; integration engagement</Link>, usually
          1-2 weeks alongside the Function itself.
        </p>

        <h2>Performance and execution limits</h2>

        <TableScroll>
          <table>
            <thead>
              <tr>
                <th>Limit</th>
                <th>Value</th>
                <th>What to do if you bump into it</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Execution time</td>
                <td>5 ms</td>
                <td>
                  Narrow the input query first; <code>filter</code> before you <code>map</code>; avoid
                  string formatting in hot loops.
                </td>
              </tr>
              <tr>
                <td>Memory</td>
                <td>256 MB</td>
                <td>
                  Practically unhittable for pricing; relevant for shipping Functions that pre-compute
                  matrices.
                </td>
              </tr>
              <tr>
                <td>Output size</td>
                <td>11 MB</td>
                <td>A discount per cart line will not get close. Bulk shipping rates can.</td>
              </tr>
              <tr>
                <td>Network access</td>
                <td>None</td>
                <td>Use the metafield-via-background-job pattern from Pattern 3.</td>
              </tr>
              <tr>
                <td>Active discount Functions per shop</td>
                <td>25</td>
                <td>
                  Almost never relevant; bigger constraint is the 5 simultaneously-running discounts at
                  checkout.
                </td>
              </tr>
            </tbody>
          </table>
        </TableScroll>

        <h2>Migrating from Shopify Scripts</h2>

        <p>If you are coming from Scripts, three concepts move:</p>
        <ul>
          <li>
            <strong>
              Input.cart maps to <code>Input.cart</code> in GraphQL
            </strong>{" "}
            , the structure is similar but you opt into fields rather than getting the whole cart.
            Tighter inputs run faster.
          </li>
          <li>
            <strong>Customer-tag checks become metafield checks.</strong> Tags still work but they
            require a longer query. Metafields are quicker and more structured.
          </li>
          <li>
            <strong>
              The <code>cart.discount_code</code> short-circuit goes away.
            </strong>{" "}
            Functions run alongside discount codes; if you want a Function to skip when a discount code
            is present, check for it in the input and early-return.
          </li>
        </ul>

        <p>
          The wider Shopify cost picture, whether you should be on Plus to use these patterns at all, is
          the subject of our companion{" "}
          <Link href="/blog/shopify-plus-vs-advanced-cost-study-2026/">
            Plus vs Advanced cost study
          </Link>
          . Most B2B merchants we run this work for are already on Plus for B2B catalogues; the few on
          Advanced need at minimum the Functions pricing API, which means an upgrade.
        </p>

        <p>Adjacent reading from our Shopify and architecture clusters:</p>

        <RelatedGrid>
          <RelatedCard
            tag="Research"
            title="Shopify Plus vs Advanced: A Cost-Per-Order Analysis at 7 Revenue Tiers"
            body="Real CPO math for Shopify Plus vs Advanced across $500k to $50M GMV, and the GMV at which the upgrade pays back. 24 audited merchants."
            href="/blog/shopify-plus-vs-advanced-cost-study-2026/"
          />
          <RelatedCard
            tag="Research"
            title="Replatforming to Shopify: Anatomy of One Magento Migration + 23 Engagements of Data"
            body="Opens with one specific Magento 2 to Shopify Plus migration end-to-end, then aggregates cost and timeline across 23 replatforms."
            href="/blog/shopify-replatform-cost-study-2026/"
          />
          <RelatedCard
            tag="Research"
            title="The Multi-Tenant SaaS Architecture Decision: Cost & Engineering Hours Across 4 Patterns"
            body="Per-pattern cost, isolation, and onboarding eng-hours for the four common multi-tenancy approaches. TIC, AOC, BCM metrics."
            href="/blog/multi-tenant-architecture-cost-study-2026/"
          />
        </RelatedGrid>

        <p>
          The Shopify build engagement that includes Functions, the API engagement where the background
          metafield writer lives, and the retainer that keeps it all running:
        </p>

        <RelatedGrid>
          <RelatedCard
            tag="Service"
            title="Shopify Development Services"
            body="Custom themes, migration to Shopify, Shopify apps, supplier-feed automation."
            href="/services/shopify-development/"
          />
          <RelatedCard
            tag="Service"
            title="API & Integration"
            body="Custom REST/GraphQL APIs and third-party integrations."
            href="/services/api-and-integration/"
          />
          <RelatedCard
            tag="Service"
            title="Maintenance & Support"
            body="Post-launch stability, security, monthly improvements."
            href="/services/maintenance-support/"
          />
        </RelatedGrid>

        <Faq items={FAQS} />

        <AuthorByline lastReviewedISO={MODIFIED_ISO}>
          Ritesh leads engineering at Appycodes and has shipped Functions-based pricing on nine Plus
          stores in the last eighteen months, including the OEM Parts Store (B2B tier pricing across
          70,000 SKUs) and Tierfutter Pro (volume discounts on perishable inventory). The three patterns
          above are the ones that come up most often; the underlying Rust scaffolding gets copied
          between projects almost verbatim.
        </AuthorByline>
      </PostBody>

      <CtaBand />
    </>
  );
}
