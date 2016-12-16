

module.exports = function configuration(config) {
  config.set({
    basePath: '',

    frameworks: ['browserify', 'mocha'],

    files: [
      'test/*.js',
    ],

    exclude: [
    ],

    preprocessors: {
      'test/*.js': ['browserify'],
    },

    reporters: ['progress'],

    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: false,

    browsers: ['Chrome'],

    singleRun: true,

    concurrency: Infinity,

    browserNoActivityTimeout: 35000,
  });
};
