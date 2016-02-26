var React = require('react');
var ReactRouter = require('react-router');

var api = require('../../../config');

var FOURSQUARE_CLIENT_ID = api.foursquare.client_ID
var FOURSQUARE_CLIENT_SECRET = api.foursquare.client_secret

/* ----------------- */
/*     Component     */
/* ----------------- */

var BoardCardModal = React.createClass({
	getInitialState: function () {
    return {
      userTitle: '',
		  description: '',
		  venueId: 0
    };
  },

  getVenueId: function (){
	//When the user starts entering information into the search, there will be a drop down
	//displaying all related results.
	//When the user clicks on the venue, the id is stored.
		$.get('https://api.foursquare.com/v2/venues/+'+venueId+'?client_id='+FOURSQUARE_CLIENT_ID+'&client_secret='+FOURSQUARE_CLIENT_SECRET)
      .done(function (data) {
        console.log("WORKS!");
        callback(data);
      }).fail(function (err) {
        console.log('there was an error');
        callback(err);
    });
  },

	handleClick:function (e){
		// var newCard = this.state;
		// BoardCard.save(newCard, function (err, result) {
		// 	if(err) {
		// 		console.log(err);
		// 	} else {
		// 		this.props.searchById(this.state.venueId, function (err, result) {
		// 			if(err) {
		// 				console.log(err);
		// 			} else {
		// 				console.log('result of searchbyid', result);
		// 			}
		// 		});
		// 	}
		// });

	},

	render: function(){
		return;
	}
});

module.exports = BoardCardModal;
