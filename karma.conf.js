var webpack = require('webpack');
var webpackConfig = require('./webpack.config.js');
webpackConfig.module.rules[0].use.unshift(
{
  loader: 'istanbul-instrumenter-loader',
  options: {
    esModules: true,
  },
});
webpackConfig.plugins = [
  new webpack.SourceMapDevToolPlugin({
    filename: null,
    test: /\.(ts|js)($|\?)/i
  })
];
delete webpackConfig.output;
delete webpackConfig.entry;
delete webpackConfig.externals;

module.exports = function (config) {
  config.set({
    browsers: ['Chrome'],
    frameworks: ['mocha', 'chai', 'sinon'],
    reporters: ['progress', 'coverage-istanbul'],
    files: [
      'test/test.js',
    ],
    preprocessors: {
      'test/test.js': ['webpack', 'sourcemap'],
    },
    webpack: webpackConfig,
    webpackMiddleware: {
      stats: 'errors-only',
    },
    coverageIstanbulReporter: {
      reports: ['html'],
      dir: 'coverage',
      fixWebpackSourcePaths: true,
    },
  })
}
