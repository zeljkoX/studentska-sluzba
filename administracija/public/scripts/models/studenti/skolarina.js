define(['backbone'], function(Backbone) {
	var SkolarinaModel = Backbone.Model.extend({
		initialize: function(options) {
			this.url = options.url;
			this.fetch();
			Backbone.on('att', function(){
				console.log(this.attributes);
			},this);
		}
	});

	return SkolarinaModel;
});