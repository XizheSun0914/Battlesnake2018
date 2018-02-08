import makeEnemies from "init.js"
var GameBoard = require('./init.js').GameBoard
var Snake = require('./init.js').Snake

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

  var board = new GameBoard(input.id, input.height, input.width, input.turn, input.food);
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

module.exports = router
