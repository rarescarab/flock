var searchFoursquare = function(city, query, callback) {

	$.get('https://api.foursquare.com/v2/venues/search?client_id=' + FOURSQUARE_CLIENT_ID + '&client_secret=' + FOURSQUARE_CLIENT_SECRET + '&near=' + city + '&query=' + query)
	.done(function(data) {
		callback(data);
	}).fail(function(err) {
		callback(err);
	});

};