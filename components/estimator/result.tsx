"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "@/components/icons";
import {
  Answers,
  Estimate,
  formatCurrency,
  computeEstimate,
} from "@/lib/estimator";
import { CurrencyCode, CURRENCIES } from "@/lib/estimator-config";
import styles from "./estimator.module.css";

interface ResultProps {
  answers: Answers;
  currency: CurrencyCode;
  onCurrencyChange: (c: CurrencyCode) => void;
  onRestart: () => void;
}

// ---------------------------------------------------------------------------
// SMALL INLINE GLYPHS (stroke style matches @/components/icons)
// ---------------------------------------------------------------------------

const glyphBase = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const EffortGlyph = () => (
  <svg {...glyphBase}>
    <rect x="3" y="7" width="18" height="12" rx="2" />
    <path d="M3 11h18M16 15h2" />
  </svg>
);
const TimelineGlyph = () => (
  <svg {...glyphBase}>
    <rect x="3.5" y="5" width="17" height="15" rx="2" />
    <path d="M3.5 9h17M8 3v4M16 3v4" />
  </svg>
);
const CostGlyph = () => (
  <svg {...glyphBase}>
    <circle cx="12" cy="12" r="9" />
    <path d="M14.5 9.2a2.6 2.6 0 0 0-2.5-1.7c-1.5 0-2.4.9-2.4 2 0 2.6 5 1.5 5 4.1 0 1.2-1 2.1-2.6 2.1a2.7 2.7 0 0 1-2.6-1.8M12 6.2v1.3M12 16.5v1.3" />
  </svg>
);

// ---------------------------------------------------------------------------
// MAIN RESULT
// ---------------------------------------------------------------------------

