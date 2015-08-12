var _ = require('lodash');

function possibleMoves(board) {
  return _.reduce(board, function(empty, row, i) {
    return _.reduce(row, function(empty, space, j) {
      return space ? empty : empty.concat([[i, j]]);
    }, empty);
  }, []);
}

function evaluate(board, player) {
  // check win condition
  var winner = winnerBy(board) ||
    winnerBy(_.unzip(board)) ||
    winnerBy(diagonals(board));
  if (winner)
    return player === winner ? 1 : -1;
  if (_.all(board, _.all))
    return 0;

  // how many possible win conditions exist at the shortest depth
  var possible = possibleMoves(board);
  return _.sum(possible, function(move) {
    return evaluate(_.tap(_.cloneDeep(board), function(next) {
      next[move[0]][move[1]] = player === 'X' ? 'O' : 'X';
    }), player);
  }) / possible.length / 2;
}

evaluate = _.memoize(evaluate, function(board, player) {
  return String([board, player]);
});

function winnerBy(board) {
  var row = _.find(board, function(row) {
    var uniq = _.uniq(row);
    return _.all(row) && uniq.length === 1 && uniq[0];
  });

  return row && row[0];
}

function diagonals(board) {
  var diagonals = [ [], [] ];
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[i].length; j++) {
      if (i === j) {
        diagonals[0].push(board[i][j]);
      }
      if (i === board[i].length - j - 1) {
        diagonals[1].push(board[i][j]);
      }
    }
  }

  return diagonals;
}

module.exports = {
  random: function randomMove(board) {
    return _.sample(possibleMoves(board));
  },
  best: function bestMove(board, player) {
    return _.max(_.shuffle(possibleMoves(board)), function(move) {
      return evaluate(_.tap(_.cloneDeep(board), function(next) {
        next[move[0]][move[1]] = player;
      }), player);
    });
  },
  end: function(board) {
    return winnerBy(board) ||
      winnerBy(_.unzip(board)) ||
      winnerBy(diagonals(board)) ||
      _.all(board, _.all);
  }
};
