define(['backbone'], function(Backbone) {

	var PredmetInfoModel = Backbone.Model.extend({
		initialize: function(options) {
			this.url = options.urlRoot;
			console.log(this.attributes.urlRoot);
			this.fetch();
			Backbone.on('att', function() {
				console.log(this.attributes);
			}, this);
		},
		parse: function(response) {
			return response[0];
		}
	});

	return PredmetInfoModel;
});