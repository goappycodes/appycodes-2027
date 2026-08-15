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
