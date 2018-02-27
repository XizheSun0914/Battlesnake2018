var contains = require('./functions/contains.js')

module.exports = exports = function (mySnake, enemies, board) {
	var openSpaces = [];

	console.log("checkpoint 2");

	//find node that is neighbouring head that is not blocked in order to start

	var head = new dNode(mySnake.body[0].x, mySnake.body[0].y);
	dfs(openSpaces, head, board.width, board.height, enemies, mySnake);

	return openSpaces;

}

var dfs = function (openSpaces, node, boardWidth, boardHeight, enemies, mySnake) {
	//Base cases
	if(node.x > boardWidth || node.y > boardHeight || node.x < 0 || node.y < 0) {
		return false;
	}
	if(node.visited == true) {
		return false;
	}
	if(checkIfBlocked(node, enemies, mySnake) && !(node.x == mySnake.body[0].x && node.y == mySnake.body[0].y)) { 
		return false;
	}

	console.log("checkpoint 3");

	//push location onto our open space list if not head
	if(node.x != mySnake.body[0].x && node.y != mySnake.body[0].y) {
		var temp = new Point(node.x, node.y);
		openSpaces.push(temp);
	}

	console.log("checkpoint 4");

	node.visited = true;

	var caseOne = new dNode(node.x+1, node.y);
	var caseTwo = new dNode(node.x-1, node.y);
	var caseThree = new dNode(node.x, node.y+1);
	var caseFour = new dNode(node.x, node.y-1);

	if(dfs(openSpaces, caseOne, boardWidth, boardHeight, enemies, mySnake)) {
		return true;
	}
	if(dfs(openSpaces, caseTwo, boardWidth, boardHeight, enemies, mySnake)) {
		return true;
	}
	if(dfs(openSpaces, caseThree, boardWidth, boardHeight, enemies, mySnake)) {
		return true;
	}
	if(dfs(openSpaces, caseFour, boardWidth, boardHeight, enemies, mySnake)) {
		return true;
	}
	console.log("checkpoint 5");
	return false;
}

function dNode(x, y) {
	this.x = x;
	this.y = y;
	this.visited = false;
}

function Point(x, y) {
	this.x = x;
	this.y = y;
}

var checkIfBlocked = function(node, enemies, mySnake) {
	if(contains(mySnake.body, node.x, node.y)) {
		return false;
	}
	for(var i = 0; i < enemies.length; i++) {
		if(contains(enemies[i].body, node.x, node.y)) {
			return false;
		}
	}
	return true;
}