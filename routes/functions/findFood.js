var aStar = require('./aStar.js')
var floodFill = require('./floodFill.js')
var contains = require('./contains.js')

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

	//debugging, prints out list of routes
	console.log(routes.length);
	for(var i = 0; i < routes.length; i++) {
		console.log("weight: " + routes[i][routes[i].length-1].f);
		for(var j = 0; j < routes[i].length; j++) {
			console.log("move #" + j + ": " + routes[i][j].x + " " + routes[i][j].y);
		}
		console.log("dest: " + food[i].x + " " + food[i].y);
		console.log();
	}

	//sorts based on cost of each route
	routes.sort(function(a, b) {
		return a[a.length-1].f - b[b.length-1].f;
	});

	var leftRoute = new rPoint(mySnake.body[0].x-1, mySnake.body[0].y);
	var rightRoute = new rPoint(mySnake.body[0].x+1, mySnake.body[0].y);
	var upRoute = new rPoint(mySnake.body[0].x, mySnake.body[0].y-1);
	var downRoute = new rPoint(mySnake.body[0].x, mySnake.body[0].y+1);

	var counter = 1;

	while(routes.length > 0) {
		var temp = routes.shift();

		if(temp[1].x == leftRoute.x && temp[1].y == leftRoute.y) {
			leftRoute.routes.push(counter);
			counter++;
		}
		if(temp[1].x == rightRoute.x && temp[1].y == rightRoute.y) {
			rightRoute.routes.push(counter);
			counter++;
		}
		if(temp[1].x == upRoute.x && temp[1].y == upRoute.y) {
			upRoute.routes.push(counter);
			counter++;
		}
		if(temp[1].x == downRoute.x && temp[1].y == downRoute.y) {
			downRoute.routes.push(counter);
			counter++;
		}
	}

	enoughSpace(leftRoute, mySnake, enemies, board, decision);
	enoughSpace(rightRoute, mySnake, enemies, board, decision);
	enoughSpace(upRoute, mySnake, enemies, board, decision);
	enoughSpace(downRoute, mySnake, enemies, board, decision);

	return;
}

//checks before returning if there is enough room for the move.
//makes a variable (temp) equal mySnake and push the direction we want to go onto the head
//rotates through all options until success or failure
var enoughSpace = function(currentRoute, mySnake, enemies, board, decision) {
	if(currentRoute.routes.length != 0) {
		var temp = JSON.parse(JSON.stringify(mySnake));
		temp.body.unshift(currentRoute);
		temp.body.pop();

		var space = floodFill(temp, enemies, board);
		console.log("down room: " + space.length);

		if(!(space > temp.length*4)) {
			//checks if i can reach my tail after getting food, and no enemy heads coming into area
			var tailReachable = aStar(board, temp, enemies, temp.body[temp.length-1]);
			var enemiesInSpace = [];
			for(var i = 0; i < enemies.length; i++) {
				var checker = aStar(board, temp, enemies, enemies[i].body[0]);
				if(checker.length > 0) {
					enemiesInSpace.push(checker);
				}
			}

			if(space.length > mySnake.length || (tailReachable.length > 0 && space.length > 1 && enemiesInSpace.length == 0) || (space.length*(4/3) > mySnake.length && mySnake.health < 15)) {
				currentRoute.check = true;
			}
		}

		for(var k = 0; k < currentRoute.routes.length; k++) {
			decision.down += 2000*(Math.pow((1/3), currentRoute.routes[k]));
		}
	}
	if(currentRoute.check = true) {
		console.log(currentRoute.x + " " + currentRoute.y + " passed floodfill criteria");
	} else {
		console.log(currentRoute.x + " " + currentRoute.y + " failed floodfill criteria");
	}
	return;
}

function rPoint(x, y) {
	this.x;
	this.y;
	this.routes = [];
	this.check = false;
}