const axios = require('axios');
const expect = require('chai').expect;

describe('Status Codes', () => {
  const statuses = [
    { code: 200, text: 'OK' },
    { code: 201, text: 'Created' },
    { code: 400, text: 'Bad Request' },
    { code: 401, text: 'Unauthorized' },
    { code: 403, text: 'Forbidden' },
    { code: 404, text: 'Not Found' },
    { code: 405, text: 'Method Not Allowed' },
    { code: 429, text: 'Too Many Requests' },
    { code: 500, text: 'Internal Server Error' },
    { code: 503, text: 'Service Unavailable' },
  ];


  statuses.forEach((item) => {
    it(`should handle ${item.code} status code gracefully`, (done) => {
      const handleAxiosResponse = (res) => {
        expect(res.status).to.equal(item.code);
        expect(res.statusText).to.equal(item.text);
        done();
      };

      axios.get(`http://localhost:3000/statuses/${item.code}`)
        .then(handleAxiosResponse, handleAxiosResponse);
    }).timeout(5000);
  });
});
