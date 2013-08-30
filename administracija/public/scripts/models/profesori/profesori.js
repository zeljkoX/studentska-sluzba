define(['backbone'], function(Backbone) {

	var ProfesoriModel = Backbone.Model.extend({
		urlRoot: '/administracija/profesori/',
		defaults: {
			naziv: 'Profesori'
		},
		initialize: function(){
			var that = this;
             this.fetch();
             $.get('/administracija/fakulteti/lista/', function(data) {
				data = JSON.parse(data);
				that.trigger('lista', [data]);
			}).error(function() {

			});
			Backbone.on('att', function(){
				console.log(this.attributes);
			},this);

		},
		parse: function(response){
			response.forEach(function(item){
				item.imeIprezime = item.ime + ' ' + item.prezime;
			});
			response = {profesori: response};
			console.log(response);
			return response;

	}
});

	return ProfesoriModel;
});