angular.module('zhzd', [])

.controller('zhCtrl', function ($scope, $location, $http) {
  $scope.draw = true;
  $scope.hist = {};
  $scope.def = {};
  $scope.retrieve = function () {
    for (var i in window.localStorage) {
      $scope.hist[i] = localStorage.getItem(i);
    }
  };
  $scope.add = function () {
    var zi = document.getElementById('preview').innerHTML;
    $http.post('/dic', {
      zi: zi
    }).
    success(function (data) {
      if (data[0] === undefined) $scope.def = {
        definition: 'Sorry, not a valid Chinese character'
      };
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
  $scope.past = function (past) {
    document.getElementById('preview').innerHTML = past;
  };
  $scope.retrieve();
});