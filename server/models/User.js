var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  name: String,
  itinerarys: [Number]
});

module.exports = mongoose.model('User', userSchema);