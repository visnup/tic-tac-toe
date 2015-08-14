import { module } from 'angular';
import css from 'angular-material/angular-material.css';
import AI from './ai';

export default angular.module('tic-tac-toe', [
  require('angular-material'),
])
.directive('game', ($timeout, $mdDialog) => {
  return {
    controller: class {
      constructor($scope) {
        this.players = { x: 'human', o: 'human' };
        this.reset();

        $scope.$watch('game.players', this.checkTurn.bind(this), true);
      }

      reset() {
        this.board = [
          [ null, null, null ],
          [ null, null, null ],
          [ null, null, null ],
        ];
        this.turn = 'x';
        this.checkTurn();
      }

      play(move) {
        if (this.board[move[0]][move[1]])
          return;

        this.board[move[0]][move[1]] = this.turn;

        var ending = AI.end(this.board);
        if (ending) {
          ending = ending === true ? 'Tie' : `${ending} won`;
          ending = $mdDialog.alert().title(ending).ok('Replay');
          return $mdDialog.show(ending).then(this.reset.bind(this));
        }
        
        this.turn = this.turn === 'x' ? 'o' : 'x';
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
