"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { HQ, LAND, LAND_WORKED, MAP, MARKERS, TOTALS, type Marker } from "@/lib/portfolio-data";
import styles from "./home-concepts.module.css";

const radius = (count: number) => Math.min(3.2 + Math.sqrt(count) * .85, 8.5);

export function InstitutionalMap() {
  const [tip, setTip] = useState<{ x: number; y: number; marker: Marker } | null>(null);
  const frame = useRef<HTMLDivElement>(null);
  const viewport = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = viewport.current;
    if (!element) return;
    const mobile = window.matchMedia("(max-width: 680px)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let pendingFrame = 0;
    let interacting = false;
    const update = () => {
      pendingFrame = 0;
      if (!mobile.matches || reducedMotion.matches || interacting || element.contains(document.activeElement)) return;
      const box = element.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, (window.innerHeight - box.top) / (window.innerHeight + box.height)));
      element.scrollLeft = progress * (element.scrollWidth - element.clientWidth);
    };
    const schedule = () => {
      if (!pendingFrame) pendingFrame = window.requestAnimationFrame(update);
    };
    const startInteraction = () => { interacting = true; };
    const endInteraction = () => { interacting = false; };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    element.addEventListener("pointerdown", startInteraction, { passive: true });
    window.addEventListener("pointerup", endInteraction, { passive: true });
    window.addEventListener("pointercancel", endInteraction, { passive: true });
    mobile.addEventListener("change", schedule);
    reducedMotion.addEventListener("change", schedule);
    schedule();
    return () => {
      window.cancelAnimationFrame(pendingFrame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      element.removeEventListener("pointerdown", startInteraction);
      window.removeEventListener("pointerup", endInteraction);
      window.removeEventListener("pointercancel", endInteraction);
      mobile.removeEventListener("change", schedule);
      reducedMotion.removeEventListener("change", schedule);
    };
  }, []);

  const place = useCallback((marker: Marker, point: { clientX: number; clientY: number }) => {
    const box = frame.current?.getBoundingClientRect();
    if (!box) return;
    setTip({ x: point.clientX - box.left, y: point.clientY - box.top, marker });
  }, []);

  return (
    <section className={styles.lightMapSection}>
      <div className={styles.inner}>
        <div className={styles.lightMapGrid}>
          <div className={styles.lightMapCopy}>
            <div className={styles.lightMapHead}>
            <span className={styles.kicker}>Global delivery record</span>
            <h2>Built in India. Delivered across 20 countries.</h2>
              <p>Each marker represents completed client work recorded across our delivery portfolio.</p>
            </div>
            <div className={styles.lightMapFoot}>
              <dl>
                <div><dt>Projects recorded</dt><dd>300+</dd></div>
                <div><dt>Distinct clients</dt><dd>200+</dd></div>
                <div><dt>Countries delivered in</dt><dd>20</dd></div>
              </dl>
              <Link href="/atlas/">Explore the full delivery atlas <span aria-hidden="true">→</span></Link>
            </div>
          </div>

          <div className={styles.lightMapFrame} ref={frame}>
            <div className={styles.lightMapViewport} ref={viewport} onScroll={() => setTip(null)}>
              <svg viewBox={`0 0 ${MAP.w} ${MAP.h}`} role="img" aria-label={`World map showing ${TOTALS.located} projects delivered across ${TOTALS.countries} countries.`}>
                <path className={styles.lightMapLand} d={LAND} vectorEffect="non-scaling-stroke" />
                <path className={styles.lightMapWorked} d={LAND_WORKED} vectorEffect="non-scaling-stroke" />

                {MARKERS.map((marker) => {
                const r = radius(marker.count);
                return (
                  <g
                    key={marker.country}
                    className={styles.lightMapPin}
                    transform={`translate(${marker.x} ${marker.y})`}
                    tabIndex={0}
                    role="button"
                    aria-label={`${marker.country}: ${marker.count} projects for ${marker.clients} clients since ${marker.from}`}
                    onMouseMove={(event) => place(marker, event)}
                    onMouseLeave={() => setTip(null)}
                    onFocus={(event) => {
                      const box = event.currentTarget.getBoundingClientRect();
                      place(marker, { clientX: box.left + box.width / 2, clientY: box.top });
                    }}
                    onBlur={() => setTip(null)}
                  >
                    <circle className={styles.lightMapHalo} r={r + 5} />
                    <circle className={styles.lightMapRing} r={r} />
                    <circle className={styles.lightMapCore} r={Math.max(1.2, r * .32)} />
                    <circle className={styles.lightMapHit} r={Math.max(12, r + 6)} />
                  </g>
                );
                })}

                <g className={styles.lightMapHq} transform={`translate(${HQ.x} ${HQ.y})`} aria-hidden="true">
                  <path d="M-5 0h10M0-5v10" />
                  <circle r="3" />
                </g>
              </svg>
            </div>

            {tip ? (
              <div className={styles.lightMapTip} style={{ left: tip.x, top: tip.y }} aria-hidden="true">
                <strong>{tip.marker.country}</strong>
                <span>{tip.marker.count} projects · {tip.marker.clients} clients · since {tip.marker.from}</span>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
