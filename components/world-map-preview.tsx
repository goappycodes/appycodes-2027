"use client";

import { useCallback, useRef, useState } from "react";
import Link from "next/link";
import {
  EU_LAND,
  EU_LAND_WORKED,
  EU_VIEW,
  HQ,
  LAND,
  LAND_WORKED,
  MAP,
  MARKERS,
  TOTALS,
  type Marker,
} from "@/lib/portfolio-data";
import { ArrowRight } from "@/components/icons";

/**
 * The homepage cut of the atlas — the same register, interactive. Pins carry a
 * tooltip on hover/focus, and Europe (where seven countries collide at world
 * scale) is carried in a permanently-enlarged inset rather than a click-to-zoom.
 */

// Capped so a single high-count country (India, the UK) can't swamp the map.
const radius = (count: number) => Math.min(4 + Math.sqrt(count) * 1.3, 12.5);
// The inset viewBox is ~5.5x smaller, so its pins are drawn smaller in user units.
const insetRadius = (count: number) => Math.min(2 + Math.sqrt(count) * 0.5, 4);

type LabelPos = { dx: number; dy: number; anchor: "start" | "middle" | "end" };

/** World-map labels — hand-placed so none crosses a pin or another label. The
   dense Asia cluster keeps India labelled and reveals the rest on hover. */
const LABEL: Record<string, LabelPos> = {
  "United States": { dx: -14, dy: 4, anchor: "end" },
  India: { dx: 0, dy: -16, anchor: "middle" },
  "Hong Kong": { dx: 10, dy: 4, anchor: "start" },
  Singapore: { dx: 10, dy: 4, anchor: "start" },
  Australia: { dx: 0, dy: 21, anchor: "middle" },
  Thailand: { dx: 0, dy: 15, anchor: "middle" },
  Dubai: { dx: -9, dy: 4, anchor: "end" },
  "South Africa": { dx: 0, dy: 20, anchor: "middle" },
  Kenya: { dx: 9, dy: 4, anchor: "start" },
  Bermuda: { dx: 8, dy: 4, anchor: "start" },
};

/** Inset labels use short codes — the inset is small, full names collide. */
const EU_CODE: Record<string, string> = {
  "United Kingdom": "UK",
  Ireland: "IE",
  France: "FR",
  Germany: "DE",
  Belgium: "BE",
  Spain: "ES",
  Malta: "MT",
};
const EU_LABEL: Record<string, LabelPos> = {
  "United Kingdom": { dx: 0, dy: -6, anchor: "middle" },
  Ireland: { dx: -4, dy: 2, anchor: "end" },
  France: { dx: 0, dy: 8, anchor: "middle" },
  Germany: { dx: 5, dy: 1, anchor: "start" },
  Spain: { dx: 0, dy: 8, anchor: "middle" },
  Malta: { dx: 5, dy: 3, anchor: "start" },
};

const WORLD = MARKERS.filter((m) => !m.eu);
const EUROPE = MARKERS.filter((m) => m.eu);
const EUROPE_TOTAL = EUROPE.reduce((a, m) => a + m.count, 0);

