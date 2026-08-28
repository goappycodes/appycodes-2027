import { reviewInitials } from "@/lib/site";

/**
 * A monogram avatar — the reviewer's initials in a brand-gradient coin. Used as
 * a graceful stand-in for the (many) verified Clutch reviewers who publish
 * without a photo, so a wall of quotes never reads as a wall of missing images.
 */
export function Monogram({ seed, className = "" }: { seed: string; className?: string }) {
  return (
    <span className={`mono ${className}`} aria-hidden="true">
      {reviewInitials(seed)}
    </span>
  );
}
