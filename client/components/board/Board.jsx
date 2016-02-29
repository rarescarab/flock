import React from 'react'

import BoardCard from './BoardCard'
import Modal from '../Modal'
import BoardModal from './BoardModal'

class Board extends React.Component {
  constructor(props) {
    super(props)
    this.state = { mode: 'boardModal' }
  }

  showModal = (evt) => {
    var $modal = $('#' + this.state.mode + 'Modal')
    var $form = $('#' + this.state.mode + 'Form')
    var $title = $('#' + this.state.mode + 'Title')
    var $desc = $('#' + this.state.mode + 'Description')
    var $pvt = $('#' + this.state.mode + 'Secret')
    var $flock = $('#' + this.state.mode + 'Flock')

    $('#' + this.state.mode)
      .modal({
        onDeny: function (evt) {
          console.log('GOODBYE NEW CARD')
        },
        onApprove: function (evt) {
          var title = $title.val()
          var description = $description.val()
          var isPrivate = $isPrivate.val()
          var flock = $flock.val()
          console.log('Approved!', this)
          console.log('title', title)
          console.log('description', description)
          console.log('isPrivate', isPrivate)
          console.log('flock', flock)
          return false
        }
      })
      .modal('toggle')
  }

  resizeModal = (evt) => {
    $('#boardModal').modal('refresh')
  }

  render() {
    var headStyle = {
      'marginTop': '50px',
      'height': '60vh',
      'backgroundImage': `url("${this.props.board.image}")`,
      'backgroundAttachment': 'fixed',
      'backgroundSize': 'cover',
      'backgroundPosition': 'center 65%',
      'backgroundRepeat': 'no-repeat'
    }

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
            <div onClick={this.showModal} className="ui center massive circular icon blue button">
              <i className="plus icon"></i>
            </div>
          </div>
        </main>

        <Modal mode={this.state.mode} header={'Create a card'}>
          <BoardModal mode={this.state.mode}/>
        </Modal>
      </section>
    )
  }
}

Board.propTypes = {
  title: React.PropTypes.string,
  image: React.PropTypes.string,
  description: React.PropTypes.string,
  userId: React.PropTypes.string,
  cards: React.PropTypes.array
}

Board.defaultProps = {
  title: 'Sample Board Title',
  image: 'http://semantic-ui.com/images/wireframe/image.png',
  description: 'Lorem ipsum...Some dummy board data goes here.',
  userId: '',
  cards: []
}

module.exports = Board
