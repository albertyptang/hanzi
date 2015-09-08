angular.module('hzzd')

.controller('menuCtrl', ['$scope', 'router', 'dictionary', 'canvas', '$timeout', function ($scope, router, dictionary, canvas, $timeout) {
  // router
  $scope.router = router;
  $scope.switchState = function(state) {
    router.switchState(state);
  };

  // dictionary
  $scope.dictionary = dictionary;
  $scope.lookupCharacter = function() {
    dictionary.lookupCharacter();
  };

  // canvas
  $scope.clear = function() {
    dictionary.changeCharacter('');
    dictionary.memory = [];
    dictionary.definitions = [];
    canvas.textRenderer.clear(canvas.context);    
    canvas.inkManager.clear();
  };
  $scope.undo = function() {
    canvas.inkManager.undo();
    var strokes = canvas.inkManager.getStrokes();
    canvas.textRenderer.clear(canvas.context);    
    canvas.textRenderer.drawStrokes(strokes, canvas.context);
    dictionary.memory.pop();
    if (dictionary.memory.length === 0) {
      dictionary.changeCharacter('');
    } else {
      dictionary.changeCharacter(dictionary.memory[dictionary.memory.length - 1]);
    }
  };

}]);

