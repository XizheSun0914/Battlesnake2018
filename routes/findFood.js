var aStar = require('./aStar.js')

module.exports = exports = function(mySnake, enemies, board, decision) {
	
	var food = board.food;
	var routes = [];

	for(var i = 0; i < food.length; i++) {
		var temp = aStar(board, mySnake, enemies, food[i]);
		if(temp.length > 0) {
			routes.push(temp);
		}
	}

	routes.sort(function(a, b) {
		return a[a.length-1].f - b[b.length-1].f;
	});

	for(var j = 0; j < routes.length; j++){
		console.log(routes[j][routes[j].length-1].f);
		console.log(routes[j][0].x + " " + routes[j][0].y + routes[j][1].x + routes[j][1].y);
		console.log();

	}

	if(routes[0][1].x > mySnake.body[0].x) {
		decision.right += 2000;
	}
	if(routes[0][1].x < mySnake.body[0].x) {
		decision.left += 2000;
	}
	if(routes[0][1].y > mySnake.body[0].y) {
		decision.down += 2000;
	}
	if(routes[0][1].y < mySnake.body[0].y) {
		decision.up += 2000;
	}

	console.print(decision.move());

	return;
	

}

/*

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
	*/
