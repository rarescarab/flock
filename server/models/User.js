var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  name: String,
  facebookId: String,
  boards: []
});

module.exports = mongoose.model('User', userSchema);
