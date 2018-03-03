var buildGrid = require('./buildGrid.js')
var contains = require('./contains.js')

module.exports = exports = function (board, mySnake, enemies, food) {
	var closedSpace = []
	for(var i = 0; i < board.width; i++) {
		for(var j = 0; j < board.height; j++) {
			if(!isValid(i, j, board, grid)) {
				console.log(i + " " + j + "not empty here");
				var temp = new aNode(i, j, 10, null, food, enemies, mySnake, grid);
				closedSpace.push(temp);
			}
		}
	}
	console.log(closedSpace);
	return closedSpace;
}

//checks if node is already covered by enemy or 
//friendly snake or if outside board

function isValid(x, y, board, grid) {
	if(grid[x][y] == 1) {
		return false;
	}
	if(grid[x][y] == 2) {
		return false;
	}

	if (x <= board.width && x >= 0 && y <= board.height && y >= 0) {
		return true;
	} else {
		return false;
	}
}

//creates h based on cost to start and to finish from node along with dangers surrounding
function calc_h(x, y, dest) {
	return (Math.abs(x - dest.x) + Math.abs(y - dest.y));
}

function aNode(x, y, g, parent, dest, enemies, mySnake, grid) {
	this.x = x;
	this.y = y;
	this.g = g + 1.0;
	this.h = calc_h(this.x, this.y, dest) + checkSurround(x, y, enemies, mySnake, grid);
	this.parent = parent;
	this.f = this.g + this.h;
}

//retraces back the first node, building the route along the way
var finishRoute = function (node, head) {
	var route = [];
	var temp = JSON.parse(JSON.stringify(node));

	while(temp.parent != null) {
		route.unshift(temp);
		temp = temp.parent;
	}
	route.unshift(head);
	return route;
}

//changes h (cost to destination) based on the dangerous stuff on the way to the food

var checkSurround = function (x, y, enemies, mySnake, grid) {
	var price = 0;

	//if early game, dont worry about enemies
	var check = true;
	for(var i = 0; i < enemies.length; i++) {
		if(enemies[i].length > 7) {
			check = false;
		}
	}
	if(check) {
		return price;
	}

	for(var i = -1; i <= 1; i++) {
		for(var j = -1; j <= 1; j++) {
			//check if where we want to go has an ememy head beside with equal or larger length nearby
			// or for my body and other enemy snakes
			if(grid[x+i][y+j] == 1) {
				price++;
			}
			for(var k = 0; k < enemies.length; k++) {
				if(grid[x+i][y+j] == 2) {
					price += 2;
				}
				if(enemies[k].body[0].x == x+i && enemies[k].body[0].y == y+j && enemies[k].length >= mySnake.length) {
					price += 5;
				}
			}
		}
	}
	return price;
}