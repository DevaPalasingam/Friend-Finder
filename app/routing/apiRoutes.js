var friends = require("../data/friends");


module.exports = function(app) {

	// when user visits localhost:PORT/api/friendsData... they get a JSON of the friends in the database
	app.get("/api/friendsData", function(req, res) {
    	res.json(friends);
  	});



	app.post("/api/friendsData", function(req, res) {
		friends.push(req.body);

		// code here to send JSON of new friend
	});

}