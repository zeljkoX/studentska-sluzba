define(['backbone'], function(Backbone) {

	var DodajStudentModel = Backbone.Model.extend({
		urlRoot: '/administracija/studenti/dodaj-student/',
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

	return DodajStudentModel;
});