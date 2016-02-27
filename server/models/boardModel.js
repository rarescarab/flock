var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var User = require('./userModel');
var Card = require('./cardModel');
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
