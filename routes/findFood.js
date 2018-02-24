var aStar = require('functions/aStar.js')

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
		console.log(routes[i][1].x + " " + routes[i][1].y);
		console.log(food[i]);
		console.log();
	}

	//sorts based on cost of each route
	routes.sort(function(a, b) {
		return a[a.length-1].f - b[b.length-1].f;
	});

	var topRoute = routes.shift();
	console.log(topRoute[1].x + " " + topRoute[1].y);

	//----------------------------------------------------

	//IMPLEMENT A CHECK TO SEE IF THE NEXT COUPLE MOVES WOULD GET ME TRAPPED ( mySnake.length*(2/3) > area)
	// -> flood fill past the point to check area

	//IF SO: check the other routes available and see if they work better.

	//IF NONE WORK: return with all decision values at 0 (maybe make it A* to tail)

	//----------------------------------------------------

	//picks the drection of the first move on the best route

	if(topRoute[1].x > mySnake.body[0].x) {
		decision.right += 2000;
	}
	if(topRoute[1].x < mySnake.body[0].x) {
		decision.left += 2000;
	}
	if(topRoute[1].y > mySnake.body[0].y) {
		decision.down += 2000;
	}
	if(topRoute[1].y < mySnake.body[0].y) {
		decision.up += 2000;
	}

	return;

}