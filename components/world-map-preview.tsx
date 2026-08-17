import Link from "next/link";
import { HQ, LAND, LAND_WORKED, MAP, MARKERS, TOTALS } from "@/lib/portfolio-data";

/**
 * The homepage cut of the atlas: the same map, static.
 *
 * Deliberately a server component and deliberately not <WorkAtlas>. The
 * interactive version also carries the dense Europe dot layer for its zoom,
 * which is more than half the payload — none of which the homepage needs to
 * ship to make the point. This renders to plain HTML with no client JS, and
 * links through to the real thing.
 */

const radius = (count: number) => 4 + Math.sqrt(count) * 1.55;

const LABEL: Record<string, { dx: number; dy: number; anchor: "start" | "middle" | "end" }> = {
  "United States": { dx: -14, dy: 4, anchor: "end" },
  India: { dx: -24, dy: 5, anchor: "end" },
  "Sri Lanka": { dx: 10, dy: 4, anchor: "start" },
  "Hong Kong": { dx: 10, dy: 4, anchor: "start" },
  Singapore: { dx: 10, dy: 4, anchor: "start" },
  Australia: { dx: 0, dy: 21, anchor: "middle" },
};

/** Europe carries no labels at world scale, so it gets one collective note. */
const EUROPE = MARKERS.filter((m) => m.eu);
const EUROPE_TOTAL = EUROPE.reduce((a, m) => a + m.count, 0);

export function WorldMapPreview() {
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
            {TOTALS.countries - 2} more countries.
          </p>
        </div>
      </div>

      <div className="atlas-bleed reveal">
        <div className="atlas">
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

              {MARKERS.map((m) => {
                const r = radius(m.count);
                const label = LABEL[m.country];
                return (
                  <g key={m.country} className="atlas__pin" style={{ transform: `translate(${m.x}px, ${m.y}px)` }}>
                    <circle className="atlas__halo" r={r + 7} />
                    <circle className="atlas__ring" r={r} />
                    <circle className="atlas__core" r={Math.max(2.4, r * 0.34)} />
                    {label ? (
                      <text className="atlas__label" x={label.dx} y={label.dy} textAnchor={label.anchor}>
                        {m.country} {m.count}
                      </text>
                    ) : null}
                  </g>
                );
              })}

              {/* Seven countries overlap in Europe at this scale — one note
                  rather than seven collided labels. The atlas page zooms. */}
              <text className="atlas__label atlas__label--eu" x={455} y={62} textAnchor="end">
                Europe {EUROPE_TOTAL}
              </text>

              <g className="atlas__hq" aria-hidden="true" style={{ transform: `translate(${HQ.x}px, ${HQ.y}px)` }}>
                <path d="M-6 0h12M0 -6v12" />
                <circle r="3.4" />
                <line x1="6" y1="-4" x2="14" y2="-13" />
                <text className="atlas__hqlabel" x="17" y="-13">
                  Siliguri — built here
                </text>
              </g>
            </svg>
          </div>
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
            explore the atlas
          </Link>
        </div>
      </div>
    </section>
  );
}
