module.exports = exports = function(mySnake, point, decision, value) {
	if(mySnake.body[0].x+1 == point.x && mySnake.body[0].y == point.y) {
		decision.right += value;
	}
	if(mySnake.body[0].x-1 == point.x && mySnake.body[0].y == point.y) {
		decision.left += value;
	}
	if(mySnake.body[0].x == point.x && mySnake.body[0].y-1 == point.y) {
		decision.up += value;
	}
	if(mySnake.body[0].x == point.x && mySnake.body[0].y+1 == point.y) {
		decision.down += value;
	}
}