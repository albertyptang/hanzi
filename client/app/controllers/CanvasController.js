angular.module('hzzd')

.controller('canvasCtrl', ['$scope', 'router', 'dictionary', 'canvas', '$timeout', function ($scope, router, dictionary, canvas, $timeout) {
  // router
  $scope.router = router;

  // dictionary
  $scope.dictionary = dictionary;
  $scope.changeCharacter = function(character) {
    $timeout(dictionary.changeCharacter.call(dictionary, character));
  };  

  // canvas
  $scope.canvas = canvas.canvas;
  var context = canvas.context;
  var pointerId;

  var doRecognition = function () {
      if (canvas.inkManager.isEmpty()) {
        $scope.changeCharacter('');
      } else {
        canvas.doRecognition()
          .then(function(data){
            $scope.dictionary.memory.push(data);
            $scope.changeCharacter(data);
          });
      }
  };
  /*
   * On pointer down: Start ink rendering and ink capture.
   */
  $scope.canvas.addEventListener('pointerdown', function (event) {
    if (!pointerId) {
      pointerId = event.pointerId;
      event.preventDefault();
      // Start ink rendering
      canvas.textRenderer.drawStart(event.offsetX, event.offsetY);
      // Start ink capture
      canvas.inkManager.startInkCapture(event.offsetX, event.offsetY);
    }
  }, false);
  /*
   * On pointer move: Continue ink rendering and ink capture.
   */
  $scope.canvas.addEventListener('pointermove', function (event) {
    if (pointerId === event.pointerId) {
      event.preventDefault();
      // Continue ink rendering
      canvas.textRenderer.drawContinue(event.offsetX, event.offsetY, context);
      // Continue ink capture
      canvas.inkManager.continueInkCapture(event.offsetX, event.offsetY);
    }
  }, false);
  /*
   * On pointer up: Stop ink rendering and ink capture and send recognition request.
   */
  $scope.canvas.addEventListener('pointerup', function (event) {
    if (pointerId === event.pointerId) {
      event.preventDefault();
      // Stop ink rendering
      canvas.textRenderer.drawEnd(event.offsetX, event.offsetY, context);
      // Stop ink capture
      canvas.inkManager.endInkCapture();
      pointerId = undefined;
      // Send recognition request
      doRecognition();
    }
  }, false);
  /*
   * On pointer leave: Continue ink rendering and ink capture.
   */
  $scope.canvas.addEventListener('pointerleave', function (event) {
    if (pointerId === event.pointerId) {
      event.preventDefault();
      // Stop ink rendering
      canvas.textRenderer.drawEnd(event.offsetX, event.offsetY, context);
      // Stop ink capture
      canvas.inkManager.endInkCapture();
      pointerId = undefined;
      // Send recognition request
      doRecognition();
    }
  }, false);

}]);