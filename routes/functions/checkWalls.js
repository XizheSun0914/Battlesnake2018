var contains = require('./contains.js')

//This fella makes sure we aren't running into any walls based on our decisions!
//tries to not get up in other functions grills, only redirects if absolutely necessary

module.exports = exports = function (mySnake, board, decision)  {
	//top left corner
	if(mySnake.body[0].x == 0 && mySnake.body[0].y == 0){
		if(contains(mySnake.body, 1, 0)) {
			decision.down += 99999;
		} else {
			decision.right += 99999;
		}
	}
	//bottom left corner
	if(mySnake.body[0].x == 0 && mySnake.body[0].y == board.height) {
		if(contains(mySnake.body, 0, board.height-1)) {
			decision.right += 99999;
		} else {
			decision.up += 99999;
		}
	}
	//top right corner
	if(mySnake.body[0].x == board.width && mySnake.body[0].y == 0) {
		if(contains(mySnake.body, board.width-1, 0)) {
			decision.down += 99999;
		} else {
			decision.left += 99999;
		}
	}
	//bottom right corner
	if(mySnake.body[0].x == board.width && mySnake.body[0].y == board.height) {
		if(contains(mySnake.body, board.width, board.height-1)) {
			decision.left += 99999;
		} else {
			decision.up += 99999;
		}
	}

	//left side
	if(mySnake.body[0].x == -1) {
		decision.left -= 99999;
	}
	// right side
	if(mySnake.body[0].x == board.width+1) {
		decision.right -= 99999;
	}
	// top
	if(mySnake.body[0].y == -1) {
		decision.up -= 99999;
	}
	//bottom
	if(mySnake.body[0].y == board.height+1) {
		decision.down -= 99999;
	}
	return;
}