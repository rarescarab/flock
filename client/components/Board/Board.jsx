var React = require('react');
var ReactRouter = require('react-router');

var Board = React.createClass({
	getInitialState: function(){
		return {
			cardType: null,
			currentBoard: null //All other info in database
		}
	},

	renderBoardCardModal: function(){
		return <BoardCardModal/>
	},

	handleClick: function(){
		this.renderBoardCardModal()
	},

	render: function(){
		var boardCards = this.props.cards.map(function(card){
			return <BoardCard cardDetails={this.props.cards.card}/>
		});

		return (
			<div>
				<h3>{this.title}</h3>
				{boardCards}
				<button onClick={this.handleClick}> Add New Event </button>
			</div>
		)


	}

});

module.exports = Board;
