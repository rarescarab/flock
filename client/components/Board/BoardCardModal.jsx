var React = require('react');
var ReactRouter = require('react-router');
var apiInfo = require('../../../config.js');
var FOURSQUARE_CLIENT_ID = apiInfo.foursquare.client_ID
var FOURSQUARE_CLIENT_SECRET = apiInfo.foursquare.client_secret


var formStyle = {
	'margin-top' : '-213px',
	'display' : 'block !important'
};

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
		return (
			<div className="ui fullscreen modal transition visible active" style={formStyle}>
		    <i className="close icon"></i>
		    <div className="header">
		      Update Your Settings
		    </div>
		    <div className="content">
		      <div className="ui form">
		        <h4 className="ui dividing header">Give us your feedback</h4>
		        <div className="field">
		          <label>Feedback</label>
		          <textarea></textarea>
		        </div>
		        <div className="field">
		          <div className="ui checkbox">
		            <input type="checkbox" checked="checked" name="contact-me" tabindex="0" className="hidden"/>
		            <label>It's okay to contact me.</label>
		          </div>
		        </div>
		      </div>
		    </div>
		    <div className="actions">
		      <div className="ui button">Cancel</div>
		      <div className="ui green button">Send</div>
		    </div>
		  </div>
		)


	}
});

module.exports = BoardCardModal;
