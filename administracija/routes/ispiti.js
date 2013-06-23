module.exports = function(app, model){

app.get('/users',function(req, res){
	console.log('pozdrav korisnice');
	res.send(200);
});

}