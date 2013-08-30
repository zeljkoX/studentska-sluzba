define(['backbone'], function(Backbone) {

	var IspitInfoModel = Backbone.Model.extend({
		initialize: function(options) {
			this.url = options.urlRoot;
			console.log(this.attributes.urlRoot);
			this.fetch();
			Backbone.on('att', function() {
				console.log(this.attributes);
			}, this);
		},
		parse: function(response) {
			response[0].prijavaDo = ((new Date(response[0].prijavaDo).toLocaleString()).split(' '))[0];	
			response[0].prijavaOd = ((new Date(response[0].prijavaOd).toLocaleString()).split(' '))[0];	
			response[0].ispitniDo = ((new Date(response[0].ispitniDo).toLocaleString()).split(' '))[0];	
			response[0].ispitniOd = ((new Date(response[0].ispitniOd).toLocaleString()).split(' '))[0];	
			return response[0];
		}
	});

	return IspitInfoModel;
});