/** Concise sector copy shared by the index, detail pages and machine-readable summary. */
export type SectorData = {
  slug: string;
  name: string;
  headline: string;
  metaTitle: string;
  metaDescription: string;
  summary: string;
  media: string;
  services: string[];
  stack: string[];
  cases: string[];
  built: { title: string; body: string }[];
};

export const SECTORS_DATA: SectorData[] = [
  {
    "slug": "energy-utilities",
    "name": "Energy & utilities",
    "headline": "Software for energy brokers and suppliers.",
    "metaTitle": "Energy & utilities software development",
    "metaDescription": "Tendering, contracts, invoice processing and accounts in one connected system.",
    "summary": "Tendering, contracts, invoice processing and accounts in one connected system.",
    "media": "product-engineering",
    "services": [
      "product-engineering",
      "ai-systems",
      "rescue-hardening"
    ],
    "stack": [
      "Laravel",
      "PDF extraction",
      "REST APIs"
    ],
    "cases": [
      "Professional Energy",
      "PlusHeat"
    ],
    "built": [
      {
        "title": "Brokerage platforms",
        "body": "Manage supplier tenders, contracts, client accounts and renewals in one place."
      },
      {
        "title": "Invoice processing",
        "body": "Extract supplier PDF data and check it against your billing records."
      },
      {
        "title": "Quotes & reports",
        "body": "Generate quotations, fee calculations and tender comparisons."
      }
    ]
  },
  {
    "slug": "education-training",
    "name": "Education & training",
    "headline": "Course platforms and learning apps.",
    "metaTitle": "Education & training software development",
    "metaDescription": "Manage courses, payments and student access through websites, learning platforms and mobile apps.",
    "summary": "Manage courses, payments and student access through websites, learning platforms and mobile apps.",
    "media": "commerce-content",
    "services": [
      "product-engineering",
      "commerce-content",
      "ai-systems",
      "native-mobile"
    ],
    "stack": [
      "Next.js",
      "WordPress",
      "Sanity",
      "React Native"
    ],
    "cases": [
      "TEFL.ie"
    ],
    "built": [
      {
        "title": "Course websites",
        "body": "Editable course catalogues with fast pages, enrolment and payment flows."
      },
      {
        "title": "Learning platforms",
        "body": "Learning management systems and mobile apps for students and teaching teams."
      },
      {
        "title": "Fees & reminders",
        "body": "Online payments, receipts and reminders by email and WhatsApp."
      }
    ]
  },
  {
    "slug": "fintech-payments",
    "name": "Fintech & payments",
    "headline": "Payment systems and financial software.",
    "metaTitle": "Fintech & payments software development",
    "metaDescription": "Build and maintain exchanges, wallets and subscription billing with reliable transaction records.",
    "summary": "Build and maintain exchanges, wallets and subscription billing with reliable transaction records.",
    "media": "product-engineering",
    "services": [
      "product-engineering",
      "commerce-content",
      "rescue-hardening"
    ],
    "stack": [
      "PHP",
      "Doctrine",
      "Stripe",
      "Razorpay",
      "WooCommerce"
    ],
    "cases": [
      "All White Laser"
    ],
    "built": [
      {
        "title": "Exchange systems",
        "body": "Order matching, currency rates and wallet handling backed by automated tests."
      },
      {
        "title": "Wallets & payouts",
        "body": "Connect top-ups, withdrawals and paid services to payment providers."
      },
      {
        "title": "Subscription billing",
        "body": "Move plans and customer subscriptions while keeping billing records in sync."
      }
    ]
  },
  {
    "slug": "distribution-supply-chain",
    "name": "Distribution & supply chain",
    "headline": "Software for ordering, stock and delivery.",
    "metaTitle": "Distribution & supply chain software development",
    "metaDescription": "Connect your catalogue, inventory and delivery operations with the accounting tools you already use.",
    "summary": "Connect your catalogue, inventory and delivery operations with the accounting tools you already use.",
    "media": "product-engineering",
    "services": [
      "product-engineering",
      "native-mobile",
      "rescue-hardening"
    ],
    "stack": [
      "Zoho Books",
      "Tally",
      "REST APIs"
    ],
    "cases": [],
    "built": [
      {
        "title": "B2B ordering",
        "body": "Wholesale apps using live products, prices and customer records from Zoho Books."
      },
      {
        "title": "Inventory management",
        "body": "Track stock by branch, with clear rules for receipts, corrections and damaged goods."
      },
      {
        "title": "Delivery tools",
        "body": "Mobile workflows for last-mile deliveries and distribution agents."
      }
    ]
  },
  {
    "slug": "events-ticketing",
    "name": "Events & ticketing",
    "headline": "Ticketing platforms and event apps.",
    "metaTitle": "Events & ticketing software development",
    "metaDescription": "Sell tickets, manage organisers and check guests in through a platform your business owns.",
    "summary": "Sell tickets, manage organisers and check guests in through a platform your business owns.",
    "media": "native-mobile",
    "services": [
      "product-engineering",
      "native-mobile",
      "commerce-content"
    ],
    "stack": [
      "Laravel",
      "MySQL",
      "Stripe",
      "React Native"
    ],
    "cases": [
      "Ontick",
      "Bloc"
    ],
    "built": [
      {
        "title": "Ticket sales",
        "body": "Manage event inventory, sale windows, promotions and organiser accounts."
      },
      {
        "title": "Instalment payments",
        "body": "Schedule charges, recover failed payments and issue tickets once payment is complete."
      },
      {
        "title": "Event apps",
        "body": "Offline check-in and customer apps with event discovery and push notifications."
      }
    ]
  },
  {
    "slug": "health-care",
    "name": "Health & care",
    "headline": "Patient apps and clinic software.",
    "metaTitle": "Health & care software development",
    "metaDescription": "Connect appointments, patient records and staff workflows with access controls for each clinic.",
    "summary": "Connect appointments, patient records and staff workflows with access controls for each clinic.",
    "media": "native-mobile",
    "services": [
      "native-mobile",
      "product-engineering",
      "rescue-hardening"
    ],
    "stack": [
      "React Native",
      "Node.js",
      "REST APIs"
    ],
    "cases": [
      "All White Laser"
    ],
    "built": [
      {
        "title": "Patient & clinic apps",
        "body": "Appointment booking, care plans, family accounts and visit history."
      },
      {
        "title": "Consent portals",
        "body": "Digital treatment forms and patient records with separate staff access."
      },
      {
        "title": "Field team tools",
        "body": "Visit tracking, odometer capture and travel allowance calculations."
      }
    ]
  },
  {
    "slug": "professional-services",
    "name": "Property, legal & professional",
    "headline": "Software for professional services.",
    "metaTitle": "Property, legal & professional software development",
    "metaDescription": "Websites, reporting tools and client portals for property, legal and consulting teams.",
    "summary": "Websites, reporting tools and client portals for property, legal and consulting teams.",
    "media": "product-engineering",
    "services": [
      "product-engineering",
      "ai-systems",
      "commerce-content"
    ],
    "stack": [
      "Next.js",
      "Vercel",
      "Figma",
      "REST APIs"
    ],
    "cases": [
      "BA Engine Room"
    ],
    "built": [
      {
        "title": "Property reporting",
        "body": "Create structured due-diligence reports and manage planning applications."
      },
      {
        "title": "Legal websites",
        "body": "Clear service pages and enquiry forms for wills, trusts, probate and claims."
      },
      {
        "title": "Client portals",
        "body": "Manage proposals, milestones, payments and support in one place."
      }
    ]
  },
  {
    "slug": "sport",
    "name": "Sport",
    "headline": "Platforms for players, coaches and clubs.",
    "metaTitle": "Sport software development",
    "metaDescription": "Build player profiles, coaching tools and sports analytics with video and mobile access.",
    "summary": "Build player profiles, coaching tools and sports analytics with video and mobile access.",
    "media": "native-mobile",
    "services": [
      "product-engineering",
      "native-mobile",
      "ai-systems"
    ],
    "stack": [
      "Next.js",
      "React Native",
      "Mux",
      "AWS Amplify"
    ],
    "cases": [
      "Player Profile Hub"
    ],
    "built": [
      {
        "title": "Player & coach platforms",
        "body": "Verified profiles, coach discovery and subscription plans with video uploads."
      },
      {
        "title": "Sports analytics",
        "body": "Dashboards for clubs and teams, with separate testing and live environments."
      },
      {
        "title": "Tournament video",
        "body": "Live streaming and recorded video with upload limits and delivery costs planned upfront."
      }
    ]
  },
  {
    "slug": "tally-zoho-india",
    "name": "Tally & Zoho integration",
    "headline": "Connect Tally and Zoho to your business apps.",
    "metaTitle": "Tally & Zoho integration software development",
    "metaDescription": "Keep invoices, products and customer records in sync across your accounting tools and custom software.",
    "summary": "Keep invoices, products and customer records in sync across your accounting tools and custom software.",
    "media": "product-engineering",
    "services": [
      "product-engineering",
      "rescue-hardening",
      "ai-systems"
    ],
    "stack": [
      "Tally TDL",
      "Zoho Books",
      "Zoho CRM",
      "Next.js"
    ],
    "cases": [],
    "built": [
      {
        "title": "Tally extensions",
        "body": "Import cloud invoices into Tally using custom menus and date-range controls."
      },
      {
        "title": "Zoho catalogues",
        "body": "Use Zoho Books products, prices and customers in your ordering app."
      },
      {
        "title": "CRM & account sync",
        "body": "Scheduled updates, webhooks and dashboards for customer and account records."
      }
    ]
  }
];

export function sectorBySlug(slug: string): SectorData | null {
  return SECTORS_DATA.find((sector) => sector.slug === slug) ?? null;
}
