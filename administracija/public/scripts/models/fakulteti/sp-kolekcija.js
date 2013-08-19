define(['backbone', 'fakultetiM/semestar'], function(Backbone, Semestar) {

	var StudijskiProgram = Backbone.Collection.extend({
		model: Semestar,
		defaults: {
		},
		initialize: function(){
        
		}
	});

	return StudijskiProgram;
});