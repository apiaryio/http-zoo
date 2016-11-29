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
});
