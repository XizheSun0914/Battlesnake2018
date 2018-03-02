var floodFill = require('./functions/floodFill.js')
var contains = require('./functions/contains.js')
var aStar = require('./functions/aStar.js')
var chooseDirection = require('./functions/chooseDirection.js')
var lastStand = require('./functions/lastStand.js')

//does flood fill to find how large the space is and where the walls are

//if large enough, chase tail one away. taking up as much space as possible 
//if too small, search for enemy snake tail and A* to it. 

module.exports = exports = function(mySnake, enemies, board, decision) {

	console.log("running keepAlive");
	var openSpace = floodFill(mySnake, enemies, board);
	console.log(openSpace.length);

	var firstChoice = aStar(board, mySnake, enemies, mySnake.body[mySnake.body.length-1]);

	//debugging
	for(var j = 0; j < firstChoice.length; j++) {
		console.log("move #" + j + ": " + firstChoice[j].x + " " + firstChoice[j].y);
	}

	//A* to tail if available and not hungry
	if(firstChoice.length != 0 && (mySnake.health > 40)) {

		console.log("lets do some circles!");
		chooseDirection(mySnake, firstChoice[1], decision, 2000);

	} else {

		var nearbyTails = [];

		//find tails to chase using astar
		for(var i = 0; i < enemies.length; i++) {
			var temp = aStar(board, mySnake, enemies, enemies[i].body[enemies[i].body.length-1]);

			console.log(temp.length);

			//makes sure we arent going into a tail that isnt going to move
			if(temp.length > 0 && !(temp.length == 2 && enemies[i].health == 100)) {
				nearbyTails.push(temp);
			}
		}

		//if no enemy tails, check to follow my tail
		if(nearbyTails.length == 0) {

			console.log("uh oh! no enemy tails to chase!");

			//if no options, just avoid trapping, but cant do much else
			if(firstChoice.length == 0) {
				console.log("my tail isnt available either! :(");
				lastStand(mySnake, enemies, board, decision);

			//if i can reach my tail, aStar to it
			} else {
				chooseDirection(mySnake, firstChoice[1], decision, 2000);
			}
		//A* to best enemy tail 
		} else {
			//decreases value of each route based on weight vs other routes
			console.log("theres a tail!");
			
			nearbyTails.sort(function(a, b) {
				return a[a.length-1].f - b[b.length-1].f;
			});

			var deincrement = 2000;

			for(var i = 0; i < nearbyTails.length; i++) {
				chooseDirection(mySnake, nearbyTails[i][1], decision, deincrement);
				deincrement = deincrement*(1/3);
			}
		}
	}
	return;
}