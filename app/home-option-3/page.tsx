import type { Metadata } from "next";
import { HomeConceptPage } from "@/components/home-concepts";
import { ShowcaseHomeHero } from "@/components/home-hero-alternatives";

export const metadata: Metadata = {
  title: "Hero option 3 — Product showcase",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <HomeConceptPage concept="institutional" heroOverride={<ShowcaseHomeHero />} />;
}
