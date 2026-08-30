import type { Metadata } from "next";
import { HomeConceptPage } from "@/components/home-concepts";

export const metadata: Metadata = {
  alternates: { canonical: "https://appycodes.dev/" },
  title: "Custom software for growing businesses",
  description: "Enterprise-grade web platforms, mobile apps and AI systems, made in India for companies across the UK, Europe and worldwide.",
};

export default function HomePage() {
  return <HomeConceptPage concept="institutional" />;
}
