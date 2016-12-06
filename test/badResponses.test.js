const axios = require('axios');
const expect = require('chai').expect;

describe('Bad response', () => {
  // Server accepts traffic but never sends back data
  it('should handle no response gracefully', (done) => {
    axios.get('http://localhost:3000/responses/none', { timeout: 30000 })
      .catch((err) => {
        expect(err.code).to.equal('ECONNABORTED');
        done();
      });
  }).timeout(35000);

  // Server sends back an empty string immediately upon connection
  it('should handle empty response gracefully (GET)', (done) => {
    axios.get('http://localhost:3000/responses/empty', { timeout: 30000 })
      .catch((err) => {
        // Node.js returns 'ECONNRESET', browser 'Network Error'
        const actual = err.code ? err.code : err.message;
        const expected = err.code ? 'ECONNRESET' : 'Network Error';

        expect(actual).to.equal(expected);

        done();
      });
  });

  // Server sends back an empty string after client sends data
  it('should handle empty response gracefully (POST)', (done) => {
    axios.post('http://localhost:3000/responses/empty-string', 'foo bar', { timeout: 30000 })
      .catch((err) => {
        // Node.js returns 'ECONNRESET', browser 'Network Error'
        const actual = err.code ? err.code : err.message;
        const expected = err.code ? 'ECONNRESET' : 'Network Error';

        expect(actual).to.equal(expected);

        done();
      });
  });

  // Server sends back a malformed response ("foo bar") immediately upon connection
  it('should handle malformed response gracefully (GET)', (done) => {
    axios.get('http://localhost:3000/responses/malformed', { timeout: 30000 })
      // Chrome and Firefox parse malformed response with 2OO status code
      .then((res) => {
        expect(res.status).to.equal(200);
        expect(res.data).to.equal('foo bar');
        done();
      })
      // ...but Safari and Node.js return parsing error
      .catch((err) => {
        const actual = err.code ? err.code : err.message;
        const expected = err.code ? 'HPE_INVALID_CONSTANT' : 'Network Error';

        expect(actual).to.equal(expected);

        done();
      });
  });

  // Server sends back a malformed response ("foo bar") after the client sends data
  it('should handle malformed response gracefully (POST)', (done) => {
    axios.post('http://localhost:3000/responses/malformed', 'foo bar', { timeout: 30000 })
      // Chrome and Firefox parse malformed response with 2OO status code
      .then((res) => {
        expect(res.status).to.equal(200);
        expect(res.data).to.equal('foo bar');
        done();
      })
      // ...but Safari and Node.js return parsing error
      .catch((err) => {
        const actual = err.code ? err.code : err.message;
        const expected = err.code ? 'HPE_INVALID_CONSTANT' : 'Network Error';

        expect(actual).to.equal(expected);

        done();
      });
  });

  // Server accepts the request and sends back one byte every 5 seconds
  it('should handle long running response gracefully (1)', (done) => {
    const source = axios.CancelToken.source();

    axios.get('http://localhost:3000/responses/long-running/5', {
      cancelToken: source.token,
      timeout: 30000,
    }).catch((err) => {
      expect(err.message).to.equal('Request canceled by the user.');
      done();
    });

    setTimeout(() => {
      source.cancel('Request canceled by the user.');
    }, 30000);
  }).timeout(35000);

  // Server accepts the request and sends back one byte every 30 seconds
  it('should handle long running response gracefully (2)', (done) => {
    const source = axios.CancelToken.source();

    axios.get('http://localhost:3000/responses/long-running/30', {
      cancelToken: source.token,
      timeout: 30000,
    }).catch((err) => {
      expect(err.message).to.equal('Request canceled by the user.');
      done();
    });

    setTimeout(() => {
      source.cancel('Request canceled by the user.');
    }, 30000);
  }).timeout(35000);

  // Server sends incomplete response body (Content-Length and actual length differ)
  it('should handle incomplete response body gracefully', (done) => {
    axios.get('http://localhost:3000/responses/incomplete', { timeout: 30000 })
      // Node.js does not care and parses response
      .then((res) => {
        expect(res.data.length).to.equal(112);
        done();
      })
      // ...but browser is complaining
      .catch((err) => {
        expect(err.message).to.equal('Network Error');

        done();
      });
  }).timeout(5000);
});
