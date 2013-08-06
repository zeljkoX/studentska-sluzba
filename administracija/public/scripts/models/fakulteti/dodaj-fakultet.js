define(['backbone'], function(Backbone) {

	var DodajFakultetModel = Backbone.Model.extend({
		urlRoot: '/administracija/fakulteti/dodaj-fakultet/',
		defaults: {
		},
		initialize: function(){
       
		}
	});

	return DodajFakultetModel;
});