const withPlugins = require("next-compose-plugins");
const withExportImages = require("next-export-optimize-images");

const isDockerBuildTime = !!process.env.ANALYZE;
const isProduction = process.env.NODE_ENV === "production";

const withBundleAnalyzerLoader = () =>
  isDockerBuildTime
    ? require("@next/bundle-analyzer")({
        enabled: true,
      })
    : {};

const securityHeaders = [
  {
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Content-Security-Policy",
    value:
      "default-src 'none';img-src 'self' data:;script-src-elem 'self';connect-src 'self';prefetch-src 'self';child-src 'none';font-src https://fonts.googleapis.com https://fonts.gstatic.com;style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;",
  },
];

const config = {
  webpackDevMiddleware: (config) => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    };
    return config;
  },
  images: {
    domains: ["storage-service", "localhost"],
  },
  async headers() {
    const applySecurity = {
      source: "/:path*",
      // headers: nextSafe({ isDev  })
      headers: securityHeaders,
    };
    return isProduction ? [applySecurity] : [];
  },
};

module.exports = withPlugins([withBundleAnalyzerLoader(), withExportImages], {
  ...config,
});
