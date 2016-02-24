var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');

var configJSON = require('../../config.JSON');
var configJS = require('../../config.js');

var apiInfo = require('../../config.js');
var FOURSQUARE_CLIENT_ID = apiInfo.foursquare.client_ID
var FOURSQUARE_CLIENT_SECRET = apiInfo.foursquare.client_secret

console.log(configJSON);

// main components
var Nav = require('./Nav.jsx');
var Search = require('./Search.jsx');
// board components
var Board = require('./board/Board.jsx');
var BoardCard = require('./board/BoardCard.jsx');
var BoardCardModal = require('./board/BoardCardModal.jsx');
// feed components
// var AuthModal = require('./feed/AuthModal.jsx');
// var Feed = require('./feed/Feed.jsx');
// var FeedCard = require('./feed/FeedCard.jsx');
// user components
// var BoardModal = require('./user/BoardModal.jsx');
// var User = require('./user/User.jsx');
// var UserCard = require('./user/UserCard.jsx');


var App = React.createClass({
  getInitialState: function () {
    return {
      user: {
        _id: '1234567890',
        username: 'John Doe',
        boards: [],
        home: 94608
      },
      location: {
        city: 'Emeryville',
        state: 'CA',
        zip: 94608
      },
      locations: ['San Francisco, CA', 'New York, NY', 'Seattle, WA']
    };
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

  explorePlace: function (query) {
    // Foursquare Explore API call to return inspiration data
    console.log('Exploring Place...');
    return;
  },

  render: function () {
    return (
      <div className="container">
        <Nav
          searchPlace={this.searchPlace}
          explorePlace={this.explorePlace}
          locations={this.state.locations}
        />
        <main>
          {
            // we think React Router goes in here somehow
            // so that it renders Board
          }
        </main>
      </div>
    );
  }
});

ReactDOM.render(<App />, document.getElementById('app'));
