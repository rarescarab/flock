var mongoose = require('mongoose');

var boardSchema = new mongoose.Schema({
  title: String,
  headerImage: String,
  description: String,
  userId: Number,
  boardCardArray: [Number]
});

module.exports = mongoose.model('Board', boardSchema);