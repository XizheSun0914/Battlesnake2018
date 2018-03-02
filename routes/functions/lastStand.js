//discourages my snake from going into a space that has no next move
//if there is a tail there, we (hopefully) shouldnt be in this function
//MAKE SURE THIS WORKS

module.exports = exports = function(mySnake, enemies, board, decision) {
	var right = new NextPoint(mySnake.body[0].x+1, mySnake.body[0].y);
	var left = new NextPoint(mySnake.body[0].x-1, mySnake.body[0].y);
	var up = new NextPoint(mySnake.body[0].x, mySnake.body[0].y-1);
	var down = new NextPoint(mySnake.body[0].x, mySnake.body[0].y+1);

	for(var i = -1; i <= 1; i++) {
		for(var j = -1; j <= 1; i++) {
			if((j==0 && i==0) || (j!=0 && i!=0)) {
				continue;
			} else {
				//checks for my snake surrounding
				if(contains(mySnake.body, right.x+i, right.y+j)) {
					right.surround += 1;
				}
				if(contains(mySnake.body, left.x+i, left.y+j)) {
					left.surround += 1;
				}
				if(contains(mySnake.body, up.x+i, up.y+j)) {
					up.surround += 1;
				}
				if(contains(mySnake.body, down.x+i, down.y+j)) {
					down.surround += 1;
				}

				//checks for enemies surrounding
				for(var k = 0; k < enemies.length; k++) {
					if(contains(enemies[i].body, right.x+i, right.y+j)) {
						right.surround += 1;
					}
					if(contains(enemies[i].body, left.x+i, left.y+j)) {
						left.surround += 1;
					}
					if(contains(enemies[i].body, up.x+i, up.y+j)) {
						up.surround += 1;
					}
					if(contains(enemies[i].body, down.x+i, down.y+j)) {
						down.surround += 1;
					}
				}

				//checks for walls surrounding
				if(right.x+i > board.width || right.x+i < 0 || right.y+j > board.height || right.y+j < 0) {
					right.surround += 1;
				}
				if(left.x+i > board.width || left.x+i < 0 || left.y+j > board.height || left.y+j < 0) {
					left.surround += 1;
				}
				if(up.x+i > board.width || up.x+i < 0 || up.y+j > board.height || up.y+j < 0) {
					up.surround += 1;
				}
				if(down.x+i > board.width || down.x+i < 0 || down.y+j > board.height || down.y+j < 0) {
					down.surround += 1;
				}
			}
		}
	}

	if(left.surround > 4) {
		decision.left -= 99999;
	}
	if(right.surround > 4) {
		decision.right -= 99999;
	}
	if(up.surround > 4) {
		decision.up -= 99999;
	}
	if(down.surround > 4) {
		decision.down -= 99999;
	}
}

function NextPoint(x, y) {
	this.x = x;
	this.y = y;
	this.surround = 0;
}