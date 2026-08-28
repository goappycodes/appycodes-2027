/**
 * The problems library.
 *
 * One page per specific technical problem we have actually diagnosed and fixed,
 * written the way an engineer searches for it at 11pm: symptom first, then the
 * diagnosis, then the fix, then what to check on your own system.
 *
 * Every entry is a real incident from the project register. Clients are never
 * named here — a page about somebody's payment race condition or compromised
 * checkout is not a page they agreed to be on. The engineering is ours to
 * publish; the identity is not.
 */

export type Problem = {
  slug: string;
  /** The searchable symptom, as a person would type it. */
  title: string;
  metaTitle: string;
  metaDescription: string;
  /** Grouping for the index filter. */
  area: ProblemArea;
  /** One line, shown on the index card. */
  symptom: string;
  /** Opening context — what was observed, in production. */
  observed: string[];
  /** What it actually turned out to be. */
  diagnosis: string[];
  /** What we changed. */
  fix: string[];
  /** Actionable checks the reader can run themselves. */
  check: string[];
  /** The general lesson, one paragraph. */
  lesson: string;
  /** Pillar service slug this belongs under. */
  service: string;
};

export type ProblemArea =
  | "payments"
  | "mobile & stores"
  | "security"
  | "data & integrations"
  | "performance"
  | "AI";

export const PROBLEM_AREAS: ProblemArea[] = [
  "payments",
  "mobile & stores",
  "security",
  "data & integrations",
  "performance",
  "AI",
];

