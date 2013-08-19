define(['backbone'], function(Backbone) {
	var StudentSemestarModel = Backbone.Model.extend({
		initialize: function(options) {
			this.url = options.url;
			this.fetch();
			Backbone.on('att', function(){
				console.log(this.attributes);
			},this);
		}
	});

	return StudentSemestarModel;
});