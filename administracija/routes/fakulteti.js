module.exports = function(app, model){

app.get('/fakulteti/',function(req, res){
	model.Fakultet.find({},{naziv: true, skracenica: true, _id: false},function(err, fak){
     res.end(JSON.stringify(fak));
	});
	
});

app.post('/fakulteti/dodaj-fakultet/',function(req, res){
    	var a = new model.Fakultet({_id: req.body.skracenica, naziv: req.body.naziv, skracenica: req.body.skracenica, dekan: req.body.dekan, opis: req.body.opis});
    	a.save(function(err){
    		if(err)
    		console.log('greska pri unosu u db');
    	});

});

app.get('/fakulteti/:id/',function(req, res){
	console.log(req.params.id);
	model.Fakultet.find({_id : req.params.id},{__v: false},function(err, doc){
		console.log(JSON.stringify(doc));
        res.end(JSON.stringify(doc));
	});
});
}