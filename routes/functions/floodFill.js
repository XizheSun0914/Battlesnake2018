var contains = require('./contains.js')

//performs floodfill, returning a list of open spaces in the constrained area
//cuts out early if takes up more than 1/3 of board for performance reasons

module.exports = exports = function (mySnake, enemies, board) {
	var openSpaces = [];

	//should move this to its own function, and use grid globally so we never reuse
	//------------------
	var grid = new Array(board.width+1);
	for (var i = 0; i < grid.length; i++) {
	   grid[i] = new Array(board.height+1);
	}

	for(var i = 0; i < grid.length; i++) {
		for(var k = 0; k < grid[0].length; k++) {
			grid[i][k] = 0;
		}
	}

	for(var i = 0; i < grid.length; i++) {
		for(var j = 0; j < grid[0].length; j++) {
			if(contains(mySnake.body, i, j)) {
				grid[i][j] = 1;
			}
			for(var k = 0; k < enemies.length; k++) {
				if(contains(enemies[k].body, i, j)) {
					grid[i][j] = 2;
				}
			}
		}
	}
	console.log(grid);
	//-------------------

	//start floodfill at head
	fill(mySnake, grid, openSpaces, board);

	console.log(openSpaces);

	//returns list of all coordinates in reach
	return openSpaces;

}

var fill = function(mySnake, grid, openSpaces, board) {
	var queue = [];
	var head = new Point(mySnake.body[0].x, mySnake.body[0].y);
	queue.push(head);
	console.log("checkpoint 2");

	while (queue.length > 0) {
		var temp = queue.shift();
		var x = temp.x;
		var y = temp.y;
		
		if((grid[x][y]) == 0 || (x == mySnake.body[0].x && y == mySnake.body[0].y && grid[x][y] == 1)) {
			openSpaces.push(temp);
			grid[x][y] = 3;

			if(x > 0) {
				var left = new Point((x-1), y);
				queue.push(left);
			}

			if(x < board.width) {
				var right = new Point((x+1), y);
				queue.push(right);
			}

			if(y > 0) {
				var up = new Point(x, (y-1));
				queue.push(up);
			}

			if(y < board.height) {
				var down = new Point(x, (y+1));
				queue.push(down);
			}
		}
	}

	console.log("not openSpace: ");
	for(var k = 0; k < board.width; k++) {
		for(var n = 0; n < board.height; n++) {
			if(grid[k][n] != 3) {
				console.log(k + " " + n);
			}
		}
	}
	console.log(grid);
	return;
}

function Point(x, y) {
	this.x = x;
	this.y = y;
}


//move with grid function
function CreateArray(rows) {
  var arr = [];

  for (var i=0;i<rows;i++) {
     arr[i] = [];
  }

  return arr;
}