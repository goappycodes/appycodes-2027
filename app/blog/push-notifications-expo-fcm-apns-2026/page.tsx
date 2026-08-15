import Link from "next/link";
import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { JsonLd } from "@/components/jsonld";
import { CtaBand } from "@/components/cta-band";
import {
  PostHeader,
  PostBody,
  CodeBlock,
  AuthorByline,
  RelatedGrid,
  RelatedCard,
  Faq,
} from "@/components/blog";
import { buildPostSchemas } from "@/lib/blog-post";

const PUBLISHED_ISO = "2026-05-15";
const MODIFIED_ISO = "2026-05-15";
const READ_TIME = "22 min read";

const FAQS = [
  {
    q: "Why does our push delivery rate decay over time?",
    a: "Most often, dead tokens are not being pruned. Uninstalls and re-installs create new tokens; the old ones stay in the database wasting tickets and eventually triggering throttling. Reconcile receipts on a cron, act on DeviceNotRegistered by invalidating the token, and the slow decay stops.",
  },
  {
    q: "Why do some pushes show up silent on Android?",
    a: "Notification channel misconfiguration. The channel was created at low importance, or a custom channel was created without setting importance to HIGH. Once a channel is created the importance cannot be changed, you have to ship a new channel id (e.g. `default-v2`) and migrate users to it.",
  },
  {
    q: "What signal proves a push was actually delivered to a device?",
    a: "A device-side received event. Expo, FCM and APNs all return success on the ticket / receipt long before a push appears on the lockscreen. The only reliable signal is the app itself reporting `addNotificationReceivedListener` callback fires. The gap between ticket-success and device-received averages 12-18% on Android in our sample.",
  },
];

export const metadata: Metadata = pageMeta({
  title: "Push Notifications on Expo + FCM + APNs: The Setup That Actually Delivers | Appycodes",
  description:
    "End-to-end push setup for React Native apps on Expo, FCM and APNs, token registration, delivery measurement, and the 12 failure modes we see most often when delivery rates drop.",
  path: "/blog/push-notifications-expo-fcm-apns-2026/",
  image: "/images/blog-push-notifications-2026.jpg",
  type: "article",
  keywords:
    "expo push notifications, fcm setup, apns setup, react native push, push delivery rate, expo notifications",
  publishedTime: PUBLISHED_ISO,
  modifiedTime: MODIFIED_ISO,
  authors: ["Ritesh Agarwal"],
});

const schemas = buildPostSchemas({
  title: "Push Notifications on Expo + FCM + APNs: The Setup That Actually Delivers | Appycodes",
  description:
    "End-to-end push setup for React Native apps on Expo, FCM and APNs, token registration, delivery measurement, and the 12 failure modes we see most often when delivery rates drop.",
  path: "/blog/push-notifications-expo-fcm-apns-2026/",
  image: "/images/blog-push-notifications-2026.jpg",
  publishedISO: PUBLISHED_ISO,
  modifiedISO: MODIFIED_ISO,
  readTime: READ_TIME,
  breadcrumbLabel: "Push Notifications on Expo + FCM + APNs",
  keywords:
    "expo push notifications, fcm setup, apns setup, react native push, push delivery rate, expo notifications",
  faqs: FAQS,
});

