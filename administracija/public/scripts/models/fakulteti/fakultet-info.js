define(['backbone'], function(Backbone) {

	var FakultetInfoModel = Backbone.Model.extend({
		//urlRoot: '/administracija/fakulteti/fit/',
		initialize: function(options) {
			this.url = options.urlRoot;
			console.log(this.attributes.urlRoot);
			this.fetch();
			Backbone.on('att', function() {
				console.log(this.attributes);
			}, this);
		},
		parse: function(response) {
			var a = response[0].studijskiProgrami.map(function(obj) {
				var novi = {};
				novi.tekst = obj.naziv;
				novi.lokacija = Backbone.lokacija() + obj._id + '/';
				return novi;
			});
			response[0].studijskiProgrami = a;
			return response[0];
		}
	});

	return FakultetInfoModel;
});