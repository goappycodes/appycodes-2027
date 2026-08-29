"use client";

import { useEffect, useState } from "react";
import Wizard, { loadDraft } from "./wizard";
import Result from "./result";
import { Answers, EMPTY_ANSWERS, detectCurrencyFromGeo, clearDraft } from "@/lib/estimator";
import { CurrencyCode } from "@/lib/estimator-config";
import styles from "./estimator.module.css";

type View = "wizard" | "result";

/**
 * Client orchestrator for the software project estimator. Owns the view
 * (wizard vs. result), the display currency, and draft hydration. The pure
 * calculation model lives in @/lib/estimator; this component only wires the
 * interactive shell together.
 */
export default function Estimator() {
  const [view, setView] = useState<View>("wizard");
  const [answers, setAnswers] = useState<Answers>(EMPTY_ANSWERS);
  const [currency, setCurrency] = useState<CurrencyCode>("GBP");
  const [initialStep, setInitialStep] = useState(0);
  const [hydrated, setHydrated] = useState(false);
  // Bumped on "start over" so the Wizard remounts with a clean internal state.
  const [instance, setInstance] = useState(0);

  // Hydrate from localStorage; fall back to IP geo for the currency. Both are
  // client-only side effects, so they live here rather than in the pure lib.
  useEffect(() => {
    setHydrated(true);
    const draft = loadDraft();
    if (draft) {
      setAnswers(draft.answers);
      setInitialStep(draft.step);
      setCurrency(draft.currency);
    } else {
      detectCurrencyFromGeo().then((c) => setCurrency(c));
    }
  }, []);

  const restart = () => {
    clearDraft();
    setAnswers(EMPTY_ANSWERS);
    setInitialStep(0);
    setInstance((n) => n + 1);
    setView("wizard");
  };

  const handleComplete = (a: Answers) => {
    setAnswers(a);
    setView("result");
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className={styles.root}>
      {view === "wizard" ? (
        <Wizard
          key={instance}
          initial={hydrated ? { answers, step: initialStep } : undefined}
          currency={currency}
          onComplete={handleComplete}
        />
      ) : (
        <Result
          answers={answers}
          currency={currency}
          onCurrencyChange={setCurrency}
          onRestart={restart}
        />
      )}
    </div>
  );
}
