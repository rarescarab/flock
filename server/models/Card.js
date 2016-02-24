var mongoose = require('mongoose');

var cardSchema = new mongoose.Schema({
  userTitle: String,
  description: String,
  venueId: Number,
  createdAt: Date,
  startTime: Date
});

module.exports = mongoose.model('Card', cardSchema);
