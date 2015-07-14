angular.module('zhzd', [])

.controller('zhCtrl', function ($scope, $location, $http, $timeout) {
  // state
  $scope.draw = 1;
  $scope.iconDef = '';
  $scope.instructions = 'Write a Chinese character and click the Search icon';
  $scope.icon = function (state) {
    if (state === undefined) {
      $scope.iconDef = '';
      if ($scope.draw) $scope.instructions = 'Write a Chinese character and click the Search icon';
      else $scope.instructions = 'Click a Chinese character and click the Search icon';
    } else {
      $scope.instructions = '';
      $scope.iconDef = state;
    }
  };
  // history
  $scope.hist = [];
  $scope.past = function (past) {
    document.getElementById('preview').innerHTML = past;
  };
  $scope.retrieve = function () {
    for (var zi in window.localStorage) {
      $scope.hist.push(zi);
    }
  };
  // definitions
  $scope.def = [];
  $scope.add = function () {
    var zi = document.getElementById('preview').innerHTML;
    $http.post('/dic', {
      zi: zi
    }).
    success(function (data) {
      if (data[0] === undefined || localStorage.getItem(zi)) {
        $scope.def = [];
      } else {
        $scope.def = data;
        $scope.hist.push(zi);
        var removed;
        while ($scope.hist.length > 20) {
          removed = $scope.hist.pop();
          localStorage.removeItem(removed);
        }
        localStorage.setItem(zi, 1);
      }
    }).error(function (data, status, headers, config) {
      console.log('error: ', status);
    });
  };
  $scope.retrieve();
});