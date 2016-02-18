var searchFoursquare = function(city, query, callback) {

	$.get('https://api.foursquare.com/v2/venues/search?client_id='+FOURSQUARE_CLIENT_ID+'&client_secret='+FOURSQUARE_CLIENT_SECRET+'&v=20130815&near='+city+'&query='+query)
	.done(function(data) {
		console.log("WORKS!");
		callback(data);
	}).fail(function(err) {
		console.log('there was an error')
		callback(err);
	});

};