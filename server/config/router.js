var path = require('path');
var fs = require('fs');

var User = require('../controllers/userController');
var Board = require('../controllers/boardController');
var Card = require('../controllers/cardController');
var Venue = require('../controllers/venueController');

module.exports = function (app, express) {
  app.get('/', function(req, res) {
    fs.readFile(path.resolve(__dirname, '../../public/index.html'), function(err, data) {
      if (err) {
        throw new Error(err);
      }
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.send(data); // need to send facebook key
    });
  });

  app.get('/api/users', User.fetchOne);
  app.post('/api/users', User.createOne);
  app.put('/api/users', User.updateOne);
  app.delete('/api/users', User.deleteOne);
  app.get('/api/users/boards', User.populateList);

  app.get('/api/boards', Board.fetchOne);
  app.post('/api/boards', Board.createOne);
  app.put('/api/boards', Board.updateOne);
  app.delete('/api/boards', Board.deleteOne);
  app.get('/api/boards/cards', Board.populateList);

  app.get('/api/cards', Card.fetchOne);
  app.post('/api/cards', Card.createOne);
  app.put('/api/cards', Card.updateOne);
  app.delete('/api/cards', Card.deleteOne);

  app.get('/api/venues', Venue.fetchOne);
  app.post('/api/venues', Venue.createOne);
  app.put('/api/venues', Venue.updateOne);
  app.delete('/api/venues', Venue.deleteOne);
};
