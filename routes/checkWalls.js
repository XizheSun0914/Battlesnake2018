
module.exports = exports = function (mySnake, board, original)  {
	//top left corner
	if(mySnake.body[0].x == 0 && mySnake.body[0].y == 0){
		console.log("top left!");
		if(contains(mySnake.body, 1, 0)) {
			return 'down';
		} else {
			return 'right';
		}
	}
	//bottom left corner
	if(mySnake.body[0].x == 0 && mySnake.body[0].y == board.height) {
		console.log("bottom left!");
		if(contains(mySnake.body, 0, board.height-1)) {
			return 'right';
		} else {
			return 'up';
		}
	}
	//top right corner
	if(mySnake.body[0].x == board.width && mySnake.body[0].y == 0) {
		console.log("top right!");
		if(contains(mySnake.body, board.width-1, 0)) {
			return 'down';
		} else {
			return 'left';
		}
	}
	//bottom right corner
	if(mySnake.body[0].x == board.width && mySnake.body[0].y == board.height) {
		console.log("bottom right!");
		if(contains(mySnake.body, board.width, board.height-1)) {
			return 'left';
		} else {
			return "up";
		}
	}

	//left side
	if(mySnake.body[0].x == 0) {
		console.log("left side!");
		// if |<--
		if(contains(mySnake.body, 1, mySnake.body[0].y)) {
			if(contains(mySnake.body, 0, mySnake.body[0].y+1)){
				return 'up';
			} else {
				return 'down';
			}
		}

		if(original === 'left') {
			return 'right';				//Change later to more dynamic decision
		} else {
			return original;
		}

	}
	// right side
	if(mySnake.body[0].x == board.width) {
		console.log("right side!");
		// -->|
		if(contains(mySnake.body, board.width-1, mySnake.body[0].y)) {
			if(contains(mySnake.body, board.width, mySnake.body[0].y+1)){
				return 'up';
			} else {
				return 'down';
			}
		}
		
		if(original === 'right') {
			return 'left';				//Change later to more dynamic decision
		} else {
			return original;
		}

	}
	// top
	if(mySnake.body[0].y == 0) {
		console.log("at top!");
		// ^
		if(contains(mySnake.body, mySnake.body[0].x, 1)) {
			if(contains(mySnake.body, mySnake.body[0].x-1, 0)) {
				return 'right';
			} else {
				return 'left';
			}
		}

		if(original === 'up') {
			return 'down';				//Change later to more dynamic decision
		} else {
			return original;
		}
	}
	//bottom
	if(mySnake.body[0].y == board.height) {
		console.log("at bottom!");
		// v
		if(contains(mySnake.body, mySnake.body[0].x, board.height-1)) {
			if(contains(mySnake.body, mySnake.body[0].x-1, board.height)) {
				return 'right';
			} else {
				return 'left';
			}
		}

		if(original === 'down') {
			return 'up';				//Change later to more dynamic decision
		} else {
			return original;
		}

	}

	return original;
}

var contains = function (list, x, y) {
	for(var i = 0; i < list.length; i++) {
		if(list[i].x == x && list[i].y == y) {
			return true;
		}
	}
	return false;
} 