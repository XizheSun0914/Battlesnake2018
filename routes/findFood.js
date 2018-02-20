var contains = require('./contains.js')

module.exports = exports = function(mySnake, enemies, board, decision) {
	//change to BFS later
	var food = board.food;
	food.sort(function(a,b) {
		return (Math.abs(mySnake.body[0].x - a.x) + Math.abs(mySnake.body[0].y - a.y) - (Math.abs(mySnake.body[0].x - b.x) + Math.abs(mySnake.body[0].y - b.y)));
	});

	if(Math.abs(mySnake.body[0].x - food[0].x) > Math.abs(mySnake.body[0].y - food[0].y)) {
		//if x val further choose direction (high priority)
		//then an y direction at a lower priority
		if(mySnake.body[0].x - food[0].x > 0) {
			decision.left += 100;
			if(mySnake.body[0].y - food[0].y > 0) {
				decision.up += 50;
			} else {
				decision.down += 50;
			}
		} else if(mySnake.body[0].x - food[0].x == 0) {
			if(mySnake.body[0].y - food[0].y > 0) {
				decision.up += 100;
			} else {
				decision.down += 100;
			}
		} else {
			decision.right += 100;
			if(mySnake.body[0].y - food[0].y > 0) {
				decision.up += 50;
			} else {
				decision.down += 50;
			}
		}
	} else {
		//if y val further choose y direction (high priority)
		//then an x direction at a lower priority
		if(mySnake.body[0].y - food[0].y > 0) {
			decision.up += 100;
			if(mySnake.body[0].x - food[0].x > 0) {
				decision.left += 50;
			} else {
				decision.right += 50;
			}
		} else if(mySnake.body[0].y - food[0].y == 0) {
			if(mySnake.body[0].x - food[0].x > 0) {
				decision.left += 100;
			} else {
				decision.right += 100;
			}
		} else {
			decision.down += 100;
			if(mySnake.body[0].x - food[0].x > 0) {
				decision.left += 50;
			} else {
				decision.right += 50;
			}
		}
	}
	return;
}

var contains = function (list, x, y) {
	for(var i = 0; i < list.length; i++) {
		if(list[i].x == x && list[i].y == y) {
			return true;
		}
	}
	return false;
}