//WORKS BUT TWEAK VALUES IN CONSTRUCTION ZONE

var contains = require('./contains.js')

module.exports = exports = function (board, mySnake, enemies, food) {
	var closedList = [];
	var openList = [];
	
	var first = new aNode(mySnake.body[0].x, mySnake.body[0].y, -1, null, food, enemies, mySnake);
	openList.push(first);

	while(openList.length != 0) {
		var p = openList.shift();
		closedList.push(p);

		for(var i = -1; i <= 1; i++) {
			for(var j = -1; j <= 1; j++) {
				//if we cant't move to that node, skip
				if((i==0 && j==0) || (i != 0 && j != 0)){
					continue;
				} else {

					//if we can't go there, skip
					if(!isValid(p.x+i, p.y+j, enemies, mySnake, board)){
						continue;

					} else {

						//if we reached food, exit and return route
						if(isDest(p.x+i, p.y+j, food)) {
							var final = new aNode(p.x+i, p.y+j, p.f, p, food, enemies, mySnake);
							closedList.push(final);
							return closedList;

						//if not on our closedList or openList, add
						//OR
						//if not on closedList but on openList with higher value, add
						} else if (!contains(closedList, p.x+i, p.y+j)) {
							var check = true;
							var tempNode = new aNode(p.x+i, p.y+j, p.f, p, food, enemies, mySnake);
							for(var k = 0; k < openList.length; k++) {							//INCREDIBLY SLOW: Doesn't affect performance
								if(openList[k].x == p.x+i && openList[k].y == p.y+j) {			//too much on a realistic gameboard though.
									check = false;												//fix if time permits
									if(openList[k].f > tempNode.f) {
										openList.push(tempNode);
									}
								}
							}
							if(check) {
								openList.push(tempNode);
							}
						}
					}
				}
			}
		}
		openList.sort(function(a,b) {	//sort openList based on total cost
			return a.f - b.f;
		});
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
	for(var i = 1; i < mySnake.body.length; i++) {
		if(contains(mySnake.body, x, y)) {
			return false;
		}
	}
	for(var i = 0; i < enemies.length; i++) {
		for(var j = 0; j < enemies[i].length; j++) {
			if(contains(enemies[i].body, x, y)) {
				return false;
			}
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
