angular.module('hzzd')

.controller('menuCtrl', ['$scope', 'router', 'dictionary', '$timeout', function ($scope, router, dictionary, $timeout) {
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

}]);

