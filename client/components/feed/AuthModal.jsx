var React = require('react');
var ReactRouter = require('react-router');

var AuthModal = React.createClass({
  getInitialState: function () {
    return {
      authType: 'Log In'
    };
  },

  authenticateUser: function (username, password) {
    // invoke method to check if user is authenticated
    // potentially a utility.js that uses FB API
  },

  signUp: function(evt) {
    evt.preventDefault();
    this.setState({
      authType: 'Sign In'
    });
  },

  render: function () {
    return (
      <div className="auth-modal">
        <form>
          <input className="auth-user" type="text" />
          <input className="auth-pass" type="password"/>
          <button className="auth-btn" type="submit">
            {this.state.authType}
          </button>
          <span>
            Need an account? <a href="#" onClick={this.signUp}>Sign Up Now</a>
          </span>
        </form>
      </div>
    );
  }
});

module.exports = AuthModal;