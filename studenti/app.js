var express = require('express'),
  routes = require('./routes'),
  user = require('./routes/user'),
  path = require('path'),
  mongoose = require('mongoose');


var baza = 'mongodb://localhost/studentska-sluzba';
//var s = mongoose.model("Student");

var app = module.exports = express();

/*app.use(function(req ,res ,next){
  console.log(req.session.tip);
  next();
  if(req.session && req.session.loggedIn && req.session.tip =='student'){
    next();
}else{
  res.redirect('/');
  });
}*/

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'hjs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/:id/', function(req, res) {
  var datum = new Date();
  mongoose.models.Ispit.find({
    aktivan: 'da',
    prijavaOd: {
      $lte: datum
    },
    prijavaDo: {
      $gte: datum
    }
  }, function(err, ispit) {
    console.log(ispit);
    mongoose.models.Student.findOne({
      aktivan: 'da',
      _id: req.params.id
    }, function(err, doc) {
      console.log(doc);
      if (ispit[0]) {
        doc.ispit = true;
      }
      doc.polozeno = 0;
      doc.nepolozeno = 0;
      doc.prosjek = 0;
      doc.semestri.forEach(function(item) {
        item.predmeti.forEach(function(stavka) {
          if (!stavka.ocjena) {
            doc.nepolozeno++;
          } else {
            doc.polozeno++;
            doc.prosjek += parseInt(stavka.ocjena.ocjena, 10);
          }
        });

      });

      doc.prosjek = doc.prosjek / doc.polozeno;

      res.render('index', doc)
    });

  });

});
app.get('/:id/ispiti/', function(req, res) {
  var datum = new Date();
  mongoose.models.Ispit.find({
    aktivan: 'da',
    prijavaOd: {
      $lte: datum
    },
    prijavaDo: {
      $gte: datum
    }
  }, function(err, ispit) {

    mongoose.models.Student.findOne({
      aktivan: 'da',
      _id: req.params.id
    }, function(err, doc) {
      var objekat = {};
      ispit.forEach(function(stavka) {
        stavka.termini[doc.fakultet].forEach(function(item) {
          objekat[item.sifra] = {
            datum: item.datum,
            vrijeme: item.vrijeme,
            lokacija: item.lokacija
          }
        });
      });
      doc.semestri = doc.semestri.map(function(item) {
        var p = item.predmeti.map(function(stavka) {

          stavka.termin = objekat[stavka.sifra];

          return stavka;
        });
        item.predmeti = p;
        return item;
      });
      console.log(objekat);
      console.log(ispit);
      ispit.student = doc;

      console.log(ispit);
      res.render('ispiti.hjs', {
        ispiti: ispit
      });

    });
  });
});

app.post('/:id/ispiti/:rok/', function(req, res) {
  var datum = new Date();
  mongoose.models.Ispit.findOne({
    _id: req.params.rok
  }, function(err, ispit) {

    mongoose.models.Student.findOne({
      _id: req.params.id
    }, function(err, doc) {
      console.log(req.body);
      req.body.predmeti.forEach(function(item) {
        console.log(item);
        console.log(ispit);
        if ((!ispit.prijave.prijave[doc.fakultet][item.sifra][doc._id]) && (item.value == 'true')) {
          ispit.prijave.prijave[doc.fakultet][item.sifra][doc._id] = {naziv : doc.ime +' '+doc.prezime };
          return;
        }
        if ((ispit.prijave.prijave[doc.fakultet][item.sifra][doc._id]) && (item.value == 'false')) {
          delete ispit.prijave.prijave[doc.fakultet][item.sifra][doc._id];
          return;
        }
        ispit.prijave.studenti[doc._id] = req.body.predmeti;

      });
      /*ispit.save(function(err){
      if(err) console.log('ERRR');
    });*/
      mongoose.models.Ispit.update({
        _id: req.params.rok
      }, {
        prijave: ispit.prijave
      }, function(err, doc) {
        if (err) return res.end('500');
        res.end('200');
      });

    });

  });


});

app.get('/:id/ispiti/:rok/prijavljeni/', function(req, res) {
  var datum = new Date();
  mongoose.models.Ispit.findOne({
    _id: req.params.rok
  }, function(err, ispit) {
   var objekat = {rok : req.params.rok, prijave : ispit.prijave.studenti[req.params.id] };
    if (ispit.prijave.studenti[req.params.id] == undefined) {
      res.end('204');
    } else {
      res.end(JSON.stringify(objekat));
    }

  });

});

app.get('/:id/info/', function(req, res) {
  mongoose.models.Student.findOne({
    aktivan: 'da',
    _id: req.params.id
  }, function(err, doc) {
    res.render('info.hjs', doc);
  });
});


app.post('/:id/info/', function(req, res) {

  mongoose.models.Student.update({
    _id: req.params.id
  }, req.body, function(err, doc) {
    if (err) return res.end('500');
    res.end('200');
  });

});