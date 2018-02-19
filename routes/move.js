var gameBoard = require('./gameBoard.js');
/*
Key:
0 = empty		3 = enemy head
1 = food		4 = my body
2 = enemy body	5 = my head
6 = wall
*/

module.exports = exports = function (currentBoard) {
	var board = findValues(currentBoard);

	console.log(board.myH.x + board.myH.y);

	//return 'left', 'right', 'up', 'down'
	return 'down';
}

var checkWall = function (currentBoard, board) {
	board[]
}

var findValues = function (currentBoard) {

	var empty = [];
	var food = [];
	var enBody = [];
	var enHead = [];
	var myBody = [];
	var wall = [];
	var myHead;

	for(var i = 0; i < currentBoard.length; i++) {
		for(var j = 0; j < currentBoard[i].length; j++) {
			if(currentBoard[i][j] == 5) {
				myHead = new Point(j,i);
			} else if(currentBoard[i][j] == 4) {
				myBody.push(new Point(j,i));
			} else if(currentBoard[i][j] == 3) {
				enHead.push(new Point(j,i));
			} else if(currentBoard[i][j] == 2) {
				enBody.push(new Point(j,i));
			} else if(currentBoard[i][j] == 1) {
				food.push(new Point(j,i));
			} else if(currentBoard[i][j] == 0) {
				empty.push(new Point(j,i));
			} else {
				wall.push(new Point(j,i));
			}
		}
	}
	return {
		empty: empty, 
		food: food, 
		enemyB: enBody, 
		enemyH: enHead, 
		myB: myBody, 
		myH: myHead, 
		walls: wall
	};
}

function Point(x,y) {
	this.x = x;
	this.y = y;
}