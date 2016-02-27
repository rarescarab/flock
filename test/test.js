var request = require('request');
var expect = require('chai').expect;

describe('server', function() {
  it('should respond to GET requests for the homepage with a 200 status code', function(done) {
    request('http://localhost:3001/#/*', function(error, response, body) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });
});
