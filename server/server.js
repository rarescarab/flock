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
var findBoard = Q.nbind(Board.findOne, Board);
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
  res.writeHead(200, {'Content-Type': 'text/html'});
	fs.readFile(path.resolve(__dirname, '../public/index.html'), function(err, data) {
		if (err) {
      console.error(err);
    } else {
		  res.send(data);
    }
	});
});

app.get('/api/users/*', function(req, res) {});
app.get('/api/boards/*', function(req, res) {});
app.get('/api/cards/*', function(req, res) {});

// POST REQUESTS //
app.post('/api/users', function(req, res) {});
app.post('/api/boards', function(req, res) {});
app.post('/api/cards', function(req, res) {});

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
