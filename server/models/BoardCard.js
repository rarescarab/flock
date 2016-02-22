var mongoose = require('mongoose');

var boardCardSchema = new mongoose.Schema({
  title: String,
  description: String,
  venueId: Number,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('BoardCard', boardCardSchema);