const axios = require('axios');
const expect = require('chai').expect;

describe('Connection Failure', () => {
  // Connection that hangs forever
  it('should handle connection timeout gracefully', (done) => {
    axios.get('http://www.google.com:81', { timeout: 30000 })
      .then(done.bind(this, new Error('This promise shuold not be resolved')), (err) => {
        expect(err.code).to.equal('ECONNABORTED');
        done();
      });
  }).timeout(35000);
});
