module.exports = {
  async rewrites() {
    return [
      {
        source: "/api/:slug*",
        destination: "http://localhost/api/:slug*",
      },
      {
        source: "/uploads/:slug*",
        destination: "http://localhost/uploads/:slug*",
      },
    ];
  },
  webpackDevMiddleware: (config) => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    };
    return config;
  },
};
