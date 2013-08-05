module.exports = function(app, model){

app.get('/fakulteti/',function(req, res){
	console.log('pfakulteti');
	res.send(200);
	//res.json({'polako': 'polako'});
});

}