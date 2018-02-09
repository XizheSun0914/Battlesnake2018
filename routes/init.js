//builds a snake object
var Snake = function (name, length, id, health, bodys) {
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
var GameStatus = function (ids, heights, widths, turns, foods) {
  var id = ids;
  var height = heights;
  var width = widths;
  var turn = turns;

  var food = [];
  for(var j = 0; j < Object.keys(foods.data).length; j++) {
    this.food.push(foods.data[j]);
  }

  Object.defineProperties(this, {
    "you": {"get": function () { return you; }},
    "turn": {"get": function () { return turn; }},
    "width": {"get": function () { return width; }},
    "height": {"get": function () { return height; }},
    "food": {"get": function () { return food; }},
    "dead_snakes": {"get": function () { return dead_snakes; }},
    "snakes": {"get": function () { return snakes; }}
  });
}
