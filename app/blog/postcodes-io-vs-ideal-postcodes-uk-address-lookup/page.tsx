import type { Metadata } from "next";
import Link from "next/link";
import { pageMeta } from "@/lib/seo";
import { JsonLd } from "@/components/jsonld";
import { CtaBand } from "@/components/cta-band";
import {
  AuthorByline,
  Callout,
  CodeBlock,
  Faq,
  PostBody,
  PostHeader,
  RelatedCard,
  RelatedGrid,
  TableScroll,
} from "@/components/blog";
import { buildPostSchemas, type FaqPair } from "@/lib/blog-post";
import styles from "./page.module.css";

const PUBLISHED_ISO = "2026-09-05";
const REVIEWED_ISO = "2026-09-05";
const READ_TIME = "15 min read";
const REVIEWER = "Appycodes Editorial Team";

const PAGE_TITLE = "Postcodes.io vs Ideal Postcodes: Which UK Address Lookup Should You Use?";
const META_TITLE = "Postcodes.io vs Ideal Postcodes: UK Address Lookup | Appycodes";
const PAGE_DESCRIPTION =
  "A practical comparison of Postcodes.io and Ideal Postcodes for UK address lookup, with a scoring model, implementation pattern and real project boundary.";
const PAGE_PATH = "/blog/postcodes-io-vs-ideal-postcodes-uk-address-lookup/";
const PAGE_IMAGE = "/images/blog-postcodes-io-vs-ideal-postcodes-uk-address-lookup.png";
const PAGE_KEYWORDS =
  "Postcodes.io vs Ideal Postcodes, UK address lookup API, postcode lookup API UK, Royal Mail PAF API, UK postcode validation";

export const metadata: Metadata = pageMeta({
  title: META_TITLE,
  description: PAGE_DESCRIPTION,
  path: PAGE_PATH,
  image: PAGE_IMAGE,
  type: "article",
  keywords: PAGE_KEYWORDS,
  publishedTime: PUBLISHED_ISO,
  modifiedTime: REVIEWED_ISO,
  authors: ["Ritesh Agarwal"],
});

const FAQS: FaqPair[] = [
  {
    q: "Does Postcodes.io return a full UK address?",
    a: "No. It resolves a postcode to postcode-level geography and administrative data. It does not return the individual flats, houses or organisations that receive post at that postcode.",
  },
  {
    q: "Is Ideal Postcodes just a paid version of Postcodes.io?",
    a: "No. They solve different data problems. Ideal Postcodes can return structured delivery-point addresses and address search results; Postcodes.io serves open postcode and geography datasets.",
  },
  {
    q: "Can a retailer use Postcodes.io at checkout?",
    a: "It can validate and enrich a postcode, but it cannot populate a complete delivery address. A retailer still needs manual address entry or a delivery-address service such as Ideal Postcodes.",
  },
  {
    q: "Should a UK address form allow manual entry?",
    a: "Yes. Addresses can be new, missing, unusual or outside the UK. A manual path also keeps checkout and onboarding usable when the lookup provider is unavailable.",
  },
  {
    q: "Should an address API key be exposed in browser code?",
    a: "Only if the provider explicitly supports a browser key and it is restricted to approved origins and operations. Server-side proxying gives tighter control over secrets, quotas, logging and provider changes.",
  },
];

const schemas = buildPostSchemas({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: PAGE_PATH,
  image: PAGE_IMAGE,
  publishedISO: PUBLISHED_ISO,
  modifiedISO: REVIEWED_ISO,
  readTime: READ_TIME,
  breadcrumbLabel: "Postcodes.io vs Ideal Postcodes",
  keywords: PAGE_KEYWORDS,
  reviewerName: REVIEWER,
  faqs: FAQS,
});

