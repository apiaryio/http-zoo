module.exports = function configuration(config) {
  config.set({
    basePath: '',
    frameworks: ['browserify', 'mocha'],
    files: ['test/*.js'],
    preprocessors: { 'test/*.js': ['browserify'] },
    reporters: ['mocha'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['Safari'],
    singleRun: true,
    concurrency: 3,
    browserNoActivityTimeout: 35000,
  });
};
