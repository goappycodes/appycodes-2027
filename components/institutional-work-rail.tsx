import Link from "next/link";
import { Rail } from "@/components/rail";
import { ClientLogo } from "@/components/client-logo";
import styles from "./home-concepts.module.css";
import type { InstitutionalWorkItem } from "@/lib/work-cards";

export type { InstitutionalWorkItem } from "@/lib/work-cards";

function Arrow() {
  return <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h11M10.5 5.5 15 10l-4.5 4.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

export function InstitutionalWorkRail({ items, label = "Selected case studies" }: { items: InstitutionalWorkItem[]; label?: string }) {
  return (
    <Rail label={label} className={styles.workGrid} scrollSmallSets={items.length === 2}>
      {items.map((item, index) => (
        <Link href={item.href} className={styles.workCard} key={item.client}>
          <div className={styles.workImage}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={item.image} alt={`${item.client} product interface`} loading="lazy" />
            <span>{String(index + 1).padStart(2, "0")}</span>
          </div>
          <div className={styles.workBody}>
            <div className={styles.workMeta}>
              <ClientLogo href={item.href} name={item.client} />
              <span>{item.sector}</span>
            </div>
            <h3>{item.title}</h3>
            <p>{item.detail}</p>
            <div className={styles.workFoot}>
              <div><strong>{item.metric}</strong><small>{item.metricLabel}</small></div>
              <span className={styles.circleArrow}><Arrow /></span>
            </div>
          </div>
        </Link>
      ))}
    </Rail>
  );
}
