import React from 'react'

import Card from '../Card'
import UserCard from './UserCard'
import Modal from '../Modal'
import UserModal from './UserModal'

/* -------------- */
/*     User     */
/* -------------- */

class User extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      permalink: '',
      valid: true,
      pristine: true,
      mode: 'userModal',
      dimmer: ''
    }
  }

  generateLink = (str) => {
    return str.replace(/[^a-z0-9]+/gi, '-')
    .replace(/^-*|-*$/g, '').toLowerCase()
  }

  suggestLink = (evt) => {
    if (this.state.pristine) {
      let link = this.generateLink(evt.target.value)
      this.setState({permalink: link})
    }
  }

  changeLink = (evt) => {
    this.generatePermalink(evt.target.value)
    this.setState({pristine: false})
  }

  checkLink = () => {
    console.log('CHECKING API FOR LINK NOW',this)
    $.get('/api/boards', {
      permalink: this.state.permalink,
      username: this.props.user.username
    })
    .done(function(data) {
      if (data) {
        console.log('GOT BOARD DATA BACK!',this)
        this.setState({valid: true})
      } else {
        console.log('GOT NO BOARD DATA BACK!',this)
        this.setState({valid: false})
      }
    }).fail(function(err) {
      console.log('GOT AN ERROR FROM API!',this)
      this.setState({valid: false})
      console.error('Could not get board data from server', err)
      throw new Error('Could not get board data from server', err)
    })
  }

  toggleModal = () => {
    if (this.state.dimmer) {
      this.setState({dimmer: ''})
    } else {
      this.setState({dimmer: 'active visible'})
    }
  }

  showModal = (evt) => {
    var $modal = $('#' + this.state.mode + 'Modal')
    var $form = $('#' + this.state.mode + 'Form')
    var $title = $('#' + this.state.mode + 'Title')
    var $desc = $('#' + this.state.mode + 'Description')
    var $pvt = $('#' + this.state.mode + 'Secret')
    var $flock = $('#' + this.state.mode + 'Flock')

    $modal.modal({
      observeChanges: true,
      onDeny: function (evt) {},
      onApprove: function (evt) {
        var title = $title.val()
        var description = $desc.val()
        var isPrivate = $pvt.val()
        var flock = $flock.val()
        $form.form('get value', 'userModalTitle')
      }
    })
    .modal('toggle')
  }

  render () {
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
    }

    var statStyle = { 'marginBottom': 0 }

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
            <div onClick={this.toggleModal.bind(this)} className="ui center massive circular icon pink button">
              <i className="plus icon"></i>
            </div>
          </div>
        </main>
        <Modal
          mode={this.state.mode}
          dimmer={this.state.dimmer}
          user={this.props.user}
          header={'Create a board'}
          suggestLink={this.suggestLink}
          checkLink={this.checkLink}
        >
          <UserModal
            user={this.props.user}
            mode={this.state.mode}
            permalink={this.state.permalink}
            changeLink={this.changeLink}
            checkLink={this.checkLink}
          />
        </Modal>
      </section>
    )
  }
}

User.propTypes = {
  user: React.PropTypes.object.isRequired,
  boards: React.PropTypes.array.isRequired
}

module.exports = User
