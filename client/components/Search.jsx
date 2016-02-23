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
    this.props.searchMethod(this.state.value, function(err, result) {
      if(err) {
        console.log(err);
      } else {
        console.log('inside handleSubmit in Search component');
        console.log(result);
      }
    });
  },

  render: function () {
    return (
      <div className="ui right action left icon input">
        <i className="search icon"></i>
        <input type="text" placeholder="Search"/>

        <div className="ui labeled icon top right pointing dropdown button">
          <i className="marker icon"></i>
          <span id="locationFilter" className="text">
            San Francisco
          </span>
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
            <div className="item">
              <div className="ui red empty circular label"></div>
              Important
            </div>
            <div className="item">
              <div className="ui blue empty circular label"></div>
              Announcement
            </div>
            <div className="item">
              <div className="ui black empty circular label"></div>
              Discussion
            </div>
            <div className="divider"></div>
            <div className="header">
              <i className="calendar icon"></i>
              Filter by date
            </div>
            <div className="item">
              <i className="olive circle icon"></i>
              This Week
            </div>
            <div className="item">
              <i className="violet circle icon"></i>
              This Month
            </div>
            <div className="item">
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
