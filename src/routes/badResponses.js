const router = require('express').Router();

let failrateCounter = 0;

function longRunningResponse(req, res, timeout) {
  let index = 0;
  const parts = 'HTTP/1.1 204 No Content'.split('');

  res.socket.write(parts[index]);
  index += 1;

  res.socket.on('data', (data) => {
    res.socket.write(data);
  });

  const token = setInterval(() => {
    if (index === parts.length) {
      clearInterval(token);
      res.socket.end();
      return;
    }

    res.socket.write(parts[index]);
    index += 1;
  }, timeout);
}

router.get('/empty', (req, res) => {
  res.socket.end();
  res.socket.destroy();
});

router.post('/empty-string', (req, res) => {
  res.socket.end('');
  res.socket.destroy();
});

router.get('/failrate', (req, res) => {
  if (failrateCounter === parseInt(req.query.rate, 10)) {
    failrateCounter = 0;
    res.socket.end('HTTP/1.1 204 No Content\r\n');
    return;
  }

  failrateCounter += 1;
});

router.get('/incomplete', (req, res) => {
  const data = JSON.stringify(req.headers);

  let response = '';
  response += 'HTTP/1.1 200 OK\r\n';
  response += 'Connection: close\r\n';
  response += `Content-Length: ${data.length}\r\n`;
  response += 'Content-Type: application/json\r\n';
  response += 'Date: Wed, 30 Nov 2016 20:19:57 GMT\r\n\r\n';
  response += data.substring(0, data.length - 7);

  res.socket.end(response);
});

router.get('/long-running', (req, res) => {
  longRunningResponse(req, res, parseInt(req.query.delay, 10) * 1000);
});

router.get('/malformed', (req, res) => {
  res.socket.end('foo bar');
  res.socket.destroy();
});

router.post('/malformed', (req, res) => {
  res.socket.end('foo bar');
  res.socket.destroy();
});

router.get('/none', () => {});

module.exports = router;
