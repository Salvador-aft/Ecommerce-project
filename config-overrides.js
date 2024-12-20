const { override, addWebpackAlias } = require('customize-cra');
const webpack = require('webpack');
const path = require('path');

module.exports = override(
  addWebpackAlias({
    "http": require.resolve("stream-http"),
    "https": require.resolve("https-browserify"),
    "assert": require.resolve("assert/"),
    "util": require.resolve("util/"),
    "zlib": require.resolve("browserify-zlib"),
    "stream": require.resolve("stream-browserify"),
    "url": require.resolve("url/"),
    "crypto": require.resolve("crypto-browserify"),
    "process": require.resolve("process/browser"),
    "buffer": require.resolve("buffer/")
  }),

  (config) => {
    config.resolve = {
      ...config.resolve,
      fallback: {
        ...config.resolve.fallback,
        process: require.resolve("process/browser"),
        crypto: require.resolve("crypto-browserify"),
        stream: require.resolve("stream-browserify"),
        buffer: require.resolve("buffer/"),
        vm: require.resolve('vm-browserify'),
        util: require.resolve('util/'),
        assert: require.resolve('assert/'),
      },
    };

    config.plugins = [
      ...(config.plugins || []),
      new webpack.ProvidePlugin({
        process: 'process/browser',
        Buffer: ['buffer', 'Buffer'],
      }),
    ];

    return config;
  }
);