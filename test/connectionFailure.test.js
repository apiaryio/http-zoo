const axios = require('axios');
const expect = require('chai').expect;

describe('Connection failure', () => {
  // Connection that hangs forever
  it('should handle connection timeout gracefully', (done) => {
    axios.get('http://www.google.com:81', { timeout: 30000 })
      .catch((err) => {
        expect(err.code).to.equal('ECONNABORTED');
        done();
      });
  }).timeout(35000);
});
