const express = require('express');

const headers = require('./invalidHeaders');
const responses = require('./badResponses');
const statusCodes = require('./statusCodes');

const router = express.Router();

router.use('/', express.static(`${__dirname}/../public`));

router.use('/headers', headers);
router.use('/responses', responses);
router.use('/status', statusCodes);

module.exports = router;
