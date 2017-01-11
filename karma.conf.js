const customLaunchers = {
  Chrome: {
    base: 'SauceLabs',
    browserName: 'chrome',
    version: '55.0',
    platform: 'Windows 10',
  },
  Edge: {
    base: 'SauceLabs',
    browserName: 'microsoftedge',
    version: '14.14393',
    platform: 'Windows 10',
  },
  Firefox: {
    base: 'SauceLabs',
    browserName: 'firefox',
    version: '47.0',
    platform: 'Windows 10',
  },
  Safari: {
    base: 'SauceLabs',
    browserName: 'safari',
    version: '10.0',
    platform: 'OS X 10.11',
  },
};

module.exports = function configuration(config) {
  config.set({
    sauceLabs: {
      testName: 'Node-hamms',
    },
    basePath: '',
    frameworks: ['browserify', 'mocha'],
    files: ['test/*.js'],
    preprocessors: { 'test/*.js': ['browserify'] },
    reporters: process.env.NASINO ? ['mocha', 'saucelabs'] : ['mocha'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_WARN,
    autoWatch: false,
    browsers: process.env.NASINO ? Object.keys(customLaunchers) : ['Chrome', 'Firefox'],
    customLaunchers: process.env.NASINO ? customLaunchers : undefined,
    singleRun: true,
    concurrency: Infinity,
    browserDisconnectTimeout: 10000,
    browserDisconnectTolerance: 1,
    browserNoActivityTimeout: 6 * 60 * 1000,
    captureTimeout: 6 * 60 * 1000,
    client: {
      captureConsole: false,
      mocha: {
        timeout: 36000,
      },
    },
  });
};
