define(['backbone'], function(Backbone) {

	var DodajPredmetModel = Backbone.Model.extend({
		urlRoot: '/administracija/predmeti/dodaj-predmet/',
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

	return DodajPredmetModel;
});