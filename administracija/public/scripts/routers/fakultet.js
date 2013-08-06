define(['backbone','fakultetiM/fakulteti','fakultetiV/fakulteti','fakultetiM/dodaj-fakultet', 'fakultetiV/dodaj-fakultet','fakultetiM/fakultet-info', 'fakultetiV/fakultet-info'], 
    function(Backbone, FakultetiModel, FakultetiView, DodajFakultetModel, DodajFakultetView, FakultetInfoModel, FakultetInfoView) {
    var StudentiRuter = Backbone.Router.extend({
        routes: {
            'fakulteti/dodaj-fakultet/': 'dodajFakultet',
            'fakulteti/:fakultet/': 'prikaziFakultet'
            //'fakulteti/' : 'fakulteti'
        },

        initialize: function() {
        this.changeView(new FakultetiView({model: new FakultetiModel()}));
        },
        changeView: function(view) {
            if (null != this.currentView) {
                this.currentView.undelegateEvents();
            }
            this.currentView = view;
            this.currentView.delegateEvents();
            $('.sadrzajPodaci').empty().append(this.currentView.render().el);
        },

        dodajFakultet: function() {
            this.changeView(new DodajFakultetView({ model: new DodajFakultetModel()})); 
        },
        prikaziFakultet: function(fakultet){
            var lokacija = '/administracija/fakulteti/' + fakultet + '/';
           this.changeView( new FakultetInfoView({model: new FakultetInfoModel({urlRoot: lokacija})}));
        }


    });
    return StudentiRuter;
});