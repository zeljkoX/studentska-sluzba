define(['backbone', 'views/pocetna', 'views/stranica/stranica', 'routers/studenti', 'routers/fakultet'], function(Backbone, IndexView, StranicaView, StudentiRuter, FakultetRuter) {
	var Router = Backbone.Router.extend({

		initialize: function() {
            this.lokacija = 'administracija/';
			this.stranica = new StranicaView(),
			this.pocetna = new IndexView();

			Backbone.on('ruta:lokacija', function(options) {
                this.rutaEvent(options[0]);
            }, this);

            Backbone.on('ruta:sadrzaj', function(options) {
                this.ruta(options[0]);
            }, this);

            Backbone.on('ruta:dodaj', function(options) {
                this.rutaDodaj(options[0]);
            }, this);
		},
		routes: {
			'': 'index',
			'studenti/': 'studenti',
			'fakulteti/': 'fakulteti',
			'profesori/': 'profesori',
			'predmeti/': 'predmeti',
			'ispiti/': 'ispiti',
			'dokumenti/': 'dokumenti',
			'podesavanja/': 'podesavanja'
		},
		changeView: function(view) {
			if (null != this.currentView) {
				this.currentView.undelegateEvents();
			}
			this.currentView = view;
			this.currentView.delegateEvents();
			this.currentView.render();
		},
		index: function() {
			this.changeView(this.pocetna);
			this.lokacija = '/'
			console.log(this.lokacija);
		},
		studenti: function() {
			this.changeView(this.stranica);
			this.lokacija += 'studenti/'; 
			new StudentiRuter();
			console.log(this.lokacija);

		},
		fakulteti: function() {
			this.changeView(this.stranica);
			this.lokacija += 'fakulteti/'; 
			new FakultetRuter();
			console.log(this.lokacija);
		},
		//Mjenjanje adrese na osnovu djela linka
		ruta: function(href) {
            this.navigate(this.lokacija + href, {
                trigger: true
            });
        },
        //Mjenjanje adrese na osnovu punog linka
        rutaEvent: function(href) {
            this.navigate(href, {
                trigger: true
            });
        },
        //Dodavanje na adresu
        rutaDodaj: function(href){
            this.navigate(this.adresa() + href, {
                trigger: true
            });  
        },
        //pomocna funkcija za dobijanje adrese tj. ostatka adrese posle administratorskog sluga
        adresa: function(){
        	return (location.href).replace(/.*administracija\//g, '');
        }
	});

	return Router;
});