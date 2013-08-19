define(['backbone'], function(Backbone) {

	var PredmetiModel = Backbone.Model.extend({
		urlRoot: '/administracija/predmeti/',
		defaults: {
			naziv: 'Predmeti'
		},
		initialize: function(){
             this.fetch();
             var that = this;
             $.get('/administracija/fakulteti/lista/', function(data) {
				data = JSON.parse(data);
				that.trigger('lista', [data]);
			}).error(function() {

			});
		},
		parse: function(response){
			response.forEach(function(item){
				item.fakultetNaziv = item.fakultet._id;
				item.studijskiProgram = item.fakultet.studijskiProgram;
			});
			console.log(response);
			response = {predmeti: response};
			console.log(response);
			return response;
		}

	});

	return PredmetiModel;
});