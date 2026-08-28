import type { Metadata } from "next";
import { siteMeta } from "@/lib/seo";
import { CaseStudy, type CaseStudyData } from "@/components/case-study";

export const metadata: Metadata = siteMeta({
  title: "Zonely — a pay-by-the-minute companionship app, on both stores",
  description:
    "A two-sided marketplace where people pay by the minute to talk to KYC-verified buddies — React Native consumer and buddy apps, a real-time metered-billing engine, and the trust-and-safety layer it took to pass Apple and Google review.",
  path: "/case-studies/zonely/",
  image: "/images/zonely-featured.png",
});

const data: CaseStudyData = {
  crumb: "Zonely",
  path: "/case-studies/zonely/",
  title: (
    <>
      <span className="name">Zonely</span> — a pay-by-the-minute companionship app, on both stores.
    </>
  ),
  lede:
    "A two-sided marketplace where people pay by the minute to talk to KYC-verified buddies — a React Native consumer app, a buddy app and an admin console, with a real-time metered-billing engine and the trust-and-safety layer it took to pass Apple and Google review.",
  facts: [
    { label: "Client", value: "Zonely, companionship app" },
    { label: "Sector", value: "Social · real-time marketplace" },
    { label: "Engagement", value: "Built & shipped, ongoing" },
    { label: "Owned", value: "Consumer + buddy apps, backend, admin" },
  ],
  stats: [
    { n: "2 apps", label: "consumer + buddy, iOS & Android" },
    { n: "per-min", label: "real-time metered billing" },
    { n: "24 hr", label: "content-moderation SLA" },
    { n: "KYC", label: "identity-verified buddies" },
  ],
  blocks: [
    {
      t: "gallery",
      title: "someone to talk to, any time.",
      shots: [
        { src: "/images/zonely-home.webp", alt: "Zonely home — conversation prompts, wallet and coins" },
        { src: "/images/zonely-buddies.webp", alt: "Zonely buddies list — browse and call or chat a companion" },
      ],
    },
    {
      t: "section",
      title: "the hard part wasn't the app — it was earning trust.",
      lead:
        "Building the screens is the easy half. Zonely lets real people pay to talk to other real people in real time, which means it lives or dies on trust and on billing that never cheats. So the work that mattered was the invisible part: KYC on every buddy, a metered engine that bills to the second and can never outrun a wallet, a moderation console that can pull someone in minutes, and a full user-generated-content safety layer — report, block, content filtering, a zero-tolerance warning before every session — built to satisfy Apple's review as much as the users.",
    },
    {
      t: "cards",
      title: "the systems behind the screens.",
      lead:
        "A real-time, two-sided, money-moving marketplace across two apps and an admin — every part built and owned by one team.",
      items: [
        {
          title: "Two apps, one marketplace",
          body: "A React Native consumer app to find and talk to buddies, and a separate buddy app to take calls and chats — with the backend and admin that tie the two sides together.",
        },
        {
          title: "Real-time metered billing",
          body: "Calls and chats billed by the minute against a wallet, with hard guardrails so a live session can never outrun the consumer's balance — reconciled to the second.",
        },
        {
          title: "Wallet & coins economy",
          body: "Top-ups, a coins-and-rewards layer, promotional offers, a Mood O'Meter and referrals — the money and the gamification that bring people back.",
        },
        {
          title: "Trust & safety",
          body: "KYC-verified buddies, report and block, content filtering, and a zero-tolerance conduct warning before every session — the controls that got the app onto the App Store.",
        },
        {
          title: "Admin & moderation",
          body: "A console for the operator to action reports within 24 hours, ban users and step in fast when a conversation goes wrong.",
        },
        {
          title: "Shipping on Expo",
          body: "EAS builds for both stores and Expo OTA updates, so an urgent fix reaches users the same day instead of waiting on a review cycle.",
        },
      ],
    },
    {
      t: "gallery",
      title: "a wallet, coins and a reason to come back.",
      shots: [
        { src: "/images/zonely-rewards.webp", alt: "Zonely daily rewards and Mood O'Meter check-in" },
        { src: "/images/zonely-wallet.webp", alt: "Zonely profile and wallet with balance, transactions and top-up" },
      ],
    },
  ],
  stack: [
    { layer: "Mobile", value: "React Native (Expo) — consumer & buddy apps" },
    { layer: "Backend", value: "Custom API — sessions, wallet, metered billing" },
    { layer: "Admin", value: "Moderation & operations console" },
    { layer: "Real-time", value: "Per-minute call & chat sessions with live billing" },
    { layer: "Payments", value: "Wallet top-ups; store-compliant purchases on iOS" },
    { layer: "Delivery", value: "EAS builds for iOS & Android, Expo OTA updates" },
  ],
  outcomes: [
    "A two-sided companionship marketplace shipped to both the App Store and Google Play — consumer app, buddy app, backend and admin.",
    "Real-time per-minute billing that reconciles against the wallet and can never overspend a balance.",
    "A full trust-and-safety layer — KYC buddies, report/block, content filtering and a 24-hour moderation SLA — built to meet Apple's user-generated-content rules.",
    "A zero-tolerance conduct warning before every call and chat, and an admin console to act on reports in minutes.",
    "A wallet, coins and referral economy that drives repeat sessions.",
    "Expo OTA updates, so urgent fixes reach users without waiting on a store review.",
  ],
  cta: "building a two-sided app? we've shipped the hard parts.",
};

export default function ZonelyCaseStudy() {
  return <CaseStudy data={data} />;
}
