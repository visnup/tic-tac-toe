import { module } from 'angular';

export default angular.module('tic-tac-toe', [])
.directive('game', function() {
  return {
    link: function(scope) {
    }
  };
})
.name;
