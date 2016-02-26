var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var Board = require('./boardModel');

var userSchema = new mongoose.Schema({
  name: String,
  userId: String,
  boards: [{type: ObjectId, ref: Board}]
});

module.exports = mongoose.model('User', userSchema);
