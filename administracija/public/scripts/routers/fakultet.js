define(['backbone','fakultetiM/fakulteti'], function(Backbone, FakultetModel) {
    var StudentiRuter = Backbone.Router.extend({
        routes: {
            //'studenti/': 'index'
            'studenti/jedan/': 'jedan'
        },

        initialize: function() {
        Backbone.trigger('naslov', ['Fakulteti']);
        new FakultetModel();
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
        }

    });
    return StudentiRuter;
});