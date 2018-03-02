//JUST MAKE SURE LASTSTAND IS WORKING

var floodFill = require('./utilities/floodFill.js')
var contains = require('./utilities/contains.js')
var aStar = require('./utilities/aStar2.js')
var chooseDirection = require('./utilities/chooseDirection.js')
var lastStand = require('./lastStand.js')

//does flood fill to find how large the space is and where the walls are

//if i can reach my tail and im not hungry, a* to it.
//if i cant reach, search for enemy snake tail and A* to it. 
//if that fails too, go back to trying for my tail
//finally, just try to move without trapping myself in a single spot (LastStand function)

module.exports = exports = function(mySnake, enemies, board, decision) {

	console.log("running keepAlive");

	var firstChoice = aStar(board, mySnake, enemies, mySnake.body[mySnake.body.length-1]);

	//A* to tail if available and not hungry
	if(firstChoice.length != 0 && (mySnake.health > 40)) {

		console.log("lets do some circles!");
		chooseDirection(mySnake, firstChoice[1], decision, 2000);

	//otherwise try to route to enemy tail
	} else {

		var nearbyTails = [];

		//find tails to chase using A*
		for(var i = 0; i < enemies.length; i++) {
			var temp = aStar(board, mySnake, enemies, enemies[i].body[enemies[i].body.length-1]);

			//makes sure we arent going into a tail that isnt going to move
			if(temp.length > 0 && !(temp.length == 2 && enemies[i].health == 100)) {
				nearbyTails.push(temp);
			}
		}

		//if no enemy tails, check to follow my tail
		if(nearbyTails.length == 0) {

			console.log("uh oh! no enemy tails to chase!");

			//if no options, just avoid trapping myself, but cant do much else
			if(firstChoice.length == 0) {
				console.log("my tail isnt available either! :(");
				lastStand(mySnake, enemies, board, decision);

			//if i can reach my tail, aStar to it
			} else {
				console.log("defaulting back to my tail")
				chooseDirection(mySnake, firstChoice[1], decision, 2000);
			}
		//A* to best enemy tail 
		} else {

			console.log("theres a tail!");
			
			nearbyTails.sort(function(a, b) {
				return a[a.length-1].f - b[b.length-1].f;
			});

			//decreases value of each route based on weight vs other routes
			var deincrement = 2000;
			for(var i = 0; i < nearbyTails.length; i++) {
				chooseDirection(mySnake, nearbyTails[i][1], decision, deincrement);
				deincrement = deincrement*(1/3);
			}
		}
	}
	return;
}