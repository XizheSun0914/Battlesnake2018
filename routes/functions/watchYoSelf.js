var contains = require('./contains.js')

//makes sure we aren't going backward onto ourself
//unless its our tail and we didnt just eat, cause itll move
//and not to hit enemy snakes that are larger than us
module.exports = exports = function(mySnake, enemies, decision) {
	if(contains(mySnake.body, mySnake.body[0].x, mySnake.body[0].y-1) && !((mySnake.body[mySnake.body.length-1].x == mySnake.body[0].x && mySnake.body[mySnake.body.length-1].y == mySnake.body[0].y-1) && mySnake.health != 100)) {
		decision.up -= 99999;
	}
	if(contains(mySnake.body, mySnake.body[0].x, mySnake.body[0].y+1) && !((mySnake.body[mySnake.body.length-1].x == mySnake.body[0].x && mySnake.body[mySnake.body.length-1].y == mySnake.body[0].y+1) && mySnake.health != 100)) {
		decision.down -= 99999;
	}
	if(contains(mySnake.body, mySnake.body[0].x-1, mySnake.body[0].y) && !((mySnake.body[mySnake.body.length-1].x == mySnake.body[0].x-1 && mySnake.body[mySnake.body.length-1].y == mySnake.body[0].y) && mySnake.health != 100)) {
		decision.left -= 99999;
	}
	if(contains(mySnake.body, mySnake.body[0].x+1, mySnake.body[0].y) && !((mySnake.body[mySnake.body.length-1].x == mySnake.body[0].x+1 && mySnake.body[mySnake.body.length-1].y == mySnake.body[0].y) && mySnake.health != 100)) {
		decision.right -= 99999;
	}

	var desparate = false;

	if(mySnake.health < 15) {
		desparate = true;
	}

	console.log("checkpoint 1");

	//checks if another snakes head is one away from the direction I could go
	//disallows move if there is and im smaller, unless hella hungry

	var left = []
	var right = []
	var up = []
	var down = []
	for(var k = -1; k <= 1; k++) {
		for(var j = -1; j <= 1; j++) {
			if(k != 0 && j != 0) {
				continue;
			}
			var tempL = new Point(mySnake.body[0].x-1+k, mySnake.body[0].y+j);
			var tempR = new Point(mySnake.body[0].x+1+k, mySnake.body[0].y+j);
			var tempU = new Point(mySnake.body[0].x+k, mySnake.body[0].y-1+j);
			var tempD = new Point(mySnake.body[0].x+k, mySnake.body[0].y+1+j);
			left.push(tempL);
			right.push(tempR);
			up.push(tempU);
			down.push(tempD);
		}
	}

	console.log("checkpoint 2");

	for(var i = 0; i < enemies.length; i++) {
		if(contains(left, enemies[i].body[0].x, enemies[i].body[0].y)) {
			if(mySnake.length <= enemies[i].length && !desparate) {
				decision.left -= 99999;
			}
		}
		if(contains(right, enemies[i].body[0].x, enemies[i].body[0].y)) {
			if(mySnake.length <= enemies[i].length && !desparate) {
				decision.right -= 99999;
			}
		}
		if(contains(up, enemies[i].body[0].x, enemies[i].body[0].y)) {
			if(mySnake.length <= enemies[i].length && !desparate) {
				decision.up -= 99999;
			}
		}
		if(contains(down, enemies[i].body[0].x, enemies[i].body[0].y)) {
			if(mySnake.length <= enemies[i].length && !desparate) {
				decision.down -= 99999;
			}
		}
	}
	console.log("checkpoint 3");
	console.log("left: " + decision.left);
	console.log("right: " + decision.right);
	console.log("down: " + decision.down);
	console.log("up: " + decision.up);
	return;
}