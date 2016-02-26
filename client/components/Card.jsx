var React = require('react');
var ReactRouter = require('react-router');

var Card = React.createClass({
  componentDidMount: function () {
    $('.ui.bottom.attached.progress').progress();
  },

  render: function () {
    var progressStyle = {
      'height': '0.2rem'
    };

    var barStyle = {
      'height': '0.5rem',
      'borderRadius': '10px',
      'marginTop': '-2px'
    };

    return (
      <div className="card">
        <div className="content">
          <div className="ui orange left ribbon label">
            <i className="spoon icon"></i>
            {this.props.data.categories[0].shortName}
          </div>
        </div>
        <div className="blurring dimmable image">
          <div className="ui dimmer">
            <div className="content">
              <div className="center">
                <div className="ui inverted button">Add Card</div>
              </div>
            </div>
          </div>
          <img className="ui image" src="http://semantic-ui.com/images/avatar/large/elliot.jpg"/>
        </div>
        {this.props.children}
        <div className="extra content">
          <div className="ui large transparent left icon input">
            <i className="comment icon"></i>
            <input type="text" placeholder="Add Comment..."/>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Card;
