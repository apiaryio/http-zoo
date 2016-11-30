const router = require('express').Router();

router.get('/content-length', (req, res) => {
  let response = '';
  response += 'HTTP/1.1 200 OK\r\n';
  response += 'Content-Length: 3\r\n';
  response += 'Content-Type: text/plain\r\n';
  response += 'Date: Wed, 30 Nov 2016 20:19:57 GMT\r\n';
  response += 'Connection: close\r\n\r\n';
  response += 'abcdefghijklmnopqrstuvwxyz';

  res.socket.end(response);
  res.socket.destroy();
});

module.exports = router;
