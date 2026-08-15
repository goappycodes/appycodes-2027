import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { SERVICES_DATA, LEGACY_SERVICE_REDIRECTS } from "@/lib/services-data";
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
  if (!s) {
    // Legacy service slugs referenced across older pages / the blog resolve to
    // the nearest of the six canonical services rather than 404ing.
    const target = LEGACY_SERVICE_REDIRECTS[slug];
    if (target) redirect(`/services/${target}/`);
    notFound();
  }
  return <ServicePage s={s} />;
}
