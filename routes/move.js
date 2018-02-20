var checkWalls = require('./checkWalls.js')

module.exports = exports = function (mySnake, enemies, board) {
	var decision = {
		right: 0,
		left: 0,
		up: 0,
		down: 0,
		move: function() {
			if(Math.max(this.right, this.left, this.up, this.down) == this.right) {
				return 'right';
			} else if(Math.max(this.right, this.left, this.up, this.down) == this.left) {
				return 'left';
			} else if(Math.max(this.right, this.left, this.up, this.down) == this.up) {
				return 'up';
			} else {
				return 'down';
			}
		}
	};

	findFood(mySnake, enemies, board, decision);
	console.log(decision);
	watchYoSelf(mySnake, decision);
	console.log(decision);
	checkWalls(mySnake, board, decision.move, decision);
	console.log(decision);
	//returns 'left', 'right', 'up', 'down'
	return decision.move;
}

var findFood = function(mySnake, enemies, board, decision) {
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

var keepAlive = function(mySnake, enemies, board, decision) {
	return;
}

var watchYoSelf = function(mySnake, decision) {
	if(contains(mySnake.body, mySnake.body[0].x, mySnake.body[0].y-1)) {
		decision.up -= 99999;
	}
	if(contains(mySnake.body, mySnake.body[0].x, mySnake.body[0].y+1)) {
		decision.down -= 99999;
	}
	if(contains(mySnake.body, mySnake.body[0].x-1, mySnake.body[0].y)) {
		decision.left -= 99999;
	}
	if(contains(mySnake.body, mySnake.body[0].x+1, mySnake.body[0].y)) {
		decision.right -= 99999;
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