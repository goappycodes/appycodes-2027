import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "What Appycodes collects, why, and how to have it removed.",
};

export default function PrivacyPage() {
  return (
    <LegalPage
      crumb="privacy"
      title="privacy policy."
      lede="What we collect, why we collect it, and how to have it removed. Written to be read rather than to be survived."
      updated="May 2026"
      summary={[
        "We collect what you send us in an enquiry — your name, email, and whatever you choose to include.",
        "We do not sell your data, and we do not share it beyond the tools we use to run the business.",
        `To ask what we hold or have it deleted, email ${SITE.email} and a person will action it.`,
        "This page is a plain-English summary; a full policy is being finalised for the rebranded site.",
      ]}
      sections={[
        {
          id: "what-we-collect",
          h: "what we collect",
          body: [
            "When you contact us, we receive what you put in the message: usually a name, an email address, and a description of what you are trying to build. Nothing more is required to get an answer.",
            "If we go on to work together, we hold the ordinary things an engagement needs — contact details for the people involved, project documentation, and billing information. Access credentials for your systems stay in your own accounts wherever that is possible, because you own the infrastructure from day one.",
            "Like most websites, our hosting produces standard server logs. These exist for security and reliability, not for building a profile of you.",
          ],
        },
        {
          id: "why",
          h: "why we hold it",
          body: [
            "To reply to your enquiry, to scope and run the work you have asked for, and to meet the record-keeping obligations that come with invoicing and contracts.",
            "We do not use your enquiry to add you to a marketing sequence. If we ever want to send you something that is not about your project, we will ask first.",
          ],
        },
        {
          id: "sharing",
          h: "who else sees it",
          body: [
            "We do not sell personal data and we do not pass it to advertisers or data brokers.",
            "The tools we use to operate — email, code hosting, cloud infrastructure, and accounting — necessarily process some of it on our behalf. We choose providers that are standard in this industry and hold them to the same standard we hold ourselves.",
            "We disclose data to anyone else only where the law requires it.",
          ],
        },
        {
          id: "how-long",
          h: "how long we keep it",
          body: [
            "Enquiries that do not turn into work are kept only as long as they are useful to the conversation, and then removed on request.",
            "Records tied to a paid engagement — contracts, invoices and the correspondence around them — are retained for as long as our accounting and legal obligations require, and no longer than that serves a purpose.",
          ],
        },
        {
          id: "your-rights",
          h: "your rights",
          body: [
            "You can ask what we hold about you, ask for a copy, ask us to correct it, or ask us to delete it. You do not need a reason and there is no form to fill in.",
            `Email ${SITE.email} and it will be dealt with by a person rather than a ticketing system. If you are not satisfied with how we have handled it, you can raise it with the data protection authority in your jurisdiction.`,
          ],
        },
        {
          id: "changes",
          h: "changes to this page",
          body: [
            "This is a working draft published alongside the rebranded site, and a fuller policy is being finalised. When it changes materially we will update the date at the top of this page.",
            `If anything here is unclear or you want the detail behind a particular line, write to ${SITE.email} and ask.`,
          ],
        },
      ]}
    />
  );
}
