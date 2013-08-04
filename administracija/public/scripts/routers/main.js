define(['backbone', 'views/pocetna', 'views/stranica', 'routers/studenti'], function(Backbone, IndexView, StranicaView, StudentiRuter) {
	var Router = Backbone.Router.extend({

		initialize: function() {
			//new StudentiRuter();
			this.stranica = new StranicaView(),
			this.pocetna = new IndexView();
			//console.log(this.pocetna.el)
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
		},
		studenti: function() {
			this.changeView(this.stranica);
			new StudentiRuter();

		},
		fakulteti: function() {

		},
		predmeti: function() {
			console.log('Predmeti');
		},
		profesori: function() {
			console.log('Profesori');
		},
		ispiti: function() {
			console.log('Ispiti');
		},
		dokumenti: function() {
			console.log('Dokumenti');
		},
		podesavanja: function() {
			console.log('Podesavanja');
		}


	});

	return Router;
});