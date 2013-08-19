define(['backbone','predmetiM/predmeti','predmetiV/predmeti','predmetiM/dodaj-predmet', 'predmetiV/dodaj-predmet','predmetiM/predmet-info', 'predmetiV/predmet-info'], 
    function(Backbone, PredmetiModel, PredmetiView, DodajPredmetModel, DodajPredmetView, PredmetInfoModel, PredmetInfoView) {
    var PredmetiRuter = Backbone.Router.extend({
        routes: {
            'predmeti/dodaj-predmet/': 'dodajPredmet',
            'predmeti/:predmet/': 'prikaziPredmet',
            'predmeti/:predmet/obrisi/': 'obrisi'
        },

        initialize: function() {
            this.lokacija = '/administracija/predmeti/';
        this.changeView(new PredmetiView({model: new PredmetiModel()}));
        },
        changeView: function(view) {
            if (null != this.currentView) {
                this.currentView.undelegateEvents();
                this.currentView.remove();
                this.currentView = null;
            }
            this.currentView = view;
            this.currentView.delegateEvents();
            $('.sadrzajPodaci').empty().append(this.currentView.render().el);
        },

        dodajPredmet: function() {
            this.changeView(new DodajPredmetView({ model: new DodajPredmetModel()})); 
        },
        prikaziPredmet: function(predmet){
           this.changeView( new PredmetInfoView({model: new PredmetInfoModel({urlRoot: this.lokacija + predmet + '/'})}));
        },
        obrisi: function() {
            if(confirm('Da li ste sigurni da zelite obrisati?')){
            $.ajax({
                type: "GET",
                url: '/administracija/' + Backbone.lokacija(),
            }).done(function() {
                Backbone.trigger('ruta:lokacija',[Backbone.lokacija(2)]);
            });}
        }
    });
    return PredmetiRuter;
});