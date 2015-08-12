var AI = require('./ai'),
    _ = require('lodash');
/*
console.log(AI.best([
  [ 'O', null, 'O' ],
  [ null, 'X', null ],
  [ 'X', null, null ],
], 'O'));
process.exit();
*/

var board = [
  [ null, null, null ],
  [ null, null, null ],
  [ null, null, null ],
];

var players = {
  'X': AI.best,
  'O': AI.random,
};
var player = 'X',
    result;
while (!(result = AI.end(board))) {
  var move = players[player](board, player);
  board[move[0]][move[1]] = player;
  console.log(toString(board));
  player = player === 'X' ? 'O' : 'X';
}
console.log(result);

function toString(board) {
  return _.map(board, function(row) {
    return _.map(row, function(space) {
      return space || ' ';
    }).join(' | ');
  }).join('\n--+---+--\n') + '\n';
}
