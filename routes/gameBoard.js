
//Creates an array for the gameBoard to specify items on it

module.exports = exports = function (board, mySnake, enemies) {
	var arr = [];

	// Empty space = 0 on the board
	// Walls = 5
	for(var i = 0; i < (board.width+1); i++) {
		arr.push([]);
		arr[i].push( new Array(board.height+1));

		for(var j = 0; j < (board.height+1); j++){
			if(i == board.width || i == 0 || j == 0 || j == board.height){
				arr[i][j] = 5;
			} else {
				arr[i][j] = 0;
			}
		}
	}

	// Food = 1 on the board
	for(var i = 0; i < board.food.length; i++) {
		arr[board.food[i].x][board.food[i].y] = 1;
	}

	// Enemy body parts 
	for(var i = 0; i < enemies.length; i++){
		for(var j = 0; j < enemies[i].body.length; j++) {
			if(j==0) {
				// head = 3
				arr[enemies[i].body[j].x][enemies[i].body[j].y] = 3;
			} else {
				// body = 2
				arr[enemies[i].body[j].x][enemies[i].body[j].y] = 2;
			}
		}
	}

	// friendly body parts = 4;
	for(var i = 0; i < mySnake.body.length; i++) {
		arr[mySnake.body[i].x][mySnake.body[i].y] = 4;
	}


	return arr;
}