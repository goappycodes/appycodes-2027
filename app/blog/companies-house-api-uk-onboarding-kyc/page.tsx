import Image from "next/image";
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
const READ_TIME = "17 min read";

const PAGE_TITLE = "Companies House API for UK Onboarding and KYC";
const PAGE_DESCRIPTION =
  "A practical guide to company matching, KYC boundaries, identity checks, rate limits, monitoring and safe sync architecture using Companies House data.";
const PAGE_PATH = "/blog/companies-house-api-uk-onboarding-kyc/";
const PAGE_IMAGE = "/images/blog-companies-house-uk-kyc-hero.png";
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
    a: "The public data API can be accessed with a registered application and API key. Companies House applies usage limits, including the standard limit of 600 requests within five minutes. Confirm current terms and limits before designing a high-volume service.",
  },
  {
    q: "Can Companies House be used as a KYC provider?",
    a: "It can support company identification, status checks, officer checks and beneficial ownership research. A complete KYC or customer due diligence process may also require applicant identity, authority, sanctions, PEP, risk and ongoing monitoring checks.",
  },
  {
    q: "Can I automatically select the first company search result?",
    a: "This is safe only when your product can tolerate incorrect matches, which most onboarding and CRM systems cannot. Ask the user to confirm the company or use a scoring and review workflow.",
  },
  {
    q: "Should I store the whole Companies House response?",
    a: "Store only what your purpose, audit requirements and retention policy justify. A timestamped source snapshot can be useful, while duplicating every piece of personal data creates privacy and maintenance costs.",
  },
  {
    q: "How often should company information be refreshed?",
    a: "Refresh frequency should follow the risk and operational need. A basic supplier directory may refresh periodically. A regulated financial relationship may require event-based monitoring and additional risk checks. The Companies House Streaming API supports real-time registry change feeds for larger monitoring systems.",
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
  "Return candidate records; never silently accept the first name match.",
  "Show legal name, number, status and registered office before confirmation.",
  "Use address and other corroborating data for automated matching.",
  "Send ambiguous matches to a review queue.",
  "Keep the API key on the server.",
  "Handle rate limits, timeouts and retries.",
  "Separate registry data from customer-confirmed data.",
  "Prevent null source values from erasing confirmed values.",
  "Make scheduled jobs idempotent, observable and pausable.",
  "Collect officer and PSC data only where required.",
  "Use current sources for sanctions and identity checks.",
  "Record the evidence and time behind every verification decision.",
  "Monitor important changes after onboarding.",
];

