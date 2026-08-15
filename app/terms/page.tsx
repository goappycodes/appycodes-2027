import type { Metadata } from "next";
import { siteMeta } from "@/lib/seo";
import { LegalPage } from "@/components/legal-page";
import { SITE } from "@/lib/site";

export const metadata: Metadata = siteMeta({
  title: "Terms",
  description: "Terms of use for the Appycodes website, and how engagement terms are agreed.",
  path: "/terms/",
});

export default function TermsPage() {
  return (
    <LegalPage
      crumb="terms"
      title="terms."
      lede="How to read what is on this site, and how the terms of an actual engagement get agreed. Short, because the important part happens in a scope of work."
      updated="May 2026"
      summary={[
        "Everything on this site is published for information, as-is.",
        "Engagement terms are agreed per project in a written scope of work — nothing here overrides that.",
        "You own the code and infrastructure we build for you, from day one.",
        "Case study figures come from real production systems and are not a promise of the same result.",
      ]}
      sections={[
        {
          id: "site",
          h: "using this site",
          body: [
            "The content here — service pages, case studies, cost studies and benchmarks — is published for information. We keep it accurate and we correct it when it is wrong, but it is provided as-is and without warranty.",
            "You are welcome to quote or reference our writing with attribution and a link. Republishing whole articles is not permitted.",
          ],
        },
        {
          id: "engagements",
          h: "engagement terms",
          body: [
            "Nothing on this site is an offer or a contract. Work is agreed per project in a written scope of work that sets out what is being built, what it costs, what each side is responsible for, and how either side can end it.",
            "Where a scope of work and this page disagree, the scope of work wins. It is the document both parties signed.",
          ],
        },
        {
          id: "ownership",
          h: "ownership of the work",
          body: [
            "You own the code we write for you, along with the repository, cloud accounts and keys it lives in. That is true from day one of the engagement rather than on final payment.",
            "Open-source components keep their own licences, and any third-party service the system depends on keeps its own terms. We name those in the scope so there are no surprises later.",
          ],
        },
        {
          id: "results",
          h: "figures and case studies",
          body: [
            "The numbers we publish — processed volume, Core Web Vitals scores, engagement lengths — come from real production systems, and are shared with the agreement of the clients involved.",
            "They describe what happened on those projects. They are not a forecast of what will happen on yours, and we will not pretend otherwise on a call.",
          ],
        },
        {
          id: "liability",
          h: "liability",
          body: [
            "To the extent the law allows, we are not liable for loss arising from your use of this website or from reliance on the general information published on it.",
            "Liability in respect of work we are engaged to do is dealt with in the scope of work for that engagement, where it can be set against what is actually being built.",
          ],
        },
        {
          id: "contact",
          h: "questions",
          body: [
            `This page is a working draft published alongside the rebranded site. If you need the detail behind any line of it, or you are reviewing us as a supplier and need something more formal, write to ${SITE.email}.`,
          ],
        },
      ]}
    />
  );
}
