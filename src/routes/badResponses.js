const router = require('express').Router();

function longRunningResponse(req, res, timeout) {
  let index = 0;
  const parts = 'HTTP/1.1 204 No Content'.split('');

  res.socket.write(parts[index]);
  index += 1;

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

router.get('/long-running/5', (req, res) => {
  longRunningResponse(req, res, 5000);
});

router.get('/long-running/30', (req, res) => {
  longRunningResponse(req, res, 30000);
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
