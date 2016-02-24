var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var fs = require('fs');

var mongoose = require('mongoose');
Q = require('q');

var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('../webpack.config.js');

/* -------------- */
/*     MODELS     */
/* -------------- */

var User = require('./models/User');
var Board = require('./models/Board');
var Card = require('./models/Card');

/* ---------------- */
/*     PROMISES     */
/* ---------------- */

var findUser = Q.nbind(User.findOne, User);
var createUser = Q.nbind(User.create, User);
var updateUser = Q.nbind(User.findOneAndUpdate, User);
var populateUser = Q.nbind(User.populate, User);
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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

  return findUser({userId: uid})
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

app.get('/api/boards', function(req, res) {
  var board = req.body.board;
  var uid = req.body.uid;

  return findBoard({title: board, userId: uid})
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

app.get('/api/cards', function(req, res) {
  var title = req.body.title;
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

  findUser({userId: uid})
    .then(function (user) {
      if (user) {
        throw new Error('User already exists');
      } else {
        return createUser({
          name: username,
          userId: uid,
          boards: []
        });
      }
    }).then(function (user) {
      res.status(201).json(user);
    }).fail(function (err) {
      next(err);
    }).done();
});

app.post('/api/boards', function(req, res) {
  var title = req.body.title;
  var img = req.body.img;
  var desc = req.body.desc;
  var uid = req.body.uid;

	findBoard({title: title, userId: uid}) // change title to permalink
    .then(function (board) {
      if (board) {
				console.error('Board already exists');
        throw new Error('Board already exists');
      }
			return createBoard({
		    title: title,
		    headerImage: img,
		    description: desc,
		    userId: uid,
		    cards: []
		  })
			.then(function (board) {
				return updateUser({userId: uid},
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
});

app.post('/api/cards', function(req, res) {
  var title = req.body.title;
  var desc = req.body.desc;
  var venue = req.body.venue;
  var board = req.body.board;

  findCard({venueId: venue})
    .then(function (card) {
      if (card) {
        res.status(200).json(card);
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
