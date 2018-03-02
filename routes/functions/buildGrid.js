var contains = require('./contains.js')

module.exports = exports = function(mySnake, board, enemies) {
	
	//build grid
	var grid = new Array(board.width+1);
	for (var i = 0; i < grid.length; i++) {
	   grid[i] = new Array(board.height+1);
	}

	//fill grid with empty spaces
	for(var i = 0; i < grid.length; i++) {
		for(var k = 0; k < grid[0].length; k++) {
			grid[i][k] = 0;
		}
	}

	//place mySnake and enemies on grid
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

	return grid;

}

//helper to build 2-D array
function CreateArray(rows) {
  var arr = [];

  for (var i=0;i<rows;i++) {
     arr[i] = [];
  }

  return arr;
}