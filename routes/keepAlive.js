var floodFill = require('./floodFill.js')
var contains = require('./functions/contains.js')

//does flood fill to find how large space is and the constraints

//if large enough, chase tail one away. taking up as much space as possible 
//if too small, search for enemy snake tail and A* to it. 

module.exports = exports = function(mySnake, enemies, board, decision) {

	console.log("running keepAlive");

	var openSpace = floodFill(mySnake, enemies, board);

	console.log(openSpace.length);

	for(var i = 0; i < openSpace.length; i++){
		var temp = openSpace.pop();
		console.log(temp.x + " " + temp.y);
	}

	return;
}