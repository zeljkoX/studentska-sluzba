module.exports = function(app, model){

app.get('/student',function(req, res){
	console.log('pozdrav korisnice');
	var a = new model({index:'3243423', licniPodaci:{ime:'Zeljko'}});
	a.save(function(){});
	res.send(200);
});

}