const express = require('express');

const headers = require('./invalidHeaders');
const responses = require('./badResponses');
const statusCodes = require('./statusCodes');

const router = express.Router();

router.use('/headers', headers);
router.use('/responses', responses);
router.use('/statuses', statusCodes);

module.exports = router;
