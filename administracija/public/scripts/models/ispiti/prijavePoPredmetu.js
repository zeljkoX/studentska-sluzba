define(['backbone'], function(Backbone) {

	var PrijavePoPredmetuModel = Backbone.Model.extend({
		initialize: function(options) {
			this.url = options.url;
			this.fetch();
			Backbone.on('att', function() {
				console.log(this.attributes);
			}, this);
		},
		parse: function(response) {
            var studenti = [];
            var keys = Object.keys(response);
            keys.splice(keys.indexOf('naziv'),1);
            studenti = keys.map(function(item){
                return { _id : item, naziv: response[item].naziv};
            });
            response.studenti = studenti;
			return response;
		}
	});

	return PrijavePoPredmetuModel;
});