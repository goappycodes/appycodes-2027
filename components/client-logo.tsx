import { clientLogoFor } from "@/lib/client-logos";
import styles from "./client-logo.module.css";

export function ClientLogo({ href, name, hero = false }: { href: string; name: string; hero?: boolean }) {
  const asset = clientLogoFor(href);
  return <span className={`${styles.logo} ${hero ? styles.hero : ""} ${asset?.dark ? styles.dark : ""} ${asset?.trimWhitespace ? styles.trimmed : ""}`}>
    {asset ? (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={asset.src} alt={name} loading={hero ? "eager" : "lazy"} />
    ) : <span className={styles.name}>{name}</span>}
  </span>;
}