export default function Result({ answers, currency, onCurrencyChange, onRestart }: ResultProps) {
  const estimate = computeEstimate(answers, currency);
  const platformPills = answers.platforms.map((p) =>
    p === "ios" ? "iOS" : p === "android" ? "Android" : "Web",
  );
  const allPlatformsLabel = platformPills.join(" · ") || "Web";

  const maxRole = Math.max(...estimate.breakdown.map((r) => r.months), 0.01);

  // Phase distribution — same rough percentages as the old chart.
  const months = estimate.calendarMonths;
  const phases = [
    { phase: "Discovery", start: 0, length: months * 0.08 },
    { phase: "Design", start: months * 0.08, length: months * 0.15 },
    { phase: "Build", start: months * 0.23, length: months * 0.55 },
    { phase: "QA", start: months * 0.78, length: months * 0.12 },
    { phase: "Launch", start: months * 0.9, length: months * 0.1 },
  ];

  return (
    <div className={styles.result}>
      {/* Header + currency selector */}
      <div className={styles.summaryHead}>
        <p className={styles.kicker}>your project estimate</p>
        <p className={styles.summaryLine}>{estimate.summarySentence}</p>
        <div className={styles.metaRow}>
          <span className={styles.metaLabel}>platforms in scope:</span>
          {platformPills.length > 0 ? (
            platformPills.map((p) => (
              <span key={p} className={styles.pill}>
                {p}
              </span>
            ))
          ) : (
            <span className={styles.pill}>Web</span>
          )}
          <span className={styles.currencyBox}>
            <span className={styles.metaLabel}>currency</span>
            <select
              aria-label="Display currency"
              value={currency}
              onChange={(e) => onCurrencyChange(e.target.value as CurrencyCode)}
              className={styles.select}
            >
              {CURRENCIES.supported.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </span>
        </div>
      </div>

      {/* Three headline cards */}
      <div className={styles.cards}>
        <SummaryCard
          icon={<EffortGlyph />}
          label="Effort"
          value={`${estimate.totalMD} man-months`}
          subtext={`Across a team of ~${estimate.teamSize}`}
        />
        <SummaryCard
          icon={<TimelineGlyph />}
          label="Timeline"
          value={`${estimate.calendarMonths} months`}
          subtext={`${allPlatformsLabel} build`}
        />
        <SummaryCard
          icon={<CostGlyph />}
          label="Cost range"
          value={`${formatCurrency(estimate.costDisplay.min, currency)} – ${formatCurrency(estimate.costDisplay.max, currency)}`}
          subtext="±20%, before scoping call"
        />
      </div>

      {/* Team & man-months */}
      <Section title="team & man-months">
        <div className={styles.bars}>
          {estimate.breakdown.map((r) => (
            <div key={r.role} className={styles.barRow}>
              <span className={styles.barLabel}>{r.label}</span>
              <span className={styles.barTrack}>
                <span
                  className={styles.barFill}
                  style={{ width: `${(r.months / maxRole) * 100}%` }}
                />
              </span>
              <span className={styles.barVal}>{r.months} mm</span>
            </div>
          ))}
        </div>
      </Section>

      {/* Timeline */}
      <Section title="timeline">
        <div className={styles.gantt}>
          {phases.map((p) => (
            <div key={p.phase} className={styles.ganttRow}>
              <span className={styles.ganttLabel}>{p.phase}</span>
              <span className={styles.ganttTrack}>
                <span
                  className={styles.ganttSpan}
                  style={{
                    left: `${months ? (p.start / months) * 100 : 0}%`,
                    width: `${months ? (p.length / months) * 100 : 0}%`,
                  }}
                />
              </span>
            </div>
          ))}
          <div className={styles.ganttAxis}>
            <span>0</span>
            <span>{months.toFixed(1)} months</span>
          </div>
        </div>
        <p className={styles.sectionNote}>
          Total calendar: {estimate.calendarMonths} months. Streams run in parallel where possible
          — design starts before build ends, QA overlaps with build, hardening continues into launch.
        </p>
      </Section>

      {/* Recommended stack */}
      <Section title="recommended tech stack">
        <div className={styles.stackCard}>
          <p className={styles.kicker}>primary recommendation</p>
          <div className={styles.stackList}>
            {Object.entries(estimate.stack.primary)
              .filter(([k]) => k !== "why")
              .map(([k, v]) => (
                <div key={k} className={styles.stackItem}>
                  <span className={styles.stackKey}>{k}</span>
                  <span className={styles.stackVal}>{v}</span>
                </div>
              ))}
          </div>
          <p className={styles.stackWhy}>{estimate.stack.primary.why}</p>
        </div>
        {estimate.stack.alternatives && estimate.stack.alternatives.length > 0 ? (
          <div className={styles.alts}>
            {estimate.stack.alternatives.map((alt, i) => (
              <div key={i} className={styles.altCard}>
                <p className={`${styles.kicker} ${styles.kickerMuted}`}>alternative</p>
                <div className={styles.stackList}>
                  {Object.entries(alt)
                    .filter(([k]) => k !== "why")
                    .map(([k, v]) => (
                      <div key={k} className={styles.stackItem}>
                        <span className={styles.stackKey}>{k}</span>
                        <span className={styles.stackVal}>{v}</span>
                      </div>
                    ))}
                </div>
                <p className={styles.stackWhy}>{alt.why}</p>
              </div>
            ))}
          </div>
        ) : null}
      </Section>

      {/* External services */}
      {estimate.externals.length > 0 ? (
        <Section title="external services & monthly run costs">
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>service</th>
                  <th>monthly cost ({currency})</th>
                </tr>
              </thead>
              <tbody>
                {estimate.externals.map((e) => (
                  <tr key={e.key}>
                    <td>{e.label}</td>
                    <td>{e.cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={styles.sectionNote}>
            Run costs grow with users — payments, AI API usage, email volume, and database load all
            scale.
          </p>
        </Section>
      ) : null}

      {/* Hosting */}
      <Section title="hosting tiers">
        <div className={styles.hostGrid}>
          {estimate.hosting.map((h) => (
            <div key={h.key} className={styles.hostCard}>
              <p className={styles.hostLabel}>{h.label}</p>
              <p className={styles.hostCost}>{h.cost}</p>
              <p className={styles.hostSub}>per month, {currency}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Cost range explainer */}
      <Section title="development cost range">
        <div className={styles.costCard}>
          <div className={styles.costLine}>
            <span className={`${styles.costNum} g-disp`}>
              {formatCurrency(estimate.costDisplay.min, currency)}
            </span>
            <span className={styles.costTo}>to</span>
            <span className={`${styles.costNum} g-disp`}>
              {formatCurrency(estimate.costDisplay.max, currency)}
            </span>
            <span className={styles.costPct}>±20%</span>
          </div>
          <p className={styles.costNote}>{estimate.rangeExplainer}</p>
        </div>
      </Section>

      {/* What's included / not included */}
      <Section title="what's included / not included">
        <div className={styles.scopeGrid}>
          <div className={styles.scopeCard}>
            <p className={styles.kicker}>included</p>
            <ul className={styles.scopeList}>
              <li>Product design and UX</li>
              <li>Engineering (frontend, backend, mobile if selected)</li>
              <li>QA and pre-launch testing</li>
              <li>Project management and weekly demos</li>
              <li>DevOps, CI/CD, deploy to production</li>
              <li>30-day post-launch stability watch</li>
            </ul>
          </div>
          <div className={styles.scopeCard}>
            <p className={`${styles.kicker} ${styles.kickerMuted}`}>not included</p>
            <ul className={`${styles.scopeList} ${styles.scopeListOut}`}>
              <li>Content writing and copywriting</li>
              <li>Legal review (terms, privacy, contracts)</li>
              <li>Marketing and paid acquisition</li>
              <li>Long-term post-launch retainer</li>
              <li>Third-party SaaS subscriptions (Stripe fees, AI API usage)</li>
            </ul>
            <p className={styles.scopeNote}>We can scope these separately if you need them.</p>
          </div>
        </div>
      </Section>

      {/* Next step — the new site funnels every enquiry through /contact/ */}
      <div className={styles.cta}>
        <div className={styles.ctaCopy}>
          <p className={styles.ctaKicker}>get a firmed-up quote</p>
          <h3 className={styles.ctaTitle}>turn this into a fixed number.</h3>
          <p className={styles.ctaBody}>
            Send us what you&apos;ve told the calculator and we&apos;ll reply with a firmed-up quote
            within one business day — or book a 30-minute scoping call with the engineer who would
            run the build.
          </p>
        </div>
        <div className={styles.ctaBtns}>
          <Link href="/contact/" className="btn btn--grad notch">
            book a scoping call
            <ArrowRight />
          </Link>
        </div>
      </div>

      {/* Footer actions */}
      <div className={styles.footActions}>
        <button type="button" onClick={onRestart} className={styles.restart}>
          start over
        </button>
        <span aria-hidden>·</span>
        <Link href="/contact/" style={{ color: "inherit", textDecoration: "underline", textUnderlineOffset: "4px" }}>
          or talk to an engineer
        </Link>
      </div>
    </div>
  );
}

function SummaryCard({
  icon,
  label,
  value,
  subtext,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  subtext: string;
}) {
  return (
    <div className={styles.card}>
      <div className={styles.cardHead}>
        {icon}
        <span className={styles.cardLabel}>{label}</span>
      </div>
      <p className={styles.cardValue}>{value}</p>
      <p className={styles.cardSub}>{subtext}</p>
    </div>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className={styles.section}>
      <h3 className={styles.sectionTitle}>{title}</h3>
      {children}
    </section>
  );
}
