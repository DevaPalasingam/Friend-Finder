var friends = require("../data/friends");


module.exports = function(app) {

	// when user visits localhost:PORT/api/friendsData... they get a JSON of the friends in the database
	app.get("/api/friendsData", function(req, res) {
    	res.json(friends);
  	});



	app.post("/api/friendsData", function(req, res) {
		var bestFriend;
		// matching holds a number for lowest amount of differences in the list of friends
		// matchingIndex  holds the index for that friend
		var matching = 100;
		var matchingIndex = 0;

		// This for-loop will take in the user input data and turn the users answer choices into ints instead of strings
		//req.body is an object of the user's information
		for(var i = 0; i < req.body.scores.length; i++) {
			req.body.scores[i] = parseInt(req.body.scores[i]);
		}

		// comparing friends
		for(var c = 0; c < friends.length; c++) {
			var differenceCount = 0;
			
			// comparing answers
			for(var b = 0; b < friends[c].scores.length; b++) {

				// add becomes the absolute difference of the user's answer to a question and the friends answer to that question
				var add = Math.abs(friends[c].scores[b] - req.body.scores[b]);

				// add gets added to differenceCount
				differenceCount = differenceCount + add;
			}
			// closes comparing answers for-loop

			// if differenceCount is less than matching, update matching and matchingIndex
			if(differenceCount < matching) {
				matching = differenceCount;
				matchingIndex = c;
			}
		}
		// closes comparing friends for-loop

		bestFriend = friends[matchingIndex];


		friends.push(req.body);
		console.log("here's some friends");
		console.log(friends);



		console.log("req.body: ");
		console.log(req.body);

		res.json(bestFriend);

		// code here to send JSON of new friend
	});

}