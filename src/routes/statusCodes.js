const http = require('http');
const router = require('express').Router();

router.get('/:code', (req, res) => {
  if (!http.STATUS_CODES[req.params.code]) {
    return res.status(404).end();
  }

  return res.status(req.params.code).end();
});

module.exports = router;
