var express = require('express')
var router  = express.Router()
var move = require('./move.js')

// Handle POST request to '/start'
router.post('/start', function (req, res) {

  // Response data
  var data = {
    color: 'rgb(149,165,166)',
    secondary_color: 'rgb(255,5,12)',
    name: 'stevie snake',
    head_url: 'http://interactive.nydailynews.com/project/trump-100-days/img/cutouts/steve-bannon.png',
    taunt: "treasonous!",
    head_type: 'pixel',
    tail_type: 'pixel'
  }

  return res.json(data)
})

// Handle POST request to '/move'
router.post('/move', function (req, res) {

  var input = req.body;

  var board = new GameStatus(input.id, input.height, input.width, input.turn, input.food);
  var mySnake = new Snake(input.you.name, input.you.length, input.you.id, input.you.health, input.you.body);
  var enemies = makeEnemies(mySnake, input);

  // Response data
  var data = {
    move: move(mySnake, enemies, board), // one of: ['up','down','left','right']
    taunt: 'that was unpatriotic!',
  }

  return res.json(data)
})

//-------------------------- Functions to build our environment ---------------------------//

//puts together a list of enemies
var makeEnemies = function (mySnake, input) {
  var enemies = new Array();

  for(var p = 0; p < Object.keys(input.snakes.data).length; p++) {

    var snek = new Snake(input.snakes.data[p].name, input.snakes.data[p].length, input.snakes.data[p].id, input.snakes.data[p].health, input.snakes.data[p].body);

    if(JSON.stringify(snek) === JSON.stringify(mySnake)) {
      continue;
    } else {
      if(snek.health < 1) {
        continue;
      }
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
  this.height = height-1;
  this.width = width-1;
  this.turn = turn;

  this.food = [];
  for(var j = 0; j < Object.keys(foods.data).length; j++) {
    this.food.push(foods.data[j]);
  }
}

module.exports = router
