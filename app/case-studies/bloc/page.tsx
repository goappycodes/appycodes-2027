import type { Metadata } from "next";
import { siteMeta } from "@/lib/seo";
import { CaseStudy, type CaseStudyData } from "@/components/case-study";

export const metadata: Metadata = siteMeta({
  title: "Bloc — four years running a UK social-events estate",
  description:
    "From one Android engineer to owning the whole Bloc estate: a React Native rebuild with a Spotify-Wrapped-style BLOC Replay, the DynamoDB backend, the Bloc Command ops tool, a TikTok-style ads manager, and a BLOCCoin marketplace live on Algorand.",
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
    "Hired as one Android engineer, we now run the whole estate — the React Native app, the backend, the Bloc Command ops tool, a self-serve ads manager, a BLOCCoin marketplace on Algorand, and the web front. Four years in, still shipping headline features.",
  facts: [
    { label: "Client", value: "Bloc — Social Events & Rewards" },
    { label: "Sector", value: "UK nightlife & social events" },
    { label: "Engagement", value: "4+ years, ongoing" },
    { label: "Owned", value: "App, backend, ops tool, ads, marketplace, web" },
    { label: "Live", value: "iOS & Android, in production" },
  ],
  links: [
    { label: "getonbloc.com", href: "https://getonbloc.com/" },
    { label: "App Store", href: "https://apps.apple.com/gb/app/bloc-social-events-rewards/id870870144" },
    { label: "Google Play", href: "https://play.google.com/store/apps/details?id=uk.co.createanet.bloc" },
  ],
  stats: [
    { n: "4+ yrs", label: "one team, still shipping" },
    { n: "6", label: "codebases owned end to end" },
    { n: "60→25", label: "min app build time" },
    { n: "Algorand", label: "BLOCCoin live on-chain" },
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
      t: "section",
      title: "hired for one app; now we run the whole estate.",
      lead:
        "Bloc brought us in for a single Android engineer. Four years later we own every surface the business runs on — and the trust that comes with that is the point. We rebuilt the app once to end a two-codebase maintenance tax, then kept going: the backend, the internal ops tool the team runs the product from, a self-serve ads manager, an on-chain rewards marketplace, and the web. When Bloc wants a headline feature, one team ships it across the estate rather than coordinating four vendors.",
    },
    {
      t: "cards",
      title: "six surfaces, one team.",
      lead:
        "Each of these is a real codebase we own — not a plugin. Together they are the whole Bloc product.",
      items: [
        {
          title: "The React Native app",
          body: "Rebuilt from separate Swift and Java apps into one React Native codebase — explore, events map, people, check-ins — with the build pipeline itself cut from an hour to 25 minutes.",
        },
        {
          title: "BLOC Replay",
          body: "A Spotify-Wrapped-style video of a user's nights out, generated from their activity and shareable by link — shipped end to end, from data to rendered clip to a share page on the web.",
        },
        {
          title: "The backend",
          body: "The APIs and data layer behind the app — Java Struts over DynamoDB on AWS — including the Moments, Bites and check-in flows the whole product leans on.",
        },
        {
          title: "Bloc Command — the ops tool",
          body: "The internal admin the team runs the product from: featured places, date-wise challenges and rewards, active-tab management, Replay counts and moderation.",
        },
        {
          title: "A self-serve ads manager",
          body: "Bloc for Business — a Meta-style ad platform with PostGIS audience estimation and check-in attribution, built from scratch (its own case study).",
        },
        {
          title: "BLOCCoin on Algorand",
          body: "A real on-chain rewards marketplace — coins earned in-app, spent with partners, settled on-chain with the discipline of a payments flow.",
        },
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
      lead:
        "A real on-chain rewards marketplace — BLOCCoin issued as an Algorand ASA, earned in-app and spent with partners, settled on-chain with the same discipline we bring to any payments flow.",
    },
  ],
  stack: [
    { layer: "Mobile", value: "React Native (rebuilt from Swift + Java); build time cut 60→25 min" },
    { layer: "App backend", value: "Java Struts + DynamoDB (AWS); Cloudinary media" },
    { layer: "Ops tool", value: "Bloc Command — admin for places, challenges, tabs & moderation" },
    { layer: "Ads manager", value: "Next.js, Node (Express), PostgreSQL/PostGIS, Python profiling" },
    { layer: "Web", value: "Next.js on Vercel (me.getonbloc.com — Replay share pages)" },
    { layer: "Rewards", value: "Algorand — BLOCCoin issued as an ASA" },
  ],
  outcomes: [
    "A four-year, still-growing partnership across every major surface — app, backend, ops tooling, ads, marketplace and web.",
    "The app rebuilt once on React Native, ending the two-codebase (Swift + Java) maintenance tax — and its build time cut from an hour to 25 minutes.",
    "BLOC Replay — a shareable, Spotify-Wrapped-style video of a user's nights out — shipped end to end, from data to rendered clip to a share link.",
    "Bloc Command, the internal ops tool, runs the product day to day: featured places, in-app challenges and rewards, active-tab control and moderation.",
    "A full ads manager built from scratch — targeting to attribution — as its own product strand.",
    "BLOCCoin live on Algorand as a real on-chain rewards marketplace.",
  ],
  cta: "want a partner that compounds, not churns?",
};

export default function BlocCaseStudy() {
  return <CaseStudy data={data} />;
}
