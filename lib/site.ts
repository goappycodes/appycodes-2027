// Single source of truth for site-wide constants used across the rebrand.

export const SITE = {
  name: "Appycodes",
  url: "https://appycodes.dev",
  email: "hello@appycodes.com",
  founded: 2015,
  contactHref: "/contact/",
} as const;

export const NAV = [
  { label: "work", href: "/case-studies/" },
  { label: "services", href: "/services/" },
  { label: "writing", href: "/blog/" },
  { label: "reviews", href: "/reviews/" },
  { label: "about", href: "/about/" },
] as const;

// Recognition badges (real, from the existing site). Icon-only marks keep a
// thin name; wordmark logos carry their own name so the caption is dropped.
export const AWARDS = [
  { img: "/images/award-clutch.png", by: "Clutch", name: true },
  { img: "/images/award-pph.png", by: "PeoplePerHour", name: false },
  { img: "/images/award-google.png", by: "Google", name: false },
  { img: "/images/award-glassdoor.svg", by: "Glassdoor", name: false },
  { img: "/images/award-aws.svg", by: "AWS", name: false },
  { img: "/images/award-payoneer.svg", by: "Payoneer", name: false },
] as const;

// Client logos for the trust strip (dark/mono PNGs, muted → full on hover).
export const CLIENT_LOGOS = [
  { src: "/images/logo-bloc.png", name: "BLOC" },
  { src: "/images/logo-yippeemalta.png", name: "Yippee Malta" },
  { src: "/images/logo-hornetsecurity.png", name: "Hornetsecurity" },
  { src: "/images/logo-khatabook.png", name: "Khatabook" },
  { src: "/images/logo-cultfit.png", name: "Cult.fit" },
  { src: "/images/logo-easyship.png", name: "Easyship" },
  { src: "/images/logo-creoate.png", name: "Creoate" },
  { src: "/images/logo-redbook.png", name: "Redbook" },
  { src: "/images/logo-crescat.png", name: "Crescat" },
  { src: "/images/logo-civic.png", name: "Civic" },
  { src: "/images/logo-inspirelle.png", name: "Inspirelle" },
  { src: "/images/logo-spur-fit.png", name: "Spur.fit" },
] as const;

export const REVIEWS = [
  {
    avatar: "/images/avatar-charles.png",
    name: "Charles Montgomery",
    role: "Owner & President, NW eSource",
    quote: "They have a deeper technical knowledge than any web designer I've met to date.",
  },
  {
    avatar: "/images/avatar-josh.png",
    name: "Josh Wood",
    role: "CEO, BLOC",
    quote: "They transformed my scribbles into a clear strategy with actual numbers.",
  },
  {
    avatar: "/images/avatar-simon.png",
    name: "Simon Jones",
    role: "Head of Ops & Marketing, Meromedia",
    quote: "Their speed and efficiency, knowing quality results will be delivered, is impressive.",
  },
  {
    avatar: "/images/avatar-gus.png",
    name: "Gus McDougall",
    role: "Grow Interactive",
    quote: "They blew us away with their efficiency, clarity, and remarkably good overall service.",
  },
] as const;
