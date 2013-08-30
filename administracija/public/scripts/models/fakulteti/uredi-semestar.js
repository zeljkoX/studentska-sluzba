define(['backbone'], function(Backbone) {

	var UrediSemestarModel = Backbone.Model.extend({
		defaults:{
			predmeti:[]
		},
		initialize: function(options){
         this.url = options.url;
         this.fetch();
         Backbone.on('att', function() {
				console.log(this.attributes);
			}, this);
		}
	});

	return UrediSemestarModel;
});