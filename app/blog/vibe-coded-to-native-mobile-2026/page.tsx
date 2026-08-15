import Link from "next/link";
import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { JsonLd } from "@/components/jsonld";
import { CtaBand } from "@/components/cta-band";
import {
  PostHeader,
  PostBody,
  Callout,
  DataChart,
  TableScroll,
  Faq,
  AuthorByline,
  RelatedGrid,
  RelatedCard,
} from "@/components/blog";
import { buildPostSchemas, type FaqPair } from "@/lib/blog-post";

const PUBLISHED_ISO = "2026-05-22";
const MODIFIED_ISO = "2026-05-22";
const READ_TIME = "22 min read";

const PAGE_TITLE =
  "Vibe-Coded to Native: Converting a Lovable Web App into iOS + Android Apps (One Engagement, 14 Weeks) | Appycodes";
const PAGE_DESCRIPTION =
  "How we converted GravityOne, a Lovable-built web app with a Supabase backend, into native iOS and Android apps in 14 weeks. Code-sharing matrix, App Store rejection patterns, OTA strategy, and the per-phase engineering hours from one full engagement.";
const PAGE_PATH = "/blog/vibe-coded-to-native-mobile-2026/";
const PAGE_IMAGE = "/images/service-ai-to-native-app.jpg";
const PAGE_KEYWORDS =
  "vibe coded to native, lovable to react native, lovable to mobile app, convert web app to native mobile app, lovable to app store, claude web app to native, bolt to native mobile, ai studio to mobile app, react native conversion, flutter conversion from web app";

export const metadata: Metadata = pageMeta({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: PAGE_PATH,
  image: PAGE_IMAGE,
  type: "article",
  keywords: PAGE_KEYWORDS,
  publishedTime: PUBLISHED_ISO,
  modifiedTime: MODIFIED_ISO,
  authors: ["Ritesh Agarwal"],
});

const FAQS: FaqPair[] = [
  {
    q: "How long does it take to convert a Lovable / Claude / Bolt web app into native iOS and Android apps?",
    a: "On the GravityOne engagement walked through in this post: 14 weeks, 796 engineering hours, both stores live. Across roughly 14 similar conversions in the last 18 months we see 8 to 10 weeks for simple B2B SaaS, 10 to 14 weeks for medium-complexity consumer or marketplace apps, and 14 to 18 weeks for real-time / fintech / healthcare. These ranges assume the backend already exists and is healthy enough to reuse (Path A). If the web app is UI-only and the backend needs building from scratch (Path B), add 4 to 6 weeks and $25k to $50k.",
  },
  {
    q: "Do we have to rebuild the backend, or can we reuse the existing Supabase / Firebase / Node API?",
    a: "Reuse it. On GravityOne the Supabase project, the 23 RLS policies (audited and tightened, not replaced), the auth, the Stripe billing and the Edge Functions were all carried across unchanged. The mobile app hit the same endpoints the web app hit. Across the 12 layers of a typical web app, backend / types / validation schemas / billing all share at 100%. The structural saving versus a from-scratch rebuild is 280 to 340 engineer-hours and 6 to 8 weeks of calendar time on a medium-complexity product.",
  },
  {
    q: "React Native or Flutter, which should we pick?",
    a: "React Native is the default when the web app is already in React, which it almost always is for Lovable / Claude / Bolt / v0 / AI Studio output. The TypeScript types, Zod validation schemas, API client and a meaningful chunk of business logic move across the boundary cleanly. Pick Flutter when there is existing Dart expertise on the team or when pixel-identical rendering across iOS and Android is a hard requirement, both of which are uncommon. Native iOS / Android only makes sense when deep hardware integration, AR, or platform-specific UX is the core of the product.",
  },
  {
    q: "How much of the web code actually carries across to React Native?",
    a: "On GravityOne the average across 12 layers was 64%, but the distribution is bimodal. Backend, TypeScript types, Zod schemas, billing and design tokens shared at 100%. The API client shared at 92% (only the network adapter differs). Business logic and Zustand / React Query stores shared at 78%. UI components shared at 38%, Pressable / TextInput / Animated primitives replace HTML elements. Layout and navigation shared at 4%, React Router and React Navigation are fundamentally different models. Platform integrations (push, biometrics, camera, deep links) shared at 0% by design.",
  },
  {
    q: "Will the App Store actually approve a React Native app converted from a Lovable / Bolt prototype?",
    a: "Yes, but expect at least one rejection on first submission. On our last 14 React Native App Store submissions, 5 were rejected on Guideline 4.1 (vague permission strings), the single most common category. The fix takes ten minutes once you know what reviewers want, and the resubmission typically clears review in 24 to 48 hours. Other categories we hit: missing or unreachable privacy policy (3 of 14), crash on iPad or unsupported orientation (3), unclear subscription terms (2), external purchase mechanism (2), and missing Sign in with Apple on social-auth apps (1). Plan for one rejection cycle in your timeline.",
  },
  {
    q: "What does push notifications setup actually look like, and what fails most often?",
    a: "Expo or bare React Native, with FCM on Android and APNs on iOS via the standard managed certificate flow. The two failure modes we hit on GravityOne and routinely see elsewhere: the FCM token race on Android cold start (the token registers with your server before the messaging instance has finished initialising, fix by deferring registration until the first foreground heartbeat), and silent APNs failures on TestFlight when the sandbox certificate has expired without warning. We target above 95% push delivery within 60 seconds; GravityOne launched at 96.8%. The remaining 3% is structural carrier-side ceiling, not a client fix.",
  },
  {
    q: "Should we ship over-the-air updates (EAS Update / CodePush) for the app?",
    a: "Yes, for JavaScript-only changes. Set up two channels (production and staging) so the same-day fix path is available for typos, copy changes and bug fixes that do not touch native modules. Anything that touches a native module, new permissions, new dependencies, version bumps to React Native itself, must go through a real store update. OTA-shipping a native module change is the fastest way to brick an app version on real user devices.",
  },
  {
    q: "What performance targets should the converted mobile app hit at launch?",
    a: "Measured on a real low-end device in your target market (we use a Samsung A14, a ~$230 Android, as our reference): cold start under 2.5 seconds, first screen interactive under 1.5 seconds after cold start, OTA bundle size under 4 MB gzipped, crash-free sessions above 99.6% in the first 30 days, push delivery above 95% within 60 seconds, and ideally a first-try store submission. GravityOne hit eight of these nine targets at launch, the one miss was first-try iOS submission, which is the single most common production miss we see.",
  },
  {
    q: "What does end-to-end cost look like for a typical engagement?",
    a: "GravityOne was roughly $79k at our blended rates over 14 weeks. The honest ranges across our recent conversions: Path A simple (B2B SaaS, internal tools) $40k to $60k over 8 to 10 weeks; Path A medium (consumer, marketplace) $60k to $95k over 10 to 14 weeks; Path A complex (real-time social, fintech, healthcare) $95k to $160k over 14 to 18 weeks. Path B (UI-only web app, backend built from scratch) adds $25k to $50k and 4 to 6 weeks. The single biggest cost driver is not feature scope, it's whether the backend can be reused and whether the team needs offline writes.",
  },
  {
    q: "Will the mobile app feel native or like a wrapped website?",
    a: "Native. React Native renders real native UI components (UIView on iOS, View on Android), not HTML inside a webview. Animations run on the GPU via Reanimated v3, navigation matches platform conventions, screen transitions stay under 100ms on entry-level devices. The wrap-the-website approach (Capacitor, Cordova) gets rejected by reviewers more than half the time on first try in our experience, and users notice within a week even when it passes. Day-7 retention on GravityOne moved from 11% on the web to 33% on the native apps, a 22-point uplift we see consistently when push, instant resume, and home-screen presence land properly.",
  },
];

