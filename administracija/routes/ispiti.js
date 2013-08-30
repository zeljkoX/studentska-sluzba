module.exports = function(app, model) {

	app.get('/ispiti/', function(req, res) {
		model.ispiti.Ispit.find({
			aktivan: 'da'
		}, {
			prijave: false,
			termini: false,
			__v: false,
			prijava: false,
			aktivan: false
		}, {
			sort: {
				naziv: 1
			}
		}, function(err, ispit) {
			console.log(JSON.stringify(ispit));
			res.end(JSON.stringify(ispit));
		});

	});

	app.post('/ispiti/dodaj-ispit/', function(req, res) {
		//console.log(model.Ispit);
		var objekat = {},
		    objekatPrijave = {};
        	model.fakultet.Fakultet.find({
			aktivan: 'da'
		},{
			_id: true,
            naziv: true,
		},
		function(err, fak){
			console.log('---------');
			console.log(fak);
			console.log('---------');
         fak.forEach(function(gg){
             objekat[gg._id] = [];
             objekatPrijave[gg._id] = {};
         });
         console.log(objekatPrijave);
		model.predmeti.Predmet.find({
			aktivan: 'da'
		}, {
			naziv: true,
			sifra: true,
			fakultet: true,
			_id: false,
		}, function(err, doc) {
			doc.forEach(function(item) {
				//item.fakultet = item.fakultet._id;
				item.datum = 'd';
				item.vrijeme = 'f';
				item.lokacija = 'f';
				delete item.casovi;
				delete item.kadar;
				objekat[item.fakultet._id].push(item);
				objekatPrijave[item.fakultet._id][item.sifra] = {naziv : item.naziv};
				item.fakultet = item.fakultet._id;
				
			});
			   
			console.log(objekat);
			  //dodavanje studenti objekta u prijave zarad prijava po studentu
			var n = {prijave: objekatPrijave, 
			         studenti: {test : 'test'}}
			var a = new model.ispiti.Ispit({
				naziv: req.body.naziv,
				_id: req.body._id,
				ispitniOd: req.body.ispitniOd,
				ispitniDo: req.body.ispitniDo,
				prijavaOd: req.body.prijavaOd,
				prijavaDo: req.body.prijavaDo,
				godina: req.body.godina,
				termini: objekat,
				prijave: n
			});
			a.save(function(err) {
				if (err) return res.end('500');
				res.end('200');
			});


		});
});
	});


	app.get('/ispiti/:id/', function(req, res) {
		model.ispiti.Ispit.find({
			_id: req.params.id
		}, {
			__v: false
		}, function(err, doc) {
			console.log(JSON.stringify(doc));
			res.end(JSON.stringify(doc));
		});
	});

	app.put('/ispiti/:id/', function(req, res) {
		model.ispiti.Ispit.update({
			_id: req.params.id
		}, req.body, function(err, doc) {
			if (err) return res.end('500');
			res.end('200');
		});
	});

	app.get('/ispiti/:id/obrisi/', function(req, res) {
		model.ispiti.Ispit.update({
			_id: req.params.id
		}, {
			$set: {
				aktivan: 'ne'
			}
		}, {}, function(err, doc) {
			res.end('200');
		});
	});

	app.get('/ispiti/:id/termini/', function(req, res) {


			model.ispiti.Ispit.find({
				_id: req.params.id
			}, {
				termini: true
			}, function(err, doc) {
				res.end(JSON.stringify(doc));
			});


	});

	app.get('/ispiti/:id/prijave/', function(req, res) {
		model.ispiti.Ispit.findOne({
			_id: req.params.id
		}, {
			prijave: true
		}, function(err, doc) {
			res.end(JSON.stringify(doc));
		});
	});

	app.get('/ispiti/:id/prijave/:predmet/', function(req, res) {
		var fakultet = req.params.predmet.split('-')[0],
		    predmet = req.params.predmet.split('-')[1];
		model.ispiti.Ispit.findOne({
			_id: req.params.id
		}, {
			prijave: true
		}, function(err, doc) {
			res.end(JSON.stringify(doc.prijave.prijave[fakultet][predmet]));
		});
	});

	app.post('/ispiti/:id/termini/', function(req, res) {
     
        model.ispiti.Ispit.update({_id: req.params.id}, {$set : { termini: req.body.termini}}, function(err, doc){
           if (err) return res.end('500');
            res.end('200'); 
        });
    });
 
}

/*app.post('/ispiti/dodaj-ispit/', function(req, res) {
		//console.log(model.Ispit);
		model.predmeti.Predmet.find({
			aktivan: 'da'
		}, {
			naziv: true,
			sifra: true,
			fakultet: true,
			_id: false,
		}, function(err, doc) {
			doc.forEach(function(item) {
				item.fakultet = item.fakultet._id;
				item.datum = 'd';
				item.vrijeme = 'f';
				item.lokacija = 'f';
				delete item.casovi;
				delete item.kadar;
			});
			console.log(doc);
			var a = new model.ispiti.Ispit({
				naziv: req.body.naziv,
				_id: req.body._id,
				ispitniOd: req.body.ispitniOd,
				ispitniDo: req.body.ispitniDo,
				prijavaOd: req.body.prijavaOd,
				prijavaDo: req.body.prijavaDo,
				godina: req.body.godina,
				termini: doc
			});
			a.save(function(err) {
				if (err) return res.end('500');
				res.end('200');
			});


		});
	});


		model.fakultet.Fakultet.find({
			aktivan: 'da'
		},{
			_id: true,
            naziv: true,
		},
		function(err, fak){

	*/