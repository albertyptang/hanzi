angular.module('hzzd')

.factory('dictionary', ['$http', function ($http) {

  var history = [];

  var memory = [];

  for (var date in localStorage) {
    var character = localStorage[date];
    if (character.charCodeAt(0) >= 13312 && character.charCodeAt(0) <= 40959) {
      var entry = {
        date: date,
        character: character
      };
      history.push(entry);
      if (history.length > 28) {
        var removed = history.unshift();
        localStorage.removeItem(removed.date);
      }
    } else {
      localStorage.removeItem(date);
    }
  }

  var changeCharacter = function (character) {
    this.character = character;
  };

  var lookupCharacter = function () {
    var context = this;
    var character = this.character;
    var code = character.charCodeAt(0);
    if (code < 13312 || code > 40959) {
      context.definitions = [{
        traditional: 'Sorry',
        definition: 'Try writing a Chinese character'
      }];
      return;
    }
    $http.post('/dic', {
      character: character
    }).
    success(function (data) {
      if (!data[0]) {
        context.definitions = [];
      } else {
        context.definitions = data;

        for (var date in window.localStorage) {
          if (character === window.localStorage[date]) {
            return;
          }
        }
        date = Date.now();
        var entry = {
          date: date,
          character: character
        };
        context.history.push(entry);
        while (context.history.length > 28) {
          var removed = context.history.unshift();
          localStorage.removeItem(removed.date);
        }
        localStorage.setItem(date, character);
      }
    }).error(function (data, status, headers, config) {
      console.log('error: ', status);
    });
  };

  return {
    character: '',
    definitions: [],
    history: history,
    memory: memory,
    changeCharacter: changeCharacter,
    lookupCharacter: lookupCharacter
  };

}]);

