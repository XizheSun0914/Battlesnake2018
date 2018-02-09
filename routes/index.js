var express = require('express')
var router  = express.Router()

var GameStatus = require('./init.js').GameStatus
var Snake = require('./init.js').Snake

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

  var board = new GameStatus(input.id, input.height, input.width, input.turn, input.food);
  var mySnake = new Snake(input.you.name, input.you.length, input.you.id, input.you.health, input.you.body);
  var enemies = makeEnemies(mySnake, input);

  console.log(board);
  console.log();
  console.log(mySnake);
  console.log();
  console.log(enemies);

  // Response data
  var data = {
    move: 'right', // one of: ['up','down','left','right']
    taunt: 'moar snep bek plz', // optional, but encouraged!
  }

  return res.json(data)
})

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
  return enemies
}

module.exports = router