define(['backbone'], function(Backbone) {
	var SadrzajView = Backbone.Model.extend({
		defaults: {
			meni: [{
				'naziv': 'Osnovne Informacije',
				'link': 'osnovne/',
			}, {
				'naziv': 'Dodatne Informacije',
				'link': 'dodatne/',
				'aktivan': 'true'
			}]
		}

	});
	return SadrzajView;
});