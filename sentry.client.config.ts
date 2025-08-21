import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  integrations: (integrations) => [
    ...integrations.filter((integration) => integration.name !== "Replay"),

    // ✅ Replay + Feedback only here
    Sentry.replayIntegration(),
    Sentry.feedbackIntegration({
      colorScheme: "system",
    }),
  ],

  tracesSampleRate: 1.0,

  // Session Replay sampling
  replaysSessionSampleRate: 0.1,  // capture 10% of all sessions
  replaysOnErrorSampleRate: 1.0,  // capture 100% of error sessions
});
