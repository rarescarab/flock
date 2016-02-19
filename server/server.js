var express = require('express');
var mongoose = require('mongoose');

var app = express();

app.use(express.static('./client'));

// mongoose.connect('mongodb://localhost/flock');

// require('./config/middleware.js')(app, express);
// require('./config/router.js')(app, express);

app.listen(8000, function() {
	console.log('listening on 8000');
});

module.exports = app;