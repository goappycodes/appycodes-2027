import type { Metadata } from "next";
import { InstitutionalServicePage } from "@/components/institutional-service-page";

export const metadata: Metadata = {
  title: "Product engineering — institutional concept",
  description: "Appycodes product engineering for multi-tenant SaaS, marketplaces, ticketing, booking and internal platforms.",
  robots: { index: false, follow: false },
};

export default function ProductPlatformsInstitutionalPage() {
  return <InstitutionalServicePage />;
}
