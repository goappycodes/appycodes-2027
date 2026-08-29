"use client";

import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { ArrowUpRight } from "@/components/icons";
import styles from "./indexing-report.module.css";

/**
 * Password-gated dashboard that decrypts and displays the latest run of
 * scripts/indexing-report.mjs. The encrypted JSON ships at
 * /admin/indexing-data.enc.json (committed to the repo, served publicly
 * but useless without the password).
 *
 * Security model:
 *   - The page is noindex — never appears in search.
 *   - The payload is AES-256-GCM with a PBKDF2-SHA256 password-derived key.
 *     The password is the only secret; without it the JSON is random bytes.
 *   - Brute-force resistance comes from the slow KDF.
 *   - sessionStorage holds the DECRYPTED payload after unlock, so a refresh
 *     within the tab does not re-prompt. Closing the tab clears it.
 *
 * The crypto parameters, ENC_PATH and SESSION_KEY are reproduced EXACTLY
 * from the previous Vite build so the existing encrypted data file and its
 * build script stay compatible.
 */

const ENC_PATH = "/admin/indexing-data.enc.json";
// Bump this when the report JSON shape changes. v2 added clicks /
// impressions / position / topQueries — anyone with a v1 cached payload
// in sessionStorage would see zeros in the new columns otherwise.
const SESSION_KEY = "indexingReport.unlockedPayload.v2";

interface EncEnvelope {
  version: number;
  algo: string; // "AES-GCM-256"
  kdf: string; // "PBKDF2-SHA256"
  iterations: number;
  salt: string; // base64
  iv: string; // base64
  payload: string; // base64 — ciphertext || authTag
  encryptedAt: string; // ISO
}

interface TopQuery {
  query: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

interface ReportRow {
  route: string;
  url: string;
  inSitemap: boolean;
  verdict: string | null;
  coverageState: string | null;
  indexingState: string | null;
  lastCrawlTime: string | null;
  googleCanonical: string | null;
  userCanonical: string | null;
  pageFetchState: string | null;
  robotsTxtState: string | null;
  error: string | null;
  clicks?: number;
  impressions?: number;
  position?: number | null;
  topQueries?: TopQuery[];
}

interface Report {
  site: string;
  generatedAt: string;
  analyticsWindow?: { startDate: string; endDate: string } | null;
  summary: {
    totalRoutes: number;
    indexable: number;
    indexed: number;
    notIndexed: number;
    noindex: number;
    errors: number;
    totalClicks?: number;
    totalImpressions?: number;
  };
  rows: ReportRow[];
}

function base64ToBytes(b64: string): Uint8Array<ArrayBuffer> {
  const bin = atob(b64);
  const buf = new ArrayBuffer(bin.length);
  const out = new Uint8Array(buf);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

async function decryptReport(
  envelope: EncEnvelope,
  password: string
): Promise<Report> {
  const enc = new TextEncoder();
  const salt = base64ToBytes(envelope.salt);
  const iv = base64ToBytes(envelope.iv);
  const ciphertext = base64ToBytes(envelope.payload);

  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    enc.encode(password),
    "PBKDF2",
    false,
    ["deriveKey"]
  );

  const key = await crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt,
      iterations: envelope.iterations,
      hash: "SHA-256",
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    false,
    ["decrypt"]
  );

  const decrypted = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv },
    key,
    ciphertext
  );

  const plaintext = new TextDecoder().decode(decrypted);
  return JSON.parse(plaintext) as Report;
}

// sessionStorage, wrapped so SSR / privacy modes / disabled storage never
// throw. Reads return null, writes/removes are best-effort.
function sessionGet(key: string): string | null {
  try {
    return sessionStorage.getItem(key);
  } catch {
    return null;
  }
}
function sessionSet(key: string, value: string): void {
  try {
    sessionStorage.setItem(key, value);
  } catch {
    /* ignore — storage may be unavailable */
  }
}
function sessionRemove(key: string): void {
  try {
    sessionStorage.removeItem(key);
  } catch {
    /* ignore */
  }
}

