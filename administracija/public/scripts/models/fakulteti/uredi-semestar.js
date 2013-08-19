define(['backbone'], function(Backbone) {

	var UrediSemestarModel = Backbone.Model.extend({
		initialize: function(options){
         this.url = options.url;
         this.fetch();
		}
	});

	return UrediSemestarModel;
});