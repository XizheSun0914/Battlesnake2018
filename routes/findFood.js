var aStar = require('./functions/aStar.js')
var floodFill = require('./floodFill.js')
var contains = require('./functions/contains.js')

//uses A* algorithm to find good routes to food. Looks at best route to each peice of food
// and decides which is the best based cost of route (lowest cost of destination.f)

module.exports = exports = function(mySnake, enemies, board, decision) {
	
	var food = board.food;
	var routes = [];

	for(var i = 0; i < food.length; i++) {
		var temp = aStar(board, mySnake, enemies, food[i]);
		// if there is no route to the food, ignore
		if(temp.length > 0) {
			routes.push(temp);
		}
	}

	console.log(routes.length);
	for(var i = 0; i < routes.length; i++) {
		console.log("weight: " + routes[i][routes[i].length-1].f);
		console.log("first move: " + routes[i][1].x + " " + routes[i][1].y);
		console.log("dest: " + food[i].x + " " + food[i].y);
		console.log();
	}

	//sorts based on cost of each route
	routes.sort(function(a, b) {
		return a[a.length-1].f - b[b.length-1].f;
	});

	//checks before returning if there is enough room for the move.
	//makes a variable (temp) equal mySnake and push the direction we want to go onto the head
	//rotates through all options until success or failure

	for(var a = 0; a < routes.length; a++) {

		var topRoute = routes.shift();

		var temp = mySnake;
		temp.body.unshift(topRoute[1]);

		var space = floodFill(temp, enemies, board);

		//if theres more than enough space to fit go for it or if absolutely desparate for food
		if(space.length*(3/4) > mySnake.length || (space.length > mySnake.length && mySnake.health < 15)) {

			console.log("direction: " + temp.body[0].x + " " + temp.body[0].y + " passed floodfill criteria");
			console.log("my head is: " + temp.body[1].x + " " + temp.body[1].y);

			if(temp.body[0].x > temp.body[1].x) {
				decision.right += 2000;
			}
			if(temp.body[0].x < temp.body[1].x) {
				decision.left += 2000;
			}
			if(temp.body[0].y > temp.body[1].y) {
				decision.down += 2000;
			}
			if(temp.body[0].y < temp.body[1].y) {
				decision.up += 2000;
			}
			return;
		}
		console.log("direction: " + topRoute[1].x + " " + topRoute[1].y + " failed floodfill criteria");
	}

	//returns decision with no new direction values if all food options fail
	return;
}