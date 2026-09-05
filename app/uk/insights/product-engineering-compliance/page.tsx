import type { Metadata } from "next";
import { UkInsightClusterPage } from "@/components/uk-insights-page";
import { siteMeta } from "@/lib/seo";
import { ukInsightCluster } from "@/lib/uk-insights";

const cluster = ukInsightCluster("product-engineering-compliance")!;

export const metadata: Metadata = siteMeta({
  title: cluster.title,
  description: cluster.description,
  path: "/uk/insights/product-engineering-compliance/",
  image: cluster.image,
});

export default function Page() {
  return <UkInsightClusterPage cluster={cluster} />;
}
