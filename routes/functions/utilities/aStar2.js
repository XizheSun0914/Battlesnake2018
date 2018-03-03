var buildGrid = require('./buildGrid.js')
var contains = require('./contains.js')

module.exports = exports = function (board, mySnake, enemies, food) {
	var closedList = [];
	var openList = [];
	var grid = buildGrid(mySnake, board, enemies);

	console.log(grid);

	var head = new aNode(mySnake.body[0].x, mySnake.body[0].y, -1, null, food, enemies, mySnake);
	openList.push(head);

	while(openList.length != 0) {

		//IMPORVE SPEED HERE BY ADDING TO A SORTED LIST OR HEAP
		openList.sort(function(a,b) {	//sort openList based on total cost
			return a.f - b.f;
		});

		console.log("checkpoint 1");

		var q = openList.shift();
		closedList.push(q);

		//if at destination, build route and finish
		if(q.x == food.x && q.y == food.y) {
			console.log("yeet");
			var temp = finishRoute(q, head);
			console.log(temp);
		}

		console.log("checkpoint 2");

		var successors = [];

		//create successors
		for(var i = -1; i <= 1; i++) {
			for(var j = -1; j <= 1; j++) {
				console.log("checkpoint 2.25");
				//if we cant reach, skip. unless its our goal (say we're chasing an enemy tail or my tail)
				if((i==0 && j==0) || (i != 0 && j != 0) || (!isValid(q.x+i, q.y+j, board, grid) && !(q.x+i == food.x && q.y+j == food.y))) {
					console.log("checkpoint 2.50");
					continue;
				} else {
					console.log("checkpoint 2.65");
					var successor = new aNode(q.x+i, q.y+j, q.f, q, food, enemies, mySnake);
					successors.push(successor);
					console.log("checkpoint 2.75");
				}
			}
		}

		console.log("checkpoint 3");

		for(var i = 0; i < successors.length; i++) {
			//if on closedList, ignore
			//MAYBE USE GRID SPACE = 3 FOR CLOSEDLIST
			if(contains(closedList, successors[i].x, successors[i].y)) {
				continue;
			}

			console.log("checkpoint 3.25");

			//MAYBE USE GRID SPACE = 4 FOR OPENLIST
			//if not in openList, add it
			if(!contains(openList, successors[i].x, successors[i].y)) {
				openList.push(successors[i]);
				continue;
			}

			console.log("checkpoint 3.50");

			//MAYBE USE GRID SPACE = 4 FOR OPENLIST
			//if openList has same nodes cheaper than successor[i]: continue, else: push to openList
			if(contains(openList, successors[i].x, successors[i].y)) {
				var check = false;
				for(var j = 0; j < openList.length; j++) {
					if(openList[j].x == successors[i].x && openList[j].y == successors[i].y && openList[j].f < successors[i].f) {
						check = true;
					}
					console.log("checkpoint 3.65");
				}
				if(check) {
					continue;
				} else {
					openList.push(successors[i]);
				}
				console.log("checkpoint 3.75");
			}
		}
		console.log("checkpoint 4");
	}
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