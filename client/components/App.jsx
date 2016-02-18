var App = React.createClass({
  getInitialState: function () {
    return {
      // init user and perhaps store user data as object in state
      user: {
        id: '12345',
        username: 'bennyhungry',
        name: 'Benny Hung',
        home: 'San Francisco'
      }, 
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