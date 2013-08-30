define(['backbone', 'views/pocetna', 'views/stranica/stranica', 'routers/studenti', 'routers/fakultet','routers/predmeti', 'routers/ispiti', 'routers/profesori','jquery.dataTables'], 
	function(Backbone, IndexView, StranicaView, StudentiRuter, FakultetiRuter, PredmetiRuter, IspitiRuter, ProfesoriRuter) {
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
				//this.currentView.remove();
			}
			this.currentView = view;
			this.currentView.delegateEvents();
			this.currentView.render();
		},
		index: function() {
			this.changeView(new IndexView());
			this.lokacija = '/';
			// this.navigate('studenti/',{trigger: true});
		},
		studenti: function() {
			this.changeView(new StranicaView());
			this.lokacija += 'studenti/'; 
			new StudentiRuter();
			

		},
		fakulteti: function() {
			this.changeView(new StranicaView());
			//Backbone.history.fragment = null;
			//Backbone.trigger('ruta:lokacija', [Backbone.lokacija()]);
			this.lokacija += 'fakulteti/'; 
			new FakultetiRuter();
			
		},
		predmeti: function(){
            this.changeView(new StranicaView());
			this.lokacija += 'predmeti/'; 
			new PredmetiRuter();
		},
		ispiti: function(){
			this.changeView(new StranicaView());
			this.lokacija += 'ispiti/'; 
			new IspitiRuter();
		},
		profesori: function(){
            this.changeView(new StranicaView());
			this.lokacija += 'profesori/'; 
			new ProfesoriRuter();
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
        //pomocna funkcija za dobijanje adrese tj. ostatka adrese posle administratorskog slugaa
        adresa: function(){
        	return (location.href).replace(/.*administracija\//g, '');
        }
	});

	return Router;
});