export function IndexingReport() {
  const [stage, setStage] = useState<
    "loading" | "locked" | "unlocking" | "unlocked" | "missing"
  >("loading");
  const [report, setReport] = useState<Report | null>(null);
  const [envelope, setEnvelope] = useState<EncEnvelope | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [password, setPassword] = useState("");

  // On mount: if we already have a decrypted payload in sessionStorage,
  // show it. Otherwise fetch the encrypted envelope and wait for the
  // password. If the file is not published yet (404 / non-OK), fall into
  // the graceful "missing" state rather than crashing.
  useEffect(() => {
    const cached = sessionGet(SESSION_KEY);
    if (cached) {
      try {
        setReport(JSON.parse(cached) as Report);
        setStage("unlocked");
        return;
      } catch {
        sessionRemove(SESSION_KEY);
      }
    }

    let cancelled = false;
    fetch(ENC_PATH, { cache: "no-store" })
      .then((res) => {
        if (res.status === 404) {
          if (!cancelled) setStage("missing");
          return null;
        }
        if (!res.ok) {
          throw new Error(`HTTP ${res.status} fetching ${ENC_PATH}`);
        }
        return res.json();
      })
      .then((env: EncEnvelope | null) => {
        if (cancelled || !env) return;
        setEnvelope(env);
        setStage("locked");
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : String(err));
        setStage("missing");
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const handleUnlock = async (e: FormEvent) => {
    e.preventDefault();
    setStage("unlocking");
    setError(null);
    try {
      if (!envelope) throw new Error("No encrypted payload loaded.");
      const decoded = await decryptReport(envelope, password);
      setReport(decoded);
      sessionSet(SESSION_KEY, JSON.stringify(decoded));
      setStage("unlocked");
      setPassword("");
    } catch {
      setError("Wrong password, or the payload is corrupted.");
      setStage("locked");
    }
  };

  const handleSignOut = () => {
    sessionRemove(SESSION_KEY);
    setReport(null);
    setStage("locked");
  };

  return (
    <section className={`wrap ${styles.section}`}>
      {stage === "loading" && <LoadingCard />}
      {stage === "missing" && <MissingCard error={error} />}
      {(stage === "locked" || stage === "unlocking") && (
        <UnlockCard
          password={password}
          setPassword={setPassword}
          onSubmit={handleUnlock}
          busy={stage === "unlocking"}
          error={error}
        />
      )}
      {stage === "unlocked" && report && (
        <ReportView report={report} onSignOut={handleSignOut} />
      )}
    </section>
  );
}

/* ---------------------------------------------------------------------------
   Small inline icons — the site's icon set has no lock / refresh / alert, so
   these are drawn locally in the same stroke style. No new dependency.
--------------------------------------------------------------------------- */

const iconBase = {
  viewBox: "0 0 24 24",
  fill: "none" as const,
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const LockIcon = ({ className }: { className?: string }) => (
  <svg className={className} {...iconBase}>
    <rect x="4.5" y="10.5" width="15" height="10" rx="1.5" />
    <path d="M8 10.5V7a4 4 0 0 1 8 0v3.5" />
  </svg>
);

const RefreshIcon = ({ className }: { className?: string }) => (
  <svg className={className} {...iconBase}>
    <path d="M4 12a8 8 0 0 1 13.66-5.66L20 8" />
    <path d="M20 4v4h-4" />
    <path d="M20 12a8 8 0 0 1-13.66 5.66L4 16" />
    <path d="M4 20v-4h4" />
  </svg>
);

const AlertIcon = ({ className }: { className?: string }) => (
  <svg className={className} {...iconBase}>
    <path d="M12 3 2.5 20h19L12 3Z" />
    <path d="M12 10v4" />
    <path d="M12 17.5v.01" />
  </svg>
);

// ---------------------------------------------------------------------------
// Sub-views
// ---------------------------------------------------------------------------

const LoadingCard = () => (
  <div className={styles.card}>
    <p className={styles.loading}>Fetching encrypted payload…</p>
  </div>
);

const MissingCard = ({ error }: { error: string | null }) => (
  <div className={`${styles.card} ${styles.missing}`}>
    <div className={styles.missingRow}>
      <AlertIcon className={styles.missingIcon} />
      <div>
        <p className={styles.missingKicker}>No indexing data has been published yet</p>
        <p className={styles.missingBody}>
          The encrypted payload at{" "}
          <code className={styles.code}>/admin/indexing-data.enc.json</code> is not in
          this deployment yet. Generate and publish one with:
        </p>
        <pre className={styles.pre}>npm run report:indexing</pre>
        {error && <p className={styles.fetchErr}>Fetch note: {error}</p>}
      </div>
    </div>
  </div>
);

const UnlockCard = ({
  password,
  setPassword,
  onSubmit,
  busy,
  error,
}: {
  password: string;
  setPassword: (v: string) => void;
  onSubmit: (e: FormEvent) => void;
  busy: boolean;
  error: string | null;
}) => (
  <div className={`${styles.card} ${styles.unlock}`}>
    <div className={styles.unlockHead}>
      <LockIcon className={styles.unlockIcon} />
      <p className={styles.unlockKicker}>Password required</p>
    </div>
    <form onSubmit={onSubmit} className={styles.form}>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoFocus
        autoComplete="current-password"
        placeholder="Enter password"
        className={styles.input}
      />
      <button
        type="submit"
        disabled={busy || !password}
        className={`btn btn--grad notch ${styles.submit}`}
      >
        {busy ? "Decrypting…" : "Unlock"}
      </button>
      {error && <p className={styles.errorText}>{error}</p>}
    </form>
    <p className={styles.cryptoNote}>
      AES-256-GCM · PBKDF2-SHA256 · decrypted locally in your browser — the
      server never sees the password.
    </p>
  </div>
);

const ReportView = ({
  report,
  onSignOut,
}: {
  report: Report;
  onSignOut: () => void;
}) => {
  const indexed = report.rows.filter((r) => r.inSitemap && r.verdict === "PASS");
  const notIndexed = report.rows.filter(
    (r) => r.inSitemap && r.verdict !== "PASS" && !r.error
  );
  const noindex = report.rows.filter((r) => !r.inSitemap);
  const errors = report.rows.filter((r) => r.error);

  const indexedPct = report.summary.indexable
    ? Math.round((report.summary.indexed / report.summary.indexable) * 100)
    : 0;

  return (
    <div className={styles.report}>
      {/* Header / summary */}
      <div className={styles.card}>
        <div className={styles.summaryHead}>
          <div>
            <p className={styles.siteLabel}>{report.site}</p>
            <p className={styles.snapshot}>Snapshot from {report.generatedAt}</p>
          </div>
          <div className={styles.actions}>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className={styles.actionBtn}
            >
              <RefreshIcon /> Refresh
            </button>
            <button type="button" onClick={onSignOut} className={styles.actionBtn}>
              <LockIcon /> Lock
            </button>
          </div>
        </div>

        <div className={styles.statGrid}>
          <StatTile
            label="Indexed"
            value={`${report.summary.indexed} / ${report.summary.indexable}`}
            sub={`${indexedPct}%`}
            tone="primary"
          />
          <StatTile
            label="Not yet indexed"
            value={String(report.summary.notIndexed)}
            tone={report.summary.notIndexed > 0 ? "warn" : "muted"}
          />
          <StatTile label="Excluded (noindex)" value={String(report.summary.noindex)} />
          <StatTile
            label="API errors"
            value={String(report.summary.errors)}
            tone={report.summary.errors > 0 ? "destructive" : "muted"}
          />
          <StatTile
            label="Clicks (28d)"
            value={fmtNum(report.summary.totalClicks ?? 0)}
            sub={
              report.analyticsWindow
                ? `${report.analyticsWindow.startDate} → ${report.analyticsWindow.endDate}`
                : undefined
            }
            tone="primary"
          />
          <StatTile
            label="Impressions (28d)"
            value={fmtNum(report.summary.totalImpressions ?? 0)}
          />
        </div>
      </div>

      {/* Indexed */}
      <Section
        title={`Indexed · ${indexed.length}`}
        tone="ok"
        empty={indexed.length === 0 ? "None yet." : undefined}
      >
        {indexed.length > 0 && <ReportTable rows={indexed} kind="ok" />}
      </Section>

      {/* Not indexed */}
      <Section
        title={`Not yet indexed · ${notIndexed.length}`}
        tone="warn"
        empty={
          notIndexed.length === 0
            ? "All indexable URLs are in the index. Nice."
            : undefined
        }
        subtitle={
          notIndexed.length > 0
            ? "Open Search Console → URL Inspection for each → Request Indexing."
            : undefined
        }
      >
        {notIndexed.length > 0 && <ReportTable rows={notIndexed} kind="warn" />}
      </Section>

      {/* Errors */}
      {errors.length > 0 && (
        <Section title={`API errors · ${errors.length}`} tone="destructive">
          <ReportTable rows={errors} kind="error" />
        </Section>
      )}

      {/* Excluded — shown in the same table format. Clicks/impressions on
          these are "leakage" from Google's older crawl of the page. */}
      <Section
        title={`Intentionally excluded · ${noindex.length}`}
        tone="muted"
        subtitle="These routes ship with noindex,follow and are kept out of sitemap.xml. Any clicks/impressions show what Google is still surfacing from older indexed copies."
        empty={noindex.length === 0 ? "None." : undefined}
      >
        {noindex.length > 0 && <ReportTable rows={noindex} kind="noindex" />}
      </Section>
    </div>
  );
};

const StatTile = ({
  label,
  value,
  sub,
  tone = "default",
}: {
  label: string;
  value: string;
  sub?: string;
  tone?: "default" | "primary" | "warn" | "destructive" | "muted";
}) => {
  const valueClass =
    tone === "primary"
      ? styles.tonePrimary
      : tone === "warn"
      ? styles.toneWarn
      : tone === "destructive"
      ? styles.toneErr
      : tone === "muted"
      ? styles.toneMuted
      : "";
  return (
    <div className={styles.stat}>
      <p className={styles.statLabel}>{label}</p>
      <p className={`${styles.statValue} ${valueClass}`}>{value}</p>
      {sub && <p className={styles.statSub}>{sub}</p>}
    </div>
  );
};

const Section = ({
  title,
  tone,
  subtitle,
  empty,
  children,
}: {
  title: string;
  tone: "ok" | "warn" | "destructive" | "muted";
  subtitle?: string;
  empty?: string;
  children?: ReactNode;
}) => {
  const toneClass =
    tone === "ok"
      ? styles.tonePrimary
      : tone === "warn"
      ? styles.toneWarn
      : tone === "destructive"
      ? styles.toneErr
      : styles.toneMuted;
  return (
    <div>
      <p className={`${styles.sectionTitle} ${toneClass}`}>{title}</p>
      {subtitle && <p className={styles.sectionSub}>{subtitle}</p>}
      {empty ? <p className={styles.empty}>{empty}</p> : children}
    </div>
  );
};

const fmtNum = (n: number): string => {
  if (n >= 1000) return n.toLocaleString();
  return String(n);
};

const fmtPos = (p: number | null | undefined): string =>
  p == null ? "—" : p.toFixed(1);

const TopQueryCell = ({ queries }: { queries?: TopQuery[] }) => {
  if (!queries || queries.length === 0) {
    return <span className={styles.tdMuted}>—</span>;
  }
  const top = queries[0];
  const more = queries.length - 1;
  return (
    <div
      className={styles.topQuery}
      title={queries
        .map(
          (q) =>
            `${q.query} — ${q.clicks} clk / ${q.impressions} imp / pos ${q.position.toFixed(1)}`
        )
        .join("\n")}
    >
      <span>{top.query}</span>
      {more > 0 && <span className={styles.topQueryMore}> +{more}</span>}
    </div>
  );
};

const ReportTable = ({
  rows,
  kind,
}: {
  rows: ReportRow[];
  kind: "ok" | "warn" | "error" | "noindex";
}) => {
  const showCoverage = kind === "ok" || kind === "warn";
  const showVerdict = kind === "warn";
  const showAnalytics = kind !== "error";
  const showLastCrawl = kind === "ok" || kind === "warn";
  const showError = kind === "error";

  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            <Th>URL</Th>
            {showAnalytics && <Th align="right">Clicks</Th>}
            {showAnalytics && <Th align="right">Impr.</Th>}
            {showAnalytics && (
              <Th align="right" hideOnMobile>
                Pos.
              </Th>
            )}
            {showAnalytics && <Th hideOnMobile>Top query</Th>}
            {showCoverage && <Th hideOnMobile>Coverage</Th>}
            {showVerdict && <Th hideOnMobile>Verdict</Th>}
            {showLastCrawl && <Th hideOnMobile>Last crawled</Th>}
            {showError && <Th>Error</Th>}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.route}>
              <td className={styles.td}>
                <a
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.routeLink}
                >
                  {r.route}
                  <ArrowUpRight />
                </a>
              </td>
              {showAnalytics && (
                <td className={`${styles.td} ${styles.tdNum}`}>{fmtNum(r.clicks ?? 0)}</td>
              )}
              {showAnalytics && (
                <td className={`${styles.td} ${styles.tdNum}`}>
                  {fmtNum(r.impressions ?? 0)}
                </td>
              )}
              {showAnalytics && (
                <td className={`${styles.td} ${styles.tdNum} ${styles.tdMuted} ${styles.hideMobile}`}>
                  {fmtPos(r.position)}
                </td>
              )}
              {showAnalytics && (
                <td className={`${styles.td} ${styles.hideMobile}`}>
                  <TopQueryCell queries={r.topQueries} />
                </td>
              )}
              {showCoverage && (
                <td className={`${styles.td} ${styles.hideMobile}`}>
                  {r.coverageState ?? "—"}
                </td>
              )}
              {showVerdict && (
                <td className={`${styles.td} ${styles.hideMobile}`}>
                  <span className={styles.verdict}>{r.verdict ?? "—"}</span>
                </td>
              )}
              {showLastCrawl && (
                <td className={`${styles.td} ${styles.crawl} ${styles.hideMobile}`}>
                  {r.lastCrawlTime ? r.lastCrawlTime.slice(0, 10) : "—"}
                </td>
              )}
              {showError && <td className={`${styles.td} ${styles.errCell}`}>{r.error}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Th = ({
  children,
  align = "left",
  hideOnMobile = false,
}: {
  children: ReactNode;
  align?: "left" | "right";
  hideOnMobile?: boolean;
}) => (
  <th
    className={[
      styles.th,
      align === "right" ? styles.thRight : "",
      hideOnMobile ? styles.hideMobile : "",
    ]
      .filter(Boolean)
      .join(" ")}
  >
    {children}
  </th>
);
