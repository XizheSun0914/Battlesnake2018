var checkWalls = require('./checkWalls.js')

module.exports = exports = function (mySnake, enemies, board) {
	var decision = 'up'; //default move



	if(mySnake.body[0].x == 0 || mySnake.body[0].x == board.width || mySnake.body[0].y == 0 || mySnake.body[0].y == board.height){
		decision = checkWalls(mySnake, board, decision);
	}
	//returns 'left', 'right', 'up', 'down'
	return decision;
}

var contains = function (list, x, y) {
	for(var i = 0; i < list.length; i++) {
		if(list[i].x == x && list[i].y == y) {
			return true;
		}
	}
	return false;
}