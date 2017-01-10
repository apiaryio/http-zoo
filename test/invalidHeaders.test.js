const axios = require('axios');
const expect = require('chai').expect;

describe('Invalid Headers', () => {
  // Server will send a response with a Content-Length: 3 header,
  // however the response is actually 26
  it('should handle different Content-Length in response gracefully', (done) => {
    axios.get('http://localhost:3000/headers/content-length', { timeout: 30000 })
      // Browser strips request body according to length
      // set in the header and resolves promise
      .then((res) => {
        expect(res.status).to.equal(200);
        expect(res.data.length).to.equal(3);
        done();
      })
      .catch((err) => {
        expect(err.code).to.equal('HPE_INVALID_CONSTANT');
        done();
      });
  }).timeout(10000);
});
