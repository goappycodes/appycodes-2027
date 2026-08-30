import { TechnologyList } from "./technology-list";
import styles from "./institutional-service-page.module.css";

const STACKS: Record<string, string[]> = {
  "product-engineering": ["React", "Next.js", "TypeScript", "Node.js", "Python", "Django", "Laravel", "PostgreSQL", "Supabase", "REST APIs"],
  "native-mobile": ["React Native", "Flutter", "Expo", "Google Play", "Apple / iOS", "Android", "TypeScript", "REST APIs"],
  "ai-systems": ["Python", "Claude", "LLM APIs", "PostgreSQL", "Supabase", "Redis", "Docker", "REST APIs"],
  "rescue-hardening": ["Cloudflare", "WordPress", "Laravel", "Node.js", "Supabase", "Docker", "GitHub Actions", "Sentry"],
  "commerce-content": ["Shopify", "WooCommerce", "WordPress", "Next.js", "Sanity", "Stripe", "React", "REST APIs"],
  "performance-search": ["Search Console", "Google Analytics", "Lighthouse", "Cloudflare", "Next.js", "WordPress", "React", "Redis"],
};

export function ServiceStack({ slug }: { slug: string }) {
  const technologies = STACKS[slug];
  if (!technologies) return null;
  return <section className={styles.stackSection} aria-label="Technologies we work with">
    <div className={styles.inner}>
      <header className={styles.stackHeading}><div><span className={styles.kicker}>Tools & platforms</span><h2>Technologies we work with.</h2></div><p>Selected to fit your product, existing systems and delivery requirements.</p></header>
      <TechnologyList items={technologies} grid />
    </div>
  </section>;
}
