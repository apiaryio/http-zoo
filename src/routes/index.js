const express = require('express');

const statusCodes = require('./statusCodes');

module.exports = function routes(app) {
  app.use('/', express.static(`${__dirname}/../public`));

  app.use('/status', statusCodes);
};
