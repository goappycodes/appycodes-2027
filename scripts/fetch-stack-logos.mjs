import { writeFile } from "node:fs/promises";

// Original brand glyphs from the pinned, CC0 Simple Icons collection.
const glyphs = ["vercel", "figma", "php", "doctrine", "razorpay", "mysql", "zoho", "awsamplify", "amazonwebservices", "amazondynamodb", "algorand", "bootstrap", "vite", "nuxtdotjs", "mongodb", "googlecloud", "digitalocean"];
const sources = Object.fromEntries(glyphs.map((name) => [`${name}.svg`, `https://raw.githubusercontent.com/simple-icons/simple-icons/13.0.0/icons/${name}.svg`]));
// Wordmarks supplied by the vendors on their public websites.
sources["tally.svg"] = "https://resources.tallysolutions.com/wp-content/themes/tally/assets/images/tally-logo-black.svg";
sources["mux.png"] = "https://www.mux.com/images/mux-logo.png";
await Promise.all(Object.entries(sources).map(async ([name, url]) => {
  const response = await fetch(url, { signal: AbortSignal.timeout(20000) });
  if (!response.ok) throw new Error(`${name}: HTTP ${response.status}`);
  const content = Buffer.from(await response.arrayBuffer());
  if (name.endsWith(".svg") && (!content.toString().includes("<svg") || /<script|<foreignObject|\bonload\s*=/i.test(content.toString()))) throw new Error(`${name}: invalid SVG`);
  if (name.endsWith(".png") && !response.headers.get("content-type")?.startsWith("image/")) throw new Error(`${name}: not an image`);
  await writeFile(new URL(`../public/images/stack/${name}`, import.meta.url), content);
  console.log(name);
}));
