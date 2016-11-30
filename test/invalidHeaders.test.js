const axios = require('axios');
const expect = require('chai').expect;

describe('Invalid Headers', () => {
  // Server will send a response with a Content-Length: 3 header,
  // however the response is actually 1 MB in size
  it('should handle different Content-Length in response gracefully', (done) => {
    axios.get('http://localhost:5510', { timeout: 30000 })
      .catch((err) => {
        expect(err.code).to.equal('HPE_INVALID_CONSTANT');
        done();
      });
  }).timeout(5000);
});
