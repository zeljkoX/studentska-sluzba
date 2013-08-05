define(['backbone'], function(Backbone) {
    var DugmeModel = Backbone.Model.extend({
        defaults: {
            vrijednosti: {
                klasa: 'btn btn-success',
                ikona: 'icon-plus-sign icon-white',
                tekst: 'Dodaj'
            }
        },
        initialize: function() {
            Backbone.on('dugme', function(options) {
                this.set({vrijednosti: options[0]});
            },this);
        }
    });
    return DugmeModel;
});