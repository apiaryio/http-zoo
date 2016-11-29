const axios = require('axios');
const expect = require('chai').expect;

describe('Status Codes', () => {
  const statuses = [
    { code: 200, text: 'OK' },
    { code: 201, text: 'CREATED' },
    { code: 400, text: 'BAD REQUEST' },
    { code: 401, text: 'UNAUTHORIZED' },
    { code: 403, text: 'FORBIDDEN' },
    { code: 404, text: 'NOT FOUND' },
    { code: 405, text: 'METHOD NOT ALLOWED' },
    { code: 429, text: 'TOO MANY REQUESTS' },
    { code: 500, text: 'INTERNAL SERVER ERROR' },
    { code: 503, text: 'SERVICE UNAVAILABLE' },
  ];

  statuses.forEach((item) => {
    it(`should handle ${item.code} status code gracefully`, (done) => {
      axios.get(`http://localhost:5509?status=${item.code}`, { timeout: 30000 })
        .then((res) => {
          expect(res.status).to.equal(item.code);
          expect(res.statusText).to.equal(item.text);
          done();
        })
        .catch((err) => {
          expect(err.response.status).to.equal(item.code);
          expect(err.response.statusText).to.equal(item.text);
          done();
        });
    }).timeout(5000);
  });
});
