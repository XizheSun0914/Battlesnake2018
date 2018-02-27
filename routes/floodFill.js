var contains = require('./functions/contains.js')
var check = false;

module.exports = exports = function (mySnake, enemies, board) {
	var openSpaces = [];

	console.log("checkpoint 2");

	//find node that is neighbouring head that is not blocked in order to start

	var head = new Point(mySnake.body[0].x, mySnake.body[0].y);
	dfs(openSpaces, head, board.width, board.height, enemies, mySnake);

	return openSpaces;

}

var dfs = function (openSpaces, node, boardWidth, boardHeight, enemies, mySnake) {

	if(mySnake.body[0].x != node.x || mySnake.body[0].y != node.y) {
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

	console.log("checkpoint 3");

	//push location onto our open space list if not head
	if(check) {
		openSpaces.push(temp);
	}

	console.log("checkpoint 4");
	console.log("coords: " + node.x + " " + node.y);

	var caseOne = new Point(node.x+1, node.y);
	var caseTwo = new Point(node.x-1, node.y);
	var caseThree = new Point(node.x, node.y+1);
	var caseFour = new Point(node.x, node.y-1);

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
	console.log("checkpoint 5!!!");
	return false;
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