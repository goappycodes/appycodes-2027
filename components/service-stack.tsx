import styles from "./institutional-service-page.module.css";

type Technology = { name: string; icon?: string };
const tech = (name: string, icon?: string): Technology => ({ name, icon });
const STACKS: Record<string, Technology[]> = {
  "product-engineering": [tech("React", "react"), tech("Next.js", "nextdotjs"), tech("TypeScript", "typescript"), tech("Node.js", "nodedotjs"), tech("Python", "python"), tech("Django", "django"), tech("Laravel", "laravel"), tech("PostgreSQL", "postgresql"), tech("Supabase", "supabase"), tech("REST APIs")],
  "native-mobile": [tech("React Native", "react"), tech("Flutter", "flutter"), tech("Expo", "expo"), tech("Google Play", "googleplay"), tech("Apple / iOS", "apple"), tech("Android", "android"), tech("TypeScript", "typescript"), tech("REST APIs")],
  "ai-systems": [tech("Python", "python"), tech("Claude", "anthropic"), tech("LLM APIs"), tech("PostgreSQL", "postgresql"), tech("Supabase", "supabase"), tech("Redis", "redis"), tech("Docker", "docker"), tech("REST APIs")],
  "rescue-hardening": [tech("Cloudflare", "cloudflare"), tech("WordPress", "wordpress"), tech("Laravel", "laravel"), tech("Node.js", "nodedotjs"), tech("Supabase", "supabase"), tech("Docker", "docker"), tech("GitHub Actions", "githubactions"), tech("Sentry", "sentry")],
  "commerce-content": [tech("Shopify", "shopify"), tech("WooCommerce", "woocommerce"), tech("WordPress", "wordpress"), tech("Next.js", "nextdotjs"), tech("Sanity", "sanity"), tech("Stripe", "stripe"), tech("React", "react"), tech("REST APIs")],
  "performance-search": [tech("Search Console", "googlesearchconsole"), tech("Google Analytics", "googleanalytics"), tech("Lighthouse", "lighthouse"), tech("Cloudflare", "cloudflare"), tech("Next.js", "nextdotjs"), tech("WordPress", "wordpress"), tech("React", "react"), tech("Redis", "redis")],
};

export function ServiceStack({ slug }: { slug: string }) {
  const technologies = STACKS[slug];
  if (!technologies) return null;
  return <section className={styles.stackSection} aria-label="Technologies we work with">
    <div className={styles.inner}>
      <header className={styles.stackHeading}><div><span className={styles.kicker}>Tools & platforms</span><h2>Technologies we work with.</h2></div><p>Selected to fit your product, existing systems and delivery requirements.</p></header>
      <ul className={styles.stackLogos}>
        {technologies.map(({ name, icon }) => <li key={name}>
          {icon ? <img src={`/images/stack/${icon}.svg`} alt="" width="28" height="28" loading="lazy" /> : <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="m8 6-6 6 6 6m8-12 6 6-6 6m-3-14-2 16" /></svg>}
          <span>{name}</span>
        </li>)}
      </ul>
    </div>
  </section>;
}