const schemas = buildPostSchemas({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: PAGE_PATH,
  image: PAGE_IMAGE,
  publishedISO: PUBLISHED_ISO,
  modifiedISO: MODIFIED_ISO,
  readTime: READ_TIME,
  breadcrumbLabel: "Vibe-Coded to Native Mobile 2026",
  keywords: PAGE_KEYWORDS,
  faqs: FAQS,
});

export default function Page() {
  return (
    <>
      <JsonLd data={schemas} />

      <PostHeader
        eyebrow="Engagement walkthrough"
        title="Vibe-Coded to Native: Converting a Lovable Web App into iOS + Android Apps"
        lead={
          <>
            One Lovable-built web product. One{" "}
            <Link href="/services/supabase-development/">Supabase backend</Link>, kept exactly as-is.
            One new React Native codebase. Both stores live in 14 weeks. Everything we changed,
            everything we deliberately did not change, and the numbers we hit at launch.
          </>
        }
        breadcrumbLabel="Vibe-Coded to Native Mobile 2026"
        dateISO={PUBLISHED_ISO}
        readTime={READ_TIME}
        image={PAGE_IMAGE}
        imageAlt="Converting a Lovable web app into native iOS and Android mobile apps"
      />

      <PostBody>
        <Callout variant="tldr">
          <ul>
            <li>
              <strong>14 weeks, 796 engineering hours, both stores live.</strong> One senior React
              Native engineer plus a backend engineer at 40% and a designer at 25%. Indicative
              engagement cost: roughly $79k at our blended rates, the backend stayed where it was.
            </li>
            <li>
              <strong>The backend, the database, the auth and the billing did not change.</strong> Same
              Supabase project, same 23 RLS policies (audited and tightened, not replaced), same Stripe
              customer IDs. The mobile app talks to the API the web app already talks to.
            </li>
            <li>
              <strong>64% of the codebase carried across on average, but the distribution is bimodal.</strong>{" "}
              Backend, types, validation schemas and design tokens shared at 100%. UI components shared
              at 38%. Navigation shared at 4%. The split tells you exactly where the engineering hours
              go.
            </li>
            <li>
              <strong>First iOS submission was rejected on Guideline 4.1 (vague permissions).</strong>{" "}
              Resubmission approved 41 hours later. Android approved on first attempt, 27 hours.
              Pattern: 5 of our last 14 React Native submissions hit the same rejection reason, it&apos;s
              the most common single category.
            </li>
          </ul>
        </Callout>

        <p>
          GravityOne arrived with a working web product built on Lovable. The database, the auth layer,
          the API endpoints, even the Stripe integration were all in production, serving real users on
          the web. The brief was simple: get the same product into the App Store and Play Store. The
          hidden brief, as it usually is, was the opposite of simple: do it without rebuilding the
          backend, without diverging the two codebases six months from now, and without producing a
          &quot;wrapped website&quot; that gets rejected by reviewers and ignored by users.
        </p>

        <p>
          This post walks through that engagement at the level of detail we wish more case studies
          offered, week by week, hours spent per phase, what we kept, what we rebuilt, what failed first
          review, and what the numbers looked like on launch day. It is not generic &quot;how to launch
          a mobile app&quot; content. It is one specific Lovable-to-native conversion, with the messy
          parts left in.
        </p>

        <h2>Why a native app, not a PWA or a webview wrapper</h2>

        <p>
          We talked the founder out of two cheaper options before we agreed to do this. The first was a
          Progressive Web App. PWAs have legitimate use cases, but consumer products that need push
          notifications, biometric auth, deep links from third-party apps, or App Store discovery do not
          get them from a PWA, at least not reliably across iOS Safari, where push support is still
          patchy and home-screen install is a hidden gesture. The second was a Capacitor or
          Cordova-style webview wrapper. We have shipped exactly zero of those in five years for a
          reason: even when they pass review (less than half the time on first try in our experience),
          users notice within a week and the one-star reviews start.
        </p>

        <p>
          Day-7 retention on the GravityOne web app was sitting at 11%. Day-7 retention on the launched
          native apps stabilised at 33% over the first 30 days, a 22-point uplift. We have seen the same
          shape on enough engagements to stop calling it luck. Push, instant app-switch resume, and a
          home-screen icon are not decorative features. They are the thing that makes the product part
          of someone&apos;s day. A wrapped web app has none of them in a way that feels native, and
          users can tell.
        </p>

        <h2>Anatomy of one engagement: GravityOne, 14 weeks, 796 hours</h2>

        <DataChart
          title="Chart 1: Engineering hours by phase on the GravityOne conversion"
          subtitle="Total: 796 engineer-hours across 14 weeks. Phases on the Y-axis, hours on the X."
          sources="Source: GravityOne engagement record, Appycodes (anonymised). Hours rounded to the nearest 8h."
        >
          <table>
            <thead>
              <tr>
                <th>Phase</th>
                <th>Weeks</th>
                <th>Name</th>
                <th>Hours</th>
                <th>Category</th>
                <th>Outcome</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>P1</td>
                <td>W1</td>
                <td>Audit + backend hardening</td>
                <td>56</td>
                <td>Backend</td>
                <td>RLS audit on 23 policies, schema lock, three mobile-only endpoints scoped.</td>
              </tr>
              <tr>
                <td>P2</td>
                <td>W2</td>
                <td>Native shell + auth</td>
                <td>60</td>
                <td>Native shell</td>
                <td>Expo bare RN shell, deep-link config, Supabase auth on device, navigation tree.</td>
              </tr>
              <tr>
                <td>P3</td>
                <td>W3 to W5</td>
                <td>Core flows port</td>
                <td>192</td>
                <td>Feature port</td>
                <td>Discovery, profile, sessions, payments, wired to the same API the web app uses.</td>
              </tr>
              <tr>
                <td>P4</td>
                <td>W6 to W8</td>
                <td>Real-time + social surface</td>
                <td>184</td>
                <td>Feature port</td>
                <td>Presence, in-app messaging, push registration, deep links into specific screens.</td>
              </tr>
              <tr>
                <td>P5</td>
                <td>W9 to W10</td>
                <td>Offline + perf budget</td>
                <td>120</td>
                <td>Mobile-only</td>
                <td>SQLite read cache, image pipeline, cold-start under 2.0s on Samsung A14.</td>
              </tr>
              <tr>
                <td>P6</td>
                <td>W11</td>
                <td>Internal beta + crash budget</td>
                <td>56</td>
                <td>Launch</td>
                <td>TestFlight + Firebase distribution, Sentry/Crashlytics wired, 99.7% crash-free.</td>
              </tr>
              <tr>
                <td>P7</td>
                <td>W12</td>
                <td>iOS submission</td>
                <td>48</td>
                <td>Submission</td>
                <td>First attempt rejected on 4.1 (permissions vagueness). Resubmission approved 41h later.</td>
              </tr>
              <tr>
                <td>P8</td>
                <td>W13</td>
                <td>Android submission</td>
                <td>32</td>
                <td>Submission</td>
                <td>Single attempt; approved 27h. Bytecode lint and FCM token race fixed pre-submit.</td>
              </tr>
              <tr>
                <td>P9</td>
                <td>W14</td>
                <td>Public release + monitoring</td>
                <td>48</td>
                <td>Launch</td>
                <td>Phased rollout (5% to 25% to 100%), OTA channel split prod/staging, retention dashboards.</td>
              </tr>
            </tbody>
          </table>
        </DataChart>

        <p>
          The chart above is the entire engagement on one axis. Below, week-by-week, what actually
          happened in each phase, with the choices we made and the things that surprised us.
        </p>

        <h3>Week 1: Backend audit and the &quot;do not rebuild&quot; decision</h3>

        <p>
          Before writing any mobile code we ran our standard{" "}
          <Link href="/blog/ai-prototype-codebase-audit-2026/">22-criterion audit</Link> on the existing
          Lovable codebase, with one major difference: this time we audited the <em>backend</em>{" "}
          specifically, because that&apos;s what the mobile app would inherit. Findings: 23 Row Level
          Security policies (4 of which read <code>using (true)</code>, the polite way to say &quot;no
          security at all&quot;), one Stripe webhook still unsigned in production, three Edge Functions
          with no rate limits, and a small but real N+1 query on the discovery feed that mattered more
          once mobile users were polling on cellular.
        </p>

        <p>
          We hardened the backend in week one, not as part of the mobile work, but as a precondition for
          it. By the end of the week, the same web app was running on a measurably safer Supabase
          project, and the mobile app had a stable contract to build against. The decision we made
          deliberately was <strong>not to add a separate &quot;mobile API&quot; surface</strong>. The
          mobile app would hit the same endpoints the web app hit. Where the payload had to differ
          (lighter list responses, push token registration, app-version gates), we added three new
          endpoints to the same API, not a second one.
        </p>

        <p>
          This is the single most important architectural decision in any web-to-native conversion. Once
          you have two APIs they will diverge, and the divergence will eat a sprint per quarter forever.
          We{" "}
          <Link href="/services/web-app-to-native-mobile-app/">
            build web-to-native conversions on a shared backend by default
          </Link>{" "}
          precisely because we have watched parallel APIs become technical debt on two separate
          engagements.
        </p>

        <h3>Week 2: Native shell, navigation, auth on device</h3>

        <p>
          Stack pick: React Native via Expo&apos;s bare workflow, with EAS for builds and OTA. The
          reasoning is not aesthetic, the web app was already in React. The TypeScript types, the
          validation schemas, the API client, and a meaningful chunk of the business logic could move
          across without rewriting. Flutter is a great option when there is existing Dart expertise on
          the team or when pixel-identical rendering across platforms is a hard requirement. GravityOne
          had neither, so React Native was the path of least new code.
        </p>

        <p>
          By the end of week two we had: an Expo bare RN project with EAS configured for both stores;
          deep-link configuration on iOS (Universal Links) and Android (App Links); Supabase Auth wired
          up against the same user table the web app used (so a user could sign in on either client with
          the same credentials); and the navigation tree, React Navigation with a tab + stack hybrid
          that matched the web app&apos;s information architecture without slavishly copying its URL
          structure.
        </p>

        <h3>Weeks 3 to 5: Core flows ported, shared package set up</h3>

        <DataChart
          title="Chart 2: Web-to-native code sharing by layer (%)"
          subtitle="Percentage of each layer carried across unchanged from the existing React web app into the new React Native app. Average across 12 layers: 64%."
          sources="Source: GravityOne web to native code diff at launch. Backend / types / schemas were lifted into a shared package."
        >
          <table>
            <thead>
              <tr>
                <th>Layer</th>
                <th>Shared %</th>
                <th>Note</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Backend (API, DB, business logic)</td>
                <td>100%</td>
                <td>Same Supabase project, same RLS, same Edge Functions. No duplicate API.</td>
              </tr>
              <tr>
                <td>Auth and session</td>
                <td>100%</td>
                <td>Same Supabase Auth users; deep-linked email confirmation handled on device.</td>
              </tr>
              <tr>
                <td>Billing (Stripe)</td>
                <td>100%</td>
                <td>Same Stripe customer IDs and price IDs. RevenueCat for in-app purchases only.</td>
              </tr>
              <tr>
                <td>Validation schemas (Zod)</td>
                <td>100%</td>
                <td>Lifted into a shared package; web and native import the same definitions.</td>
              </tr>
              <tr>
                <td>TypeScript types</td>
                <td>100%</td>
                <td>Generated from Supabase schema; one source of truth across both clients.</td>
              </tr>
              <tr>
                <td>API client</td>
                <td>92%</td>
                <td>fetch wrapper, retry, error mapping shared. Only the network adapter differs.</td>
              </tr>
              <tr>
                <td>Business logic (Zustand + RQ)</td>
                <td>78%</td>
                <td>Most stores and queries ported directly. AppState lifecycle hooks differ on mobile.</td>
              </tr>
              <tr>
                <td>Design tokens</td>
                <td>100%</td>
                <td>Same JSON tokens drive Tailwind on web and RN StyleSheet on native.</td>
              </tr>
              <tr>
                <td>UI components (buttons, inputs)</td>
                <td>38%</td>
                <td>Visual parity, but Pressable / TextInput / Animated primitives replace HTML.</td>
              </tr>
              <tr>
                <td>Layout and navigation</td>
                <td>4%</td>
                <td>React Router on web vs React Navigation on native, different model entirely.</td>
              </tr>
              <tr>
                <td>Animations and gestures</td>
                <td>18%</td>
                <td>Reanimated v3 + Gesture Handler on RN; CSS transitions on web.</td>
              </tr>
              <tr>
                <td>Platform integrations</td>
                <td>0%</td>
                <td>Push, biometrics, deep links, camera, file picker, native-only by design.</td>
              </tr>
            </tbody>
          </table>
        </DataChart>

        <p>
          The chart above is the heart of how we think about web-to-native conversions. Some layers
          carry across nearly untouched. Others have to be rebuilt because mobile interaction patterns
          are genuinely different. The split tells you where the engineering hours go.
        </p>

        <p>
          In weeks three through five we set up a shared TypeScript package, call it{" "}
          <code>@gravityone/shared</code>, and lifted into it: the database type definitions (generated
          from Supabase), the Zod validation schemas, the API client wrapper, and the more pure
          business-logic stores (search filters, sort orders, derived state). The web app refactored to
          import from that package in parallel; the native app imported from day one. By the end of week
          five, both clients were calling the same typed methods against the same backend. Adding a new
          field on the server flowed to both clients in a single PR.
        </p>

        <p>
          Where the work actually happened in those three weeks was the UI layer, the part of the chart
          sitting at 38%. Every list, every form, every card had to be rebuilt against React Native
          primitives. <code>{"<Pressable>"}</code> replaces <code>{"<button>"}</code>.{" "}
          <code>{"<TextInput>"}</code> replaces <code>{"<input>"}</code>. The design system primitives
          ported cleanly (colours, typography, spacing tokens all came from the same JSON file), but the
          components themselves were new. This is the unglamorous reality of &quot;code sharing in React
          Native&quot;, the language is the same, the runtime is not.
        </p>

        <h3>Weeks 6 to 8: Real-time, messaging, push notifications</h3>

        <p>
          Mobile-only surfaces showed up in the second sprint block. Real-time presence (who is online
          in a group right now) used the same Supabase Realtime channel the web app already used. In-app
          messaging was straightforward. Push was not.
        </p>

        <p>
          Push notifications are the single best documented and worst implemented mobile feature. We
          follow{" "}
          <Link href="/blog/push-notifications-expo-fcm-apns-2026/">
            a specific 12-failure-mode checklist
          </Link>{" "}
          when setting them up because we have hit every one. On GravityOne we hit two: the FCM token
          race on Android cold start (token registered with our server before the <code> messaging()</code>{" "}
          instance had finished initialising; fix: defer registration until the first foreground
          heartbeat), and a silent APNs failure on TestFlight where production certificates were correct
          but sandbox certificates had expired two months earlier. The Apple developer dashboard does
          not warn you about this; we found it by inspecting the <code> NSError</code> domain on a failed
          schedule and correlating it with the certificate console.
        </p>

        <p>
          By the end of week eight, push delivery was sitting at 96.8% within 60 seconds on real devices
          across both platforms. The target was 95%. The remaining ~3% is the structural ceiling imposed
          by carrier-side delivery on Android, which no amount of client engineering will fix.
        </p>

        <h3>Weeks 9 to 10: Offline reads, perf budget, image pipeline</h3>

        <p>
          Offline is where most &quot;wrapped web app&quot; projects fall over. Browsers handle offline
          by failing gracefully; native apps are expected to keep working. We built a small explicit
          sync layer on top of <code>expo-sqlite</code>: read-cache for feed and profile data, written
          through to disk on every network response and read from disk on every cold start. No
          write-side conflict resolution (the product did not need offline writes), so we dodged the
          hardest part of sync. We{" "}
          <Link href="/services/react-native-app-development/">
            build offline this way on most React Native apps
          </Link>
          , explicit, boring, debuggable.
        </p>

        <p>
          The performance budget was the other half of these two weeks. On a Samsung A14 (a $230
          entry-level Android, our reference device for the bottom-quartile user), cold start landed at
          1.9s against a 2.5s target. First screen interactive at 0.9s against a 1.5s target. We hit
          those by deferring the bundle split such that auth-aware screens were in the main bundle and
          everything else lazy-loaded, by aggressively prefetching the hero image of the first feed item
          before render, and by moving the Hermes engine onto the runtime (Expo&apos;s default in bare
          workflow as of SDK 50).
        </p>

        <h3>Week 11: Internal beta, crash budget, the &quot;is it ready&quot; call</h3>

        <p>
          TestFlight build out the door first, then Firebase App Distribution for Android. 24 internal
          testers, then a wider circle of 80 over four days. Sentry and Crashlytics live from the first
          internal build. The crash-free-session rate stabilised at 99.7% by the end of the week against
          a 99.6% target. We do not submit to either store below 99.5%, we have learned the hard way that
          a crash that shows up in 0.5% of sessions in internal beta tends to show up in 1.5% of sessions
          on real users, and 1.5% gets you a one-star wave.
        </p>

        <h3>Week 12: iOS submission, rejection, resubmission</h3>

        <DataChart
          title="Chart 3: App Store rejection reasons on our last 14 RN submissions"
          subtitle="Count of rejections by reason category. Some submissions accumulated more than one reason on the same review."
          sources="Source: Appycodes submission log, last 14 React Native App Store reviews. Categorised by Apple's Guideline section in the rejection email."
        >
          <table>
            <thead>
              <tr>
                <th>Reason</th>
                <th>Count (of 14)</th>
                <th>%</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Vague permission descriptions (Guideline 4.1)</td>
                <td>5</td>
                <td>36%</td>
              </tr>
              <tr>
                <td>Missing or unreachable privacy policy URL</td>
                <td>3</td>
                <td>21%</td>
              </tr>
              <tr>
                <td>Crash on iPad / unsupported orientation</td>
                <td>3</td>
                <td>21%</td>
              </tr>
              <tr>
                <td>Subscription terms unclear (Guideline 3.1.2)</td>
                <td>2</td>
                <td>14%</td>
              </tr>
              <tr>
                <td>External purchase mechanism (3.1.1)</td>
                <td>2</td>
                <td>14%</td>
              </tr>
              <tr>
                <td>Sign in with Apple missing on social-auth apps</td>
                <td>1</td>
                <td>7%</td>
              </tr>
            </tbody>
          </table>
        </DataChart>

        <p>
          First iOS submission was rejected the next afternoon. Guideline 4.1, Design, Permission
          Strings. The <code> NSCameraUsageDescription</code> string read &quot;Required to upload
          photos&quot;, which Apple&apos;s reviewer correctly noted does not tell the user what the
          camera will be used for in this specific app. We rewrote the four permission strings to be
          specific (&quot;Take a photo of your venue check-in to share with your group&quot;),
          resubmitted, and were approved 41 hours later.
        </p>

        <p>
          This is the single most common rejection reason we see, five of our last 14 submissions, the
          most frequent category on the chart above. The fix takes ten minutes. The cost of <em>not</em>{" "}
          fixing it pre-submission is at least two days of calendar time. We{" "}
          <Link href="/blog/react-native-app-store-rejection-data-2026/">
            wrote up the full rejection-reason breakdown
          </Link>{" "}
          elsewhere, but the headline applies: every permission string in your <code>Info.plist</code>{" "}
          should describe a specific user-visible behaviour, not a developer-facing requirement.
        </p>

        <h3>Week 13: Android submission</h3>

        <p>
          Approved on first attempt, 27 hours from submission. The friction on Android was earlier in
          the process: we hit a bytecode lint warning that would have produced a Play Console warning at
          upload time (a deprecated API call on the FCM instance ID, fixed in a one-line refactor), and
          we tightened the Data Safety form to declare exactly the categories of data the app actually
          transmits. Play&apos;s reviewers are less likely to reject and more likely to{" "}
          <em>warn-and-publish</em>; getting it right pre-submission is about avoiding the warnings, not
          avoiding outright rejection.
        </p>

        <h3>Week 14: Public release, monitoring, OTA channel setup</h3>

        <p>
          Phased rollout on both platforms: 5% of users on day one, 25% on day three, 100% on day seven.
          EAS Update configured with two channels, <code>production</code> and <code>staging</code>, so
          that JavaScript-only changes can ship the same day they merge to <code>main</code>, but
          anything touching native modules still goes through a real store build. We{" "}
          <Link href="/blog/ota-updates-eas-codepush-2026/">
            are deliberate about which change goes which path
          </Link>
          , OTA-shipping a native module change is the fastest way to brick an app version on user
          devices.
        </p>

        <h2>Where the 796 hours actually went</h2>

        <DataChart
          title="Chart 4: Where the 796 engineering hours went"
          subtitle="Aggregated by work category. Feature port (porting web flows to native) dominated, followed by mobile-only surfaces and the native shell."
          sources="Source: same GravityOne engagement record, aggregated by category tag."
        >
          <table>
            <thead>
              <tr>
                <th>Category</th>
                <th>Engineering hours</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Feature port</td>
                <td>376</td>
              </tr>
              <tr>
                <td>Mobile-only</td>
                <td>120</td>
              </tr>
              <tr>
                <td>Launch</td>
                <td>104</td>
              </tr>
              <tr>
                <td>Submission</td>
                <td>80</td>
              </tr>
              <tr>
                <td>Native shell</td>
                <td>60</td>
              </tr>
              <tr>
                <td>Backend</td>
                <td>56</td>
              </tr>
            </tbody>
          </table>
        </DataChart>

        <p>
          The category breakdown is the most actionable view for anyone budgeting a similar engagement.{" "}
          <strong>Feature port</strong>, the work of taking flows that already existed on the web and
          rebuilding the UI layer for React Native, was 47% of the total. <strong>Mobile-only surfaces</strong>{" "}
          (push, deep links, offline, performance) were 15%. The <strong>native shell and auth</strong>{" "}
          were 8%. <strong>Submission</strong> across both stores was 10%, with the iOS resubmission
          accounting for most of that. <strong>Backend hardening</strong> was 7%. The remainder went to{" "}
          <strong>launch and monitoring</strong>.
        </p>

        <p>
          The interesting number is the one missing from the chart: backend rebuild was <em>zero</em>{" "}
          hours. The Supabase project the web app already used was the Supabase project the mobile app
          used at launch. If we had rebuilt the backend from scratch against a new design, which is what
          a from-scratch native app would have done, we would have added an estimated 280 to 340
          additional engineer-hours and 6 to 8 weeks of calendar time. That is the explicit value of the
          reuse-existing-backend approach: not a small refactor saving, but a structural saving you can
          put on a board update slide.
        </p>

        <h2>Production targets vs actuals at launch</h2>

        <TableScroll>
          <table>
            <thead>
              <tr>
                <th>Target</th>
                <th>Budget</th>
                <th>Actual at launch</th>
                <th>Pass</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Cold start (Samsung A14)</td>
                <td>&lt; 2.5s</td>
                <td>1.9s</td>
                <td>Yes</td>
              </tr>
              <tr>
                <td>Cold start (iPhone 11)</td>
                <td>&lt; 1.5s</td>
                <td>1.1s</td>
                <td>Yes</td>
              </tr>
              <tr>
                <td>First screen interactive</td>
                <td>&lt; 1.5s</td>
                <td>0.9s</td>
                <td>Yes</td>
              </tr>
              <tr>
                <td>OTA bundle size (gzipped)</td>
                <td>&lt; 4 MB</td>
                <td>3.1 MB</td>
                <td>Yes</td>
              </tr>
              <tr>
                <td>Crash-free sessions (launch + 30d)</td>
                <td>&gt; 99.6%</td>
                <td>99.74%</td>
                <td>Yes</td>
              </tr>
              <tr>
                <td>Push delivery within 60s</td>
                <td>&gt; 95%</td>
                <td>96.8%</td>
                <td>Yes</td>
              </tr>
              <tr>
                <td>iOS submission attempts</td>
                <td>First try</td>
                <td>Second</td>
                <td>No</td>
              </tr>
              <tr>
                <td>Android submission attempts</td>
                <td>First try</td>
                <td>First</td>
                <td>Yes</td>
              </tr>
              <tr>
                <td>Day-7 retention (mobile vs web)</td>
                <td>+ uplift</td>
                <td>+22 pts</td>
                <td>Yes</td>
              </tr>
            </tbody>
          </table>
        </TableScroll>

        <p>
          Nine production targets, eight of them met or beaten at launch. The one we missed, first-try
          iOS submission, cost two days of calendar time. Everything else was either inside budget (cold
          start, push delivery, bundle size) or beyond it (Day-7 retention came in 22 points above the
          web baseline, which is the number that matters to the founder).
        </p>

        <h2>How to do this on your project: the decision tree</h2>

        <p>
          The GravityOne conversion is what we call a Path A engagement: the backend already existed and
          was healthy enough to keep. Roughly 60% of the projects we take on are Path A. The other 40%
          are Path B, the web app is UI-only, the data is mocked, the auth is a stub, and the backend has
          to be built around the existing UI as a reference design. Path B engagements take 12 to 18
          weeks instead of 8 to 14, and the engineering split shifts heavily toward backend work in the
          first month.
        </p>

        <p>The decision tree is short:</p>

        <ul>
          <li>
            <strong>
              Does your Lovable / Claude / Bolt / v0 / AI Studio build have a real backend
            </strong>
            , a database, an auth layer, API endpoints, and a billing integration that have actually
            served real users at some point? <strong>Yes</strong> goes to Path A. <strong>No</strong>{" "}
            goes to Path B.
          </li>
          <li>
            <strong>Is your web app already in React?</strong> Lovable, Bolt, v0, Claude and AI Studio
            all output React, so the answer is almost always yes. <strong>Yes</strong> goes to React
            Native is the default. <strong>No</strong> goes to look at Flutter, but only if there is
            existing Dart expertise on the team.
          </li>
          <li>
            <strong>Do you need iOS only, Android only, or both?</strong> If both, the conversion path
            described in this post applies. If one platform only, the engagement is shorter, but the
            per-platform submission work does not shrink, so the saving is not proportional.
          </li>
          <li>
            <strong>Do you need offline writes, AR / VR, or heavy hardware access?</strong> If yes, this
            conversion path is the wrong call, those products want native iOS / Android, not React
            Native. We will tell you so on the first call.
          </li>
        </ul>

        <h2>Steps in detail: what to actually do, in order</h2>

        <p>
          For founders running this themselves rather than hiring it out, the engineering sequence is
          consistent. The hours change, the steps do not.
        </p>

        <ol>
          <li>
            <strong>Audit the existing backend, not the frontend.</strong> You are about to add a second
            client. RLS policies that read <code> using (true)</code>, unsigned webhooks, and unrated
            Edge Functions are bombs you do not want a mobile reviewer to find for you. Run a real audit.
            Our <Link href="/blog/ai-prototype-codebase-audit-2026/">22-criterion rubric</Link> is
            open-source enough to copy.
          </li>
          <li>
            <strong>Lift types, validation and the API client into a shared package.</strong> Even if the
            web app does not have one yet, set it up before writing native code. The web app refactors to
            import from it in parallel; the native app imports from day one. This is the single biggest
            mistake people skip and pay for later.
          </li>
          <li>
            <strong>Start the native build with Expo bare workflow.</strong> EAS for builds and OTA, full
            access to native modules when you need them. Avoid the fully managed workflow if you expect
            to add native modules in the next 12 months, the migration off it is not free.
          </li>
          <li>
            <strong>Wire auth before any feature.</strong> Same provider as the web app, same user table.
            If your web app uses Supabase Auth, Firebase, Clerk, Auth0 or NextAuth, the native SDK
            exists. A user signing in on the app should see the same account they have on the web.
          </li>
          <li>
            <strong>Build navigation as a tree, not as URL paths.</strong> React Navigation&apos;s tab +
            stack model is fundamentally different from React Router. Deep links map to the tree, not to
            web URLs. Plan this on paper before writing any screens.
          </li>
          <li>
            <strong>Port flows in vertical slices, not horizontal layers.</strong> &quot;Profile flow end
            to end&quot; produces a shippable surface in a week. &quot;All forms across the app&quot;
            produces nothing shippable for three weeks. The vertical slice keeps the team motivated and
            gives you a real beta build to test against on every sprint.
          </li>
          <li>
            <strong>Wire push notifications around week six, not week twelve.</strong> Push is the
            most-failure-prone subsystem in any mobile app. The earlier you discover the FCM token race
            or the APNs sandbox cert mismatch, the cheaper the fix. Use{" "}
            <Link href="/blog/push-notifications-expo-fcm-apns-2026/">
              the 12-failure-mode checklist
            </Link>{" "}
            during integration, not after rejection.
          </li>
          <li>
            <strong>Set the performance budget on a real low-end device.</strong> An entry-level Android
            in your target market, not a flagship. Measure cold start, first interactive, and bundle size
            from the first internal build, not the day before submission.
          </li>
          <li>
            <strong>Write the permission strings before they cost you a rejection.</strong> Every entry in
            your <code>Info.plist</code> and <code>AndroidManifest.xml</code> should describe a specific
            user-visible behaviour. &quot;Required to upload photos&quot; fails. &quot;Take a photo of
            your venue check-in to share with your group&quot; passes. This is ten minutes of writing.
          </li>
          <li>
            <strong>Submit iOS before Android.</strong> iOS review is slower and rejection is more likely.
            Knowing the result before you submit Android lets you reuse the same marketing copy,
            screenshots, and metadata with confidence. If iOS rejects, you have not also wasted Android
            review time.
          </li>
        </ol>

        <h2>How much does this cost end-to-end?</h2>

        <p>
          The GravityOne engagement was 796 engineering hours over 14 weeks. At our blended rates that
          lands around $79k. The honest range we see across roughly 14 web-to-native conversions in the
          last 18 months is wider:
        </p>

        <ul>
          <li>
            <strong>Path A, simple product (B2B SaaS, internal tool):</strong> 8 to 10 weeks, 400 to 550
            engineering hours, $40k to $60k.
          </li>
          <li>
            <strong>Path A, medium complexity (consumer app, marketplace):</strong> 10 to 14 weeks, 600
            to 850 hours, $60k to $95k. GravityOne sits in this band.
          </li>
          <li>
            <strong>Path A, complex (real-time social, fintech, healthcare):</strong> 14 to 18 weeks, 900
            to 1300 hours, $95k to $160k. Compliance work and offline-first complexity push the upper
            bound.
          </li>
          <li>
            <strong>Path B (UI-only web app, no backend yet):</strong> add 4 to 6 weeks and $25k to $50k
            for the backend build that Path A skipped. The mobile-only portion stays similar.
          </li>
        </ul>

        <p>
          Two numbers worth holding on to. First: the backend-reuse saving is structural, not marginal.
          For GravityOne it was roughly $30k to $40k of avoided work, plus 6 to 8 weeks of calendar time.
          Second: App Store submission consistently eats more time than the budget anticipates. Every
          engagement we have closed in the last two years has lost at least one day to permission-string
          or screenshot revisions, and three of the last fourteen lost more than a week to a real
          rejection cycle. Plan for it.
        </p>

        <h2>Why we are reasonably opinionated about React Native here</h2>

        <p>
          We default to React Native on web-to-native conversions, but the defaults have a logic and we
          will tell you when to break them.
        </p>

        <p>
          <strong>Pick React Native if</strong> your web app is in React (Lovable / Claude / Bolt / v0 /
          AI Studio all output React), you want code reuse across web and native, and your team is
          already comfortable with the React mental model. You will be importing types, schemas, and a
          chunk of business logic across the boundary cleanly.
        </p>

        <p>
          <strong>Pick Flutter if</strong> you already have Dart expertise on the team, you need
          pixel-identical rendering across iOS and Android (rare for most products, common for brand-led
          design systems with very strict tolerances), or your design language depends on highly custom
          canvas-style UI that Flutter renders more cleanly than RN does. We have shipped Flutter when it
          was the right call. It was not the right call on GravityOne.
        </p>

        <p>
          <strong>Pick native iOS / Android only if</strong> the app&apos;s core value is in deep
          hardware integration (AR, ML on device, precision sensors, complex audio pipelines) or in
          platform-specific UX patterns users explicitly expect. Most consumer apps that need a
          &quot;really native feel&quot; actually need good animation work, not native code. React Native
          plus Reanimated v3 closes the perceived gap on 90% of the animations users notice.
        </p>

        <h2>What we would do differently on the next one</h2>

        <p>
          Three things in priority order. First, we would set up the shared package in week zero, not
          week three. The first two weeks of porting work is faster when types and schemas already live
          in a place both clients can import from. We treated the shared package as a refactor; on the
          next engagement we will treat it as a precondition.
        </p>

        <p>
          Second, we would write the permission strings on day one, not the day before submission.
          Knowing what camera, location and notification permissions the app will need is a product
          question, not a submission question. Writing the strings early forces the conversation with the
          founder about which permissions are actually justifiable, and we removed two permissions
          entirely on GravityOne after that conversation, which simplified the privacy declaration and
          the Data Safety form.
        </p>

        <p>
          Third, we would wire crash reporting before TestFlight, not with TestFlight. The first internal
          build is the build where real users start finding crashes that internal testing missed. The
          earlier you have a Sentry or Crashlytics dashboard with real session counts, the faster you
          find the failure modes that matter.
        </p>

        <h2>Where this work actually happens</h2>

        <p>
          We{" "}
          <Link href="/services/web-app-to-native-mobile-app/">run web-to-native conversions</Link> as a
          focused service: backend reused, frontend rebuilt in React Native (or Flutter where it fits),
          both stores live inside 8 to 18 weeks depending on Path A vs Path B. The same team that does
          the conversion stays on for the post-launch 30-day stability watch and, in most cases, the
          ongoing{" "}
          <Link href="/services/react-native-app-development/">React Native development</Link> retainer
          that follows. Where the backend is the limiting factor, not present, not healthy, or not
          designed for the mobile load profile, we add{" "}
          <Link href="/services/saas-web-app-development/">SaaS web app development</Link> capacity into
          the same engagement so the backend, web and native ship in lockstep instead of three diverging
          tracks.
        </p>

        <p>
          Five companion reports that back the choices in this engagement, Lovable-to-production cost
          data, App Store rejection patterns, AI-prototype audit rubric, OTA strategy, and push
          notification setup:
        </p>

        <RelatedGrid>
          <RelatedCard
            tag="Research"
            title="Lovable / Bolt to Production: The Real Cost & Timeline (20 Engagements, 1 Anatomy)"
            body="Opens with a deep teardown of one specific AI-prototype-to-production engagement, then aggregates cost and timeline across 20 projects."
            href="/blog/lovable-to-production-cost-2026/"
          />
          <RelatedCard
            tag="Research"
            title="41 React Native App Submissions, Three Rejection War Stories"
            body="Three specific rejection narratives from the App Store and Google Play, plus the aggregate rejection-reason data behind 41 RN submissions."
            href="/blog/react-native-app-store-rejection-data-2026/"
          />
          <RelatedCard
            tag="Research"
            title="We Audited 31 Lovable / Bolt / v0 / Cursor Codebases. Here's What Survives Production."
            body="A code-level teardown of 31 AI-generated SaaS prototypes: three proprietary metrics (PSR, TDR, RCM) and a 10-mode failure taxonomy."
            href="/blog/ai-prototype-codebase-audit-2026/"
          />
          <RelatedCard
            tag="Research"
            title="OTA Updates in Production: EAS vs CodePush vs Manual, 47 App Cost & Latency Study"
            body="OTA cost, adoption-after-release curves, and rollback cost across EAS, CodePush, and manual update strategies on 47 production RN apps."
            href="/blog/ota-updates-eas-codepush-2026/"
          />
          <RelatedCard
            tag="Research"
            title="Push Notifications on Expo + FCM + APNs: The Setup That Actually Delivers"
            body="End-to-end push setup for React Native apps on Expo, FCM and APNs: token registration, delivery measurement, and the 12 failure modes we see most often when delivery rates drop."
            href="/blog/push-notifications-expo-fcm-apns-2026/"
          />
        </RelatedGrid>

        <p>
          The web-to-native conversion service, the React Native development retainer that follows, and
          the SaaS web app capacity we add when the backend is the bottleneck:
        </p>

        <RelatedGrid>
          <RelatedCard
            tag="Service"
            title="Web App to Native Mobile App"
            body="Backend reused, frontend rebuilt in React Native, both stores live inside 8 to 18 weeks depending on Path A vs Path B."
            href="/services/web-app-to-native-mobile-app/"
          />
          <RelatedCard
            tag="Service"
            title="React Native App Development"
            body="The ongoing React Native development retainer that follows the conversion and the 30-day stability watch."
            href="/services/react-native-app-development/"
          />
          <RelatedCard
            tag="Service"
            title="SaaS Web App Development"
            body="The capacity we add when the backend is the limiting factor, so backend, web and native ship in lockstep."
            href="/services/saas-web-app-development/"
          />
        </RelatedGrid>

        <Faq items={FAQS} />

        <AuthorByline lastReviewedISO={MODIFIED_ISO}>
          Ritesh scoped and led the GravityOne web-to-native conversion described above. Most recent
          shipped projects include a Lovable-built marketplace migrated to a native React Native app
          across both stores in 12 weeks, and a Bolt-built consumer app where the backend needed building
          from scratch around the existing vibe-coded UI.
        </AuthorByline>
      </PostBody>

      <CtaBand />
    </>
  );
}
