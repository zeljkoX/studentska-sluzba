define(['backbone'], function(Backbone) {

	var DodajIspitModel = Backbone.Model.extend({
		urlRoot: '/administracija/ispiti/dodaj-ispit/',
		defaults: {},
		initialize: function() {
		}
	});

	return DodajIspitModel;
});