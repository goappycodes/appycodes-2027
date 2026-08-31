import type { Metadata } from "next";
import { HomeConceptPage } from "@/components/home-concepts";
import { StatementHomeHero } from "@/components/home-hero-alternatives";

export const metadata: Metadata = {
  title: "Hero option 2 — Editorial statement",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <HomeConceptPage concept="institutional" heroOverride={<StatementHomeHero />} />;
}
