const axios = require('axios');
const expect = require('chai').expect;

describe('Bad response', () => {
  // Server accepts traffic but never sends back data
  it('should handle no response gracefully', (done) => {
    axios.get('http://localhost:5501', { timeout: 30000 })
      .catch((err) => {
        expect(err.code).to.equal('ECONNABORTED');
        done();
      });
  }).timeout(35000);

  // Server sends back an empty string immediately upon connection
  it('should handle empty response gracefully (GET)', (done) => {
    axios.get('http://localhost:5502', { timeout: 30000 })
      .catch((err) => {
        expect(err.code).to.equal('ECONNRESET');
        done();
      });
  });

  // Server sends back an empty string after client sends data
  it('should handle empty response gracefully (POST)', (done) => {
    axios.post('http://localhost:5503', 'foo bar', { timeout: 30000 })
      .catch((err) => {
        expect(err.code).to.equal('ECONNRESET');
        done();
      });
  });

  // Server sends back a malformed response ("foo bar") immediately upon connection
  it('should handle malformed response gracefully (GET)', (done) => {
    axios.get('http://localhost:5504', 'foo bar', { timeout: 30000 })
      .catch((err) => {
        expect(err.code).to.equal('HPE_INVALID_CONSTANT');
        done();
      });
  });

  // Server sends back a malformed response ("foo bar") after the client sends data
  it('should handle malformed response gracefully (POST)', (done) => {
    axios.post('http://localhost:5505', 'foo bar', { timeout: 30000 })
      .catch((err) => {
        expect(err.code).to.equal('HPE_INVALID_CONSTANT');
        done();
      });
  });

  // Server accepts the request and sends back one byte every 5 seconds
  it('should handle long running response gracefully (1)', (done) => {
    const source = axios.CancelToken.source();

    axios.get('http://localhost:5506', {
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

    axios.get('http://localhost:5507', {
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
});
