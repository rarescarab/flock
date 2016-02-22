var express = require('express');
var mongoose = require('mongoose');

var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('../webpack.config.js');

var app = express();
app.use(express.static('./client'));
mongoose.connect('mongodb://localhost/flock');

new WebpackDevServer(webpack(config), {
  hot: true,
  historyApiFallback: true,
  proxy: {
  	"*": "http://localhost:3000"
  }
}).listen(3000, 'localhost', function (err, result) {
  if (err) {
    console.log(err);
  }
  console.log('Flock 🐦  is listening on 3000');
});
