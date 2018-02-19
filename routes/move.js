var gameBoard = require('./gameBoard.js');
/*
Key:
0 = empty		3 = enemy head
1 = food		4 = my body
2 = enemy body	5 = my head
6 = wall
USE THE ARRAY 1 BASED NOT 0 BASED
board[y][x]
*/

module.exports = exports = function (currentBoard) {

	var head = findHead(currentBoard);

	console.log(head);

	//return 'left', 'right', 'up', 'down'
	return 'down';
}

/*var checkWall = function (currentBoard, head) {
	
}*/

var findHead = function (currentBoard) {
	var head = [0,0];

	for(int i = 0; i < currentBoard.length; i++) {
		for(int j = 0; j < currentBoard[i].length; j++) {
			if(currentBoard[i][j] == 5){
				head[0] = i;
				head[1] = j;
				return head;
			}
		}
	}
}