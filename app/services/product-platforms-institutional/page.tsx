import type { Metadata } from "next";
import { InstitutionalServicePage } from "@/components/institutional-service-page";
import { SERVICES_DATA } from "@/lib/services-data";

export const metadata: Metadata = {
  title: "Product engineering — institutional concept",
  description: "Appycodes product engineering for multi-tenant SaaS, marketplaces, ticketing, booking and internal platforms.",
  robots: { index: false, follow: false },
};

export default function ProductPlatformsInstitutionalPage() {
  const service = SERVICES_DATA.find((item) => item.slug === "product-engineering")!;
  return <InstitutionalServicePage service={service} />;
}
