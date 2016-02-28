var mongoose = require('mongoose');

var venueSchema = new mongoose.Schema({
  venueId: String,
  photoSuffix: String,
  rating: Number,
  price: Number,
  tier: String,
  hours: [{
    days: String,
    open: [{ time: String }]
  }],
  createdAt: Date,
  updatedAt: Date
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true }
});

venueSchema.virtual('photo')
  .get(function () {
    return 'https://irs0.4sqi.net/img/general/300x300' + this.photoSuffix;
  });

module.exports = mongoose.model('Venue', venueSchema);
