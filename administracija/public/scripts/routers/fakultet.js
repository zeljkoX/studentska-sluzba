define(['backbone','fakultetiM/fakulteti','fakultetiV/fakulteti','fakultetiM/dodaj-fakultet', 'fakultetiV/dodaj-fakultet','fakultetiM/fakultet-info', 'fakultetiV/fakultet-info','fakultetiM/dodaj-sp','fakultetiV/dodaj-sp', 'fakultetiM/studijski-program', 'fakultetiV/studijski-program', 'fakultetiM/semestar', 'fakultetiV/semestar', 'fakultetiM/uredi-semestar',  'fakultetiV/uredi-semestar'], 
    function(Backbone, FakultetiModel, FakultetiView, DodajFakultetModel, DodajFakultetView, FakultetInfoModel, FakultetInfoView, dodajSPModel, dodajSPView, SPModel, SPView, DodajSemestarModel, DodajSemestarView, UrediSemestarModel, UrediSemestarView) {
    var StudentiRuter = Backbone.Router.extend({
        routes: {
            'fakulteti/dodaj-fakultet/': 'dodajFakultet',
            'fakulteti/:fakultet/': 'prikaziFakultet',
            'fakulteti/:fakultet/dodaj-sp/': 'dodajStudijskiProgram',
            'fakulteti/:fakultet/obrisi/': 'obrisi',
            'fakulteti/:fakultet/:sp/': 'sp',
            'fakulteti/:fakultet/:sp/:semestar/': 'urediSemestar',
            'fakulteti/:fakultet/:sp/dodaj-semestar/': 'dodajSemestar'
            //'fakulteti/': 'index',

        },

        initialize: function() {
            this.lokacija = '/administracija/fakulteti/';
        this.changeView(new FakultetiView({model: new FakultetiModel()}));
        },
        index: function(){
            console.log('index');
            this.changeView(new FakultetiView({model: new FakultetiModel()}));
        },
        changeView: function(view) {
            if (null != this.currentView) {
                this.currentView.unbind();
                this.currentView.stopListening();
               this.currentView.remove();
                this.currentView = null;
            }
            this.currentView = view;
            this.currentView.delegateEvents();
            $('.sadrzajPodaci').empty().append(this.currentView.render().el);
        },

        dodajFakultet: function() {
            var a = new DodajFakultetView({ model: new DodajFakultetModel()});
            this.changeView(a); 
        },
        prikaziFakultet: function(fakultet){
            var a = new FakultetInfoView({model: new FakultetInfoModel({urlRoot: this.lokacija + fakultet + '/'})});
           this.changeView( a);
        },
        dodajStudijskiProgram: function(){
            this.changeView( new dodajSPView({model: new dodajSPModel({url: '/administracija/' +  Backbone.lokacija()})}));  
        },
        obrisi: function() {
            if(confirm('Da li ste sigurni da zelite obrisati?')){
            $.ajax({
                type: "GET",
                url: '/administracija/' + Backbone.lokacija(),
            }).done(function() {
                Backbone.trigger('ruta:lokacija',[Backbone.lokacija(2)]);
            });}
        },
        sp: function(fakultet, sp){
            this.changeView( new SPView({model: new SPModel({url: '/administracija/' +  Backbone.lokacija()})}));  
        },
        dodajSemestar: function(fakultet, sp){
            this.changeView( new DodajSemestarView({model: new DodajSemestarModel({url: '/administracija/' +  Backbone.lokacija()})}));  
        },
        urediSemestar: function(fakultet, sp){
            console.log('uredi semestar');
            this.changeView( new UrediSemestarView({model: new UrediSemestarModel({url: '/administracija/' +  Backbone.lokacija()})}));  
        }


    });
    return StudentiRuter;
});