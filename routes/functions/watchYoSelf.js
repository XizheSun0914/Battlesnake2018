//WORRKKKKKSSSSSS!!!!! , make it so you can chase tails though! and maybe change low health based on board size

var contains = require('./contains.js')

//makes sure we aren't going backward onto ourself
//unless its our tail and we didnt just eat, cause itll move
//and not to hit enemy snakes that are larger than us
module.exports = exports = function(mySnake, enemies, decision) {
	if(contains(mySnake.body, mySnake.body[0].x, mySnake.body[0].y-1) && !((mySnake.body[mySnake.body.length-1].x == mySnake.body[0].x && mySnake.body[mySnake.body.length-1].y == mySnake.body[0].y-1) && mySnake.health != 100)) {
		console.log("my body is above and its not my tail at < 100 health");
		decision.up -= 99999;
	}
	if(contains(mySnake.body, mySnake.body[0].x, mySnake.body[0].y+1) && !((mySnake.body[mySnake.body.length-1].x == mySnake.body[0].x && mySnake.body[mySnake.body.length-1].y == mySnake.body[0].y+1) && mySnake.health != 100)) {
		console.log("my body is below and its not my tail at < 100 health");
		decision.down -= 99999;
	}
	if(contains(mySnake.body, mySnake.body[0].x-1, mySnake.body[0].y) && !((mySnake.body[mySnake.body.length-1].x == mySnake.body[0].x-1 && mySnake.body[mySnake.body.length-1].y == mySnake.body[0].y) && mySnake.health != 100)) {
		console.log("my body is left and its not my tail at < 100 health");
		decision.left -= 99999;
	}
	if(contains(mySnake.body, mySnake.body[0].x+1, mySnake.body[0].y) && !((mySnake.body[mySnake.body.length-1].x == mySnake.body[0].x+1 && mySnake.body[mySnake.body.length-1].y == mySnake.body[0].y) && mySnake.health != 100)) {
		console.log("my body is right and its not my tail at < 100 health");
		decision.right -= 99999;
	}

	var desparate = false;

	if(mySnake.health < 15) {
		console.log("health below 15");
		desparate = true;
	}

	//checks if another snakes head is one away from the direction I could go
	//disallows move if there is enemy head and im smaller, unless hella hungry

	var left = []
	var right = []
	var up = []
	var down = []
	for(var k = -1; k <= 1; k++) {
		for(var j = -1; j <= 1; j++) {
			if(k != 0 && j != 0) {
				continue;
			}
			var tempL = new Point(mySnake.body[0].x-(1+k), mySnake.body[0].y+j);
			var tempR = new Point(mySnake.body[0].x+(1+k), mySnake.body[0].y+j);
			var tempU = new Point(mySnake.body[0].x+k, mySnake.body[0].y-(1+j));
			var tempD = new Point(mySnake.body[0].x+k, mySnake.body[0].y+(1+j));
			left.push(tempL);
			right.push(tempR);
			up.push(tempU);
			down.push(tempD);
		}
	}

	for(var i = 0; i < enemies.length; i++) {
		console.log("enemy head: " + enemies[i].body[0].x + " " + enemies[i].body[0].y);
		if(contains(left, enemies[i].body[0].x, enemies[i].body[0].y)) {
			console.log("enemy head near left");
			if(mySnake.length <= enemies[i].length && !desparate) {
				console.log("enemy head near left is bigger and im not desparate");
				decision.left -= 99999;
			}
		}
		if(contains(right, enemies[i].body[0].x, enemies[i].body[0].y)) {
			console.log("enemy head near right");
			if(mySnake.length <= enemies[i].length && !desparate) {
				console.log("enemy head near right is bigger and im not desparate");
				decision.right -= 99999;
			}
		}
		if(contains(up, enemies[i].body[0].x, enemies[i].body[0].y)) {
			console.log("enemy head near up");
			if(mySnake.length <= enemies[i].length && !desparate) {
				console.log("enemy head near up is bigger and im not desparate");
				decision.up -= 99999;
			}
		}
		if(contains(down, enemies[i].body[0].x, enemies[i].body[0].y)) {
			console.log("enemy head near down");
			if(mySnake.length <= enemies[i].length && !desparate) {
				console.log("enemy head near down is bigger and im not desparate");
				decision.down -= 99999;
			}
		}
	}

	//checks if enemy body is there, allows to chase tails ONLY IF enemy health < 100
	for(var i = 0; i < enemies.length; i++) {
		if(contains(enemies[i].body, mySnake.body[0].x-1, mySnake.body[0].y) && !((enemies[i].body[enemies[i].body.length-1].x == mySnake.body[0].x-1 && enemies[i].body[enemies[i].body.length-1].y == mySnake.body[0].y) && enemies[i].health != 100)){
			console.log("enemy body near left is not a tail or is a tail at 100 health");
			decision.left -= 99999;
		}
		if(contains(enemies[i].body, mySnake.body[0].x+1, mySnake.body[0].y) && !((enemies[i].body[enemies[i].body.length-1].x == mySnake.body[0].x+1 && enemies[i].body[enemies[i].body.length-1].y == mySnake.body[0].y) && enemies[i].health != 100)){
			console.log("enemy body near right is not a tail or is a tail at 100 health");
			decision.right -= 99999;
		}
		if(contains(enemies[i].body, mySnake.body[0].x, mySnake.body[0].y+1) && !((enemies[i].body[enemies[i].body.length-1].x == mySnake.body[0].x && enemies[i].body[enemies[i].body.length-1].y == mySnake.body[0].y+1) && enemies[i].health != 100)){
			console.log("enemy body near down is not a tail or is a tail at 100 health");
			decision.down -= 99999;
		}
		if(contains(enemies[i].body, mySnake.body[0].x, mySnake.body[0].y-1) && !((enemies[i].body[enemies[i].body.length-1].x == mySnake.body[0].x && enemies[i].body[enemies[i].body.length-1].y == mySnake.body[0].y-1) && enemies[i].health != 100)){
			console.log("enemy body near up is not a tail or is a tail at 100 health");
			decision.up -= 99999;
		}
	}

	return;
}

function Point(x, y) {
	this.x = x;
	this.y = y;
}