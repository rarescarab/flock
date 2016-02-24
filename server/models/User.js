var mongoose = require('mongoose');
var Board = require('./Board');
var ObjectId = mongoose.Schema.Types.ObjectId;

var userSchema = new mongoose.Schema({
  name: String,
  userId: String,
  boards: [{type: ObjectId, ref: Board}]
});

module.exports = mongoose.model('User', userSchema);
