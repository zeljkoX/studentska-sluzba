module.exports = function(app, model){

app.get('/student',function(req, res){
	console.log('pozdrav korisnice');
	model.Student.create({index:'66666', licniPodaci:{ime:'Zeljko'}});
	a.save(function(){});
	res.send(200);
});

}