define(['backbone'], function(Backbone) {
	var NaslovModel = Backbone.Model.extend({
		defaults: {
			naslov: ''
		},
		initialize: function() {
			Backbone.on('naslov', function(options) {
				this.set({
					naslov: options[0]
				});
			}, this);
		}
	});
	return NaslovModel;
});