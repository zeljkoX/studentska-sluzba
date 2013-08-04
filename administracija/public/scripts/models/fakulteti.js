define(['backbone'], function(Backbone) {

	var Fakultet = Backbone.Model.extend({
		urlRoot: 'fakulteti',
		defaults: {
			lokacija: 'Fakulteti'
		},
		initialize: {

		}

	});

	return Fakultet;
});