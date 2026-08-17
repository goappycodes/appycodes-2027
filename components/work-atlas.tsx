"use client";

import { useCallback, useRef, useState } from "react";
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

/**
 * The delivery atlas: every country the register records work in, on a dot-grid
 * world map.
 *
 * Seven of the thirteen countries sit inside thirty degrees of each other, so
 * at world scale their pins are one blob. Rather than park an inset in a
 * corner, the map zooms into Europe in place — the stage group scales, each pin
 * counter-scales so it keeps its size, and a denser dot layer is swapped in
 * underneath. Detail is a small tooltip that follows the pin, not a legend.
 */

const ZOOM = MAP.w / EU_VIEW.w;

/** Area-proportional, with a floor so a single-project country stays clickable. */
const radius = (count: number) => 4 + Math.sqrt(count) * 1.55;

/** Hand-placed so no label crosses a pin or another label, at either zoom. */
const LABEL: Record<string, { dx: number; dy: number; anchor: "start" | "middle" | "end" }> = {
  "United States": { dx: -14, dy: 4, anchor: "end" },
  India: { dx: -24, dy: 5, anchor: "end" },
  "Sri Lanka": { dx: 10, dy: 4, anchor: "start" },
  "Hong Kong": { dx: 10, dy: 4, anchor: "start" },
  Singapore: { dx: 10, dy: 4, anchor: "start" },
  Australia: { dx: 0, dy: 21, anchor: "middle" },
};
const EU_LABEL: Record<string, { dx: number; dy: number; anchor: "start" | "middle" | "end" }> = {
  "United Kingdom": { dx: 0, dy: -30, anchor: "middle" },
  Ireland: { dx: -14, dy: 4, anchor: "end" },
  France: { dx: 0, dy: 22, anchor: "middle" },
  Germany: { dx: 12, dy: 4, anchor: "start" },
  Belgium: { dx: 12, dy: -6, anchor: "start" },
  Spain: { dx: 0, dy: 20, anchor: "middle" },
  Malta: { dx: 12, dy: 4, anchor: "start" },
};

export function WorkAtlas() {
  const [active, setActive] = useState<string | null>(null);
  const [zoomed, setZoomed] = useState(false);
  const [tip, setTip] = useState<{ x: number; y: number; m: Marker } | null>(null);
  const box = useRef<HTMLDivElement>(null);

  /* The tooltip is HTML over the map, so it is placed from the pointer rather
     than from map coordinates — which keeps it correct at both zoom levels and
     while the map is scrolled sideways on a phone. */
  const place = useCallback((m: Marker, e: { clientX: number; clientY: number }) => {
    const el = box.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setTip({ x: e.clientX - r.left + el.scrollLeft, y: e.clientY - r.top, m });
    setActive(m.country);
  }, []);

  const clear = useCallback(() => {
    setTip(null);
    setActive(null);
  }, []);

  const stage = zoomed
    ? { transform: `scale(${ZOOM}) translate(${-EU_VIEW.x}px, ${-EU_VIEW.y}px)` }
    : { transform: "scale(1) translate(0px, 0px)" };

  function Pin({ m }: { m: Marker }) {
    const r = radius(m.count);
    const on = active === m.country;
    const label = zoomed ? (m.eu ? EU_LABEL[m.country] : undefined) : LABEL[m.country];
    const text = `${m.country} ${m.count}`;
    return (
      <g
        className={`atlas__pin${on ? " is-on" : ""}${active && !on ? " is-off" : ""}`}
        /* counter-scale so the pin keeps its size as the stage zooms */
        style={{ transform: `translate(${m.x}px, ${m.y}px) scale(${zoomed ? 1 / ZOOM : 1})` }}
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
        onClick={() => m.eu && setZoomed(true)}
      >
        <circle className="atlas__halo" r={r + 7} />
        <circle className="atlas__ring" r={r} />
        <circle className="atlas__core" r={Math.max(2.4, r * 0.34)} />
        {label ? (
          <text className="atlas__label" x={label.dx} y={label.dy} textAnchor={label.anchor}>
            {text}
          </text>
        ) : null}
        {/* generous hit area — the visible pin can be 5px across */}
        <circle className="atlas__hit" r={Math.max(r + 8, 14)} />
      </g>
    );
  }

  return (
    <div className="atlas">
      <div className="atlas__map" ref={box}>
        <svg
          viewBox={`0 0 ${MAP.w} ${MAP.h}`}
          role="img"
          aria-label={`World map. ${TOTALS.located} projects across ${TOTALS.countries} countries.`}
        >
          <g className="atlas__stage" style={stage}>
            <path
              className="atlas__land"
              d={zoomed ? EU_LAND : LAND}
              vectorEffect="non-scaling-stroke"
            />
            <path
              className="atlas__land atlas__land--worked"
              d={zoomed ? EU_LAND_WORKED : LAND_WORKED}
              vectorEffect="non-scaling-stroke"
            />

            {/* Siliguri — where every one of them was built */}
            {!zoomed ? (
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
            ) : null}

            {MARKERS.map((m) => (
              <Pin key={m.country} m={m} />
            ))}
          </g>
        </svg>

        {tip ? (
          <div className="atlas__tip" style={{ left: tip.x, top: tip.y }} aria-hidden="true">
            <b>{tip.m.country}</b>
            <span>
              <em className="tnum">{tip.m.count}</em> projects · {tip.m.clients} clients · since{" "}
              {tip.m.from}
            </span>
            <span className="atlas__tip-mix">{tip.m.mix.map((c) => c.name).join(" · ")}</span>
          </div>
        ) : null}
      </div>

      {/* Outside .atlas__map on purpose — that element scrolls sideways on a
          phone, and anything absolutely positioned inside it scrolls away. */}
      <div className="atlas__ctrl">
        <button type="button" onClick={() => setZoomed(!zoomed)}>
          {zoomed ? "← back to the world" : "enlarge Europe"}
        </button>
      </div>

      {/* The pins carry the data for pointer and keyboard; this carries it for
          anything that reads the page linearly. */}
      <p className="sr-only">
        {MARKERS.map((m) => `${m.country}: ${m.count} projects for ${m.clients} clients.`).join(" ")}
      </p>
    </div>
  );
}
