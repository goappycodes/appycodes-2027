import { Fragment } from "react";

// Abbreviations that must render uppercase, so "ai systems" reads "AI systems".
// .caps forces uppercase regardless of the surrounding case treatment.
const CAPS = new Set([
  "ai", "api", "seo", "saas", "ui", "ux", "ci", "cd", "cms",
  "rag", "crm", "b2b", "b2c", "ios", "sql", "url", "eas",
]);

/**
 * Renders a label keeping known abbreviations uppercase, so "AI systems" reads
 * "AI systems" and "ai features" reads "AI features". Other tokens render as
 * written; the first letter is capitalised by CSS where the label is a heading.
 */
export function ServiceTitle({ label }: { label: string }) {
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
