var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');

var apiInfo = require('../../config');
window.FOURSQUARE_CLIENT_ID = apiInfo.foursquare.client_ID;
window.FOURSQUARE_CLIENT_SECRET = apiInfo.foursquare.client_secret;
window.ZIPCODEAPI_KEY = apiInfo.zipcode.zipcodeapi_key;

var mockState = require('./lists/mockState');

// main components
var Nav = require('./Nav');
var Search = require('./Search');
var Card = require('./Card');
// board components
var Board = require('./board/Board');
var BoardCard = require('./board/BoardCard');
var BoardCardModal = require('./board/BoardCardModal');
// feed components
// var AuthModal = require('./feed/AuthModal');
var Feed = require('./feed/Feed');
var FeedCard = require('./feed/FeedCard');
// user components
var BoardModal = require('./user/BoardModal');
var User = require('./user/User');
// var UserCard = require('./user/UserCard');


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
    var containStyle = {
      'marginTop': '50px',
      'padding': '20px 30px'
    };

    return (
      <div>
        <Nav
          searchPlace={this.searchPlace}
          explorePlace={this.explorePlace}
          locations={this.state.locations}
        />
        <Board board={this.state.boards[2]} venues={this.state.venues} style={containStyle}/>
        {/*<User user={this.state.user} boards={this.state.boards} venues={this.state.venues} style={containStyle}/>*/}
        {/*<Feed cards={this.state.cards} venues={this.state.venues} style={containStyle}/>*/}
      </div>
    );
  }
});

ReactDOM.render(<App/>, document.getElementById('app'));
