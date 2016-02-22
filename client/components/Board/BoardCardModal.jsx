var React = require('react');
var ReactRouter = require('react-router');

var BoardCardModal = React.createClass({
	handleInputChange:function(e){

	},

	render: function(){
		return (
			<div>
				{/* Collect information about new event
					Bind should give access of props to the parent for searching */}
				<form className="newBoardCard"  onClick={this.props.searchPlaces()}>

					<input placeholder="Title" name="title" value={this.state.Title} onChange={this.handleInputChange}/>

					<input placeholder="Description" name="description" value={this.state.description} onChange={this.handleInputChange}/>

					{/* Get information from App Search places, and save on state/db */}

					<input onSubmit={this.props.onSubmit.bind(null, this)} placeholder="Search"/>

					{/* This button will change the state of submitted to be true */}
				<button> Enter Event </button>
				</form>


				<button onClick={this.handleClick}> Save Event </button>
			</div>
		)


	}
});

module.exports = BoardCardModal;
