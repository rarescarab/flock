var React = require('react');
var ReactRouter = require('react-router');
var ReactDOM = require('react-dom');
var FacebookLogin = require('react-facebook-login');

var Search = require('./Search.jsx');

var Nav = React.createClass({
  responseFacebook: function (response) {
    console.log(response);
  },

  render: function () {
    return (
      <nav>
        <ul>
          <li><a href="#">Home</a></li>
          <li><Search searchMethod={this.props.explorePlace} /></li>
          <li><Search searchMethod={this.props.searchPlace} /></li>
          <li>
            <FacebookLogin
                appId={FACEBOOK_APP_ID}
                autoLoad={true}
                callback={this.responseFacebook} />
          </li>
        </ul>
      </nav>
    );
  }
});

module.exports = Nav;
