define(['backbone'], function(Backbone) {

	var StudijskiProgram = Backbone.Model.extend({
		defaults: {
		},
		initialize: function(options){
            this.url = options.url;
            console.log(this.url);
            this.fetch();
		}
	});

	return StudijskiProgram;
});