const ROUTE_CODE = `import { NextRequest, NextResponse } from "next/server";

const compact = (value: string) =>
  value.trim().toUpperCase().split(" ").join("");

export async function GET(request: NextRequest) {
  const postcode = compact(
    request.nextUrl.searchParams.get("postcode") ?? ""
  );
  const mode = request.nextUrl.searchParams.get("mode");

  if (!/^[A-Z0-9]{5,7}$/.test(postcode)) {
    return NextResponse.json(
      { error: "Enter a full UK postcode" },
      { status: 400 }
    );
  }

  if (mode === "geography") {
    const response = await fetch(
      \`https://api.postcodes.io/postcodes/\${postcode}\`,
      { next: { revalidate: 86400 } }
    );
    if (!response.ok) {
      return NextResponse.json({ error: "Postcode not found" }, { status: 404 });
    }
    const { result } = await response.json();
    return NextResponse.json({
      postcode: result.postcode,
      latitude: result.latitude,
      longitude: result.longitude,
      region: result.region,
      localAuthorityCode: result.codes.admin_district,
    });
  }

  if (mode === "address") {
    const key = process.env.IDEAL_POSTCODES_API_KEY;
    if (!key) throw new Error("IDEAL_POSTCODES_API_KEY is missing");
    const url = new URL(
      \`https://api.ideal-postcodes.co.uk/v1/postcodes/\${postcode}\`
    );
    url.searchParams.set("api_key", key);
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) {
      return NextResponse.json({ error: "Address lookup failed" }, { status: 502 });
    }
    const { result } = await response.json();
    return NextResponse.json({
      addresses: result.map((address: Record<string, string>) => ({
        line1: address.line_1,
        line2: address.line_2,
        line3: address.line_3,
        postTown: address.post_town,
        postcode: address.postcode,
        uprn: address.uprn,
      })),
    });
  }

  return NextResponse.json({ error: "Choose geography or address" }, { status: 400 });
}`;

