define(['backbone'], function(Backbone) {

	var DodajSemestarModel = Backbone.Model.extend({
		defaults: {
			predmeti: []
		},
		initialize: function(options){
         this.url = options.url;
           Backbone.on('att', function() {
				console.log(this.attributes);
			}, this);
		}
	});

	return DodajSemestarModel;
});