function RichFigure({
  src,
  alt,
  caption,
  width,
  height,
}: {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
}) {
  return (
    <figure className={styles.figureFrame}>
      <Image src={src} alt={alt} width={width} height={height} sizes="(max-width: 760px) 100vw, 92vw" />
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

export default function Page() {
  return (
    <>
      <JsonLd data={schemas} />

      <PostHeader
        eyebrow="UK business systems guide"
        title="Using the Companies House API for UK customer onboarding and KYC"
        lead="A practical architecture for finding the right legal entity, separating company lookup from identity checks, and monitoring Companies House data without putting customer records at risk."
        breadcrumbLabel="Companies House API for KYC"
        dateISO={MODIFIED_ISO}
        readTime={READ_TIME}
        image={PAGE_IMAGE}
        imageAlt="Companies House data connected to company onboarding, identity checks and monitoring"
      />

      <PostBody>
        <section className={styles.executiveSummary} aria-labelledby="executive-summary">
          <div className={styles.summaryTop}>
            <p className={styles.kicker} id="executive-summary">Executive summary</p>
            <p>
              Companies House can confirm that a company appears on the UK register. It cannot, by itself,
              prove that the person completing your form controls that company or is authorised to act for it.
              A reliable onboarding system treats those as separate decisions.
            </p>
          </div>
          <div className={styles.stages} aria-label="Four-stage onboarding model">
            {[
              ["01", "Discover", "Find possible companies"],
              ["02", "Resolve", "Select the legal entity"],
              ["03", "Verify", "Check organisation and person"],
              ["04", "Monitor", "Watch material changes"],
            ].map(([number, title, copy]) => (
              <div className={styles.stage} key={number}>
                <span className={styles.stageNo}>{number}</span>
                <strong>{title}</strong>
                <span>{copy}</span>
              </div>
            ))}
          </div>
        </section>

        <p>
          Companies House can tell your application that a company exists, its registration number, status,
          registered office, officers, people with significant control, filing history and other public
          information. It cannot, by itself, prove that the person completing your form controls that company
          or has authority to act for it.
        </p>

        <p>
          That distinction determines whether a Companies House integration becomes a useful onboarding tool
          or a source of incorrect customer records.
        </p>

        <div className={styles.distinction}>
          <div className={styles.distinctionPanel}>
            <strong>Company lookup</strong>
            <p>Does this legal entity appear on the UK register, and what does the public record say?</p>
          </div>
          <div className={styles.distinctionDivider} aria-hidden="true">≠</div>
          <div className={styles.distinctionPanel}>
            <strong>Identity and authority</strong>
            <p>Is this person who they claim to be, and may they act for this company?</p>
          </div>
        </div>

        <p>
          After working with Companies House data in UK accounting, company data and CRM projects, our
          preferred model has four stages: discover possible companies, resolve the correct legal entity,
          verify the organisation and the person acting for it, then monitor important changes after onboarding.
          The API call is the easy part. Entity matching, verification policy and safe synchronisation require
          most of the design work.
        </p>

        <nav className={styles.contents} aria-labelledby="contents-title">
          <p className={styles.kicker} id="contents-title">In this guide</p>
          <ol>
            <li><a href="#what-the-api-provides">What the API provides</a></li>
            <li><a href="#lookup-versus-kyc">Company lookup vs KYC</a></li>
            <li><a href="#company-matching">Company matching lessons</a></li>
            <li><a href="#safe-sync">Safe synchronisation</a></li>
            <li><a href="#onboarding-architecture">Four-stage architecture</a></li>
            <li><a href="#identity-verification">Identity verification in 2026</a></li>
            <li><a href="#implementation">Server-side implementation</a></li>
            <li><a href="#privacy">Privacy, retention and checklist</a></li>
          </ol>
        </nav>

        <h2 id="what-the-api-provides">What the Companies House API provides</h2>

        <p>
          The Companies House Public Data API returns live register data for companies covered by the
          Companies Act 2006. The core company profile can include the legal name, company number, status,
          incorporation date, company type, registered office, previous names, SIC codes and links to related
          resources. Those resources include officers, people with significant control, filing history, charges
          and insolvency information. <a href="https://developer.company-information.service.gov.uk/">Companies House API</a>{" "}
          <a href="https://developer-specs.company-information.service.gov.uk/companies-house-public-data-api/resources/companyprofile?v=latest">Company profile resource</a>
        </p>

        <p>A typical onboarding integration uses these endpoints:</p>

        <TableScroll>
          <table>
            <thead><tr><th>Purpose</th><th>Endpoint</th></tr></thead>
            <tbody>
              <tr><td>Search for candidates</td><td><code>GET /search/companies?q={"{query}"}</code></td></tr>
              <tr><td>Fetch the selected company</td><td><code>GET /company/{"{company_number}"}</code></td></tr>
              <tr><td>Fetch current officers</td><td><code>GET /company/{"{company_number}"}/officers</code></td></tr>
              <tr><td>Fetch people with significant control</td><td><code>GET /company/{"{company_number}"}/persons-with-significant-control</code></td></tr>
              <tr><td>Review filing events</td><td><code>GET /company/{"{company_number}"}/filing-history</code></td></tr>
              <tr><td>Review insolvency information</td><td><code>GET /company/{"{company_number}"}/insolvency</code></td></tr>
              <tr><td>Review registered charges</td><td><code>GET /company/{"{company_number}"}/charges</code></td></tr>
            </tbody>
          </table>
        </TableScroll>

        <p>
          The public API uses an API key sent through HTTP Basic Authentication. Companies House currently
          allows 600 requests within a five-minute period for the standard API. Requests above the limit
          receive a <code>429 Too Many Requests</code> response for the remainder of the window.{" "}
          <a href="https://developer-specs.company-information.service.gov.uk/guides/authorisation">Authentication guidance</a>{" "}
          <a href="https://developer.company-information.service.gov.uk/developer-guidelines">Rate-limit guidance</a>
        </p>

        <Callout variant="tldr" label="The commercial takeaway">
          <p>
            Use Companies House to accelerate company discovery and supply trusted registry evidence. Do not
            let a successful API response become shorthand for “the customer has passed KYC”.
          </p>
        </Callout>

        <h2 id="lookup-versus-kyc">Company lookup and KYC answer different questions</h2>

        <p>The term KYC is often used loosely in product requirements. A useful technical specification separates the checks.</p>

        <TableScroll>
          <table>
            <thead><tr><th>Onboarding question</th><th>Can Companies House help?</th><th>What else may be required?</th></tr></thead>
            <tbody>
              <tr><td>Does this legal entity appear on the UK register?</td><td>Yes</td><td>Confirm that the customer selected the correct record</td></tr>
              <tr><td>Is the company active?</td><td>Yes</td><td>Apply your acceptance policy for other statuses</td></tr>
              <tr><td>What is its registered office?</td><td>Yes</td><td>Confirm that the address is relevant to your use case</td></tr>
              <tr><td>Who are its recorded officers and PSCs?</td><td>Yes</td><td>Consider filing dates, ceased appointments and PSC statements</td></tr>
              <tr><td>Is the applicant one of those people?</td><td>Partly</td><td>Verify the applicant&apos;s identity and match it to the relevant role</td></tr>
              <tr><td>Is the applicant authorised to act for the company?</td><td>No</td><td>Use an authority check, business email, mandate or direct confirmation</td></tr>
              <tr><td>Has the individual passed your required identity checks?</td><td>Partly</td><td>Use a suitable identity verification process where required</td></tr>
              <tr><td>Is the customer or beneficial owner sanctioned?</td><td>No</td><td>Screen against the current UK Sanctions List and other required lists</td></tr>
              <tr><td>Is the relationship acceptable under your risk policy?</td><td>No</td><td>Complete risk assessment, enhanced checks and ongoing monitoring</td></tr>
            </tbody>
          </table>
        </TableScroll>

        <RichFigure
          src="/images/blog-companies-house-monitoring.png"
          alt="Company discovery, confirmation, identity protection and ongoing monitoring workflow"
          width={1672}
          height={941}
          caption="The register is one input to a wider onboarding and monitoring system—not the final decision engine."
        />

        <p>
          Companies House continues to warn users that information on the register should not automatically
          be treated as verified or validated. Its powers and checking processes have expanded, and identity
          verification is being introduced, but register data still reflects information filed with Companies
          House. <a href="https://find-and-update.company-information.service.gov.uk/">Companies House register</a>{" "}
          <a href="https://www.gov.uk/guidance/searching-the-companies-house-register">Searching the register guidance</a>
        </p>

        <p>
          For businesses covered by the UK Money Laundering Regulations, customer due diligence involves
          identifying and verifying customers, beneficial owners and people acting on their behalf. Companies
          House data can support that process. It does not complete the process.{" "}
          <a href="https://www.gov.uk/hmrc-internal-manuals/anti-money-laundering-guidance-for-supervised-businesses/amlg11300">HMRC customer due diligence guidance</a>
        </p>

        <h2 id="company-matching">Lesson one from a real data-matching project</h2>

        <p>
          In one UK data-mapping exercise, we built a small application that accepted a spreadsheet of business
          names, searched Companies House, collected the company number and SIC codes, mapped each SIC code to
          its description, retained the client&apos;s internal account reference and produced an Excel file for review.
        </p>

        <p className={styles.pullQuote}>The API responses were consistent. The matches were not.</p>

        <p>
          Some source names did not exactly match the registered legal names. Trading names, abbreviations,
          punctuation, former names and businesses with similar names created ambiguity. In one reviewed example,
          the Companies House search result selected by the script was wrong, while a broader web search surfaced
          the intended business.
        </p>

        <p>The initial assumption was:</p>
        <div className={styles.formulaFlow}>
          <span>Business name</span><i>→</i><span>First search result</span><i>→</i><span>Correct company</span>
        </div>

        <p>The safer model became:</p>
        <div className={styles.formulaFlow}>
          <span>Name + address</span><i>→</i><span>Candidates</span><i>→</i><span>Scored matches</span><i>→</i><span>Confirmation</span><i>→</i><span>Company number</span>
        </div>

        <p>
          This is the most important design decision in a Companies House onboarding flow. Search results are
          candidates. The company number is the durable identifier.
        </p>

        <RichFigure
          src="/images/blog-companies-house-company-matching.png"
          alt="Multiple company candidates being evaluated into one confirmed company record"
          width={1536}
          height={1024}
          caption="Treat every name search as candidate discovery. Use corroborating data and human confirmation to resolve the legal entity."
        />

        <h2>A practical company-matching score</h2>

        <p>
          When the customer already knows the company number, request it and use it directly. Preserve it as a
          string because leading zeroes and letter prefixes matter. When a user enters a company name, show
          candidate records and ask them to select one. For spreadsheet imports or CRM enrichment, introduce a
          confidence score and a review queue.
        </p>

        <p>This is the starting score we use when designing such systems:</p>
        <TableScroll>
          <table>
            <thead><tr><th>Signal</th><th>Suggested score</th></tr></thead>
            <tbody>
              <tr><td>Exact normalised legal name</td><td>40</td></tr>
              <tr><td>Exact registered office postcode</td><td>25</td></tr>
              <tr><td>Exact town or locality</td><td>10</td></tr>
              <tr><td>Active company status</td><td>10</td></tr>
              <tr><td>Expected SIC code</td><td>5</td></tr>
              <tr><td>Incorporation date matches known information</td><td>5</td></tr>
              <tr><td>Source name matches a previous company name</td><td>5</td></tr>
            </tbody>
          </table>
        </TableScroll>

        <p>Recommended routing:</p>
        <TableScroll>
          <table>
            <thead><tr><th>Result</th><th>Action</th></tr></thead>
            <tbody>
              <tr><td>90 to 100</td><td>Preselect the candidate and require customer confirmation</td></tr>
              <tr><td>70 to 89</td><td>Show the leading candidates with their differentiating details</td></tr>
              <tr><td>Below 70</td><td>Send the record to manual review</td></tr>
              <tr><td>Less than 15 points between the top two</td><td>Require manual review regardless of the total</td></tr>
            </tbody>
          </table>
        </TableScroll>

        <p>
          These weights are a starting model. A production system should calibrate them against reviewed matches
          from its own customer base. Name normalisation should remove superficial differences while preserving
          meaningful words. Useful transformations include case folding, repeated-space removal, punctuation
          normalisation and careful treatment of common legal suffixes such as Limited and Ltd. Aggressive fuzzy
          matching can join two different businesses, so postcode and other corroborating details should carry
          substantial weight.
        </p>

        <h2 id="safe-sync">Lesson two from a scheduled Companies House sync</h2>

        <p>
          Another UK accounting platform we supported used a scheduled Companies House synchronisation job. During
          a production incident, company names disappeared and customer records were affected. The wider application
          recovered after the Companies House job was disabled.
        </p>

        <p>
          This exposed a common integration risk: an external registry feed had become authoritative over the
          platform&apos;s operational customer record. A missing value, changed response, incorrect match or partial job
          should never erase information that the customer has already confirmed.
        </p>

        <p>We now recommend separating the data into four records:</p>
        <CodeBlock language="text" caption="Registry data model">{`customer_company
    Operational record confirmed by the customer

registry_link
    Selected company number, match method and verification state

registry_snapshot
    Raw or mapped Companies House data with retrieval time and ETag

registry_change_event
    Detected change, review status and audit history`}</CodeBlock>

        <p>
          The scheduled job updates <code>registry_snapshot</code>. Business rules decide whether a detected
          difference updates the operational record, creates a review task or sends an alert.
        </p>

        <ol>
          <li>A null API value cannot overwrite a confirmed customer value.</li>
          <li>A changed company name becomes an event with previous and current values.</li>
          <li>A failed batch can resume without repeating completed updates.</li>
          <li>Every automated decision has an audit trail.</li>
          <li>The Companies House integration can be paused without stopping the customer platform.</li>
        </ol>

        <RichFigure
          src="/images/blog-companies-house-safe-sync.png"
          alt="Companies House data flowing through snapshot storage and validation into a protected customer database"
          width={1536}
          height={1024}
          caption="Registry snapshots and explicit update rules create a safety boundary around the customer record."
        />

        <h2 id="onboarding-architecture">The four-stage onboarding architecture</h2>

        <div className={styles.architecture} aria-label="Onboarding architecture summary">
          {[
            ["01", "Discover", "Name or number to candidates"],
            ["02", "Resolve", "Confirmation and match evidence"],
            ["03", "Verify", "Company, person and authority"],
            ["04", "Monitor", "Changes, events and review"],
          ].map(([number, title, copy]) => (
            <div className={styles.architectureItem} key={number}>
              <span>{number}</span><strong>{title}</strong><p>{copy}</p>
            </div>
          ))}
        </div>

        <RichFigure
          src="/images/blog-companies-house-onboarding-architecture.png"
          alt="Four-stage company onboarding architecture from registry discovery through identity and risk verification"
          width={1536}
          height={1024}
          caption="A production onboarding flow combines registry evidence, identity and authority checks, risk policy and an auditable decision."
        />

        <h3>1. Discover</h3>
        <p>
          Accept a company name or company number. A number should lead directly to the company profile endpoint.
          A name should call the company search endpoint and return a short candidate list.
        </p>
        <p>Display enough information to distinguish similar companies:</p>
        <ul>
          <li>Legal name</li><li>Company number</li><li>Status</li>
          <li>Registered office locality and postcode</li><li>Incorporation date</li><li>Company type</li>
        </ul>
        <p>Search should be debounced and performed by your server. Keep the API key away from browser code.</p>

        <h3>2. Resolve</h3>
        <p>
          Ask the customer to confirm the correct company. Save the company number, search term, selected candidate
          and confirmation time. Automated imports should store all serious candidates and the reasons behind the
          score. A reviewer should see why candidate A scored above candidate B.
        </p>
        <p>An explainable match such as “legal name and postcode matched” is more useful than an unexplained confidence of 96 per cent.</p>

        <h3>3. Verify</h3>
        <p>Fetch the company profile, officers and PSCs after selection. Apply rules appropriate to the product and its regulatory exposure.</p>
        <p>For a basic business account, this may involve:</p>
        <ul>
          <li>Active company status</li><li>Customer confirmation of company number</li>
          <li>Business email verification</li><li>Confirmation that the applicant has authority to act</li>
        </ul>
        <p>For a regulated or higher-risk relationship, the workflow may also need:</p>
        <ul>
          <li>Identity verification for the applicant</li><li>Beneficial-owner identification and verification</li>
          <li>Sanctions and PEP screening</li><li>Nature and purpose of the relationship</li>
          <li>Source-of-funds or wealth checks where required</li><li>Enhanced due diligence based on risk</li>
        </ul>
        <p>
          The current UK Sanctions List is the UK Government&apos;s source for designated people, entities and ships.
          The former OFSI Consolidated List closed on 28 January 2026, so integrations should use the current source.{" "}
          <a href="https://www.gov.uk/government/publications/the-uk-sanctions-list">UK Sanctions List</a>
        </p>

        <h3>4. Monitor</h3>
        <p>Company status, officers, PSCs, filing events and insolvency information can change after onboarding.</p>
        <p>
          Low-volume products can refresh selected records on a schedule. Larger datasets can start from a Companies
          House snapshot and consume the Streaming API to keep a local dataset current. The API pushes real-time
          changes through a long-running connection and supports company, filing, officer, PSC, charge and insolvency
          streams. <a href="https://developer-specs.company-information.service.gov.uk/streaming-api/guides/overview">Streaming API overview</a>{" "}
          <a href="https://developer-specs.company-information.service.gov.uk/streaming-api/reference">Streaming API reference</a>
        </p>
        <p>
          Streaming consumers need durable timepoint storage, idempotent event processing and reconnection backoff.
          Companies House permits a maximum of two concurrent streaming connections per account and advises clients
          to resume from the last processed timepoint after a disconnect.{" "}
          <a href="https://developer-specs.company-information.service.gov.uk/streaming-api/guides/overview">Streaming connection guidance</a>
        </p>

        <h2 id="identity-verification">Identity verification changes in 2026</h2>

        <p>
          Companies House identity verification became a legal requirement on 18 November 2025, with a twelve-month
          transition period for existing directors and PSCs. New directors and PSCs entered the requirement from that
          date, while existing people must verify according to their applicable due dates.{" "}
          <a href="https://www.gov.uk/guidance/verify-your-identity-for-companies-house">Identity verification guidance</a>{" "}
          <a href="https://www.gov.uk/guidance/when-you-need-to-verify-your-identity-for-companies-house">When verification is required</a>
        </p>

        <p>
          Officer and PSC API resources can now contain optional <code>identity_verification_details</code>.
          Depending on the record, these details can include the verification date, the name of an Authorised
          Corporate Service Provider and appointment verification dates.{" "}
          <a href="https://developer-specs.company-information.service.gov.uk/companies-house-public-data-api/resources/officerlist?v=latest">Officer resource</a>{" "}
          <a href="https://developer-specs.company-information.service.gov.uk/companies-house-public-data-api/resources/list">PSC resource</a>
        </p>

        <Callout variant="warning" label="Handle missing verification data carefully">
          <p>
            The field is optional; the transition was still in progress when this guide was reviewed in September
            2026; and Companies House verification concerns the person&apos;s Companies House role. Your product may
            still need to verify the applicant and their authority for your own relationship.
          </p>
          <p>
            An absent field should produce “verification information unavailable” or a review state—not an accusation
            or automatic rejection.
          </p>
        </Callout>

        <h2 id="implementation">A safe server-side implementation</h2>

        <p>The following TypeScript example shows a minimal server-side client:</p>

        <CodeBlock language="typescript" caption="companies-house.ts">{`const baseUrl = "https://api.company-information.service.gov.uk";

function companiesHouseAuth() {
  const apiKey = process.env.COMPANIES_HOUSE_API_KEY;

  if (!apiKey) {
    throw new Error("Companies House API key is missing");
  }

  return \`Basic \${Buffer.from(\`\${apiKey}:\`).toString("base64")}\`;
}

async function companiesHouseGet<T>(path: string): Promise<T> {
  const response = await fetch(\`\${baseUrl}\${path}\`, {
    headers: {
      Authorization: companiesHouseAuth(),
      Accept: "application/json",
    },
    signal: AbortSignal.timeout(8000),
  });

  if (response.status === 429) {
    throw new Error("Companies House rate limit reached");
  }

  if (!response.ok) {
    throw new Error(\`Companies House returned \${response.status}\`);
  }

  return response.json() as Promise<T>;
}

export function searchCompanies(query: string) {
  const params = new URLSearchParams({ q: query, items_per_page: "10" });
  return companiesHouseGet(\`/search/companies?\${params}\`);
}

export function getCompany(companyNumber: string) {
  return companiesHouseGet(\`/company/\${encodeURIComponent(companyNumber)}\`);
}`}</CodeBlock>

        <p>A production version should add:</p>
        <ul>
          <li>Input-length and character validation</li><li>Request correlation IDs</li>
          <li>Caching for repeated searches and profiles</li><li>A queue for bulk enrichment</li>
          <li>Controlled retry with jitter</li><li>A circuit breaker when error rates rise</li>
          <li>Structured logs without unnecessary personal data</li>
          <li>Metrics for <code>429</code>, timeout, mismatch and manual-review rates</li>
        </ul>

        <p>
          At the published limit, the theoretical average is two standard API requests per second. A bulk worker
          should operate below that rate so interactive searches retain capacity. Caching candidate searches for a
          short period and company profiles for longer reduces repeated traffic.
        </p>

        <p>
          Companies House provides a sandbox running the same API versions as the live environment. Use it for
          response handling, failure paths and test data before connecting production workflows. Some services have
          sandbox limitations, so test critical reads against controlled live records as well.{" "}
          <a href="https://developer.company-information.service.gov.uk/api-testing">API testing guidance</a>
        </p>

        <h2>Update rules that protect customer data</h2>

        <p>Each mapped field should have an explicit update policy.</p>

        <TableScroll>
          <table>
            <thead><tr><th>Incoming change</th><th>Recommended behaviour</th></tr></thead>
            <tbody>
              <tr><td>Company status changes</td><td>Save snapshot, create risk event and evaluate policy</td></tr>
              <tr><td>Registered name changes</td><td>Save as registry name, retain customer display name and request review</td></tr>
              <tr><td>API field becomes null</td><td>Retain confirmed value and log the missing source value</td></tr>
              <tr><td>Registered office changes</td><td>Save change and request confirmation when operationally relevant</td></tr>
              <tr><td>Officer or PSC changes</td><td>Create a review event for regulated or higher-risk products</td></tr>
              <tr><td>Company is dissolved or enters insolvency</td><td>Restrict relevant actions according to product policy and review</td></tr>
              <tr><td>API is temporarily unavailable</td><td>Preserve the last successful snapshot and mark it stale</td></tr>
              <tr><td>Search produces a different top result</td><td>Keep the confirmed company number and ignore ranking changes</td></tr>
            </tbody>
          </table>
        </TableScroll>

        <p>The confirmed company number anchors the relationship. Future name searches should never silently relink the customer to another company.</p>

        <h2 id="privacy">Privacy and retention</h2>

        <p>
          Public availability does not remove UK GDPR responsibilities when officer or PSC information is stored
          and used in your own system. The ICO&apos;s data-minimisation principle requires organisations to identify the
          minimum personal data needed for a defined purpose. Storage limitation requires a retention period connected
          to that purpose. <a href="https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/data-protection-principles/a-guide-to-the-data-protection-principles/data-minimisation/">ICO data-minimisation guidance</a>{" "}
          <a href="https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/data-protection-principles/a-guide-to-the-data-protection-principles/storage-limitation/">ICO storage-limitation guidance</a>
        </p>

        <p>Practical controls include:</p>
        <ul>
          <li>Store the company number and decision evidence required for the relationship.</li>
          <li>Avoid copying every officer and PSC field into the customer database.</li>
          <li>Record the source URL or endpoint, retrieval time and decision outcome.</li>
          <li>Set retention rules for rejected applicants and expired checks.</li>
          <li>Restrict access to identity and due-diligence records.</li>
          <li>Explain registry checks in the privacy notice.</li>
          <li>Keep an audit trail showing automated and human decisions.</li>
        </ul>

        <h2>Implementation checklist</h2>
        <p>Before releasing a Companies House onboarding flow, confirm that:</p>

        <div className={styles.checklist}>
          {CHECKLIST.map((item) => (
            <div className={styles.checkItem} key={item}>
              <span className={styles.checkMark} aria-hidden="true">✓</span>
              <p>{item}</p>
            </div>
          ))}
        </div>

        <Faq items={FAQS} />

        <section className={styles.recommendation}>
          <h2>Final recommendation</h2>
          <p>Use Companies House as the official registry source within a wider onboarding system.</p>
          <div className={styles.formulaFlow}>
            <span>Search</span><i>→</i><span>Resolve</span><i>→</i><span>Confirm company number</span><i>→</i><span>Verify person + authority</span><i>→</i><span>Assess risk</span><i>→</i><span>Monitor</span>
          </div>
          <p>
            Our project experience shows that the largest risks sit around the API. Business names are ambiguous.
            Search ranking can select the wrong legal entity. Scheduled syncs can damage operational records when
            external data is allowed to overwrite customer-confirmed information.
          </p>
          <p>
            A strong implementation therefore treats company search as discovery, the company number as the registry
            key, identity and authority as separate checks, and every external update as an auditable event. That
            architecture creates a faster onboarding experience while protecting the accuracy of the customer record.
          </p>
        </section>

        <p className={styles.disclaimer}>
          This article provides technical and operational guidance. Businesses with legal or regulatory obligations
          should have their onboarding and due-diligence policy reviewed by an appropriate UK compliance professional.
        </p>

        <RelatedGrid>
          <RelatedCard tag="Service" title="API & Integration" body="Design and build a safe Companies House integration around your real onboarding process." href="/services/api-and-integration/" />
          <RelatedCard tag="Service" title="SaaS Web App Development" body="Build a customer-facing product with onboarding, verification and operations designed together." href="/services/saas-web-app-development/" />
          <RelatedCard tag="Service" title="Maintenance & Support" body="Own the scheduled jobs, monitoring and review paths after the integration goes live." href="/services/maintenance-support/" />
        </RelatedGrid>

        <AuthorByline lastReviewedISO={MODIFIED_ISO}>
          Ritesh leads engineering at Appycodes. This guide draws on UK accounting, company-data and CRM work where
          the difficult part was not calling the Companies House API, but resolving ambiguous businesses and keeping
          external registry data from damaging customer-confirmed records.
        </AuthorByline>
      </PostBody>

      <CtaBand />
    </>
  );
}
