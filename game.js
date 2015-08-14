import { module } from 'angular';
import { best, random } from './ai';
import css from 'angular-material/angular-material.css';

export default angular.module('tic-tac-toe', [
  require('angular-material'),
])
.directive('game', function() {
  return {
    controller: class Game {
      constructor() {
        this.board = [
          [ null, null, null ],
          [ null, null, null ],
          [ null, null, null ],
        ];
        this.turn = 'X';
      }

      play(i, j) {
        if (this.board[i][j])
          return;

        this.board[i][j] = this.turn;
        var ai = best(this.board, 'O');
        this.board[ai[0]][ai[1]] = 'O';

        //this.turn = this.turn === 'X' ? 'O' : 'X';
      }
    },
    controllerAs: 'game',
    template: require('./game.jade')
  };
})
.name;
