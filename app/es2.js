/*eslint-env node*/

var express = require('express');
var app = express();

app.set('views', './views');
app.set('view engine', 'pug');

app.get('/', function (req, res) {
  res.render('es2', {message: 'impariamo la geografia', title:'fila A'});
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
