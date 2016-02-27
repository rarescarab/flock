var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var User = require('./User');
var Card = require('./Card');
var Venue = require('./venueModel');

var boardSchema = new mongoose.Schema({
  title: String,
  image: String,
  description: String,
  category: String,
  permalink: String,
  userId: {type: String, ref: User},
  cards: [{type: ObjectId, ref: Card}]
});

module.exports = mongoose.model('Board', boardSchema);
