module.exports = function(app, model) {
    async = require('async');
    app.get('/studenti/', function(req, res) {
        model.studenti.Student.find({}, {}, function(err, fak) {
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

    app.get('/studenti/:id/obrisi/', function(req, res) {
        model.studenti.Student.update({
            _id: req.params.id
        }, {
            $set: {
                aktivan: 'ne'
            }
        }, {}, function(err, doc) {
            res.end('200');
        });
    });
    
    app.get('/studenti/:id/semestri/', function(req, res) {
        console.log('semestri');
        model.studenti.Student.findOne({_id: req.params.id} ,{semestri: true, _id: false}, function(err, doc){
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
                //console.log('aktivan');
                //console.log(aktivan);
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
                        if (err) console.log('greska');
                        res.end('200');
                    });
                });
                //console.log(semestar);

            });

        });

        //res.end('200');
    });
}