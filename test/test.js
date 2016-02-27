var supertest = require("supertest");
var should = require("should");

// This refers to PORT where program is runninng.
var server = supertest.agent("http://localhost:3001");

describe("Homepage GET request ",function(){

  it("should return homepage and status-code 200",function(done){

    // calling home page api
    server
    .get("http://localhost:3001/#/*")
    .expect("Content-type",/json/)
    .expect(200)
    .end(function(err, res){
      // HTTP status should be 200
      res.status.should.equal(200);
      // Error key should be false.
      res.body.error.should.equal(false);
      done();
    });
  });

});
