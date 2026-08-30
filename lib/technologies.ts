export type Technology = { name: string; logo?: string; symbol?: "code" | "document"; wide?: boolean };

const brand = (name: string, file: string, wide = false): Technology => ({ name, logo: `/images/stack/${file}`, wide });
const entries: [Technology, string[]][] = [
  [brand("Next.js", "nextdotjs.svg"), ["nextjs", "nextdotjs"]],
  [brand("React", "react.svg"), []],
  [brand("React Native", "react.svg"), []],
  [brand("TypeScript", "typescript.svg"), []],
  [brand("Node.js", "nodedotjs.svg"), ["node", "nodedotjs"]],
  [brand("Python", "python.svg"), []],
  [brand("Django", "django.svg"), []],
  [brand("Laravel", "laravel.svg"), []],
  [brand("PHP", "php.svg"), []],
  [brand("Doctrine", "doctrine.svg"), []],
  [brand("PostgreSQL", "postgresql.svg"), []],
  [brand("Supabase", "supabase.svg"), []],
  [brand("MySQL", "mysql.svg"), []],
  [brand("MongoDB", "mongodb.svg"), []],
  [brand("Redis", "redis.svg"), []],
  [brand("Flutter", "flutter.svg"), []],
  [brand("Expo", "expo.svg"), []],
  [brand("Google Play", "googleplay.svg"), []],
  [brand("Apple / iOS", "apple.svg"), ["apple", "ios"]],
  [brand("Android", "android.svg"), []],
  [brand("Claude", "anthropic.svg"), ["anthropic"]],
  [brand("Docker", "docker.svg"), []],
  [brand("Cloudflare", "cloudflare.svg"), []],
  [brand("WordPress", "wordpress.svg"), []],
  [brand("GitHub Actions", "githubactions.svg"), []],
  [brand("Sentry", "sentry.svg"), []],
  [brand("Shopify", "shopify.svg"), []],
  [brand("WooCommerce", "woocommerce.svg"), []],
  [brand("Sanity", "sanity.svg"), []],
  [brand("Stripe", "stripe.svg"), []],
  [brand("Razorpay", "razorpay.svg"), []],
  [brand("Search Console", "googlesearchconsole.svg"), ["Google Search Console"]],
  [brand("Google Analytics", "googleanalytics.svg"), []],
  [brand("Lighthouse", "lighthouse.svg"), []],
  [brand("Vercel", "vercel.svg"), []],
  [brand("Figma", "figma.svg"), []],
  [brand("Zoho Books", "zoho.svg"), []],
  [brand("Zoho CRM", "zoho.svg"), []],
  [brand("Tally", "tally.svg", true), []],
  [brand("Tally TDL", "tally.svg", true), []],
  [brand("Mux", "mux.png", true), []],
  [brand("AWS Amplify", "awsamplify.svg"), ["amplify"]],
  [brand("AWS", "amazonwebservices.svg"), []],
  [brand("DynamoDB", "amazondynamodb.svg"), []],
  [brand("Google Cloud", "googlecloud.svg"), ["gcp"]],
  [brand("Nuxt", "nuxtdotjs.svg"), []],
  [brand("DigitalOcean", "digitalocean.svg"), []],
  [brand("Algorand", "algorand.svg"), []],
  [brand("Bootstrap", "bootstrap.svg"), []],
  [brand("Vite", "vite.svg"), []],
  // These are capabilities, not vendors; use descriptive symbols, not invented logos.
  [{ name: "REST APIs", symbol: "code" }, []],
  [{ name: "LLM APIs", symbol: "code" }, []],
  [{ name: "PDF extraction", symbol: "document" }, []],
];

const key = (name: string) => name.toLowerCase().replace(/[^a-z0-9]/g, "");
const registry = new Map(entries.flatMap(([technology, aliases]) => [technology.name, ...aliases].map((name) => [key(name), technology] as const)));

/** One lookup for service, sector and case-study technology lists. */
export function technologyFor(name: string): Technology {
  const technology = registry.get(key(name));
  if (!technology) throw new Error(`Add a verified logo for technology: ${name}`);
  return technology;
}
