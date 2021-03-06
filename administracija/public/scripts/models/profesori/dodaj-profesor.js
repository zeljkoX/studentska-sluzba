define(['backbone'], function(Backbone) {

	var DodajProfesorModel = Backbone.Model.extend({
		urlRoot: '/administracija/profesori/dodaj-profesor/',
		defaults: {},
		initialize: function() {
			that = this;
			$.get('/administracija/fakulteti/lista/', function(data) {
				data = JSON.parse(data);
				that.trigger('lista', [data]);
			}).error(function() {

			});
		}
	});

	return DodajProfesorModel;
});