define(['backbone'], function(Backbone) {
    var StudentiRuter = Backbone.Router.extend({
        routes: {
            //'studenti/': 'index'
            'studenti/jedan/': 'jedan'
        },

        initialize: function() {
            this.lokacija = 'studenti/';
            Backbone.on('rutaLokacija', function(options) {
                this.rutaEvent(options[0]);
            }, this);
            Backbone.on('rutaSadrzaj', function(options) {
                this.ruta(options[0]);
            }, this);
            Backbone.trigger('naslov', ['Studenti']);
        },
        changeView: function(view) {
            if (null != this.currentView) {
                this.currentView.undelegateEvents();
            }
            this.currentView = view;
            this.currentView.delegateEvents();
            this.currentView.render();
        },

        jedan: function() {
            console.log('jedan');
        },
        index: function() {
            Backbone.trigger('naslov', ['Studenti']);
        },
        ruta: function(href) {
            this.navigate(this.lokacija + href, {
                trigger: true
            });
        },
        rutaEvent: function(href) {
            this.navigate(href, {
                trigger: true
            });
        }

    });
    return StudentiRuter;
});