/** Original client artwork. Download sources are recorded in scripts/fetch-client-logos.mjs. */
type ClientLogoAsset = { src: string; dark?: boolean; trimWhitespace?: boolean };

export const CLIENT_LOGOS_BY_SLUG: Record<string, ClientLogoAsset> = {
  creoate: { src: "/images/logo-creoate.png" },
  easyship: { src: "/images/logo-easyship.png" },
  ontick: { src: "/images/clients/ontick.png" },
  decofetch: { src: "/images/clients/decofetch.svg" },
  leonia: { src: "/images/clients/leonia.png" },
  plusheat: { src: "/images/clients/plusheat.svg" },
  shutters365: { src: "/images/clients/shutters365.png", dark: true },
  bloc: { src: "/images/logo-bloc.png" },
  "bloc-ads-manager": { src: "/images/logo-bloc.png" },
  zonely: { src: "/images/clients/zonely.png" },
  "player-profile-hub": { src: "/images/clients/player-profile-hub.png", dark: true },
  deepspatial: { src: "/images/clients/deepspatial.png", dark: true },
  "yippee-malta": { src: "/images/logo-yippeemalta.png" },
  "professional-energy": { src: "/images/clients/professional-energy.png", trimWhitespace: true },
  // BA Engine Room: use its name until the client supplies verified artwork.
};

export function clientLogoFor(path: string): ClientLogoAsset | undefined {
  const slug = path.split("/").filter(Boolean).at(-1)?.replace(/-institutional$/, "");
  return slug ? CLIENT_LOGOS_BY_SLUG[slug] : undefined;
}
