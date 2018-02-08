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

//builds enemy snake array
function makeEnemies(mySnake, input) {
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

//builds the gameboard object
function GameBoard(id, height, width, turn, foods) {
  this.id = id;
  this.height = height;
  this.width = width;
  this.turn = turn;

  this.food = [];
  for(var j = 0; j < Object.keys(foods.data).length; j++) {
    this.food.push(foods.data[j]);
  }
}

export default makeEnemies;
module.exports = Snake;
module.exports = GameBoard;