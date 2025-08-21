import {withSentryConfig} from "@sentry/nextjs";
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.app.goo.gl",
      },
      {
        protocol: "https",
        hostname: "www.facebook.com",
      },
      {
        protocol: "https",
        hostname: "images.ctfassets.net",
      },
      {
        protocol: "https",
        hostname: "static.vecteezy.com",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "graph.facebook.com",
      },
      {
        protocol: "https",
        hostname: "platform-lookaside.fbsbx.com",
      },
      {
        protocol: "https",
        hostname: "scontent.xx.fbcdn.net",
      },
      {
        protocol: "https",
        hostname: "scontent.facc1-1.fna.fbcdn.net",
      },
      {
        protocol: "https",
        hostname: "scontent.facc2-1.fna.fbcdn.net",
      },
      {
        protocol: "https",
        hostname: "scontent.facc3-1.fna.fbcdn.net",
      },
      {
        protocol: "https",
        hostname: "scontent.facc4-1.fna.fbcdn.net",
      },
      {
        protocol: "https",
        hostname: "scontent.facc5-1.fna.fbcdn.net",
      },
      {
        protocol: "https",
        hostname: "scontent.facc6-1.fna.fbcdn.net",
      },
      {
        protocol: "https",
        hostname: "scontent.facc7-1.fna.fbcdn.net",
      },
      {
        protocol: "https",
        hostname: "scontent.facc8-1.fna.fbcdn.net",
      },
      {
        protocol: "https",
        hostname: "scontent.facc9-1.fna.fbcdn.net",
      },
      {
        protocol: "https",
        hostname: "scontent.facc10-1.fna.fbcdn.net",
      },
    ],
    // dangerouslyAllowSVG: true,
  },
  experimental: {
    // ppr: true,
    after:true,

  },
  devIndicators: {
    appIsrStatus: true,
    buildActivity: true,
    buildActivityPosition: "bottom-right",
  },
};

export default withSentryConfig(nextConfig, {
  // For all available options, see:
  // https://www.npmjs.com/package/@sentry/webpack-plugin#options

  org: "heavenetsi",

  project: "javascript-nextjs",

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Uncomment to route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  // tunnelRoute: "/monitoring",

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,

  // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
  // See the following for more information:
  // https://docs.sentry.io/product/crons/
  // https://vercel.com/docs/cron-jobs
  automaticVercelMonitors: true,
});