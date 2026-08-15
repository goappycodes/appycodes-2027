import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

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
  openGraph: {
    type: "website",
    siteName: "Appycodes",
    url: "https://appycodes.dev",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={archivo.variable}>
      <body className="lux">
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
