angular.module('zhzd', [])

.controller('zhCtrl', function ($scope, $location) {
  $scope.draw = true;
  $scope.hist = {};
  $scope.retrieve = function(){
    for (var i in window.localStorage) {
      $scope.hist[i] = JSON.parse(localStorage.getItem(i));
    }
  };
  $scope.add = function(link){
    var zi = document.getElementById('preview').innerHTML;
    $scope.hist[zi] = {char: zi, date: Date.now()};
    localStorage.setItem(zi, JSON.stringify($scope.hist[zi]));
    var node = document.getElementById("frame");
    if (link==="wiki") node.src = "https://en.wiktionary.org/w/index.php?title="+zi+"&printable=yes";
    else if (link==="baidu") node.src = "http://dict.baidu.com/s?wd="+zi;
    else if (link==="youdao") node.src = "http://dict.youdao.com/search?q="+zi+"&keyfrom=dict.index";
  };
  $scope.past = function(past){
    document.getElementById('preview').innerHTML = past;
  };
  $scope.retrieve();
});