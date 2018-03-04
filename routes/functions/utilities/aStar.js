//adjust early game values
//just need to tweak values in checkSurround if it isn't getting the right results
var buildGrid = require('./buildGrid.js')
var contains = require('./contains.js')

module.exports = exports = function (board, mySnake, enemies, food) {
	var closedList = [];
	var openList = [];

	var grid = buildGrid(mySnake, board, enemies);
	var openGrid = buildGrid(mySnake, board, enemies);

	var first = new aNode(mySnake.body[0].x, mySnake.body[0].y, -1, null, food, enemies, mySnake);
	openList.push(first);


	while(openList.length != 0) {

		var q = openList.shift();
		openGrid[q.x][q.y] = 0;
		closedList.push(q);
		grid[q.x][q.y] = 3;

		//if at destination, build route and finish
		if(q.x == food.x && q.y == food.y) {
			return finishRoute(q, first);
		}

		var successors = [];

		//create successors
		for(var i = -1; i <= 1; i++) {
			for(var j = -1; j <= 1; j++) {
				var xCoord = (q.x+i);
				var yCoord = (q.y+j);

				//if we cant reach, skip. unless its our goal (say we're chasing an enemy tail or my tail)
				if(i==0 && j==0) {
					continue;
				}
				if(i != 0 && j != 0) {
					continue;
				}
				if(!isValid(xCoord, yCoord, enemies, mySnake, board, grid) && !(xCoord == food.x && yCoord == food.y)){
					continue;
				}
				var successor = new aNode(xCoord, yCoord, q.f, q, food, enemies, mySnake);
				successors.push(successor);
			}
		}

		for(var i = 0; i < successors.length; i++) {
			//if on closedList, ignore

			if(grid[successors[i].x][successors[i].y] == 3) {
				continue;
			}

			//if not in openList, add it
			if(openGrid[successors[i].x][successors[i].y] != 4) {
				openGrid[successors[i].x][successors[i].y] == 4;
				addToList(openList, successors[i]);
				continue;
			}

			//if openList has same nodes cheaper than successor[i]: continue, else: push to openList
			if(openGrid[successors[i].x][successors[i].y] == 4) {
				var check = false;
				var spot = 0;

				for(var j = 0; j < openList.length; j++) {
					if(openList[j].x == successors[i].x && openList[j].y == successors[i].y) {
						if(openList[j].f < successors[i].f) {
							check = true;
						} else {
							spot = j;
						}
					}
				}
				if(check) {
					continue;
				} else {
					openList.splice(spot, 1);
					addToList(openList, successors[i]);
					openGrid[successors[i].x][successors[i].y] == 4;
				}
			}
		}
	}
	var sadness = [];	//return empty list if search failed
	return sadness;
}

//--------------------------------------------------

//checks if node is already covered by enemy or 
//friendly snake or if outside board
function isValid(x, y, enemies, mySnake, board, grid) {
	if (!(x <= board.width && x >= 0 && y <= board.height && y >= 0)) {
		return false;
	}
	if(grid[x][y] == 1) {
		return false;
	}
	if(grid[x][y] == 2) {
		return false;
	}
	return true;
}

//creates h based on cost to start and to finish from node along with dangers surrounding
function calc_h(x, y, dest) {
	return (Math.abs(x - dest.x) + Math.abs(y - dest.y));
}

function aNode(x, y, g, parent, dest, enemies, mySnake) {
	this.x = x;
	this.y = y;
	this.g = g + 1.0;
	this.h = calc_h(this.x, this.y, dest);
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

var addToList = function(list, item) {
	for(var i = 0; i < list.length; i++) {
		if(list[i].f > item.f) {
			list.splice(i, 0, item);
			return;
		}
	}
	list.push(item);
	return;
}
