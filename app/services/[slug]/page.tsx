import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SERVICES_DATA } from "@/lib/services-data";
import { ServicePage } from "@/components/service-page";

export function generateStaticParams() {
  return SERVICES_DATA.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const s = SERVICES_DATA.find((x) => x.slug === slug);
  if (!s) return {};
  return { title: s.title, description: s.description };
}

export default async function ServiceDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = SERVICES_DATA.find((x) => x.slug === slug);
  if (!s) notFound();
  return <ServicePage s={s} />;
}
