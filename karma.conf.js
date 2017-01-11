const customLaunchers = {
  sl_Chrome: {
    base: 'SauceLabs',
    browserName: 'chrome',
    version: '55.0',
    platform: 'Windows 10',
  },
  sl_Chrome_osx: {
    base: 'SauceLabs',
    browserName: 'chrome',
    version: '55.0',
    platform: 'OS X 10.11',
  },

  sl_Edge: {
    base: 'SauceLabs',
    browserName: 'microsoftedge',
    version: '14.14393',
    platform: 'Windows 10',
  },
  sl_Firefox: {
    base: 'SauceLabs',
    browserName: 'firefox',
    version: '47.0',
    platform: 'Windows 10',
  },
  sl_Safari: {
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
    reporters: process.env.CI ? ['mocha', 'saucelabs'] : ['mocha'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_DEBUG,
    autoWatch: false,
    browsers: process.env.CI ? Object.keys(customLaunchers).concat('Chrome', 'Firefox') : ['Chrome', 'Firefox'],
    customLaunchers: process.env.CI ? customLaunchers : undefined,
    singleRun: true,
    concurrency: 2,
    browserNoActivityTimeout: 0,
    captureTimeout: 0,
  });
};
