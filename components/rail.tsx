"use client";

import { Children, useCallback, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

/**
 * Horizontal scroll-snap rail. Shows a fractional number of cards so the
 * partial card at the edge signals "there is more" — the trailing fade is a
 * mask on the scroller, dropped once you reach the end so the last card is
 * never dimmed at rest.
 */
export function Rail({
  children,
  label,
  className = "",
  scrollSmallSets = false,
}: {
  children: ReactNode;
  label: string;
  className?: string;
  scrollSmallSets?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(true);

  const measure = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setAtStart(el.scrollLeft <= 2);
    setAtEnd(el.scrollLeft >= max - 2);
  }, []);

  useEffect(() => {
    measure();
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [measure]);

  // Small sets normally use a grid. Case-study rails can opt into scrolling
  // to keep two cards compact on mobile.
  const count = Children.toArray(children).length;

  function nudge(dir: 1 | -1) {
    const el = ref.current;
    if (!el) return;
    const first = el.firstElementChild as HTMLElement | null;
    const step = first ? first.offsetWidth + 24 : el.clientWidth * 0.6;
    el.scrollBy({ left: step * dir, behavior: "smooth" });
  }

  if (count <= 2 && !scrollSmallSets) {
    return (
      <div className={`rail-static ${className}`} role="group" aria-label={label}>
        {children}
      </div>
    );
  }

  return (
    <div className={`rail${atStart ? " is-start" : ""}${atEnd ? " is-end" : ""} ${className}`}>
      <div className="rail__scroller" ref={ref} onScroll={measure} role="group" aria-label={label}>
        {children}
      </div>
      <div className="rail__nav" aria-label={`${label} controls`}>
        <button type="button" className="rail__btn" onClick={() => nudge(-1)} disabled={atStart} aria-label="Previous case studies">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button type="button" className="rail__btn" onClick={() => nudge(1)} disabled={atEnd} aria-label="Next case studies">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
