/* Generates lib/portfolio-data.ts from the portfolio markdown + world-atlas
   topojson. Run once, output is committed — nothing here runs at request time. */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const SP = __dirname;
const SRC = path.join(ROOT, "appycodes-case-studies/AppyCodes-Complete-Portfolio.md");

/* ---------------------------------------------------- 1. project index ---- */

const md = fs.readFileSync(SRC, "utf8");
const rows = [];
for (const l of md.split("\n")) {
  const m = l.match(/^\|\s*(\d+)\s*\|(.+)\|\s*$/);
  if (!m) continue;
  const c = m[2].split("|").map((x) => x.replace(/\\/g, "").trim());
  if (c.length !== 6 || !/^\d{4}$/.test(c[5])) continue;
  rows.push({ client: c[0], project: c[1], country: c[2], category: c[3], complexity: c[4], year: +c[5] });
}

/* A handful of one-off category labels collapse into their obvious parent so
   the heatmap has rows worth reading rather than a tail of ones. */
const CAT = {
  "Marketing Site": "Corporate Website",
  "Web/Infra": "Infrastructure & DevOps",
};
for (const r of rows) r.category = CAT[r.category] || r.category;

/* ------------------------------------------------------------- domains ---- */

/* The register's own category column describes the DELIVERABLE (website, app,
   platform), which makes for a lopsided chart: two rows carry 70% of the work.
   Sector is the more useful cut and the one the case studies already argue —
   fintech, edtech, supply chain, sports, security. Assigned here from the
   client and project name, first rule wins, and anything genuinely unclear is
   left in "Other" rather than guessed into a bucket. */
/* Loaded from a gitignored file: the rules match on client names, which makes
   the table a client list. Public repository, so it lives outside it. */
let DOMAINS;
try {
  DOMAINS = require("./domain-rules.js");
} catch {
  console.error("\nMissing scripts/domain-rules.js — copy domain-rules.example.js and fill it in.\n");
  process.exit(1);
}

for (const r of rows) {
  const hay = `${r.client} ${r.project}`;
  const hit = DOMAINS.find(([, re]) => re.test(hay));
  r.domain = hit ? hit[0] : "Other";
}

/* ------------------------------------------- 2. topojson -> land polygons ---- */

const topo = JSON.parse(fs.readFileSync(path.join(SP, "countries-110m.json"), "utf8"));
const { scale: s, translate: t } = topo.transform;

function arcPoints(idx) {
  const rev = idx < 0;
  const arc = topo.arcs[rev ? ~idx : idx];
  let x = 0, y = 0;
  const pts = arc.map(([dx, dy]) => {
    x += dx; y += dy;
    return [x * s[0] + t[0], y * s[1] + t[1]];
  });
  return rev ? pts.slice().reverse() : pts;
}
const ringOf = (arcIdxs) => {
  const out = [];
  for (const a of arcIdxs) { const p = arcPoints(a); out.push(...(out.length ? p.slice(1) : p)); }
  return out;
};
const polysOf = (g) =>
  g.type === "Polygon" ? [g.arcs.map(ringOf)] : g.type === "MultiPolygon" ? g.arcs.map((p) => p.map(ringOf)) : [];

