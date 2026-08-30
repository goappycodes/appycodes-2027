// Single source of truth for site-wide constants used across the rebrand.
export const DELIVERY_SUMMARY = "300 projects delivered across a large number of sectors.";
export const PROJECTS_DELIVERED = "300";

export const SITE = {
  name: "Appycodes",
  url: "https://appycodes.dev",
  email: "hello@appycodes.com",
  founded: 2015,
  contactHref: "/contact/",
} as const;

export const NAV = [
  { label: "Work", href: "/case-studies/" },
  { label: "Clients", href: "/clients/" },
  { label: "Services", href: "/services/" },
  { label: "Sectors", href: "/sectors/" },
  { label: "Writing", href: "/blog/" },
  { label: "About", href: "/about/" },
] as const;

// Recognition badges (real, from the existing site). Icon-only marks keep a
// thin name; wordmark logos carry their own name so the caption is dropped.
// All render as a white silhouette on the dark hero for a uniform strip.
export const AWARDS = [
  { img: "/images/award-clutch.png", by: "Clutch", name: true },
  { img: "/images/award-pph.png", by: "PeoplePerHour", name: false },
  { img: "/images/award-google.png", by: "Google", name: false },
  { img: "/images/award-glassdoor.svg", by: "Glassdoor", name: false },
  { img: "/images/award-aws.svg", by: "AWS", name: false },
  { img: "/images/award-payoneer.svg", by: "Payoneer", name: false },
  { img: "/images/award-iso.png", by: "ISO 9001 & 27001", name: false },
  { img: "/images/award-startup-india.png", by: "Startup India", name: false },
  { img: "/images/award-sanmarg.png", by: "Sanmarg Business Awards", name: false },
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

// Every review below is a verified, published client review from our Clutch
// profile — https://clutch.co/profile/appycodes. Quotes are reproduced verbatim
// from Clutch, and each `url` is the canonical Clutch permalink for that review,
// so a reader can open the original in full. All 18 are rated 5.0 / 5.0.
export type Review = {
  /** Verbatim pull-quote as published on Clutch. */
  quote: string;
  /** Reviewer name, or "Anonymous" where Clutch withholds it. */
  name: string;
  /** Title + company, as given on Clutch. */
  role: string;
  /** Reviewer location, a trust signal (city / country). */
  location: string;
  /** Our short descriptor of the engagement the review came out of. */
  project: string;
  /** Friendly month + year, e.g. "Jul 2024". */
  date: string;
  /** ISO date of the review, for schema.org datePublished. */
  iso: string;
  /** Canonical Clutch permalink to the full review. */
  url: string;
  /** True where Clutch withholds the reviewer's name. */
  anonymous?: boolean;
  /** A local avatar photo, where we have one; otherwise a monogram is shown. */
  avatar?: string;
  /** A matching case study on this site, where one exists. */
  caseHref?: string;
};

const CLUTCH = (id: string) =>
  `https://clutch.co/go-to-review/c3c7d352-ac7e-4b02-b3d5-4ca32b8e99f4/${id}`;

// Named, recognisable reviews lead; the anonymous ones follow. The homepage rail
// and the compact `Testimonials` grid read from the top of this list.
export const REVIEWS: Review[] = [
  {
    quote: "They have a deeper technical knowledge than any web designer I've met to date.",
    name: "Charles Montgomery",
    role: "Owner & President, Northwest eSource",
    location: "Portland, Oregon",
    project: "Custom e-commerce platform build",
    date: "Apr 2019",
    iso: "2019-04-13",
    url: CLUTCH("88282"),
    avatar: "/images/avatar-charles.png",
  },
  {
    quote: "They worked fast and were very honest about delivery times.",
    name: "Josh Wood",
    role: "CEO, Bloc",
    location: "Loddon, England",
    project: "Bloc — app, backend & marketplace",
    date: "Oct 2022",
    iso: "2022-10-24",
    url: CLUTCH("163677"),
    avatar: "/images/avatar-josh.png",
    caseHref: "/case-studies/bloc/",
  },
  {
    quote:
      "Their speed and efficiency in completing the tasks on time, knowing that quality results will be delivered, is impressive.",
    name: "Simon Jones",
    role: "Head of Operations & Marketing, Miromedia",
    location: "United Kingdom",
    project: "Multiple web builds for a marketing agency",
    date: "Oct 2022",
    iso: "2022-10-23",
    url: CLUTCH("163511"),
    avatar: "/images/avatar-simon.png",
  },
  {
    quote:
      "Appycodes' team blew us away with their efficiency, clarity, and remarkably good overall service.",
    name: "Gus McDougall",
    role: "Owner, Growth Interactive",
    location: "Royal Leamington Spa, England",
    project: "E-commerce & web build for a design studio",
    date: "Apr 2023",
    iso: "2023-04-19",
    url: CLUTCH("195932"),
    avatar: "/images/avatar-gus.png",
  },
  {
    quote:
      "The most impressive thing about Appycodes is the quality of engineers because they can build anything.",
    name: "Rahul Aluri",
    role: "CEO, Wellness & Fitness SaaS",
    location: "Wilmington, Delaware",
    project: "Mobile app, web & APIs for a fitness SaaS",
    date: "Jul 2024",
    iso: "2024-07-01",
    url: CLUTCH("297547"),
  },
  {
    quote:
      "Their understanding of our needs, even though they have little knowledge of our market, was outstanding.",
    name: "Krys Lange",
    role: "Service Delivery Manager, Professional Energy Services",
    location: "United Kingdom",
    project: "Custom software for an energy consultancy",
    date: "Jun 2024",
    iso: "2024-06-25",
    url: CLUTCH("296558"),
    caseHref: "/case-studies/professional-energy/",
  },
  {
    quote:
      "Ritesh and the team were always reliable, produced excellent work, and guided me through many unknown areas.",
    name: "Lou Rice",
    role: "Founder, The Sauce",
    location: "Sydney, Australia",
    project: "Website & app for a consumer platform",
    date: "Aug 2024",
    iso: "2024-08-30",
    url: CLUTCH("311001"),
  },
  {
    quote: "Appycodes' enthusiasm and positive attitude are impressive.",
    name: "Ovais Hemani",
    role: "Head of Performance Marketing, PlusHeat",
    location: "London, England",
    project: "SEO & growth for a home-cover provider",
    date: "Jan 2026",
    iso: "2026-01-20",
    url: CLUTCH("430960"),
    caseHref: "/case-studies/plusheat/",
  },
  {
    quote: "I was most impressed by their advice and their alignment with our goals.",
    name: "Abhishek Gupta",
    role: "Executive, Consulting Company",
    location: "Columbus, Ohio",
    project: "MVP web & app for a consultancy",
    date: "Oct 2022",
    iso: "2022-10-23",
    url: CLUTCH("163536"),
  },
  {
    quote: "Their honesty and good faith are the best warranty.",
    name: "Maxime William",
    role: "Founder, MW Ltd",
    location: "Brussels, Belgium",
    project: "Custom software for a services firm",
    date: "Jul 2024",
    iso: "2024-07-23",
    url: CLUTCH("302501"),
  },
  {
    quote:
      "Thanks to Appycodes, our company is now more profitable from accomplishing several projects.",
    name: "Arup Sarkar",
    role: "Team Leader, Software Company",
    location: "India",
    project: "Web development & SEO",
    date: "Oct 2022",
    iso: "2022-10-22",
    url: CLUTCH("163496"),
  },
  {
    quote: "They went out of their way to match our deadlines.",
    name: "Gunjan Shah",
    role: "Co-Founder & CEO, Allrounder Cup",
    location: "Bengaluru, India",
    project: "Cross-platform build for an edtech startup",
    date: "May 2022",
    iso: "2022-05-12",
    url: CLUTCH("18799"),
  },
  {
    quote:
      "Their ability to build a customized solution and offer great value for money was impressive.",
    name: "Anonymous",
    role: "Managing Director, Marketing Agency",
    location: "Nottingham, England",
    project: "Ticketing platform for a marketing agency",
    date: "Oct 2022",
    iso: "2022-10-26",
    url: CLUTCH("163948"),
    anonymous: true,
  },
  {
    quote:
      "The transparent way that we work together and the ideas from Appycodes made our goals achievable faster and better.",
    name: "Anonymous",
    role: "Managing Director, Educational Platform",
    location: "Cork, Ireland",
    project: "Web & SEO for an education platform",
    date: "Oct 2022",
    iso: "2022-10-23",
    url: CLUTCH("163532"),
    anonymous: true,
  },
  {
    quote:
      "They helped us build a much stronger platform for attracting and converting quality leads.",
    name: "Anonymous",
    role: "Head of Inbound Marketing, Software Company",
    location: "Malta",
    project: "Platform build for a software company",
    date: "Apr 2019",
    iso: "2019-04-28",
    url: CLUTCH("95864"),
    anonymous: true,
  },
  {
    quote: "AppyCodes Digital is one of the better companies we've engaged with.",
    name: "Anonymous",
    role: "Director, Digital Agency",
    location: "Southampton, England",
    project: "Bespoke build for a digital agency",
    date: "Apr 2019",
    iso: "2019-04-15",
    url: CLUTCH("88761"),
    anonymous: true,
  },
  {
    quote:
      "Appycodes has always supported us on time during any emergency and holiday times as well.",
    name: "Anonymous",
    role: "Director, Food Delivery Company",
    location: "United Kingdom",
    project: "Web development for a food-delivery company",
    date: "Oct 2022",
    iso: "2022-10-31",
    url: CLUTCH("164496"),
    anonymous: true,
  },
  {
    quote: "Appycodes have given us excellent service over the years for affordable prices.",
    name: "Anonymous",
    role: "Founder, E-Commerce Company",
    location: "Meppen, Germany",
    project: "E-commerce build & ongoing support",
    date: "Oct 2022",
    iso: "2022-10-27",
    url: CLUTCH("164069"),
    anonymous: true,
  },
];

/** Appycodes' Clutch profile — the source and canonical home of every review. */
export const CLUTCH_PROFILE = "https://clutch.co/profile/appycodes";

/** Headline numbers from the Clutch profile, all reviews rated 5.0 / 5.0. */
export const CLUTCH_STATS = { rating: "5.0", count: REVIEWS.length } as const;

/** Up-to-two-letter monogram for an avatar, from a name or role seed. */
export function reviewInitials(seed: string): string {
  const words = seed.replace(/[^A-Za-z ]/g, " ").split(/\s+/).filter(Boolean);
  if (words.length === 0) return "AC";
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

/** How a review presents its author — anonymous reviews lead with the role. */
export function reviewIdentity(r: Review): {
  primary: string;
  secondary: string;
  seed: string;
} {
  if (r.anonymous) {
    return { primary: r.role, secondary: `${r.location} · verified client`, seed: r.role };
  }
  return { primary: r.name, secondary: r.role, seed: r.name };
}
