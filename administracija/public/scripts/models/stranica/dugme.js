define(['backbone'], function(Backbone) {
    var DugmeModel = Backbone.Model.extend({
        defaults: {
            vrijednosti: [{
                tekst: 'Dodaj ',
                lokacija: '/',
                klasa: 'btn btn-success',
                ikona: 'icon-plus-sign icon-white'
            }]
        },
        initialize: function() {
            Backbone.on('dugme', function(options) {
                this.set({
                    vrijednosti: options
                });
            }, this);
        }
    });
    return DugmeModel;
});