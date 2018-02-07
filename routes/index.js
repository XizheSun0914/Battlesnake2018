var express = require('express')
var router  = express.Router()
var count = 0;

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

  console.log(req.body.world);
  count++;

  // Response data
  var data = {
    move: 'down', // one of: ['up','down','left','right']
    taunt: 'Outta my way, snake!', // optional, but encouraged!
  }

  if(count % 3 == 0) {
    data.move = 'left';
  }

  return res.json(data)
})

module.exports = router
