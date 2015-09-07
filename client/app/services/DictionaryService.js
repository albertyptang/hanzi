angular.module('hzzd')

.factory('dictionary', function ($http) {

  var history = [];

  for (var character in window.localStorage) {
    if (character.charCodeAt(0) >= 13312 && character.charCodeAt(0) <= 40959) {
      history.push(character);
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
        if (localStorage.getItem(character)) return;
        context.history.push(character);
        var removed;
        while (context.history.length > 20) {
          removed = context.history.pop();
          localStorage.removeItem(removed);
        }
        localStorage.setItem(character, 1);
      }
    }).error(function (data, status, headers, config) {
      console.log('error: ', status);
    });
  };

  return {
    character: '',
    definitions: [],
    history: history,
    changeCharacter: changeCharacter,
    lookupCharacter: lookupCharacter
  };

});

