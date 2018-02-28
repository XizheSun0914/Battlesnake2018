//SEEMS TO BE WORKING RIGHT NOW, CHECK FOR A SITUATION THAT IS TRULY BEING TRAPPED

var contains = require('./functions/contains.js')

module.exports = exports = function (mySnake, enemies, board) {
	var openSpaces = [];
	var check = false;

	//start floodfill at head
	var head = new Point(mySnake.body[0].x, mySnake.body[0].y);
	dfs(check, openSpaces, head, board.width, board.height, enemies, mySnake);

	//returns list of all coordinates in reach
	return openSpaces;

}

var dfs = function (check, openSpaces, node, boardWidth, boardHeight, enemies, mySnake) {

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
}

function Point(x, y) {
	this.x = x;
	this.y = y;
}

//checks if any enemies or body parts are on the spot
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
}