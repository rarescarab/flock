var React = require('react');
var ReactRouter = require('react-router');

var BoardCard = React.createClass({
	getInitialState: function(){
		//The boardType will determine if the card is a board-card, a user-card, or a feed-card. 
		//Background image will come form the api if it is a board-card,
		//or be set as the first location if it is a user-card. 
		return {
			boardType: null,
			background-image: null
		}
	},


	handleClick: function(){
	},

	render: function(){
		return (
			<div>
				<div className="userCardInfo">
					<h4> {this.userTitle} </h4>
					<p>{this.props.description}</p>
				</div>

				<div className="fourSquareData">
					<h3> {this.venueTitle} </h3>
					<h4> {this.catagory} </h4>
					<h4> {this.address} </h4>
				</div>

				<button onClick={this.handleClick}>Remove Card</button>

			</div>
		)
	}
});

module.exports = BoardCard;
