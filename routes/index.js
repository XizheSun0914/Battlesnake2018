var express = require('express')
var router  = express.Router()

// Handle POST request to '/start'
router.post('/start', function (req, res) {
  // NOTE: Do something here to start the game

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
  // NOTE: Do something here to generate your move

  var input = req.body;

  console.log(input.you);
  console.log(input.width);
  console.log(input.height);
  console.log(input.turn);
  console.log(input.snakes);
  console.log(input.world);
  console.log(input.food);

  // Response data
  var data = {
    move: 'right', // one of: ['up','down','left','right']
    taunt: 'Outta my way, snake!', // optional, but encouraged!
  }

  return res.json(data)
})

/*function Board(height, width) {
  this.height = height;
  this.width = width;
  this.food = food;
  this.snakes = snakes;
  this.turn = turn;
}*/

module.exports = router
