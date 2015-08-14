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

var board = [
  [ null, null, null ],
  [ null, null, null ],
  [ null, null, null ],
];

var players = {
  'x': AI.best,
  'o': AI.best,
};
var player = 'x',
    result;
while (!(result = AI.end(board))) {
  var move = players[player](board, player);
  board[move[0]][move[1]] = player;
  console.log(toString(board));
  player = player === 'x' ? 'o' : 'x';
}
console.log(result);

function toString(board) {
  return _.map(board, function(row) {
    return _.map(row, function(space) {
      return space || ' ';
    }).join(' | ');
  }).join('\n--+---+--\n') + '\n';
}
