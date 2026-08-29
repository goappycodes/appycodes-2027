import Link from "next/link";
import { SITE } from "@/lib/site";
import { PageHero } from "@/components/page-hero";

export type LegalSection = { id: string; h: string; body: string[] };

/**
 * Shared layout for the policy pages: sticky contents rail on the left, the
 * document body on the right, and a summary card so the gist is readable
 * without working through the whole thing.
 */
export function LegalPage({
  crumb,
  title,
  lede,
  updated,
  summary,
  sections,
}: {
  crumb: string;
  title: string;
  lede: string;
  updated: string;
  summary: string[];
  sections: LegalSection[];
}) {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: crumb }]}
        eyebrow={`last updated ${updated}`}
        title={title}
        lede={lede}
      />

      <section className="wrap sec">
        <div className="legal">
          <aside className="legal__toc">
            <p className="legal__toc-lbl">on this page</p>
            <ol>
              {sections.map((s, i) => (
                <li key={s.id}>
                  <a href={`#${s.id}`}>
                    <span className="tnum">{String(i + 1).padStart(2, "0")}</span>
                    {s.h}
                  </a>
                </li>
              ))}
            </ol>
            <Link className="btn btn--out btn--sm notch legal__ask" href="/contact/">
              Ask us a question
            </Link>
          </aside>

          <div className="legal__body">
            <div className="legal__summary notch">
              <p className="legal__summary-lbl">the short version</p>
              <ul>
                {summary.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>

            {sections.map((s, i) => (
              <section key={s.id} id={s.id} className="legal__sec">
                <h2>
                  <span className="tnum legal__n">{String(i + 1).padStart(2, "0")}</span>
                  {s.h}
                </h2>
                {s.body.map((p, j) => (
                  <p key={j}>{p}</p>
                ))}
              </section>
            ))}

            <div className="legal__foot notch">
              <p>
                Questions about anything on this page? Write to{" "}
                <a href={`mailto:${SITE.email}`}>{SITE.email}</a> and a person will answer.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
