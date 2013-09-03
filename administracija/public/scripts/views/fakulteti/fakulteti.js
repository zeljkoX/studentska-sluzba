define(['backbone', 'templates', 'views/stranica/stranica'],
	function(Backbone, Templates, StranicaView) {
		var FakultetiView = Backbone.View.extend({
			template: Templates['fakulteti'],
			initialize: function() {
				this.listenTo(this.model, 'change', this.render);
				this.model.on('sync', function() {
					Backbone.trigger('naslov', ['Fakulteti']);
					Backbone.trigger('dugme', [{
						tekst: 'Dodaj Fakultet',
						lokacija: 'fakulteti/dodaj-fakultet/',
						klasa: 'btn btn-success',
						ikona: 'icon-plus-sign icon-white'
					}]);
					Backbone.trigger('meni', [{
						tekst: 'Lista Fakulteta',
						lokacija: this.lokacija(),
						aktivan: 'true'
					}]);
					Backbone.trigger('statistika', [{
						tekst: 'Broj Fakulteta',
						podatak: this.model.get('fakulteti').length
					}])
					//this.render();
				}, this);
			},
			render: function() {
				console.log('render fak');
				this.$el.html(this.template.render(this.model.toJSON()));
				$('.sadrzajPodaci').empty().append(this.el);
				$('body').removeClass('ucitavanje');
				return this;
			},
			events: {
				'click table': 'otvori'
			},
			otvori: function(e) {
				e.preventDefault();
				var element = $(e.target).data('lokacija');
				if (element)
					Backbone.trigger('ruta:lokacija', ['fakulteti/' + element]);

			}

		});
		return FakultetiView;

	});