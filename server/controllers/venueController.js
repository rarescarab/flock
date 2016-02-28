var Venue = require('../models/venueModel');
var Q = require('q');

/* ---------------- */
/*     PROMISES     */
/* ---------------- */

var getVenues = Q.nbind(Venue.find, Venue);
var findVenue = Q.nbind(Venue.findOne, Venue);
var createVenue = Q.nbind(Venue.create, Venue);
var updateVenue = Q.nbind(Venue.findOneAndUpdate, Venue);
var removeVenue = Q.nbind(Venue.findOneAndRemove, Venue);

/* ------------------------ */
/*     VENUE CONTROLLER     */
/* ------------------------ */

module.exports = {
  ////////////////
  // FETCH CARD //
  ////////////////
  fetchOne: function (req, res, next) {},

  /////////////////
  // CREATE CARD //
  /////////////////
  createOne: function (req, res, next) {},

  /////////////////
  // UPDATE CARD //
  /////////////////
  updateOne: function (req, res, next) {},

  /////////////////
  // REMOVE CARD //
  /////////////////
  removeOne: function (req, res, next) {}
};
