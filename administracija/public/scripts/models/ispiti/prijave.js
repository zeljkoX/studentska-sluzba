define(['backbone'], function(Backbone) {

    var PrijaveModel = Backbone.Model.extend({
        initialize: function(options) {
            this.url = options.url;
            this.fetch();
            Backbone.on('att', function() {
                console.log(this.attributes);
            }, this);
        },
        parse: function(response) {
            //prijave.prijave = predmeti
            var fakulteti = Object.keys(response.prijave.prijave).sort(),
            predmeti = response.prijave.prijave,
            objekat = {},
            nizFakulteti = [],
            nizPredmeti = [];
             
           nizFakulteti = fakulteti.map(function(item){
                
                pred = Object.keys(predmeti[item]);
                nizPredmeti = pred.map(function(stavka){
                    var sifra = Object.keys(predmeti[item][stavka]);
                    console.log(predmeti[item][stavka].naziv);
                    student = Object.keys(predmeti[item][stavka]);
                    return {sifra: stavka, naziv: predmeti[item][stavka].naziv};
                   //return { sifra: stavka, naziv: predmeti.stavka[student].naziv};    
                });
                 return {naziv: item, predmeti: nizPredmeti}
                console.log(objekat);
            });
            response.prikaz = nizFakulteti;
            console.log(response);
            response.fakulteti = fakulteti;
            var a = response.fakulteti;
            console.log(a);
            response.aktivno = response.prikaz[0];
            response.aktivnoNaziv = response.prikaz[0].naziv;
            return response;
        }
    });

    return PrijaveModel;
});