export const PROBLEMS: Problem[] = [
  /* ------------------------------------------------------------ payments -- */
  {
    slug: "stripe-webhook-and-redirect-both-completing-order",
    title: "payment taken, order not completed, tickets never sent",
    metaTitle: "Stripe webhook and success redirect both completing the same order",
    metaDescription:
      "A payment race condition where the Stripe success redirect and the webhook both processed the same order. Symptom, diagnosis, the lockForUpdate fix, and what to check.",
    area: "payments",
    symptom:
      "Money captured by the gateway, but the order sits incomplete and the customer never receives anything.",
    observed: [
      "At a live festival, three real orders ended in an inconsistent state: the payment had been taken, the order was not marked complete, and no tickets went out. Support found them because customers were at the gate.",
      "Everything worked in testing. It worked for the vast majority of orders in production too. The failures clustered around the busiest period of the busiest day.",
    ],
    diagnosis: [
      "Two independent code paths were completing the same order: the browser redirect back from the payment provider on success, and the provider's server-to-server webhook for the same payment.",
      "Neither knew about the other. Under normal latency the redirect usually won and the webhook found the order already complete. Under load the two arrived close enough together to interleave, and both started work on an order neither had finished.",
      "The result is not a clean duplicate. It is a half-applied state — payment recorded, fulfilment not — which is worse than either path failing outright, because nothing errors and nothing alerts.",
    ],
    fix: [
      "Give each path one job. The webhook was scoped to handle only the payment types it is genuinely responsible for, distinguished using metadata set at payment-intent creation, and told to ignore the rest.",
      "Make completion serialisable. The order-completion routine now takes a row-level database lock on the order (`lockForUpdate` in Laravel, `SELECT … FOR UPDATE` underneath) so a second caller waits and then sees the finished state rather than a partial one.",
      "Repair the damage explicitly: the affected orders were corrected in the database, statuses fixed and tickets reissued — and the client got a written explanation of both the cause and the fix rather than a silent patch.",
    ],
    check: [
      "List every code path that can mark an order paid. If there is more than one, they need coordination — not a code comment.",
      "Wrap the state transition in a transaction that takes a row lock on the order, and make the handler idempotent so a repeat delivery is a no-op rather than a second attempt.",
      "Use the gateway's idempotency keys on the charge itself, and store its event ID so a redelivered webhook can be recognised.",
      "Alert on the impossible state — payment recorded, fulfilment missing, older than a few minutes. That query is five lines and it is the difference between finding this yourself and hearing it from a customer at a gate.",
    ],
    lesson:
      "If two code paths can complete the same financial transaction, eventually both will, and it will happen on your busiest day rather than in staging. Concurrency bugs in payment flows do not degrade gracefully — they produce a state that looks like nothing is wrong.",
    service: "product-platforms",
  },
  {
    slug: "free-tickets-breaking-checkout",
    title: "a zero-value order fails at checkout",
    metaTitle: "Free or zero-value orders failing at a Stripe checkout",
    metaDescription:
      "Why a £0 order breaks a working checkout, and why the fix is to bypass the payment path entirely rather than charge zero.",
    area: "payments",
    symptom: "Everything works until someone applies a 100% discount or claims a free ticket.",
    observed: [
      "A checkout that processes paid orders reliably fails, hangs or errors the moment the total reaches zero — typically on a free ticket, a full-value discount code or a complimentary order created by an admin.",
    ],
    diagnosis: [
      "Payment gateways reject or refuse to meaningfully process a zero-value charge. Sending one is not a smaller version of a normal payment; it is an invalid request.",
      "The checkout, however, was written on the assumption that every order passes through the payment step. Skipping it was never a modelled state, so the order stalls at a status that has no exit.",
    ],
    fix: [
      "Treat zero-value as its own flow rather than an edge of the paid one. Detect the total before the payment step, skip the gateway entirely, and transition the order straight to complete via the same completion routine paid orders use.",
      "Keep fulfilment identical — the same confirmation, the same ticket issue, the same records — so a free order is indistinguishable downstream from a paid one.",
      "Handle admin-created complimentary orders through the same path, with validated email and name capture, so they are real orders rather than a manual database edit.",
    ],
    check: [
      "Place a 100% discount order in staging. If nobody has ever tried it, assume it is broken.",
      "Make sure the zero path calls the same completion routine, not a parallel copy that will drift.",
      "Check refunds and cancellations on a zero-value order too — the same assumption usually breaks there as well.",
    ],
    lesson:
      "Free is not a discount of 100%; it is a different transaction shape. Any flow that assumes a payment step will break the first time the total is zero, and it is nearly always a customer-facing failure rather than an internal one.",
    service: "commerce-content",
  },
  {
    slug: "live-subscription-migration-without-billing-errors",
    title: "migrating a live subscription base without double-charging anyone",
    metaTitle: "Migrating live WooCommerce Subscriptions with a fixed cutover date",
    metaDescription:
      "What actually breaks when you migrate a revenue-generating subscription base: renewal scheduling, parallel plan types, store credit, and the status filter everyone gets wrong.",
    area: "payments",
    symptom: "A membership base has to move, renewals cannot pause, and there is no rollback.",
    observed: [
      "A publication running a WooCommerce subscription membership needed to migrate to a new plan structure with two parallel membership types, store credit carried across, and a hard cutover date.",
      "Subscriptions are unlike most migrations: they are not a dataset, they are a set of scheduled future obligations against a payment method.",
    ],
    diagnosis: [
      "Renewals do not execute where people think they do. In WooCommerce they run through Action Scheduler, the background job runner — which is where subscription migrations break silently, because the jobs survive the migration with stale references and nobody looks at the queue.",
      "Customisation placed in a normal plugin can be deactivated by any admin with a mouse. For billing-critical code that is an unacceptable failure mode.",
      "Subscription status filtering is the trap. Querying subscriptions without pinning the statuses sweeps up records that are not live obligations and produces migrations that either miss customers or double-handle them.",
    ],
    fix: [
      "Ship the customisation as must-use plugins, so it loads unconditionally and cannot be switched off by accident.",
      "Run subscription queries against active and on-hold statuses only, explicitly excluding pending. That single rule prevents a whole family of miscounts.",
      "Fix up Action Scheduler explicitly rather than trusting it — inspect the pending jobs, reconcile them against the new plan structure, and confirm the next renewal date on a sample of real subscriptions after cutover.",
      "Rehearse the whole cutover against a copy of production before the date, including the store-credit carry-across, and check the resulting invoices by hand.",
    ],
    check: [
      "Open your scheduled-action queue and read it. If you do not know what is in there, your renewals are running on assumptions.",
      "Confirm which statuses your migration script selects, and write the reason down next to the query.",
      "Verify next-renewal dates on a sample after migration, not before. Before is when everything still looks correct.",
      "Put billing-critical code somewhere it cannot be deactivated.",
    ],
    lesson:
      "A subscription base is a set of future promises to charge someone. Migrating it is not a data move, it is rescheduling obligations — and the failure mode is not an error page, it is an incorrect invoice sent to a real customer.",
    service: "commerce-content",
  },

  /* ----------------------------------------------------- mobile & stores -- */
  {
    slug: "app-store-rejection-background-audio",
    title: "App Store rejection for background audio you do not use",
    metaTitle: "App Store rejection: UIBackgroundModes audio declared but not needed",
    metaDescription:
      "Why declaring the audio background mode in Info.plist gets a non-media app rejected, and how to resolve it without losing functionality.",
    area: "mobile & stores",
    symptom: "Review rejects the build citing background audio, and your app does not play audio.",
    observed: [
      "A learning app was rejected because it declared audio support in the `UIBackgroundModes` key of `Info.plist`.",
      "The declaration had usually arrived via a plugin or template rather than a deliberate decision, which is what makes it hard to spot.",
    ],
    diagnosis: [
      "Apple's position is that the background audio mode exists for apps delivering audible content while backgrounded — music players, audio creation tools, streaming services.",
      "An app that declares the capability without needing it is claiming a background execution privilege it will not use, and review treats that as a misuse of the entitlement rather than a harmless extra line.",
    ],
    fix: [
      "Remove the audio entry from `UIBackgroundModes` unless the app genuinely plays audio while backgrounded, then rebuild and resubmit.",
      "Audit the rest of the plist while you are there. Capabilities and usage descriptions accumulate from plugins and templates, and every unnecessary one is an invitation to a rejection.",
    ],
    check: [
      "Read your `Info.plist` background modes and justify each one out loud. If you cannot, delete it.",
      "Do the same for permission usage strings — an unused permission with a vague description is the other common rejection in this family.",
      "Check what your cross-platform framework's plugins add on your behalf; the declaration is frequently not in code you wrote.",
    ],
    lesson:
      "Store review reads your manifest as a set of claims about what the app does. Every capability you declare and do not use is a claim you cannot defend, and the reviewer does not have to guess it was accidental.",
    service: "native-mobile",
  },
  {
    slug: "camera-permission-description-rejection",
    title: "scanner app rejected over a missing camera permission description",
    metaTitle: "App Store rejection: missing camera usage description on a scanner app",
    metaDescription:
      "A ticket-scanning app rejected for a missing or generic NSCameraUsageDescription — why it is a blocking issue rather than a nuisance, and what a good string looks like.",
    area: "mobile & stores",
    symptom: "Build rejected on camera access, on an app whose entire purpose is the camera.",
    observed: [
      "A door-scanning check-in app was rejected over camera access. The permission was requested at the right time and worked correctly on device.",
    ],
    diagnosis: [
      "Apple requires an explicit, human-readable explanation of why the app wants the camera. A missing string is an automatic rejection, and a generic one — 'This app needs camera access' — frequently is too.",
      "For a scanner this is blocking rather than cosmetic: the camera is the product, so there is no shipping around it while the string is fixed.",
    ],
    fix: [
      "Add a specific usage description that names the user-facing purpose, in the user's language — something closer to 'Used to scan ticket QR codes at the venue entrance' than a generic sentence.",
      "Verify the string actually reaches the built binary. In cross-platform projects it is often set in a config file that silently fails to propagate.",
    ],
    check: [
      "Install the built app on a clean device and trigger the permission prompt. Read what it says — that is the text review sees.",
      "Check every permission the app requests, not just the obvious one.",
      "Confirm the string survives your build pipeline rather than only existing in source.",
    ],
    lesson:
      "Permission strings are user-facing copy that happens to live in configuration. On an app where the permission is the product, treat the string as a launch-blocking deliverable rather than a formality.",
    service: "native-mobile",
  },
  {
    slug: "notifications-leaking-between-users-after-logout",
    title: "a second user sees the previous user's notifications",
    metaTitle: "Notifications leaking between users after logout on a shared device",
    metaDescription:
      "On a shared field device, notifications read from local storage persisted across accounts. Why this is a privacy failure rather than a UX bug, and the fix.",
    area: "mobile & stores",
    symptom: "Sign out, sign in as someone else, and the old account's notifications are still there.",
    observed: [
      "On a field-sales app used by medical representatives, a second user signing in on the same handset could see notifications belonging to the previous user.",
      "Field devices get shared — between shifts, between staff, and when someone's own phone is flat.",
    ],
    diagnosis: [
      "The notification list was being read from device storage rather than from the server. Local storage has no concept of who is signed in; it only knows what was written to it.",
      "Logout cleared the session token but not the cached content, so the next user inherited a view built from someone else's data.",
    ],
    fix: [
      "Move the read path to the server, where identity is actually known and the query can be scoped to the authenticated user.",
      "Clear user-scoped caches on logout as a defence in depth, rather than relying on it as the primary control.",
    ],
    check: [
      "Log in as user A, log out, log in as user B and look hard at every list in the app.",
      "Grep for reads from local storage that render user-specific content. Each one is a candidate.",
      "Treat logout as a state transition that has to be tested, not a button that clears a token.",
    ],
    lesson:
      "On a shared device, cached user content is a data-privacy failure rather than a UX bug — and it will be judged that way. Anything user-specific should be scoped server-side, where the system actually knows who is asking.",
    service: "native-mobile",
  },
  {
    slug: "native-crash-with-no-app-frames",
    title: "a fatal crash where none of the stack frames are your code",
    metaTitle: "Diagnosing a React Native SIGSEGV inside the Fabric rendering pipeline",
    metaDescription:
      "A fatal native crash with every frame inside the framework, reproduced on one Android version and handset. How to read it and what to do when the bug is not yours.",
    area: "mobile & stores",
    symptom: "Crash reporting shows a fatal SIGSEGV and not one frame belongs to your application.",
    observed: [
      "Crash reporting caught a fatal `SIGSEGV` inside React Native's Fabric rendering pipeline during a shadow-tree commit — specifically in the mounting coordinator's transaction handling.",
      "Four occurrences, two users, reproducible on a particular Android version and handset combination. Every frame in the report was native.",
    ],
    diagnosis: [
      "Reading the chain through the framework's UI-manager binding and the shadow-tree commit path put the fault inside the renderer's own concurrency, not in application code.",
      "That distinction changes the entire response. A crash in your code is a bug to fix; a crash inside the framework on one OS-and-device combination is a race to mitigate and an upgrade path to plan.",
      "It also explains why it is not reproducible on the developer's machine — the trigger is timing on a specific device, not a code path you can drive from the UI.",
    ],
    fix: [
      "Confirm the scope honestly: which framework version, which OS version, which devices, how many users. Four crashes across two users is a very different decision from four hundred.",
      "Reduce the trigger where you can — heavy synchronous work during mount, large list re-renders and rapid navigation transitions all increase pressure on the commit path.",
      "Track the framework's own issue tracker for that version and plan the upgrade rather than rewriting your screens on a guess.",
    ],
    check: [
      "Group crashes by OS version and device model before doing anything else. A crash concentrated on one combination is telling you something.",
      "Wire crash reporting to a dedicated project per app, so you can actually see this pattern rather than losing it in a shared stream.",
      "Keep an over-the-air update channel configured so a mitigation can ship in hours rather than a review cycle.",
    ],
    lesson:
      "When no frame is yours, stop looking for your bug. The valuable work is scoping the blast radius and choosing between mitigation and upgrade — and being able to tell the client, with evidence, that this one is not theirs either.",
    service: "native-mobile",
  },
  {
    slug: "android-notification-sound-missing-on-some-devices",
    title: "notification sounds work on some phones and not others",
    metaTitle: "Android notification channel sound missing after an asset rename",
    metaDescription:
      "A renamed sound file broke notification audio on some Android devices only. Why notification channels make this silent and device-dependent, and how to fix it.",
    area: "mobile & stores",
    symptom: "Some users hear the alert, some do not, and nothing errors anywhere.",
    observed: [
      "Users of a two-sided app intermittently missed incoming call and chat sounds. The classic works-on-some-phones failure, with no error in logs and no crash.",
    ],
    diagnosis: [
      "A sound asset had been renamed in an earlier commit, but the notification display code still referenced the old, now-missing filename.",
      "On Android, a notification channel's sound is bound when the channel is created, and the channel persists on the device. Users who already had the channel kept the old, working configuration; users creating it after the rename got a channel pointing at a file that no longer existed.",
      "That is why it split by device rather than by app version, and why it was silent — a missing channel sound is not an error, it is just quiet.",
    ],
    fix: [
      "Correct the reference so the code and the asset agree, and then change the channel ID so existing installs create a fresh channel with the correct sound instead of keeping the broken one.",
      "Never rename a notification asset without treating it as a channel migration.",
    ],
    check: [
      "Search for every string reference to a sound or icon asset and confirm the file exists at that exact name and case.",
      "Test on a device that already had the app installed, not only a clean install. The two paths behave differently and only one of them reproduces this.",
      "Remember the same applies to notification icons — a missing small icon fails just as quietly.",
    ],
    lesson:
      "Android notification channels are sticky configuration, not runtime settings. Anything bound at channel creation — sound, importance, vibration — needs a channel ID change to take effect on devices that already have it.",
    service: "native-mobile",
  },

  /* ------------------------------------------------------------ security -- */
  {
    slug: "card-skimmer-on-checkout",
    title: "card details leaking from a checkout where nothing looks wrong",
    metaTitle: "Finding a Magecart-style card skimmer on a WooCommerce checkout",
    metaDescription:
      "A payment-card skimming script on a live store: why the transaction still completes, why reporting looks normal, and how the script is actually found.",
    area: "security",
    symptom:
      "Cards used on your site appear in fraud reports, but the store works perfectly and reporting is clean.",
    observed: [
      "A card-skimming script was found running on a live European store's checkout. Orders completed. Customers received their goods. Nothing in the store's own reporting was out of place.",
    ],
    diagnosis: [
      "Skimming scripts are designed to be invisible by construction. They read what the customer types and send a copy elsewhere; they do not interfere with the transaction, because interference is what gets them caught.",
      "That means none of the usual signals fire. Conversion is normal, error rates are normal, and the site is not defaced. The first external symptom is often a processor or a bank noticing a fraud cluster that traces back to you.",
      "Finding it requires actively inspecting what the checkout page loads and where it sends data — not waiting for a symptom, because the design goal of the attack is that there is not one.",
    ],
    fix: [
      "Inventory every script the checkout loads, including anything injected by a plugin, a tag manager or a theme, and account for each one.",
      "Watch outbound requests from the checkout in a real browser session and justify every destination. An unfamiliar host receiving form data is the finding.",
      "Remove the injected code, then find the entry point — a vulnerable plugin, a stolen credential, an unprotected admin route — and close that, or it comes back.",
      "Rotate credentials, review admin users and scheduled tasks for persistence, and record what was found in writing.",
    ],
    check: [
      "Open your checkout with the network panel recording and read the list of outbound hosts. Do you recognise all of them?",
      "Diff your theme and plugin files against known-good copies rather than eyeballing recently-modified dates.",
      "Restrict what can be injected into the checkout at all — a payment page is the wrong place for a flexible tag manager.",
      "For a European store, treat this as a GDPR and PCI matter, not only a technical one. The disclosure clock is a separate question from the cleanup.",
    ],
    lesson:
      "The attacks that cost the most are the ones that leave everything working. If your only detection strategy is noticing that something broke, you will not detect this class of attack at all.",
    service: "rescue-hardening",
  },
  {
    slug: "webshell-found-on-a-live-site",
    title: "a cleaned site that keeps getting reinfected",
    metaTitle: "Finding a webshell: why malware removal alone does not hold",
    metaDescription:
      "Sites cleaned and reinfected within days usually have a persistence mechanism. What a webshell is, why removal without the entry point fails, and what to check.",
    area: "security",
    symptom: "You clean the infection, and days or weeks later it is back.",
    observed: [
      "Webshells discovered and removed on live UK sites during incident response — in both cases alongside a visible symptom that had already been 'fixed' at least once.",
    ],
    diagnosis: [
      "A webshell is a small script that gives an attacker command execution through an ordinary web request. It is persistence, not payload.",
      "Cleaning the visible symptom while the shell remains means the attacker simply reinstates it. That is why the site comes back infected on a timescale that feels like bad luck.",
      "Persistence hides in more places than the file system: injected admin users, modified scheduled tasks, database-stored code, and files placed in upload directories that are not covered by an integrity check.",
    ],
    fix: [
      "Hunt persistence first: unexpected files in upload and cache directories, recently modified core files, unfamiliar admin accounts, and scheduled tasks nobody recognises.",
      "Rotate every credential the site holds, including database, API and hosting panel — not just the admin password.",
      "Close the entry point, then harden: least-privilege file permissions, no in-browser file editing, an edge WAF, and integrity monitoring that alerts on change.",
      "Verify by monitoring rather than by hoping. A site is clean when nothing has come back and you would know if it had.",
    ],
    check: [
      "Can PHP execute from your uploads directory? If yes, fix that today.",
      "Is a file-manager plugin enabled on production? It is a live attack surface; enable it only for a task and deactivate it immediately after.",
      "List admin users and scheduled tasks and account for every one.",
      "Do you have an alert that fires when a core or theme file changes? Without one, reinfection is discovered by a customer.",
    ],
    lesson:
      "Removal is not remediation. If you cannot name how they got in and show that it is closed, you have bought a few weeks rather than fixed a problem.",
    service: "rescue-hardening",
  },
  {
    slug: "public-endpoint-under-active-exploitation",
    title: "a public endpoint being probed by a live exploit",
    metaTitle: "Hardening a publicly exposed endpoint under active exploitation",
    metaDescription:
      "A public POST endpoint receiving live exploit attempts and scanner traffic. Why returning 500 helps the attacker, and the hardening that actually reduces exposure.",
    area: "security",
    symptom: "Logs full of malformed requests to one endpoint, with recognisable exploit signatures.",
    observed: [
      "A publicly reachable POST endpoint on a production server was receiving an active exploit attempt against a known CVE, alongside routine scanner probes.",
    ],
    diagnosis: [
      "Anything publicly reachable is enumerated continuously; that part is background noise. What matters is how the endpoint responds, because the response is information.",
      "Malformed input was producing a 500. An unhandled server error tells a scanner it found something that reached real code — which is precisely the signal it is looking for.",
      "A second, separate finding during the same review: credentials hardcoded as a fallback inside a scheduled job class, which turns any code disclosure into a credential disclosure.",
    ],
    fix: [
      "Validate content type and payload shape at the boundary, and return a flat 400 for anything malformed so the endpoint stops distinguishing itself.",
      "Put a WAF in front of it and rate-limit by source, so enumeration costs the attacker something.",
      "Move hardcoded credentials to environment configuration or, better, to instance roles, and rotate anything that was ever committed.",
      "Log and alert on the pattern rather than the individual request — a spike of malformed posts to one route is the signal worth waking someone for.",
    ],
    check: [
      "Send deliberately malformed input to your public endpoints and look at the status code. Anything returning 500 is leaking behaviour.",
      "Grep the codebase for credential-looking literals, including fallbacks that only execute in production.",
      "Confirm your dependency and runtime versions against the CVEs currently being scanned for. The attacks are automated and they are not selective.",
    ],
    lesson:
      "You cannot stop being scanned, so the goal is to be uninteresting. Uniform, boring responses to bad input give an automated attacker nothing to work with — and error handling is a security control, not a UX detail.",
    service: "rescue-hardening",
  },

  /* -------------------------------------------------- data & integrations -- */
  {
    slug: "oauth-refresh-token-expired-scope-mismatch",
    title: "a scheduled integration that dies on demo morning",
    metaTitle: "OAUTH_SCOPE_MISMATCH: recovering an expired refresh token in two secret stores",
    metaDescription:
      "A CRM sync broke because the refresh token expired and the same secret lived in two places. The recovery procedure, and the design change that prevents a repeat.",
    area: "data & integrations",
    symptom: "A sync that ran for months fails with a scope or authorisation error, and nothing changed.",
    observed: [
      "A scheduled CRM sync broke with a scope-mismatch error. No code had been deployed and no scopes had been edited. It surfaced on the morning of a client demo.",
    ],
    diagnosis: [
      "The refresh token had expired. The error names scope because the provider re-evaluates the grant when the refresh fails, but the cause is token lifetime rather than configuration.",
      "The deeper problem was architectural: the same secret was stored in two places — the CI secret store and the hosting platform's environment variables — with a manual process to update both.",
      "Two copies plus a manual refresh path is a scheduled outage. It will fail, and it will fail at the least convenient moment, because that is when someone is looking.",
    ],
    fix: [
      "Recover deliberately: generate a new grant token in the provider console with the full comma-separated scope list, exchange it locally within its short validity window, extract the refresh token, update it in both stores, trigger a redeploy — hosting platforms do not pick up environment changes on their own — then run the workflows in order to verify.",
      "Write that procedure down and store it with the project. It is seven steps and none of them are memorable under pressure.",
      "Then remove the cause: one source of truth for the secret, an automated renewal path, and an alert when a refresh fails rather than when a report is empty.",
    ],
    check: [
      "Find every integration secret stored in more than one place. Each duplicate is an outage waiting for a rotation.",
      "Confirm your platform actually reloads environment variables without a redeploy. Most do not.",
      "Alert on the failed refresh, not the downstream symptom.",
      "Know your provider's refresh-token lifetime and whether inactivity expires it. Both answers are usually surprising.",
    ],
    lesson:
      "Integration outages are rarely integration bugs. They are secret-management bugs with a delay, and the fix is one owner for each secret plus an alert on the mechanism rather than on the outcome.",
    service: "product-platforms",
  },
  {
    slug: "variant-data-collapsing-across-skus",
    title: "product variants that all show the same title and description",
    metaTitle: "Distributor feed sync collapsing variant-level data across SKUs",
    metaDescription:
      "A supplier feed applying the parent product name to every SKU beneath it. Why it is a revenue problem, not a cosmetic one, and how to fix the sync.",
    area: "data & integrations",
    symptom: "Materially different part numbers appear on the site as if they were the same product.",
    observed: [
      "On a distributor-fed catalogue, product titles and descriptions were not pulling through per SKU. The top-level product name was being applied to every variant beneath it.",
      "In practice that meant part numbers that are genuinely different products — different scanner configurations under one model family — presented to customers identically.",
    ],
    diagnosis: [
      "The sync was reading the feed's parent record for descriptive fields and only using the child records for the identifiers, so variant-level content never reached the option values it was meant to populate.",
      "On a distributor catalogue this is a direct revenue problem rather than a cosmetic one: customers cannot tell variants apart, they buy the wrong one or nothing at all, and search cannot index them separately because there is nothing distinct to index.",
    ],
    fix: [
      "Map variant-level fields explicitly from the child records into the option values, and stop inheriting descriptive content from the parent by default.",
      "Stage the import rather than writing straight into live product tables, so a bad run can be inspected and discarded before customers see it.",
      "Add a reconciliation step that flags variants whose title or description is identical to the parent — that is the check that would have caught this on day one.",
    ],
    check: [
      "Pick a product family with several near-identical SKUs and compare the live page against the supplier feed by hand.",
      "Watch your sync's run time. A noticeable change is usually the first symptom of either data growth or a query-plan regression, and both are worth catching early.",
      "Confirm the feed's own structure before blaming the sync — sometimes the parent really is the only place a description exists, and that is a supplier conversation.",
    ],
    lesson:
      "Feed integrations fail quietly at the variant level, because the product count looks right and the import reports success. The check that matters is whether two different SKUs still look different after the sync.",
    service: "commerce-content",
  },
  {
    slug: "three-state-field-treated-as-boolean",
    title: "search returns nothing when the inventory is definitely there",
    metaTitle: "A three-state field treated as a boolean, hiding sellable inventory",
    metaDescription:
      "A tour filter returned no results because a field with three possible values was matched against one. A small bug with a direct revenue cost.",
    area: "data & integrations",
    symptom: "Filtered search says nothing is available, and you can see the item in the admin.",
    observed: [
      "A tour operator's search returned 'No tour found' for a product that was live, bookable and visible in the back office.",
    ],
    diagnosis: [
      "The relevant field had three valid values — yes, no and optional — and the matching logic accepted only 'yes'.",
      "The product was configured as 'optional', so it silently failed the filter. No error, no warning: just a legitimate, sellable product removed from the results.",
      "Boolean assumptions over multi-state fields are one of the most common quiet revenue bugs in booking and commerce systems, precisely because the failure mode is an empty state rather than an exception.",
    ],
    fix: [
      "Match against the full set of acceptable values rather than the single expected one, and decide explicitly what 'optional' means to the filter.",
      "Type the field properly — an enum, not a string — so the compiler or the schema catches the next place someone assumes two values.",
      "Add a test that asserts a product in each state appears or does not appear as intended.",
    ],
    check: [
      "List every filter in your search path and, for each, enumerate the values the underlying field can actually hold.",
      "Check the data, not the schema. Fields acquire values over years that the original design never anticipated.",
      "Instrument empty search results. A spike in no-result searches for a specific filter is this bug announcing itself.",
    ],
    lesson:
      "Empty results are the most expensive kind of bug, because they look like an honest answer. If a filter can hide sellable inventory, it needs a test per state rather than a test that it works.",
    service: "product-platforms",
  },
  {
    slug: "schema-change-without-a-freeze",
    title: "changing a shipped database assumption without taking the system down",
    metaTitle: "Migrating one-per-customer to many, live, across fifty files",
    metaDescription:
      "A schema that modelled one vehicle per customer needed to become many, on a live system, with SQL-level references across roughly fifty files. The four-phase migration.",
    area: "data & integrations",
    symptom: "The data model is wrong, it is already in production, and you cannot stop the business.",
    observed: [
      "A live back-office system modelled exactly one vehicle per customer, with the vehicle fields sitting directly on the customer table. The new requirement was many per customer.",
      "Roughly fifty files read those columns, and a significant portion did so at SQL level — filtering, ordering, searching and exporting — which an ORM accessor cannot intercept.",
    ],
    diagnosis: [
      "The instinct is to change the schema and fix the fallout. On a live system with SQL-level dependencies spread across the codebase, that is a freeze and a bad weekend.",
      "The constraint that matters is that the old read paths must keep working unchanged while the new model comes into existence.",
    ],
    fix: [
      "Phase one, additive only: create the new table with a foreign key, backfill one row per existing record, add a nullable reference on dependent tables and backfill that too. Critically, keep the old columns and sync them from the new primary record with a model observer — so none of the fifty files has to change on day one.",
      "Phase two: build the new user-facing surfaces against the new model — listing, adding and editing the many — while the old columns continue to serve everything else.",
      "Phase three: move the admin and reporting paths across, including document generation, so they read the related record rather than the flattened columns.",
      "Phase four: once nothing queries them, drop the legacy columns and remove the observer.",
    ],
    check: [
      "Grep for the column names as raw strings, not just as model properties. The SQL-level uses are the ones that will surprise you.",
      "Decide which record is primary before you start, because the sync-back depends on it.",
      "Keep the observer until the grep comes back empty. It is the safety net that makes the whole approach work.",
    ],
    lesson:
      "Additive-first with a synced mirror lets you restructure a live system without a freeze and without breaking the back office. It is slower to plan and dramatically cheaper than a big-bang migration on a system somebody is using right now.",
    service: "rescue-hardening",
  },
  {
    slug: "free-tier-database-with-no-backups",
    title: "your managed database has no backups and nobody knows",
    metaTitle: "Automated backups for a free-tier managed database, using scheduled CI",
    metaDescription:
      "A client database on a plan with no backups. Rather than forcing an upgrade, a scheduled job commits nightly snapshots to a dedicated branch — restorable and self-documenting.",
    area: "data & integrations",
    symptom: "You are on a free or entry plan and quietly have no point-in-time recovery.",
    observed: [
      "An application was running on a managed database whose free plan includes no backups at all. The client did not know, which is the normal situation.",
    ],
    diagnosis: [
      "Managed platforms make backups a paid feature, and the absence is not surfaced anywhere the client would look. The dashboard does not say 'no backups'; it simply does not mention them.",
      "For a small business, the cost of the upgrade is often the reason nothing happens — which leaves the risk sitting there indefinitely.",
    ],
    fix: [
      "A scheduled CI job runs nightly, dumps roles, schema and all data, and commits the snapshot to a dedicated branch of the repository. Every commit on that branch is a restorable point-in-time snapshot, with restore instructions held in that branch's README.",
      "Take one manual backup first, before relying on the automation. Verify the automation against that known-good copy rather than trusting its first run.",
      "Keep the branch out of the normal review flow so it never pollutes pull requests, and be deliberate about who can read it — a database dump in a repository is sensitive by definition.",
    ],
    check: [
      "Confirm what your plan actually includes. Do not infer it from the presence of a backups tab.",
      "Restore a backup into a scratch environment. An unrestored backup is a hope, not a plan.",
      "Consider access: whoever can read the repository can now read the data. That is a trade to make deliberately.",
    ],
    lesson:
      "The best fix is often the one that uses infrastructure the client already pays nothing for. This converted a compliance risk into a git history — version-controlled, self-documenting and restorable — without an upgrade conversation.",
    service: "rescue-hardening",
  },

  /* --------------------------------------------------------- performance -- */
  {
    slug: "twenty-second-page-load-fixed-in-one-line",
    title: "a page taking twenty seconds to load",
    metaTitle: "From twenty seconds to three: the diagnosis was the work, not the diff",
    metaDescription:
      "A one-line change took a page from twenty seconds to three. Why performance work is measurement rather than optimisation, and how to find the line.",
    area: "performance",
    symptom: "One page is catastrophically slow while the rest of the site is fine.",
    observed: [
      "A page on a live platform took around twenty seconds to load. The fix, once found, was a single line and took the page to roughly three.",
    ],
    diagnosis: [
      "A page that is slow while its neighbours are fast is almost never infrastructure. It is one specific thing on that page — an unbounded query, a query inside a loop, a missing index, or a synchronous call to something external.",
      "The temptation is to start optimising: add caching, tune the server, upgrade the plan. All of that costs money and time and would not have touched this.",
    ],
    fix: [
      "Profile the actual request rather than reasoning about it. Query log, timings per query, and the count of queries executed — that last number is usually the tell.",
      "Fix the single dominant cost. When one thing accounts for seventeen of twenty seconds, everything else is noise.",
      "Re-measure in production, because the data volume that caused it does not exist in development.",
    ],
    check: [
      "Count the queries a slow page executes. Hundreds means a loop; one taking most of the time means an index.",
      "Check the plan on your slowest query against production-sized data.",
      "Look for synchronous third-party calls in the render path. They are fast until the third party is not.",
    ],
    lesson:
      "This is worth publishing precisely because it is unglamorous. The value was entirely in the diagnosis; the diff was trivial. Anyone selling you a performance retainer before they have profiled a request is selling you the wrong thing.",
    service: "performance-search",
  },
  {
    slug: "php-fpm-process-exhaustion",
    title: "the site hangs under load but the server looks idle",
    metaTitle: "PHP-FPM process exhaustion: the outage that is not a resource problem",
    metaDescription:
      "Requests queue and time out while CPU and memory look fine. Why process pool exhaustion presents as an outage, and what to check first.",
    area: "performance",
    symptom: "Pages hang or time out during traffic peaks, yet CPU and memory graphs look unremarkable.",
    observed: [
      "A live site became unresponsive under load. The usual resource metrics gave no obvious cause, which sent everyone looking in the wrong direction.",
    ],
    diagnosis: [
      "The process pool was exhausted. Every worker was occupied — typically waiting on something slow rather than computing — so new requests queued and then timed out.",
      "This looks nothing like a resource problem on a dashboard, because the workers are blocked rather than busy. Waiting consumes a slot without consuming CPU.",
      "The usual underlying causes are slow database queries, slow external calls in the request path, or a long-running admin action holding workers while normal traffic arrives.",
    ],
    fix: [
      "Find what the workers are waiting on before touching the pool size. Raising the worker count without fixing the wait just exhausts memory instead.",
      "Introduce caching for the expensive repeated work, move genuinely slow operations to a queue, and set sane timeouts on outbound calls so one slow dependency cannot hold a worker indefinitely.",
      "Then, and only then, tune the pool to the memory the box actually has.",
    ],
    check: [
      "Watch active workers against your configured maximum during a peak. If it pins at the limit, this is your problem.",
      "Look for external HTTP calls in the request path with no timeout set.",
      "Separate admin and cron traffic from customer traffic where you can, so a heavy report cannot starve the storefront.",
    ],
    lesson:
      "Not every outage is a capacity problem. When a system is unresponsive while looking idle, the question is what everything is waiting for — and the answer is usually a dependency, not the server.",
    service: "performance-search",
  },
  {
    slug: "crawler-trap-burning-crawl-budget",
    title: "search engines crawling infinite pages that do not exist",
    metaTitle: "Crawler traps: faceted URLs generating infinite crawl paths",
    metaDescription:
      "A storefront generating effectively unlimited URL combinations, burning crawl budget on pages that should never be indexed. How to find and close the trap.",
    area: "performance",
    symptom: "Crawl stats show huge numbers of URLs and your real pages index slowly or not at all.",
    observed: [
      "An ecommerce storefront was generating effectively infinite URL combinations through its filtering, and crawlers were working through them.",
    ],
    diagnosis: [
      "Faceted navigation multiplies: every combination of filters, sort orders and pagination parameters is a distinct URL, and the total is combinatorial rather than additive.",
      "Crawl budget is finite. Time spent on the millionth filter permutation is time not spent on the product page you launched this morning, which is why the symptom presents as slow or missing indexation rather than as an error.",
    ],
    fix: [
      "Decide which parameter combinations are genuinely indexable and mark the rest noindex, or block them at the robots layer if they should not be fetched at all.",
      "Set canonical URLs on filtered views so equity consolidates on the page you actually want ranking.",
      "Cap the combinations the interface can produce — filters do not need to be composable to infinity to be useful.",
      "Confirm the fix in crawl stats rather than in a plugin's settings screen.",
    ],
    check: [
      "Compare URLs crawled against pages you meant to publish. A large gap is the trap.",
      "Look at what your parameters do to the URL when combined. If two filters produce a new URL, so will twenty.",
      "Check your sitemap contains only canonical, indexable pages — it is a statement of intent to a crawler.",
    ],
    lesson:
      "Crawl budget is a real constraint on any catalogue of size. Faceted navigation is worth having and worth bounding — the goal is for a crawler to spend its time on the pages that make you money.",
    service: "performance-search",
  },
  {
    slug: "structured-data-fix-applied-to-one-page",
    title: "schema validating on one page and missing on the others",
    metaTitle: "Structured data rolled out to one location page and not the rest",
    metaDescription:
      "A LocalBusiness schema fix applied to one location page and not the other two — caught by the client. Why schema work needs evidence attached to every fix.",
    area: "performance",
    symptom: "One page validates cleanly, sibling pages show only partial schema.",
    observed: [
      "LocalBusiness and ProfessionalService schema was implemented across a multi-location practice's location pages. One location validated correctly; two still showed only partial markup, with the main block missing entirely.",
      "The client found it, re-tested it himself, and reported back with the validator output and the page source. He also spotted a typo in an address.",
    ],
    diagnosis: [
      "The fix had been applied to one page template instance and not rolled out to the other two. A straightforward delivery miss rather than a technical problem.",
      "It survived because schema is invisible in the rendered page. Nothing looks different, so a visual check passes and the gap only exists in the source and the validator.",
    ],
    fix: [
      "Roll the markup out across every location page, driven from shared data rather than repeated per page, so the three cannot diverge again.",
      "Validate each page individually against both a schema validator and the live page source — the two disagree more often than you would expect, usually because of caching.",
      "Fix the address typo, and treat client-reported content errors as a signal to proofread the data source rather than the one instance.",
    ],
    check: [
      "Validate every page in a template family, not a representative one.",
      "Check the live page source, not the CMS field or the plugin preview.",
      "Confirm `sameAs` entries survive — we hit a bug where all but one were being dropped, which is silent unless you look.",
    ],
    lesson:
      "On work whose output is invisible in the rendered page, evidence of the change is the deliverable. The standing rule that came out of this — a snapshot of the change plus a short note to the client with every fix — is a process correction worth copying.",
    service: "performance-search",
  },

  /* ------------------------------------------------------------------ AI -- */
  {
    slug: "ai-fallback-templates-that-fabricate",
    title: "an AI feature that quietly invents content when it fails",
    metaTitle: "Removing hardcoded AI fallback templates that fabricate output",
    metaDescription:
      "When generation failed, the system substituted a template that looked real. Why blank beats invented, and how to design the failure state of an AI feature.",
    area: "AI",
    symptom: "Users see plausible generated content that has nothing to do with their actual input.",
    observed: [
      "A delivery platform generated client-specific briefs from call transcripts. When a generation call failed, it fell back to hardcoded templates — so users saw system-generated content that read as real analysis and was not derived from their client at all.",
    ],
    diagnosis: [
      "The fallback was written with good intentions: never show an empty screen. In a generative feature that instinct inverts, because a plausible template is indistinguishable from a real answer.",
      "The user has no way to tell the difference, which means the feature is not merely degraded when it fails — it is actively misleading, in a product whose entire value is that the analysis is about their client.",
    ],
    fix: [
      "Remove every fallback template. On failure, leave the field blank and let the user write the analysis themselves.",
      "Do not block the flow — a failed generation should not trap the user in a broken step. Blank and editable, then move on.",
      "Where the model genuinely does not know something, mark it 'to be confirmed' rather than inventing a value. On the same platform, briefs were generating whole services that no transcript mentioned; the rule became that output derives from the transcript and unknowns are labelled.",
    ],
    check: [
      "Force a failure — pull the key, break the network — and look at what your users would see. If it looks like a successful result, that is the bug.",
      "Ask whether a user could distinguish generated-from-their-data from generated-from-a-template. If not, delete the template.",
      "Check for generic output across different inputs. Two different clients producing near-identical analysis is the tell.",
    ],
    lesson:
      "Silent fabrication is worse than an empty field, and it is worst in exactly the products where AI is most attractive — the ones where a professional puts their name on the output. Design the failure state before the happy path.",
    service: "ai-systems",
  },
  {
    slug: "ai-blockers-key-versus-thinking",
    title: "an AI project that is 'blocked' for two different reasons",
    metaTitle: "Separating blockers that need a key from blockers that need the client's thinking",
    metaDescription:
      "Reporting 'we are blocked' on an AI build hides the real problem. Splitting blockers into access and intellectual input turns a status update into a decision list.",
    area: "AI",
    symptom: "The build stalls, the status is 'blocked', and nothing moves for weeks.",
    observed: [
      "On an AI content-operations platform, delivery stalled behind a list of missing items. Reported as a single blocker list, it read as an excuse and generated no action.",
    ],
    diagnosis: [
      "The list contained two completely different kinds of blocker with completely different owners and timescales.",
      "Some items needed only access: an API key, a search console, a database credential. Six of them, resolvable in an afternoon by someone with a password manager.",
      "The rest needed the client's own thinking: the content-writing prompts, the quality checklist, the content template, the task list, the brand assets and the tool decision. Nine items no amount of engineering resolves, because they are the client's intellectual input into their own product.",
    ],
    fix: [
      "Report the two categories separately, with the specific question attached to each item and a named owner.",
      "Keep building around them. Every module ran real logic with graceful fallback to placeholder data where credentials were absent, so nothing waited on access alone. Three data providers were coded in parallel so the client's choice of tool never blocked the work.",
      "Track it in a shared sheet the client can see, with what is blocking now and what will block imminently.",
    ],
    check: [
      "Take your current blocker list and sort it into 'needs a key' and 'needs a decision'. If you have never done this, the second column is longer than you think.",
      "For every decision item, write the actual question. 'Need brand assets' is not a question; 'which logo variant should appear on generated reports?' is.",
      "Ask what you can build behind a placeholder. Usually most of it.",
    ],
    lesson:
      "The distinction between access and intellectual input is the single most useful thing to copy into any AI project. It stops 'we are blocked' from sounding like an excuse and turns it into a decision list the client can actually work through.",
    service: "ai-systems",
  },
  {
    slug: "ai-cost-per-request-at-volume",
    title: "an AI feature that loses money on every request",
    metaTitle: "Tiered model routing: designing AI unit economics before you build",
    metaDescription:
      "Why an AI feature that dazzles in a demo can be unviable at volume, and how tiered model routing designed in from the start fixes the economics.",
    area: "AI",
    symptom: "The prototype is impressive and the projected bill at real volume is not.",
    observed: [
      "A counselling-intelligence design needed to turn recorded sessions into structured, reviewable recommendations — transcript cleanup, segmentation, attribution, then generation.",
      "Run naively, every one of those steps goes to the most capable model available, and the cost per session makes the product unviable at the volume it needs to serve.",
    ],
    diagnosis: [
      "Most AI pipelines are a mix of easy and hard work. Cleaning a transcript, splitting it into points and attributing speakers are mechanical tasks. Generating the actual recommendation is not.",
      "Sending all of it to a frontier model is paying premium prices for tokenising and tidying, which is the majority of the volume and almost none of the value.",
    ],
    fix: [
      "Route by task: cheaper, faster models for cleanup and segmentation; the expensive model reserved for the step where judgement actually happens.",
      "Design the routing in from the start rather than discovering it when the first invoice arrives — it changes the shape of the pipeline, not just a config value.",
      "Close the loop where the workflow already has a human in it. On this design an admin reviews and edits recommendations anyway, so saved edits become training signal — the quality control and the economics reinforce each other rather than trading off.",
    ],
    check: [
      "Estimate cost per request before building. If you cannot, you do not yet understand the pipeline well enough to build it.",
      "Break the pipeline into steps and ask which genuinely need the best model. Usually one.",
      "Instrument cost per request in production, not just latency and errors.",
      "Look for a human review step you are already paying for. That is where a feedback loop is free.",
    ],
    lesson:
      "An AI feature is a unit-economics decision wearing a product costume. Model the cost per request before a line is written, because the routing decision changes the architecture and is expensive to retrofit.",
    service: "ai-systems",
  },
];

export function problemBySlug(slug: string): Problem | null {
  return PROBLEMS.find((p) => p.slug === slug) ?? null;
}

export function problemsByArea(area: ProblemArea): Problem[] {
  return PROBLEMS.filter((p) => p.area === area);
}
