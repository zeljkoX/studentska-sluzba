define(['backbone', 'ispitiM/ispiti', 'ispitiV/ispiti', 'ispitiM/dodaj-ispit', 'ispitiV/dodaj-ispit', 'ispitiM/ispit-info', 'ispitiV/ispit-info', 'ispitiM/termini', 'ispitiV/termini', 'ispitiM/prijave', 'ispitiV/prijave', 'ispitiM/prijavePoPredmetu', 'ispitiV/prijavePoPredmetu'],
    function(Backbone, IspitiModel, IspitiView, DodajIspitModel, DodajIspitView, IspitInfoModel, IspitInfoView, TerminiModel, TerminiView, PrijaveModel, PrijaveView, PrijavePoPredmetuModel, PrijavePoPredmetuView) {
        var IspitiRuter = Backbone.Router.extend({
            routes: {
                'ispiti/dodaj-ispit/': 'dodajIspit',
                'ispiti/:ispit/': 'prikaziIspit',
                'ispiti/:ispit/obrisi/': 'obrisi',
                'ispiti/:ispit/termini/': 'termini',
                'ispiti/:ispit/prijave/': 'prijave',
                'ispiti/:ispit/prijave/:predmet/': 'prijavePoPredmeti',
            },

            initialize: function() {
                this.lokacija = '/administracija/ispiti/';
                this.changeView(new IspitiView({
                    model: new IspitiModel()
                }));
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

            dodajIspit: function() {
                this.changeView(new DodajIspitView({
                    model: new DodajIspitModel()
                }));
            },
            prikaziIspit: function(ispit) {
                this.changeView(new IspitInfoView({
                    model: new IspitInfoModel({
                        urlRoot: this.lokacija + ispit + '/'
                    })
                }));
            },
            termini: function(ispit){
                    this.changeView(new TerminiView({
                    model: new TerminiModel({
                        url: '/administracija/' + Backbone.lokacija()
                    })
                }));
            },
            prijave: function(ispit){
                    this.changeView(new PrijaveView({
                    model: new PrijaveModel({
                        url: '/administracija/' + Backbone.lokacija()
                    })
                }));
            },
            prijavePoPredmeti: function(predmet){
                this.changeView(new PrijavePoPredmetuView({
                    model: new PrijavePoPredmetuModel({
                        url: '/administracija/' + Backbone.lokacija()
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
        return IspitiRuter;
    });