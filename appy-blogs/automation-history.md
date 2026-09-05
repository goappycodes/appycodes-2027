# Appycodes UK authority publication history

## 2026-09-05 — Postcodes.io vs Ideal Postcodes

- **Run status:** Quality gate passed; ready for production publication.
- **Title:** Postcodes.io vs Ideal Postcodes: Which UK Address Lookup Should You Use?
- **Slug:** `postcodes-io-vs-ideal-postcodes-uk-address-lookup`
- **Primary cluster:** UK company data and identity — `/uk/insights/company-data-identity/`
- **Target UK business type / search intent:** UK retailers, home-services and cover businesses, SaaS directories and marketplaces choosing between postcode geography and full delivery-address capture.
- **Publication date:** 2026-09-05
- **Review date:** 2026-09-05
- **Author:** Ritesh Agarwal
- **Reviewer:** Appycodes Editorial Team
- **Article length:** Approximately 2,300 useful words in the rendered editorial page, excluding navigation and site-wide sections.

### Mandatory originality checklist

- [x] **Real Appycodes situation:** Repository-backed PlusHeat engagement: a UK boiler and home-emergency cover funnel with plan configuration, postcode address lookup, live plan summary, CRM synchronisation and attribution. Evidence: `app/case-studies/plusheat/page.tsx` and commit `1137763`.
- [x] **Genuine limitation / difficult decision:** The flow needs a customer-selected premises for operations while early service-area logic may need only postcode geography. The article explicitly avoids claiming an unverified vendor, lookup volume or incident.
- [x] **Original Appycodes model:** Premises Dependency Score (PDS), a weighted 0–10 decision model routing postcode-only, hybrid/manual and premises-level requirements.
- [x] **Practical technical example:** A Next.js Route Handler with explicit `geography` and `address` modes, server-side key handling, normalised response contracts, differentiated caching and failure responses.
- [x] **Authoritative sources:** Eight current primary/first-party sources placed beside the claims they support.
- [x] **Tailored recommendations:** Separate recommendations for UK retailers, SaaS/directories, home-services/cover businesses and marketplaces/platforms.
- [x] **Contextual internal links:** UK company-data cluster, central UK hub, Companies House guide, PlusHeat case study, API & Integration service and Web & Commerce service.
- [x] **Attribution:** Ritesh Agarwal named as author; Appycodes Editorial Team named as reviewer; publication and review dates visible and represented in structured data.
- [x] **Concrete visual / evidence:** One bespoke generated hero, one responsive architecture flow, two decision tables, one scoring model and the code example. No generated text, logos, flags or fake UI appear in the hero.

### Final weighted quality score — 95/100

- **First-hand Appycodes evidence — 18/20.** The PlusHeat case and exact lead-flow components are verifiable in the repository and public case study. Two points are withheld because the public evidence does not identify the address vendor or measured lookup outcomes; the article states that limitation instead of guessing.
- **Original insight — 19/20.** The postcode-record versus premises-record distinction is developed into the original PDS model and a split-stage eligibility/fulfilment architecture. One point is withheld because teams still need to calibrate the score against their own cost and risk profile.
- **Accuracy and source quality — 14/15.** All current service, dataset, rate-limit, licensing and UX claims are tied to eight official or first-party sources checked on 2026-09-05. One point is withheld because commercial data terms remain use-case-specific and require the reader to verify their contract.
- **UK specificity and search intent — 15/15.** The article directly answers the named comparison and covers ONSPD, OS OpenData, Northern Ireland licensing, Royal Mail PAF, UK address structure and GOV.UK form guidance.
- **Practical usefulness — 14/15.** The page includes a decision table, PDS calculation, provider-boundary workflow, failure matrix, business-specific recommendations and implementation code. One point is withheld because a credentialled live Ideal Postcodes request cannot be tested in the repository.
- **Structure and readability — 5/5.** Direct answer first, descriptive headings, contents navigation, concise definitions, responsive cards, tables and code.
- **Technical SEO and GEO readiness — 5/5.** Precise metadata and H1, canonical, article/FAQ/breadcrumb schema, author/reviewer/date, sitemap registration, accessible hero alt text, quote-ready definitions and linked sources.
- **Commercial relevance and internal links — 5/5.** The comparison maps directly to retailer, home-service, SaaS and marketplace buying decisions and links to the relevant Appycodes service, case study, related guide, cluster and hub.

### Authoritative sources checked

1. Postcodes.io API documentation — https://postcodes.io/docs/api/
2. Postcodes.io source and data overview — https://github.com/ideal-postcodes/postcodes.io
3. Office for National Statistics guidance on postcode directories and boundaries — https://www.ons.gov.uk/aboutus/transparencyandgovernance/freedomofinformationfoi/unitaryauthoritiesintheukmappedtofullpostcodes
4. Ideal Postcodes API reference — https://docs.ideal-postcodes.co.uk/docs/api/api-reference/
5. Ideal Postcodes OpenAPI overview — https://openapi.ideal-postcodes.co.uk/
6. Ideal Postcodes postcode-lookup configuration — https://docs.ideal-postcodes.co.uk/docs/postcode-lookup/configure/
7. Postcodes.io licence summary — https://postcodes.io/docs/licences/
8. GOV.UK Design System address pattern — https://design-system.service.gov.uk/patterns/addresses/

### Files in publication scope

- `app/blog/postcodes-io-vs-ideal-postcodes-uk-address-lookup/page.tsx`
- `app/blog/postcodes-io-vs-ideal-postcodes-uk-address-lookup/page.module.css`
- `public/images/blog-postcodes-io-vs-ideal-postcodes-uk-address-lookup.png`
- `app/uk/insights/page.tsx`
- `app/uk/insights/company-data-identity/page.tsx`
- `app/uk/insights/payments-ecommerce/page.tsx`
- `app/uk/insights/product-engineering-compliance/page.tsx`
- `components/uk-insights-page.tsx`
- `components/uk-insights-page.module.css`
- `lib/uk-insights.ts`
- `lib/blog.ts`
- `lib/blog-post.ts`
- `app/sitemap.ts`
- `appy-blogs/automation-history.md`

### Verification and publication audit

- **Build:** Passed `npm run build` on 2026-09-05; Next.js compiled, TypeScript passed and 146 static routes generated.
- **Internal links:** Article, hub, all three clusters, related guide, PlusHeat case study, both service pages and sitemap returned HTTP 200 locally.
- **Source links:** All eight source URLs resolved and their supporting claims were rechecked on 2026-09-05.
- **Structured data:** Browser check found BlogPosting, BreadcrumbList and FAQPage; canonical and reviewer were present.
- **Desktop visual check:** Passed at 1280×720; hero loaded, one H1, no horizontal overflow and no console errors.
- **Phone visual check:** Passed at 390×844; cards collapse to one column, tables and code remain scroll-contained, hero loads and no horizontal overflow appears.
- **Hub / cluster check:** Central hub exposes all three cluster links; company-data cluster visibly links to the new article; both passed phone-width rendering with no console errors.
- **Generated hero:** Built-in image generation; wide Appycodes editorial workflow comparing postcode geography with delivery-point address selection; saved as `public/images/blog-postcodes-io-vs-ideal-postcodes-uk-address-lookup.png`.
- **Publication commit:** Pending.
- **Live URL:** https://appycodes.dev/blog/postcodes-io-vs-ideal-postcodes-uk-address-lookup/ — pending deployment verification.
- **Live cluster URL:** https://appycodes.dev/uk/insights/company-data-identity/ — pending deployment verification.
- **Deployment verification:** Pending.
- **Email status:** Pending; send only after the live article and cluster link are confirmed.
