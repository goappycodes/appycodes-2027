import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { LuxReveal } from "@/components/lux-reveal";
import { JsonLd } from "@/components/jsonld";
import { siteGraph } from "@/lib/schema";
import { SITE } from "@/lib/site";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-archivo",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://appycodes.dev"),
  title: {
    default: "Appycodes — we build the software businesses actually run on",
    template: "%s | Appycodes",
  },
  description:
    "Senior product engineering for companies that have outgrown off-the-shelf. Web platforms, mobile apps and AI systems, shipping in production since 2015.",
  // No canonical here — Next inherits alternates down to every page that does
  // not set its own, which would point the whole site at the homepage. Each
  // page declares its own via siteMeta()/pageMeta().
  openGraph: {
    type: "website",
    siteName: "Appycodes",
    url: "https://appycodes.dev",
    title: "Appycodes — we build the software businesses actually run on",
    description:
      "Senior product engineering for companies that have outgrown off-the-shelf. Web platforms, mobile apps and AI systems, shipping in production since 2015.",
    images: [{ url: "/images/ritesh-prince.jpg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Appycodes — we build the software businesses actually run on",
    description:
      "Senior product engineering for companies that have outgrown off-the-shelf. Web platforms, mobile apps and AI systems, shipping in production since 2015.",
    images: ["/images/ritesh-prince.jpg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={archivo.variable}>
      <body className="lux">
        {/* content stays visible if JS never runs */}
        <noscript>
          <style dangerouslySetInnerHTML={{ __html: ".lux .reveal{opacity:1;transform:none}" }} />
        </noscript>
        <JsonLd data={siteGraph({ email: SITE.email, founded: SITE.founded })} />
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
        <LuxReveal />
      </body>
    </html>
  );
}
