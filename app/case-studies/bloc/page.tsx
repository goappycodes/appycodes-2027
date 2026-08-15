import type { Metadata } from "next";
import { siteMeta } from "@/lib/seo";
import { CaseStudy, type CaseStudyData } from "@/components/case-study";

export const metadata: Metadata = siteMeta({
  title: "Bloc — four years building a UK social events platform",
  description:
    "From one Android engineer to owning the whole Bloc stack: a React Native rebuild, the backend, a TikTok-style ads manager, and a BLOCCoin Algorand marketplace.",
  path: "/case-studies/bloc/",
  image: "/images/bloc-6.png",
});

const data: CaseStudyData = {
  crumb: "Bloc",
  path: "/case-studies/bloc/",
  title: (
    <>
      <span className="name">Bloc</span> — one of the <span className="caps">UK</span>’s newest social events platforms.
    </>
  ),
  lede:
    "Hired as one Android engineer. Now we own the React Native app, the backend, the ads manager, the BLOCCoin marketplace, and the web front.",
  facts: [
    { label: "Client", value: "Bloc, Social Events & Rewards" },
    { label: "Sector", value: "UK nightlife, social events" },
    { label: "Engagement", value: "4+ years, ongoing" },
    { label: "Owned", value: "App, backend, ads, marketplace, web" },
  ],
  links: [
    { label: "getonbloc.com", href: "https://getonbloc.com/" },
    { label: "App Store", href: "https://apps.apple.com/gb/app/bloc-social-events-rewards/id870870144" },
    { label: "Google Play", href: "https://play.google.com/store/apps/details?id=uk.co.createanet.bloc" },
  ],
  stats: [
    { n: "4+ yrs", label: "ongoing partnership" },
    { n: "500K+", label: "lines shipped" },
    { n: "4", label: "platforms: iOS, Android, web, Algorand" },
    { n: "6", label: "codebases owned" },
  ],
  blocks: [
    {
      t: "gallery",
      title: "the app, rebuilt on react native.",
      shots: [
        { src: "/images/bloc-app-explore.jpg", alt: "Bloc explore feed" },
        { src: "/images/bloc-app-map.jpg", alt: "Bloc events map" },
        { src: "/images/bloc-app-people.jpg", alt: "Bloc people grid" },
        { src: "/images/bloc-app-checkin.jpg", alt: "Bloc check-in" },
        { src: "/images/bloc-app-checkin-filled.jpg", alt: "Bloc check-in done" },
      ],
    },
    {
      t: "gallery",
      title: "a tiktok-style ads platform, built from scratch.",
      shots: [
        { src: "/images/bloc-ads-bite.png", alt: "Bloc Bites ad placement" },
        { src: "/images/bloc-ads-news.png", alt: "Bloc sponsored news placement" },
        { src: "/images/bloc-ads-listing.png", alt: "Bloc premium listing" },
      ],
    },
    {
      t: "section",
      title: "blocCoin, live on algorand.",
      lead: "A real on-chain rewards marketplace — coins earned in-app, spent with partners, settled on-chain with the same discipline as a payments flow.",
    },
  ],
  stack: [
    { layer: "Mobile", value: "React Native (rebuilt from Swift + Java)" },
    { layer: "App backend", value: "Java Struts, DynamoDB" },
    { layer: "Ads manager", value: "Next.js, Node (Express), PostgreSQL, Python profiling" },
    { layer: "Marketing + token", value: "WordPress front; Algorand (BLOCCoin as ASA)" },
  ],
  outcomes: [
    "A four-year, still-growing partnership across every major surface.",
    "The app rebuilt once, ending the two-codebase maintenance tax.",
    "A full ads manager shipped from scratch, targeting to reporting.",
    "BLOCCoin live on Algorand as a real on-chain marketplace.",
  ],
  cta: "want a partner that compounds, not churns?",
};

export default function BlocCaseStudy() {
  return <CaseStudy data={data} />;
}
