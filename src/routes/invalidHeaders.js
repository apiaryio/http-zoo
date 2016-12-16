const _ = require('lodash');
const router = require('express').Router();

router.get('/cookie', (req, res) => {
  const data = JSON.stringify(req.headers);

  let response = '';
  response += 'HTTP/1.1 200 OK\r\n';
  response += 'Connection: close\r\n';
  response += `Content-Length: ${data.length}\r\n`;
  response += 'Content-Type: application/json\r\n';
  response += `Cookie: ${_.repeat('a', req.query.length)}\r\n`;
  response += 'Date: Wed, 30 Nov 2016 20:19:57 GMT\r\n\r\n';
  response += data;

  res.socket.end(response);
  res.socket.destroy();
});

router.get('/content-length', (req, res) => {
  let response = '';
  response += 'HTTP/1.1 200 OK\r\n';
  response += 'Connection: close\r\n';
  response += 'Content-Length: 3\r\n';
  response += 'Access-Control-Allow-Origin: *\r\n';
  response += 'Content-Type: text/plain\r\n';
  response += 'Date: Wed, 30 Nov 2016 20:19:57 GMT\r\n\r\n';
  response += 'abcdefghijklmnopqrstuvwxyz';

  res.socket.end(response);
  res.socket.destroy();
});

module.exports = router;
