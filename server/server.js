var express = require('express');
var path = require('path');
var fs = require('fs');
Q = require('q');
var mongoose = require('mongoose');

var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('../webpack.config.js');

/* -------------- */
/*     MODELS     */
/* -------------- */

var User = require('./models/User');
var Board = require('./models/Board');
var Card = require('./models/BoardCard');

/* ---------------- */
/*     PROMISES     */
/* ---------------- */

var findUser = Q.nbind(User.findOne, User);
var createUser = Q.nbind(User.create, User);
var updateUser = Q.nbind(User.update, User);
var findBoard = Q.nbind(Board.findOne, Board);
var findBoards = Q.nbind(Board.find, Board);
var createBoard = Q.nbind(Board.create, Board);
var findCard = Q.nbind(Card.findOne, Card);
var createCard = Q.nbind(Card.create, Card);

/* ---------------- */
/*     DATABASE     */
/* ---------------- */

mongoose.connect('mongodb://localhost/flock');
var db = mongoose.connection;

db.on('error', function() {
	console.error.bind(console, 'Connection Error:');
});

db.once('open', function() {
	console.log('MongoDB is open');
});

var app = express();
app.use(express.static(path.resolve(__dirname, '../public')));

/* ----------- */
/*     API     */
/* ----------- */

// GET REQUESTS //

app.get('/', function(req, res) {
	fs.readFile(path.resolve(__dirname, '../public/index.html'), function(err, data) {
		if (err) {
      throw new Error(err);
    } else {
      res.writeHead(200, {'Content-Type': 'text/html'});
		  res.send(data);
    }
	});
});

app.get('/api/users/*', function(req, res) {
  var name = req.params[0];
  var uid = req.body.uid;

  return findUser({name: name})
    .then(function (user) {
      if (!user) {
        throw new Error('User: %s does not exist', username);
      } else {
        res.status(200).json(user);
      }
    }).fail(function (err) {
      res.status(404).json(err);
    });
});

app.get('/api/boards/*', function(req, res) {
  var board = req.params[0];
  var boardId = req.body.boardId;

  return findBoard({boardId: boardId})
    .then(function (board) {
      if (!board) {
        throw new Error('Board: %s does not exist', board);
      } else {
        res.status(200).json(board);
      }
    }).fail(function (err) {
      res.status(404).json(err);
    });
});

app.get('/api/cards/*', function(req, res) {
  var card = req.params[0];
  var cardId = req.body.cardId;

  return findBoard({cardId: cardId})
    .then(function (card) {
      if (!card) {
        throw new Error('Card: %s does not exist', card);
      } else {
        res.status(200).json(card);
      }
    }).fail(function (err) {
      res.status(404).json(err);
    });
});

// POST REQUESTS //

app.post('/api/users', function(req, res, next) {
  var username = req.body.username;
  var uid = req.body.uid;
  var board = req.body.board ? [req.body.board] : [];

  findUser({userId: uid})
    .then(function (user) {
      if (user) {
        throw new Error('User already exists');
      } else {
        return createUser({
          name: username,
          uid: uid,
          boards: board
        });
      }
    }).then(function (user) {
      res.json(201, user);
    }).fail(function (err) {
      next(err);
    }).done();
});

app.post('/api/boards', function(req, res) {
  var title = req.body.title;
  var img = req.body.img;
  var desc = req.body.desc;
  var uid = req.body.uid;
  var boards = req.body.boards;

  boards.forEach(function (board) {
    if (board.title === title) {
      throw new Error('Board already exists');
    }
  });
  boards.push({
    title: title,
    headerImage: img,
    description: desc,
    userId: uid,
    boardCardArray: []
  });

  return updateUser({userId: uid},
    {boards: boards})
    .then(function (user) {
      if (user) {
        res.json(200, user.boards);
      } else {
        throw new Error('User not found');
      }
    })
    .fail(function (err) {
      throw new Error('Could not update user boards');
    });
});

app.post('/api/cards', function(req, res) {
  var title = req.body.title;
  var desc = req.body.desc;
  var venue = req.body.venue;
  var board = req.body.board;

  findCard({venueId: venue})
    .then(function (card) {
      if (card) {
        throw new Error('Card already exists');
      }
    })
    .catch(function (err) {
      return createCard({
        userTitle: title,
        description: desc,
        venueId: venue,
        createdAt: new Date()
      })
      .then(function (card) {
        if (card) {
          res.status(201).json(card);
        }
      })
      .fail(function (err) {
        throw new Error('Failed to create card');
      });
    });
});

// PUT REQUESTS //
app.put('/api/users/*', function(req, res) {});
app.put('/api/boards/*', function(req, res) {});
app.put('/api/cards/*', function(req, res) {});

// DELETE REQUESTS //
app.delete('/api/users/*', function(req, res) {});
app.delete('/api/boards/*', function(req, res) {});
app.delete('/api/cards/*', function(req, res) {});


/* --------------- */
/*     SERVERS     */
/* --------------- */

app.listen(3000);
new WebpackDevServer(webpack(config), {
  hot: true,
  historyApiFallback: true,
  proxy: {
  	'*': 'http://localhost:3000'
  }
}).listen(3001, 'localhost', function (err, result) {
  if (err) {
    console.log(err);
  }
  console.log('Flock - Webpack 🐦  is listening on 3000 and 3001');
});
