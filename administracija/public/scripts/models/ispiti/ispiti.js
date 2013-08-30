define(['backbone'], function(Backbone) {

	var IspitiModel = Backbone.Model.extend({
		urlRoot: '/administracija/ispiti/',
		defaults: {
			naziv: 'Ispiti'
		},
		initialize: function(){
             this.fetch();
             Backbone.on('att', function(){
             	console.log(this.attributes);
             },this)
		},
		parse: function(response){
			response.forEach(function(res){
			res.prijavaDo = ((new Date(res.prijavaDo).toLocaleString()).split(' '))[0];	
			res.prijavaOd = ((new Date(res.prijavaOd).toLocaleString()).split(' '))[0];	
			res.ispitniDo = ((new Date(res.ispitniDo).toLocaleString()).split(' '))[0];	
			res.ispitniOd = ((new Date(res.ispitniOd).toLocaleString()).split(' '))[0];	
			});
			
			response = {ispiti: response};
			return response;
		}

	});

	return IspitiModel;
});