const landPolys = polysOf(topo.objects.land.geometries[0]);
const bbox = (poly) => {
  let x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9;
  for (const [x, y] of poly[0]) { if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
  return [x0, y0, x1, y1];
};
const landBoxes = landPolys.map(bbox);

function inRing(ring, lon, lat) {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [xi, yi] = ring[i], [xj, yj] = ring[j];
    if (yi > lat !== yj > lat && lon < ((xj - xi) * (lat - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}
function inPolys(polys, boxes, lon, lat) {
  for (let p = 0; p < polys.length; p++) {
    const b = boxes ? boxes[p] : bbox(polys[p]);
    if (lon < b[0] || lon > b[2] || lat < b[1] || lat > b[3]) continue;
    const rings = polys[p];
    if (!inRing(rings[0], lon, lat)) continue;
    let hole = false;
    for (let r = 1; r < rings.length; r++) if (inRing(rings[r], lon, lat)) hole = true;
    if (!hole) return true;
  }
  return false;
}

/* Countries with delivered work get their land dots painted in the brand green.
   Names are world-atlas's, mapped to the labels used in the project register. */
const WORKED = {
  "United Kingdom": "United Kingdom", India: "India", Ireland: "Ireland", France: "France",
  Germany: "Germany", Spain: "Spain", Belgium: "Belgium", "United States of America": "United States",
  Australia: "Australia", "Sri Lanka": "Sri Lanka", Malta: "Malta", Singapore: "Singapore",
};
const countryPolys = {};
for (const g of topo.objects.countries.geometries) {
  if (WORKED[g.properties.name]) countryPolys[WORKED[g.properties.name]] = polysOf(g);
}

/* ------------------------------------------------- 3. projection + dots ---- */

const W = 1000, LAT_TOP = 83, LAT_BOT = -56;
const H = 400; // a little taller than the 386 the crop needs, to seat the inset
const px = (lon) => +(((lon + 180) / 360) * W).toFixed(1);
const py = (lat) => +(((LAT_TOP - lat) / 360) * W).toFixed(1);

/** A zero-length line with a round cap renders as a dot — so a few thousand
 *  dots cost one <path> element instead of a few thousand <circle>s. */
const dotPath = (pts) => pts.map(([x, y]) => `M${x} ${y}h.01`).join("");

function sample(step, latTop, latBot, lonMin, lonMax, project) {
  const base = [], hi = [];
  for (let row = 0; ; row++) {
    const lat = latTop - row * step * 0.78;
    if (lat < latBot) break;
    for (let lon = lonMin + (row % 2 ? step / 2 : 0); lon < lonMax; lon += step) {
      if (!inPolys(landPolys, landBoxes, lon, lat)) continue;
      let worked = false;
      for (const polys of Object.values(countryPolys)) if (inPolys(polys, null, lon, lat)) { worked = true; break; }
      (worked ? hi : base).push(project(lon, lat));
    }
  }
  return { base, hi };
}

const world = sample(2.4, LAT_TOP, LAT_BOT, -180, 180, (lon, lat) => [px(lon), py(lat)]);

/* Seven of the thirteen countries sit inside thirty degrees of each other, so
   at world scale their pins are one blob. Rather than park an inset in a
   corner, the map zooms into Europe in place — which needs a denser dot layer,
   sampled in the same world coordinate space and swapped in on zoom. */
const EU_LAT = [34, 60];
const EU_VIEW = {
  x: px(-28.5),
  y: py(EU_LAT[1]),
  w: +(px(36.5) - px(-28.5)).toFixed(1),
  h: +(py(EU_LAT[0]) - py(EU_LAT[1])).toFixed(1),
};
/* 0.5° keeps the zoomed dot pitch close to the world view's, which is what
   stops the zoom looking like a different map. */
const eu = sample(0.5, 62, 32, -31, 39, (lon, lat) => [px(lon), py(lat)]);

/* -------------------------------------------------------- 4. the pins ---- */

const LATLON = {
  "United Kingdom": [54.0, -2.4], India: [22.4, 79.0], Ireland: [53.3, -8.2], France: [46.9, 2.4],
  Germany: [51.1, 10.4], Spain: [40.2, -3.7], Belgium: [50.7, 4.7], Malta: [35.9, 14.4],
  "United States": [39.5, -98.0], Australia: [-25.5, 134.0], "Hong Kong": [22.3, 114.2],
  Singapore: [1.35, 103.8], "Sri Lanka": [7.6, 80.7],
};
/** Countries inside the Europe zoom window — they get full labels when zoomed. */
const IN_EU = new Set(["United Kingdom", "Ireland", "France", "Germany", "Spain", "Belgium", "Malta"]);

const tally = (arr, key) => {
  const m = {};
  for (const r of arr) m[r[key]] = (m[r[key]] || 0) + 1;
  return m;
};

const markers = [...new Set(rows.filter((r) => r.country).map((r) => r.country))]
  .map((country) => {
    const mine = rows.filter((r) => r.country === country);
    const [lat, lon] = LATLON[country];
    return {
      country,
      count: mine.length,
      clients: new Set(mine.map((r) => r.client)).size,
      from: Math.min(...mine.map((r) => r.year)),
      /* Sector mix, biggest first — the tooltip reads this rather than naming
         clients, since a chunk of the register is white-label work. Sectors
         also keep the tooltip speaking the same language as the charts. */
      mix: Object.entries(tally(mine, "domain"))
        .filter(([name]) => name !== "Other")
        .sort((a, b) => b[1] - a[1])
        .slice(0, 4)
        .map(([name, n]) => ({ name, n })),
      x: px(lon), y: py(lat),
      ...(IN_EU.has(country) ? { eu: true } : {}),
    };
  })
  .sort((a, b) => b.count - a.count);

/* ------------------------------------------------------ 4b. aggregates ---- */

const YEARS = [];
for (let y = Math.min(...rows.map((r) => r.year)); y <= Math.max(...rows.map((r) => r.year)); y++) YEARS.push(y);

const domTotals = tally(rows, "domain");
/* "Other" is the residue of the classifier, so it sits last however big it is
   rather than leading the chart. */
const DOMS = Object.keys(domTotals)
  .sort((a, b) => domTotals[b] - domTotals[a])
  .filter((d) => d !== "Other")
  .concat(domTotals.Other ? ["Other"] : []);

const heat = DOMS.map((d) => YEARS.map((y) => rows.filter((r) => r.domain === d && r.year === y).length));

const LEVELS = ["Low", "Low-Medium", "Medium", "Medium-High", "High"];
const complexity = DOMS.map((d) => {
  const mine = rows.filter((r) => r.domain === d);
  return LEVELS.map((l) => mine.filter((r) => r.complexity === l).length);
});

/* Deliverable mix per domain — what the work actually was, which is the thing
   the old category axis was good at, kept as a second dimension. */
const catTotals = tally(rows, "category");
const CATS = Object.keys(catTotals).sort((a, b) => catTotals[b] - catTotals[a]);

/* ------------------------------------------- 5. stack, from the write-ups ---- */

/* Counts how many of the 74 written case studies name each technology. This is
   deliberately scoped to the case-study prose — the project register leaves the
   stack column blank on 195 of 298 rows, so counting there would be a guess. */
const studies = md.split(/\n## \d+\\?\. /).slice(1);

/* Grouped by what the technology is FOR, not by raw frequency. A flat count
   puts WordPress on top because a decade of content sites outnumbers four
   years of product work — true, but it describes where we have been rather
   than what we build now. The bands say both. */
const BANDS = [
  {
    band: "product & AI",
    note: "where new builds start",
    items: [
      ["React / Next.js", /next\.js|\breact\b(?! native)/i],
      ["AI / LLM", /\bai\b|llm|claude|prompt|rag\b/i],
      ["React Native", /react native/i],
      ["Node.js", /node\.js|fastify/i],
      ["TypeScript", /typescript/i],
      ["Supabase", /supabase/i],
      ["Expo", /\bexpo\b/i],
      ["Vercel", /vercel/i],
    ],
  },
  {
    band: "commerce & content",
    note: "revenue surfaces",
    items: [
      ["Shopify", /shopify/i],
      ["Stripe", /stripe/i],
      ["Laravel", /laravel/i],
      ["WordPress", /wordpress|woocommerce/i],
      ["Sanity", /sanity/i],
      ["PHP", /\bphp\b/i],
    ],
  },
  {
    band: "cloud & data",
    note: "what it runs on",
    items: [
      ["AWS", /\baws\b|dynamodb|amplify|chalice/i],
      ["Cloudflare", /cloudflare/i],
      ["MySQL / Postgres", /mysql|postgres/i],
      ["Zoho", /zoho/i],
      ["Python", /python/i],
      ["Java", /\bjava\b/i],
    ],
  },
];
const stack = BANDS.map((b) => ({
  band: b.band,
  note: b.note,
  items: b.items
    .map(([name, re]) => ({ name, n: studies.filter((s) => re.test(s)).length }))
    .filter((s) => s.n >= 2)
    .sort((a, b2) => b2.n - a.n),
}));

/* ------------------------------------------------------------- 6. emit ---- */

const ts = `/* GENERATED — do not hand-edit.
 * Source: appycodes-case-studies/AppyCodes-Complete-Portfolio.md (the project
 * register compiled from Slack, Gmail and the Zoho Books ledger) plus
 * world-atlas 110m land geometry, sampled to a dot grid at build time.
 * Regenerate with: node scripts/build-portfolio-data.js
 *
 * Aggregates only. Client names stay in the register and out of the bundle —
 * a large share of the work is white-label, delivered under a partner's name.
 */

export type Marker = {
  country: string;
  count: number;
  clients: number;
  from: number;
  mix: { name: string; n: number }[];
  x: number;
  y: number;
  /** True for the seven countries inside the Europe zoom window. */
  eu?: boolean;
};

/** Equirectangular, cropped to 83°N–56°S. 1 unit = 0.36° of longitude. */
export const MAP = { w: ${W}, h: ${H} } as const;

/** The rectangle the map zooms to when you open Europe, in map units. */
export const EU_VIEW = ${JSON.stringify(EU_VIEW)} as const;

/** Land as a dot grid: one <path> of zero-length round-capped strokes. */
export const LAND = ${JSON.stringify(dotPath(world.base))} as const;
export const LAND_WORKED = ${JSON.stringify(dotPath(world.hi))} as const;
/** Denser sampling over Europe, same coordinate space — swapped in when zoomed. */
export const EU_LAND = ${JSON.stringify(dotPath(eu.base))} as const;
export const EU_LAND_WORKED = ${JSON.stringify(dotPath(eu.hi))} as const;

export const MARKERS: Marker[] = ${JSON.stringify(markers, null, 2)};

/** Siliguri, West Bengal — where all of it is built. */
export const HQ = { x: ${px(88.43)}, y: ${py(26.72)} } as const;

/** How many of the ${studies.length} written case studies name each technology,
 *  grouped by what the technology is for rather than by raw frequency. */
export const STACK: { band: string; note: string; items: { name: string; n: number }[] }[] =
  ${JSON.stringify(stack, null, 2)};

/** Domain x year. Rows are DOMAINS, columns are YEARS. */
export const DOMAINS: string[] = ${JSON.stringify(DOMS)};
export const YEARS: number[] = ${JSON.stringify(YEARS)};
export const HEAT: number[][] = ${JSON.stringify(heat)};

/** Domain x complexity band. Rows follow DOMAINS, columns LEVELS. */
export const LEVELS: string[] = ${JSON.stringify(LEVELS)};
export const COMPLEXITY: number[][] = ${JSON.stringify(complexity)};

/** Deliverable mix across the whole register. */
export const CATEGORIES: { name: string; n: number }[] =
  ${JSON.stringify(CATS.map((c) => ({ name: c, n: catTotals[c] })))};

export const TOTALS = {
  projects: ${rows.length},
  clients: ${new Set(rows.map((r) => r.client)).size},
  countries: ${markers.length},
  located: ${markers.reduce((a, m) => a + m.count, 0)},
  unlocated: ${rows.length - markers.reduce((a, m) => a + m.count, 0)},
  firstYear: ${Math.min(...rows.map((r) => r.year))},
  lastYear: ${Math.max(...rows.map((r) => r.year))},
  caseStudies: ${studies.length},
} as const;
`;

fs.writeFileSync(path.join(ROOT, "lib/portfolio-data.ts"), ts);

console.log("projects        ", rows.length, "| clients", new Set(rows.map((r) => r.client)).size);
console.log("world dots      ", world.base.length, "+", world.hi.length, "worked");
console.log("europe dots     ", eu.base.length, "+", eu.hi.length, "worked");
console.log("markers         ", markers.map((m) => `${m.country}:${m.count}`).join(" "));
console.log("domains         ", DOMS.map((d) => `${d}:${domTotals[d]}`).join("  "));
for (const b of stack) console.log(`stack/${b.band.padEnd(19)}`, b.items.map((i) => `${i.name}:${i.n}`).join(" "));
console.log("bytes           ", (ts.length / 1024).toFixed(1), "KB");
if (process.argv.includes("--other")) {
  console.log("\nunclassified rows:\n" + rows.filter((r) => r.domain === "Other").map((r) => `  ${r.client} | ${r.project}`).join("\n"));
}
