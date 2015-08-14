var AI = require('./ai'),
    _ = require('lodash');

/*
console.log(AI.best([
  [ 'x', null, null ],
  [ null, 'o', null ],
  [ null, null, 'x' ],
], 'o'));
process.exit();
*/

var players = {
  'x': AI.random,
  'o': AI.best,
};
var results = {};
for (var i = 0; i < 1000; i++) {
  var player = 'x',
      board = [
        [ null, null, null ],
        [ null, null, null ],
        [ null, null, null ],
      ],
      result;
  while (!(result = AI.end(board))) {
    var move = players[player](board, player);
    board[move[0]][move[1]] = player;
    //console.log(toString(board));
    player = player === 'x' ? 'o' : 'x';
  }
  //console.log(result);
  results[result] = (results[result] || 0) + 1;
}
console.log(results);

function toString(board) {
  return _.map(board, function(row) {
    return _.map(row, function(space) {
      return space || ' ';
    }).join(' | ');
  }).join('\n--+---+--\n') + '\n';
}
