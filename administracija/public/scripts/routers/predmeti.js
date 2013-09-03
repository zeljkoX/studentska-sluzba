define(['backbone', 'predmetiM/predmeti', 'predmetiV/predmeti', 'predmetiM/dodaj-predmet', 'predmetiV/dodaj-predmet', 'predmetiM/predmet-info', 'predmetiV/predmet-info'],
    function(Backbone, PredmetiModel, PredmetiView, DodajPredmetModel, DodajPredmetView, PredmetInfoModel, PredmetInfoView) {
        var PredmetiRuter = Backbone.Router.extend({
            routes: {
                'predmeti/': 'predmeti',
                'predmeti/dodaj-predmet/': 'dodajPredmet',
                'predmeti/:predmet/': 'prikaziPredmet',
                'predmeti/:predmet/obrisi/': 'obrisi'
            },
            initialize: function() {

            },
            changeView: function(view) {
                $('body').addClass('ucitavanje');
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
            predmeti: function() {
                this.changeView(new PredmetiView({
                    model: new PredmetiModel()
                }));
            },
            dodajPredmet: function() {
                this.changeView(new DodajPredmetView({
                    model: new DodajPredmetModel()
                }));
            },
            prikaziPredmet: function(predmet) {
                this.changeView(new PredmetInfoView({
                    model: new PredmetInfoModel({
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
        return PredmetiRuter;
    });