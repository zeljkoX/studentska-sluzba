module.exports = function(app, model) {
     var upis = require('../upis');

    var arhiva = function() {
        model.Predmet.find({
            aktivan: 'da'
        }, {
            naziv: true,
            sifra: true,
            fakultet: true
        }, function(err, doc) {
            var objekat = doc.map(function(item){
                return {
                name : item.naziv + ' - '+item.fakultet._id,
                value: item.naziv + ' - '+item.fakultet._id,
                kategorija :'Predmeti',
                lokacija  : '/predmeti/'+ item.sifra +'/',
                tokens : [item.naziv, item.sifra]
                }
            });

            upis.upisiFajl({
                data: JSON.stringify(objekat),
                datoteka: 'profesori.json'
            });
        });
    };

    app.get('/predmeti/', function(req, res) {
        model.Predmet.find({aktivan: 'da'}, {
            naziv: true,
            sifra: true,
            fakultet: true,
            _id: false
        }, function(err, fak) {
            console.log(JSON.stringify(fak));
            res.end(JSON.stringify(fak));
        });

    });

    app.post('/predmeti/dodaj-predmet/', function(req, res) {
        var a = new model.Predmet({
            naziv: req.body.naziv,
            sifra: req.body.sifra,
            status: req.body.status,
            bodovi: req.body.bodovi,
            profesor: req.body.profesor,
            asistent: req.body.asistent,
            fakultet: {
                naziv: req.body.fakultet.naziv,
                _id: req.body.fakultet._id,
                studijskiProgram: req.body.studijskiProgram
            },
            casovi: {
                predavanja: req.body.casovi.predavanja,
                vjezbe: req.body.casovi.vjezbe
            },
            opis: req.body.opis
        });
        console.log(a);
        a.save(function(err) {
            if (err) return res.end('500');
            res.end('200');
            arhiva();
        });

    });


    app.get('/predmeti/:id/', function(req, res) {
        model.Predmet.find({
            sifra: req.params.id
        }, {
            __v: false
        }, function(err, doc) {
            console.log(JSON.stringify(doc));
            res.end(JSON.stringify(doc));
        });
    });

    app.put('/predmeti/:id/', function(req, res) {
        
        var id = req.body._id;
        delete req.body._id;
        console.log(req.body);
        model.Predmet.update({_id: id}, req.body, function(err, doc){
           if (err) return res.end('500');
            res.end('200'); 
        });
    });
  app.get('/predmeti/:id/obrisi/', function(req, res) {
        model.Predmet.update({sifra: req.params.id}, {$set:{aktivan: 'ne'}}, {},function(err, doc){
            res.end('200');
            arhiva();
        });
    });
}