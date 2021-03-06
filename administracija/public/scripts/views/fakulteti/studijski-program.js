define(['backbone', 'templates'], function(Backbone, Templates) {
	var StudijskiProgramView = Backbone.View.extend({
		template: Templates['studijski-program'],
		initialize: function() {
			this.listenTo(this.model, 'change', this.render);
			this.model.on('sync', function() {
				Backbone.trigger('naslov', ['Studijski Program: ' + this.model.get('naziv')]);
				Backbone.trigger('dugme', [{
					tekst: 'Dodaj Semestar',
					lokacija: this.lokacija() + 'dodaj-semestar/',
					klasa: 'btn btn-success',
					ikona: 'icon-plus-sign icon-white'
				}]);
				Backbone.trigger('meni', [{
					tekst: 'Lista Semestra',
					lokacija: this.lokacija(),
					aktivan: 'true'
				}]);
				Backbone.trigger('statistika', [{
						tekst: 'Broj Semestra',
						podatak: this.model.get('semestri').length
					}])
				this.render();
			}, this);
		},
		render: function() {
			this.$el.html(this.template.render(this.model.toJSON()));
			$('.sadrzajPodaci').empty().append(this.el);
			this.delegateEvents();
			$('body').removeClass('ucitavanje');
			return this;
		},
		events: {
			'click table caption a': 'uredi'
		},
		uredi: function(e) {
			e.preventDefault();
			var index = $(e.target).data('lokacija');
			Backbone.trigger('ruta:lokacija', [this.lokacija() + index]);
			console.log(index);
		},
	});
	return StudijskiProgramView;

});