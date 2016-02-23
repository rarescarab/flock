var mongoose = require('mongoose');

var boardCardSchema = new mongoose.Schema({
  userTitle: String,
  description: String,
  venueId: Number,
  createdAt: { type: Date }
});

module.exports = mongoose.model('BoardCard', boardCardSchema);
