import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export function ArrowRight({ className, ...p }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" className={className} {...base} {...p}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function ArrowUpRight({ className, ...p }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" className={className} {...base} {...p}>
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

export function Check({ className, ...p }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" className={className} {...base} {...p}>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export function Close({ className, ...p }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" className={className} {...base} {...p}>
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

export function Dash({ className, ...p }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" className={className} {...base} {...p}>
      <path d="M5 12h14" />
    </svg>
  );
}

export function Plus({ className, ...p }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" className={className} {...base} {...p}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function Menu({ className, ...p }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" className={className} {...base} {...p}>
      <path d="M3 6h18M3 12h18M3 18h18" />
    </svg>
  );
}

export function Minus({ className, ...p }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" className={className} {...base} {...p}>
      <path d="M5 12h14" />
    </svg>
  );
}

export function Mail({ className, ...p }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" className={className} {...base} {...p}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3.5 7 8.5 6 8.5-6" />
    </svg>
  );
}

export function Chevron({ className, ...p }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" className={className} {...base} {...p}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function ChevronRight({ className, ...p }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" className={className} {...base} {...p}>
      <path d="m9 5 7 7-7 7" />
    </svg>
  );
}

export function Gauge({ className, ...p }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" className={className} {...base} {...p}>
      <path d="M4 16a8 8 0 0 1 16 0" />
      <path d="M12 16l4.2-3.1" />
      <circle cx="12" cy="16" r="1.15" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function StarHalf({ className, ...p }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" className={className} aria-hidden {...p}>
      <defs>
        <linearGradient id="sh">
          <stop offset="50%" stopColor="currentColor" />
          <stop offset="50%" stopColor="currentColor" stopOpacity="0.25" />
        </linearGradient>
      </defs>
      <path
        fill="url(#sh)"
        d="M12 2.5l2.9 5.9 6.5.95-4.7 4.58 1.11 6.47L12 17.93l-5.81 3.05 1.11-6.47-4.7-4.58 6.5-.95z"
      />
    </svg>
  );
}

export function Star({ className, ...p }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" className={className} fill="currentColor" aria-hidden {...p}>
      <path d="M12 2.5l2.9 5.9 6.5.95-4.7 4.58 1.11 6.47L12 17.93l-5.81 3.05 1.11-6.47-4.7-4.58 6.5-.95z" />
    </svg>
  );
}

/* ---- Region flags (crisp inline SVG — emoji flags render as letters on
   Windows, so they are drawn here for a consistent, premium look). Decorative;
   the surrounding group carries the accessible label. The CSS wrapper (.flag)
   is a circle with overflow hidden; "slice" scales each flag to cover it while
   keeping its true proportions, so the coin reads undistorted. ---- */

export function FlagUK({ className, ...p }: IconProps) {
  return (
    <svg viewBox="0 0 60 40" className={className} aria-hidden preserveAspectRatio="xMidYMid slice" {...p}>
      <rect width="60" height="40" fill="#012169" />
      <path d="M0 0 L60 40 M60 0 L0 40" stroke="#fff" strokeWidth="8" />
      <path d="M0 0 L60 40 M60 0 L0 40" stroke="#C8102E" strokeWidth="4" />
      <path d="M30 0 V40 M0 20 H60" stroke="#fff" strokeWidth="12" />
      <path d="M30 0 V40 M0 20 H60" stroke="#C8102E" strokeWidth="7" />
    </svg>
  );
}

function euStar(cx: number, cy: number, r: number) {
  const inner = r * 0.382;
  let d = "";
  for (let i = 0; i < 10; i++) {
    const rad = i % 2 === 0 ? r : inner;
    const a = ((-90 + i * 36) * Math.PI) / 180;
    d += (i === 0 ? "M" : "L") + (cx + rad * Math.cos(a)).toFixed(2) + " " + (cy + rad * Math.sin(a)).toFixed(2);
  }
  return d + "Z";
}

export function FlagEU({ className, ...p }: IconProps) {
  return (
    <svg viewBox="0 0 60 40" className={className} aria-hidden preserveAspectRatio="xMidYMid slice" {...p}>
      <rect width="60" height="40" fill="#003399" />
      {Array.from({ length: 12 }).map((_, i) => {
        const a = ((-90 + i * 30) * Math.PI) / 180;
        return <path key={i} d={euStar(30 + 12.5 * Math.cos(a), 20 + 12.5 * Math.sin(a), 2.7)} fill="#FFCC00" />;
      })}
    </svg>
  );
}

export function FlagIndia({ className, ...p }: IconProps) {
  // Tricolour + 24-spoke Ashoka Chakra. Cropped to a circle by .flag, so the
  // chakra sits dead-centre and the bands read as three even thirds.
  const cx = 30;
  const cy = 20;
  const r = 5.6;
  return (
    <svg viewBox="0 0 60 40" className={className} aria-hidden preserveAspectRatio="xMidYMid slice" {...p}>
      <rect width="60" height="40" fill="#fff" />
      <rect width="60" height="13.34" fill="#FF9933" />
      <rect y="26.66" width="60" height="13.34" fill="#138808" />
      {Array.from({ length: 24 }).map((_, i) => {
        const a = (i * 15 * Math.PI) / 180;
        return (
          <line
            key={i}
            x1={cx}
            y1={cy}
            x2={cx + r * Math.cos(a)}
            y2={cy + r * Math.sin(a)}
            stroke="#000080"
            strokeWidth="0.5"
          />
        );
      })}
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#000080" strokeWidth="0.8" />
      <circle cx={cx} cy={cy} r="1.1" fill="#000080" />
    </svg>
  );
}
