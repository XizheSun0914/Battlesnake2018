var contains = require('./contains.js')

//performs floodfill, returning a list of open spaces in the constrained area
//cuts out early if takes up more than 1/3 of board for performance reasons

module.exports = exports = function (mySnake, enemies, board) {
	var openSpaces = [];

	var grid = new Array(board.width+1);
	for (var i = 0; i < grid.length; i++) {
	   grid[i] = new Array(board.height+1);
	}

	for(var i = 0; i < grid.length; i++) {
		for(var k = 0; k < grid[0].length; k++) {
			grid[i][k] = 0;
		}
	}

	console.log(grid);

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

	//start floodfill at head
	fill(mySnake, grid, openSpaces);
	//var head = new Point(mySnake.body[0].x, mySnake.body[0].y);
	//dfs(check, openSpaces, head, board.width, board.height, enemies, mySnake);

	//returns list of all coordinates in reach
	return openSpaces;

}

var fill = function(mySnake, grid, openSpaces) {
	console.log("checkpoint 1");
	var queue = [];
	queue.push(mySnake.body[0]);
	console.log("checkpoint 2");

	while (queue.length > 0) {
		var temp = queue.shift();
		var x = temp.x;
		var y = temp.y;
		console.log("checkpoint 3");
		
		if((grid[x][y]) == 0 || (x == mySnake.body[0].x && y == mySnake.body[0].y)) {
			openSpaces.push(temp);
			console.log(x + " " + y + " is empty!");

			//I DONT FUCKING KNOW WHY THIS DOESNT WORK
			if(x > 0) {
				console.log("x can get smaller");
				var left = new Point((x-1), y);
				queue.push(left);
			}

			if(x < board.width) {
				console.log("x can get larger");
				var right = new Point((x+1), y);
				queue.push(right);
			}
			console.log("checkpoint 5");

			if(y > 0) {
				var up = new Point(x, (y-1));
				queue.push(left);
			}

			if(y < board.height) {
				var down = new Point(x, (y+1));
				queue.push(down);
			}
		}
	}
	console.log("checkpoint 6");
	return;
}

/*var dfs = function (check, openSpaces, node, boardWidth, boardHeight, enemies, mySnake, stop) {

	//makes sure that we dont exit immediately due to head being a body part
	if(!(mySnake.body[0].x == node.x && mySnake.body[0].y == node.y)) {
		check = true;
	}

	//Base cases
	if(node.x > boardWidth || node.y > boardHeight || node.x < 0 || node.y < 0) {
		return false;
	}
	if(contains(openSpaces, node.x, node.y)) {
		return false;
	}
	if(checkIfBlocked(node, enemies, mySnake) && check) { 
		return false;
	}

	//push location onto our open space list if not head
	if(check) {
		openSpaces.push(node);
	}

	//recursion
	var caseOne = new Point(node.x+1, node.y);
	var caseTwo = new Point(node.x-1, node.y);
	var caseThree = new Point(node.x, node.y+1);
	var caseFour = new Point(node.x, node.y-1);

	if(dfs(check, openSpaces, caseOne, boardWidth, boardHeight, enemies, mySnake)) {
		return true;
	}
	if(dfs(check, openSpaces, caseTwo, boardWidth, boardHeight, enemies, mySnake)) {
		return true;
	}
	if(dfs(check, openSpaces, caseThree, boardWidth, boardHeight, enemies, mySnake)) {
		return true;
	}
	if(dfs(check, openSpaces, caseFour, boardWidth, boardHeight, enemies, mySnake)) {
		return true;
	}
	return false;
}*/

function Point(x, y) {
	this.x = x;
	this.y = y;
}

function CreateArray(rows) {
  var arr = [];

  for (var i=0;i<rows;i++) {
     arr[i] = [];
  }

  return arr;
}

/*//checks if any enemies or body parts are on the spot
var checkIfBlocked = function(node, enemies, mySnake) {
	if(contains(mySnake.body, node.x, node.y)) {
		return true;
	}
	for(var i = 0; i < enemies.length; i++) {
		if(contains(enemies[i].body, node.x, node.y)) {
			return true;
		}
	}
	return false;
}*/