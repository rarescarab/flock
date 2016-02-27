var request = require('request');
var expect = require('chai').expect;

describe('server', function() {
  it('should respond to GET requests for the homepage with a 200 status code', function(done) {
    request('http://localhost:3001/#/*', function(error, response, body) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });

  it('should send back parsable stringified JSON', function(done) {
    request('http://localhost:3001/#/*', function(error, response, body) {
      expect(JSON.parse.bind(this, body)).to.not.throw();
      done();
    });
  });

});
