import type { Metadata } from "next";
import { siteMeta } from "@/lib/seo";
import { PageHero } from "@/components/page-hero";
import { IndexingReport } from "./IndexingReport";

export const metadata: Metadata = siteMeta({
  title: "Indexing report",
  description: "Internal indexing report.",
  path: "/admin/indexing-report/",
  noindex: true,
});

export default function IndexingReportPage() {
  return (
    <>
      <PageHero
        crumbs={[
          { label: "home", href: "/" },
          { label: "admin" },
          { label: "indexing report" },
        ]}
        eyebrow="internal · indexing report"
        title={
          <>
            how Google sees the site, <span className="g-disp">right now</span>.
          </>
        }
        titleSize="md"
        lede="The latest snapshot from scripts/indexing-report.mjs, shipped as an encrypted payload and decrypted locally in your browser — the server never sees the password."
      />
      <IndexingReport />
    </>
  );
}
