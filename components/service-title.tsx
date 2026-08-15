import { Fragment } from "react";

// Abbreviations that must stay uppercase inside the site's lowercase headline
// system (headings use text-transform: lowercase; .caps forces uppercase back).
const CAPS = new Set([
  "ai", "api", "seo", "saas", "ui", "ux", "ci", "cd", "cms",
  "rag", "crm", "b2b", "b2c", "ios", "sql", "url", "eas",
]);

/**
 * Renders a label keeping known abbreviations uppercase, so "AI systems" reads
 * "AI systems" and "ai features" reads "AI features". Pass `lower` when the
 * surrounding element does NOT already lowercase via CSS (e.g. .h-s, .lede) and
 * you still want the lowercase house style — abbreviations stay uppercase.
 */
export function ServiceTitle({ label, lower = false }: { label: string; lower?: boolean }) {
  const tokens = label.split(" ");
  return (
    <>
      {tokens.map((tok, i) => {
        const bare = tok.replace(/[^a-z0-9]/gi, "").toLowerCase();
        const space = i < tokens.length - 1 ? " " : "";
        const isCaps = CAPS.has(bare);
        return (
          <Fragment key={i}>
            {isCaps ? (
              <span className="caps">{tok}</span>
            ) : lower ? (
              tok.toLowerCase()
            ) : (
              tok
            )}
            {space}
          </Fragment>
        );
      })}
    </>
  );
}
