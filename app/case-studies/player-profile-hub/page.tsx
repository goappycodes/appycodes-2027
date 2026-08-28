import type { Metadata } from "next";
import { siteMeta } from "@/lib/seo";
import { CaseStudy, type CaseStudyData } from "@/components/case-study";

export const metadata: Metadata = siteMeta({
  title: "Player Profile Hub — a safeguarded profile platform for grassroots football",
  description:
    "We built Player Profile Hub from the ground up — a web app and native mobile app where young footballers create a verified digital profile, capture highlight moments and get discovered by coaches, with document verification and safeguarding built in from the first screen. FIFA-style player cards, five profile tiers, a filterable Hub and a highlight feed.",
  path: "/case-studies/player-profile-hub/",
  image: "/images/pph-featured.png",
});

const data: CaseStudyData = {
  crumb: "Player Profile Hub",
  path: "/case-studies/player-profile-hub/",
  title: (
    <>
      the safeguarded football-profile platform, <span className="name">Player Profile Hub</span>.
    </>
  ),
  lede:
    "Player Profile Hub (PPH) is “the UK's safeguarded profile platform for grassroots football.” We built it from the ground up — web and native app — so a young player can create a verified digital profile, capture highlight moments and be discovered by coaches, with verification and safeguarding built in from the first screen rather than bolted on at the end.",
  facts: [
    { label: "Client", value: "Player Profile Hub (PPH) — UK" },
    { label: "Sector", value: "Sports · grassroots football" },
    { label: "Engagement", value: "Built from the ground up, launching 2026" },
    { label: "Surfaces", value: "Responsive web app + iOS & Android" },
    { label: "Focus", value: "Safeguarding-first — verified profiles for youth football" },
  ],
  stats: [
    { n: "0→1", label: "built from the ground up" },
    { n: "3", label: "surfaces — web, iOS, Android" },
    { n: "5", label: "profile tiers, Standard → Platinum" },
    { n: "verified", label: "safeguarding built in, not bolted on" },
  ],
  blocks: [
    {
      t: "figure",
      src: "/images/pph-featured.png",
      alt: "Player Profile Hub across desktop and mobile — the Hub, discovery grid and profile",
      caption:
        "One product, three surfaces — the web Hub and discovery grid, and the native app where players capture and share highlights.",
    },
    {
      t: "section",
      title: "a profile platform where the players are children.",
      lead:
        "Most “build your profile” products can treat trust as a feature. PPH cannot: the users are young footballers and their parents, so verification, safeguarding and who-can-see-what are the product, not a setting. We built the whole thing from scratch — a web app and a React Native mobile app — around that constraint: verified profiles, a highlight feed a parent is comfortable with, and a discovery engine that lets coaches find players without turning children into a searchable database.",
    },
    {
      t: "cards",
      title: "what we built.",
      lead:
        "A social product for a sensitive audience — the polish of a consumer app, with verification and safeguarding underneath every screen.",
      items: [
        {
          title: "Verified player profiles",
          body: "FIFA-style player cards with a PPH rating, position, age, club and dominant foot — the profile a young player actually wants to build and share.",
        },
        {
          title: "The Hub",
          body: "A highlight feed with For You and Followings, filtered by age, position, tier, foot and coach-only, and searchable by name, club or team.",
        },
        {
          title: "Highlight moments",
          body: "Players capture and upload highlight clips; others follow, like, comment and share — with a TikTok-style vertical player on the phone.",
        },
        {
          title: "Verification & safeguarding",
          body: "Document verification and email verification wired in from the first screen, so a profile is trustworthy and a parent can track their child's development safely.",
        },
        {
          title: "Tiers & progression",
          body: "Five profile tiers, Standard through Silver, Gold, Black Elite and Platinum, with an upgrade flow and celebration animations that make progress feel earned.",
        },
        {
          title: "Discovery for coaches",
          body: "A multi-facet filter engine — age, position, dominant foot, tier, coach-only — plus search, so a coach can actually find the right player.",
        },
      ],
    },
    {
      t: "gallery",
      title: "the web app, in production.",
      shots: [
        { src: "/images/pph-discover.jpg", alt: "Player Profile Hub discovery grid with player cards and filters" },
        { src: "/images/pph-hub.jpg", alt: "Player Profile Hub — the highlight feed with For You / Followings and filters" },
        { src: "/images/pph-login.jpg", alt: "Player Profile Hub login with a Gold-tier player card and parent messaging" },
      ],
    },
    {
      t: "gallery",
      title: "on the phone, where the highlights happen.",
      shots: [
        { src: "/images/pph-home.jpg", alt: "Player Profile Hub mobile home — create a verified profile, explore profiles and the Hub" },
        { src: "/images/pph-highlight.jpg", alt: "Player Profile Hub mobile highlight feed with a vertical video player" },
      ],
    },
  ],
  stack: [
    { layer: "Mobile", value: "React Native — iOS & Android" },
    { layer: "Web", value: "Responsive web app — Home, Hub, Discover, Dashboard" },
    { layer: "Highlights", value: "Video upload, feed and per-clip engagement" },
    { layer: "Profiles", value: "Tiered player cards & PPH ratings; player / coach roles" },
    { layer: "Trust", value: "Document verification + email verification" },
    { layer: "Discovery", value: "Multi-facet filtering (age, position, foot, tier) + search" },
    { layer: "Distribution", value: "App Store & Google Play" },
  ],
  outcomes: [
    "A verified, safeguarding-first profile platform for grassroots football — built from the ground up, web and native app.",
    "FIFA-style player cards with PPH ratings and five tiers, so a young player's profile is something they want to build.",
    "A highlight feed — upload, follow, like and share — with a TikTok-style vertical player on mobile.",
    "Document and email verification wired in from the first screen, because the users are children and their parents.",
    "A multi-facet discovery engine (age, position, foot, tier, coach-only) so coaches can actually find players.",
    "Built to clear App Store review for a safeguarding-sensitive app — icons, sandbox accounts and the review dialogue that a families' app demands.",
  ],
  cta: "building a platform where trust is the product?",
};

export default function PlayerProfileHubCaseStudy() {
  return <CaseStudy data={data} />;
}
