var express = require('express');

var app = express();

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/userData', function (req, res) {
  res.send('This is user Data...');
});

app.get('/createUser', function (req, res) {
  res.send('This is create User...');
});