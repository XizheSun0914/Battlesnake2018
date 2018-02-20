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
	var topFoods = [];
	for(var i = 0; i < board.food.length; i++) {
		if((Math.abs(mySnake.body[0].x - board.food[i].x)/(board.width+1)) + (Math.abs(mySnake.body[0].y - board.food[i].y)/(board.height+1)) <= .6) {
			topFoods.push(board.food[i]);
		}
	}
	console.log(topFoods);
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