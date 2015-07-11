angular.module('zhzd', [])

.controller('zhCtrl', function ($scope, $location, $http) {
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
  $scope.hist = {};
  $scope.past = function (past) {
    document.getElementById('preview').innerHTML = past;
  };
  $scope.retrieve = function () {
    for (var i in window.localStorage) {
      $scope.hist[i] = localStorage.getItem(i);
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
      if (data[0] === undefined) $scope.def = [];
      else {
        var date = Date.now();
        $scope.def = data;
        $scope.hist[zi] = date;
        localStorage.setItem(zi, date);
      }
    }).
    error(function (data, status, headers, config) {
      console.log('error: ', status);
    });
  };
  $scope.retrieve();
});