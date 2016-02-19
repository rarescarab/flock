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

  searchPlace: function (options) {
    // API call to info about a city or a query
    // Takes an options object to be used for GET request
    // { city: 'San Diego', query: 'bars' }
  },

  explorePlace: function (query) {
    // Foursquare Explore API call to return inspiration data
  },

  render: function () {
    return (
      <div className="container">
        <Nav
          searchPlace={this.searchPlace}
          explorePlace={this.explorePlace}
        />
        <main>
          {
            // we think React Router goes in here somehow
            // so that it renders Board
          }
          <Search location={this.state.location} />
        </main>
      </div>
    );
  }
});

ReactDOM.render(<App />, document.getElementById('app'));