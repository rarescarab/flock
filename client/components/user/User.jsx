var React = require('react');
var ReactRouter = require('react-router');

var Card = require('../Card.jsx');
var UserCard = require('./UserCard.jsx')
var UserModal = require('../user/UserModal.jsx');

var User = React.createClass({
  propTypes: {
    user: React.PropTypes.object.isRequired,
    boards: React.PropTypes.array.isRequired
  },

  revealModal: function(){
    $('#boardModal.ui.modal').modal('show');
  },

  resizeModal: function(){
    $('#boardModal.ui.modal').modal('refresh');
  },

  render: function () {
    var centerStyle = {
      'display': '-webkit-flex',
      'display': 'flex',
      'WebkitFlexDirection': 'row',
      'flexDirection': 'row',
      'WebkitAlignItems': 'center',
      'alignItems': 'center',
      'WebkitJustifyContent': 'center',
      'justifyContent': 'center',
      'borderBottom': '2px solid #2185d0',
      'borderTop': 'none',
      'marginBottom': '20px'
    };

    var statStyle = {
      'marginBottom': 0
    };

    return (
      <section style={this.props.style}>
        <header>
          <div className="ui basic center aligned segment">
            <img className="ui circular image" src="http://semantic-ui.com/images/avatar2/small/matthew.png" style={{'margin': '0 auto'}}/>
            <h1>John Domingo</h1>
            <div className="ui statistics blue secondary segment" style={centerStyle}>
              <div className="statistic" style={statStyle}>
                <div className="value">4 <i className="small table icon"></i></div>
                <div className="label">Boards</div>
              </div>
              <div className="statistic" style={statStyle}>
                <div className="value">18</div>
                <div className="label">Cards</div>
              </div>
              <div className="statistic" style={statStyle}>
                <div className="text value">Twenty<br/>Two</div>
                <div className="label">Followers</div>
              </div>
              <div className="statistic" style={statStyle}>
                <div className="value">
                  <img src="http://semantic-ui.com/images/avatar/small/joe.jpg" className="ui circular inline image" data-pin-nopin="true"/> 40</div>
                <div className="label">Friends</div>
              </div>
            </div>
          </div>
        </header>
        <main>
          <div className='ui link four fluid stackable special cards'>
            {this.props.boards.map((board, key) =>
              <Card card={board} key={key}>
                <UserCard board={board} venues={this.props.venues} key={key}/>
              </Card>
            )}
          </div>
          <div className="ui center aligned basic segment">
            <div onClick={this.revealModal} className="ui center massive circular icon blue button">
              <i className="plus icon"></i>
            </div>
          </div>
        </main>
        <UserModal/>
      </section>
    )
  }
});

module.exports = User;