export default function Page() {
  return (
    <>
      <JsonLd data={schemas} />

      <PostHeader
        eyebrow="UK company data & identity"
        title="Postcodes.io vs Ideal Postcodes: which UK address lookup should you use?"
        lead="Choose by the record your product must return: postcode geography or a complete delivery-point address."
        breadcrumbLabel="UK address lookup"
        dateISO={PUBLISHED_ISO}
        readTime={READ_TIME}
        authorName="Ritesh Agarwal"
        image={PAGE_IMAGE}
        imageAlt="A UK postcode routed either to geographic boundary data or to a list of complete delivery addresses"
      />

      <PostBody>
        <section className={styles.summary} aria-labelledby="summary-title">
          <div>
            <p className={styles.kicker} id="summary-title">Direct answer</p>
            <p>
              Use <strong>Postcodes.io</strong> when you need to validate a postcode, locate it, or attach region,
              constituency and local-authority data. Use <strong>Ideal Postcodes</strong> when a person must select
              a complete UK delivery address—flat, building, organisation, post town and postcode. For many
              service-area products, the right architecture is both: postcode geography for eligibility, then an
              address service only when a full premises record is actually required.
            </p>
          </div>
          <div className={styles.answerGrid}>
            <div><span>postcode → place</span><strong>Postcodes.io</strong><small>Validation, coordinates, boundaries and statistical geography</small></div>
            <div><span>postcode → premises</span><strong>Ideal Postcodes</strong><small>Selectable, structured delivery-point addresses</small></div>
            <div><span>eligibility → fulfilment</span><strong>Use both</strong><small>Enrich first; pay for address resolution at the point of need</small></div>
          </div>
        </section>

        <p>
          The names make these services sound interchangeable. They are not. The choice is a data-modelling
          decision with consequences for conversion, fulfilment and support. Asking “which postcode API is
          cheaper?” skips the more important question: <em>does this step need a postcode record or an address
          record?</em>
        </p>

        <nav className={styles.contents} aria-labelledby="contents-title">
          <p className={styles.kicker} id="contents-title">In this guide</p>
          <ol>
            <li><a href="#different-records">The two records</a></li>
            <li><a href="#comparison">Side-by-side comparison</a></li>
            <li><a href="#project">A real UK project boundary</a></li>
            <li><a href="#score">The Premises Dependency Score</a></li>
            <li><a href="#architecture">Architecture and code</a></li>
            <li><a href="#recommendations">Recommendations by business type</a></li>
          </ol>
        </nav>

        <h2 id="different-records">Postcodes.io and Ideal Postcodes return different kinds of record</h2>

        <h3>Postcodes.io answers “where is this postcode?”</h3>

        <p>
          Postcodes.io describes itself as a free UK postcode lookup API and geocoder. Its open-source service
          exposes postcode lookup, autocomplete, bulk lookup, reverse geocoding, nearest-postcode search and
          terminated-postcode search. The underlying service publishes the ONS Postcode Directory, Ordnance Survey
          Open Names and Scottish Postcode Directory datasets.{" "}
          <a href="https://postcodes.io/docs/api/">Postcodes.io API documentation</a>{" "}
          <a href="https://github.com/ideal-postcodes/postcodes.io">Postcodes.io source and data overview</a>
        </p>

        <p>
          A result can include a normalised postcode, latitude and longitude, country, region, local authority,
          parliamentary constituency, statistical areas and their codes. That is excellent for territory checks,
          routing, analytics, public-data joins and answering “is this postcode in an area we serve?”
        </p>

        <Callout variant="warning" label="A postcode is not a premises">
          <p>
            One postcode can cover several delivery points. Postcodes.io does not return the houses, flats or
            organisations at that postcode, so it cannot populate a complete shipping, installation or contract
            address. The coordinates are postcode-level, not proof of a property entrance or customer location.
          </p>
        </Callout>

        <p>
          The Office for National Statistics explains another subtle limitation: ONS postcode directories contain
          current and terminated postcodes, and postcode geography does not always follow administrative boundaries.
          ONSPD assigns a postcode according to the administrative area containing its geographical centre.{" "}
          <a href="https://www.ons.gov.uk/aboutus/transparencyandgovernance/freedomofinformationfoi/unitaryauthoritiesintheukmappedtofullpostcodes">ONS guidance on postcode directories and boundaries</a>
        </p>

        <h3>Ideal Postcodes answers “which deliverable address did the user mean?”</h3>

        <p>
          Ideal Postcodes provides authenticated address search, postcode lookup and address cleansing. A postcode
          lookup returns the structured addresses at that postcode; its two-step Address Search finds candidates
          from partial text and resolves the selected candidate to a full record. The service identifies Royal Mail
          PAF as a core UK address source and says it is updated daily.{" "}
          <a href="https://docs.ideal-postcodes.co.uk/docs/api/api-reference/">Ideal Postcodes API reference</a>{" "}
          <a href="https://openapi.ideal-postcodes.co.uk/">Ideal Postcodes OpenAPI overview</a>
        </p>

        <p>
          Its integration guidance treats three address lines, post town and postcode as the minimum fields for a
          complete deliverable UK address. Results can also include address components and identifiers such as a
          UPRN, depending on the enabled dataset.{" "}
          <a href="https://docs.ideal-postcodes.co.uk/docs/postcode-lookup/configure/">Ideal Postcodes postcode-lookup configuration</a>
        </p>

        <p>
          This is a metered service: keys have balances, restrictions and usage history. The current API reference
          documents a default per-IP rate limit of 30 requests per second, with a separate limit for autocomplete.
          Treat both commercial terms and operational limits as deployment configuration, not constants buried in
          application code. The same API reference documents key-based authentication and appropriate HTTP errors.
        </p>

        <h2 id="comparison">Postcodes.io vs Ideal Postcodes: side-by-side</h2>

        <TableScroll>
          <table>
            <thead>
              <tr><th>Decision factor</th><th>Postcodes.io</th><th>Ideal Postcodes</th></tr>
            </thead>
            <tbody>
              <tr><td>Primary record</td><td>Postcode plus geography and administrative codes</td><td>Complete, structured delivery-point address</td></tr>
              <tr><td>Returns flats, houses and organisations</td><td>No</td><td>Yes, where present in the enabled address dataset</td></tr>
              <tr><td>Useful coordinates</td><td>Yes, at postcode level</td><td>Available address/property data depends on product and dataset</td></tr>
              <tr><td>Typical UX</td><td>Enter postcode, validate or enrich</td><td>Enter postcode or partial address, then select a premise</td></tr>
              <tr><td>Authentication</td><td>Public API requires no key</td><td>API key required</td></tr>
              <tr><td>Cost model</td><td>Free public API; self-hosting available</td><td>Metered lookup balance or plan</td></tr>
              <tr><td>Best for</td><td>Territories, analytics, public-data joins, rough location and postcode validation</td><td>Checkout, delivery, installations, contracts, CRM address capture and cleansing</td></tr>
              <tr><td>Material caveat</td><td>Not a full-address database; Northern Ireland commercial licensing needs separate attention</td><td>Paid dependency; key, quota, outage and data-licence controls are part of the integration</td></tr>
            </tbody>
          </table>
        </TableScroll>

        <p>
          Postcodes.io source code is MIT-licensed and Great Britain postcode data is available under the OS
          OpenData licence. Its licence page says commercial use of Northern Ireland postcode data requires a
          licence from Land & Property Services. Check the current terms for the dataset and use case you deploy;
          “the HTTP endpoint is free” does not remove downstream data obligations.{" "}
          <a href="https://postcodes.io/docs/licences/">Postcodes.io licence summary</a>
        </p>

        <h2 id="project">The real project boundary: postcode lookup inside a UK cover funnel</h2>

        <p>
          Appycodes has built and run the website conversion system for PlusHeat, a UK boiler and home-emergency
          cover business, since 2021. The documented production flow combines a three-axis plan configurator,
          postcode address lookup, a live plan summary, agreement start date, marketing preferences, CRM
          synchronisation and lead-source attribution.{" "}
          <Link href="/case-studies/plusheat/">See the PlusHeat case study</Link>.
        </p>

        <div className={styles.projectFlow} aria-label="PlusHeat lead-funnel evidence">
          <div><span>01</span><strong>Configure cover</strong><small>Customer, call-out fee and billing period</small></div>
          <i aria-hidden="true">→</i>
          <div><span>02</span><strong>Resolve address</strong><small>Postcode to a customer-selected premises</small></div>
          <i aria-hidden="true">→</i>
          <div><span>03</span><strong>Qualify lead</strong><small>Plan summary and start date</small></div>
          <i aria-hidden="true">→</i>
          <div><span>04</span><strong>Synchronise CRM</strong><small>Attribution and operational follow-up</small></div>
        </div>

        <p>
          The difficult boundary is easy to miss: a valid postcode is not enough for a premises-based customer
          journey. The sales or operations team needs the address the customer selected, while service-area logic
          may need only the postcode and its geography. Collapsing both into one “address lookup” step either leaves
          the CRM without a complete address or makes every eligibility check depend on a paid premises lookup.
        </p>

        <Callout variant="note" label="Evidence without overclaiming">
          <p>
            The repository verifies the PlusHeat flow and Appycodes’ responsibility for it. It does not publicly
            record which address-data vendor is used, lookup-volume metrics or a named outage. This article therefore
            uses the engagement to show the verified product boundary; it does not claim that PlusHeat uses Ideal
            Postcodes or that a vendor caused a particular incident.
          </p>
        </Callout>

        <h2 id="score">The Appycodes Premises Dependency Score</h2>

        <p>
          We use a simple ten-point model to stop teams buying an address service for a geography problem—or
          shipping a postcode API where operations need a real premises. Score the step where the address is
          captured, not the product as a whole.
        </p>

        <div className={styles.scoreModel}>
          <div className={styles.scoreHead}>Premises Dependency Score (PDS) · 0–10</div>
          <div className={styles.scoreSignals}>
            <div><b>+4</b><span>The transaction, visit, delivery or cover attaches to a specific premises</span></div>
            <div><b>+2</b><span>The user must distinguish a flat, unit, building or organisation at one postcode</span></div>
            <div><b>+2</b><span>The address is sent to a carrier, field team, contract, insurer or CRM workflow</span></div>
            <div><b>+1</b><span>A wrong address creates material support, refund, travel or redelivery cost</span></div>
            <div><b>+1</b><span>Operations need a standardised address rather than free text</span></div>
          </div>
          <div className={styles.scoreRoutes}>
            <div><strong>0–2 · Postcodes.io</strong><span>Validate or enrich a postcode; do not pretend to have the full address.</span></div>
            <div><strong>3–5 · Hybrid/manual</strong><span>Use postcode data for the rule, then collect or verify the address only when needed.</span></div>
            <div><strong>6–10 · Address service</strong><span>Use Ideal Postcodes or an equivalent premises-level source, plus manual fallback.</span></div>
          </div>
        </div>

        <p>
          The score is a decision aid, not an accreditation. A warehouse territory heatmap is normally 0–2.
          A retailer shipping parcels is usually 8–10. A home-services lead form may split: 2 for the early
          “do we cover your area?” step, then 9 when the customer chooses the address that operations will use.
          Splitting those stages is often the cleanest architecture and the best conversion experience.
        </p>

        <h2 id="architecture">A provider boundary that survives pricing and API changes</h2>

        <div className={styles.architecture} role="img" aria-label="Address capture architecture from user input through a server route to geography or premises data, followed by confirmation and the business record">
          <div><span>01</span><strong>User input</strong><small>Forgiving postcode field and manual option</small></div>
          <i aria-hidden="true">→</i>
          <div><span>02</span><strong>Server route</strong><small>Normalise, validate, time out and log</small></div>
          <i aria-hidden="true">→</i>
          <div className={styles.branch}><span>03A</span><strong>Geography</strong><small>Postcodes.io</small><hr/><span>03B</span><strong>Premises</strong><small>Address provider</small></div>
          <i aria-hidden="true">→</i>
          <div><span>04</span><strong>Explicit choice</strong><small>User selects or enters an address</small></div>
          <i aria-hidden="true">→</i>
          <div><span>05</span><strong>Business record</strong><small>Store provenance and confirmation time</small></div>
        </div>

        <p>
          Keep provider response shapes out of your checkout, onboarding or CRM model. Return a narrow internal
          contract instead. That makes it possible to change provider, add a fallback, or move an API key
          server-side without rewriting every form.
        </p>

        <CodeBlock language="typescript" caption="app/api/address/route.ts — one route, two explicit record types">
          {ROUTE_CODE}
        </CodeBlock>

        <p>
          The format check above is only an early guard. A regular expression cannot prove that a postcode is
          allocated; the provider lookup makes that decision. In production, add an abort timeout, structured error
          codes, request correlation, quota alerts and tests for malformed, terminated and unavailable results.
          Cache postcode geography aggressively enough for your freshness requirement. Cache or retain provider
          address data only where the contract and data licence permit it.
        </p>

        <h3>The failure paths belong in the user journey</h3>

        <TableScroll>
          <table>
            <thead><tr><th>Failure</th><th>User experience</th><th>Operational control</th></tr></thead>
            <tbody>
              <tr><td>Postcode malformed</td><td>Accept case and spacing variations; show a specific error</td><td>Do not spend a paid lookup</td></tr>
              <tr><td>Valid postcode, no address returned</td><td>Offer manual address entry immediately</td><td>Record lookup outcome, not a fabricated match</td></tr>
              <tr><td>Provider timeout or quota exhausted</td><td>Keep the form usable with manual entry</td><td>Alert on error rate and remaining balance</td></tr>
              <tr><td>New build or converted flats missing</td><td>Let the user enter and confirm the real address</td><td>Keep provenance as “manual”; review if risk requires</td></tr>
              <tr><td>International address</td><td>Switch to a country-aware manual/global flow</td><td>Do not force it into a UK postcode schema</td></tr>
              <tr><td>User changes selected address</td><td>Show a review step before submission</td><td>Replace only after explicit confirmation</td></tr>
            </tbody>
          </table>
        </TableScroll>

        <p>
          GOV.UK’s address pattern recommends accepting postcodes with different case, spacing and common
          punctuation, and providing a manual option for international, missing or incorrectly listed addresses.
          It also notes that county is not required for a correct UK postal address. These are small details with
          outsized effects on form completion.{" "}
          <a href="https://design-system.service.gov.uk/patterns/addresses/">GOV.UK Design System address pattern</a>
        </p>

        <h2 id="recommendations">Recommendations for UK retailers, SaaS teams and field-service businesses</h2>

        <div className={styles.recommendations}>
          <article>
            <span>UK retailer</span>
            <h3>Resolve the delivery point</h3>
            <p>Use Ideal Postcodes or an equivalent full-address service at checkout, retain manual entry, and pass the customer-confirmed address—not a postcode centroid—to fulfilment. Use Postcodes.io separately for regional analytics or service restrictions.</p>
          </article>
          <article>
            <span>UK SaaS or directory</span>
            <h3>Do not buy precision you do not use</h3>
            <p>If the product needs region, council, constituency or approximate map placement, Postcodes.io is the simpler fit. Ask for a complete address only when the workflow genuinely acts on that premises.</p>
          </article>
          <article>
            <span>Home services & cover</span>
            <h3>Split eligibility from fulfilment</h3>
            <p>Check the postcode or service territory early. Resolve and confirm the actual property later, before a contract, appointment or CRM hand-off. This mirrors the boundary visible in the PlusHeat funnel.</p>
          </article>
          <article>
            <span>Marketplace or platform</span>
            <h3>Store provenance per address</h3>
            <p>Keep the selected record, source, source identifier where licensed, confirmation timestamp and manual edits. Never let a later enrichment job silently overwrite an address a buyer or seller confirmed.</p>
          </article>
        </div>

        <h2>What Appycodes recommends after real implementations</h2>

        <p>
          Begin with the output contract. If the next step needs only a postcode, coordinates or administrative
          code, use Postcodes.io. If a person or parcel must arrive at a door, use premises-level address data.
          Where the journey has both needs, keep them as separate calls with separate caching, cost and failure
          policies.
        </p>

        <div className={styles.finalRule}>
          <strong>Our rule:</strong>
          <span>Postcodes.io tells the product where a postcode belongs. Ideal Postcodes tells the user which address they mean.</span>
        </div>

        <p>
          Whichever provider you choose, accept messy human input, offer manual entry, keep secrets and quotas
          controlled, store confirmation separately from enrichment, and observe the failure rate. A good address
          integration is not the one that always shows a dropdown; it is the one that still completes the business
          process when no dropdown can be shown.
        </p>

        <Faq items={FAQS} />

        <section className={styles.review}>
          <p><strong>Published:</strong> 5 September 2026</p>
          <p><strong>Reviewed:</strong> 5 September 2026</p>
          <p><strong>Reviewer:</strong> {REVIEWER}</p>
        </section>

        <p className={styles.disclaimer}>
          This article provides technical and operational guidance, not legal or licensing advice. Confirm address
          data licensing, retention and regulated-product requirements for your organisation and deployment.
        </p>

        <RelatedGrid>
          <RelatedCard tag="UK topic cluster" title="Company data & identity" body="More UK registry, identity, charity and postcode implementation guidance." href="/uk/insights/company-data-identity/" />
          <RelatedCard tag="Related guide" title="Companies House API for onboarding" body="Resolve the right legal entity and keep registry data in its proper role." href="/blog/companies-house-api-uk-onboarding-kyc/" />
          <RelatedCard tag="Case study" title="PlusHeat cover-plan funnel" body="See the postcode-qualified lead journey and CRM hand-off in production." href="/case-studies/plusheat/" />
        </RelatedGrid>
        <RelatedGrid>
          <RelatedCard tag="Service" title="API & integration" body="Design a resilient provider boundary around the business workflow." href="/services/api-and-integration/" />
          <RelatedCard tag="Service" title="Web & commerce" body="Build UK checkout and conversion journeys that hold up operationally." href="/services/commerce-content/" />
          <RelatedCard tag="UK knowledge hub" title="All UK insights" body="Browse payments, ecommerce, product engineering and compliance clusters." href="/uk/insights/" />
        </RelatedGrid>

        <AuthorByline authorName="Ritesh Agarwal" lastReviewedISO={REVIEWED_ISO}>
          Ritesh is Appycodes’ founding partner and leads product engineering across UK software, ecommerce and
          integration work. This guide is grounded in the documented PlusHeat postcode-qualified lead flow and
          current first-party provider, ONS and GOV.UK guidance.
        </AuthorByline>
      </PostBody>

      <CtaBand />
    </>
  );
}
