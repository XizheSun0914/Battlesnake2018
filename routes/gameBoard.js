
//Creates an array for the gameBoard to specify items on it

module.exports = exports = function (board, mySnake, enemies) {
	var arr = [];

	// Empty space = 0 on the board
	// Walls = 6
	for(var i = 0; i < (board.height+2); i++) {
		arr.push([]);
		arr[i].push( new Array(board.width+2));

		for(var j = 0; j < (board.width+2); j++){
			if(j == board.width+1 || i == 0 || j == 0 || i == board.height+1){
				arr[i][j] = 6;
			} else {
				arr[i][j] = 0;
			}
		}
	}

	// Food = 1 on the board
	for(var i = 0; i < board.food.length; i++) {
		arr[board.food[i].y+1][board.food[i].x+1] = 1;
	}

	// Enemy body parts 
	for(var i = 0; i < enemies.length; i++){
		for(var j = enemies[i].body.length-1; j >= 0; j--) {
			if(j==0) {
				// head = 3
				arr[enemies[i].body[j].y+1][enemies[i].body[j].x+1] = 3;
			} else {
				// body = 2
				arr[enemies[i].body[j].y+1][enemies[i].body[j].x+1] = 2;
			}
		}
	}

	// friendly body parts = 4, head = 5
	for(var i = mySnake.body.length-1; i >= 0; i--) {
		if(i==0) {
			arr[mySnake.body[i].y+1][mySnake.body[i].x+1] = 5;
		} else {
			arr[mySnake.body[i].y+1][mySnake.body[i].x+1] = 4;
		}
	}


	return arr;
}