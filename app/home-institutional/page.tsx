import type { Metadata } from "next";
import { HomeConceptPage } from "@/components/home-concepts";

export const metadata: Metadata = { title: "Institutional homepage concept — Appycodes", robots: { index: false, follow: false } };

export default function Page() {
  return <HomeConceptPage concept="institutional" />;
}
