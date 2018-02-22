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