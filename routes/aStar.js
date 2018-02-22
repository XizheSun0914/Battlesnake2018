var contains = require('./contains.js')

module.exports = exports = function (board, mySnake, enemies, food) {
	var closedList = [];
	var openList = [];
	
	var first = new aNode(mySnake.body[0].x, mySnake.body[0].y, -1, null, food);
	openList.push(first);

	while(openList.length != 0) {
		var p = openList.shift();
		closedList.push(p);

		for(var i = -1; i <= 1; i++) {
			for(var j = -1; j <= 1; j++) {
				//if we cant't move to that node, skip
				if((i==0 && j==0) || (i==-1 && j==-1) || (i==1 && j==1) || (i==-1 && j==1) || (i==1 && j==-1)){
					continue;
				} else {

					//if we can't go there, skip
					if(!isValid(p.x+i, p.y+j, enemies, mySnake, board)){
						continue;

					} else {

						//if we reached food, exit and return route
						if(isDest(p.x+i, p.y+j, food)) {
							var final = new aNode(p.x+i, p.y+j, p.f, p, food);
							closedList.push(final);
							return closedList;

						//if not on our closedList or openList, add
						//OR
						//if not on closedList but on openList with higher value, add
						} else if (!contains(closedList, p.x+i, p.y+j)) {
							var check = true;
							var tempNode = new aNode(p.x+i, p.y+j, p.f, p, food);
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

//creates h based on cost to start and to finish from node
function calc_h(x, y, dest) {
	return (Math.abs(x - dest.x) + Math.abs(y - dest.y));
}

function aNode(x, y, g, parent, dest) {
	this.x = x;
	this.y = y;
	this.g = g + 1.0;
	this.h = calc_h(this.x, this.y, dest)
	this.parent = parent;
	this.f = this.g + this.h;
}

//--------------------------CONSTRUCTION ZONE ----------------------------
/*
var checkSurround = function (x, y) {
	var price = 0;
	for(var i = -2; i <= 2; i++) {
		for(var j = -2; j <= 2; j++) {
			//check if surroundings contain enemy bodies, food, your body etc.
			if so {
				price += whatever*a multiplier based on how far away;
			}
		}
	}
	return price;
}
*/