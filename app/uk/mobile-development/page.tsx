import type { Metadata } from "next";
import { siteMeta } from "@/lib/seo";
import { UkLandingPage } from "@/components/uk-landing-page";
import { MOBILE_LANDING } from "@/lib/uk-landing";

export const metadata: Metadata = siteMeta({
  title: MOBILE_LANDING.metaTitle,
  description: MOBILE_LANDING.metaDescription,
  path: MOBILE_LANDING.path,
  image: MOBILE_LANDING.ogImage,
  noindex: true,
});

export default function UkMobileDevelopmentPage() {
  return <UkLandingPage config={MOBILE_LANDING} />;
}
