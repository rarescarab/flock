var App = React.createClass({
  getInitialState: function () {
    return {
      location: 'San Francisco' // initialize location state 
    };
  },

  render: function () {
    return (
      <div className="container">
        <Nav />
        <main>
          <Search location={this.state.location} />
        </main>
      </div>
    );
  }
});

ReactDOM.render(<App />, document.getElementById('app'));