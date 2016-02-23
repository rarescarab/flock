var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  name: String,
  userId: String,
  boards: []
});

module.exports = mongoose.model('User', userSchema);
