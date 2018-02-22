var checkWalls = require('./checkWalls.js')
var findFood = require('./findFood.js')
var contains = require('./contains.js')

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
	checkWalls(mySnake, board, decision);
	console.log(decision);
	//returns 'left', 'right', 'up', 'down'
	return decision.move();
}

var keepAlive = function(mySnake, enemies, board, decision) {
	//UP NEXT, ACTUALLY DODGES ENEMIES!
	return;
}

//makes sure we aren't going backward onto ourself
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