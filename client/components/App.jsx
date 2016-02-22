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
      location: 'San Francisco' // initialize location state
    };
  },

  searchPlace: function (options) {
    // API call to info about a city or a query
    // Takes an options object to be used for GET request
    // { city: 'San Diego', query: 'bars' }

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
          <Search location={this.state.location} />
        </main>
      </div>
    );
  }
});

ReactDOM.render(<App />, document.getElementById('app'));
