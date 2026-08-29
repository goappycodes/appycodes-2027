import type { Metadata } from "next";
import { siteMeta } from "@/lib/seo";
import { UkLandingPage } from "@/components/uk-landing-page";
import { WEB_LANDING } from "@/lib/uk-landing";

export const metadata: Metadata = siteMeta({
  title: WEB_LANDING.metaTitle,
  description: WEB_LANDING.metaDescription,
  path: WEB_LANDING.path,
  image: WEB_LANDING.ogImage,
  noindex: true,
});

export default function UkWebDevelopmentPage() {
  return <UkLandingPage config={WEB_LANDING} />;
}
