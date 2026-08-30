import type { Metadata } from "next";
import { InstitutionalCreoateCaseStudy } from "@/components/institutional-creoate-case-study";

export const metadata: Metadata = {
  title: "Creoate case study — institutional concept",
  description: "Eight years engineering the storefront, data pipelines and infrastructure behind Creoate's B2B wholesale marketplace.",
  robots: { index: false, follow: false },
};

export default function CreoateInstitutionalPage() {
  return <InstitutionalCreoateCaseStudy />;
}
