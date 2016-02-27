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

var BoardModal = React.createClass({
  componentDidMount: function () {
    $('#categoryDropdown.ui.dropdown').dropdown();
  },

  render: function () {
    return (
      <div className="ui grid field">
        <label className="three wide column">Category</label>
        <div id="categoryDropdown" className="ui selection dropdown thirteen wide column">
          <input name="drpCategory" type="hidden" name="card[type]"/>
          <div className="default text">What kind of board is it?</div>
          <i className="dropdown icon"></i>
          <div className="menu">
            {$.map(categories, (val, category) =>
              <div className="item" data-value={category} data-text={category} key={category}>
                <i className={`${val.color} ${val.icon} icon`}></i>
                {category}
              </div>
            )}
          </div>{/* Menu */}
        </div>{/* Category Dropdown */}
      </div>
    );
  }
});

module.exports = UserModal;
