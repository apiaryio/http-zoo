const axios = require('axios');
const expect = require('chai').expect;

describe('Bad response', () => {
  it('should handle no response gracefully', (done) => {
    axios.get('http://localhost:5501', { timeout: 30000 })
      .catch((err) => {
        expect(err.code).to.equal('ECONNABORTED');
        done();
      });
  }).timeout(35000);

  it('should handle empty response gracefully (GET)', (done) => {
    axios.get('http://localhost:5502', { timeout: 30000 })
      .catch((err) => {
        expect(err.code).to.equal('ECONNRESET');
        done();
      });
  });

  it('should handle empty response gracefully (POST)', (done) => {
    axios.post('http://localhost:5503', 'foo bar', { timeout: 30000 })
      .catch((err) => {
        expect(err.code).to.equal('ECONNRESET');
        done();
      });
  });

  it('should handle malformed response (immediately upon connection) gracefully', (done) => {
    axios.get('http://localhost:5504', 'foo bar', { timeout: 30000 })
      .catch((err) => {
        expect(err.code).to.equal('HPE_INVALID_CONSTANT');
        done();
      });
  });

  it('should handle malformed response gracefully (POST)', (done) => {
    axios.post('http://localhost:5505', 'foo bar', { timeout: 30000 })
      .catch((err) => {
        expect(err.code).to.equal('HPE_INVALID_CONSTANT');
        done();
      });
  });
});
