var React = require('react');
var ReactRouter = require('react-router');

var categories = require('../lists/categories');
var friends = require('../lists/friends');

/* -------------- */
/*     Styles     */
/* -------------- */

var modalStyle = {
  'marginTop': '-213px',
  'display': 'block !important'
};

var toggleStyle = {
  'paddingLeft': '0'
};

/* ----------------- */
/*     Component     */
/* ----------------- */

var UserModal = React.createClass({
  componentDidMount: function () {
    $('#boardModal.ui.modal').modal('hide');
    $('#categoryDropdown.ui.dropdown').dropdown();
    $('#privateCardToggle.ui.checkbox').checkbox();
    $('#flockSelection.ui.selection').dropdown();
  },

  renderUserModal: function(){
    return <BoardModal/>
  },

  render: function () {
    return (
      <div id="boardModal" className="ui small modal transition visible active" style={modalStyle}>
        <i className="close icon"></i>
        <div className="header">
          Create a board
        </div>{/* Modal Header */}
        <div className="content">
          <div className="ui form">
            <div className="ui grid field">
              <label className="three wide column">Title</label>
              <input className="thirteen wide column" placeholder='Try "Weekend Adventure" or "New York in 48 Hours"' required />
            </div>{/* Title Input */}

            <div className="ui grid field">
              <label className="three wide column">Description</label>
              <textarea rows="2" className="thirteen wide column" placeholder="What's your board about?"></textarea>
            </div>{/* Description Textarea */}

            <div className="ui grid field">
              <label className="three wide column">Category</label>
              <div id="categoryDropdown" className="ui selection dropdown thirteen wide column">
                <input type="hidden" name="card[type]"/>
                <div className="default text">What kind of board is it?</div>
                <i className="dropdown icon"></i>
                <div className="menu">
                  {$.map(categories, function (val, category) {
                    return (<div className="item" data-value={category} data-text={category} key={category}>
                      <i className={`${val.color} ${val.icon} icon`}></i>
                      {category}
                    </div>)
                  })}
                </div>
              </div>
            </div>{/* Category Dropdown */}

            <div className="ui grid field">
              <label className="three wide column">Secret</label>
              <div className="thirteen wide column field" style={toggleStyle}>
                <div id="privateCardToggle" className="ui toggle checkbox">
                  <label></label>
                  <input type="checkbox" tabIndex="0" className="hidden"/>
                </div>
              </div>
            </div>{/* Secret Board Toggle */}

            <div className="ui grid field">
              <label className="three wide column">Flock</label>
              <div className="thirteen wide column field" style={toggleStyle}>
                <div id="flockSelection" className="ui fluid multiple search normal selection dropdown">
                  <input type="hidden" name="country"/>
                  <i className="dropdown icon"></i>
                  <div className="default text">Add to you friends to your flock</div>
                  <div className="menu">
                    {friends.map((f, key) =>
                      <div className="item" data-value={f.username} key={key}>
                        <img className="ui mini avatar image" src={`http://semantic-ui.com/images/avatar/small/${f.avatar}.jpg`}/>
                        {f.name}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>{/* Flock Dropdown */}

          </div>{/* Form */}
        </div>{/* Modal Content */}
        <div className="actions">
          <div className="ui button">Cancel</div>
          <div className="ui green button">Send</div>
        </div>{/* Modal Footer */}
      </div>
    );
  }
});

module.exports = UserModal;
