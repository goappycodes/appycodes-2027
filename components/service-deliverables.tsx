import { ServiceTitle } from "@/components/service-title";
import styles from "./service-deliverables.module.css";

type Deliverable = { title: string; body: string };

function DeliveryIcon({ title }: { title: string }) {
  let shape = <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 9h18M7 6.5h.01M10 6.5h.01M7 13h4M7 16h8" /></>;
  if (/checkout|billing|subscription|payment|cost/i.test(title)) {
    shape = <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 10h18M7 15h4M15 15h2" /></>;
  } else if (/security|guardrail|entry point|integrity/i.test(title)) {
    shape = <><path d="m12 3 8 3v5c0 5-5 8-8 10-3-2-8-5-8-10V6Z" /><path d="m8 12 3 3 5-6" /></>;
  } else if (/migration|offline|update/i.test(title)) {
    shape = <><path d="M4 8h15l-4-4M20 16H5l4 4M19 8v3M5 16v-3" /></>;
  } else if (/search|seo|found|index/i.test(title)) {
    shape = <><circle cx="10" cy="10" r="6" /><path d="m15 15 6 6M7 10h6M10 7v6" /></>;
  } else if (/api|integrat|structured|data/i.test(title)) {
    shape = <><circle cx="5" cy="12" r="2.5" /><circle cx="18" cy="5" r="2.5" /><circle cx="18" cy="19" r="2.5" /><path d="m7 11 9-5M7 13l9 5" /></>;
  } else if (/monitor|visibility|vitals|grow|performance|volume/i.test(title)) {
    shape = <><path d="M3 4v16h18M6 14h3l3-6 3 8 3-4h3" /></>;
  } else if (/ios|android|app|store|push/i.test(title) && !/storefront/i.test(title)) {
    shape = <><rect x="6" y="2" width="12" height="20" rx="2" /><path d="M10 5h4M11 18h2" /></>;
  } else if (/content|audit|evidence|writing|document/i.test(title)) {
    shape = <><path d="M6 3h9l4 4v14H6ZM14 3v5h5M9 12h7M9 16h5" /></>;
  } else if (/owns|code|infrastructure/i.test(title)) {
    shape = <><path d="m7 7-5 5 5 5m10-10 5 5-5 5M14 4l-4 16" /></>;
  }
  return <span className={styles.icon} aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">{shape}</svg></span>;
}

/** Shared deliverables section for every service template. */
export function ServiceDeliverables({ items, title = "What we deliver" }: { items: readonly Deliverable[]; title?: string }) {
  const heading = title.charAt(0).toUpperCase() + title.slice(1).replace(/\.$/, "");
  return <section className={styles.section} aria-label="What you receive">
    <div className={styles.inner}>
      <header className={styles.heading}>
        <span className={styles.kicker}>What you receive</span>
        <h2><ServiceTitle label={heading} />.</h2>
        <p>We agree the scope with you before development starts.</p>
      </header>
      <div className={styles.grid}>
        {items.map((item, index) => <article className={styles.card} key={item.title}>
          <DeliveryIcon title={item.title} />
          <span className={styles.number} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
          <div className={styles.content}>
            <h3><ServiceTitle label={item.title} /></h3>
            <p>{item.body}</p>
          </div>
        </article>)}
      </div>
    </div>
  </section>;
}
