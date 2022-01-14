const withBundleAnalyzer =
  process.env.ANALYZE &&
  require("@next/bundle-analyzer")({
    enabled: !!process.env.ANALYZE,
  });

module.exports = process.env.ANALYZE && withBundleAnalyzer({});

module.exports = {
  webpackDevMiddleware: (config) => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    };
    return config;
  },
  images: {
    domains: [process.env.NEXT_PRIVATE_SSR_API_URL],
  },
};
