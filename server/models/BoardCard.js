var mongoose = require('mongoose');

var boardCardSchema = new mongoose.Schema({
  title: String,
  description: String,
  venueId: Number,
});

module.exports = mongoose.model('BoardCard', boardCardSchema);