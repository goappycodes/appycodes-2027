import type { Metadata } from "next";
import { UkInsightClusterPage } from "@/components/uk-insights-page";
import { siteMeta } from "@/lib/seo";
import { ukInsightCluster } from "@/lib/uk-insights";

const cluster = ukInsightCluster("company-data-identity")!;

export const metadata: Metadata = siteMeta({
  title: cluster.title,
  description: cluster.description,
  path: "/uk/insights/company-data-identity/",
  image: cluster.image,
});

export default function Page() {
  return <UkInsightClusterPage cluster={cluster} />;
}
