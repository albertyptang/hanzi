angular.module('zhzd', [])

.controller('zhCtrl', function ($scope, $location) {
  $scope.add = function(link){
    var zi = document.getElementById('preview').innerHTML;
    var node = document.getElementById("frame");
    if (link==="wiki") node.src = "https://en.wiktionary.org/w/index.php?title="+zi+"&printable=yes";
    else if (link==="baidu") node.src = "http://dict.baidu.com/s?wd="+zi;
    else if (link==="youdao") node.src = "http://dict.youdao.com/search?q="+zi+"&keyfrom=dict.index";
  };
});