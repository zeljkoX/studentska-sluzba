define(['backbone'], function(Backbone) {

	var FakultetiModel = Backbone.Model.extend({
		urlRoot: 'dfsdf/',
		defaults: {
			naziv: 'Fakulteti'
		},
		initialize: function(){
             this.fetch();
		}

	});

	return FakultetiModel;
});