import type { Metadata } from "next";
import { siteMeta } from "@/lib/seo";
import { SectorIndex } from "@/components/sector-page";

export const metadata: Metadata = siteMeta({
  title: "Sectors — software for your industry",
  description: "Custom software for energy, education, finance, distribution, events, healthcare, professional services and sport.",
  path: "/sectors/",
});

export default function SectorsIndex() {
  return <SectorIndex />;
}
