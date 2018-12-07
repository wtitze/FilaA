/*eslint-env node*/

var express = require('express');
var app = express();

// var countries = require('countryjs');
var MongoClient = require('mongodb').MongoClient;


app.set('views', './views');
app.set('view engine', 'pug');

app.get('/', function (req, res) {
  // res.render('es6', {message: 'impariamo la geografia', title:'fila A', list: countries.all()});
  
  MongoClient.connect('mongodb+srv://admin:MwbZUn1JUfbuRoSK@galvani-c4mon.mongodb.net/?retryWrites=true,{useNewUrlParser: true}', function(err, db) {
      if (err) {
        throw err;
      }
      var dbo = db.db("5E");
      dbo.collection("Countries").find().toArray(function(err, result) {
        if (err) {
          throw err;
        }
        res.render('es6', {message: 'impariamo la geografia', title:'fila A', list: result});
        db.close();
      });
  });
  
});

app.get('/json', function (req, res) {
  // res.send(countries.all());
  MongoClient.connect('mongodb+srv://admin:MwbZUn1JUfbuRoSK@galvani-c4mon.mongodb.net/?retryWrites=true,{useNewUrlParser: true}', function(err, db) {
      if (err) {
        throw err;
      }
      var dbo = db.db("5E");
      dbo.collection("Countries").find().toArray(function(err, result) {
        if (err) {
          throw err;
        }
        res.send(result);
        db.close();
      });
  });
});

app.get('/capital/:nazione', function (req, res) {
  var nazione = req.params.nazione;
  // res.render('es7', {message: 'impariamo la geografia', title:'fila A', capitale: countries.capital(nazione, 'name')});
  
  MongoClient.connect('mongodb+srv://admin:MwbZUn1JUfbuRoSK@galvani-c4mon.mongodb.net/?retryWrites=true,{useNewUrlParser: true}', function(err, db) {
      if (err) {
        throw err;
      }
      var dbo = db.db("5E");
      dbo.collection("Countries").find({name: nazione}).toArray(function(err, result) {
        if (err) {
          throw err;
        }
        res.render('es7', {message: 'impariamo la geografia', title:'fila A', capitale: result[0].capital});
        db.close();
      });
  });

});

app.get('/states/:nazione', function (req, res) {
  var nazione = req.params.nazione;
  // res.render('es8', {message: 'impariamo la geografia', title:'fila A', stati: countries.states(nazione, 'name')});

  MongoClient.connect('mongodb+srv://admin:MwbZUn1JUfbuRoSK@galvani-c4mon.mongodb.net/?retryWrites=true,{useNewUrlParser: true}', function(err, db) {
      if (err) {
        throw err;
      }
      var dbo = db.db("5E");
      dbo.collection("Countries").find({name: nazione}).toArray(function(err, result) {
        if (err) {
          throw err;
        }
        console.log(result);
        res.render('es8', {message: 'impariamo la geografia', title:'fila A', stati: result[0].provinces});
        db.close();
      });
  });
  
});

app.get('/informazioni', function (req, res) {
  res.render('es2', {message: 'impariamo la geografia', title:'fila A'});
});

app.get('/info', function (req, res) { //relativo ad informazioni
  var nazione = req.query.nazione;
  var info = req.query.info;
  MongoClient.connect('mongodb+srv://admin:MwbZUn1JUfbuRoSK@galvani-c4mon.mongodb.net/?retryWrites=true,{useNewUrlParser: true}', function(err, db) {
      if (err) {
        throw err;
      }
      var dbo = db.db("5E");
      dbo.collection("Countries").find({name: nazione}).toArray(function(err, result) {
        if (err) {
          throw err;
        }
        console.log(result);
        if (info == 'capitale' ) {
            // res.render('es3', {message: countries.info(nazione, 'name').capital, title:'capitale'});
            res.render('es3', {message: result[0].capital, title:'capitale'});
        }
        else
        {
            // // res.render('es3', {message: countries.info(nazione, 'name').population, title:'popolazione'});
            res.render('es3', {message: result[0].population, title:'popolazione'});
        }
        db.close();
      });
  });  
});

// esempio di aggregate
// visualizzazione dei continenti con il totale della popolazione
// elenco ordinato in ordine decrescente sulla popolazione

app.get('/contPop', function (req, res) {
    MongoClient.connect('mongodb+srv://admin:MwbZUn1JUfbuRoSK@galvani-c4mon.mongodb.net/?retryWrites=true,{useNewUrlParser: true}', function(err, db) {
      if (err) {
        throw err;
      }
      var dbo = db.db("5E");
      dbo.collection("Countries").aggregate(
        [
          {
            '$group': {
              '_id': '$region', 
              'numero': {'$sum': '$population'}
            }
          }, 
          {
            '$match': {
              '_id': {'$nin': [null, '']}
            }
          }, 
          {
            '$sort': {
                'numero': -1
            }
          }
        ]
      ).toArray(function(err, result) {
        if (err) {
          throw err;
        }
        console.log(result);
        res.render('contPop', {message: 'impariamo la geografia', title:'popolazione totale dei vari continenti', list: result});
        db.close();
      });
  });  
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
