import type { Metadata } from "next";
import { CaseStudy, type CaseStudyData } from "@/components/case-study";

export const metadata: Metadata = {
  title: "Bloc — four years building a UK social events platform",
  description:
    "How Appycodes went from one Android engineer to owning the whole Bloc engineering stack: a React Native rebuild, the backend, a TikTok-style ads manager, a BLOCCoin Algorand marketplace, and the WordPress front.",
};

const data: CaseStudyData = {
  crumb: "Bloc",
  sector: "Case study · UK · Social events",
  title: (
    <>
      four years building one of the <span className="caps">UK</span>’s most-used social event apps
      for <span className="name">Bloc</span>.
    </>
  ),
  lede:
    "We started as Android engineers. Today we own the React Native app, the backend, the TikTok-style ads manager, the BLOCCoin Algorand marketplace, and the WordPress front. This is what an engineering partnership looks like when it actually compounds.",
  facts: [
    { label: "Client", value: "Bloc, Social Events & Rewards" },
    { label: "Sector", value: "UK nightlife, social events" },
    { label: "Engagement", value: "4+ years, ongoing" },
    { label: "Codebases owned", value: "App, backend, ads, marketplace, WordPress" },
  ],
  links: [
    { label: "getonbloc.com", href: "https://getonbloc.com/" },
    { label: "Apple App Store", href: "https://apps.apple.com/gb/app/bloc-social-events-rewards/id870870144" },
    { label: "Google Play", href: "https://play.google.com/store/apps/details?id=uk.co.createanet.bloc" },
  ],
  stats: [
    { n: "4+ yrs", label: "Ongoing engineering partnership" },
    { n: "500K+", label: "Lines shipped across all platforms" },
    { n: "4", label: "Platforms: iOS, Android, Web, Algorand" },
    { n: "6", label: "Codebases owned end to end" },
  ],
  blocks: [
    {
      t: "section",
      eyebrow: "How it started",
      title: "hired for one thing, trusted with everything.",
      two: [
        "Bloc hired us in 2022 as a single Android engineer writing Java for the existing app. The relationship compounded from there: as we shipped, more of the estate moved to us, until we owned the whole engineering stack — mobile, backend, the ads platform, the marketplace, and the WordPress front.",
        "That trajectory is the point. A partnership that starts narrow and scales wide only happens when each delivery earns the next. Four years in, we are the team the founder calls first for any engineering question, from a product decision to an incident at 2am.",
      ],
    },
    {
      t: "tldr",
      items: [
        { head: "Started narrow, scaled wide.", body: "Hired in 2022 as one Android engineer writing Java. We now own mobile, backend, ads platform, marketplace and the WordPress front." },
        { head: "Rebuilt the app on React Native,", body: "with a modern Gen-Z UI/UX, replacing the legacy native iOS (Swift) + native Android (Java) split that was costing the founder twice the maintenance effort." },
        { head: "Shipped a full TikTok-style ads manager from scratch", body: "on Next.js, Node, Postgres and Python: campaign creation, granular targeting, performance reporting, and ML-driven user-interest profiling." },
        { head: "Launched BLOCCoin on Algorand", body: "as a real on-chain marketplace where users earn coins through the app and spend them with platform partners." },
      ],
    },
    {
      t: "gallery",
      eyebrow: "Stage 1 · The app, rebuilt",
      title: "a react native rebuild with a gen-z ui.",
      lead:
        "The legacy app was two native codebases — Swift and Java — doubling every change. We rebuilt it once, in React Native, with a modern events-first experience: an explore feed, a map view, people, and a fast venue check-in.",
      shots: [
        { src: "/images/bloc-app-explore.jpg", alt: "Bloc explore feed, events near you" },
        { src: "/images/bloc-app-map.jpg", alt: "Bloc events map view" },
        { src: "/images/bloc-app-people.jpg", alt: "Bloc people, meet attendees grid" },
        { src: "/images/bloc-app-checkin.jpg", alt: "Bloc check-in screen with venue and date picker" },
        { src: "/images/bloc-app-checkin-filled.jpg", alt: "Bloc check-in completed state" },
      ],
    },
    {
      t: "gallery",
      eyebrow: "Stage 2 · The ads manager",
      title: "a tiktok-style ads platform, built from scratch.",
      lead:
        "A full self-serve advertising product on Next.js, Node, Postgres and Python: campaign creation, granular targeting, native in-feed placements, performance reporting, and ML-driven interest profiling to decide who sees what.",
      shots: [
        { src: "/images/bloc-ads-bite.png", alt: "Bloc Bites in-app ad placement" },
        { src: "/images/bloc-ads-news.png", alt: "Bloc news feed sponsored placement" },
        { src: "/images/bloc-ads-listing.png", alt: "Bloc premium listing placement" },
      ],
    },
    {
      t: "section",
      eyebrow: "Stage 3 · BLOCCoin on Algorand",
      title: "a real on-chain rewards marketplace.",
      two: [
        "BLOCCoin is a live token economy, not a loyalty-points table. Users earn coins through activity in the app and spend them with platform partners, settled on Algorand as a real on-chain asset.",
        "Building it meant treating the chain as one more integration with hard guarantees: minting, custody, transfer and spend all had to be correct, observable and recoverable — the same engineering discipline we bring to a payments flow.",
      ],
    },
  ],
  stack: [
    { layer: "Mobile (current)", value: "React Native (iOS + Android)" },
    { layer: "Mobile (legacy)", value: "Native Swift (iOS), Native Java (Android)" },
    { layer: "App backend", value: "Java Struts servlet, DynamoDB" },
    { layer: "Ads Manager frontend", value: "Next.js" },
    { layer: "Ads Manager backend", value: "Node.js (Express), PostgreSQL" },
    { layer: "User profiling", value: "Python services" },
    { layer: "Marketing front", value: "WordPress" },
    { layer: "Token economy", value: "Algorand (BLOCCoin as ASA)" },
  ],
  outcomes: [
    "A four-year, still-growing engineering partnership across every major surface of the business.",
    "The app rebuilt once on React Native, ending the two-codebase maintenance tax of the legacy Swift + Java split.",
    "A full TikTok-style ads manager shipped from scratch, with targeting, reporting and ML interest profiling.",
    "BLOCCoin live on Algorand as a real on-chain marketplace, earned in-app and spent with partners.",
    "Six codebases owned end to end, from mobile to backend to marketplace to the WordPress front.",
    "Ongoing: we run day-to-day engineering and are the first call for any technical decision.",
  ],
  cta: "want a partner that compounds, not churns?",
};

export default function BlocCaseStudy() {
  return <CaseStudy data={data} />;
}
