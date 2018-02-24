var contains = require('./contains.js')

//makes sure we aren't going backward onto ourself
module.exports = exports = function(mySnake, decision) {
	if(contains(mySnake.body, mySnake.body[0].x, mySnake.body[0].y-1)) {
		decision.up -= 99999;
	}
	if(contains(mySnake.body, mySnake.body[0].x, mySnake.body[0].y+1)) {
		decision.down -= 99999;
	}
	if(contains(mySnake.body, mySnake.body[0].x-1, mySnake.body[0].y)) {
		decision.left -= 99999;
	}
	if(contains(mySnake.body, mySnake.body[0].x+1, mySnake.body[0].y)) {
		decision.right -= 99999;
	}
	return;
}