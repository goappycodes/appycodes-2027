import { technologyFor } from "@/lib/technologies";
import styles from "./technology-list.module.css";

export function TechnologyList({ items, grid = false }: { items: readonly string[]; grid?: boolean }) {
  return <ul className={`${styles.list} ${grid ? styles.grid : ""}`}>
    {items.map((item) => {
      const technology = technologyFor(item);
      return <li key={item}>
        {technology.logo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img className={technology.wide ? styles.wordmark : undefined} src={technology.logo} alt="" width="24" height="24" loading="lazy" />
        ) : <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          {technology.symbol === "document" ? <path d="M6 3h9l4 4v14H6ZM14 3v5h5M9 12h7M9 16h5" /> : <path d="m8 6-6 6 6 6m8-12 6 6-6 6m-3-14-2 16" />}
        </svg>}
        <span>{technology.name}</span>
      </li>;
    })}
  </ul>;
}
