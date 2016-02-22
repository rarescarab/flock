var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');

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
      // init user and perhaps store user data as object in state
      user: {
        id: '12345',
        username: 'bennyhungry',
        name: 'Benny Hung',
        home: 'San Francisco'
      },
      location: 'San Francisco, CA' // initialize location state
    };
  },

  searchPlace: function (query, callback) {

      var city = this.state.location.split(' ');
      city = city.join('+');

      console.log('city & inside searchPlace function in App', city);

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
