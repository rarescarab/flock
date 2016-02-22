var React = require('react');
var ReactRouter = require('react-router');

var Search = React.createClass({
  getInitialState: function () {
    return {
      value: ''
    };
  },

  // handles when text is typed into search box
  handleInputChange: function (evt) {
    this.setState({
      value: evt.target.value
    });
  },

  // handles when user hits 'Enter' key while in search box
  handleSubmit: function (evt) {
    evt.preventDefault();
    this.props.searchMethod(this.state.value);
  },

  render: function () {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="Search..."
          onChange={this.handleInputChange}
        />
      </form>
    );
  }
});

module.exports = Search;
