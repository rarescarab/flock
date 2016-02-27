var React = require('react');
var ReactRouter = require('react-router');

var Card = require('../Card');
var BoardCard = require('./BoardCard');
var Modal = require('../Modal');
var BoardModal = require('./BoardModal');

var Board = React.createClass({
  propTypes: {
    title: React.PropTypes.string,
    image: React.PropTypes.string,
    description: React.PropTypes.string,
    userId: React.PropTypes.string,
    cards: React.PropTypes.array
  },

  getDefaultProps: function () {
    return {
      title: 'Sample Board Title',
      image: 'http://semantic-ui.com/images/wireframe/image.png',
      description: 'Lorem ipsum...Some dummy board data goes here.',
      userId: '',
      cards: []
    }
  },

  revealModal: function(){
    $('#boardModal.ui.modal').modal('show');
  },

  resizeModal: function(){
    $('#boardModal.ui.modal').modal('refresh');
  },

  render: function () {
    var headStyle = {
      'marginTop': '50px',
      'height': '60vh',
      'backgroundImage': `url("${this.props.board.image}")`,
      'backgroundAttachment': 'fixed',
      'backgroundSize': 'cover',
      'backgroundPosition': 'center 65%',
      'backgroundRepeat': 'no-repeat'
    };

    return (
      <section>
        <header style={headStyle}>
          <div className="ui compact segment">
            <h1>{this.props.board.title}</h1>
          </div>
        </header>

        <main style={this.props.style}>
          <div className='ui fluid'>
            {this.props.board.cards.map((card, key) =>
              <BoardCard board={this.props.board} card={card} venues={this.props.venues} key={key}>
              </BoardCard>
            )}
          </div>

          <div className="ui center aligned basic segment">
            <div onClick={this.revealModal} className="ui center massive circular icon blue button">
              <i className="plus icon"></i>
            </div>
          </div>
        </main>

				<Modal>
          <BoardModal/>
        </Modal>
			</section>
		)
	}
});

module.exports = Board;
