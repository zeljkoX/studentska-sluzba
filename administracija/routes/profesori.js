module.exports = function(app, model) {
    var upis = require('../upis');

    var arhiva = function() {
        model.Profesor.find({
            aktivan: 'da'
        }, {
            ime: true,
            prezime: true,
            jmbg: true,
            fakultet: true
        }, function(err, doc) {
            var objekat = doc.map(function(item){
                return {
                name : item.ime +' '+ item.prezime,
                value: item.ime +' '+ item.prezime,
                kategorija :'Profesori',
                lokacija  : '/profesori/'+ item.jmbg +'/',
                tokens : [item.ime, item.prezime]
                }
            });

            upis.upisiFajl({
                data: JSON.stringify(objekat),
                datoteka: 'profesori.json'
            });
        });
    };


    app.get('/profesori/', function(req, res) {
        model.Profesor.find({
            aktivan: 'da'
        }, {}, function(err, fak) {
            console.log(JSON.stringify(fak));
            res.end(JSON.stringify(fak));
        });

    });

    app.get('/profesori/lista/', function(req, res) {
        model.Profesor.find({
            aktivan: 'da'
        }, {
            _id: false,
            titula: false,
            mjesto: false,
            ulica: false,
            telefon: false,
            email: false,
            __v: false,
            aktivan: false,
        }, {
            sort: {
                ime: 1,
                prezime: 1,
                fakultet: 1
            }
        }, function(err, fak) {
            console.log(JSON.stringify(fak));
            res.end(JSON.stringify(fak));
        });

    });

    app.post('/profesori/dodaj-profesor/', function(req, res) {
        console.log(model.Profesor);
        var a = new model.Profesor({
            ime: req.body.ime,
            prezime: req.body.prezime,
            titula: req.body.titula,
            jmbg: req.body.jmbg,
            fakultet: req.body.fakultet,
            mjesto: req.body.mjesto,
            ulica: req.body.ulica,
            telefon: req.body.telefon,
            email: req.body.email
        });
        console.log(a);
        a.save(function(err) {
            if (err) return res.end('500');
            res.end('200');
            arhiva();
        });

    });

    app.get('/profesori/:id/', function(req, res) {
        model.Profesor.find({
            jmbg: req.params.id
        }, {
            __v: false
        }, function(err, doc) {
            console.log(JSON.stringify(doc));
            res.end(JSON.stringify(doc));
        });
    });

    app.get('/profesori/:id/obrisi/', function(req, res) {
        model.Profesor.update({
            jmbg: req.params.id
        }, {
            $set: {
                aktivan: 'ne'
            }
        }, {}, function(err, doc) {
            res.end('200');
            arhiva();
        });
    });

    app.put('/profesori/:id/', function(req, res) {
        model.Profesor.update({
            jmbg: req.params.id
        }, req.body, function(err, doc) {
            if (err) return res.end('500');
            res.end('200');
            arhiva();
        });
    });

}