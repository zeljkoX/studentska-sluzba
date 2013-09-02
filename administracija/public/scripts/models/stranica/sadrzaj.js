define(['backbone'], function(Backbone) {
	var SadrzajModel = Backbone.Model.extend({
		defaults: {
			meni: [{
				'tekst': '',
				'lokacija': '',
				'aktivan': true
			}]
		}

	});
	return SadrzajModel;
});