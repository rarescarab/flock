var User = require('../models/userModel');
var Q = require('q');

/* ---------------- */
/*     PROMISES     */
/* ---------------- */

var getUsers = Q.nbind(User.find, User);
var findUser = Q.nbind(User.findOne, User);
var createUser = Q.nbind(User.create, User);
var updateUser = Q.nbind(User.findOneAndUpdate, User);
var deleteUser = Q.nbind(User.findOneAndRemove, User);
var populateBoards = Q.nbind(User.populate, User);

/* ----------------------- */
/*     USER CONTROLLER     */
/* ----------------------- */

module.exports = {
  ////////////////
  // FETCH USER //
  ////////////////
  fetchOne: function (req, res, next) {
    var name = req.params[0];
    var uid = req.body.uid;

    findUser({userId: uid}) // might need a return statement here
    .then(function (user) {
      if (!user) {
        throw new Error('User: %s does not exist', username);
      } else {
        res.status(200).json(user);
      }
    })
    .fail(function (err) {
      res.status(404).json(err);
    });
  },

  /////////////////
  // CREATE USER //
  /////////////////
  createOne: function (req, res, next) {
    var username = req.body.username;
    var uid = req.body.uid;

    findUser({userId: uid})
    .then(function (user) {
      if (user) {
        throw new Error('User already exists');
      } else {
        createUser({ // might need return statement
          name: username,
          userId: uid,
          boards: []
        });
      }
    })
    .then(function (user) {
      res.status(201).json(user);
    })
    .fail(function (err) {
      next(err);
    }).done();
  },

  /////////////////
  // UPDATE USER //
  /////////////////
  updateOne: function (req, res, next) {},

  //////////////////
  // DELETE USER //
  //////////////////
  deleteOne: function (req, res, next) {},

  //////////////////////////
  // POPULATE USER BOARDS //
  //////////////////////////
  populateList: function (req, res, next) {},
};
