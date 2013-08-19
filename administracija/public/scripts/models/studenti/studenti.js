define(['backbone'], function(Backbone) {

	var StudentiModel = Backbone.Model.extend({
		urlRoot: '/administracija/studenti/',
		defaults: {
			naziv: 'Studenti'
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
			console.log(response);
			response.forEach(function(item){
				item.imeIprezime = item.ime + ' ' + item.prezime;
			});
			response = {studenti: response};
			console.log(response);
			return response;
		}

	});

	return StudentiModel;
});