define(['backbone'], function(Backbone) {

	var StudentInfoModel = Backbone.Model.extend({
		initialize: function(options) {
			this.url = options.urlRoot;
			console.log(this.attributes.urlRoot);
			this.fetch();
			Backbone.on('att', function() {
				console.log(this.attributes);
			}, this);
		},
		parse: function(response) {
			response[0].imeIprezime = response[0].ime + ' ' + response[0].prezime;
			return response[0];
		}
	});

	return StudentInfoModel;
});