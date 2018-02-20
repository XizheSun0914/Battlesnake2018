var express = require('express')
var router  = express.Router()
//var move = require('./move.js');

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

  var stats = new GameStatus(input.id, input.height, input.width, input.turn, input.food);
  var mySnake = new Snake(input.you.name, input.you.length, input.you.id, input.you.health, input.you.body);
  var enemies = makeEnemies(mySnake, input);

  console.log(mySnake);
  console.log();
  console.log(enemies);
  console.log();
  console.log(stats);


  // Response data
  var data = {
    move: 'right',//move(mySnake, enemies, stats), // one of: ['up','down','left','right']
    taunt: 'moar snep bek plz', // optional, but encouraged!
  }

  return res.json(data)
})






//-------------------------- Functions to build our environment ---------------------------//

var makeEnemies = function (mySnake, input) {
  var enemies = new Array();

  for(var p = 0; p < Object.keys(input.snakes.data).length; p++) {

    var snek = new Snake(input.snakes.data[p].name, input.snakes.data[p].length, input.snakes.data[p].id, input.snakes.data[p].health, input.snakes.data[p].body);

    if(JSON.stringify(snek) === JSON.stringify(mySnake)) {
      continue;
    } else {
      enemies.push(snek);
    }
  }
  return enemies;
}

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

//builds the GameStatus object
function GameStatus(id, height, width, turn, foods) {
  this.id = id;
  this.height = height;
  this.width = width;
  this.turn = turn;

  this.food = [];
  for(var j = 0; j < Object.keys(foods.data).length; j++) {
    this.food.push(foods.data[j]);
  }
}

module.exports = router
