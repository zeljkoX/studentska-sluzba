define(['backbone', 'views/pocetna', 'routers/studenti', 'routers/fakultet', 'routers/predmeti', 'routers/ispiti', 'routers/profesori', 'jquery.dataTables'],
	function(Backbone, IndexView, StudentiRuter, FakultetiRuter, PredmetiRuter, IspitiRuter, ProfesoriRuter) {
		var Router = Backbone.Router.extend({
			initialize: function() {
				new StudentiRuter();
				new FakultetiRuter();
				new PredmetiRuter();
				new IspitiRuter();
				new ProfesoriRuter();
				
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
				'': 'index'
			},
			changeView: function(view) {
				if (null != this.currentView) {
					this.currentView.undelegateEvents();
					//this.currentView.remove();
				}
				this.currentView = view;
				//this.currentView.delegateEvents();
				this.currentView.render();
			},
			index: function() {
				this.changeView(new IndexView());
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
			rutaDodaj: function(href) {
				this.navigate(this.adresa() + href, {
					trigger: true
				});
			},
			//pomocna funkcija za dobijanje adrese tj. ostatka adrese posle administratorskog slugaa
			adresa: function() {
				return (location.href).replace(/.*administracija\//g, '');
			}
		});

		return Router;
	});