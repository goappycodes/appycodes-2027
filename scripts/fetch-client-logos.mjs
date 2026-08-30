import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

// Unmodified client-owned artwork, fetched from their public websites.
const sources = {
  "ontick.png": "https://ontick.co.uk/assets/images/home/logo.png",
  "professional-energy.png": "https://www.professionalenergy.co.uk/wp-content/uploads/logo_v1.png",
  "decofetch.svg": "https://api.decofetch.com/images/decofetch-icons/decofetch-logo.svg",
  "leonia.png": "https://leonia-cosmetiques.com/cdn/shop/files/LOGO_LEONIA_NB_webp.png?v=1762440076&width=480",
  "plusheat.svg": "https://www.plusheat.co.uk/wp-content/uploads/2026/03/plusheat-logo.svg",
  "shutters365.png": "https://shutters365.co.uk/wp-content/themes/shutters365/assets/img/shutterLogo.png",
  "deepspatial.png": "https://www.deepspatial.ai/images/DSLogo.png",
  "zonely.png": "https://www.zonely.app/assets/logo/logo.png",
  "player-profile-hub.png": "https://main.d3h5pp9ym2mf34.amplifyapp.com/assets/brand/pph-mark.png"
};
const output = new URL('../public/images/clients/', import.meta.url);
await mkdir(output, { recursive: true });
await Promise.all(Object.entries(sources).map(async ([name, url]) => {
  const response = await fetch(url, { signal: AbortSignal.timeout(20000) });
  if (!response.ok) throw new Error(`${name}: HTTP ${response.status}`);
  const type = response.headers.get('content-type') ?? '';
  if (!type.startsWith('image/')) throw new Error(`${name}: unexpected ${type}`);
  const bytes = Buffer.from(await response.arrayBuffer());
  if (name.endsWith('.svg') && /<script|<foreignObject|\bonload\s*=/i.test(bytes.toString())) throw new Error(`${name}: unsafe SVG`);
  await writeFile(new URL(name, output), bytes);
  console.log(`${fileURLToPath(new URL(name, output))}: ${bytes.length} bytes`);
}));
