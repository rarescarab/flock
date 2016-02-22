var React = require('react');
var ReactRouter = require('react-router');

var BoardCard = React.createClass({
	getInitialState: function(){
		return {
			currentBoard: null
		}
	},


	handleClick: function(){

	},

	render: function(){
		return (
			<div>
				<h3> {this.title} </h3>
				<p>{this.props.discription}</p>
				<div className="fourSquareData"></div>
			</div>
		)


	}
});

module.exports = BoardCard;
