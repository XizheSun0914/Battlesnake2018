var aStar = require('functions/aStar.js')
var contains = require('functions/contains.js')

//does flood fill to find how large space is and the constraints

//if large enough area go in *circles* chasing your tail
//once going in circles, if there is a snake inside, start getting smaller to KILL
//if too small, search for enemy snake tail and follow it. 

module.exports = exports = function(mySnake, enemies, board, decision) {

	console.log("running keepAlive");

	findFood(mySnake, enemies, board, decision);

	return;
}