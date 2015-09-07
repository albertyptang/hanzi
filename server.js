// express
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
// chinese translation
var hanzi = require('hanzi');

hanzi.start();

// for data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// for serving fiies
app.use(express.static(__dirname+'/client'));

// routing
app.post('/dic', function (req, res) {
  var character = req.body.character;
  var def = hanzi.definitionLookup(character);
  res.send(def);
});

// listen on port
var port = process.env.PORT || 8888;
app.listen(port);
console.log('Server started on port: ', port);