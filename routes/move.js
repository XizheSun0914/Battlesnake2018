//edit lowhealth and goallength based on testing
//add predatory actions

var checkWalls = require('./functions/utilities/checkWalls.js')
var findFood = require('./functions/findFood.js')
var keepAlive = require('./functions/keepAlive.js')
var watchYoSelf = require('./functions/utilities/watchYoSelf.js')

// This function is the shell for deciding the move

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

	var maxLength = enemies[0].length;
	for(var i = 1; i < enemies.length; i++) {
		if(enemies[i].length > maxLength) {
			maxLength = enemies[i].length;
		}
	}

	if(mySnake.health > 50 && mySnake.length > maxLength+1) {
		keepAlive(mySnake, enemies, board, decision);
	} else {
		findFood(mySnake, enemies, board, decision);

		//resorts to keepAlive if no routes to food
		if(decision.up == 0 && decision.down == 0 && decision.left == 0 && decision.right == 0) {
			console.log("failed to find a route to food");
			keepAlive(mySnake, enemies, board, decision);
		}
	}

	//makes sure we aren't accidentally killing ourselves
	watchYoSelf(mySnake, enemies, decision);
	checkWalls(mySnake, board, decision);

	console.log("left: " + decision.left);
	console.log("right: " + decision.right);
	console.log("down: " + decision.down);
	console.log("up: " + decision.up);

	return decision.move();
}

var headHunter = function(mySnake, enemies, board, decision) {

}