var request = require('request');
var expect = require('chai').expect;

describe('server', function() {
  it('should respond to GET requests for the homepage with a 200 status code', function(done) {
    request('http://localhost:3001/#/*', function(error, response, body) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });

  it('should respond to GET requests for the users page with a 200 status code', function(done) {
    request('http://localhost:3001/#/api/users', function(error, response, body) {
      console.log("The response is : ", response.body)
      expect(response.statusCode).to.equal(200);
      done();
    });
  });

  it('should send back an object', function(done) {
    request('http://localhost:3001/#/api/users', function(error, response, body) {
      // parsedBody = JSON.parse(response);
      console.log("RESPONSE.BODY : ", response.body)
      expect(response).to.be.an('object');
      done();
    });
  });


});
