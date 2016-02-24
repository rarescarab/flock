var React = require('react');
var ReactRouter = require('react-router');

var Search = React.createClass({
  getInitialState: function () {
    return {
      value: ''
    };
  },

  componentDidMount: function () {
    $('.ui.dropdown').dropdown();
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
    var query = this.state.value;
    this.props.searchMethod(query, function(result) {
      if(!result) {
        throw new Error('Could not find any results for ' + query);
      } else {
        console.log('inside handleSubmit in Search component');
        console.log(result.response.venues);
      }
    });
  },

  render: function () {
    return (
      <div className="ui right action search left icon input">
        <form onSubmit={this.handleSubmit} className="ui right action search left icon input">
          <i className="search icon"></i>
          <input onChange={this.handleInputChange} type="text" placeholder="Search"/>
        </form>
        <div className="ui labeled icon top right pointing dropdown button">
          <i className="marker icon"></i>
          <span id="locationFilter" className="text">San Francisco</span>
          <div className="menu">
            <div className="ui search icon input">
              <i className="search icon"></i>
              <input type="text" name="search" placeholder="Search issues..."/>
            </div>
            <div className="divider"></div>
            <div className="header">
              <i className="tags icon"></i>
              Filter by tag
            </div>
            <div className="item" data-text="Discussion">
              <div className="ui red empty circular label"></div>
              Important
            </div>
            <div className="item" data-text="Announcement">
              <div className="ui blue empty circular label"></div>
              Announcement
            </div>
            <div className="item" data-text="Discussion">
              <div className="ui black empty circular label"></div>
              Discussion
            </div>
            <div className="divider"></div>
            <div className="header">
              <i className="calendar icon"></i>
              Filter by date
            </div>
            <div className="item" data-text="This Week">
              <i className="olive circle icon"></i>
              This Week
            </div>
            <div className="item" data-text="This Month">
              <i className="violet circle icon"></i>
              This Month
            </div>
            <div className="item" data-text="This Year">
              <i className="orange circle icon"></i>
              This Year
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Search;
