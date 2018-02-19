var gameBoard = require('./gameBoard.js');
/*
Key:
0 = empty		3 = enemy head
1 = food		4 = my body
2 = enemy body	5 = my head
6 = wall
*/

module.exports = exports = function (currentBoard) {
	var decision = 'up';
	var board = findValues(currentBoard);

	if(board.myH.x == 1 || board.myH.x == board.width-1 || board.myH.y == 1 || board.myH.y == board.height-1){
		decision = checkWalls(board);
	}

	//return 'left', 'right', 'up', 'down'
	return decision;
}

var checkWalls = function (board) {
	//top left corner
	if(board.myH.x == 1 && board.myH.y == 1){
		if(contains(board.myB, 2, 1)) {
			return 'down';							//added this so might break
		} else {
			return 'right';
		}
	}
	console.log(board.height + " " + board.myH.y);
	//bottom left corner
	if(board.myH.x == 1 && board.myH.y == board.height) {
		if(contains(board.myB, 1, board.height-1)) {
			return 'right';
		} else {
			return 'up';
		}
	}
	//top right corner
	if(board.myH.x == board.width && board.myH.y == 1) {
		if(contains(board.myB, board.width-1, 1)) {
			return 'down';
		} else {
			return 'left';
		}
	}
	//bottom right corner
	if(board.myH.x == 1 && board.myH.y == board.height) {
		if(contains(board.myB, 1, board.height-1)) {
			return 'right';
		} else {
			return "up";
		}
	}
	//------------------construction---------------

	//left side
	if(board.myH.x == 1) {
		// |<--
		if(contains(board.myB, 2, board.myH.y)) {
			if(contains(board.myB, 1, board.myH.y+1)){
				return 'up';
			} else {
				return 'down';
			}
		}
		// |^
		if(contains(board.myB, 1, board.myH.y+1)) {
			return 'up';
		}
		// |v
		if(contains(board.myB, 1, board.myH.y-1)) {
			return 'down';
		}
		//return best option if you can go left or right
		return 'up'; //FIXXXX
	}
	// right side
	if(board.myH.x == board.width) {
		// -->|
		if(contains(board.myB, board.width-1, board.myH.y)) {
			if(contains(board.myB, board.width, board.myH.y+1)){
				return 'up';
			} else {
				return 'down';
			}
		}
		// ^|
		if(contains(board.myB, board.width, board.myH.y+1)) {
			return 'up';
		}
		// v|
		if(contains(board.myB, board.width, board.myH.y-1)) {
			return 'down';
		}
		//return best option if you can go up or down
		return 'up'; //FIXXXX
	}
	// top
	if(board.myH.y == 1) {
		// ^
		if(contains(board.myB, board.myH.x, 2)) {
			if(contains(board.myB, board.myH.x-1, 1)) {
				return 'right';
			} else {
				return 'left';
			}
		}
		//-->
		if(contains(board.myB, board.myH.x-1, 1)) {
			return 'right';
		}
		// <--
		if(contains(board.myB, board.myH.x+1, 1)) {
			return 'left';
		}
		//return best option if you can go left or right
		return 'left';	//FIXXX
	}
	//bottom
	if(board.myH.y == board.height) {
		// v
		if(contains(board.myB, board.myH.x, board.height-1)) {
			if(contains(board.myB, board.myH.x-1, board.height)) {
				return 'right';
			} else {
				return 'left';
			}
		}
		//-->
		if(contains(board.myB, board.myH.x-1, board.height)) {
			return 'right';
		}
		// <--
		if(contains(board.myB, board.myH.x+1, board.height)) {
			return 'left';
		}
		//return best option between left or right otherwise
		return 'left'; //FIXXXX
	}

	//--------------------------------------------

	return 'down';
}

var contains = function (list, x, y) {
	for(var i = 0; i < list.length; i++) {
		if(list[i].x == x && list[i].y == y) {
			return true;
		}
	}
	return false;
} 

var findValues = function (currentBoard) {

	var empty = [];
	var food = [];
	var enBody = [];
	var enHead = [];
	var myBody = [];
	var wall = [];
	var myHead;
	var height = currentBoard.length-2;
	var width = currentBoard[0].length-2;

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
		walls: wall,
		height: height,
		width: width
	};
}

function Point(x,y) {
	this.x = x;
	this.y = y;
}