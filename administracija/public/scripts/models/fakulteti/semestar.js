define(['backbone'], function(Backbone) {

	var DodajSemestarModel = Backbone.Model.extend({
		defaults: {
			predmeti: []
		},
		initialize: function(options){
         this.url = options.url;
		}
	});

	return DodajSemestarModel;
});