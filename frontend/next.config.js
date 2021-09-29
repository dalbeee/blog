module.exports = {
  webpackDevMiddleware: (config) => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    };
    return config;
  },
  images: {
    domains: ["http://localhost"],
  },
  // future: {
  //   webpack5: true,
  // },
};
