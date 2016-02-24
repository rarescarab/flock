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
    var searchStyle = { width: 60 + '%'};
    return (
      <nav>
        <div className="ui fixed inverted menu">
          <div className="ui container">
            <a href="#" className="header item">
              <img className="logo" src="assets/images/logo.svg"></img>
            </a>
            <div className="item" style={searchStyle}>
              <Search
                searchMethod={this.props.searchPlace}
                locations={this.props.locations}
              />
            </div>
            <div id="userMenu" className="ui simple right dropdown item">
              Username<i className="dropdown icon"></i>
              <div className="menu">
                <a className="item" href="#"><i className="grid layout icon"></i>My Boards</a>
                <div className="divider"></div>
                <div className="item">
                  <i className="user icon"></i>
                    Account
                  <i className="dropdown icon"></i>
                  <div className="menu">
                    <a className="item" href="#"><i className="wrench icon"></i>Settings</a>
                    <a className="item" href="#"><i className="phone icon"></i>Support</a>
                  </div>
                </div>
                <div className="divider"></div>
                <a className="item" href="#">Sign Out</a>
                <div className="divider"></div>
                <FacebookLogin
                    appId={FACEBOOK_APP_ID}
                    autoLoad={true}
                    callback={this.responseFacebook} />
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
});

module.exports = Nav;
