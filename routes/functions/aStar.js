//DOESNT WORK AND TWEAK VALUES IN CONSTRUCTION ZONE

var contains = require('./contains.js')

module.exports = exports = function (board, mySnake, enemies, food) {
	var closedList = [];
	var openList = [];
	
	var first = new aNode(mySnake.body[0].x, mySnake.body[0].y, -1, null, food, enemies, mySnake);
	openList.push(first);

	while(openList.length != 0) {

		if(openList.length >= 2) {
			openList.sort(function(a,b) {	//sort openList based on total cost
				return a.f - b.f;
			});
		}

		var q = openList.shift();
		var successors = [];

		//create successors
		for(var i = -1; i <= 1; i++) {
			for(var j = -1; j <= 1; j++) {
				//if we cant reach, skip
				if((i==0 && j==0) || (i != 0 && j != 0) || (!isValid(p.x+i, p.y+j, enemies, mySnake, board))){
					continue;
				} else {
					var successor = new aNode(q.x+i, q.y+j, q.f, q, food, enemies, mySnake);
					successors.push(successor);
				}
			}
		}

		for(var i = 0; i < successors.length; i++) {

			//if at goal push to closedList and quit
			if(isDest(successors[i].x, successors[i].y, food)) {
				closedList.push(successors[i]);
				return closedList;
			}

			//if openList has a node cheaper than successor[i], continue
			if(contains(openList, successors[i].x, successors[i].y)) {
				var check = false;
				for(var j = 0; j < openList.length; j++) {
					if(openList[j].x == successors[i].x && openList[j].y == successors[i].y && openList[j].f < successors[i].f) {
						check = true;
					}
				}
				if(check) {
					continue;
				}
			}

			//if not on closedList or on closedList but has cheaper value, add to openList
			if(!contains(closedList, successors[i].x, successors[i].y)) {
				openList.push(successors[i]);
			} else {
				var check = false;
				for(var j = 0; j < closedList.length; j++) {
					if(closedList[j].x == successors[i].x && closedList[j].y == successors[i].y && closedList[j].f < successors[i].f) {
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
		closedList.push(q);
	}
	var sadness = [];	//return empty list if search failed
	return sadness;
}

//Checks if we've reached our destination
function isDest(x, y, dest) {
	if(x == dest.x && y == dest.y) {
		return true;
	} else {
		return false;
	}
}

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

//--------------------------CONSTRUCTION ZONE ----------------------------

//this changes h (cost to destination) based on the dangerous stuff around the spot
var checkSurround = function (x, y, enemies, mySnake) {
	var price = 0;
	for(var i = -1; i <= 1; i++) {
		for(var j = -1; j <= 1; j++) {
			//check if where we want to go has an ememy head beside with equal or larger length nearby
			// or for my body and other enemy snakes
			if(contains(mySnake.body, x+i, y+j)) {
				price++;
			}
			for(var k = 0; k < enemies.length; k++) {
				if(contains(enemies[k].body, x+i, y+j)) {
					price++;
				}
				if(enemies[k].body[0].x == x+i && enemies[k].body[0].y == y+j && enemies[k].length >= mySnake.length) {
					//change price added in future when I get a better idea of how impactful it is
					price += 5;
				}
			}
		}
	}
	return price;
}
