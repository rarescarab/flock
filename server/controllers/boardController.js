var Board = require('../models/boardModel');
var User = require('../models/userModel');
var Q = require('q');

/* ---------------- */
/*     PROMISES     */
/* ---------------- */

var getBoards = Q.nbind(Board.find, Board);
var findBoard = Q.nbind(Board.findOne, Board);
var createBoard = Q.nbind(Board.create, Board);
var updateBoard = Q.nbind(Board.findOneAndUpdate, Board);
var removeBoard = Q.nbind(Board.findOneAndRemove, Board);
var populateCards = Q.nbind(Board.populate, Board);
var populateUser = Q.nbind(User.populate, User);
var updateUser = Q.nbind(User.findOneAndUpdate, User);

/* ------------------------ */
/*     BOARD CONTROLLER     */
/* ------------------------ */

module.exports = {
  /////////////////
  // FETCH BOARD //
  /////////////////

  fetchOne: function (req, res, next) {
    console.log("GET REQUEST GOT!! : ", req.body);

    var board = req.body.board;
    var uid = req.body.uid;

    findBoard({title: board, userId: uid}) // might need return statement
    .then(function (board) {
      if (!board) {
        throw new Error('Board: %s does not exist', board);
      } else {
        res.status(200).json(board);
      }
    }).fail(function (err) {
      res.status(404).json(err);
    });
  },

  //////////////////
  // CREATE BOARD //
  //////////////////

  createOne: function (req, res, next) {
    console.log("POST REQUEST! : ", req.body)
    var title = req.body.title;
    var img = req.body.img;
    var desc = req.body.desc;
    var uid = req.body.uid;

    findBoard({permalink: title, username: username}) // change title to permalink
    .then(function (board) {
      if (board) {
        console.error('Board already exists');
        throw new Error('Board already exists');
      }
      createBoard({ // might need return statement
        title: title,
        headerImage: img,
        description: desc,
        userId: uid,
        cards: []
      })
      .then(function (board) {
        updateUser({userId: uid}, // might need return statement
          {$push: {boards: board._id}},
          {new: true}) // returns updated document
          .then(function (user) {
            var opts = [{path: 'boards', model: 'Board'}];
            populateUser(user, opts)
            .then(function (populatedUser) {
              if (populatedUser) {
                res.status(200).json(populatedUser);
              }
            }).fail(function (err) {
              console.error('Could not populate user boards');
              throw new Error('Could not populate user boards');
            });
          })
          .fail(function (err) {
            console.error('Could not update user boards', err);
            throw new Error('Could not update user boards', err);
          });
        }).fail(function (err) {
          console.error('Could not create new board', err);
          throw new Error('Could not create new board', err);
        });
      }).fail(function (err) {
        console.error('Could not find board', err);
        throw new Error('Could not find board', err);
      });
    },

    /////////////////
    // UPDATE BOARD //
    /////////////////
    updateOne: function (req, res, next) {},

    //////////////////
    // REMOVE BOARD //
    //////////////////
    removeOne: function (req, res, next) {}
  };
