"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Check } from "@/components/icons";
import {
  Answers,
  EMPTY_ANSWERS,
  Platform,
  saveDraft,
  loadDraft,
  MobileApproach,
  StageChoice,
} from "@/lib/estimator";
import {
  ARCHETYPES,
  ArchetypeKey,
  FEATURES,
  FeatureKey,
  DesignChoice,
  ScaleChoice,
  LaunchChoice,
  CurrencyCode,
} from "@/lib/estimator-config";
import styles from "./estimator.module.css";

interface WizardProps {
  initial?: { answers: Answers; step: number };
  currency: CurrencyCode;
  onComplete: (a: Answers) => void;
}

type StepKey =
  | "type"
  | "platforms"
  | "stage"
  | "launch"
  | "design"
  | "modules"
  | "capabilities"
  | "scale"
  | "mobile_approach";

export default function Wizard({ initial, currency, onComplete }: WizardProps) {
  const [answers, setAnswers] = useState<Answers>(initial?.answers ?? EMPTY_ANSWERS);
  const [step, setStep] = useState<number>(initial?.step ?? 0);

  // Build dynamic step list — the mobile-approach step only appears when a
  // mobile platform is selected.
  const steps = useMemo<StepKey[]>(() => {
    const base: StepKey[] = [
      "type",
      "platforms",
      "stage",
      "launch",
      "design",
      "modules",
      "capabilities",
      "scale",
    ];
    const hasMobile = answers.platforms.some((p) => p === "ios" || p === "android");
    if (hasMobile) base.push("mobile_approach");
    return base;
  }, [answers.platforms]);

  const totalSteps = steps.length;
  const boundedStep = Math.min(step, totalSteps - 1);
  const current = steps[boundedStep] ?? "type";

  // Autosave on every change
  useEffect(() => {
    saveDraft({ answers, step: boundedStep, currency });
  }, [answers, boundedStep, currency]);

  const update = (patch: Partial<Answers>) => setAnswers((a) => ({ ...a, ...patch }));

  const next = () => {
    if (boundedStep < totalSteps - 1) setStep(boundedStep + 1);
    else onComplete(answers);
  };
  const back = () => setStep(Math.max(0, boundedStep - 1));

  const canAdvance = (() => {
    switch (current) {
      case "type": return !!answers.archetype;
      case "platforms": return answers.platforms.length > 0;
      case "stage": return !!answers.stage;
      case "launch": return !!answers.launch;
      case "design": return !!answers.design;
      case "modules": return true; // no minimum
      case "capabilities": return true;
      case "scale": return !!answers.scale;
      case "mobile_approach": return !!answers.mobile_approach;
      default: return false;
    }
  })();

  return (
    <div className={`${styles.panel} ${styles.pad}`}>
      {/* Progress */}
      <div className={styles.progress}>
        <div className={styles.progressHead}>
          <span className={styles.stepLabel}>
            step {boundedStep + 1} of {totalSteps}
          </span>
          {boundedStep > 0 ? (
            <button type="button" onClick={back} className={styles.back}>
              <svg viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M19 12H5M11 18l-6-6 6-6"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              back
            </button>
          ) : null}
        </div>
        <div className={styles.track}>
          <div
            className={styles.fill}
            style={{ width: `${((boundedStep + 1) / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Step body */}
      <div className={styles.stepBody}>
        {current === "type" && (
          <Single
            title="what type of product?"
            value={answers.archetype}
            options={Object.entries(ARCHETYPES).map(([k, v]) => ({ key: k, label: v.label }))}
            onSelect={(k) => {
              const archetype = k as ArchetypeKey;
              const defaults = ARCHETYPES[archetype]?.default_features ?? [];
              update({ archetype, features: defaults });
            }}
          />
        )}

        {current === "platforms" && (
          <Multi
            title="which platforms?"
            subtitle="Pick at least one. Choosing Web + iOS + Android means a combined build with a shared backend."
            value={answers.platforms}
            options={[
              { key: "web", label: "Web" },
              { key: "ios", label: "iOS" },
              { key: "android", label: "Android" },
            ]}
            onChange={(vals) => update({ platforms: vals as Platform[] })}
          />
        )}

        {current === "stage" && (
          <Single
            title="what stage are you at?"
            value={answers.stage}
            options={[
              { key: "idea", label: "Idea / Pre-launch" },
              { key: "mvp_scaling", label: "MVP, scaling" },
              { key: "rebuild", label: "Existing product, rebuild" },
              { key: "funded", label: "Funded / Series A+" },
            ]}
            onSelect={(k) => update({ stage: k as StageChoice })}
          />
        )}

        {current === "launch" && (
          <Single
            title="target launch?"
            value={answers.launch}
            options={[
              { key: "under_2_months", label: "Under 2 months (rush)" },
              { key: "2_4_months", label: "2–4 months" },
              { key: "4_6_months", label: "4–6 months" },
              { key: "6_plus_months", label: "6+ months" },
            ]}
            onSelect={(k) => update({ launch: k as LaunchChoice })}
          />
        )}

        {current === "design" && (
          <Single
            title="design approach?"
            value={answers.design}
            options={[
              { key: "template", label: "Template-driven" },
              { key: "custom_simple", label: "Custom but simple" },
              { key: "custom_premium", label: "Premium custom" },
              { key: "designs_provided", label: "I have Figma designs ready" },
            ]}
            onSelect={(k) => update({ design: k as DesignChoice })}
          />
        )}

        {current === "modules" && (
          <Multi
            title="core modules"
            subtitle="Pick the modules you'll definitely need. Filtered by your selected platforms."
            value={answers.features}
            options={featureOptions(answers.platforms, ["core"])}
            onChange={(vals) => update({ features: vals as FeatureKey[] })}
          />
        )}

        {current === "capabilities" && (
          <Multi
            title="special capabilities"
            subtitle="Anything advanced you need. Skip if none apply."
            value={answers.capabilities}
            options={featureOptions(answers.platforms, ["advanced", "compliance"])}
            onChange={(vals) => update({ capabilities: vals as FeatureKey[] })}
          />
        )}

        {current === "scale" && (
          <Single
            title="expected scale at 12 months?"
            value={answers.scale}
            options={[
              { key: "under_1k", label: "Under 1,000 users" },
              { key: "1k_10k", label: "1,000 – 10,000" },
              { key: "10k_100k", label: "10,000 – 100,000" },
              { key: "over_100k", label: "100,000+" },
            ]}
            onSelect={(k) => update({ scale: k as ScaleChoice })}
          />
        )}

        {current === "mobile_approach" && (
          <Single
            title="mobile approach?"
            value={answers.mobile_approach}
            options={[
              { key: "cross_platform", label: "Cross-platform (React Native / Flutter)" },
              { key: "native", label: "Native (Swift + Kotlin)" },
              { key: "recommend_for_me", label: "Recommend for me" },
            ]}
            onSelect={(k) => update({ mobile_approach: k as MobileApproach })}
          />
        )}
      </div>

      {/* Footer */}
      <div className={styles.foot}>
        <span className={styles.footHint}>no email required</span>
        <button
          type="button"
          onClick={next}
          disabled={!canAdvance}
          className={`btn btn--grad notch ${styles.nextBtn}`}
        >
          {boundedStep === totalSteps - 1 ? "see my estimate" : "continue"}
          <ArrowRight />
        </button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// SUB-COMPONENTS
// ---------------------------------------------------------------------------

function featureOptions(
  platforms: Platform[],
  categories: ("core" | "advanced" | "compliance")[],
): { key: string; label: string }[] {
  const platformFlags: ("web" | "mobile")[] = [];
  if (platforms.includes("web")) platformFlags.push("web");
  if (platforms.some((p) => p === "ios" || p === "android")) platformFlags.push("mobile");
  return Object.values(FEATURES)
    .filter((f) => categories.includes(f.category))
    .filter((f) =>
      platformFlags.length === 0
        ? true
        : f.applies_to.some((a) => platformFlags.includes(a)),
    )
    .map((f) => ({ key: f.key, label: f.label }));
}

function Single({
  title,
  subtitle,
  value,
  options,
  onSelect,
}: {
  title: string;
  subtitle?: string;
  value?: string;
  options: { key: string; label: string }[];
  onSelect: (k: string) => void;
}) {
  return (
    <fieldset style={{ border: 0, margin: 0, padding: 0 }}>
      <legend className={styles.legend}>{title}</legend>
      {subtitle ? <p className={styles.sub}>{subtitle}</p> : null}
      <div className={styles.options}>
        {options.map((o) => {
          const active = value === o.key;
          return (
            <button
              key={o.key}
              type="button"
              onClick={() => onSelect(o.key)}
              aria-pressed={active}
              className={`${styles.opt} ${active ? styles.optActive : ""}`}
            >
              <span>{o.label}</span>
              <Check className={styles.optCheck} />
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

function Multi({
  title,
  subtitle,
  value,
  options,
  onChange,
}: {
  title: string;
  subtitle?: string;
  value: string[];
  options: { key: string; label: string }[];
  onChange: (vals: string[]) => void;
}) {
  const toggle = (k: string) => {
    if (value.includes(k)) onChange(value.filter((v) => v !== k));
    else onChange([...value, k]);
  };
  return (
    <fieldset style={{ border: 0, margin: 0, padding: 0 }}>
      <legend className={styles.legend}>{title}</legend>
      {subtitle ? <p className={styles.sub}>{subtitle}</p> : null}
      <div className={styles.options}>
        {options.map((o) => {
          const active = value.includes(o.key);
          return (
            <button
              key={o.key}
              type="button"
              onClick={() => toggle(o.key)}
              aria-pressed={active}
              className={`${styles.opt} ${active ? styles.optActive : ""}`}
            >
              <span>{o.label}</span>
              <Check className={styles.optCheck} />
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

// Re-export the loader so the orchestrator can hydrate from saved state.
export { loadDraft };
