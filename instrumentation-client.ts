// This file configures the initialization of Sentry on the client.
// The config here will be used whenever a user loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://4e1e8e834622d093492c1c26b6987038@o4509861420466176.ingest.us.sentry.io/4509861431476224",

  // ✅ no replayIntegration here (handled in sentry.client.config.ts)

  tracesSampleRate: 1,
  enableLogs: true,

  // Replay config also handled in sentry.client.config.ts
  debug: false,
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
