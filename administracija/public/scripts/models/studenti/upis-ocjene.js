define(['backbone'], function(Backbone) {

	var UpisOcjeneModel = Backbone.Model.extend({
		initialize: function(options) {
			this.url = options.url;
			console.log(this.attributes.url);
			this.fetch();
			Backbone.on('att', function() {
				console.log(this.attributes);
			}, this);
		},
		parse: function(response) {
			return response[0];
		}
	});

	return UpisOcjeneModel;
});