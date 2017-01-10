const axios = require('axios');
const expect = require('chai').expect;

describe('Connection Failure', () => {
  // Connection that hangs forever
  it('should handle connection timeout gracefully', (done) => {
    axios.get('http://www.google.com:81', { timeout: 30000 })
      .then(done.bind(this, 'This promise should not have been resolved'), (err) => {
        expect(err.code).to.equal('ECONNABORTED');
        done();
      });
  }).timeout(360000);
});
