import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteMeta } from "@/lib/seo";
import { SECTORS_DATA, sectorBySlug } from "@/lib/sectors-data";
import { SectorPage } from "@/components/sector-page";

export function generateStaticParams() {
  return SECTORS_DATA.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const s = sectorBySlug(slug);
  if (!s) return {};
  return siteMeta({
    title: s.metaTitle,
    description: s.metaDescription,
    path: `/sectors/${s.slug}/`,
  });
}

export default async function SectorDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = sectorBySlug(slug);
  if (!s) notFound();
  return <SectorPage s={s} />;
}
