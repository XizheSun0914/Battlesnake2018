var express = require('express')
var router  = express.Router()

// Handle POST request to '/start'
router.post('/start', function (req, res) {

  // Response data
  var data = {
    color: 'rgb(255,5,12)',
    secondary_color: 'rgb(0,5,6)',
    name: 'spoder snek',
    head_url: 'https://apprecs.org/gp/images/app-icons/300/08/com.aesir.bouncyspoderman.jpg',
    taunt: "giv me an snep bek",
    head_type: 'pixel',
    tail_type: 'pixel'
  }

  return res.json(data)
})

// Handle POST request to '/move'
router.post('/move', function (req, res) {

  var input = req.body;
  var board = new GameBoard(input.id, input.height, input.width, input.turn);
  console.log("success making board");
  console.log(board);
  var mySnake = new Snake(input.you.name, input.you.length, input.you.id, input.you.health, input.you.body);
  console.log("success making mySnake")
  console.log(mySnake)
  var enemies = [];

  for(var i = 0; i < Object.keys(input.snakes.data).length; i++) {
    var snek = new Snake(input.snakes.data[i].name, input.snakes.data[i].length, input.snakes.data[i].id, input.snakes.data[i].health, input.snakes.data[i].body);
    if(!(snek.id).equals(mySnake.id)) {
      enemies.push(snek);
    }
  }

  console.log("success making enemies");
  console.log(enemies);

  // Response data
  var data = {
    move: 'right', // one of: ['up','down','left','right']
    taunt: 'Outta my way, snake!', // optional, but encouraged!
  }

  return res.json(data)
})

//builds a snake object
function Snake(name, length, id, health, bodys) {
  this.name = name;
  this.length = length;
  this.id = id;
  this.health = health;

  this.body = [];
  for(var i = 0; i < Object.keys(bodys.data).length; i++) {
    this.body.push(bodys.data[i]);
  }
}

//builds the gamebaord object
function GameBoard(id, height, width, turn) {
  this.id = id;
  this.height = height;
  this.width = width;
  this.turn = turn;

  /*this.food = [];
  for(var i = 0; i < Object.keys(foods.data).length; i++){
    this.food.push(foods.data[i]);
  }*/
}

/*function printStats(input) {

  //will use this to pull game stats

  var yoSnakeBod = Object.keys(input.you.body.data);
  var allSnakes = Object.keys(input.snakes.data);
  var allFood = Object.keys(input.food.data);

  //console.log("My Snake:");
  //console.log("name: " + input.you.name);
  //console.log("length: " + input.you.length);
  //console.log("snake id: " + input.you.id);
  //console.log("health: " + input.you.health);
  //for(var i = 0; i < yoSnakeBod.length; i++){
  //  console.log("Body Part #" + (i+1) + ": " + input.you.body.data[i].x + " " + input.you.body.data[i].y);
  //}
  //console.log();

  //console.log("Board Stats:");
  //console.log("Game id: " + input.id);
  //console.log("width: " + input.width);
  //console.log("height: " + input.height);
  //console.log("turn: " + input.turn);
  //console.log();

  console.log("Snake List:");

  for(var k = 0; k < allSnakes.length; k++){
    console.log("snake #" + (k+1));
    console.log("health: " + input.snakes.data[k].health);
    console.log("id: " + input.snakes.data[k].id);
    console.log("length: " + input.snakes.data[k].length);
    console.log("name: " + input.snakes.data[k].name);
    var thisSnakeBod = Object.keys(input.snakes.data[k].body.data);
    for(var j = 0; j < thisSnakeBod.length; j++){
      console.log("Body Part #" + (j+1) + ": " + input.snakes.data[k].body.data[j].x + " " + input.snakes.data[k].body.data[j].y);
    }
    console.log();
  }

  //console.log();

  //console.log("Food Locations:");
  //for(var p = 0; p < allFood.length; p++) {
  //  console.log("Food item #" + (p+1) + ": " + input.food.data[p].x + " " + input.food.data[p].y);
  //}
}*/

module.exports = router
