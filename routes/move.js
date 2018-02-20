var checkWalls = require('./checkWalls.js')

module.exports = exports = function (mySnake, enemies, board) {
	var decision = 'up'; //default move

	decision = findFood(mySnake, enemies, board);

	if(mySnake.body[0].x == 0 || mySnake.body[0].x == board.width || mySnake.body[0].y == 0 || mySnake.body[0].y == board.height){
		decision = checkWalls(mySnake, board, decision);
	}
	//returns 'left', 'right', 'up', 'down'
	return decision;
}

var findFood = function(mySnake, enemies, board) {
	//change to BFS later
	var food = board.food;
	console.log("pre sort: " + food[0].x + " " food[0].y + food[1].x + " " food[1].y + " " + food[2].x + " " food[2].y + " ");
	food.sort(function(a,b) {
		return (Math.abs(a.x - b.x) + Math.abs(a.y - b.y));
	});
	console.log("post-sort: " + food[0].x + " " food[0].y + " " + food[1].x + " " food[1].y + " " + food[2].x + " " food[2].y + " ");
	return 'down';
}

var keepAlive = function(mySnake, enemies, board) {
	return 'down';
}

var contains = function (list, x, y) {
	for(var i = 0; i < list.length; i++) {
		if(list[i].x == x && list[i].y == y) {
			return true;
		}
	}
	return false;
}