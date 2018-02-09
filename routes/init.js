
//builds a snake object
var Snake = function (names, lengths, ids, healths, bodys) {

  var name = names;
  var length = lengths;
  var id = ids;
  var health = healths;

  var body = [];
  for(var i = 0; i < Object.keys(bodys.data).length; i++) {
    this.body.push(bodys.data[i]);
  }

  Object.defineProperties(this, {
    "name": {"get": function () { return name; }},
    "length": {"get": function () { return length; }},
    "id": {"get": function () { return id; }},
    "health": {"get": function () { return health; }},
    "body": {"get": function () { return body; }}
  });
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
    "id": {"get": function () { return id; }},
    "height": {"get": function () { return height; }},
    "width": {"get": function () { return width; }},
    "turn": {"get": function () { return turn; }},
    "food": {"get": function () { return food; }}
  });
}

exports.GameStatus = GameStatus
exports.Snake = Snake
