/*eslint-env node*/

var express = require('express');
var app = express();

var countries = require('countryjs');

app.set('views', './views');
app.set('view engine', 'pug');

app.get('/', function (req, res) {
  res.render('es6', {message: 'impariamo la geografia', title:'fila A', list: countries.all()});
});

app.get('/info', function (req, res) {
  var nazione = req.query.nazione;
  var info = req.query.info;
  if (info == 'capitale' ) {
      res.render('es3', {message: countries.info(nazione, 'name').capital, title:'capitale'});
  }
  else
  {
      res.render('es3', {message: countries.info(nazione, 'name').population, title:'capitale'});
  }
  
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
