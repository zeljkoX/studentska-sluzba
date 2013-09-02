define(['backbone', 'text!sabloni/studijski-program.html', 'hogan'], function(Backbone, Templates, Hogan) {
	var StudijskiProgramView = Backbone.View.extend({
		template: Templates,
		initialize: function() {
			this.template = Hogan.compile(this.template);
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
			this.render();
		},
		render: function() {
			this.$el.html(this.template.render(this.model.toJSON()));
			$('.sadrzajPodaci').append(this.el);
			return this;
		},
		events: {
			'click table caption a': 'uredi',
			'click table td a': 'link'
		},
		uredi: function(e) {
			e.preventDefault();
			var index = $(e.target).data('lokacija');
			Backbone.trigger('ruta:lokacija', [this.lokacija() + index]);
			console.log(index);
		},
		link: function(e) {
			e.preventDefault();
			var element = $(e.target).data('lokacija');
			if (element)
				Backbone.trigger('ruta:lokacija', [element]);
		}

	});
	return StudijskiProgramView;

});