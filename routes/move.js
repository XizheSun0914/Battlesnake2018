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
	var topFoods = board.food.sort(function(a,b){return Math.abs(board.food[a].x - board.food[b].x) + Math.abs(board.food[a].y - board.food[b].y)});
	console.log(topFoods);
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