var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');

var apiInfo = require('../../config');
window.FOURSQUARE_CLIENT_ID = apiInfo.foursquare.client_ID;
window.FOURSQUARE_CLIENT_SECRET = apiInfo.foursquare.client_secret;
window.ZIPCODEAPI_KEY = apiInfo.zipcode.zipcodeapi_key;

var mockState = require('./lists/mockState');

// main components
var Nav = require('./Nav.jsx');
var Search = require('./Search.jsx');
var Card = require('./Card.jsx');
// board components
var Board = require('./board/Board.jsx');
var BoardCard = require('./board/BoardCard.jsx');
var BoardCardModal = require('./board/BoardCardModal.jsx');
// feed components
// var AuthModal = require('./feed/AuthModal.jsx');
// var Feed = require('./feed/Feed.jsx');
var FeedCard = require('./feed/FeedCard.jsx');
// user components
var BoardModal = require('./user/BoardModal.jsx');
// var User = require('./user/User.jsx');
// var UserCard = require('./user/UserCard.jsx');


var App = React.createClass({
  getInitialState: function () {
    return mockState;
  },

  searchPlace: function (query, callback) {
      var city = this.state.location.city.split(' ').join('+');
      city += ',+' + this.state.location.state;

      console.log('Searching Foursquare for %s in %s', query, city);

      $.get('https://api.foursquare.com/v2/venues/search?client_id='+FOURSQUARE_CLIENT_ID+'&client_secret='+FOURSQUARE_CLIENT_SECRET+'&v=20130815&near='+city+'&query='+query)
      .done(function(data) {
        console.log("WORKS!");
        callback(data);
        }).fail(function(err) {
        console.log('there was an error')
        callback(err);
      });

    //Query will come from BoardCardModal.
    console.log('Searching Place...');
    return;
  },

  searchVenue: function (venueId, callback) {
      console.log('Searching Foursquare for venue ID %s', venue);
      var url = 'https://api.foursquare.com/v2/venues/' + venueId + '?client_id=' + FOURSQUARE_CLIENT_ID + '&client_secret=' + FOURSQUARE_CLIENT_SECRET + '&v=20160225';

      $.get(url)
      .done(function(data) {
        console.log("GOT VENUE DATA!");
        callback(data);
        }).fail(function(err) {
        console.log('there was an error')
        callback(err);
      });

    //Query will come from BoardCardModal.
    console.log('Searching Venue...');
    return;
  },

  explorePlace: function (query) {
    // Foursquare Explore API call to return inspiration data
    console.log('Exploring Place...');
    return;
  },

  render: function () {
    var containerStyle = {
      'marginTop': '50px',
      'padding': '20px 30px'
    };

    return (
      <div className="container">
        <Nav
          searchPlace={this.searchPlace}
          explorePlace={this.explorePlace}
          locations={this.state.locations}
        />
        <main>
          <div
            className="ui link four fluid stackable special cards"
            style={containerStyle}>
            {
              this.state.cards.map((card, key) =>
                <Card data={card} key={key}/>
              )
            }
          </div>
        </main>
      </div>
    );
  }
});

ReactDOM.render(<App />, document.getElementById('app'));
