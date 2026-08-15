import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { SERVICES_DATA, LEGACY_SERVICE_REDIRECTS } from "@/lib/services-data";
import { SUB_SERVICES_DATA, subServiceBySlug } from "@/lib/sub-services-data";
import { ServicePage } from "@/components/service-page";
import { SubServicePage } from "@/components/sub-service-page";

export function generateStaticParams() {
  return [
    ...SERVICES_DATA.map((s) => ({ slug: s.slug })),
    ...SUB_SERVICES_DATA.map((s) => ({ slug: s.slug })),
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const s = SERVICES_DATA.find((x) => x.slug === slug);
  if (s) return { title: s.title, description: s.description };
  const sub = subServiceBySlug(slug);
  if (sub) return { title: sub.metaTitle, description: sub.metaDescription };
  return {};
}

export default async function ServiceDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Pillar service
  const s = SERVICES_DATA.find((x) => x.slug === slug);
  if (s) return <ServicePage s={s} />;

  // Original ("legacy") service page, rebuilt at its own URL
  const sub = subServiceBySlug(slug);
  if (sub) return <SubServicePage s={sub} />;

  // Not ported yet — redirect to the parent pillar so the URL still resolves
  const target = LEGACY_SERVICE_REDIRECTS[slug];
  if (target) redirect(`/services/${target}/`);

  notFound();
}
