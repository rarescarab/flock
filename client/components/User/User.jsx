var React = require('react');
var ReactRouter = require('react-router');

var User = React.createClass({
	//For addding new boards
	renderBoardModal: function(){
		return <BoardModal/>
	},

  render: function () {
    return (
			<div class="userInfo">
				<h2>{this.props.username}</h2>
			</div>

			<div class="userCards">
				{userCards}
				<button onClick={this.handleClick}> Add New Event </button>
			</div>
		)  
  };
});

module.exports = User;