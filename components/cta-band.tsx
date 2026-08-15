import Link from "next/link";
import { SITE } from "@/lib/site";

export function CtaBand({
  eyebrow,
  title = "tell us what you are trying to build.",
  primaryLabel = "book a call",
}: {
  eyebrow?: string;
  title?: string;
  primaryLabel?: string;
}) {
  return (
    <section className="cta">
      <svg className="art cta-art" viewBox="0 0 400 400" fill="none" aria-hidden="true">
        <path d="M40 120 h220 l100 100 v220 h-320 z" stroke="currentColor" strokeWidth="2.5" />
        <path d="M110 190 h150 l60 60 v150 h-210 z" stroke="currentColor" strokeWidth="2" opacity=".6" />
      </svg>
      <div className="wrap cta__in">
        <div className="cta__t">
          <h2 className="h-l">{title.toLowerCase()}</h2>
          <p>{eyebrow ?? "A thirty-minute call with the engineer who would run it."}</p>
        </div>
        <Link className="cta__btn notch" href={SITE.contactHref}>
          {primaryLabel.toLowerCase()}
        </Link>
      </div>
    </section>
  );
}
