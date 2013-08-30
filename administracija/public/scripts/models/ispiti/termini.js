define(['backbone'], function(Backbone) {

	var TerminiModel = Backbone.Model.extend({
		initialize: function(options) {
			this.url = options.url;
			this.fetch();
			Backbone.on('att', function() {
				console.log(this.attributes);
			}, this);
		},
		parse: function(response) {
           /* var podaci = [],
                fakulteti = {};
            response.fakulteti.forEach(function(stavka){
            	podaci.push(stavka._id);
            });

            podaci.forEach(function(stavka){
             fakulteti[stavka] = _.where(response.termini[0].termini,{fakultet : stavka});
            });
            fakulteti['nedefinisano'] = _.where(response.termini[0].termini,{fakultet : ''});
            console.log();

            this.attributes.aktivno = fakulteti[podaci[1]];
            response.filtrirano = fakulteti;
            window.termini = response.termini[0];
			response.termini = response.termini[0];*/
		    // console.log(Object.keys(response[0].termini));
            console.log(response[0]);
            response[0].fakulteti = Object.keys(response[0].termini).sort();
            var a = response[0].fakulteti[0];
            console.log(a);
            response[0].aktivno = response[0].termini[a];
            response[0].aktivnoNaziv = a;
			return response[0];
		}
	});

	return TerminiModel;
});