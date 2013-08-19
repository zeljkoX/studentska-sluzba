module.exports = function(app, model) {



    app.get('/fakulteti/', function(req, res) {
        model.Fakultet.find({
            aktivan: 'da'
        }, {
            naziv: true,
            skracenica: true,
            _id: false
        }, function(err, fak) {
            console.log(JSON.stringify(fak));
            res.end(JSON.stringify(fak));
        });

    });

    app.post('/fakulteti/dodaj-fakultet/', function(req, res) {
        var a = new model.Fakultet({
            _id: req.body.skracenica,
            naziv: req.body.naziv,
            skracenica: req.body.skracenica,
            dekan: req.body.dekan,
            opis: req.body.opis
        });
        a.save(function(err) {
            if (err) return res.end('500');
            res.end('200');
        });

    });
    app.post('/fakulteti/:id/', function(req, res) {
        model.Fakultet.findOne({
            _id: req.body.skracenica
        }, function(err, doc) {
            doc.naziv = req.body.naziv;
            doc.dekan = req.body.dekan;
            doc.opis = req.body.opis;

            doc.save(function(err) {
                if (err) return res.end('500');
                res.end('200');
            });
        });
    });


    app.get('/fakulteti/lista/', function(req, res) {
        model.Fakultet.find({
            aktivan: 'da'
        }, {
            _id: true,
            naziv: true,
            studijskiProgrami: true
        }, function(err, doc) {
            doc.forEach(function(fakultet) {
                fakultet.studijskiProgrami.forEach(function(sp) {
                    sp.semestri = undefined;
                });
            });
            console.log(JSON.stringify(doc));
            res.end(JSON.stringify(doc));
        });
    });


    app.get('/fakulteti/:id/', function(req, res) {
        model.Fakultet.find({
            _id: req.params.id
        }, {
            __v: false
        }, function(err, doc) {
            res.end(JSON.stringify(doc));
        });
    });


    app.post('/fakulteti/:id/dodaj-sp/', function(req, res) {
        console.log('post dodaj sp');
        var a = new model.Program({
            _id: req.body.sifra,
            naziv: req.body.naziv
        });
        console.log(a);
        model.Fakultet.update({
            _id: req.params.id
        }, {
            $addToSet: {
                studijskiProgrami: a
            }
        }, function(err, doc) {
            console.log(JSON.stringify(doc));
            res.end(JSON.stringify(doc));
        });

    });
    app.get('/fakulteti/:id/obrisi/', function(req, res) {
        model.Fakultet.update({
            _id: req.params.id
        }, {
            $set: {
                aktivan: 'ne'
            }
        }, {}, function(err, doc) {
            res.end('200');
        });
    });

    app.get('/fakulteti/:id/:sp/', function(req, res) {
        model.Fakultet.findOne({
            _id: req.params.id
        }, {
            studijskiProgrami: true
        }, function(err, doc) {
            doc.studijskiProgrami.forEach(function(stavka) {
                if (stavka._id == req.params.sp) {
                    res.end(JSON.stringify(stavka));
                    console.log(stavka);
                }
            });
        });
    });

    app.post('/fakulteti/:id/:sp/dodaj-semestar/', function(req, res) {
        console.log('post dodaj semestar');
        var a = new model.Semestar({
            _id: req.body._id,
            predmeti: req.body.predmeti
        });
        model.Fakultet.findOne({
            _id: req.params.id
        }, function(err, doc) {
            doc.studijskiProgrami.forEach(function(stavka) {
                if (stavka._id == req.params.sp) {
                    stavka.semestri.push(a);
                }
            });
            doc.save(function(err) {
                if (err) {
                    console.error('ERROR!');
                }
                res.end('200');
            });
        });

    });

    app.get('/fakulteti/:id/:sp/:br/', function(req, res) {
        console.log('get uredi semestar');
        model.Fakultet.findOne({
            _id: req.params.id
        }, function(err, doc) {
            doc.studijskiProgrami.forEach(function(stavka) {
                if (stavka._id == req.params.sp) {
                    stavka.semestri.forEach(function(semestar) {
                        if (semestar._id == req.params.br) {
                            res.end(JSON.stringify(semestar));
                        }
                    });
                }
            });

        });

    });

    app.post('/fakulteti/:id/:sp/:br/', function(req, res) {
        console.log('get uredi semestar');
        model.Fakultet.findOne({
            _id: req.params.id
        }, function(err, doc) {
            doc.studijskiProgrami.forEach(function(stavka) {
                if (stavka._id == req.params.sp) {
                    stavka.semestri.forEach(function(semestar) {
                        if (semestar._id == req.params.br) {
                            semestar._id = req.body._id;
                            semestar.predmeti = req.body.predmeti;
                        }
                    });
                }
            });
            doc.save(function(err) {
                if (err) {
                    console.error('ERROR!');
                }
                res.end('200');
            });

        });

    });

}