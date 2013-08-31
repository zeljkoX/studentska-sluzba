define(['backbone'], function(Backbone) {

	var FakultetiModel = Backbone.Model.extend({
		urlRoot: '/administracija/fakulteti/',
		defaults: {
			naziv: 'Fakulteti'
		},
		initialize: function(){
             this.fetch();
              Backbone.on('att', function() {
				console.log(this.attributes);
			}, this);
		},
		parse: function(response){
			//this.set({fakulteti:[response]});
			response = {fakulteti: response};
			return response;
		}

	});

	return FakultetiModel;
});