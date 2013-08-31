define(['backbone'], function(Backbone) {
    var LokacijaModel = Backbone.Model.extend({
        defaults: {
            stavke: [{
                'tekst': 'Pocetna',
                'lokacija': '/'
            }]
        },
        initialize: function() {
            Backbone.on('naslov', function(options) {
                var temp = this.attributes.stavke,
                    url = (location.href).replace(/.*administracija\//g, ''),
                    nivo = url.split('/').length - 1;
                    console.log(nivo);
                    if(nivo == 0 ){  //prepravka za typeahead
                        nivo = 1;
                        url = '/' + options[0].toLowerCase() + '/';
                    }
                temp.length = nivo,
                objekat = {
                    tekst: options[0],
                    lokacija: url
                };
                temp[nivo] = objekat;
                this.set({
                    stavke: temp
                });
                this.trigger('change');
            }, this);


            /*Backbone.on('stranicaDodaj', function(options){
                this.attributes.stavke.push(options[0]);
                this.trigger('change');
                console.log(this.get('stavke'));
            },this);*/
        }

    });
    return LokacijaModel;
});