export type InstitutionalWorkItem = {
  href: string;
  image: string;
  client: string;
  logo?: string;
  brand: string;
  sector: string;
  title: string;
  detail: string;
  metric: string;
  metricLabel: string;
};

// One source for carousel images, copy and metrics on every page.
export const WORK_CARDS: InstitutionalWorkItem[] = [
  {
    href: "/case-studies/creoate/",
    image: "/images/creoate-featured.png",
    client: "Creoate",
    logo: "/images/logo-creoate.png",
    brand: "Creoate",
    sector: "B2B commerce",
    title: "The engineering partnership behind a cross-border wholesale marketplace.",
    detail: "Next.js storefront, Python ingestion pipelines, DynamoDB data layer and AWS infrastructure.",
    metric: "8+ years",
    metricLabel: "one team, still shipping",
  },
  {
    href: "/case-studies/ontick/",
    image: "/images/ontick-6.png",
    client: "Ontick",
    brand: "Ontick",
    sector: "Event technology",
    title: "A commission-free ticketing platform built for ownership and scale.",
    detail: "Multi-organiser commerce, Stripe instalments and two native apps in one connected platform.",
    metric: "£2M+",
    metricLabel: "processed since launch",
  },
  {
    href: "/case-studies/easyship/",
    image: "/images/easyship-featured.png",
    client: "Easyship",
    logo: "/images/logo-easyship.png",
    brand: "Easyship",
    sector: "Global logistics",
    title: "Embedded product engineering for a global shipping platform.",
    detail: "Rate, tax and duty calculators, server-rendered courier pages and a custom MongoDB CMS.",
    metric: "550+",
    metricLabel: "couriers on the calculator",
  },
  {
    href: "/case-studies/decofetch/",
    image: "/images/decofetch-featured.png",
    client: "Decofetch",
    brand: "Decofetch",
    sector: "Luxury commerce",
    title: "A custom furniture marketplace engineered from storefront to infrastructure.",
    detail: "Server-rendered Next.js commerce over a Laravel API, bespoke operations tooling and re-architected AWS infrastructure.",
    metric: "0→live",
    metricLabel: "custom, front to back",
  },
  {
    href: "/case-studies/ba-engine-room/",
    image: "/images/engineroom-featured.png",
    client: "BA Engine Room",
    brand: "EngineRoom",
    sector: "AI operations",
    title: "An AI-native operating system that runs a consultancy lead to invoice.",
    detail: "Discovery briefs, e-signed contracts, Stripe deposits, delivery milestones and time tracking in one operational system.",
    metric: "0→1",
    metricLabel: "built from the ground up",
  },
  {
    href: "/case-studies/plusheat/",
    image: "/images/plusheat-featured.png",
    client: "PlusHeat",
    brand: "PlusHeat",
    sector: "Home services",
    title: "A conversion platform for a growing UK boiler-cover provider.",
    detail: "Custom plan configuration, postcode-qualified lead journeys, CRM synchronisation and campaign landing pages.",
    metric: "5 yrs",
    metricLabel: "web partner since 2021",
  },

  {
    href: "/case-studies/leonia/", image: "/images/leonia-featured.png", client: "Léonia", brand: "Leonia", sector: "Beauty commerce",
    title: "A custom Shopify store for a French beauty brand.",
    detail: "Custom theme, customer accounts, loyalty rewards, referrals and gift-with-purchase offers.",
    metric: "5 yrs", metricLabel: "partners since 2021",
  },
  {
    href: "/case-studies/shutters365/", image: "/images/shutters-featured.png", client: "Shutters 365", brand: "Shutters365", sector: "Home improvement",
    title: "Made-to-measure shutters with live pricing.",
    detail: "A seven-step product builder with live previews, sample orders and supplier tools.",
    metric: "7-step", metricLabel: "configurator, live pricing",
  },
  {
    href: "/case-studies/bloc-ads-manager/", image: "/images/blocads-featured.png", client: "Bloc Ads Manager", logo: "/images/logo-bloc.png", brand: "Bloc", sector: "Advertising",
    title: "A self-service advertising platform for venues.",
    detail: "Campaign creation, audience targeting, in-app ads and reporting linked to venue check-ins.",
    metric: "check-ins", metricLabel: "closed-loop attribution",
  },
  {
    href: "/case-studies/bloc/", image: "/images/bloc-6.png", client: "Bloc", logo: "/images/logo-bloc.png", brand: "Bloc", sector: "Social events",
    title: "An events app with the tools to run it.",
    detail: "Mobile app, backend, advertising tools, a digital marketplace and website.",
    metric: "4+ yrs", metricLabel: "one team, five codebases",
  },
  {
    href: "/case-studies/zonely/", image: "/images/zonely-featured.png", client: "Zonely", brand: "Zonely", sector: "Social mobile",
    title: "Two mobile apps for real-time companionship.",
    detail: "Customer and buddy apps with per-minute billing, wallets, moderation and admin tools.",
    metric: "2 apps", metricLabel: "consumer + buddy, iOS & Android",
  },
  {
    href: "/case-studies/player-profile-hub/", image: "/images/pph-featured.png", client: "Player Profile Hub", brand: "PlayerProfileHub", sector: "Grassroots football",
    title: "Player profiles and discovery for youth football.",
    detail: "Verified profiles, video highlights, coach discovery and safeguarding on web and mobile.",
    metric: "0→1", metricLabel: "built from the ground up",
  },
  {
    href: "/case-studies/deepspatial/", image: "/images/deepspatial-featured.png", client: "DeepSpatial", brand: "DeepSpatial", sector: "Geospatial AI",
    title: "Websites and a talent platform for DeepSpatial.",
    detail: "Corporate and investor pages, the Xploor talent platform and ongoing releases on AWS Amplify.",
    metric: "2 yrs", metricLabel: "one team, ongoing",
  },
  {
    href: "/case-studies/yippee-malta/", image: "/images/yippee-6.png", client: "Yippee Malta", logo: "/images/logo-yippeemalta.png", brand: "YippeeMalta", sector: "Travel",
    title: "Tour bookings with a custom mobile-first checkout.",
    detail: "A multilingual website connected to the booking API, with deposits, coupons and affiliate tracking.",
    metric: "90+", metricLabel: "core web vitals, mobile & desktop",
  },
  {
    href: "/case-studies/professional-energy/", image: "/images/pes-6.png", client: "Professional Energy", brand: "ProfessionalEnergy", sector: "Energy brokerage",
    title: "One platform for tenders, contracts and accounts.",
    detail: "Supplier tenders, contract management, brokerage accounting and client records.",
    metric: "100+", metricLabel: "suppliers in one tender",
  },
];

export function getWorkCards(clients: readonly string[]): InstitutionalWorkItem[] {
  return clients.map((client) => {
    const card = WORK_CARDS.find((item) => item.client === client);
    if (!card) throw new Error(`Unknown case study card: ${client}`);
    return card;
  });
}

