var floodFill = require('./floodFill.js')
var contains = require('./functions/contains.js')
var aStar = require('./functions/aStar.js')

//does flood fill to find how large the space is and where the walls are

//if large enough, chase tail one away. taking up as much space as possible 
//if too small, search for enemy snake tail and A* to it. 

module.exports = exports = function(mySnake, enemies, board, decision) {

	console.log("running keepAlive");

	var openSpace = floodFill(mySnake, enemies, board);

	console.log(openSpace.length);

	//adjust with testing to see if this size works, or completely different method
	if(openSpace.length*(1/2) > mySnake.length) {

		//go in circles filling the area and going to tail one behind
		//hug wall and astar to tail once available?
		console.log("lets do some circles!");

	} else {

		var nearbyTails = [];

		for(var i = 0; i < enemies.length; i++) {
			if(contains(openSpaces, enemies[i].body[enemies[i].length-1].x, enemies[i].body[enemies[i].length-1].y)) {
				nearbyTails.push(enemies[i].body[enemies[i].length-1]);
			}
		}

		if(nearbyTails.length == 0) {
			console.log("uh oh!");
			//try to hug wall
		} else {
			console.log("theres a tail!");
			//A* to closest enemy tail (remember that my astar takes enemy bodies into account, so adjust)
		}
	}
	return;
}