var React = require('react');
var ReactDOM = require('react-dom');
import { Router, Route, Link, hashHistory, IndexRoute } from 'react-router';


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

// test component
var Home = require('./Home');

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
    // console logs to make sure children is getting populated
    // console.log('this.state', this.state);
    // console.log('this.props: ', this.props);
    // console.log('children: ', this.props.children);
    var children = React.cloneElement(this.props.children, { status: this.state });

    return (
      <div>
        <Nav
          searchPlace={this.searchPlace}
          explorePlace={this.explorePlace}
          locations={this.state.locations}
        />
        {children || <Home/>}
      </div>
    );
  }
});

var containStyle = {
  'marginTop': '50px',
  'padding': '20px 30px'
};

var BoardHandler = React.createClass({
  render: function () {
    return (
      <div>
      {console.log('inside BoardHandler', this.props.status)}
      <Board board={this.props.status.boards[2]} venues={this.props.status.venues} style={containStyle}/>
      </div>
    )
  }
});

var UserHandler = React.createClass({
  render: function () {
    return (
      <div>
      {console.log('inside UserHandler', this.props.status)}
      <User user={this.props.status.user} boards={this.props.status.boards} venues={this.props.status.venues} style={containStyle}/>
      </div>
    )
  }
});

var FeedHandler = React.createClass({
  render: function () {
    return (
      <div>
      {console.log('inside FeedHandler', this.props.status)}
      <Feed cards={this.props.status.cards} venues={this.props.status.venues} style={containStyle}/>
      </div>
    )
  }
});

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      {console.log('inside Router')};
      <IndexRoute component={Home} />
      <Route path="/board" component={BoardHandler} />
      <Route path="/user" component={UserHandler}/>
      <Route path="/feed" component={FeedHandler} />
      </Route>
  </Router>, 
  document.getElementById('app')
);