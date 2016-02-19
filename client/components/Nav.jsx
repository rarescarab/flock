var React = require('react');
var ReactRouter = require('react-router');

var Nav = React.createClass({
  renderAuthModal: function () {
    // display <AuthModal />
  },

  render: function () {
    <nav>
      <ul>
        <li><a href="#">Home</a></li>
        <li><Search searchMethod="this.props.explorePlace" /></li>
        <li><Search searchMethod="this.props.searchPlace" /></li>
        <li><a href="#">Log In</a></li>
      </ul>
    </nav>
  };
});

module.exports = Nav;