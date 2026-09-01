import type { Metadata } from "next";
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

const PUBLISHED_ISO = "2026-09-01";
const MODIFIED_ISO = "2026-09-01";
const READ_TIME = "11 min read";

const PAGE_TITLE = "Companies House API for UK Onboarding and KYC";
const PAGE_DESCRIPTION =
  "A practical UK guide to company matching, KYC boundaries, identity checks and safe Companies House synchronisation.";
const PAGE_PATH = "/blog/companies-house-api-uk-onboarding-kyc/";
const PAGE_IMAGE = "/images/blog-companies-house-onboarding-system.png";
const PAGE_KEYWORDS =
  "Companies House API integration, Companies House API KYC, UK company lookup API, company verification API UK, Companies House customer onboarding";

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
    q: "Is the Companies House API free?",
    a: "The public data API is available to registered applications with an API key. The standard limit is 600 requests within five minutes, so high-volume products still need caching and queueing.",
  },
  {
    q: "Can Companies House be used as a KYC provider?",
    a: "It supports company identification, status, officer and beneficial-ownership checks. It does not replace applicant identity, authority, sanctions, PEP, risk and ongoing-monitoring checks where those are required.",
  },
  {
    q: "Can I automatically select the first search result?",
    a: "Usually, no. Trading names, abbreviations and similar legal names make the first result unreliable. Ask the user to confirm the company or use a scoring and review workflow.",
  },
  {
    q: "Should I store the complete API response?",
    a: "Store only what your purpose, audit and retention policy justify. Keep a timestamped source snapshot when it is useful, but avoid copying unnecessary officer and PSC data into your customer record.",
  },
  {
    q: "How often should company data be refreshed?",
    a: "Match the frequency to risk. A directory can refresh periodically; a regulated relationship may need event-based monitoring. The Streaming API supports real-time change feeds at larger scale.",
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
  breadcrumbLabel: "Companies House API for KYC",
  keywords: PAGE_KEYWORDS,
  faqs: FAQS,
});

const CHECKLIST = [
  "Store the company number as a string.",
  "Show candidate companies; never silently accept the first result.",
  "Ask the customer to confirm the legal name, number and address.",
  "Use postcode and other evidence when matching automatically.",
  "Keep the API key and all searches on the server.",
  "Separate registry snapshots from customer-confirmed data.",
  "Prevent null API fields from deleting confirmed information.",
  "Make scheduled jobs observable, idempotent and pausable.",
  "Collect officer and PSC data only when needed.",
  "Record evidence, decisions and review times.",
];

