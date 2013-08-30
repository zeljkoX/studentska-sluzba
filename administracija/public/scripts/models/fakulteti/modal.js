define(['backbone'], function(Backbone) {

	var ModalModel = Backbone.Model.extend({
		defaults: {
		},
		initialize: function(options){
            this.url = options.url;
            this.fetch();
            Backbone.on('att', function() {
				console.log(this.attributes);
			}, this);
		},
		parse: function(response){
			var kolone;
			kolone = ['naziv','sifra'];
            response = {podaci: response, kolone: kolone};
			return response;
		}
	});

	return ModalModel;
});