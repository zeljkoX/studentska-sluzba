define(['backbone'], function(Backbone) {

	var FakultetInfoModel = Backbone.Model.extend({
		//urlRoot: '/administracija/fakulteti/fit/',
		initialize: function(options){
			this.url = options.urlRoot;
			console.log(this.attributes.urlRoot);
            this.fetch();
            Backbone.on('att', function(){
                 console.log(this.attributes);
             },this);
		},
		parse: function(response){
           return response[0];
		}
	});

	return FakultetInfoModel;
});