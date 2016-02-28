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
      expect(response.statusCode).to.equal(200);
      done();
    });
  });

  it('should send back an object', function(done) {
    request('http://localhost:3001/#/api/users', function(error, response, body) {
      // parsedBody = JSON.parse(response);
      expect(response).to.be.an('object');
      done();
    });
  });

  it('should accept POST requests to Boards', function(done) {
  var requestParams = {method: 'POST',
      uri: 'http://localhost:3001/#/api/boards',
    json: {
      title: 'New Place',
      desc: 'A fun NEW place',
      uid: '123424245' }
  };

  request(requestParams, function(error, response, body) {
    expect(response.statusCode).to.equal(201);
    done();
  });

  //Implement a test that does a post and then a get to see if it already exists
  //Does it need to be saved in headers, not body?
  //Use robomongo to see if a post request made a board
  //Figure out how to then GET that board. Is the GET request messed up?


});


});
