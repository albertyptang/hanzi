angular.module('hzzd')

.factory('router', function () {

  var switchState = function (state) {
    this.state = state;
  };

  return {
    state: 'draw',
    switchState: switchState
  };

});

