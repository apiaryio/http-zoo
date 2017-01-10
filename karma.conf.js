const customLaunchers = {
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
  Edge: {
    base: 'SauceLabs',
    browserName: 'microsoftedge',
    version: '14.14393',
    platform: 'Windows 10',
  },
  Chrome: {
    base: 'SauceLabs',
    browserName: 'chrome',
    version: '55.0',
    platform: 'Windows 10',
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
    reporters: process.env.CI ? ['mocha', 'saucelabs'] : ['mocha'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: process.env.CI ? Object.keys(customLaunchers) : ['Chrome'],
    customLaunchers: process.env.CI ? customLaunchers : undefined,
    singleRun: true,
    concurrency: Infinity,
    browserDisconnectTimeout: 10000,
    browserDisconnectTolerance: 1,
    browserNoActivityTimeout: 4 * 60 * 1000,
    captureTimeout: 4 * 60 * 1000,
    client: {
      mocha: {
        timeout: 45000,
      },
    },
  });
};
