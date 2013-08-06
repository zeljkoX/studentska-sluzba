define(['backbone'], function(Backbone) {
	var SadrzajModel = Backbone.Model.extend({
		initialize: function(){
			
		},
		defaults: {
			meni: [{
				'tekst': 'Osnovne Informacije',
				'lokacija': 'osnovne/',
				'aktivan' : true
			}, {
				'tekst': 'Dodatne Informacije',
				'lokacija': 'dodatne/'
			}]
		}

	});
	return SadrzajModel;
});