export function WorldMapPreview() {
  const [active, setActive] = useState<string | null>(null);
  const [tip, setTip] = useState<{ x: number; y: number; m: Marker } | null>(null);
  const box = useRef<HTMLDivElement>(null);

  const place = useCallback((m: Marker, e: { clientX: number; clientY: number }) => {
    const el = box.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setTip({ x: e.clientX - r.left, y: e.clientY - r.top, m });
    setActive(m.country);
  }, []);

  const clear = useCallback(() => {
    setTip(null);
    setActive(null);
  }, []);

  function Pin({
    m,
    r,
    halo,
    hit,
    label,
    labelText,
  }: {
    m: Marker;
    r: number;
    halo: number;
    hit: number;
    label?: LabelPos;
    labelText?: string;
  }) {
    const on = active === m.country;
    return (
      <g
        className={`atlas__pin${on ? " is-on" : ""}${active && !on ? " is-off" : ""}`}
        style={{ transform: `translate(${m.x}px, ${m.y}px)` }}
        tabIndex={0}
        role="button"
        aria-label={`${m.country}: ${m.count} projects for ${m.clients} clients since ${m.from}`}
        onMouseMove={(e) => place(m, e)}
        onMouseLeave={clear}
        onFocus={(e) => {
          const b = (e.currentTarget as unknown as SVGGElement).getBoundingClientRect();
          place(m, { clientX: b.left + b.width / 2, clientY: b.top });
        }}
        onBlur={clear}
      >
        <circle className="atlas__halo" r={halo} />
        <circle className="atlas__ring" r={r} />
        <circle className="atlas__core" r={Math.max(1.3, r * 0.36)} />
        {label ? (
          <text className="atlas__label" x={label.dx} y={label.dy} textAnchor={label.anchor}>
            {labelText ?? `${m.country} ${m.count}`}
          </text>
        ) : null}
        <circle className="atlas__hit" r={hit} />
      </g>
    );
  }

  return (
    <section className="slab dotted atlas-sec" id="atlas">
      <div className="wrap">
        <div className="sec__head reveal">
          <p className="eyebrow eyebrow--slab">the whole register, not a shortlist</p>
          <h2 className="h-l" style={{ color: "#fff" }}>
            {TOTALS.projects} projects. {TOTALS.countries} countries. twelve years.
          </h2>
          <p className="lede" style={{ color: "var(--on-slab-2)" }}>
            Most agencies show you six logos. This is every engagement we can account for since{" "}
            {TOTALS.firstYear}, plotted where it was delivered — {MARKERS[0].count} in the{" "}
            <span className="caps">UK</span>, {MARKERS[1].count} in India, and the rest across{" "}
            {TOTALS.countries - 2} more countries. Hover any pin for the detail.
          </p>
        </div>
      </div>

      <div className="atlas-bleed reveal">
        <div className="atlas" ref={box}>
          <div className="atlas__map">
            <svg
              viewBox={`0 0 ${MAP.w} ${MAP.h}`}
              role="img"
              aria-label={`World map. ${TOTALS.located} projects plotted across ${TOTALS.countries} countries, led by the United Kingdom with ${MARKERS[0].count} and India with ${MARKERS[1].count}.`}
            >
              <path className="atlas__land" d={LAND} vectorEffect="non-scaling-stroke" />
              <path
                className="atlas__land atlas__land--worked"
                d={LAND_WORKED}
                vectorEffect="non-scaling-stroke"
              />

              {/* the region carried, enlarged, in the inset below-left */}
              <rect
                className="atlas__euframe"
                x={EU_VIEW.x}
                y={EU_VIEW.y}
                width={EU_VIEW.w}
                height={EU_VIEW.h}
                vectorEffect="non-scaling-stroke"
              />

              {WORLD.map((m) => (
                <Pin
                  key={m.country}
                  m={m}
                  r={radius(m.count)}
                  halo={radius(m.count) + 7}
                  hit={Math.max(radius(m.count) + 8, 14)}
                  label={LABEL[m.country]}
                />
              ))}

              <g
                className="atlas__hq"
                aria-hidden="true"
                style={{ transform: `translate(${HQ.x}px, ${HQ.y}px)` }}
              >
                <path d="M-6 0h12M0 -6v12" />
                <circle r="3.4" />
                <line x1="6" y1="-4" x2="14" y2="-13" />
                <text className="atlas__hqlabel" x="17" y="-13">
                  Siliguri — built here
                </text>
              </g>
            </svg>
          </div>

          {/* Always-on magnified Europe */}
          <div className="atlas-inset">
            <div className="atlas-inset__head">
              <span className="atlas-inset__k">Europe, enlarged</span>
              <span className="atlas-inset__n">
                {EUROPE.length} countries · {EUROPE_TOTAL}
              </span>
            </div>
            <svg
              className="atlas-inset__svg"
              viewBox={`${EU_VIEW.x} ${EU_VIEW.y} ${EU_VIEW.w} ${EU_VIEW.h}`}
              role="img"
              aria-label={`Europe, enlarged: ${EUROPE_TOTAL} projects across ${EUROPE.length} countries.`}
            >
              <path className="atlas__land" d={EU_LAND} vectorEffect="non-scaling-stroke" />
              <path
                className="atlas__land atlas__land--worked"
                d={EU_LAND_WORKED}
                vectorEffect="non-scaling-stroke"
              />
              {EUROPE.map((m) => (
                <Pin
                  key={m.country}
                  m={m}
                  r={insetRadius(m.count)}
                  halo={insetRadius(m.count) + 2.5}
                  hit={Math.max(insetRadius(m.count) + 3, 6)}
                  label={EU_LABEL[m.country]}
                  labelText={`${EU_CODE[m.country]} ${m.count}`}
                />
              ))}
            </svg>
          </div>

          {tip ? (
            <div className="atlas__tip" style={{ left: tip.x, top: tip.y }} aria-hidden="true">
              <b>{tip.m.country}</b>
              <span>
                <em className="tnum">{tip.m.count}</em> projects · {tip.m.clients} clients · since{" "}
                {tip.m.from}
              </span>
              {tip.m.mix.length ? (
                <span className="atlas__tip-mix">{tip.m.mix.map((c) => c.name).join(" · ")}</span>
              ) : null}
            </div>
          ) : null}

          <p className="sr-only">
            {MARKERS.map((m) => `${m.country}: ${m.count} projects for ${m.clients} clients.`).join(" ")}
          </p>
        </div>
      </div>

      <div className="wrap reveal">
        <div className="atlas-preview__foot">
          <dl className="atlas-preview__stats">
            <div>
              <dd className="tnum g-dark">{TOTALS.projects}</dd>
              <dt>projects recorded</dt>
            </div>
            <div>
              <dd className="tnum g-dark">{TOTALS.clients}</dd>
              <dt>distinct clients</dt>
            </div>
            <div>
              <dd className="tnum g-dark">{TOTALS.countries}</dd>
              <dt>countries delivered in</dt>
            </div>
            <div>
              <dd className="tnum g-dark">{TOTALS.caseStudies}</dd>
              <dt>written up in detail</dt>
            </div>
          </dl>
          <Link className="btn btn--out notch" href="/atlas/">
            explore the atlas <ArrowRight aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