export default function Page() {
  return (
    <>
      <JsonLd data={schemas} />

      <PostHeader
        eyebrow="Field guide"
        title="Push notifications on Expo + FCM + APNs, the setup that actually delivers"
        lead="The 30-minute setup, the end-to-end delivery chain, and a catalog of the twelve failure modes we see most often when a previously-fine push pipeline starts silently dropping 30-40% of notifications. Drawn from the same 47-app maintenance corpus behind our OTA Updates study."
        breadcrumbLabel="Push Notifications on Expo + FCM + APNs"
        dateISO={PUBLISHED_ISO}
        readTime={READ_TIME}
        authorName="Ritesh + Prince"
        image="/images/blog-push-notifications-2026.jpg"
        imageAlt="Push notification delivery chain across Expo, FCM and APNs"
      />

      <PostBody>
        <h2>The delivery chain</h2>
        <p>
          Before we look at failure modes, the path a push takes from your backend to a user&apos;s
          lock screen. Most regressions are easier to diagnose when you know exactly which hop is
          failing.
        </p>

        <CodeBlock language="text" caption="One push, end-to-end">{`Your backend
   │   (1) POST to Expo Push API with ExponentPushToken
   ▼
Expo Push Service
   │   (2) lookup project credentials, forward
   ▼
   ├──── FCM (Android) ────────► Google Play Services ──► Device
   └──── APNs (iOS) ───────────► Apple Push Network    ──► Device
                                                            │
                                          OS displays banner│
                                                            ▼
                                                      User taps
                                                            │
                                           ┌────────────────┘
                                           ▼
                              App launches → Notifications handler
                                            → analytics event`}</CodeBlock>

        <p>
          Five hops, three vendors, two operating systems, and at least one OS-level behaviour
          (Doze, App Standby, Low Power Mode) that can drop the push silently. That is the surface
          area we are working with.
        </p>

        <h2>The 30-minute setup</h2>

        <p>
          The end-to-end setup, assuming you have a working Expo app already. We are using Expo
          Application Services (EAS) for builds and the Expo Push API for sending. The same shape
          works if you go direct to FCM and APNs, Expo just removes one credential bundle.
        </p>

        <h3>1. Project + EAS configuration</h3>

        <CodeBlock language="json" caption="app.json, notifications block">{`{
  "expo": {
    "name": "My App",
    "slug": "my-app",
    "ios": {
      "bundleIdentifier": "com.mycompany.myapp",
      "infoPlist": {
        "UIBackgroundModes": ["remote-notification"]
      }
    },
    "android": {
      "package": "com.mycompany.myapp",
      "googleServicesFile": "./google-services.json",
      "useNextNotificationsApi": true
    },
    "notification": {
      "icon": "./assets/notification-icon.png",
      "color": "#0d9488",
      "iosDisplayInForeground": true
    },
    "plugins": [
      [
        "expo-notifications",
        { "icon": "./assets/notification-icon.png", "color": "#0d9488" }
      ]
    ]
  }
}`}</CodeBlock>

        <h3>2. Token registration (client)</h3>

        <CodeBlock language="typescript" caption="src/notifications/register.ts">{`import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import Constants from "expo-constants";

export async function registerForPushAsync(userId: string): Promise<string | null> {
  if (!Device.isDevice) return null;

  const { status: existing } = await Notifications.getPermissionsAsync();
  let status = existing;
  if (existing !== "granted") {
    const req = await Notifications.requestPermissionsAsync();
    status = req.status;
  }
  if (status !== "granted") return null;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "Default",
      importance: Notifications.AndroidImportance.HIGH,
      sound: "default",
      vibrationPattern: [0, 250, 250, 250],
    });
  }

  const projectId =
    Constants.expoConfig?.extra?.eas?.projectId ??
    Constants.easConfig?.projectId;

  const token = (await Notifications.getExpoPushTokenAsync({ projectId })).data;

  // Persist on the backend, scoped to this user + this install
  await fetch(\`\${API}/push/tokens\`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Auth": await auth() },
    body: JSON.stringify({
      user_id: userId,
      token,
      platform: Platform.OS,
      app_version: Constants.expoConfig?.version,
    }),
  });

  return token;
}`}</CodeBlock>

        <p>
          Runs on first launch and on every fresh login. The duplicate-token check on the backend is
          what prevents the same device from accruing N stale tokens over its lifetime.
        </p>

        <h3>3. Sending (backend)</h3>

        <CodeBlock language="typescript" caption="server/push/send.ts, server-side send">{`import { Expo, ExpoPushMessage, ExpoPushTicket } from "expo-server-sdk";

const expo = new Expo({ accessToken: process.env.EXPO_ACCESS_TOKEN });

export async function sendPushes(messages: ExpoPushMessage[]) {
  const tickets: ExpoPushTicket[] = [];
  const chunks = expo.chunkPushNotifications(messages);

  for (const chunk of chunks) {
    try {
      const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
      tickets.push(...ticketChunk);
    } catch (err) {
      console.error("expo push chunk failed", err);
    }
  }

  // Persist the tickets, we look them up later via getPushNotificationReceiptsAsync
  await db.insertPushTickets(tickets);
  return tickets;
}

// Run this on a cron, ~15 minutes after sends. Receipts expire after 24h.
export async function reconcilePushReceipts() {
  const ticketIds = await db.unreconciledTicketIds();
  const chunks = expo.chunkPushNotificationReceiptIds(ticketIds);
  for (const chunk of chunks) {
    const receipts = await expo.getPushNotificationReceiptsAsync(chunk);
    for (const [id, receipt] of Object.entries(receipts)) {
      if (receipt.status === "error") {
        const code = receipt.details?.error;
        if (code === "DeviceNotRegistered") {
          await db.invalidateToken(id);
        }
        // log; surface MessageTooBig / MismatchSenderId / etc.
      }
      await db.markReceiptReconciled(id);
    }
  }
}`}</CodeBlock>

        <p>
          Expo Push API takes batches of up to 100 messages per request. The DeviceNotRegistered
          receipt result is the signal to drop the token from your DB, keep ignoring it and your
          delivery rate quietly decays.
        </p>

        <h2>How we measure &ldquo;delivered&rdquo;</h2>

        <p>
          The single metric to instrument before anything else: <em>device-side received rate</em>.
          Expo / FCM / APNs will all return a successful ticket / receipt long before a push actually
          appears on the device. The only reliable signal that delivery happened is the app itself
          reporting the receipt.
        </p>

        <CodeBlock language="typescript" caption="src/notifications/instrument.ts, device-side receipt">{`import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

Notifications.addNotificationReceivedListener((event) => {
  const pushId = event.request.content.data?.pushId;
  if (pushId) reportReceipt(pushId, "received");
});

Notifications.addNotificationResponseReceivedListener((event) => {
  const pushId = event.notification.request.content.data?.pushId;
  if (pushId) reportReceipt(pushId, "opened");
});

async function reportReceipt(pushId: string, kind: "received" | "opened") {
  try {
    await fetch(\`\${API}/push/receipts\`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pushId, kind, at: Date.now() }),
    });
  } catch {
    // best-effort; do not block UI
  }
}`}</CodeBlock>

        <p>
          Runs on every push, foreground or background. The push id is set server-side on the data
          payload so we can correlate to the original ticket.
        </p>

        <p>
          On our maintenance corpus, the gap between ticket-success and device-received averages
          12-18% on Android and 4-8% on iOS. The gap is real, mostly Doze + App Standby on Android
          and Low Power Mode + Focus filters on iOS, and the only way you find out about it is by
          measuring both ends. Every RN app we ship through our{" "}
          <Link href="/services/react-native-app-development/">React Native app development</Link>{" "}
          engagement comes wired with the receipt instrumentation above on day one.
        </p>

        <h2>Twelve failure modes, in roughly the order we see them</h2>

        <p>
          Each item: symptom, root cause, the fix, and the prevention we ship by default. The numbers
          are the share of incidents we have responded to in the last 18 months that mapped to each
          cause.
        </p>

        <h3>1. APNs key revoked or rotated, Expo not updated (23%)</h3>
        <p>
          <strong>Symptom.</strong> Sudden 100% iOS delivery drop; Expo dashboard shows
          InvalidProviderToken in receipts.
          <strong> Cause.</strong> APNs auth key (.p8) rotated in the Apple Developer Portal but not
          re-uploaded to Expo via
          <code> eas credentials</code>.<strong> Fix.</strong> Re-upload the new key.
          <strong> Prevention.</strong> Calendar reminder 30 days before APNs key expiry, plus a
          synthetic push test run by a cron from the backend to a dedicated &ldquo;canary&rdquo;
          device.
        </p>

        <h3>2. FCM project mismatch (14%)</h3>
        <p>
          <strong>Symptom.</strong> Android tokens look valid; receipts say{" "}
          <code>MismatchSenderId</code>.
          <strong> Cause.</strong> The{" "}
          <code>google-services.json</code> at build time was from a different Firebase project than
          the one whose service account is uploaded to Expo.
          <strong> Fix.</strong> Re-download{" "}
          <code>google-services.json</code> from the correct project, rebuild, redeploy.
          <strong> Prevention.</strong> Track the Firebase project id alongside the EAS project id in
          a single Notion doc per app.
        </p>

        <h3>3. DeviceNotRegistered tokens not pruned (12%)</h3>
        <p>
          <strong>Symptom.</strong> Delivery rate drops slowly over months; ticket success rate looks
          normal.
          <strong> Cause.</strong> Dead tokens (uninstalls, re-installs that issued new tokens) are
          still in your database. Every send wastes a ticket. Worse, on iOS, sending to too many dead
          tokens triggers throttling.
          <strong> Fix.</strong> Implement the{" "}
          <code>reconcilePushReceipts</code> cron from the setup section and act on{" "}
          <code>DeviceNotRegistered</code>.
          <strong> Prevention.</strong> Make the reconcile job a CI required check, if it has not run
          in 48 hours, alert. This monitoring usually lives inside our{" "}
          <Link href="/services/maintenance-support/">maintenance retainer</Link>{" "}for the same
          reason, it&apos;s the kind of cron that drifts unless someone owns it.
        </p>

        <h3>4. Android notification channel mis-configured (9%)</h3>
        <p>
          <strong>Symptom.</strong> Android pushes arrive but are silent; users complain they never
          see anything.
          <strong> Cause.</strong> The default channel was created at low importance, or a custom
          channel was created without setting <code>importance: HIGH</code>.
          <strong> Fix.</strong> Update channel creation to use{" "}
          <code>AndroidImportance.HIGH</code>. Note: existing channels cannot have importance changed
          once created, you have to create a new channel with a new id.
          <strong> Prevention.</strong> Use a versioned channel id (e.g. <code>default-v2</code>) so
          future importance changes are possible.
        </p>

        <h3>5. iOS background-modes missing from Info.plist (7%)</h3>
        <p>
          <strong>Symptom.</strong> Silent push (data-only) is ignored when the app is backgrounded.
          <strong> Cause.</strong>{" "}
          <code>remote-notification</code> not in{" "}
          <code>UIBackgroundModes</code>.
          <strong> Fix.</strong> Add it in <code>app.json</code> under
          <code> ios.infoPlist</code>, rebuild.
          <strong> Prevention.</strong> Lint the{" "}
          <code>app.json</code> in CI for the keys you depend on.
        </p>

        <h3>6. App in &ldquo;Doze&rdquo; / battery optimisation (6%)</h3>
        <p>
          <strong>Symptom.</strong> Push arrives 1-30 minutes late on certain Android
          device-manufacturer combinations (Xiaomi, Huawei, Vivo are the usual suspects). Standard
          priority is the cause; <em>high</em> priority bypasses battery optimisation but counts
          against FCM&apos;s daily quota.
          <strong> Fix.</strong> Send time-sensitive pushes with{" "}
          <code>priority: &quot;high&quot;</code>; keep marketing pushes at normal.
          <strong> Prevention.</strong> Tag every push with a{" "}
          <code>category</code> on the backend; the sender picks priority from category, not ad-hoc.
        </p>

        <h3>7. iOS Focus / Do Not Disturb filter (6%)</h3>
        <p>
          <strong>Symptom.</strong> Push appears in Notification Center but never plays a sound /
          banner. User says &ldquo;nothing happened&rdquo;.
          <strong> Cause.</strong> User is in a Focus mode that filters your app, or has Notification
          Summary on.
          <strong> Fix.</strong> Nothing you can do server-side. The app can prompt the user to allow
          Time Sensitive notifications, which bypass most Focus filters.
          <strong> Prevention.</strong> Document Time Sensitive eligibility (specific categories only)
          and request the entitlement at app review.
        </p>

        <h3>8. Notification icon shows as a white square on Android (5%)</h3>
        <p>
          <strong>Symptom.</strong> Pushes arrive on Android but the icon is a solid white blob.
          <strong> Cause.</strong> Notification icon must be monochrome with transparent background;
          using a coloured PNG produces the white-square fallback Android draws when the asset fails
          its constraints.
          <strong> Fix.</strong> Generate a proper monochrome alpha icon at 96×96.
          <strong> Prevention.</strong> Include the icon in the EAS Build asset audit script.
        </p>

        <h3>9. Same user signed in on multiple devices, only latest gets push (4%)</h3>
        <p>
          <strong>Symptom.</strong> A user with phone + tablet sees the push on one device only.
          <strong> Cause.</strong> Backend is keyed by user id and keeps only one push token per
          user.
          <strong> Fix.</strong> Key the push-tokens table by{" "}
          <code>(user_id, device_install_id)</code>.
          <strong> Prevention.</strong> Default the schema this way on every new project, the cost is
          zero, the upgrade path is painful.
        </p>

        <h3>10. Expo Push API rate limits hit during a fan-out (4%)</h3>
        <p>
          <strong>Symptom.</strong> Mass send (campaign, announcement) succeeds for the first ~60%
          then ticket creation slows or errors.
          <strong> Cause.</strong> Expo limits the Push API to ~600 messages / second per project.
          <strong> Fix.</strong> Schedule fan-out over 5-10 minutes, not all at once.
          <strong> Prevention.</strong> Run all marketing pushes through a queue (BullMQ, SQS, etc.)
          with concurrency that respects the API budget.
        </p>

        <h3>11. Notification payload exceeds 4 KB (3%)</h3>
        <p>
          <strong>Symptom.</strong> Specific pushes return{" "}
          <code>MessageTooBig</code> in the receipt; users do not see them.
          <strong> Cause.</strong> Embedded image URL, full message body, or rich payload exceeded
          the 4 KB APNs limit (FCM is effectively the same on Android).
          <strong> Fix.</strong> Send only the metadata the OS displays; have the app fetch the rest
          on tap.
          <strong> Prevention.</strong> Lint the push payload size in the send function.
        </p>

        <h3>12. EAS build using a stale notification entitlement (3%)</h3>
        <p>
          <strong>Symptom.</strong> Pushes work fine for everyone <em>except</em> users on the new
          TestFlight build.
          <strong> Cause.</strong> The provisioning profile baked into the build did not include the
          push entitlement.
          <strong> Fix.</strong> Rebuild after running{" "}
          <code>eas credentials</code> to regenerate the profile.
          <strong> Prevention.</strong> Push entitlement check as part of the pre-submission
          checklist, the same checklist we ship for{" "}
          <Link href="/blog/react-native-app-store-rejection-data-2026/">
            avoiding App Store rejection
          </Link>
          {" "}and the one our{" "}
          <Link href="/services/app-store-launch/">app store launch engagement</Link>{" "}runs against
          every production build before it goes to review.
        </p>

        <h2>What to instrument on day one</h2>

        <p>
          A push system without instrumentation degrades silently. The four signals worth wiring
          before you ship anything:
        </p>
        <ul>
          <li>
            <strong>Ticket success rate per send</strong>: drops below 95% means a credential or
            quota problem upstream.
          </li>
          <li>
            <strong>Receipt errors by type</strong>: DeviceNotRegistered is healthy at 1-3% per day;
            InvalidProviderToken should be 0%.
          </li>
          <li>
            <strong>Device-received rate</strong>: the gap between tickets and device receipts.
            Anything over 20% is a real problem.
          </li>
          <li>
            <strong>Open rate by category</strong>: protects you against deliverability problems that
            look like product problems.
          </li>
        </ul>

        <p>
          Two mobile-cluster companions, and one that covers the upstream cause of misconfigured push
          setups on AI-built prototypes:
        </p>

        <RelatedGrid>
          <RelatedCard
            tag="Research"
            title="41 React Native App Submissions, Three Rejection War Stories"
            body="Three specific rejection narratives from the App Store and Google Play, plus the aggregate rejection-reason data behind 41 RN submissions."
            href="/blog/react-native-app-store-rejection-data-2026/"
          />
          <RelatedCard
            tag="Research"
            title="OTA Updates in Production: EAS vs CodePush vs Manual, 47 App Cost & Latency Study"
            body="OTA cost, adoption-after-release curves, and rollback cost across EAS, CodePush, and manual update strategies on 47 production RN apps."
            href="/blog/ota-updates-eas-codepush-2026/"
          />
          <RelatedCard
            tag="Research"
            title="We Audited 31 Lovable / Bolt / v0 / Cursor Codebases. Here's What Survives Production."
            body="A code-level teardown of 31 AI-generated SaaS prototypes: three proprietary metrics (PSR, TDR, RCM) and a 10-mode failure taxonomy."
            href="/blog/ai-prototype-codebase-audit-2026/"
          />
        </RelatedGrid>

        <p>
          The end-to-end mobile build that ships this push pipeline by default, the retainer that
          owns it post-launch, and the submission discipline that keeps it active through every
          release:
        </p>

        <RelatedGrid>
          <RelatedCard
            tag="Service"
            title="React Native App Development"
            body="The end-to-end mobile build that ships this push pipeline, with receipt instrumentation on day one."
            href="/services/react-native-app-development/"
          />
          <RelatedCard
            tag="Service"
            title="Maintenance & Support"
            body="The retainer that owns the reconcile cron and the rest of the push pipeline post-launch."
            href="/services/maintenance-support/"
          />
          <RelatedCard
            tag="Service"
            title="App Store Launch"
            body="The submission discipline that runs the pre-submission checklist against every production build."
            href="/services/app-store-launch/"
          />
        </RelatedGrid>

        <Faq items={FAQS} />

        <AuthorByline lastReviewedISO={MODIFIED_ISO}>
          Ritesh leads engineering at Appycodes. Prince leads the React Native practice day-to-day
          and owns the push pipeline shape on the 47 RN apps we ship and maintain. The reconciliation
          cron, the device-side receipt instrumentation, and the per-category priority routing are
          the three changes that have moved delivery rates the most on apps where push went quietly
          broken.
        </AuthorByline>
      </PostBody>

      <CtaBand />
    </>
  );
}
