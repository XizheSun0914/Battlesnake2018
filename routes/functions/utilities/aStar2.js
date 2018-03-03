var buildGrid = require('./buildGrid.js')
var contains = require('./contains.js')

module.exports = exports = function (board, mySnake, enemies, food) {
	var closedList = [];
	var openList = [];

	var grid = buildGrid(mySnake, board, enemies);

	for(var i = 0; i < grid.length; i++) {
		for(var j = 0; j < grid[0].length; j++) {
			if(grid[i][j] != 0){
				console.log("not empty at: " + i + " " + j);
			}
		}
	}
	
	var first = new aNode(mySnake.body[0].x, mySnake.body[0].y, -1, null, food, enemies, mySnake);
	openList.push(first);

	//------------------------------

	while(openList.length != 0) {

		openList.sort(function(a,b) {	//sort openList based on total cost
			return a.f - b.f;
		});

		var q = openList.shift();
		closedList.push(q);

		//if at destination, build route and finish
		if(q.x == food.x && q.y == food.y) {
			return finishRoute(q, first);
		}

		var successors = [];

		//create successors
		for(var i = -1; i <= 1; i++) {
			for(var j = -1; j <= 1; j++) {
				//if we cant reach, skip. unless its our goal (say we're chasing an enemy tail or my tail)
				if((i==0 && j==0) || (i != 0 && j != 0) || (!isValid(q.x+i, q.y+j, enemies, mySnake, board) && !(q.x+i == food.x && q.y+j == food.y))) {
					continue;
				} else {
					var successor = new aNode(q.x+i, q.y+j, q.f, q, food, enemies, mySnake);
					successors.push(successor);
				}
			}
		}

		for(var i = 0; i < successors.length; i++) {
			//if on closedList, ignore
			if(contains(closedList, successors[i].x, successors[i].y)) {
				continue;
			}

			//if not in openList, add it
			if(!contains(openList, successors[i].x, successors[i].y)) {
				openList.push(successors[i]);
				continue;
			}

			//if openList has same nodes cheaper than successor[i]: continue, else: push to openList
			if(contains(openList, successors[i].x, successors[i].y)) {
				var check = false;
				for(var j = 0; j < openList.length; j++) {
					if(openList[j].x == successors[i].x && openList[j].y == successors[i].y && openList[j].f < successors[i].f) {
						check = true;
					}
				}
				if(check) {
					continue;
				} else {
					openList.push(successors[i]);
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
function isValid(x, y, enemies, mySnake, board) {
	if(contains(mySnake.body, x, y)) {
		return false;
	}
	for(var i = 0; i < enemies.length; i++) {
		if(contains(enemies[i].body, x, y)) {
			return false;
		}
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

function aNode(x, y, g, parent, dest, enemies, mySnake) {
	this.x = x;
	this.y = y;
	this.g = g + 1.0;
	this.h = calc_h(this.x, this.y, dest) + checkSurround(x, y, enemies, mySnake);
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
var checkSurround = function (x, y, enemies, mySnake) {
	var price = 0;

	//if early game, dont worry about enemies
	var check = true;
	for(var i = 0; i < enemies.length; i++) {
		if(enemies[i].length < 7) {
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
			if(contains(mySnake.body, x+i, y+j)) {
				price++;
			}
			for(var k = 0; k < enemies.length; k++) {
				if(contains(enemies[k].body, x+i, y+j)) {
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