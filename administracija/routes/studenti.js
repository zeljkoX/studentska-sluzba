module.exports = function(app, model) {
    var upis = require('../upis');

    var arhiva = function() {
        model.studenti.Student.find({
            aktivan: 'da'
        }, {
            ime: true,
            prezime: true,
            _id: true,
            fakultet: true
        }, function(err, doc) {
            var objekat = doc.map(function(item) {
                return {
                    name: item.ime + ' ' + item.prezime + ' - ' + item._id,
                    value: item.ime + ' ' + item.prezime + ' - ' + item._id,
                    kategorija: 'Studenti',
                    lokacija: '/studenti/' + item._id + '/',
                    tokens: [item.ime, item.prezime, item._id]
                }

            });
            console.log(objekat);

            upis.upisiFajl({
                data: JSON.stringify(objekat),
                datoteka: 'studenti.json'
            });
        });
    };
    app.get('/studenti/', function(req, res) {
        model.studenti.Student.find({aktivan: 'da'}, {}, function(err, fak) {
            console.log(JSON.stringify(fak));
            res.end(JSON.stringify(fak));
        });

    });

    app.post('/studenti/dodaj-student/', function(req, res) {
        var a = new model.studenti.Student({
            ime: req.body.ime,
            prezime: req.body.prezime,
            imeRoditelja: req.body.imeRoditelja,
            jmbg: req.body.jmbg,
            fakultet: req.body.fakultet,
            studijskiProgram: req.body.studijskiProgram,
            mjesto: req.body.mjesto,
            ulica: req.body.ulica,
            _id: req.body._id,
            telefon: req.body.telefon,
            email: req.body.email,
            sifra: req.body.sifra,
            godina: req.body.godina
        });
        console.log(a);
        a.save(function(err) {
            if (err) return res.end('500');
            arhiva();
            res.end('200');
        });

    });

    app.get('/studenti/:id/', function(req, res) {
        model.studenti.Student.find({
            _id: req.params.id
        }, {
            __v: false
        }, function(err, doc) {
            console.log(JSON.stringify(doc));
            res.end(JSON.stringify(doc));
        });
    });
   app.put('/studenti/:id/', function(req, res) {
        
        var id = req.body._id;
        delete req.body._id;
        console.log(req.body);
        model.studenti.Student.update({_id: id}, req.body, function(err, doc){
           if (err) return res.end('500');
            res.end('200'); 
        });
    });
    app.get('/studenti/:id/obrisi/', function(req, res) {
        model.studenti.Student.update({
            _id: req.params.id
        }, {
            $set: {
                aktivan: 'ne'
            }
        }, {}, function(err, doc) {
            res.end('200');
            arhiva();
        });
    });

    app.get('/studenti/:id/semestri/', function(req, res) {
        console.log('semestri');
        model.studenti.Student.findOne({
            _id: req.params.id
        }, {
            semestri: true,
            _id: false
        }, function(err, doc) {
            if (err) return res.end('500');
            res.end(JSON.stringify(doc));
        });
    });



    app.get('/studenti/:id/semestri/aktiviraj/', function(req, res) {
        var aktivan = 0,
            fakultet = 'ddddddddd',
            sp = 'ddddddddddd',
            semestar = [],
            semestri = [];

        model.studenti.Student.findOne({
            _id: req.params.id
        }, function(err, doc) {
            aktivan = doc.aktivanSemestar + 1;
            fakultet = doc.fakultet;
            sp = doc.studijskiProgram;

            model.fakultet.Fakultet.findOne({
                _id: fakultet
            }, function(err, doc) {
                doc.studijskiProgrami.forEach(function(stavka) {
                    if (stavka._id = sp) {
                        semestri = stavka.semestri;

                    }
                });
                semestri.forEach(function(stavka) {
                    if (stavka._id == aktivan)
                        semestar = stavka;
                });

                model.studenti.Student.findOne({
                    _id: req.params.id
                }, function(err, doc) {
                    console.log(doc);
                    doc.semestri.push(semestar);
                    doc.aktivanSemestar = aktivan;
                    doc.save(function(err) {
                        if (err) return res.end('500');
                        res.end('200');
                    });
                });
                //console.log(semestar);

            });

        });

        //res.end('200');
    });


    app.get('/studenti/:id/semestri/:predmet/', function(req, res) {
        model.predmeti.Predmet.find({
            sifra: req.params.predmet
        }, {
            naziv: true,
            sifra: true
        }, function(err, doc) {
            console.log(doc);
            res.end(JSON.stringify(doc));

        });
    });
    app.post('/studenti/:id/semestri/:predmet/', function(req, res) {
        model.studenti.Student.findOne({
            _id: req.params.id
        }, function(err, doc) {
            delete req.body.url;
            doc.semestri = doc.semestri.map(function(item) {
                var p = item.predmeti.map(function(stavka) {
                    if (stavka.sifra == req.params.predmet) {
                        stavka.ocjena = req.body;
                    }
                    return stavka;
                });
                item.predmeti = p;
                return item;
            });

            console.log(JSON.stringify(doc));
            model.studenti.Student.update({
                _id: req.params.id
            }, {
                semestri: doc.semestri
            }, function(err, numAffected) {
                if (err) return res.end('500');
                res.end('200');
            });
        });
    });
}