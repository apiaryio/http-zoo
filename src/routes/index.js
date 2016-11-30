const express = require('express');

const headers = require('./invalidHeaders');
const statusCodes = require('./statusCodes');

module.exports = function routes(app) {
  app.use('/', express.static(`${__dirname}/../public`));

  app.use('/headers', headers);
  app.use('/status', statusCodes);
};
