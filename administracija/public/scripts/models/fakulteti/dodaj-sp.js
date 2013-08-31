define(['backbone'], function(Backbone) {

	var DodajSPModel = Backbone.Model.extend({
		defaults: {
		},
		initialize: function(options){
            this.url = options.url;
		}
	});

	return DodajSPModel;
});