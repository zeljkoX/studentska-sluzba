define(['backbone', 'profesoriM/profesori', 'profesoriV/profesori', 'profesoriM/dodaj-profesor', 'profesoriV/dodaj-profesor', 'profesoriM/profesor-info', 'profesoriV/profesor-info'],
    function(Backbone, ProfesoriModel, ProfesoriView, DodajProfesorModel, DodajProfesorView, ProfesorInfoModel, ProfesorInfoView) {
        var ProfesoriRuter = Backbone.Router.extend({
            routes: {
                'profesori/': 'profesori',
                'profesori/dodaj-profesor/': 'dodaj',
                'profesori/:profesor/': 'prikazi',
                'profesori/:profesor/obrisi/': 'obrisi',
            },
            initialize: function() {},
            changeView: function(view) {
                if (null != this.currentView) {
                    this.currentView.undelegateEvents();
                    delete this.currentView.model;
                    this.currentView.remove();
                    this.currentView = null;
                }
                window.pogled = view;
                this.currentView = view;
                //this.currentView.setElement($('.sadrzajPodaci')).render();
                // var html = this.currentView.render().el;
                //$('.sadrzajPodaci').append();
                //this.currentView.render();
                //$('.sadrzajPodaci').append(this.currentView.el);
            },
            profesori: function() {
                this.changeView(new ProfesoriView({
                    model: new ProfesoriModel()
                }));
            },
            dodaj: function() {
                this.changeView(new DodajProfesorView({
                    model: new DodajProfesorModel()
                }));
            },
            prikazi: function(profesor) {
                this.changeView(new ProfesorInfoView({
                    model: new ProfesorInfoModel({
                        urlRoot: '/administracija/' + Backbone.lokacija()
                    })
                }));
            },
            obrisi: function() {
                if (confirm('Da li ste sigurni da zelite obrisati?')) {
                    $.ajax({
                        type: "GET",
                        url: '/administracija/' + Backbone.lokacija(),
                    }).done(function() {
                        Backbone.trigger('ruta:lokacija', [Backbone.lokacija(2)]);
                    });
                }
            }
        });
        return ProfesoriRuter;
    });