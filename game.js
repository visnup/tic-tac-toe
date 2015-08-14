import { module } from 'angular';
import css from 'angular-material/angular-material.css';
import AI from './ai';

export default angular.module('tic-tac-toe', [
  require('angular-material'),
])
.directive('game', ($timeout) => {
  return {
    controller: class {
      constructor($scope) {
        this.turn = 'x';
        this.players = { x: 'human', o: 'human' };
        this.board = [
          [ null, null, null ],
          [ null, null, null ],
          [ null, null, null ],
        ];

        $scope.$watch('game.players', this.checkTurn.bind(this), true);
      }

      play(move) {
        if (this.board[move[0]][move[1]])
          return;

        this.board[move[0]][move[1]] = this.turn;
        this.turn = this.turn === 'x' ? 'o' : 'x';

        if (!AI.end(this.board))
          this.checkTurn();
      }

      checkTurn() {
        if (this.players[this.turn] !== 'human') {
          $timeout(() => {
            this.play(AI[this.players[this.turn]](this.board, this.turn));
          }, 100);
        }
      }
    },
    controllerAs: 'game',
    template: require('./game.jade')
  };
})
.name;
