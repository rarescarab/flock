var Venue = require('../models/venueModel');
var Q = require('q');

/* ---------------- */
/*     PROMISES     */
/* ---------------- */

var findVenue = Q.nbind(Venue.findOne, Venue);
var createVenue = Q.nbind(Venue.create, Venue);
var updateVenue = Q.nbind(Venue.findOneAndUpdate, Venue);

module.exports = {
	fetchOne: function (req, res, next) {},
	createOne: function (req, res, next) {},
	updateOne: function (req, res, next) {}
};
