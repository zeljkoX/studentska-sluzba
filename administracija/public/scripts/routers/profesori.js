define(['backbone','profesoriM/profesori','profesoriV/profesori','profesoriM/dodaj-profesor', 'profesoriV/dodaj-profesor','profesoriM/profesor-info', 'profesoriV/profesor-info'], 
    function(Backbone, ProfesoriModel, ProfesoriView, DodajProfesorModel, DodajProfesorView, ProfesorInfoModel, ProfesorInfoView) {
    var ProfesoriRuter = Backbone.Router.extend({
        routes: {
            'profesori/dodaj-profesor/': 'dodaj',
            'profesori/:profesor/': 'prikazi',
            'profesori/:profesor/obrisi/': 'obrisi',
        },

        initialize: function() {
            this.lokacija = '/administracija/profesori/';
        this.changeView(new ProfesoriView({model: new ProfesoriModel()}));
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

        dodaj: function() {
            this.changeView(new DodajProfesorView({ model: new DodajProfesorModel()})); 
        },
        prikazi: function(profesor){
           this.changeView( new ProfesorInfoView({model: new ProfesorInfoModel({urlRoot: this.lokacija + profesor + '/'})}));
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
    return ProfesoriRuter;
});