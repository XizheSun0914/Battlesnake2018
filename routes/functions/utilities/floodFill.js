var contains = require('./contains.js')
var buildGrid = require('./buildGrid.js')

//performs floodfill, returning a list of open spaces in the constrained area

module.exports = exports = function (mySnake, enemies, board) {
	var openSpaces = [];

	var grid = buildGrid(mySnake, board, enemies);

	//start floodfill at head
	fill(mySnake, grid, openSpaces, board);

	//returns list of all coordinates in reach
	return openSpaces;

}

var fill = function(mySnake, grid, openSpaces, board) {
	if(openSpaces.length > board.height*board.width/3) {
		return;
	}
	var queue = [];
	var head = new Point(mySnake.body[0].x, mySnake.body[0].y);
	queue.push(head);

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
	return;
}

function Point(x, y) {
	this.x = x;
	this.y = y;
}