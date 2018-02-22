var aStar = require('./aStar.js')

module.exports = exports = function(mySnake, enemies, board, decision) {
	
	var food = board.food;
	var routes = [];

	for(var i = 0; i < food.length; i++) {
		var temp = aStar(board, mySnake, enemies, food[i]);
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

	routes.sort(function(a, b) {
		return a[a.length-1].f - b[b.length-1].f;
	});

	var topRoute = routes.shift();
	console.log(topRoute[1].x + " " + topRoute[1].y);

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