var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var fs = require('fs');

var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('../webpack.config.js');

var app = express();
mongoose.connect('mongodb://localhost/flock');
app.use(express.static(path.resolve(__dirname, '../public')));

app.get('/', function(request, response) {
  response.writeHead(200, {'Content-Type': 'text/html'});
	fs.readFile(path.resolve(__dirname, '../public/index.html'), function(err, data) {
		if (err) {
      console.error(err);
    } else {
		  response.send(data);
    }
	});
});

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