export default function Page() {
  return (
    <>
      <JsonLd data={schemas} />

      <PostHeader
        eyebrow="UK business systems guide"
        title="Using the Companies House API for UK customer onboarding and KYC"
        lead="How to find the right legal entity, understand what Companies House does not verify, and keep registry updates from damaging customer records."
        breadcrumbLabel="Companies House API for KYC"
        dateISO={MODIFIED_ISO}
        readTime={READ_TIME}
        image={PAGE_IMAGE}
        imageAlt="Companies House registry data moving through company matching, identity checks and monitored customer onboarding"
      />

      <PostBody>
        <section className={styles.summary} aria-labelledby="summary-title">
          <div className={styles.summaryCopy}>
            <p className={styles.kicker} id="summary-title">The short version</p>
            <p>
              Companies House can confirm that a company appears on the UK register. It cannot prove that the
              person completing your form controls that company or may act for it. Reliable onboarding treats
              company discovery, identity, authority and ongoing monitoring as separate decisions.
            </p>
          </div>
          <div className={styles.fourSteps} aria-label="Four-stage onboarding model">
            {[
              ["01", "Discover", "Find candidate companies"],
              ["02", "Resolve", "Confirm the legal entity"],
              ["03", "Verify", "Check person and authority"],
              ["04", "Monitor", "Review material changes"],
            ].map(([number, title, copy]) => (
              <div className={styles.step} key={number}>
                <span>{number}</span><strong>{title}</strong><small>{copy}</small>
              </div>
            ))}
          </div>
        </section>

        <p>
          The Companies House API is simple to call. The harder work sits around it: resolving ambiguous
          business names, deciding what evidence is sufficient, and preventing an external data feed from
          becoming the unquestioned source of truth for your customer record.
        </p>

        <nav className={styles.contents} aria-labelledby="contents-title">
          <p className={styles.kicker} id="contents-title">In this guide</p>
          <ol>
            <li><a href="#what-it-provides">What Companies House provides</a></li>
            <li><a href="#kyc-boundary">The KYC boundary</a></li>
            <li><a href="#matching">Matching the right company</a></li>
            <li><a href="#safe-sync">Safe synchronisation</a></li>
            <li><a href="#architecture">The onboarding architecture</a></li>
            <li><a href="#implementation">Implementation essentials</a></li>
          </ol>
        </nav>

        <h2 id="what-it-provides">What the Companies House API provides</h2>

        <p>
          The Public Data API exposes live register information: legal name, company number, status,
          incorporation date, company type, registered office, previous names and SIC codes. Linked resources
          cover officers, people with significant control (PSCs), filings, charges and insolvency.{" "}
          <a href="https://developer.company-information.service.gov.uk/">Companies House API</a>{" "}
          <a href="https://developer-specs.company-information.service.gov.uk/companies-house-public-data-api/resources/companyprofile?v=latest">Company profile reference</a>
        </p>

        <TableScroll>
          <table>
            <thead><tr><th>Task</th><th>Typical API call</th></tr></thead>
            <tbody>
              <tr><td>Find candidate companies</td><td><code>GET /search/companies</code></td></tr>
              <tr><td>Retrieve the chosen company</td><td><code>GET /company/{"{company_number}"}</code></td></tr>
              <tr><td>Review officers</td><td><code>GET /company/{"{company_number}"}/officers</code></td></tr>
              <tr><td>Review beneficial ownership</td><td><code>GET /company/{"{company_number}"}/persons-with-significant-control</code></td></tr>
            </tbody>
          </table>
        </TableScroll>

        <p>
          Authentication uses an API key over HTTP Basic Authentication. The standard limit is 600 requests
          within five minutes; excess traffic receives <code>429 Too Many Requests</code>.{ " " }
          <a href="https://developer-specs.company-information.service.gov.uk/guides/authorisation">Authentication guidance</a>{" "}
          <a href="https://developer.company-information.service.gov.uk/developer-guidelines">Developer guidelines</a>
        </p>

        <h2 id="kyc-boundary">Company lookup and KYC are not the same check</h2>

        <div className={styles.boundary}>
          <div className={styles.boundaryPanel}>
            <strong>Companies House can tell you</strong>
            <p>The entity exists, its number and status, its registered office, officers, PSCs and filing history.</p>
          </div>
          <div className={styles.boundaryMark} aria-hidden="true">≠</div>
          <div className={styles.boundaryPanel}>
            <strong>Your onboarding must decide</strong>
            <p>Who the applicant is, whether they have authority, whether screening passes and whether the risk is acceptable.</p>
          </div>
        </div>

        <TableScroll>
          <table>
            <thead><tr><th>Question</th><th>Companies House</th><th>Additional control</th></tr></thead>
            <tbody>
              <tr><td>Does the legal entity exist?</td><td>Yes</td><td>Customer confirms the correct record</td></tr>
              <tr><td>Is the applicant an officer or PSC?</td><td>Partly</td><td>Identity and role matching</td></tr>
              <tr><td>May the applicant act for the company?</td><td>No</td><td>Authority check or mandate</td></tr>
              <tr><td>Is the person or entity sanctioned?</td><td>No</td><td>Current sanctions screening</td></tr>
              <tr><td>Is the relationship acceptable?</td><td>No</td><td>Your risk and due-diligence policy</td></tr>
            </tbody>
          </table>
        </TableScroll>

        <Callout variant="warning" label="Do not turn a registry hit into a KYC pass">
          <p>
            Companies House warns that register information should not automatically be treated as verified.
            For regulated businesses, it supports customer due diligence; it does not complete it.{" "}
            <a href="https://www.gov.uk/guidance/searching-the-companies-house-register">Register guidance</a>{" "}
            <a href="https://www.gov.uk/hmrc-internal-manuals/anti-money-laundering-guidance-for-supervised-businesses/amlg11300">HMRC due-diligence guidance</a>
          </p>
        </Callout>

        <h2 id="matching">The first real problem: matching the right company</h2>

        <p>
          In one UK data-mapping project, we enriched a spreadsheet of business names with company numbers and
          SIC codes. The API responses were consistent; the matches were not. Trading names, abbreviations,
          previous names and near-identical businesses made “take the first result” unsafe.
        </p>

        <p>
          The durable workflow is <strong>name and address → candidate companies → scored matches → customer or
          reviewer confirmation → company number</strong>. The company number—not the search ranking—anchors the relationship.
        </p>

        <div className={styles.matchModel} aria-label="Company matching decision model">
          <div className={styles.modelHead}>A practical matching score</div>
          <div className={styles.signals}>
            <div className={styles.signal}><b>40</b><span>Exact normalised legal name</span></div>
            <div className={styles.signal}><b>25</b><span>Exact registered-office postcode</span></div>
            <div className={styles.signal}><b>10</b><span>Town or locality</span></div>
            <div className={styles.signal}><b>25</b><span>Status, SIC, date and previous-name evidence</span></div>
          </div>
          <div className={styles.routes}>
            <div className={styles.route}><strong>90–100</strong><span>Preselect, then ask the customer to confirm</span></div>
            <div className={styles.route}><strong>70–89</strong><span>Show the strongest candidates and differences</span></div>
            <div className={styles.route}><strong>Below 70</strong><span>Send to review; also review close top-two scores</span></div>
          </div>
        </div>

        <p>
          Treat these weights as a starting point and calibrate them against reviewed matches from your own
          customer base. Normalise punctuation, spacing and legal suffixes carefully, but avoid aggressive fuzzy
          matching that can merge two different businesses.
        </p>

        <h2 id="safe-sync">The second problem: safe synchronisation</h2>

        <p>
          On another UK accounting platform, a scheduled Companies House job caused company names to disappear.
          The platform recovered when the job was disabled. The fault was architectural: registry data had become
          authoritative over information customers had already confirmed.
        </p>

        <div className={styles.syncDiagram} aria-label="Safe Companies House synchronisation design">
          <div className={styles.syncHead}>Keep a safety boundary around the customer record</div>
          <div className={styles.syncFlow}>
            <div className={styles.syncNode}>
              <strong>Registry snapshot</strong>
              <p>Source response, retrieval time, ETag and mapped fields</p>
            </div>
            <div className={styles.syncArrow} aria-hidden="true">→</div>
            <div className={styles.syncNode}>
              <strong>Update policy</strong>
              <p>Compare, validate, create review event or alert</p>
            </div>
            <div className={styles.syncArrow} aria-hidden="true">→</div>
            <div className={`${styles.syncNode} ${styles.syncNodeSafe}`}>
              <strong>Customer record</strong>
              <p>Confirmed operational data changes only under explicit rules</p>
            </div>
          </div>
        </div>

        <p>Separate four concepts in the data model:</p>
        <CodeBlock language="text" caption="Registry data model">{`customer_company      customer-confirmed operational record
registry_link         company number, match method, verification state
registry_snapshot     Companies House data plus retrieval time and ETag
registry_change_event detected difference, review status and audit history`}</CodeBlock>

        <p>
          This prevents null API values from erasing confirmed fields, makes name and status changes reviewable,
          lets failed batches resume safely, and allows the integration to be paused without stopping the product.
        </p>

        <h2 id="architecture">The four-stage onboarding architecture</h2>

        <div className={styles.architecture}>
          <div className={styles.architectureStep}>
            <span>01</span><strong>Discover</strong>
            <p>Search by name or go directly to a known company number. Return a short candidate list.</p>
          </div>
          <div className={styles.architectureStep}>
            <span>02</span><strong>Resolve</strong>
            <p>Show legal name, number, status, postcode and date. Save the customer&apos;s confirmation.</p>
          </div>
          <div className={styles.architectureStep}>
            <span>03</span><strong>Verify</strong>
            <p>Apply the identity, authority, sanctions and risk checks appropriate to the product.</p>
          </div>
          <div className={styles.architectureStep}>
            <span>04</span><strong>Monitor</strong>
            <p>Refresh important fields and route material changes into an auditable review process.</p>
          </div>
        </div>

        <p>
          Search belongs on the server, with debouncing and the API key kept out of browser code. Low-volume
          products can refresh records on a schedule. Larger datasets can consume the Companies House Streaming
          API, using durable timepoints, idempotent processing and reconnect backoff.{" "}
          <a href="https://developer-specs.company-information.service.gov.uk/streaming-api/guides/overview">Streaming API guidance</a>
        </p>

        <h3>Identity verification in 2026</h3>

        <p>
          Companies House identity verification became a legal requirement on 18 November 2025, with a
          twelve-month transition for existing directors and PSCs. Officer and PSC resources may now contain
          optional <code>identity_verification_details</code>.{ " " }
          <a href="https://www.gov.uk/guidance/verify-your-identity-for-companies-house">Verification guidance</a>{" "}
          <a href="https://www.gov.uk/guidance/when-you-need-to-verify-your-identity-for-companies-house">When it is required</a>
        </p>

        <Callout variant="note" label="An extra signal, not a universal answer">
          <p>
            The field is optional, the transition was still underway when this guide was reviewed, and the check
            concerns the person&apos;s Companies House role. Missing data should produce “unavailable” or a review
            state—not an automatic rejection.
          </p>
        </Callout>

        <h2 id="implementation">Implementation essentials</h2>

        <CodeBlock language="typescript" caption="Minimal server-side client">{`const baseUrl = "https://api.company-information.service.gov.uk";

async function companiesHouseGet<T>(path: string): Promise<T> {
  const apiKey = process.env.COMPANIES_HOUSE_API_KEY;
  if (!apiKey) throw new Error("Companies House API key is missing");

  const response = await fetch(\`\${baseUrl}\${path}\`, {
    headers: {
      Authorization: \`Basic \${Buffer.from(\`\${apiKey}:\`).toString("base64")}\`,
      Accept: "application/json",
    },
    signal: AbortSignal.timeout(8000),
  });

  if (response.status === 429) throw new Error("Rate limit reached");
  if (!response.ok) throw new Error(\`Companies House returned \${response.status}\`);
  return response.json() as Promise<T>;
}`}</CodeBlock>

        <div className={styles.codeNote}>
          <div><strong>Interactive traffic</strong><span>Reserve capacity for customer searches</span></div>
          <div><strong>Bulk enrichment</strong><span>Queue, cache and retry below the limit</span></div>
          <div><strong>Operations</strong><span>Track timeouts, 429s, mismatches and reviews</span></div>
        </div>

        <p>
          Add input validation, short-lived search caching, longer profile caching, correlation IDs, controlled
          retry with jitter, a circuit breaker and structured logs. Test failure paths against the Companies House
          sandbox before connecting a production workflow.{" "}
          <a href="https://developer.company-information.service.gov.uk/api-testing">API testing guidance</a>
        </p>

        <h3>Update rules worth defining before launch</h3>

        <TableScroll>
          <table>
            <thead><tr><th>Incoming change</th><th>Recommended behaviour</th></tr></thead>
            <tbody>
              <tr><td>Status, insolvency or material risk change</td><td>Save snapshot, create event and apply policy</td></tr>
              <tr><td>Registered name or office changes</td><td>Retain customer display data and request review where relevant</td></tr>
              <tr><td>Source field becomes null</td><td>Keep the confirmed value and log the missing source data</td></tr>
              <tr><td>Officer or PSC changes</td><td>Create a review event when risk requires it</td></tr>
              <tr><td>API unavailable or search ranking changes</td><td>Keep the last snapshot and confirmed company number</td></tr>
            </tbody>
          </table>
        </TableScroll>

        <h2>Privacy and release checklist</h2>

        <p>
          Public register data remains personal data when you store and use officer or PSC information. Apply UK
          GDPR data minimisation and storage limitation: collect only what the decision requires, define retention,
          restrict access and explain the registry check in your privacy notice.{" "}
          <a href="https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/data-protection-principles/a-guide-to-the-data-protection-principles/data-minimisation/">ICO data-minimisation guidance</a>{" "}
          <a href="https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/data-protection-principles/a-guide-to-the-data-protection-principles/storage-limitation/">ICO storage-limitation guidance</a>
        </p>

        <div className={styles.checklist}>
          {CHECKLIST.map((item) => (
            <div className={styles.checkItem} key={item}>
              <span className={styles.check} aria-hidden="true">✓</span><p>{item}</p>
            </div>
          ))}
        </div>

        <Faq items={FAQS} />

        <section className={styles.recommendation}>
          <h2>Final recommendation</h2>
          <p>Use Companies House as the official registry source inside a wider onboarding system.</p>
          <div className={styles.finalFlow}>
            <span>Search</span><i>→</i><span>Resolve</span><i>→</i><span>Confirm number</span><i>→</i>
            <span>Verify person + authority</span><i>→</i><span>Assess risk</span><i>→</i><span>Monitor</span>
          </div>
          <p>
            Treat search results as candidates, the company number as the registry key, identity and authority as
            separate checks, and every external update as an auditable event. That is what makes onboarding faster
            without sacrificing the accuracy of the customer record.
          </p>
        </section>

        <p className={styles.disclaimer}>
          This article provides technical and operational guidance. Businesses with legal or regulatory obligations
          should have their onboarding and due-diligence policy reviewed by an appropriate UK compliance professional.
        </p>

        <RelatedGrid>
          <RelatedCard tag="Service" title="API & Integration" body="Design a Companies House integration around your real onboarding process." href="/services/api-and-integration/" />
          <RelatedCard tag="Service" title="SaaS Web App Development" body="Build customer onboarding, verification and operations as one product." href="/services/saas-web-app-development/" />
          <RelatedCard tag="Service" title="Maintenance & Support" body="Own the scheduled jobs and monitoring after launch." href="/services/maintenance-support/" />
        </RelatedGrid>

        <AuthorByline lastReviewedISO={MODIFIED_ISO}>
          Ritesh leads engineering at Appycodes. This guide draws on UK accounting, company-data and CRM work where
          resolving ambiguous businesses and protecting customer-confirmed records mattered more than the API call itself.
        </AuthorByline>
      </PostBody>

      <CtaBand />
    </>
  );
}
