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

	console.log("empty: " + board[0]);
	console.log("food: " + board[1]);
	console.log("enemy Body: " + board[2]);
	console.log("enemy Head: " + board[3]);
	console.log("my Body: " + board[4]);
	console.log("my Head: " + board[5].x + " " board[5].y);
	console.log("wall: " + board[6]);

	//return 'left', 'right', 'up', 'down'
	return 'down';
}

/*var checkWall = function (currentBoard, head) {
	if(head[0] == 1)
}*/

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
	return [empty, food, enBody, enHead, myBody, myHead, wall];
}

function Point(x,y) {
	this.x = x;
	this.y = y;
}