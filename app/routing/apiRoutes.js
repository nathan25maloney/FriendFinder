var path = require("path");
var fs = require("fs");


module.exports = function(app){
	
    app.get("/api/friends", function(req, res) {
    	let myJson = null;
    	try {
    		myJson = JSON.parse(fs.readFileSync(path.join(__dirname, "../data/friends.json"), 'utf8'));
    	} catch(e){

    	}
		
				
	  	res.send(myJson);
	  	
	});

	app.post("/api/friends", function(req, res) {
		let myJson = null;
		let closestMatch;
		let lowestScore = 100;
		let newFriend = {
			name: req.body.name,
			photo: req.body.photo,
			scores: req.body.scores
		}
		let currentScore;

		try {
    		myJson = JSON.parse(fs.readFileSync(path.join(__dirname, "../data/friends.json"), 'utf8'));
    	} catch(e){
    		myJson = []
    	}

		if(myJson !== undefined){
			
			for (let i = 0; i < myJson.length; i++) {
				currentScore = compareScores(newFriend.scores,myJson[i].scores)
				if(currentScore < lowestScore){
					lowestScore = currentScore;
					closestMatch = myJson[i];

				}

			}
			if(lowestScore < 100){
				console.log(closestMatch);
				closestMatch.matchScore = lowestScore;
				res.send(closestMatch);
				delete closestMatch['matchScore'];
			}
			
		}else {

		}
		


		myJson.push(newFriend);
	  	fs.writeFile(path.join(__dirname, "../data/friends.json"), JSON.stringify(myJson, null, 2) , 'utf-8');
	});

	let compareScores = (newArr,oldArr) => {
		var totalDiff = 0;
		for (let i = 0; i < oldArr.length; i++) {
			totalDiff += Math.abs(newArr[i] - oldArr[i]);	
		}
		console.log(totalDiff);
		return totalDiff;
	}
}