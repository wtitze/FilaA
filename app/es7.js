/*eslint-env node*/

var express = require('express');
var app = express();

var countries = require('countryjs');

app.set('views', './views');
app.set('view engine', 'pug');

app.get('/', function (req, res) {
  res.render('es6', {message: 'impariamo la geografia', title:'fila A', list: countries.all()});
});

// stavolta il passaggio dei dati avviene direttamente all'itnero dell'url, senza componenti di input
// per prelevarli devo utilizzare i :nazione per dire che dopo l'action capital c'è un valore
// che identifico con nazione
app.get('/capital/:nazione', function (req, res) {
  // per prelevare il dato questa volta devoo utilizzare params
  var nazione = req.params.nazione;
  // per restituire la capitale utilizzo il metodo capital:
  // countries.capital(nazione, 'name')
  res.render('es7', {message: 'impariamo la geografia', title:'fila A', capitale: countries.capital(nazione, 'name')});
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
