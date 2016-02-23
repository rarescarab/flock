var mongoose = require('mongoose');

var boardSchema = new mongoose.Schema({
  title: String,
  headerImage: String,
  description: String,
  userId: Number,
  boardCardArray: []
});

module.exports = mongoose.model('Board', boardSchema);
