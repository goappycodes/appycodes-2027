const fs = require("fs");
const path = require("path");

const ICON_DIR = path.join(process.cwd(), "node_modules", "simple-icons", "icons");

// key -> { label, slugs: [candidates] }
const TECH = {
  nextjs: { label: "Next.js", slugs: ["nextdotjs"] },
  react: { label: "React", slugs: ["react"] },
  reactnative: { label: "React Native", slugs: ["react"] },
  vue: { label: "Vue", slugs: ["vuedotjs"] },
  nuxt: { label: "Nuxt", slugs: ["nuxt", "nuxtdotjs"] },
  node: { label: "Node.js", slugs: ["nodedotjs"] },
  express: { label: "Express", slugs: ["express"] },
  laravel: { label: "Laravel", slugs: ["laravel"] },
  php: { label: "PHP", slugs: ["php"] },
  wordpress: { label: "WordPress", slugs: ["wordpress"] },
  shopify: { label: "Shopify", slugs: ["shopify"] },
  python: { label: "Python", slugs: ["python"] },
  mysql: { label: "MySQL", slugs: ["mysql"] },
  postgresql: { label: "PostgreSQL", slugs: ["postgresql"] },
  postgis: { label: "PostGIS", slugs: ["postgresql"] },
  mongodb: { label: "MongoDB", slugs: ["mongodb"] },
  dynamodb: { label: "DynamoDB", slugs: ["amazondynamodb"] },
  redis: { label: "Redis", slugs: ["redis"] },
  aws: { label: "AWS", slugs: ["amazonwebservices", "amazonaws"] },
  amplify: { label: "AWS Amplify", slugs: ["awsamplify"] },
  gcp: { label: "Google Cloud", slugs: ["googlecloud"] },
  cloudflare: { label: "Cloudflare", slugs: ["cloudflare"] },
  vercel: { label: "Vercel", slugs: ["vercel"] },
  digitalocean: { label: "DigitalOcean", slugs: ["digitalocean"] },
  kubernetes: { label: "Kubernetes", slugs: ["kubernetes"] },
  stripe: { label: "Stripe", slugs: ["stripe"] },
  algorand: { label: "Algorand", slugs: ["algorand"] },
  claude: { label: "Claude", slugs: ["anthropic", "claude"] },
  supabase: { label: "Supabase", slugs: ["supabase"] },
  expo: { label: "Expo", slugs: ["expo"] },
  bootstrap: { label: "Bootstrap", slugs: ["bootstrap"] },
  jquery: { label: "jQuery", slugs: ["jquery"] },
  vite: { label: "Vite", slugs: ["vite"] },
  cloudinary: { label: "Cloudinary", slugs: ["cloudinary"] },
  firebase: { label: "Firebase", slugs: ["firebase"] },
};

// Amazon/AWS marks were removed from Simple Icons (trademark policy), so these
// use clean hand-drawn generic glyphs (cloud / database cylinder); the label
// carries the brand name.
const CLOUD =
  "M19.35 10.04A7.49 7.49 0 0 0 12 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 0 0 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z";
const FALLBACK = {
  aws: CLOUD,
  amplify: CLOUD,
  dynamodb:
    "M12 3c-4.42 0-8 1.34-8 3v12c0 1.66 3.58 3 8 3s8-1.34 8-3V6c0-1.66-3.58-3-8-3zm6 15c0 .43-2.35 1.5-6 1.5s-6-1.07-6-1.5v-2.23c1.54.78 3.68 1.23 6 1.23s4.46-.45 6-1.23V18zm0-4.5c0 .43-2.35 1.5-6 1.5s-6-1.07-6-1.5v-2.23c1.54.78 3.68 1.23 6 1.23s4.46-.45 6-1.23v2.23zM12 9c-3.65 0-6-1.07-6-1.5S8.35 6 12 6s6 1.07 6 1.5S15.65 9 12 9z",
};

function readPath(slugs, key) {
  for (const slug of slugs) {
    const f = path.join(ICON_DIR, slug + ".svg");
    if (fs.existsSync(f)) {
      const svg = fs.readFileSync(f, "utf8");
      const m = svg.match(/\sd="([^"]+)"/);
      if (m) return { path: m[1], slug };
    }
  }
  if (FALLBACK[key]) return { path: FALLBACK[key], slug: "(hand-drawn)" };
  return null;
}

const entries = [];
const missing = [];
for (const [key, { label, slugs }] of Object.entries(TECH)) {
  const r = readPath(slugs, key);
  if (!r) {
    missing.push(key + " (" + slugs.join(",") + ")");
    continue;
  }
  entries.push({ key, label, path: r.path });
}

if (missing.length) console.error("MISSING:", missing.join(" | "));

const body = entries
  .map((e) => `  ${e.key}: { label: ${JSON.stringify(e.label)}, path: ${JSON.stringify(e.path)} },`)
  .join("\n");

const out = `/* GENERATED — do not hand-edit. Brand marks extracted from Simple Icons
 * (CC0). Regenerate with scripts/gen-tech-logos (simple-icons installed
 * temporarily). Each path is a single 24×24 glyph rendered in currentColor,
 * matching how the flags in icons.tsx are hand-drawn — no runtime dependency.
 */

export type TechKey = keyof typeof TECH;

export const TECH: Record<string, { label: string; path: string }> = {
${body}
};

/** A "built with" strip of monochrome brand marks + labels for a case study. */
export function TechStack({ tech }: { tech: string[] }) {
  const items = tech.map((k) => ({ key: k, ...TECH[k] })).filter((t) => t.path);
  if (items.length === 0) return null;
  return (
    <div className="cs-tech" aria-label="Built with">
      <span className="cs-tech__lbl">built with</span>
      <ul className="cs-tech__list">
        {items.map((t) => (
          <li key={t.key} className="cs-tech__chip">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
              <path d={t.path} />
            </svg>
            <span>{t.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
`;

const dest = path.join(process.cwd(), "components", "tech-logos.tsx");
fs.writeFileSync(dest, out, "utf8");
console.log("Wrote", dest, "with", entries.length, "icons");
