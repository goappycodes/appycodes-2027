import type { Metadata } from "next";
import { siteMeta } from "@/lib/seo";
import { CaseStudy, type CaseStudyData } from "@/components/case-study";

export const metadata: Metadata = siteMeta({
  title: "Léonia Paris — a custom Shopify storefront for a clean-beauty brand",
  description:
    "We build and run the Shopify storefront for Léonia Paris, a certified-organic French skincare brand — a bespoke theme plus the features Shopify does not do out of the box: a real customer-account dashboard, loyalty and referral, threshold gift-with-purchase, a skin-diagnostic journey, and a performance pass. A partnership since 2021.",
  path: "/case-studies/leonia/",
  image: "/images/leonia-featured.png",
});

const data: CaseStudyData = {
  crumb: "Léonia",
  path: "/case-studies/leonia/",
  title: (
    <>
      the custom <span className="caps">Shopify</span> build behind{" "}
      <span className="name">Léonia&nbsp;Paris</span>.
    </>
  ),
  lede:
    "Léonia Paris is a certified-organic, made-in-France clean-beauty brand. We build and run its Shopify storefront — a bespoke theme, plus the features Shopify does not give you out of the box: a real customer account, loyalty and referral, gift-with-purchase, a skin-diagnostic journey, and a proper performance pass. A partnership now in its fifth year.",
  facts: [
    { label: "Client", value: "Léonia Paris — clean beauty, certified organic" },
    { label: "Sector", value: "E-commerce · cosmetics & skincare" },
    { label: "Platform", value: "Shopify — bespoke theme & custom features" },
    { label: "Engagement", value: "Ongoing partnership since 2021" },
    { label: "Market", value: "France — French-first, Cosmébio / Vegan" },
  ],
  links: [{ label: "Leonia-cosmetiques.com", href: "https://leonia-cosmetiques.com/" }],
  stats: [
    { n: "5 yrs", label: "partnership, and counting" },
    { n: "Shopify", label: "a bespoke theme, front to back" },
    { n: "loyalty", label: "points, referral & gift-with-purchase" },
    { n: "BIO", label: "certified organic, made in France" },
  ],
  blocks: [
    {
      t: "figure",
      src: "/images/leonia-featured.png",
      alt: "Léonia Paris storefront across desktop, tablet and mobile",
      caption:
        "A premium clean-beauty storefront on Shopify — the bestsellers grid, product pages, account and checkout, all a custom theme.",
    },
    {
      t: "section",
      title: "a Shopify store that stopped behaving like one.",
      lead:
        "Shopify is a fine place to start a beauty brand and a frustrating place to grow one — the theme is a template, the customer account is an order list, and the promotions engine stops exactly where a real merchandising idea begins. Léonia wanted the storefront to carry the brand and to do things Shopify does not do natively. So most of this work sits in the gap between what Shopify ships and what the brand actually needed: a proper account dashboard, loyalty and referral, gift-with-purchase, and a site fast enough to deserve the imagery. We have built and maintained it since 2021.",
    },
    {
      t: "cards",
      title: "the custom work on top of Shopify.",
      lead:
        "A bespoke theme is the easy half. The rest is the features Shopify makes hard — the ones that keep customers coming back.",
      items: [
        {
          title: "Bespoke Shopify theme",
          body: "A custom Liquid theme built for a premium skincare brand — the bestsellers grid, product pages, mega-menu, editorial Journal and a French-first language switcher.",
        },
        {
          title: "A real customer account",
          body: "One condensed dashboard — orders, personal details, loyalty points and a referral insert — where Shopify hands you an order list and blocks editing the rest. The hard part, done properly.",
        },
        {
          title: "Loyalty & referral",
          body: "Loyalty-points balances pulled from a third-party app into the account page, and a sponsorship / referral flow so customers can bring in customers.",
        },
        {
          title: "Gift-with-purchase",
          body: "A threshold offer — a free product added automatically over a spend level (“lait corps offert dès 90€”) — built as custom cart logic, because Shopify does not offer it.",
        },
        {
          title: "Diagnostic & storytelling",
          body: "A skin-diagnostic journey that routes customers to the right routine, plus the certifications, testimonials and Journal that do a clean-beauty brand's storytelling.",
        },
        {
          title: "Performance pass",
          body: "Deferred scripts, lazy-loaded images and video, font-display swapped, explicit media dimensions, and heavy third-party plugins replaced with lightweight custom code.",
        },
      ],
    },
    {
      t: "gallery",
      title: "the storefront, in production.",
      shots: [
        { src: "/images/leonia-bestsellers.jpg", alt: "Léonia Paris bestsellers page — white-tea skincare range with Cosmébio certification" },
        { src: "/images/leonia-products.jpg", alt: "Léonia Paris product collection page with grid and list views" },
      ],
    },
    {
      t: "gallery",
      title: "built for the phone, where the customers are.",
      shots: [
        { src: "/images/leonia-product.jpg", alt: "Léonia Paris product page on mobile with gift banner and reviews" },
        { src: "/images/leonia-testimonials.jpg", alt: "Léonia Paris testimonial reels and skin-diagnostic entry on mobile" },
      ],
    },
  ],
  tech: ["shopify"],
  stack: [
    { layer: "Platform", value: "Shopify — Online Store 2.0" },
    { layer: "Theme", value: "Custom Liquid theme, front to back" },
    { layer: "Account", value: "Bespoke dashboard — orders, profile, loyalty, referral" },
    { layer: "Promotions", value: "Threshold gift-with-purchase, custom cart logic" },
    { layer: "Integrations", value: "Loyalty, product reviews, email & newsletter" },
    { layer: "Performance", value: "Deferred JS, lazy media, lightweight custom forms" },
    { layer: "i18n", value: "French-first with a language switcher" },
  ],
  outcomes: [
    "A bespoke Shopify theme that carries a premium clean-beauty brand instead of a template.",
    "A real customer account — orders, personal details, loyalty points and referral on one dashboard — where Shopify gives you an order list and little else.",
    "Gift-with-purchase and cart rules Shopify does not offer natively, built as custom logic.",
    "A performance pass — deferred scripts, lazy-loaded images and video, swapped fonts, and heavy plugins replaced with lightweight custom code.",
    "A skin-diagnostic journey and an editorial Journal that do the brand's storytelling.",
    "Five years and counting — the same team maintaining and extending the store since 2021.",
  ],
  cta: "want a Shopify store that behaves like a custom build?",
};

export default function LeoniaCaseStudy() {
  return <CaseStudy data={data} />;
}
