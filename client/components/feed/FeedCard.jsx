var React = require('react');
var ReactRouter = require('react-router');

var FeedCard = React.createClass({
  componentDidMount: function () {
    $('.special.cards .image').dimmer({on: 'hover'});
  },

  render: function () {
    var offsetJsx = <span style={{'marginLeft': '-5px'}}></span>;

    return (
      <div className="card">
        <div className="ui content attached segment">
          <div className="header">{this.props.card.name}</div>
          <div className="meta">
            <i className="ui tiny dollar icon"></i>
            <i className="ui tiny dollar icon"></i>
            <i className="ui tiny dollar icon"></i>
            <i className="ui tiny dollar icon"></i>
          </div>
          <div className="description">
            <i className="pin icon"></i>
            {this.props.card.location.address}
          </div>
          <div className="description">
            <i className="call icon"></i>
            {this.props.card.contact.formattedPhone}
          </div>
          <div className="description">
            {this.props.card.url || this.props.card.canonicalUrl ?
              <a href={`http://facebook.com/${this.props.card.contact.facebook}`} target="blank"><i className="world icon"></i></a>
            : offsetJsx}
            {this.props.card.contact.facebook ?
              <a href={`http://facebook.com/${this.props.card.contact.facebook}`} target="blank"><i className="facebook icon"></i></a>
            : offsetJsx}
            {this.props.card.contact.twitter ?
              <a href={`http://twitter.com/${this.props.card.contact.twitter}`} target="blank"><i className="twitter icon"></i></a>
            : ''}
          </div>
          {this.props.card.hasMenu ?
            <a className="ui black bottom right attached mini label" href={this.props.card.menu.externalUrl || this.props.card.menu.mobileUrl} style={{'borderBottomRightRadius': 0}} target="blank">
              Menu
            </a> : ''
          }
        </div>
        <div className="ui content attached segment">
          <span className="right floated">
            <i className="user icon"></i>
            {this.props.card.stats.checkinsCount} visitors
          </span>
          <i className="idea icon"></i>
          {this.props.card.stats.tipCount} tips
        </div>
      </div>
    )
  }
});

module.exports = FeedCard;
