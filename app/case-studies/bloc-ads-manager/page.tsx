import type { Metadata } from "next";
import { siteMeta } from "@/lib/seo";
import { CaseStudy, type CaseStudyData } from "@/components/case-study";

export const metadata: Metadata = siteMeta({
  title: "Bloc Ads Manager — a self-serve ad platform built from scratch",
  description:
    "Bloc for Business — a self-serve advertising manager we built from the ground up: a Meta-style campaign builder, PostGIS audience estimation, Python interest targeting, in-app ad serving and reporting that closes the loop to real venue check-ins.",
  path: "/case-studies/bloc-ads-manager/",
  image: "/images/blocads-featured.png",
});

const data: CaseStudyData = {
  crumb: "Bloc Ads Manager",
  path: "/case-studies/bloc-ads-manager/",
  title: (
    <>
      a self-serve ad platform for <span className="name">Bloc</span>, built from the ground up.
    </>
  ),
  lede:
    "Bloc for Business — an advertising manager we built from scratch so venues and promoters can run campaigns against Bloc's real users: a Meta-style campaign builder, PostGIS audience estimation, Python interest targeting, and reporting that closes the loop to actual venue check-ins.",
  facts: [
    { label: "Client", value: "Bloc, social events & rewards" },
    { label: "Sector", value: "Ad-tech · self-serve advertising" },
    { label: "Engagement", value: "Built from scratch, live 2026" },
    { label: "Owned", value: "Campaign builder, targeting, billing, ad serving" },
  ],
  links: [
    { label: "business.getonbloc.com", href: "https://business.getonbloc.com/" },
    { label: "getonbloc.com", href: "https://getonbloc.com/" },
  ],
  stats: [
    { n: "0→live", label: "built from scratch, live 2026" },
    { n: "4", label: "campaign objectives, events-tuned" },
    { n: "PostGIS", label: "real-time audience estimation" },
    { n: "check-ins", label: "spend attributed to real venue visits" },
  ],
  blocks: [
    {
      t: "gallery",
      title: "a campaign builder that feels like the big platforms.",
      shots: [
        { src: "/images/blocads-objective.jpg", alt: "Bloc for Business campaign objective selection" },
        { src: "/images/blocads-adset.jpg", alt: "Bloc for Business ad set targeting and audience" },
        { src: "/images/blocads-tools.jpg", alt: "Bloc for Business tools menu — creative, audiences, settings" },
      ],
    },
    {
      t: "section",
      title: "self-serve, but wired to a real social graph.",
      lead:
        "Anyone can clone the Facebook Ads UI. The hard part is what sits behind it: matching an advertiser's targeting to Bloc's actual users, serving the ad inside the app, and proving it worked. We built all three — location and interest targeting against live user data, Bite and Spotlight placements delivered into the Bloc feed and moderated before they run, and reporting that ends not at a click but at a real check-in at the venue. It is one strand of a four-year partnership across Bloc's whole estate.",
    },
    {
      t: "cards",
      title: "the systems behind the dashboard.",
      lead:
        "A working ad platform is a lot more than a form. These are the pieces that make Bloc for Business a product an advertiser can actually spend money on.",
      items: [
        {
          title: "Campaign builder",
          body: "Campaign → ad set → ad, with event-native objectives — awareness, traffic, venue & event check-ins, app promotions — plus budgets, scheduling and an approval flow.",
        },
        {
          title: "Audience estimation (PostGIS)",
          body: "A PostGIS user-locations layer answers “how many Bloc users are near this venue?” in real time, so advertisers can size an audience by address and radius before they spend a penny.",
        },
        {
          title: "Interest targeting (Python)",
          body: "Python profiling turns in-app behaviour into interest segments, matched to ad sets and re-optimised as the user base grows — the reach numbers stay honest at scale.",
        },
        {
          title: "In-app ad serving",
          body: "Bite and Spotlight placements delivered into the Bloc app feed, each passing through a moderation and approval step in the internal Bloc Command tool before it goes live.",
        },
        {
          title: "Closed-loop reporting",
          body: "Spend, impressions, clicks and — the number that matters here — actual venue check-ins, so a promoter can watch ad money turn into people through the door.",
        },
        {
          title: "Billing & credits",
          body: "Metered invoicing with VAT, a credits system, payment methods and weekly or monthly cycles — the money side of a real ad platform, not a demo.",
        },
      ],
    },
    {
      t: "gallery",
      title: "reporting that ends at the door, and billing that adds up.",
      shots: [
        { src: "/images/blocads-dashboard.jpg", alt: "Bloc for Business reporting dashboard with actual check-ins" },
        { src: "/images/blocads-billing.jpg", alt: "Bloc for Business billing history with invoices, VAT and credits" },
      ],
    },
    {
      t: "figure",
      src: "/images/blocads-billing-mobile.jpg",
      alt: "Bloc for Business billing on mobile",
      caption: "The whole platform works on the phone, too.",
      phone: true,
    },
  ],
  stack: [
    { layer: "Frontend", value: "Next.js — the Bloc for Business dashboard" },
    { layer: "Backend", value: "Node / Express APIs" },
    { layer: "Data", value: "PostgreSQL + PostGIS (geo audiences)" },
    { layer: "Targeting", value: "Python interest profiling & reach estimation" },
    { layer: "Billing", value: "Metered invoicing — credits, VAT and card payments" },
    { layer: "Delivery", value: "In-app Bite/Spotlight ad serving, moderated via Bloc Command" },
  ],
  outcomes: [
    "A self-serve ad platform built from scratch — venues and promoters run their own campaigns against Bloc's real users.",
    "Event-native objectives (venue & event check-ins, app promotions) instead of a generic ads clone.",
    "A PostGIS audience layer that estimates reachable users by address and radius in real time.",
    "Python interest profiling that turns in-app behaviour into targetable segments and keeps up as users grow.",
    "Closed-loop reporting — ad spend attributed all the way to actual venue check-ins.",
    "A real billing stack — invoices, VAT and a credits system — live with its first advertisers in 2026.",
  ],
  cta: "want to turn your audience into an ad product you own?",
};

export default function BlocAdsManagerCaseStudy() {
  return <CaseStudy data={data} />;
}
