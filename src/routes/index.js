const express = require('express');

const headers = require('./invalidHeaders');
const responses = require('./badResponses');
const statusCodes = require('./statusCodes');

module.exports = function routes(app) {
  app.use('/', express.static(`${__dirname}/../public`));

  app.use('/headers', headers);
  app.use('/responses', responses);
  app.use('/status', statusCodes);
};
